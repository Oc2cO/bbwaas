# Images/ - Categorized OC2CO Website Visual Assets

## Organization
Images are curated into subfolders by usage/type for easy reference during website build and updates:
- **Backgrounds/** : Full-bleed or scene backgrounds (e.g. checkout page world scene)
- **Buttons/** : CTA buttons, interactive elements, electric text styles
- **Cards/** : UI cards, glass/liquid styles for checkout or general (project cards moved to dedicated)
- **Heroes/** : Hero section backgrounds for pages (home, store)
- **Logos/** : Brand marks, orbital logos, favicons etc.
- **MemTool/** : Visuals specific to MemTool project (e.g. memory atrium card for homepage project cards)
- **SellThis/** : Visuals specific to SellThis project (e.g. AI listing pack card)
- **Other/** : Stray or miscellaneous oc2co images (e.g. OC2CO IMAGES.png)

## How Images Are Saved / Naming
- Each asset group kept in its **original Canva export folder name**: `OC2CO_<DESCRIPTOR>_<VERSION>` (e.g. OC2CO_HOME_HERO_COSMIC_ORIGIN_V02, OC2CO_CHECKOUT_BUTTON_ELECTRIC_TEXT_V01)
- This preserves traceability back to asset catalog and Canva candidates.
- Inside each named folder:
  - Exported image files (when available): prefer WEBP primary + PNG fallback. SVG for logos. Named consistently or as exported.
  - `README.md` : Contains purpose, full Canva candidate description, recommended sizes (e.g. 1920x1080 for heroes), export formats, placement notes (e.g. "Behind hero content on index.html", "For project cards on homepage"), status.
- **Page / Element association examples** (from catalog and reports):
  - OC2CO_HOME_HERO_* : index.html hero background
  - OC2CO_STORE_HERO_* : store page hero
  - OC2CO_CHECKOUT_BG_* : checkout.html / checkout/ background layer (z-index low, protected center area for card)
  - OC2CO_CHECKOUT_BUTTON_* : checkout CTA button style (electric flowing text)
  - OC2CO_CHECKOUT_CARD_* : checkout card UI liquid glass style board
  - OC2CO_CARD_MEMTOOL_* : MemTool project card visual (homepage or dedicated)
  - OC2CO_CARD_SELLTHIS_* : SellThis project card visual
  - OC2CO_LOGO_* : header, favicon, cards
- Sizes per catalog:
  - Heroes/Backgrounds: Primary 1920×1080 (or 2560x1440, crops)
  - Cards: 1200×900 primary
  - Logo: Vector/SVG + 512x512, 1024x1024 PNG
- Never cover: buttons, links, checkout text, nav, totals, product info, etc.

## Current Status
- Folders organized per WP2 packet.
- Content: Currently mostly the descriptive README.md files (specs). Actual final image exports from Canva not present in filesystem (catalog status: "Canva candidates generated (not final, not exported, not live)").
- When images exported: add to the named folder, test with real UI (index.html, checkout.html, store/).
- One stray `OC2CO IMAGES.png` (1024x1024) found at top Images/ level, moved here to Other/.

## Rules (from packet/catalog)
- Premium, trustworthy, futuristic, mature Oc2cO feel.
- Steven final approval before live.
- Visuals support the brand but do not obscure interactive/important UI.
- Cross ref with reports in Documents/Reports/ (e.g. V2B, visibility, landing).

See root README.md and Canva_Exports/ASSET_CATALOG... for full list and next steps.
