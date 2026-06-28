# Scanner UI Overlay Assets
**Status:** WAITING FOR GROK ASSET PACK

---

## Expected Files

Place these files in this folder when received:

| File | Description |
|------|-------------|
| `scanner_corners.svg` | Cyan neon viewfinder corner brackets (4 corners) |
| `live_badge.svg` | "LIVE" indicator badge with red pulsing dot |

## Requirements
- SVG format (scales cleanly at any resolution)
- Cyan color matching `#67e8f9` for scanner corners
- Red `#ef4444` for LIVE dot
- Clean, minimal, neon-glow style

## Usage
- `scanner_corners.svg` replaces current CSS-drawn corners in `index.html` `.vf-frame`
- `live_badge.svg` replaces current CSS-drawn live indicator

## Rules
- Do not create fake SVG files
- If file is missing, CSS fallback remains active
- Do not use emoji as substitute
