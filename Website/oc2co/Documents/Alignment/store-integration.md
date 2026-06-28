# Oc2cO Store — Stripe + Neon Integration (V2)

This implements the exact spec you pasted.

## Status
- V1 Payment Link still works as fallback: https://buy.stripe.com/dRmcN4guR5bl9kR9VMaR200
- V2 dynamic checkout + webhook scaffolded in `store-backend.js`

## Exact Routes (deploy these)
- `POST /api/store/checkout`
- `POST /api/stripe/webhook`

## Recommended Webhook URL for Stripe Dashboard
https://www.oc2co.com/api/stripe/webhook

(This is the path from your spec. Once task #2874896 runs or you deploy `store-backend.js`, confirm the mounted route in your Polsia build report and use the exact one.)

## Stripe Events to Select (copy from your paste)
- checkout.session.completed
- checkout.session.expired
- payment_intent.succeeded
- payment_intent.payment_failed
- customer.subscription.created
- customer.subscription.deleted
- invoice.paid
- invoice.payment_failed

(Also add charge.refunded and charge.dispute.created as mentioned.)

## Env Vars (Polsia Dashboard ONLY)
```
STRIPE_SECRET_KEY=sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (get after adding webhook in Stripe)
SITE_URL=https://www.oc2co.com
STORE_SUCCESS_URL=https://www.oc2co.com/success
STORE_CANCEL_URL=https://www.oc2co.com/cancel
DATABASE_URL=... or NEON_DATABASE_URL=...
```

## How Frontend Should Work (your spec)
```js
// Store product button
if (product.parked) {
  show("Checkout Coming Soon");
} else if (product.stripe_payment_link && !dynamicReady) {
  window.open(product.stripe_payment_link, '_blank');
} else {
  // Call backend
  const res = await fetch('/api/store/checkout', {
    method: 'POST',
    body: JSON.stringify({ slug: product.slug, quantity: 1, customer_email })
  });
  const data = await res.json();
  if (data.fallback && data.payment_link) {
    window.open(data.payment_link, '_blank');
  } else if (data.url) {
    window.location = data.url; // Stripe Checkout
  }
}
```

## Neon Tables (created automatically in the code)
- products
- orders
- order_items
- payment_events

Neon keeps your business straight: orders, fulfillment status, audit trail, reporting — separate from Stripe.

## RevenueCat Tie-in (from our earlier work)
If any store products grant "Pro" access, report the Stripe session to RevenueCat in the webhook handler (see `store-backend.js` comments).

## Next Steps
1. Run queued task #2874896 (gets you the scaffold + exact routes if different).
2. Add `STRIPE_SECRET_KEY` to Polsia env now.
3. Deploy the code from `store-backend.js` (or merge the routes).
4. Add the webhook URL in Stripe → copy `whsec_...` → add `STRIPE_WEBHOOK_SECRET` to Polsia env.
5. Wire the frontend buttons as described.
6. Test with test keys first.

Your site stays live. This is additive.

All secrets stay in Polsia env. No guessing on the webhook — the code above uses the path from your spec.