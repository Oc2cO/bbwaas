// Stripe subscription checkout/portal, Apple IAP receipt verification,
// and RevenueCat webhook — all Pro subscription lifecycle routes.
const express = require('express');
const rateLimit = require('express-rate-limit');
const pool = require('../db');
const { memtoolAuth } = require('../lib/auth');

const router = express.Router();

// ============================================
// STRIPE CONSTANTS + LAZY INIT
// ============================================

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID; // $2.99/mo recurring price ID
const APP_URL = 'https://oc2coos-2.polsia.app';

// Stripe client — lazy init so missing key doesn't crash startup
function getStripe() {
  if (!STRIPE_SECRET_KEY) return null;
  const Stripe = require('stripe');
  return Stripe(STRIPE_SECRET_KEY);
}

// ============================================
// APPLE IAP CONSTANTS + HELPERS
// ============================================

const APPLE_SHARED_SECRET = process.env.APPLE_SHARED_SECRET;
const APPLE_PRODUCT_ID = 'com.oc2co.memtool.pro.monthly';

// Apple receipt verification — tries production first, falls back to sandbox on 21007
async function verifyAppleReceipt(receiptData) {
  const payload = JSON.stringify({
    'receipt-data': receiptData,
    password: APPLE_SHARED_SECRET,
    'exclude-old-transactions': true,
  });

  const fetchFromApple = async (url) => {
    const https = require('https');
    return new Promise((resolve, reject) => {
      const req = https.request(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error('Invalid JSON from Apple')); }
        });
      });
      req.on('error', reject);
      req.setTimeout(15000, () => { req.destroy(); reject(new Error('Apple receipt verification timeout')); });
      req.write(payload);
      req.end();
    });
  };

  // Try production first
  let result = await fetchFromApple('https://buy.itunes.apple.com/verifyReceipt');

  // Status 21007 = receipt is from sandbox — retry with sandbox endpoint
  if (result.status === 21007) {
    result = await fetchFromApple('https://sandbox.itunes.apple.com/verifyReceipt');
  }

  return result;
}

// Parse the most recent active subscription from Apple receipt response
function parseAppleSubscription(appleResponse, productId) {
  const latestReceiptInfo = appleResponse.latest_receipt_info;
  if (!latestReceiptInfo || !Array.isArray(latestReceiptInfo)) {
    return null;
  }

  // Filter to our product and sort by expires_date_ms descending (most recent first)
  const matching = latestReceiptInfo
    .filter(tx => tx.product_id === productId)
    .sort((a, b) => parseInt(b.expires_date_ms || 0) - parseInt(a.expires_date_ms || 0));

  if (!matching.length) return null;

  const latest = matching[0];
  const expiresMs = parseInt(latest.expires_date_ms || 0);
  const isActive = expiresMs > Date.now();
  const originalTransactionId = latest.original_transaction_id;
  const expiresDate = expiresMs ? new Date(expiresMs).toISOString() : null;

  return { isActive, originalTransactionId, expiresDate, expiresMs };
}

// Rate limiter: 10 Apple verify requests per hour per user
const appleVerifyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.memtoolUserId || req.ip,
  handler: (req, res) => res.status(429).json({ error: 'Too many verification attempts. Try again in an hour.' }),
  skip: (req) => !req.memtoolUserId,
});

// ============================================
// REVENUCAT CONSTANTS + HELPERS
// ============================================

// Event types that activate Pro access
const RC_PRO_EVENTS = new Set([
  'INITIAL_PURCHASE',
  'RENEWAL',
  'PRODUCT_CHANGE',
  'NON_RENEWING_PURCHASE',
  'UNCANCELLATION',
]);

// Event types that revoke Pro access
const RC_REVOKE_EVENTS = new Set(['EXPIRATION']);

// Event types we log but take no user action on
const RC_LOG_ONLY_EVENTS = new Set(['SUBSCRIBER_ALIAS']);

// Map RevenueCat store value to our payment_platform column
function rcStoreToPaymentPlatform(store) {
  if (store === 'APP_STORE') return 'apple';
  if (store === 'PLAY_STORE') return 'google';
  if (store === 'STRIPE') return 'stripe';
  return store ? store.toLowerCase() : 'apple';
}

// ============================================
// STRIPE ROUTES
// ============================================

// Reusable Stripe payment link for Pro ($2.99/mo)
// Created via Polsia Stripe MCP — tied to this company's Stripe Connect account
const PRO_PAYMENT_LINK = 'https://buy.stripe.com/4gMfZhedM10J6UGfvL8so00';

// GET /subscription/upgrade
// Returns the Pro payment link — used by frontend upgrade CTA
router.get('/subscription/upgrade', memtoolAuth, (req, res) => {
  res.json({
    upgrade_url: PRO_PAYMENT_LINK,
    plan: 'pro',
    price: 2.99,
    interval: 'month',
    features: [
      'Unlimited daily captures',
      'All 7 brain games',
      'Intuitive daily recaps',
      'Advanced stats & trends',
      'Streak tracking',
      'No ads',
    ],
  });
});

// POST /subscription/checkout
// Creates a Stripe Checkout Session for $2.99/month recurring
router.post('/subscription/checkout', memtoolAuth, async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({ error: 'Payments not configured yet', code: 'STRIPE_NOT_CONFIGURED' });
  }
  if (!STRIPE_PRICE_ID) {
    return res.status(503).json({ error: 'Payments not configured yet', code: 'STRIPE_NOT_CONFIGURED' });
  }

  try {
    const userId = req.memtoolUserId;

    // Fetch user to check for existing Stripe customer
    const userResult = await pool.query(
      'SELECT id, email, display_name, stripe_customer_id, is_pro FROM memtool_users WHERE id = $1',
      [userId]
    );
    if (!userResult.rows.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = userResult.rows[0];

    // If already pro, still allow — they might want to update payment info
    let customerId = user.stripe_customer_id;

    // Create Stripe customer if we don't have one
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.display_name || undefined,
        metadata: { memtool_user_id: userId },
      });
      customerId = customer.id;

      // Persist customer ID immediately
      await pool.query(
        'UPDATE memtool_users SET stripe_customer_id = $1, updated_at = NOW() WHERE id = $2',
        [customerId, userId]
      );
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${APP_URL}/subscription-success`,
      cancel_url: `${APP_URL}/subscription-cancel`,
      metadata: { memtool_user_id: userId },
      subscription_data: {
        metadata: { memtool_user_id: userId },
      },
    });

    res.json({ checkout_url: session.url });
  } catch (err) {
    console.error('Memtool checkout error:', err.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// GET /subscription/status
router.get('/subscription/status', memtoolAuth, async (req, res) => {
  try {
    const userId = req.memtoolUserId;
    const result = await pool.query(
      'SELECT is_pro, stripe_customer_id, pro_since, pro_expires, payment_platform FROM memtool_users WHERE id = $1',
      [userId]
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = result.rows[0];

    let manage_url = null;
    const stripe = getStripe();
    if (stripe && user.stripe_customer_id && user.is_pro) {
      try {
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: user.stripe_customer_id,
          return_url: `${APP_URL}/`,
        });
        manage_url = portalSession.url;
      } catch (portalErr) {
        // Non-fatal — portal may not be configured
        console.error('Memtool portal session error (status):', portalErr.message);
      }
    }

    const platform = user.payment_platform || 'stripe';
    // source: 'revenucat' signals to the frontend not to show Stripe UI for Apple/Google subs
    const source = (platform === 'apple' || platform === 'google') ? 'revenucat' : 'stripe';

    res.json({
      is_pro: user.is_pro,
      plan: user.is_pro ? 'pro' : 'free',
      pro_since: user.pro_since,
      pro_expires: user.pro_expires,
      payment_platform: platform,
      source,
      manage_url,
    });
  } catch (err) {
    console.error('Memtool subscription status error:', err.message);
    res.status(500).json({ error: 'Failed to load subscription status' });
  }
});

// POST /subscription/portal
// Creates a Stripe Customer Portal session
router.post('/subscription/portal', memtoolAuth, async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({ error: 'Payments not configured yet', code: 'STRIPE_NOT_CONFIGURED' });
  }

  try {
    const userId = req.memtoolUserId;
    const result = await pool.query(
      'SELECT stripe_customer_id, is_pro FROM memtool_users WHERE id = $1',
      [userId]
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = result.rows[0];

    if (!user.stripe_customer_id) {
      return res.status(400).json({ error: 'No subscription found' });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${APP_URL}/`,
    });

    res.json({ portal_url: portalSession.url });
  } catch (err) {
    console.error('Memtool portal error:', err.message);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

// POST /webhook/stripe
// Stripe sends events here — NO JWT auth, signature verification instead
// Raw body captured in server.js (before express.json) for signature verification
router.post('/webhook/stripe', async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    // Accept and ignore — Stripe configured but code not ready
    return res.json({ received: true });
  }

  const sig = req.headers['stripe-signature'];
  if (!STRIPE_WEBHOOK_SECRET || !sig) {
    console.warn('Memtool webhook: missing secret or signature — rejecting');
    return res.status(400).json({ error: 'Webhook signature required' });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Memtool webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  // Idempotency check — skip if already processed
  try {
    const already = await pool.query(
      'SELECT id FROM stripe_webhook_events WHERE id = $1',
      [event.id]
    );
    if (already.rows.length) {
      return res.json({ received: true, skipped: true });
    }
    // Record as processed
    await pool.query(
      'INSERT INTO stripe_webhook_events (id, event_type) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [event.id, event.type]
    );
  } catch (dbErr) {
    console.error('Memtool webhook idempotency check error:', dbErr.message);
    // Non-fatal — continue processing
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.memtool_user_id;
        if (!userId) break;
        const subscriptionId = session.subscription;
        let proExpires = null;

        // Fetch subscription to get current_period_end
        if (subscriptionId) {
          try {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            proExpires = sub.current_period_end
              ? new Date(sub.current_period_end * 1000)
              : null;
          } catch (subErr) {
            console.error('Memtool webhook: subscription retrieve error:', subErr.message);
          }
        }

        await pool.query(
          `UPDATE memtool_users
           SET is_pro = true,
               stripe_subscription_id = $1,
               pro_since = COALESCE(pro_since, NOW()),
               pro_expires = $2,
               updated_at = NOW()
           WHERE id = $3`,
          [subscriptionId, proExpires, userId]
        );
        console.log(`Memtool webhook: user ${userId} upgraded to Pro`);
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object;
        const userId = sub.metadata?.memtool_user_id;
        if (!userId) {
          // Try to look up by stripe_subscription_id
          const res2 = await pool.query(
            'SELECT id FROM memtool_users WHERE stripe_subscription_id = $1',
            [sub.id]
          );
          if (!res2.rows.length) break;
          const foundId = res2.rows[0].id;
          const proExpires = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
          const isActive = ['active', 'trialing'].includes(sub.status);
          await pool.query(
            `UPDATE memtool_users
             SET is_pro = $1, pro_expires = $2, updated_at = NOW()
             WHERE id = $3`,
            [isActive, proExpires, foundId]
          );
          break;
        }
        const proExpires = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
        const isActive = ['active', 'trialing'].includes(sub.status);
        await pool.query(
          `UPDATE memtool_users
           SET is_pro = $1, pro_expires = $2, stripe_subscription_id = $3, updated_at = NOW()
           WHERE id = $4`,
          [isActive, proExpires, sub.id, userId]
        );
        console.log(`Memtool webhook: user ${userId} subscription updated (status=${sub.status})`);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const userId = sub.metadata?.memtool_user_id;
        if (!userId) {
          // Look up by stripe_subscription_id
          const res2 = await pool.query(
            'SELECT id FROM memtool_users WHERE stripe_subscription_id = $1',
            [sub.id]
          );
          if (!res2.rows.length) break;
          const foundId = res2.rows[0].id;
          await pool.query(
            `UPDATE memtool_users
             SET is_pro = false, pro_expires = NOW(), updated_at = NOW()
             WHERE id = $1`,
            [foundId]
          );
          break;
        }
        await pool.query(
          `UPDATE memtool_users
           SET is_pro = false, pro_expires = NOW(), updated_at = NOW()
           WHERE id = $1`,
          [userId]
        );
        console.log(`Memtool webhook: user ${userId} subscription cancelled — Pro revoked`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        // Log the failure — grace period can be implemented later
        console.warn(`Memtool webhook: payment failed for Stripe customer ${customerId}`);
        break;
      }

      default:
        // Unhandled event types — safe to ignore
        break;
    }
  } catch (handlerErr) {
    console.error('Memtool webhook handler error:', handlerErr.message);
    // Still return 200 — Stripe retries on 4xx/5xx
  }

  res.json({ received: true });
});

// ============================================
// APPLE IAP ROUTES
// ============================================

// POST /subscription/apple-verify
// Verifies an Apple StoreKit receipt and upgrades/downgrades Pro status
router.post('/subscription/apple-verify', memtoolAuth, appleVerifyLimiter, async (req, res) => {
  // Graceful fallback if Apple IAP not configured
  if (!APPLE_SHARED_SECRET) {
    return res.status(503).json({
      error: 'Apple IAP not configured yet',
      code: 'APPLE_IAP_NOT_CONFIGURED',
    });
  }

  const { receipt_data, product_id } = req.body;

  if (!receipt_data || typeof receipt_data !== 'string' || receipt_data.trim().length === 0) {
    return res.status(400).json({ error: 'receipt_data is required' });
  }

  const targetProductId = (product_id && typeof product_id === 'string')
    ? product_id.trim()
    : APPLE_PRODUCT_ID;

  const userId = req.memtoolUserId;

  try {
    const appleResponse = await verifyAppleReceipt(receipt_data.trim());

    // Apple status codes: 0 = valid, 21007 = sandbox (already retried above)
    if (appleResponse.status !== 0) {
      const statusMessages = {
        21000: 'Receipt not sent to Apple in proper format',
        21002: 'Receipt data was malformed or missing',
        21003: 'Receipt could not be authenticated',
        21004: 'Shared secret does not match',
        21005: 'Apple receipt server is unavailable — try again',
        21006: 'Subscription has expired (server response)',
        21008: 'Receipt is from production but sent to sandbox',
        21009: 'Internal data access error',
        21010: 'Account not found — subscription may have been deleted',
      };
      const reason = statusMessages[appleResponse.status] || `Apple error status ${appleResponse.status}`;
      console.warn(`Memtool Apple IAP: invalid receipt for user ${userId} — status ${appleResponse.status}`);

      // Status 21006 = explicitly expired
      if (appleResponse.status === 21006) {
        await pool.query(
          `UPDATE memtool_users SET is_pro = false, updated_at = NOW() WHERE id = $1`,
          [userId]
        );
        return res.json({ success: false, is_pro: false, reason: 'expired' });
      }

      return res.status(400).json({ success: false, is_pro: false, reason: reason });
    }

    const subscription = parseAppleSubscription(appleResponse, targetProductId);

    if (!subscription) {
      // No matching subscription found in receipt
      await pool.query(
        `UPDATE memtool_users SET is_pro = false, updated_at = NOW() WHERE id = $1`,
        [userId]
      );
      return res.json({ success: false, is_pro: false, reason: 'invalid' });
    }

    const { isActive, originalTransactionId, expiresDate } = subscription;

    if (isActive) {
      // Activate Pro
      await pool.query(
        `UPDATE memtool_users
         SET is_pro = true,
             pro_since = COALESCE(pro_since, NOW()),
             pro_expires = $1,
             apple_original_transaction_id = $2,
             payment_platform = 'apple',
             updated_at = NOW()
         WHERE id = $3`,
        [expiresDate ? new Date(expiresDate) : null, originalTransactionId, userId]
      );
      console.log(`Memtool Apple IAP: user ${userId} verified Pro (txn=${originalTransactionId})`);
      return res.json({ success: true, is_pro: true, expires_date: expiresDate });
    } else {
      // Subscription found but expired
      await pool.query(
        `UPDATE memtool_users
         SET is_pro = false,
             pro_expires = $1,
             apple_original_transaction_id = $2,
             payment_platform = 'apple',
             updated_at = NOW()
         WHERE id = $3`,
        [expiresDate ? new Date(expiresDate) : null, originalTransactionId, userId]
      );
      console.log(`Memtool Apple IAP: user ${userId} receipt expired (txn=${originalTransactionId})`);
      return res.json({ success: false, is_pro: false, reason: 'expired' });
    }
  } catch (err) {
    console.error('Memtool Apple IAP verify error:', err.message);
    return res.status(500).json({ error: 'Failed to verify receipt — try again' });
  }
});

// POST /webhook/apple
// Apple App Store Server Notifications — no auth, Apple sends directly
// Handles subscription lifecycle events: renewals, failures, cancellations, refunds
router.post('/webhook/apple', async (req, res) => {
  // Always return 200 immediately — Apple retries on non-2xx
  res.json({ received: true });

  const { notification_type, unified_receipt, latest_receipt_info, latest_receipt, auto_renew_status } = req.body;

  if (!notification_type) {
    console.warn('Memtool Apple webhook: missing notification_type');
    return;
  }

  console.log(`Memtool Apple webhook: received notification_type=${notification_type}`);

  try {
    // Extract transaction info from notification payload
    const receiptInfo = latest_receipt_info ||
      (unified_receipt && unified_receipt.latest_receipt_info) ||
      [];

    const transactions = Array.isArray(receiptInfo) ? receiptInfo : [receiptInfo];
    if (!transactions.length) {
      console.warn(`Memtool Apple webhook: no receipt info in ${notification_type}`);
      return;
    }

    // Most recent transaction
    const tx = transactions.sort((a, b) =>
      parseInt(b.expires_date_ms || 0) - parseInt(a.expires_date_ms || 0)
    )[0];

    const originalTransactionId = tx.original_transaction_id;
    if (!originalTransactionId) {
      console.warn('Memtool Apple webhook: no original_transaction_id found');
      return;
    }

    // Look up user by Apple transaction ID
    const userResult = await pool.query(
      'SELECT id, is_pro FROM memtool_users WHERE apple_original_transaction_id = $1',
      [originalTransactionId]
    );

    if (!userResult.rows.length) {
      console.warn(`Memtool Apple webhook: no user found for txn=${originalTransactionId}`);
      return;
    }

    const userId = userResult.rows[0].id;
    const expiresMs = parseInt(tx.expires_date_ms || 0);
    const expiresDate = expiresMs ? new Date(expiresMs) : null;

    switch (notification_type) {
      case 'DID_RENEW':
      case 'INITIAL_BUY': {
        // Subscription renewed or just started
        await pool.query(
          `UPDATE memtool_users
           SET is_pro = true,
               pro_since = COALESCE(pro_since, NOW()),
               pro_expires = $1,
               updated_at = NOW()
           WHERE id = $2`,
          [expiresDate, userId]
        );
        console.log(`Memtool Apple webhook: user ${userId} renewed Pro (expires=${expiresDate})`);
        break;
      }

      case 'DID_FAIL_TO_RENEW': {
        // Payment failed — note: subscription may still be active in grace period
        // We log but don't immediately revoke — Apple will send CANCEL if not resolved
        console.warn(`Memtool Apple webhook: user ${userId} renewal payment failed`);
        break;
      }

      case 'CANCEL':
      case 'REFUND': {
        // Cancelled or refunded — revoke Pro immediately
        await pool.query(
          `UPDATE memtool_users
           SET is_pro = false,
               pro_expires = COALESCE($1, NOW()),
               updated_at = NOW()
           WHERE id = $2`,
          [expiresDate, userId]
        );
        console.log(`Memtool Apple webhook: user ${userId} Pro revoked (${notification_type})`);
        break;
      }

      case 'INTERACTIVE_RENEWAL':
      case 'DID_CHANGE_RENEWAL_STATUS': {
        // User resubscribed or toggled auto-renew — re-verify expiry
        const isActive = expiresMs > Date.now();
        await pool.query(
          `UPDATE memtool_users
           SET is_pro = $1,
               pro_expires = $2,
               updated_at = NOW()
           WHERE id = $3`,
          [isActive, expiresDate, userId]
        );
        console.log(`Memtool Apple webhook: user ${userId} status changed — is_pro=${isActive}`);
        break;
      }

      default:
        console.log(`Memtool Apple webhook: unhandled notification_type=${notification_type} for user ${userId}`);
        break;
    }
  } catch (err) {
    console.error('Memtool Apple webhook processing error:', err.message);
    // Already responded 200 above — Apple won't retry
  }
});

// ============================================
// REVENUCAT WEBHOOK
// ============================================

router.post('/webhook/revenucat', async (req, res) => {
  // Always respond 200 — RevenueCat retries on any non-200 response
  const secret = process.env.REVENUCAT_WEBHOOK_SECRET;

  // Secret not configured: accept but warn. Don't crash/reject.
  if (!secret) {
    console.warn('Memtool RC webhook: REVENUCAT_WEBHOOK_SECRET not set — accepting without auth');
    return res.json({ warning: 'RevenueCat webhook not configured' });
  }

  // Verify shared secret header
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const body = req.body;
  const event = body && body.event;

  if (!event || !event.type) {
    console.warn('Memtool RC webhook: received payload with no event.type');
    return res.json({ status: 'ok' });
  }

  const {
    type: eventType,
    app_user_id,
    original_app_user_id,
    product_id,
    store,
    purchased_at_ms,
    original_transaction_id,
  } = event;

  // Log every event to rc_webhook_logs for debugging
  let logId = null;
  try {
    const logResult = await pool.query(
      `INSERT INTO memtool_rc_webhook_logs
         (event_type, app_user_id, product_id, store, raw_payload, processed)
       VALUES ($1, $2, $3, $4, $5, false)
       RETURNING id`,
      [eventType, app_user_id || null, product_id || null, store || null, JSON.stringify(body)]
    );
    logId = logResult.rows[0]?.id;
  } catch (logErr) {
    // Non-fatal — don't abort processing if logging fails
    console.error('Memtool RC webhook: failed to log event:', logErr.message);
  }

  // Log-only events — no user mutation needed
  if (RC_LOG_ONLY_EVENTS.has(eventType)) {
    console.log(`Memtool RC webhook: log-only event ${eventType} for ${app_user_id}`);
    if (logId) {
      await pool.query(
        `UPDATE memtool_rc_webhook_logs SET processed = true WHERE id = $1`,
        [logId]
      );
    }
    return res.json({ status: 'ok' });
  }

  // TRANSFER event — update both the old and new user
  if (eventType === 'TRANSFER') {
    console.log(`Memtool RC webhook: TRANSFER event for ${app_user_id} → ${original_app_user_id}`);
    // Revoke Pro on old owner (original_app_user_id) if different
    if (original_app_user_id && original_app_user_id !== app_user_id) {
      try {
        await pool.query(
          `UPDATE memtool_users SET is_pro = false, updated_at = NOW() WHERE id = $1`,
          [original_app_user_id]
        );
      } catch (e) {
        console.warn(`Memtool RC webhook: TRANSFER revoke failed for ${original_app_user_id}:`, e.message);
      }
    }
    // Grant Pro on new owner (app_user_id)
    try {
      await pool.query(
        `UPDATE memtool_users SET is_pro = true, updated_at = NOW() WHERE id = $1`,
        [app_user_id]
      );
    } catch (e) {
      console.warn(`Memtool RC webhook: TRANSFER grant failed for ${app_user_id}:`, e.message);
    }
    if (logId) {
      await pool.query(`UPDATE memtool_rc_webhook_logs SET processed = true WHERE id = $1`, [logId]);
    }
    return res.json({ status: 'ok' });
  }

  // CANCELLATION + BILLING_ISSUE — keep Pro (grace / still has access until expiry)
  if (eventType === 'CANCELLATION' || eventType === 'BILLING_ISSUE') {
    console.log(`Memtool RC webhook: ${eventType} for ${app_user_id} — keeping is_pro=true (grace)`);
    if (logId) {
      await pool.query(`UPDATE memtool_rc_webhook_logs SET processed = true WHERE id = $1`, [logId]);
    }
    return res.json({ status: 'ok' });
  }

  // For all other event types, find the user
  if (!RC_PRO_EVENTS.has(eventType) && !RC_REVOKE_EVENTS.has(eventType)) {
    console.log(`Memtool RC webhook: unhandled event type ${eventType} — acknowledging`);
    if (logId) {
      await pool.query(`UPDATE memtool_rc_webhook_logs SET processed = true WHERE id = $1`, [logId]);
    }
    return res.json({ status: 'ok' });
  }

  // Resolve user — try app_user_id first, then original_app_user_id
  let userId = null;
  try {
    let userResult = await pool.query(
      `SELECT id FROM memtool_users WHERE id = $1`,
      [app_user_id]
    );
    if (!userResult.rows.length && original_app_user_id && original_app_user_id !== app_user_id) {
      userResult = await pool.query(
        `SELECT id FROM memtool_users WHERE id = $1`,
        [original_app_user_id]
      );
    }
    if (!userResult.rows.length) {
      // Also try revenucat_app_user_id column in case IDs diverge
      userResult = await pool.query(
        `SELECT id FROM memtool_users WHERE revenucat_app_user_id = $1`,
        [app_user_id]
      );
    }
    userId = userResult.rows[0]?.id || null;
  } catch (lookupErr) {
    console.error('Memtool RC webhook: user lookup error:', lookupErr.message);
    if (logId) {
      await pool.query(
        `UPDATE memtool_rc_webhook_logs SET error = $1 WHERE id = $2`,
        [lookupErr.message, logId]
      );
    }
    return res.json({ status: 'ok' });
  }

  if (!userId) {
    console.warn(`Memtool RC webhook: no user found for app_user_id=${app_user_id} — skipping`);
    if (logId) {
      await pool.query(
        `UPDATE memtool_rc_webhook_logs SET error = 'user_not_found' WHERE id = $1`,
        [logId]
      );
    }
    return res.json({ status: 'ok' });
  }

  const isPro = RC_PRO_EVENTS.has(eventType);
  const paymentPlatform = rcStoreToPaymentPlatform(store);

  try {
    if (eventType === 'INITIAL_PURCHASE') {
      // Set pro_since only on first purchase, never overwrite on renewals
      const proSince = purchased_at_ms ? new Date(purchased_at_ms) : new Date();
      await pool.query(
        `UPDATE memtool_users
         SET is_pro = true,
             pro_since = COALESCE(pro_since, $1),
             payment_platform = $2,
             apple_original_transaction_id = CASE WHEN $3 = 'APP_STORE' THEN $4 ELSE apple_original_transaction_id END,
             revenucat_app_user_id = $5,
             updated_at = NOW()
         WHERE id = $6`,
        [proSince, paymentPlatform, store || '', original_transaction_id || null, app_user_id, userId]
      );
      console.log(`Memtool RC webhook: INITIAL_PURCHASE — user ${userId} is now Pro`);
    } else if (isPro) {
      // RENEWAL, PRODUCT_CHANGE, NON_RENEWING_PURCHASE, UNCANCELLATION
      await pool.query(
        `UPDATE memtool_users
         SET is_pro = true,
             payment_platform = $1,
             apple_original_transaction_id = CASE WHEN $2 = 'APP_STORE' AND $3 IS NOT NULL THEN $3 ELSE apple_original_transaction_id END,
             revenucat_app_user_id = $4,
             updated_at = NOW()
         WHERE id = $5`,
        [paymentPlatform, store || '', original_transaction_id || null, app_user_id, userId]
      );
      console.log(`Memtool RC webhook: ${eventType} — user ${userId} is_pro=true`);
    } else {
      // EXPIRATION — revoke Pro
      await pool.query(
        `UPDATE memtool_users
         SET is_pro = false,
             revenucat_app_user_id = $1,
             updated_at = NOW()
         WHERE id = $2`,
        [app_user_id, userId]
      );
      console.log(`Memtool RC webhook: EXPIRATION — user ${userId} is_pro=false`);
    }

    if (logId) {
      await pool.query(`UPDATE memtool_rc_webhook_logs SET processed = true WHERE id = $1`, [logId]);
    }
  } catch (updateErr) {
    console.error(`Memtool RC webhook: update failed for user ${userId}:`, updateErr.message);
    if (logId) {
      await pool.query(
        `UPDATE memtool_rc_webhook_logs SET error = $1 WHERE id = $2`,
        [updateErr.message, logId]
      );
    }
  }

  res.json({ status: 'ok' });
});

module.exports = router;
