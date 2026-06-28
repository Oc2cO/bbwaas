# Sky Background Assets
**Status:** WAITING FOR GROK ASSET PACK

---

## Expected Files

Place these files in this folder when received:

| File | Description |
|------|-------------|
| `sky_day.jpg` | Bright daytime sky with soft clouds |
| `sky_golden.jpg` | Golden hour / sunset warm gradient |
| `sky_night.jpg` | Night sky with stars, deep blue |
| `sky_rain.jpg` | Overcast / stormy grey sky |

## Requirements
- JPEG format, ≤500KB each
- Large enough for 393×852 phone viewport
- No watermarks, no text overlays
- Real photographic style (not illustration)

## Usage
Replaces current CSS gradient in `.phone-sky-img` background-image property.
Sky toggles by time of day via JS `setSkyTime()` function.

## Rules
- Do not create fake/placeholder sky images
- Do not use CSS gradients as substitute
- If file is missing, feature stays hidden
