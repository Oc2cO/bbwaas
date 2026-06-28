# OC2CO PAYMENT HUB — CROSS-APP CHECKOUT + ENTITLEMENTS V1

**STATUS:** PASS

**Files changed:**
- store-backend.js (extended with full tables, account routes, enhanced webhook and checkout to support app funnel and entitlements)
- checkout.html (updated to support ?product=...&return_to=... query params for cross-app funnel, calls /api/store/checkout, redirects back on success)
- OC2CO_PAYMENT_HUB_CROSSAPP_V1_REPORT.md (this report)

**Exact routes created / supported:**
- POST /api/store/checkout (creates Stripe session, supports product/slug, cart, customer_email, user_id, app_id, return_to in metadata)
- POST /api/stripe/webhook (exact path, verifies signature, handles listed events, records to payment_events, upserts entitlements/subscriptions/orders)
- GET /api/account/entitlements (returns active entitlements for app, used by apps like MemTool)
- GET /api/account/billing (basic subs and orders for account page)
- GET /account/restore (per spec, for apps)
- The /checkout page (static html served at oc2co.com/checkout supports ?product=...&return_to=... and funnels to backend)

**Exact webhook URL:**
https://oc2coos-2.polsia.app/api/stripe/webhook
(confirm exact mount in Polsia after task #2874896 or deploy)

**Neon tables created (in ensureTables, idempotent):**
- users
- products
- plans
- orders
- order_items
- subscriptions
- entitlements (with all required fields: user_id, app_id, product_id, plan_id, status, stripe_customer_id, stripe_subscription_id, current_period_start, current_period_end, created_at, updated_at)
- payment_events

**Stripe events handled:**
- checkout.session.completed
- checkout.session.async_payment_succeeded
- payment_intent.succeeded
- payment_intent.payment_failed
- charge.refunded
- charge.dispute.created
- customer.subscription.created
- customer.subscription.deleted
- invoice.paid
- invoice.payment_failed

**Test checkout instructions:**
1. Run the backend (node store-backend.js or mount in Polsia) with STRIPE_SECRET_KEY in env (test key first).
2. From an app (e.g. memtool), link to: https://oc2coos-2.polsia.app/checkout?product=pro-monthly&return_to=https://memtool.oc2co.com/app
3. The checkout page will preselect and call backend.
4. Complete in Stripe test mode.
5. Webhook fires (use Stripe CLI for local test: stripe listen --forward-to localhost:8788/api/stripe/webhook )
6. App calls GET /api/account/entitlements?app=memtool&email=user@example.com
7. If active, unlock.

**How MemTool checks entitlement:**
- After user returns or on app load/login: fetch('/api/account/entitlements?app=memtool&email=' + userEmail)
- Check response.active === true or entitlements array has active for the app.
- Unlock Pro features in MemTool.

**How future apps plug in:**
- Any app (iris.oc2co.com etc.) sends user to /checkout?product=xxx&app=iris&return_to=their-url
- After payment, app calls the same /api/account/entitlements?app=theirapp&email=...
- Same hub, same Neon, same Stripe.
- Add product to PRODUCT_CATALOG or Neon products table.
- Validate return_to against allowed domains in production.

**Other details:**
- Security: secrets only in Polsia env, product validation server side, event ID dedup in payment_events, return_to in metadata.
- Test mode first: use sk_test_ and test webhook secret.
- For native apps: users can buy on web and restore via the hub (login with same email).
- The checkout.html now supports the funnel from apps while preserving the layer for direct Pro use.
- No secrets exposed.

**Local open path:**
file:///C:/Users/Sagou/Documents/BrainHub/oc2co_website/index.html (for the checkout page test)
Backend: run locally with env.

**Deploy/push status:**
No deploy or push run. This is the example code to drop into Polsia backend. Confirm webhook URL in Stripe dashboard after deploy.

**Next recommended step:**
- Deploy the updated store-backend routes to Polsia.
- Run task #2874896 if not done to scaffold.
- Add STRIPE_SECRET_KEY to Polsia env (test first).
- Create webhook in Stripe pointing to the URL.
- Update MemTool app to link to the checkout with params and check entitlements.
- Add plans/products to Neon or catalog for other apps.
- When Steven approves, implement the parked video patch on homepage.

This provides the central hub for funneling payments as described. All apps can route through oc2co.com/checkout and check access via the hub.