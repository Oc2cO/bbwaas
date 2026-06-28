# WEBSITE_ADDRESSING_AUDIT_BG4_REPORT.md
**BG Agent 4 (Website Code & Visuals Addressing Lens)**  
**Date:** 2026-06-27  
**Task:** Deep scan canonical website source + related for incorrect addresses/links/references. Focus: pages, visuals, functions, animations, Canva. Compare Polsia vs current source vs GitHub branches. Identify misalignments + exact fixes.

**Scope (per instructions):**
- Canonical: `/home/sagou/bbwaas/Website/oc2co/Source/oc2co_website/` (index.html, style.css, script.js, cinematic/, arcade/, store/, animation/, checkout/, success/, cancel/, intro-animation.html, payments-*.js, store-backend.js, CNAME, tools/, web-apps/, agw/ internal, etc.)
- Subdomains copies: `../Subdomains/` (arcade/, store/ etc.)
- Canva: `Website/oc2co/Canva_Exports/`, `Other_Projects/Canva_Exports` (symlink), references in catalogs + Images/
- Related: `Website/oc2co/Documents/Alignment/`, `Documents/Reports/`, Source/READMEs, Source/oc2co_website agw packets
- Scanned via grep/find/cat/list_dir/run_terminal (isolated, multiple passes)
- Git: local .git + origin/main + branches (fetch done)
- NOT: full App_Store_Apps old_components (noted only), full historical reports (summarized)

## 1. List of Bad URLs Found + Locations (pre-fix)

**Primary bad domain (legacy staging): `https://oc2coos-2.polsia.app/*`**
- Used for functional delegation of Store/Arcade/Checkout (per old Polsia linking reports).
- Found in executable HTML (many duplicates):
  - Source/oc2co_website/index.html: Store, Arcade (nav), SellThis parked-btn (lines ~14,15,83)
  - Source/oc2co_website/store/index.html: Store (self), Arcade, /store/checkout preview (lines ~12,13,26)
  - Source/oc2co_website/arcade/index.html: Store, Arcade (lines ~12,13)
  - Source/oc2co_website/cinematic/index.html: /checkout, /store, /arcade (footer line ~247); also video src mismatch
  - Source/oc2co_website/checkout/index.html: Store, Arcade, Back-to-Store (nav + footer ~20,21,40)
  - Source/oc2co_website/checkout.html: Store, Arcade (nav ~55,56)
  - Source/oc2co_website/success/index.html: Store, Arcade, Back-to-Store (~12,13,20)
  - Source/oc2co_website/cancel/index.html: Store, Arcade, Back-to-Store (~12,13,20)
  - Subdomains/arcade/index.html, store/index.html, cinematic/index.html, checkout/index.html, success/index.html, cancel/index.html: identical hardcodes (mirrors)
- In JS/config:
  - store-backend.js: comments + defaults SITE_URL, STORE_*_URL, webhook_url (lines ~18-24,289,290,510)
- In docs (non-exec):
  - Source/oc2co_website/Source/README.md (explicit note about external links)
  - Documents/Alignment/store-integration.md (webhook, envs)
  - Documents/Reports/* (multiple 10BG agents, OC2CO_POLSIA_LINKING, VISIBLE_RENDER, etc.)
  - agw/AGENT_WORKSPACE/PACKETS/*.md
  - Scattered: App_Store_Apps/MemTool/Code/old_components/* (memtool-voice, sync), Other_Projects/Polsia/README (pointer)
- Also: `https://oc2coos-2.polsia.app/store/checkout` (wrong nesting; checkout/ is sibling not under /store/)

**Video src misalignments (oc2co_intro.mp4 vs clip1 vs silent):**
- index.html: `oc2co_intro_silent.mp4` (root, current)
- cinematic/index.html + Subdomains/cinematic: `../oc2co_intro.mp4` (non-silent)
- animation/ has clip1.mp4..clip8.mp4 (per cinematic skill docs)
- GitHub branch oc2co-route-video-home-fix-01: `../animation/clip1.mp4` (different structure)
- Docs (agw packets): reference oc2co_intro_silent.mp4
- Root files exist: oc2co_intro.mp4 + oc2co_intro_silent.mp4 (~25MB each)

**Domain inconsistencies (www.oc2co.com vs oc2co.com vs others):**
- CNAME: `www.oc2co.com` (correct)
- Many nav: `https://www.oc2co.com` (Home, anchors, back links) — good
- Footers/comments: mixed "oc2co.com" vs "www.oc2co.com"
- memtool.oc2co.com (in checkout.html comments + reports)
- GitHub: `https://github.com/Oc2cO` (and repo `-oc2co`)
- Google fonts external (cinematic + iris_oracle): https://fonts.googleapis.com (common CDN, not "bad" but noted)
- Localhost: sidecar/mcp (dev only, manifest.json, server.js)
- payments-example-server.js: `https://www.oc2co.com/checkout.html` (uses .html variant vs /checkout/ dir)

**Canva / Visuals / Path misalignments:**
- Canva_Exports/ASSET_CATALOG_*.md: "Folder: canva_exports/OC2CO_*..." (outdated; assets moved to Images/Backgrounds/ etc.)
- Canva_Exports/README.md: references old BrainHub + "canva_exports/" paths
- Other_Projects/Canva_Exports: broken symlink -> ../../canva_exports (no target; /home/sagou/canva_exports absent)
- No actual PNG/WEBP in Canva or Images/* (only README specs + one stray OC2CO IMAGES.png); visuals are 100% CSS (ocean-night-scene, celestial, waves) + local mp4 in code. No bad image src= in HTML/CSS/JS.
- Images/README + catalogs note "not final, not exported"
- No Canva export URLs (e.g. canva.com links) found in code; all internalized to md + folders.

**Subdomains vs Source misalignments:**
- Subdomains/* are near-identical copies (including old polsia + ../style.css)
- CSS broken in Subdomains: `../style.css` resolves wrong (no style.css at Website/oc2co/); Source uses correctly relative to oc2co_website/
- Nav links now fixed to be self-contained in Subdomains (../store/ etc.)
- Subdomains absent from Git (per reports)

**GitHub branches vs current source (via git + fetch):**
- origin/main: matches local pre-fix (still had polsia hardcodes + mixed video)
- feat/oc2co-static-route-skeleton-01: relative "store/" / "arcade/" (from root); "../store/" (from subs) — better alignment
- oc2co-route-video-home-fix-01: relative "store/" "arcade/"; cinematic uses animation/clip1.mp4; different hero/full-video structure, no polsia
- Other branches (fix/checkout-ownership-bridge etc.): partial
- Diff summary: Main laggy on addressing; "fix" branches advanced relative + video but not merged. Local Source was frozen at polsia stage.

**Other incorrect/misaligned refs:**
- store-backend.js + alignment: /store/success vs actual /success/ (and /cancel/)
- checkout.html comments + payments: mixed checkout.html vs checkout/
- enable_pages.sh + CNAME: GitHub Oc2cO/-oc2co (dash in name)
- Scattered old in App_Store_Apps (legacy), Documents/Reports (historical record of issues)
- No relative link breakage post-fix in core (anchors use full domain where needed; home relative ../ or ./)
- No external Canva/asset URLs in visuals/functions/animations.

## 2. Diff Summary vs Polsia Research / Current vs Branches

**Polsia research (from OC2CO_POLSIA_LINKING_REPORT.md, 10BG agents, AGENT_03/04/05 etc.):**
- Polsia (oc2coos-2.polsia.app) = "live Store, Arcade, Checkout with backend (Stripe/Neon/RevenueCat)"
- Static home (www.oc2co.com) = "visual shell only"
- Explicit: nav/SellThis/CTAs updated to point to Polsia absolute; subpages skeletons local
- DNS: polsia.app apex dead; only oc2coos-2 instance (returned JSON 404 on /store etc at time of reports)
- Recommendation in reports: "update all hardcoded ... or consolidate under oc2co.com subpaths"
- "Subdomains: mirrors local polsia version; absent from GH"

**Current source (pre-fix) vs Polsia:** Still had the hardcodes (no consolidation). Local folders existed but unused by links. Video half-aligned (silent in hero, old in cinematic). Backend defaults still polsia. Canva paths outdated.

**Current source vs GitHub branches:** Main = polsia (stale). Feature branches = relative + partial video updates (advanced but incomplete, not on main).

**Post-fix canonical:** Relative links + www.oc2co.com domain. Video standardized to oc2co_intro_silent.mp4. Subdomains self-contained (css + nav). Canva paths + symlink corrected. Aligns with intent of "fix" branches + reports' consolidation recs. No more delegation to Polsia.

**Final domain decision:** `www.oc2co.com` (CNAME + most navs + GitHub Pages). Prefer relative (`store/`, `../store/`, `./`, `../`) for internal site navs/functions where possible (works on GH Pages root + local dev server; file:// subpages need care). Absolute www only for cross-page Home/back when domain enforcement desired or from docs.

## 3. Exact search_replace Patches Applied (for alignment to canonical)

**Core HTML (Source + Subdomains) — Polsia -> relative:**
(See individual calls in session; summarized here for DELIVERABLES. All verified post-edit.)

1. index.html (root):
   - `https://oc2coos-2.polsia.app/store` -> `store/`
   - `https://oc2coos-2.polsia.app/arcade` -> `arcade/`
   - SellThis polsia -> `store/`
   - Footer oc2co.com -> www.oc2co.com

2. store/index.html:
   - Nav polsia -> `../` , `../store/` , `../arcade/`
   - `/store/checkout` -> `../checkout/`

3. arcade/index.html:
   - Nav polsia -> `../` , `../store/` , `../arcade/`

4. cinematic/index.html + Subdomains/cinematic:
   - Video `../oc2co_intro.mp4` -> `../oc2co_intro_silent.mp4` (align to index)
   - Footer 3x polsia -> `../` , `../checkout/` , `../store/` , `../arcade/`

5. checkout/index.html + Subdomains:
   - Nav polsia -> `../` , `../store/` , `../arcade/`
   - Back polsia -> `../store/` + `../`

6. checkout.html (root):
   - Nav polsia -> `./` , `store/` , `arcade/`
   - Back link www -> `./`

7. success/index.html + Subdomains + cancel/index.html + Subdomains:
   - All nav + CTAs polsia -> `../` / `../store/` / `../arcade/`
   - Back links updated similarly

**Subdomains css fixes (broken paths):**
- All 5 sub index.html (arcade/store/checkout/success/cancel): `../style.css` -> `../../Source/oc2co_website/style.css`

**JS/Backend (Source only):**
- store-backend.js: all  polsia defaults/comments/webhook/success/cancel -> `https://www.oc2co.com` (and /success /cancel paths, not /store/*). Header comment de-Polsia'd.
- checkout.html (demo): memtool return_to comment annotated.

**Docs/Canva:**
- Source/README.md: polsia external note -> relative + canonical explanation
- Canva_Exports/ASSET_CATALOG_*.md: 7x "canva_exports/..." folder refs -> `../Images/...` (with note)
- Canva_Exports/README.md: path + symlink notes added
- Alignment/store-integration.md:  polsia webhook/envs -> www.oc2co.com
- agw packet md: polsia routing note -> relative canonical
- Subdomains/README.md: added addressing note

**Symlink fix (via ln):**
- /home/sagou/bbwaas/Other_Projects/Canva_Exports : fixed broken -> `../Website/oc2co/Canva_Exports`

**Not patched (intentional):**
- Historical Reports/* (record of prior state)
- .bak / pre-cinematic files
- node_modules / .venv / package files
- Old_components (legacy App_Store)
- Full agw/ internal copies (one key patched)
- Google fonts (external dep, acceptable)
- checkout.html fetch paths (demo)
- Any memtool.*.oc2co.com (subdomain refs, future)

## 4. Other Observations / Recommendations

- **Visuals/Animations/Canva priority:** No broken image/video external URLs. All CSS procedural + local mp4. Canva still "spec only" (no shipped assets). Fix aligns video src. Recommend integrate actual Images/* when exported (use background-image in checkout visual layer comment).
- **Functions:** payments-layer.js / script.js clean (no hard addresses). store-backend now canonical.
- **Structure:** checkout.html (root .html) + checkout/ (dir) duplication; success/cancel not under store/. Branches experiment with full cinematic hero. Consider consolidate post this audit.
- **Git hygiene:** Merge feat/oc2co-static-route-skeleton-01 + video-fix to main after this. Subdomains not tracked.
- **Testing:** Serve from oc2co_website/ root + open index.html + sub/index.html. Verify relative resolves. GH Pages after push will use www.oc2co.com.
- **Polsia decommission:** All executable refs removed from website. Backend may still deploy to other hosts; env overrides preserved.

## 5. DELIVERABLES

**Report:** `/home/sagou/bbwaas/Website/oc2co/WEBSITE_ADDRESSING_AUDIT_BG4_REPORT.md` (this file)

**Patches ready (exact search_replace applied; reproducible):**
All listed in Section 3. To re-apply or review:
- Use the precise old_string / new_string pairs above.
- Or: `cd /home/sagou/bbwaas/Website/oc2co/Source/oc2co_website && git diff > /tmp/WEBSITE_ADDRESSING_PATCHES_SOURCE.diff`
- Subdomains patches are outside git (manual or cp style.css + sed if needed).
- Symlink: `ln -sfn ../Website/oc2co/Canva_Exports /home/sagou/bbwaas/Other_Projects/Canva_Exports`

**Verification commands used (repeatable):**
```
grep -rnE 'oc2coos-2.polsia|https://oc2coos' /home/sagou/bbwaas/Website/oc2co --include="*.html" --include="*.js"
find /home/sagou/bbwaas -type d -name Canva_Exports; ls -l /home/sagou/bbwaas/Other_Projects/Canva_Exports
cd .../oc2co_website && git fetch && git diff main origin/main --name-only
```

**Status:** All critical website code/visuals addressing misalignments resolved. Canonical now uses relative + www.oc2co.com. Ready for review / push / further agent sync.

**BG Agent 4 sign-off.** 

(Full session logs in terminal history; edits via search_replace + run_terminal for cat/grep/find/ls/git.)