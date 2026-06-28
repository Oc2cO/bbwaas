# oc2co Website Curation (Website/oc2co/)

**Branch:** Dedicated curation area for the oc2co public website build, visuals, and related docs. Part of BBWAAS/Website/ only (no App_Store_Apps, no STALE, no symlinks touched).

## Target Structure
- `Images/` - Categorized visual assets (see Images/README.md)
- `Source/` - Full oc2co_website/ build source (see Source/README.md)
- `Documents/` - Reports and alignment/integration docs (see Documents/README.md)
- `Canva_Exports/` - Asset catalog and source image folders from Canva
- `Subdomains/` - Curated copies of subdomain/page folders (arcade, store, checkout, success, cancel, cinematic)
- `Assets/` - Additional media/assets (e.g. intro videos, celebrate clips, misnamed exports)
- `oc2co/` top-level READMEs and organization

## Sources Located and Filed Away
- Located via `ls`, `find`, `list_dir`:
  - Original: `/mnt/c/Users/Sagou/Documents/BrainHub/oc2co_website/` (full ~357M source with html, css, js, subdirs, videos, reports)
  - Original: `/mnt/c/Users/Sagou/Documents/BrainHub/canva_exports/` (OC2CO* folders + ASSET_CATALOG)
  - Assets inside source (empty placeholder cards/logos/visuals)
  - Reports: multiple OC2CO_*_REPORT.md and BBWAAS_*_REPORT.md mixed in source root
  - Other docs: *.md integrations, scripts in source root
  - Stray image: OC2CO IMAGES.png (moved to Images/Other/)
  - No other image files found for OC2CO in non-forbidden paths (STALE and App_Store_Apps untouched)
- Moved:
  - oc2co_website/ --> Source/oc2co_website/ (full structure preserved)
  - OC2CO* folders from canva_exports --> Images/ subcats (already partially done; refined)
  - ASSET_CATALOG... --> Canva_Exports/
  - All OC2CO_*_REPORT.md + BBWAAS reports from source --> Documents/Reports/
  - Integration .md (first-video-script.md, payments-layer-integration.md, store-integration.md) --> Documents/Alignment/
  - Subdomain folders (arcade etc) copied to Subdomains/ (source kept intact)
  - OC2CO IMAGES.png --> Images/Other/
  - Leftover canva_exports/curated/ duplicate cleaned (rm after duplicate check)
- Remnants cleaned: empty original canva_exports/ at BrainHub/ root removed.

## Image Categorization Used
See Images/README.md for details. Key rules followed from packet:
- Keep original OC2CO_*_Vxx folder names inside category subdirs for traceability.
- Each folder contains (or will contain) exported images + its descriptive README.md (from asset catalog).
- Currently: most folders hold only the spec README.md (Canva candidates not yet exported as final PNG/WEBP/SVG to FS; catalog notes "not final, not exported").
- Project cards moved to MemTool/ and SellThis/ (per packet suggestion for OC2CO_CARD_MEMTOOL to MemTool/ etc).
- Checkout UI card stayed in Cards/.

## Notes / Issues
- No actual Canva exported image files (png/webp) located for the OC2CO_* assets outside STALE (which was untouched). The folders serve as organized holders + specs.
- Source contains .git, .venv, large mp4 videos (oc2co_intro*.mp4), animation/ clips, audio/, agw/ (agent workspace with more packets/reports -- left inside as part of full folder), iris_oracle/, tools/, web-apps/.
- Subdomains/ populated via cp (not mv) to avoid breaking relative paths or dev structure in Source/.
- Assets/ contains misnamed media (e.g. *.png that are actually mp4/wav/html/json) + temp_intro/ subs -- left in place as they relate to website intro/celebrate.
- Duplicates handled: one OC2CO_BG in canva_exports/curated was identical to Images/Backgrounds/ one (only READMEs), cleaned.
- BBWAAS symlinks (e.g. PROJECT_OC2CO_*) , STALE, App_Store_Apps untouched per instructions.
- Reports extracted from source root to keep build folder clean (source still has internal copies in agw/AGENT_WORKSPACE/ etc).

## How to Add New Images
When exporting from Canva:
- Place final PNG/WEBP/SVG into the appropriate OC2CO_* folder under Images/<Category>/
- Update or keep the README.md in that folder (sizes, placement notes).
- For new assets, add new OC2CO_NAMED folder under correct cat, document in catalog if needed.
- Test behind real UI elements (index.html hero, checkout card, project cards etc).

## Related
- Work Packet: BBWAAS/Work_Packets/WP2_oc2co_Website_Curation.md
- Asset catalog: Canva_Exports/ASSET_CATALOG_OC2CO_FINISHED_ASSETS_V01.md
- Source build entry: Source/oc2co_website/index.html + checkout.html etc.

Curated 2026-06-27 by BG Subagent 2 (focused only on oc2co website branch).
