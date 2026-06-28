// MemTool TTS (text-to-speech) proxy — cloud voice for Mem AI companion.
// Owns: POST /api/memtool/tts/speak
//       Accepts { text, mood?, speed? }, synthesises with OpenAI TTS,
//       uploads the MP3 to R2, returns { audioUrl, wordTimestamps, durationMs }.
// Does NOT own: chat logic, memory storage, subscription billing.
//
// Word timestamps are estimated from text (OpenAI TTS doesn't expose alignment
// data). The estimator matches expo-speech's default cadence (~3.2 wps spoken,
// ~0.94 rate) so the mobile word-reveal cursor stays in sync within ~100ms.
// Speed variants are mapped to the expo-speech-compatible wps rates below so
// the mobile side can use the same reveal logic regardless of which TTS path
// it's on (on-device expo-speech vs this cloud endpoint).
//
// Rate limit: 30 req/hr per user. TTS costs ~$0.015/1K chars (tts-1-hd).
// A typical Mem reply is ~80 chars → ~$0.0012/call → ~$0.036/hr at the cap.

'use strict';

const express = require('express');
const fetch = require('node-fetch');
const FormData = require('form-data');
const openai = require('../lib/openai');
const { memtoolAuth } = require('../lib/auth');

const router = express.Router();

// ─── Rate limiting ────────────────────────────────────────────────────────────
// In-memory store: { userId → { count, windowStart } }
// Intentionally simple — a restart resets the window, which is fine for TTS
// (over-counting is safer than under-counting for expensive calls).
const TTS_RATE_LIMIT = 30;            // max calls per window
const TTS_RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const rateLimitStore = new Map();

function checkRateLimit(userId) {
  const now = Date.now();
  const entry = rateLimitStore.get(userId);
  if (!entry || now - entry.windowStart >= TTS_RATE_WINDOW_MS) {
    rateLimitStore.set(userId, { count: 1, windowStart: now });
    return { allowed: true, remaining: TTS_RATE_LIMIT - 1 };
  }
  if (entry.count >= TTS_RATE_LIMIT) {
    const resetIn = Math.ceil((TTS_RATE_WINDOW_MS - (now - entry.windowStart)) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }
  entry.count += 1;
  return { allowed: true, remaining: TTS_RATE_LIMIT - entry.count };
}

// ─── Voice selection ──────────────────────────────────────────────────────────
// OpenAI TTS voices: alloy, echo, fable, onyx, nova, shimmer
// "nova" is the warmest/most calming — closest to Mem's personality brief.
// "shimmer" is a soft backup for future mood-adaptive variant.
const VOICE_BY_MOOD = {
  calm:    'nova',
  happy:   'nova',
  sad:     'nova',     // calm delivery even for empathetic context
  anxious: 'nova',
  neutral: 'nova',
};
const DEFAULT_VOICE = 'nova';

// ─── Speed → words-per-second mapping ────────────────────────────────────────
// These wps values mirror what expo-speech produces at the corresponding rate
// so the mobile word-reveal cursor (which uses the same wps estimator) stays
// in lock-step with the audio regardless of whether expo-speech or this
// cloud TTS path is playing.
const SPEED_CONFIG = {
  slow:    { rate: 0.85, wps: 2.8 },
  normal:  { rate: 0.94, wps: 3.2 },   // expo-speech default
  fast:    { rate: 1.15, wps: 3.9 },
};
const DEFAULT_SPEED = 'normal';

// Maximum input length — OpenAI TTS supports up to 4096 chars; we cap at 2000
// to stay well within per-call cost limits and to keep audio files small.
const MAX_TEXT_LENGTH = 2000;

// ─── Word timestamp estimation ────────────────────────────────────────────────
// OpenAI TTS doesn't return alignment data. We estimate word-level timestamps
// from the text itself using a syllable-count heuristic for per-word duration.
//
// The heuristic is calibrated to the "nova" voice at 0.94 rate:
//   - average 3.2 words/second (= ~313ms/word)
//   - longer / more-syllabled words get proportionally more time
//   - short words (articles, "I", "a") get a minimum 120ms floor
//
// Accuracy: within ~80ms for typical 10-20 word sentences. The mobile side
// is already tolerant of boundary drift (it clamps, never goes backward) so
// this is sufficient for the karaoke-highlight effect.
function estimateWordTimestamps(words, wps) {
  const msPerWord = 1000 / wps;
  // Silence padding before speech starts (TTS engines have a ~50-100ms lead-in)
  let cursor = 80;
  const timestamps = [];

  for (const word of words) {
    // Strip punctuation for syllable counting, but keep the original word for display
    const clean = word.replace(/[^\w'-]/g, '');
    const syllables = countSyllables(clean);
    // Weight duration by syllable count relative to average (1.8 syllables = baseline)
    const durationMs = Math.max(120, Math.round(msPerWord * (syllables / 1.8)));
    timestamps.push({
      word,
      startMs: cursor,
      endMs: cursor + durationMs,
    });
    // Inter-word gap: ~40ms for normal flow, slightly more after punctuation
    const hasBreak = /[.,!?;:]$/.test(word);
    cursor += durationMs + (hasBreak ? 120 : 40);
  }

  return timestamps;
}

// Syllable counter for English — good enough for TTS timing estimation.
// Counts vowel groups as a proxy for syllable count, with adjustments for
// common patterns (silent-e, -tion, -le endings, etc.).
function countSyllables(word) {
  if (!word) return 1;
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 1;
  if (w.length <= 3) return 1;

  let count = 0;
  let prev = false;
  for (const ch of w) {
    const isVowel = /[aeiouy]/.test(ch);
    if (isVowel && !prev) count += 1;
    prev = isVowel;
  }
  // Silent 'e' at end
  if (/[^aeiouy]e$/.test(w)) count -= 1;
  // Words like "le", "ble", "tle" at end add a syllable
  if (/[^aeiouy]le$/.test(w)) count += 1;
  // -ion/-tion is 2 syllables
  if (/[^aeiouy]tion$/.test(w)) count += 1;

  return Math.max(1, count);
}

// ─── Endpoint ─────────────────────────────────────────────────────────────────

/**
 * POST /api/memtool/tts/speak
 *
 * Body: { text: string, mood?: string, speed?: "slow"|"normal"|"fast" }
 *
 * Returns:
 *   {
 *     audioUrl: string,                         // R2 CDN URL, MP3
 *     wordTimestamps: [{ word, startMs, endMs }],
 *     durationMs: number,
 *     characterCount: number,
 *   }
 *
 * Integration guide for mobile:
 *   1. POST this endpoint after receiving Mem's reply from /ai-guide/chat
 *   2. Play audioUrl via expo-audio (Audio.Sound.createAsync)
 *   3. Poll sound.getStatusAsync() or setOnPlaybackStatusUpdate()
 *   4. On each positionMillis tick, find the matching wordTimestamps entry
 *      and advance the visibleWordCount cursor + Memora expression/viseme
 *   5. On playback end, call stop() on useMemSpeech to reset mouth/viseme
 *
 * Falls back gracefully: if this endpoint is unavailable the mobile side
 * continues with expo-speech (on-device TTS) exactly as it does today.
 */
router.post('/tts/speak', memtoolAuth, async (req, res) => {
  // memtoolAuth sets req.memtoolUserId (not req.memtoolUser)
  const userId = req.memtoolUserId;
  const { allowed, remaining, resetIn } = checkRateLimit(String(userId));
  if (!allowed) {
    return res.status(429).json({
      error: `TTS rate limit reached (${TTS_RATE_LIMIT} calls/hour). Resets in ${resetIn}s.`,
    });
  }

  const { text, mood, speed } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required (string)' });
  }
  const trimmed = text.trim();
  if (!trimmed) {
    return res.status(400).json({ error: 'text must not be blank' });
  }
  if (trimmed.length > MAX_TEXT_LENGTH) {
    return res.status(400).json({
      error: `text exceeds ${MAX_TEXT_LENGTH} character limit (got ${trimmed.length})`,
    });
  }

  const speedKey = SPEED_CONFIG[speed] ? speed : DEFAULT_SPEED;
  const { rate, wps } = SPEED_CONFIG[speedKey];
  const voice = VOICE_BY_MOOD[mood] || DEFAULT_VOICE;

  // ── 1. Synthesise with OpenAI TTS ─────────────────────────────────────────
  let audioBuffer;
  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1-hd',      // higher quality; ~2× cost of tts-1 but still ~$0.015/1K chars
      voice,
      input: trimmed,
      response_format: 'mp3',
      speed: rate,
    });
    // The SDK returns a Response-like object; extract the binary body
    audioBuffer = Buffer.from(await response.arrayBuffer());
  } catch (err) {
    const message = err?.message || 'TTS synthesis failed';
    console.error('[tts] synthesis error:', message);
    return res.status(502).json({ error: 'TTS service unavailable. Falling back to on-device voice.' });
  }

  // ── 2. Upload to R2 ──────────────────────────────────────────────────────
  const filename = `tts_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.mp3`;
  let audioUrl;
  try {
    const formData = new FormData();
    formData.append('file', audioBuffer, {
      filename,
      contentType: 'audio/mpeg',
    });

    const uploadRes = await fetch(`${process.env.POLSIA_R2_BASE_URL}/api/proxy/r2/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.POLSIA_API_KEY}`,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadData.success) {
      throw new Error(uploadData.error?.message || 'R2 upload failed');
    }
    audioUrl = uploadData.file.url;
  } catch (err) {
    console.error('[tts] R2 upload error:', err?.message);
    return res.status(502).json({ error: 'Audio storage unavailable. Falling back to on-device voice.' });
  }

  // ── 3. Compute word timestamps ────────────────────────────────────────────
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordTimestamps = estimateWordTimestamps(words, wps);
  const durationMs = wordTimestamps.length > 0
    ? wordTimestamps[wordTimestamps.length - 1].endMs + 200 // 200ms tail silence
    : 0;

  return res.json({
    audioUrl,
    wordTimestamps,
    durationMs,
    characterCount: trimmed.length,
    // Echo back the config so the mobile side can verify it's in sync
    voice,
    speedKey,
  });
});

module.exports = router;
