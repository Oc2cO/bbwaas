# SELLTHIS V2 — Assets README

**Date:** 2026-06-13
**Status:** TEMP ASSET NOTICE

---

## Required Assets (not yet in repo)

| Asset | Status | Purpose |
|-------|--------|---------|
| Transparent PNG cutouts (denim jacket, camera, headphones, boots, watch, speaker) | **TEMP** — emoji placeholders used | Floating items on sky layer |
| Sky variants (day, golden hour, night, stormy) | **TEMP** — CSS gradients used | Full-bleed sky background |
| Scanner frame overlays (cyan neon viewfinder) | **BUILT** — CSS corners | Camera preview overlay |
| Camera icon, microphone icon (neon line style) | **TEMP** — emoji used | Action buttons |
| "LIVE" badge asset | **BUILT** — CSS badge | Status indicator |
| Inter font | **CDN** — Google Fonts | Brand typography |

## Asset Requirements (from Visual Contract)

- All cutouts must be transparent PNG/WebP (no white boxes, no solid backgrounds)
- Optimized for mobile performance (under 200KB each)
- 8-10 unique items minimum for variety
- Sky backgrounds: 4 variants minimum (day, golden hour, night, stormy)

## How to Replace Temp Assets

1. Place transparent PNGs in `assets/images/`
2. Update `index.html` to use `<img>` tags instead of emoji in `.float-item` divs
3. Remove `.float-note` text
4. Test on phone for performance

## No external API calls

This app makes zero network calls except for the Google Fonts CDN link.
All sky backgrounds are CSS gradients — no weather API used yet.
