# Floating Item Cutout Assets
**Status:** WAITING FOR GROK ASSET PACK

---

## Expected Files — Primary (6)

Place these files in this folder when received:

| # | File | Description | Vibe |
|---|------|-------------|------|
| 1 | `denim_jacket.png` | Blue denim jacket | Classic resale staple |
| 2 | `retro_sneakers.png` | Vintage-style sneakers | 80s-90s nostalgia, hype |
| 3 | `vintage_camera.png` | Retro film camera | Analog revival, creator aesthetic |
| 4 | `headphones.png` | Over-ear headphones | Street style, daily carry |
| 5 | `handheld_gaming_device.png` | Retro handheld console | 90s nostalgia resurgence |
| 6 | `handbag.png` | Leather crossbody bag | Practical resale |

## Expected Files — Optional Pool (Grok to refine to final 8-10 total)

| # | File | Description |
|---|------|-------------|
| 7 | `leather_boots.png` | Leather work/combat boots |
| 8 | `crossbody_bag.png` | Sling/crossbody bag |
| 9 | `mechanical_keyboard.png` | Retro mechanical keyboard |
| 10 | `collectible_toy.png` | Designer/vinyl art toy |
| 11 | `mini_speaker.png` | Portable Bluetooth speaker |
| 12 | `smartwatch_or_wearable.png` | Smartwatch/fitness wearable |
| 13 | `mini_boombox_or_cassette_item.png` | Mini boombox or cassette player |

## Requirements (all items)
- Transparent background (PNG or WebP with alpha channel)
- Realistic product photography style — no illustrations, no cartoons
- Avoid obvious trademark/logos where possible
- 300-800px wide at 72dpi
- No drop shadows in the image file — CSS handles this
- ≤200KB each for mobile performance

## Target Audience
Age 20-40. Mix of retro/nostalgia (80s-00s energy) and current hype/resale culture.

## Usage
Each file gets an `<img>` tag in `index.html` inside `.float-world` div.
CSS `@keyframes` float paths are ready — just add the `class="float-item fi-N"`.

## Rules
- Do not create fake/placeholder item images
- Do not use emoji as fallback
- If file is missing, the item stays hidden — no placeholder
- No boxes, no borders, no solid backgrounds around items
