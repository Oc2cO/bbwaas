// MT auth routes — register, login, guest, profile for session-based /api/mt/* endpoints.
// Does NOT own: memtool JWT auth, subscription status.
const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const pool = require('../db');
const { requireUser } = require('../lib/auth');
const { hashPassword, generateToken } = require('../lib/utils');

// Rate limiters for session auth routes (prevent brute force)
const mtRegisterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.headers['x-forwarded-for']?.split(',')[0] || req.ip,
  handler: (req, res) => res.status(429).json({ error: 'Too many registration attempts. Try again in an hour.' }),
});

const mtLoginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.headers['x-forwarded-for']?.split(',')[0] || req.ip,
  handler: (req, res) => res.status(429).json({ error: 'Too many login attempts. Try again in an hour.' }),
});

const mtGuestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.headers['x-forwarded-for']?.split(',')[0] || req.ip,
  handler: (req, res) => res.status(429).json({ error: 'Too many guest accounts. Try again in an hour.' }),
});

// POST /register
router.post('/register', mtRegisterLimiter, async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !email.includes('@') || !password || password.length < 6) {
    return res.status(400).json({ error: 'Email and password (6+ chars) required' });
  }
  try {
    const exists = await pool.query(`SELECT id FROM mt_users WHERE email = LOWER($1)`, [email]);
    if (exists.rows.length) return res.status(409).json({ error: 'Email already registered' });

    const salt = require('crypto').randomBytes(16).toString('hex');
    const hash = hashPassword(password, salt);
    const token = generateToken();

    const result = await pool.query(
      `INSERT INTO mt_users (email, password_hash, salt, username) VALUES (LOWER($1), $2, $3, $4) RETURNING id, email, username`,
      [email, hash, salt, username || 'Explorer']
    );
    await pool.query(
      `INSERT INTO mt_sessions (user_id, token) VALUES ($1, $2)`,
      [result.rows[0].id, token]
    );
    res.json({ user: result.rows[0], token });
  } catch (err) {
    console.error('MT register error:', err.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /login
router.post('/login', mtLoginLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const result = await pool.query(`SELECT * FROM mt_users WHERE email = LOWER($1)`, [email]);
    if (!result.rows.length) return res.status(401).json({ error: 'Invalid credentials' });
    const user = result.rows[0];
    const hash = hashPassword(password, user.salt);
    if (hash !== user.password_hash) return res.status(401).json({ error: 'Invalid credentials' });
    const token = generateToken();
    await pool.query(`INSERT INTO mt_sessions (user_id, token) VALUES ($1, $2)`, [user.id, token]);
    res.json({ user: { id: user.id, email: user.email, username: user.username }, token });
  } catch (err) {
    console.error('MT login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST /guest
router.post('/guest', mtGuestLimiter, async (req, res) => {
  try {
    const guestToken = generateToken();
    const result = await pool.query(
      `INSERT INTO mt_users (is_guest, guest_token, username) VALUES (true, $1, 'Explorer') RETURNING id, username, is_guest`,
      [guestToken]
    );
    const token = generateToken();
    await pool.query(`INSERT INTO mt_sessions (user_id, token) VALUES ($1, $2)`, [result.rows[0].id, token]);
    res.json({ user: result.rows[0], token });
  } catch (err) {
    console.error('MT guest error:', err.message);
    res.status(500).json({ error: 'Guest login failed' });
  }
});

// GET /me
router.get('/me', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  res.json({ user: { id: user.id, email: user.email, username: user.username, birthday: user.birthday, bio: user.bio, profile_picture_url: user.profile_picture_url } });
});

// PUT /me
router.put('/me', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  const { username, birthday, bio } = req.body;
  try {
    const result = await pool.query(
      `UPDATE mt_users SET
        username = COALESCE($1, username),
        birthday = COALESCE($2, birthday),
        bio = COALESCE($3, bio),
        updated_at = NOW()
       WHERE id = $4 RETURNING id, email, username, birthday, bio, profile_picture_url`,
      [username || null, birthday || null, bio !== undefined ? bio : null, user.id]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('MT update profile error:', err.message);
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;
