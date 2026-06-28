// AI-powered MemTool routes: daily boost, brain fact, AI insight,
// favorites, AI recommendations, and brain score.
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { requireUser } = require('../lib/auth');
const openai = require('../lib/openai');
const { DAILY_BOOSTS, BRAIN_FACTS } = require('../lib/constants');
const { isOpenAIQuotaError } = require('../lib/openai-error-handler');
const { stripMarkdownFences } = require('../lib/utils');

// GET /daily-boost
router.get('/daily-boost', async (req, res) => {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % DAILY_BOOSTS.length;
  res.json({ quote: DAILY_BOOSTS[dayIndex] });
});

// GET /brain-fact
router.get('/brain-fact', async (req, res) => {
  const factIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % BRAIN_FACTS.length;
  res.json({ fact: BRAIN_FACTS[factIndex] });
});

// GET /ai-insight — personalized AI observation
router.get('/ai-insight', async (req, res) => {
  const fallbacks = [
    "Your mind is building momentum. Keep capturing thoughts daily — consistency compounds.",
    "Try the Memory Match game today. Short-term recall sharpens with just 5 minutes of practice.",
    "You're showing up. That's the hardest part. Today, capture one thing you'd normally let slip by.",
  ];
  const user = await requireUser(req, res);
  if (!user) return;
  try {
    // Gather context
    const recentThoughts = await pool.query(
      `SELECT content, category, created_at FROM mt_thoughts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5`,
      [user.id]
    );
    const statsData = await pool.query(
      `SELECT thoughts_captured FROM mt_activity WHERE user_id = $1 ORDER BY activity_date DESC LIMIT 7`,
      [user.id]
    );
    const gameStats = await pool.query(
      `SELECT game, best_score, times_played FROM mt_game_stats WHERE user_id = $1`,
      [user.id]
    );

    const thoughtCount = recentThoughts.rows.length;
    const avgCaptures = statsData.rows.reduce((s, r) => s + r.thoughts_captured, 0) / Math.max(statsData.rows.length, 1);
    const topGame = gameStats.rows.sort((a, b) => b.times_played - a.times_played)[0];

    const context = `User "${user.username}" has captured ${thoughtCount} recent thoughts. Average daily captures: ${avgCaptures.toFixed(1)}. ${topGame ? `Favorite game: ${topGame.game} (played ${topGame.times_played} times).` : 'No games played yet.'} Recent thought categories: ${[...new Set(recentThoughts.rows.map(t => t.category))].join(', ') || 'none yet'}.`;

    // Guard: skip AI call if no API key configured
    if (!process.env.OPENAI_API_KEY) {
      return res.json({ insight: fallbacks[Math.floor(Math.random() * fallbacks.length)] });
    }

    let insight;
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are MemTool\'s AI coach. Provide ONE short, specific, actionable insight (2-3 sentences max) based on the user\'s activity data. Be warm but direct. Optionally recommend one brain game if relevant. Do not use bullet points.' },
          { role: 'user', content: context }
        ],
        max_tokens: 120,
        temperature: 0.7
      });
      insight = completion.choices[0].message.content;
    } catch (aiErr) {
      if (isOpenAIQuotaError(aiErr)) {
        const ts = new Date().toISOString();
        console.warn(`[WARN] OpenAI quota exceeded at ${ts} — endpoint: /ai-insight`);
        return res.status(503).json({ error: 'ai_unavailable', message: 'AI is temporarily unavailable. Please try again later.', retry_after: 300 });
      }
      console.error('MT AI insight OpenAI error:', aiErr.message);
      insight = null;
    }

    // Graceful fallback — AI failure never crashes the response
    res.json({ insight: insight || fallbacks[Math.floor(Math.random() * fallbacks.length)] });
  } catch (err) {
    console.error('MT AI insight error:', err.message);
    res.json({ insight: fallbacks[Math.floor(Math.random() * fallbacks.length)] });
  }
});

// POST /favorites
router.post('/favorites', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  const { content_type, content_text } = req.body;
  if (!content_type || !content_text) return res.status(400).json({ error: 'Type and text required' });
  try {
    const result = await pool.query(
      `INSERT INTO mt_favorites (user_id, content_type, content_text) VALUES ($1, $2, $3) RETURNING *`,
      [user.id, content_type, content_text.trim().substring(0, 500)]
    );
    res.json({ favorite: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

// GET /ai-recommendations — personalized game recommendations for Progress tab
router.get('/ai-recommendations', async (req, res) => {
  const defaultRecs = {
    game_rec: "Try Mind Sync to sharpen your sequence memory and attention span.",
    cognitive_insight: "Regular brain training combined with daily thought capture creates measurable cognitive improvements.",
    action_tip: "Set aside 10 minutes today for a brain game and capture your best idea after."
  };
  const user = await requireUser(req, res);
  if (!user) return;
  try {
    const gameStats = await pool.query(
      `SELECT game, best_score, times_played, last_played FROM mt_game_stats WHERE user_id = $1`,
      [user.id]
    );
    const wellnessData = await pool.query(
      `SELECT mood, energy, stress FROM mt_wellness WHERE user_id = $1 ORDER BY created_at DESC LIMIT 3`,
      [user.id]
    );
    const recentActivity = await pool.query(
      `SELECT thoughts_captured, activity_date FROM mt_activity WHERE user_id = $1 ORDER BY activity_date DESC LIMIT 7`,
      [user.id]
    );

    const totalCaptures = recentActivity.rows.reduce((s, r) => s + r.thoughts_captured, 0);
    const avgMood = wellnessData.rows.length ? (wellnessData.rows.reduce((s, r) => s + r.mood, 0) / wellnessData.rows.length).toFixed(1) : 'unknown';
    const avgEnergy = wellnessData.rows.length ? (wellnessData.rows.reduce((s, r) => s + r.energy, 0) / wellnessData.rows.length).toFixed(1) : 'unknown';
    const gamesList = gameStats.rows.map(g => `${g.game}: best=${g.best_score}, played=${g.times_played}`).join('; ');

    const context = `User "${user.username}" has captured ${totalCaptures} thoughts this week. Average mood: ${avgMood}/5, energy: ${avgEnergy}/5. Game history: ${gamesList || 'no games played yet'}.`;

    // Guard: skip AI call if no API key configured
    if (!process.env.OPENAI_API_KEY) {
      return res.json(defaultRecs);
    }

    let recs = null;
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are MemTool's cognitive coach. Analyze the user's data and provide:
1. ONE specific game recommendation with a short reason (1-2 sentences)
2. ONE cognitive insight about their patterns (1-2 sentences)
3. ONE action tip for this week (1 sentence)

Format as JSON: { "game_rec": "...", "cognitive_insight": "...", "action_tip": "..." }
Games available: Mind Sync (sequence memory), Neural Recall (visual/spatial), Cortex Grid (logic), 24 Game (mental math), Memory Match (short-term recall).
Keep it warm, personal, and actionable. No markdown, just the JSON.`
          },
          { role: 'user', content: context }
        ],
        max_tokens: 300,
        temperature: 0.7
      });

      const text = completion.choices[0].message.content;
      const cleaned = stripMarkdownFences(text);
      const match = cleaned.match(/\{[\s\S]*\}/);
      try {
        recs = match ? JSON.parse(match[0]) : null;
      } catch (_parseErr) {
        // Malformed JSON from AI — fall back to defaults
        recs = null;
      }
    } catch (aiErr) {
      if (isOpenAIQuotaError(aiErr)) {
        const ts = new Date().toISOString();
        console.warn(`[WARN] OpenAI quota exceeded at ${ts} — endpoint: /ai-recommendations`);
        return res.status(503).json({ error: 'ai_unavailable', message: 'AI is temporarily unavailable. Please try again later.', retry_after: 300 });
      }
      console.error('MT AI recommendations OpenAI error:', aiErr.message);
      recs = null;
    }

    // Graceful fallback — AI failure never crashes the response
    res.json(recs || defaultRecs);
  } catch (err) {
    console.error('MT AI recommendations error:', err.message);
    res.json(defaultRecs);
  }
});

// GET /brain-score — composite cognitive wellness metric
router.get('/brain-score', async (req, res) => {
  const user = await requireUser(req, res);
  if (!user) return;
  try {
    // Streak score (0-30 points)
    const today = new Date().toISOString().split('T')[0];
    const activityResult = await pool.query(
      `SELECT activity_date FROM mt_activity WHERE user_id = $1 ORDER BY activity_date DESC LIMIT 30`,
      [user.id]
    );
    const dates = activityResult.rows.map(r => String(r.activity_date).substring(0, 10));
    let streak = 0;
    let checkDate = new Date(today);
    for (let i = 0; i < 30; i++) {
      const ds = checkDate.toISOString().split('T')[0];
      if (dates.includes(ds)) { streak++; checkDate.setDate(checkDate.getDate() - 1); }
      else break;
    }
    const streakScore = Math.min(30, streak * 3);

    // Capture score (0-25 points)
    const totalCaptures = await pool.query(`SELECT COUNT(*) FROM mt_thoughts WHERE user_id = $1`, [user.id]);
    const captureCount = parseInt(totalCaptures.rows[0].count);
    const captureScore = Math.min(25, Math.floor(captureCount / 2));

    // Wellness score (0-25 points)
    const wellnessData = await pool.query(
      `SELECT mood, energy, stress FROM mt_wellness WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5`,
      [user.id]
    );
    let wellnessScore = 0;
    if (wellnessData.rows.length > 0) {
      const avgMood = wellnessData.rows.reduce((s, r) => s + r.mood, 0) / wellnessData.rows.length;
      const avgEnergy = wellnessData.rows.reduce((s, r) => s + r.energy, 0) / wellnessData.rows.length;
      const avgStress = wellnessData.rows.reduce((s, r) => s + r.stress, 0) / wellnessData.rows.length;
      // Higher mood + energy, lower stress = better score
      wellnessScore = Math.round(((avgMood + avgEnergy + (6 - avgStress)) / 15) * 25);
    }

    // Game score (0-20 points)
    const gameStats = await pool.query(
      `SELECT times_played FROM mt_game_stats WHERE user_id = $1`,
      [user.id]
    );
    const totalGamesPlayed = gameStats.rows.reduce((s, r) => s + r.times_played, 0);
    const gameScore = Math.min(20, Math.floor(totalGamesPlayed * 2));

    const brainScore = streakScore + captureScore + wellnessScore + gameScore;
    let tier = 'Beginner';
    if (brainScore >= 80) tier = 'Master';
    else if (brainScore >= 60) tier = 'Advanced';
    else if (brainScore >= 40) tier = 'Intermediate';
    else if (brainScore >= 20) tier = 'Explorer';

    res.json({ brain_score: brainScore, max_score: 100, tier, breakdown: { streak: streakScore, captures: captureScore, wellness: wellnessScore, games: gameScore } });
  } catch (err) {
    console.error('MT brain score error:', err.message);
    res.json({ brain_score: 0, max_score: 100, tier: 'Beginner', breakdown: { streak: 0, captures: 0, wellness: 0, games: 0 } });
  }
});

module.exports = router;
