// Store routes — products, cart (session-based), checkout.
// Does NOT own: memtool subscriptions, Stripe webhooks.
const router = require('express').Router();
const pool = require('../db');

router.get('/api/products', async (req, res) => {
  const { category, search, featured } = req.query;
  let query = `SELECT * FROM products WHERE active = true`;
  const params = [];

  if (category) {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }
  if (featured === 'true') {
    query += ` AND featured = true`;
  }
  if (search) {
    params.push(`%${search.toLowerCase()}%`);
    query += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(description) LIKE $${params.length})`;
  }

  query += ` ORDER BY featured DESC, created_at ASC`;

  try {
    const result = await pool.query(query, params);
    res.json({ products: result.rows });
  } catch (err) {
    console.error('Products error:', err.message);
    res.status(500).json({ error: 'Failed to load products.' });
  }
});

router.get('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid product ID.' });
  try {
    const result = await pool.query(`SELECT * FROM products WHERE id = $1 AND active = true`, [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Product not found.' });
    res.json({ product: result.rows[0] });
  } catch (err) {
    console.error('Product detail error:', err.message);
    res.status(500).json({ error: 'Failed to load product.' });
  }
});

// Cart (session-based)
router.post('/api/cart/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const { productId, quantity = 1, action = 'add' } = req.body;

  if (!sessionId || sessionId.length > 128) return res.status(400).json({ error: 'Invalid session.' });

  try {
    let cartResult = await pool.query(`SELECT * FROM cart_sessions WHERE session_id = $1`, [sessionId]);

    let items = cartResult.rows.length ? cartResult.rows[0].items : [];

    if (action === 'add' && productId) {
      const existing = items.find(i => i.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        const prod = await pool.query(`SELECT id, name, price_cents, image_url FROM products WHERE id = $1 AND active = true`, [productId]);
        if (prod.rows.length) {
          items.push({ productId, quantity, name: prod.rows[0].name, price_cents: prod.rows[0].price_cents, image_url: prod.rows[0].image_url });
        }
      }
    } else if (action === 'remove' && productId) {
      items = items.filter(i => i.productId !== productId);
    } else if (action === 'clear') {
      items = [];
    } else if (action === 'update' && productId) {
      const existing = items.find(i => i.productId === productId);
      if (existing) existing.quantity = Math.max(0, quantity);
      if (existing && existing.quantity === 0) items = items.filter(i => i.productId !== productId);
    }

    await pool.query(
      `INSERT INTO cart_sessions (session_id, items, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (session_id) DO UPDATE SET items = $2, updated_at = NOW()`,
      [sessionId, JSON.stringify(items)]
    );

    const total = items.reduce((sum, i) => sum + (i.price_cents * i.quantity), 0);
    res.json({ success: true, items, total });
  } catch (err) {
    console.error('Cart error:', err.message);
    res.status(500).json({ error: 'Cart operation failed.' });
  }
});

router.get('/api/cart/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const result = await pool.query(`SELECT items FROM cart_sessions WHERE session_id = $1`, [sessionId]);
    const items = result.rows.length ? result.rows[0].items : [];
    const total = items.reduce((sum, i) => sum + (i.price_cents * i.quantity), 0);
    res.json({ items, total });
  } catch (err) {
    console.error('Cart get error:', err.message);
    res.status(500).json({ error: 'Failed to load cart.' });
  }
});

// Checkout
router.post('/api/checkout', async (req, res) => {
  const { sessionId, email } = req.body;
  if (!sessionId || !email || !email.includes('@')) {
    return res.status(400).json({ error: 'Session and email required.' });
  }

  try {
    const cartResult = await pool.query(`SELECT items FROM cart_sessions WHERE session_id = $1`, [sessionId]);
    if (!cartResult.rows.length || !cartResult.rows[0].items.length) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    const items = cartResult.rows[0].items;
    const total = items.reduce((sum, i) => sum + (i.price_cents * i.quantity), 0);

    if (process.env.STRIPE_SECRET_KEY) {
      const Stripe = require('stripe');
      const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: item.price_cents,
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        customer_email: email,
        success_url: `${process.env.SITE_URL || 'https://oc2coos-2.polsia.app'}/store?order=success`,
        cancel_url: `${process.env.SITE_URL || 'https://oc2coos-2.polsia.app'}/store?order=cancelled`,
      });

      await pool.query(
        `INSERT INTO orders (session_id, email, items, total_cents, stripe_session_id, status) VALUES ($1, $2, $3, $4, $5, 'pending')`,
        [sessionId, email, JSON.stringify(items), total, session.id]
      );

      return res.json({ success: true, checkoutUrl: session.url, orderId: null });
    }

    const orderResult = await pool.query(
      `INSERT INTO orders (session_id, email, items, total_cents, status) VALUES ($1, $2, $3, $4, 'pending') RETURNING id`,
      [sessionId, email, JSON.stringify(items), total]
    );

    res.json({ success: true, message: 'Order received! We will contact you shortly.', orderId: orderResult.rows[0].id });
  } catch (err) {
    console.error('Checkout error:', err.message);
    res.status(500).json({ error: 'Checkout failed.' });
  }
});

module.exports = router;
