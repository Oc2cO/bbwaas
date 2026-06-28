# Source/ - oc2co Website Build Source

## Contents
- `oc2co_website/` : The full oc2co public website source/build folder moved here from /BrainHub/oc2co_website/
  - Size: ~357M (includes large mp4 intro videos)
  - Core web files:
    - index.html (main landing)
    - checkout.html
    - style.css
    - script.js
    - CNAME
    - payments-*.js , store-backend.js etc.
    - enable_pages.sh
  - Page/subdomain folders (also mirrored under ../Subdomains/ for curation):
    - arcade/index.html
    - store/index.html
    - checkout/index.html
    - success/index.html
    - cancel/index.html
    - cinematic/index.html
  - Other:
    - assets/ (placeholder subdirs cards/, logos/, visuals/ + README; referenced by checkout.html e.g. assets/visuals/OC2CO_....png -- image not present yet)
    - animation/ (clip*.mp4)
    - audio/ (vibe*.mp3/mp4)
    - oc2co_intro*.mp4 (large silent/intro videos)
    - intro-animation.html
    - iris_oracle/ (index + reference md)
    - tools/ (cinematic layer css/js + skill md)
    - web-apps/ (paywall, entitlements examples)
    - bbwaas_mcp/ , bbwaas_sidecar/ (side projects?)
    - agw/ (AGENT BRAIN SNAPSHOT: contains AGENT_WORKSPACE/ + PACKETS/ + BBWAAS_MASTER_LINK -> canonical BBWAAS/AGENT_WORKSPACE; for local snapshot/reference. Primary writes ALWAYS to canonical BBWAAS/AGENT_WORKSPACE not here. BG5 bridged/updated READMEs)
    - .git/ , .venv/ , .env.example , index.html.bak* etc.
  - Sub pages use relative links (store/, arcade/, etc.) aligned to local folder structure and canonical domain www.oc2co.com . Local folders support dev serving; deploy via GitHub Pages (CNAME). Polsia was legacy staging.

## How This Was Filed
- Original location: BrainHub/oc2co_website/ (located with ls/find)
- Moved (filed away) to here to centralize under Website/oc2co/Source/ while preserving exact build structure for continued dev/deploy.
- Reports and loose .md docs were extracted from the root of oc2co_website/ (to Documents/Reports/ and Documents/Alignment/) to keep the source folder focused on build artifacts. (See root README for list of moved files.)
- Subdomain folders were **copied** (cp -r) to Subdomains/ ; originals remain in source to not break any local paths, dev server, or references.

## Notes
- This is the live source for the oc2co website (previously symlinked in places via BBWAAS/ but those untouched).
- To build/test: cd Source/oc2co_website ; serve index.html / sub index.htmls locally.
- Videos and media inside support intro/animation/cinematic features (see first-video-script.md in Alignment).
- Any new source files or updates stay inside oc2co_website/.
- Internal agw/ contains more oc2co research/packets but treated as part of the snapshot source.

See top-level oc2co/README.md for full move log and Subdomains/ for organized page copies.
