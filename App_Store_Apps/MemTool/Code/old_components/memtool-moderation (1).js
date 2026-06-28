// Capture routes: thoughts, call logs, wellness check-ins, and activity stats.
// Mounted at /api/mt — all paths below are relative to that prefix.
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { requireUser, FREE_DAILY_CAPTURE_LIMIT } = require('../lib/auth');
const { getTodaysCaptureCount } = require('../db/captures');

// Private helper — track daily activity row for a user
async function trackActivity(userId) {
  try {
    const today = new Date().toISOString().split('T')[0];
    await pool.query(
      `INSERT INTO mt_activity (user_id, activity_date, thoughts_captured)
       VALUES ($1, $2, 0) ON CONFLICT (user_id, activity_date) DO NOTHING`,
      [userId, today]
    );
  } catch (e) {}
}

// POST /api/mt/thoughts
router.post('/thoughts', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  const { content, category } = req.body;
  if (!content || !content.trim()) return res.status(400).json({ error: 'Content required' });
  const validCategories = ['idea', 'note', 'memory', 'task', 'random'];
  const cat = validCategories.includes(category) ? category : 'note';
  try {
    // Free-tier daily capture limit — all session-auth users are free tier
    // (mt_users has no is_pro column; Pro users use the JWT /api/memtool path)
    const todayCount = await getTodaysCaptureCount(user.id);
    if (todayCount >= FREE_DAILY_CAPTURE_LIMIT) {
      return res.status(402).json({
        code: 'FREE_TIER_CAPTURE_LIMIT',
        error: 'Daily capture limit reached',
        limit: FREE_DAILY_CAPTURE_LIMIT,
        remaining: 0,
      });
    }

    const result = await pool.query(
      `INSERT INTO mt_thoughts (user_id, content, category) VALUES ($1, $2, $3) RETURNING *`,
      [user.id, content.trim().substring(0, 2000), cat]
    );
    // Track activity
    const today = new Date().toISOString().split('T')[0];
    await pool.query(
      `INSERT INTO mt_activity (user_id, activity_date, thoughts_captured)
       VALUES ($1, $2, 1)
       ON CONFLICT (user_id, activity_date) DO UPDATE SET thoughts_captured = mt_activity.thoughts_captured + 1`,
      [user.id, today]
    );
    res.json({ thought: result.rows[0] });
  } catch (err) {
    console.error('MT create thought error:', err.message);
    res.status(500).json({ error: 'Failed to save thought' });
  }
});

// GET /api/mt/thoughts
router.get('/thoughts', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  const { search, category, starred } = req.query;
  let query = `SELECT * FROM mt_thoughts WHERE user_id = $1`;
  const params = [user.id];
  if (category && ['idea', 'note', 'memory', 'task', 'random'].includes(category)) {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }
  if (starred === 'true') {
    query += ` AND is_starred = true`;
  }
  if (search && search.trim()) {
    params.push(`%${search.trim().toLowerCase()}%`);
    query += ` AND LOWER(content) LIKE $${params.length}`;
  }
  query += ` ORDER BY created_at DESC LIMIT 100`;
  try {
    const result = await pool.query(query, params);
    res.json({ thoughts: result.rows });
  } catch (err) {
    console.error('MT get thoughts error:', err.message);
    res.status(500).json({ error: 'Failed to load thoughts' });
  }
});

// PUT /api/mt/thoughts/:id
router.put('/thoughts/:id', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  const id = parseInt(req.params.id);
  const { content, category, is_starred } = req.body;
  try {
    const result = await pool.query(
      `UPDATE mt_thoughts SET
         content = COALESCE($1, content),
         category = COALESCE($2, category),
         is_starred = COALESCE($3, is_starred),
         updated_at = NOW()
       WHERE id = $4 AND user_id = $5 RETURNING *`,
      [content ? content.trim().substring(0, 2000) : null, category || null, typeof is_starred === 'boolean' ? is_starred : null, id, user.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json({ thought: result.rows[0] });
  } catch (err) {
    console.error('MT update thought error:', err.message);
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/mt/thoughts/:id
router.delete('/thoughts/:id', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  const id = parseInt(req.params.id);
  try {
    await pool.query(`DELETE FROM mt_thoughts WHERE id = $1 AND user_id = $2`, [id, user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// POST /api/mt/calls
router.post('/calls', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  const { contact_name, key_points } = req.body;
  if (!key_points || !key_points.trim()) return res.status(400).json({ error: 'Key points required' });
  try {
    const result = await pool.query(
      `INSERT INTO mt_call_logs (user_id, contact_name, key_points) VALUES ($1, $2, $3) RETURNING *`,
      [user.id, (contact_name || '').trim().substring(0, 100), key_points.trim().substring(0, 2000)]
    );
    // Track activity — calls count toward daily streak (was missing, caused silent streak breakage)
    const today = new Date().toISOString().split('T')[0];
    await pool.query(
      `INSERT INTO mt_activity (user_id, activity_date, thoughts_captured)
       VALUES ($1, $2, 1)
       ON CONFLICT (user_id, activity_date) DO UPDATE SET thoughts_captured = mt_activity.thoughts_captured + 1`,
      [user.id, today]
    );
    res.json({ call: result.rows[0] });
  } catch (err) {
    console.error('MT create call error:', err.message);
    res.status(500).json({ error: 'Failed to save call log' });
  }
});

// GET /api/mt/calls
router.get('/calls', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  try {
    const result = await pool.query(
      `SELECT * FROM mt_call_logs WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
      [user.id]
    );
    res.json({ calls: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load call logs' });
  }
});

// POST /api/mt/wellness
router.post('/wellness', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  const { mood, energy, stress, note } = req.body;
  if (!mood || !energy || !stress) return res.status(400).json({ error: 'Mood, energy, and stress required' });
  try {
    const result = await pool.query(
      `INSERT INTO mt_wellness (user_id, mood, energy, stress, note) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user.id, Math.min(5, Math.max(1, parseInt(mood))), Math.min(5, Math.max(1, parseInt(energy))), Math.min(5, Math.max(1, parseInt(stress))), (note || '').trim().substring(0, 500)]
    );
    // Track activity — wellness check-ins count toward daily streak
    const today = new Date().toISOString().split('T')[0];
    await pool.query(
      `INSERT INTO mt_activity (user_id, activity_date, thoughts_captured)
       VALUES ($1, $2, 1)
       ON CONFLICT (user_id, activity_date) DO UPDATE SET thoughts_captured = mt_activity.thoughts_captured + 1`,
      [user.id, today]
    );
    res.json({ checkin: result.rows[0] });
  } catch (err) {
    console.error('MT wellness error:', err.message);
    res.status(500).json({ error: 'Failed to save wellness check-in' });
  }
});

// GET /api/mt/wellness
router.get('/wellness', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  try {
    const result = await pool.query(
      `SELECT * FROM mt_wellness WHERE user_id = $1 ORDER BY created_at DESC LIMIT 30`,
      [user.id]
    );
    res.json({ checkins: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load wellness data' });
  }
});

// GET /api/mt/stats — streak + today count
router.get('/stats', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  try {
    const today = new Date().toISOString().split('T')[0];
    // Today's captures
    const todayResult = await pool.query(
      `SELECT thoughts_captured FROM mt_activity WHERE user_id = $1 AND activity_date = $2`,
      [user.id, today]
    );
    const todayCount = todayResult.rows[0]?.thoughts_captured || 0;

    // Streak: count consecutive days back from today
    const activityResult = await pool.query(
      `SELECT activity_date FROM mt_activity WHERE user_id = $1 ORDER BY activity_date DESC LIMIT 365`,
      [user.id]
    );
    const dates = activityResult.rows.map(r => r.activity_date.toISOString ? r.activity_date.toISOString().split('T')[0] : String(r.activity_date).substring(0, 10));
    let streak = 0;
    let checkDate = new Date(today);
    for (let i = 0; i < 365; i++) {
      const ds = checkDate.toISOString().split('T')[0];
      if (dates.includes(ds)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Total thoughts + call logs (calls were previously invisible in stats)
    const totalResult = await pool.query(`SELECT COUNT(*) FROM mt_thoughts WHERE user_id = $1`, [user.id]);
    const totalThoughts = parseInt(totalResult.rows[0].count);
    const callResult = await pool.query(`SELECT COUNT(*) FROM mt_call_logs WHERE user_id = $1`, [user.id]);
    const totalCalls = parseInt(callResult.rows[0].count);

    res.json({ streak, today_count: todayCount, total_thoughts: totalThoughts, total_calls: totalCalls });
  } catch (err) {
    console.error('MT stats error:', err.message);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

module.exports = router;
