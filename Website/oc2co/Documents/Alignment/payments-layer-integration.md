# Oc2cO Payments Layer — RevenueCat + Processors (ONE layer for everything)

## The Goal You Asked For
- Embed payment processors into website, apps, and future surfaces.
- Checkout page on oc2co.com.
- **Do NOT** add integration code on every product/price/item.
- Just add **the layer**.

RevenueCat **is** that layer. You define Offerings + Packages once in the dashboard. Everything else (web, iOS, Android, future) reads the same central data.

## What Was Added (no drift from existing V1 landing)
- `payments-layer.js` — the abstraction. Only place that knows package identifiers.
- `checkout.html` — beautiful dynamic checkout page that renders plans exclusively from the layer.
- Link surfaced from `index.html`.
- Matching cosmic styles (added a few rules to style.css).

Open locally:
- file:///.../oc2co_website/checkout.html
- Or `index.html` → click "Pricing & Checkout (integrated layer) →"

## How the Layer Works
1. `loadOfferings()` returns the current Offering (today: mock that matches RevenueCat shape).
2. `initiatePurchase(packageIdentifier, {email, userId})` — the single method for starting payment.
3. UI never mentions prices or specific SKUs except by reading the layer result.
4. Future products = add in RevenueCat dashboard (or update the mock object during early dev). No other files change.

## Real Integration Steps (Recommended Order)

### 1. RevenueCat Dashboard (single source of truth)
- Create / select project.
- Add **Stripe Billing** integration (or Paddle).
- Create an Offering (recommend identifier: `default`).
- Create Packages inside it:
  - `$rc_monthly` → map to your Stripe monthly price/product
  - `$rc_annual`
  - `$rc_lifetime` (or whatever)
- Configure entitlements (e.g. `pro`).
- Copy the **Web API key** (public) and **Secret API key** (server only).

Prices, trials, intro offers, etc. are now managed centrally. Apps and web will see them automatically.

### 2. Website (this checkout page)
**Easiest production path: RevenueCat Web Purchase Links**
- In RevenueCat, create Web Purchase Links for the offering.
- Store the generated URLs in `payments-layer.js` on each package (`purchaseUrl`).
- In `initiatePurchase`, if a `purchaseUrl` exists → `window.location = pkg.purchaseUrl`.

**Embedded path (more control):**
```js
// Browser
import Purchases from '@revenuecat/purchases-js';
Purchases.configure({ apiKey: 'rcb_...' });
const offerings = await Purchases.getOfferings();
const { customerInfo } = await Purchases.purchasePackage(thePackage);
```

Then replace the mock implementation inside `payments-layer.js`. The `checkout.html` continues to work unchanged.

You can also proxy through a Node endpoint later (see below) so the browser never sees keys.

### 3. Node.js / Server Layer (secure, webhooks, advanced)
Use the existing `bbwaas_mcp/server.js` pattern or create a dedicated payments server.

The file `payments-example-server.js` is a complete, ready-to-run example that uses the real Stripe REST API (https://api.stripe.com) while staying driven by the single layer.

**To enable real Stripe from the checkout page:**
1. Run the server locally or hosted.
2. In `checkout.html`, set `var BACKEND_BASE = 'http://localhost:8788';`
3. In the browser checkout, it will call `/api/create-checkout-session` with the layer's `packageIdentifier`.
4. Stripe redirects user back to `checkout.html?success=...`

Minimal example structure (see the actual `payments-example-server.js` for the full version):

```js
// payments-server.js (or add routes to your express app)
const express = require('express');
const Stripe = require('stripe');
const axios = require('axios'); // or fetch

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const RC_SECRET = process.env.REVENUECAT_SECRET_KEY;
const RC_PROJECT = 'your_project_id_or_app_user'; // see docs

// 1. Create Stripe Checkout Session from a layer package id
app.post('/api/create-checkout', express.json(), async (req, res) => {
  const { packageIdentifier, email, userId } = req.body;

  // You can map identifiers to Stripe Price IDs here OR (better) let RevenueCat manage mapping
  // For pure Stripe Billing + RevenueCat, you often let RevenueCat handle the Stripe prices.

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription', // or 'payment' for lifetime
    customer_email: email,
    line_items: [{ price: getStripePriceIdFor(packageIdentifier), quantity: 1 }],
    success_url: 'https://www.oc2co.com/checkout.html?success=1&session_id={CHECKOUT_SESSION_ID}',
    // metadata for later reconciliation
    metadata: { packageIdentifier, userId: userId || email }
  });

  res.json({ url: session.url });
});

// 2. Stripe webhook → report purchase to RevenueCat (or use RevenueCat's Stripe integration)
app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) { return res.status(400).send('Bad signature'); }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { packageIdentifier, userId } = session.metadata || {};

    // Option A: RevenueCat Stripe App / direct integration handles most of this
    // Option B: explicit:
    await axios.post('https://api.revenuecat.com/v1/receipts', {
      app_user_id: userId || session.customer_email,
      fetch_token: session.id,           // or appropriate token
      platform: 'stripe'
    }, {
      headers: { 'Authorization': `Bearer ${RC_SECRET}` }
    });
  }
  res.json({ received: true });
});

// 3. (Optional) Proxy offerings so frontend never needs RC keys
app.get('/api/offerings', async (_req, res) => {
  // Call RevenueCat server API or just return what you want to expose
  // For many cases you can hardcode or cache the current offering shape.
  res.json({ current: require('./payments-layer').MOCK... or live });
});

app.listen(8788);
```

Environment:
- Never commit secrets.
- Use RevenueCat webhooks in addition (or instead) — they can call your server on every purchase/renewal/cancel.

RevenueCat also supports direct Stripe integration so many events flow automatically.

### 4. Mobile Apps + Everything Else
Install the official SDK for the platform:

iOS (Swift):
```swift
Purchases.configure(withAPIKey: "public_rc_key")
Purchases.shared.getOfferings { offerings, error in ... }
Purchases.shared.purchase(package: pkg) { ... }
```

Android, React Native, Flutter, Unity — same pattern + same Offering identifier (`default`).

When a user buys on web, the same `userId` (email or your internal ID) will show the entitlement in the mobile SDK instantly or after short sync.

## Quick Local Test Today
1. Open `index.html` (file://)
2. Click the new "Pricing & Checkout (integrated layer)" link
3. Pick a plan, enter email, hit the CTA
4. See the layer return success + the exact package identifier that would be sent to RevenueCat

## Next Actions for You
- Log into RevenueCat → connect Stripe → create the matching Offering/Packages.
- Decide: hosted links (fastest) vs embedded Web SDK vs your Node + Stripe Checkout.
- Put real keys only in the correct place (browser public key or server secret).
- (Optional) replace mock data in `payments-layer.js` with live `Purchases.getOfferings()`.
- Update any other future "product" pages to read from the same layer (or link to checkout.html).
- For production oc2co.com on GitHub Pages: the static files work as-is. Real payments will redirect or use a small proxy server you control.

## One Layer Summary
Website checkout.html → payments-layer.js → (RevenueCat Web SDK OR hosted link OR /api/checkout)
Mobile apps → RevenueCat SDK → same Offering
**Web Apps (self-hosted)** → `@revenuecat/purchases-js` + same layer identifiers
Node (optional) → RevenueCat REST + Stripe webhooks

Change price or launch a new tier in the RevenueCat dashboard once.

That's it.

If you want me to:
- Wire a real example using Stripe.js + server snippet more deeply
- Add a Node route to your existing bbwaas_mcp server
- Create a simple proxy /api/offerings endpoint
- Make the layer also support "Web Purchase Links" with actual URLs

Just say the word. No per-item code will ever be added.

---

## How to run the real Stripe integration today (using the pasted Stripe API ref)

1. In this folder:
   ```bash
   npm install express cors stripe dotenv
   ```

2. Create `.env` (never commit):
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   REVENUECAT_SECRET_KEY=rcat_...
   ```

3. Edit `checkout.html` near the top and set:
   ```js
   var BACKEND_BASE = 'http://localhost:8788';
   ```

4. Run the server:
   ```bash
   node payments-example-server.js
   ```

5. Open http://localhost:8000/checkout.html (or via python -m http.server)

6. Pick a plan → the page will POST the layer package ID to the server → server calls Stripe API (`/v1/checkout/sessions`) → user is sent to Stripe hosted checkout.

7. After paying in test mode, Stripe redirects back here with `?success=true&session_id=...` and shows success.

8. (Recommended) In your Stripe dashboard, also set up the webhook to `http://your-server/api/stripe-webhook`.

The `packageIdentifier` ($rc_monthly etc.) is the only thing that flows from the UI → layer → backend. All price and processor details stay in one map or in RevenueCat.

This is the unified layer you wanted.

---

## Adding to Your Web Apps (Self-Hosted) — The New Part

You said you know App Store handles the integration on mobile, but you also want **web apps** that you will host yourself.

### Recommended Approach

Use **RevenueCat as the layer for web apps too**.

1. In RevenueCat dashboard (same project as your mobile apps):
   - Enable **Web** platform.
   - Connect the same Stripe account.
   - Use the exact same Offering (`default`) and package IDs (`$rc_monthly`, etc.).

2. In your hosted web app:
   ```bash
   npm install @revenuecat/purchases-js
   ```

3. Use the files in the `web-apps/` folder in this repo:
   - `revenuecat-web-layer.js` — importable module with your constants (`PACKAGE_IDS`, `ENTITLEMENT_PRO`)
   - `entitlements-example.js` — real pattern for checking access
   - `paywall-example.html` — study this for UI ideas (adapt into your framework)

### Critical: Consistent User IDs

```js
// Mobile (example)
Purchases.configure(withAPIKey: "...", appUserID: "user_12345");

// Web app (must be identical)
Purchases.configure({ apiKey: "...", appUserID: "user_12345" });
```

This is how buying Pro on your hosted web app instantly gives access on the iOS/Android version of the same app.

### Two Ways to Charge on Web Apps

**Option A — Embedded (best UX inside your app)**
Use the RevenueCat Web SDK directly:
```js
const { customerInfo } = await Purchases.purchasePackage(selectedPackage);
```

**Option B — Hosted Checkout (what we built for the marketing site)**
From your web app, redirect the user to your `checkout.html` (or call the same backend `/api/create-checkout-session`).
This reuses the work we already did.

Many teams use **both**:
- Simple upsell buttons → redirect to `/checkout.html`
- Full paywall inside complex web apps → use `purchases-js`

### Backend You Already Have

Your `payments-example-server.js` works for both the static site **and** your hosted web apps.

- Run it (or the routes) next to your web app backend.
- Webhooks will report purchases to RevenueCat.
- Your web apps (and mobile) will see the entitlements.

### Quick Start Checklist for Web Apps

- [ ] Copy `web-apps/revenuecat-web-layer.js` into your web app project.
- [ ] `npm install @revenuecat/purchases-js`
- [ ] After login: `Purchases.configure({ apiKey: 'rcb_...', appUserID: yourUserId })`
- [ ] Use `PACKAGE_IDS.MONTHLY` etc. everywhere.
- [ ] Call `Purchases.getCustomerInfo()` and `hasProAccess(...)` to gate features.
- [ ] Set up webhooks in Stripe → your backend → RevenueCat.
- [ ] Test cross-platform: buy on web → check access on a mobile build.

### Example in a Real Web App Component

See `web-apps/entitlements-example.js` and `web-apps/paywall-example.html`.

Everything flows from the same identifiers defined in the layer.

This gives you true "host on both" with a single source of truth.

Signal from chaos.
