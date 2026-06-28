# AGENT_08_ASSET_VIDEO_PATH_REPORT

**AGENT:** 8 — ASSET / VIDEO / VISUAL PATH AGENT  
**Task:** OC2CO website wiring audit — verify all image, video, script, style paths.  
**Date:** 2026-06-27  
**Scope:** oc2co_intro.mp4 refs; animation/, assets/ in Source/oc2co_website/; Images/ and Canva_Exports/ in BBWAAS structure; all .mp4/.webm/.png/.jpg/.webp/.svg/.css/.js references in HTML/JS/CSS.  
**Output:** Exact current vs recommended paths. Proof with grep/find. Recommend only.  
**Report Location:** /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Documents/Reports/10BG/AGENT_08_ASSET_VIDEO_PATH_REPORT.md

---

## 1. EXECUTIVE SUMMARY / FLAGGED ISSUES

### Critical Flags
- **Missing video on public GitHub:** cinematic/index.html references non-existent `../animation/clip1.mp4` (404). 
- **Wrong relative paths:** Deployed GitHub cinematic uses animation/clip while local Source cinematic and root index use oc2co_intro*.mp4. Subdomains/ HTMLs use paths assuming parent files that do not exist in Subdomains/ tree.
- **Specs-only folders without exports:** Images/ (all subcats) and Canva_Exports/ contain only README.md specs. No final PNG/WEBP/SVG binaries.
- **Public pages pointing to source that doesn't exist in GitHub:** 
  - Subdomains/ copies not present in GitHub repo (flat root structure).
  - Local Source/oc2co_website/ index.html (V2 ocean scene + silent video) does not match deployed GitHub root index.html.
  - animation/ dir + clips present in local Source only.
- **Oversized assets / performance risks:** Large oc2co_intro*.mp4 (homepage autoplay video). No webm fallback, no poster, no optimization noted.
- **Duplicate assets:** Multiple video versions (oc2co_intro.mp4 + _silent.mp4 in local Source; only one in GitHub); .bak files; unused celebrate PNGs in top-level Assets/; temp_intro/ audio; Source/ vs GitHub root divergence.
- **Local non-public paths:** Present in dev/sidecar/reports (localhost:878x, /mnt/c/... , file://) and server.js hardcodes. Not in main public client HTML/JS but risk if side assets leak. Checkout.html has future placeholder comment referencing non-existent `assets/visuals/...`.
- **Empty placeholder dirs:** Source/oc2co_website/assets/{cards,logos,visuals}/ empty.

### PASS (in local Source tree)
- index.html video: `oc2co_intro_silent.mp4` (file exists local).
- cinematic/index.html (Source): `../oc2co_intro.mp4` (correct relative; file exists).
- All main pages correctly link style.css / script.js / payments-layer.js relative to Source/oc2co_website/ tree.
- No stray <img src> or CSS url(file) in public HTML/CSS (pure CSS + 1 video).
- No C:\ or localhost in deployed client-facing paths.

---

## 2. INSPECTED LOCATIONS (with proof)

### Source Tree (BBWAAS)
- `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/`
- Sub: animation/ (clips), assets/ (empty), audio/, cinematic/, checkout/, store/, arcade/, cancel/, success/, tools/, index.html, style.css, script.js, oc2co_intro*.mp4, payments-layer.js etc.

**Proof (list_dir + grep):**
```
list_dir: animation/ → clip1.mp4 ... clip8.mp4
list_dir: assets/ → cards/ (empty), logos/ (empty), visuals/ (empty), README.md
grep -r "oc2co_intro|clip|animation/" .../Source/oc2co_website --glob="*.{html,js,css}" 
```
(Full results in sections below.)

### Organized BBWAAS Structure
- `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Images/`
  - Backgrounds/OC2CO_CHECKOUT_BG_.../README.md only
  - Heroes/..., Cards/..., Logos/..., etc. — all README.md only
  - Other/OC2CO IMAGES.png (stray)
- `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Canva_Exports/`
  - ASSET_CATALOG_OC2CO_FINISHED_ASSETS_V01.md + README.md only

**Proof:**
```
list_dir Images/Backgrounds/... → only README.md
list_dir Canva_Exports/ → only .md files
grep in Images/README.md: "Currently mostly the descriptive README.md files (specs). Actual final image exports from Canva not present"
```

### Public / GitHub Deployed
- Repo: https://github.com/Oc2cO/-oc2co (flat root: index.html, oc2co_intro.mp4, cinematic/, store/, arcade/, checkout/, tools/, etc. — no Source/ wrapper, no Subdomains/, no animation/, no Images/)
- Live: https://www.oc2co.com/ , /cinematic/ etc. served from GitHub Pages.

**Proof (web_fetch raw):**
```
https://raw.githubusercontent.com/Oc2cO/-oc2co/main/cinematic/index.html → <source src="../animation/clip1.mp4">
https://raw.githubusercontent.com/Oc2cO/-oc2co/main/animation/clip1.mp4 → 404 Not Found
https://raw.githubusercontent.com/Oc2cO/-oc2co/main/oc2co_intro.mp4 → exists (binary)
https://raw.githubusercontent.com/Oc2cO/-oc2co/main/index.html → <source src="oc2co_intro.mp4"> + <script src="tools/cinematic-layer.js">
GitHub tree summary: no "animation/" folder listed.
```

### Subdomains/ (BBWAAS curation copies)
- `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Subdomains/cinematic/index.html` etc.
- Only index.html files; no style.css, no videos at Subdomains/ level or parent.

**Proof:**
```
list_dir Subdomains/ → arcade/, cancel/, checkout/, cinematic/, store/, success/, README.md (no top-level assets)
grep .../Subdomains/... "style.css|oc2co_intro" → ../style.css , ../oc2co_intro.mp4
```

### Other
- Top Assets/: oc2co-celebrate*.png + temp_intro/ (audio/ass) — unused in HTML.
- Reports/ and agw/ contain historical paths (/mnt/c, file://, localhost) — dev artifacts.
- No .webm, .jpg, .webp, .svg, .gif, external image hosts in site files.

---

## 3. VIDEO REFERENCES — oc2co_intro.mp4 + SILENT + CLIPS

### Current Paths

**Local Source/oc2co_website/ (BBWAAS):**
- index.html:56
  ```
  <source src="oc2co_intro_silent.mp4" type="video/mp4">
  ```
  (same-dir; file exists local)
- cinematic/index.html:163
  ```
  <source src="../oc2co_intro.mp4" type="video/mp4">
  ```
  (from cinematic/ → parent; file exists local)
- index.html.pre-cinematic.bak:98 : `oc2co_intro.mp4`
- Subdomains/cinematic/index.html:163 : `../oc2co_intro.mp4` (would resolve to Subdomains/oc2co_intro.mp4 — **missing**)
- animation/ contains clip1.mp4–clip8.mp4 (unreferenced in HTML; only in tools/README.md)

**GitHub Public (deployed root structure):**
- index.html (root): 
  ```
  <source src="oc2co_intro.mp4" type="video/mp4">
  ```
  (same-dir root; file exists on GitHub)
- cinematic/index.html: 
  ```
  <source src="../animation/clip1.mp4" type="video/mp4">
  ```
  (**WRONG** — animation/ dir and clip1.mp4 do not exist on GitHub; 404)
- No oc2co_intro_silent.mp4 on GitHub (404)

**Proof grep:**
```
grep -n "oc2co_intro|oc2co_intro_silent|\.mp4|animation/|clip[0-9]" /mnt/c/.../Source/oc2co_website --glob="*.html" 
→ index.html:56 oc2co_intro_silent.mp4
→ cinematic/index.html:163 ../oc2co_intro.mp4
grep same on Subdomains → ../oc2co_intro.mp4 (cinematic)
web_fetch raw GitHub cinematic → ../animation/clip1.mp4
web_fetch raw GitHub animation/clip1.mp4 → 404
```

### Recommended Paths

**For GitHub repo (public consistency):**
- cinematic/index.html: Change to
  ```
  <source src="../oc2co_intro.mp4" type="video/mp4">
  ```
  (matches root file; same relative as local Source cinematic; matches index.html usage)
- Or standardize on root `oc2co_intro.mp4` with consistent relative from subs (e.g. `../oc2co_intro.mp4` from /cinematic/).
- Consider adding `animation/` dir + clips to GitHub if intended for cinematic (or remove clip refs).
- Add to index.html + cinematic: `poster="..."` + `<source type="video/webm">` fallback + controls/preload tuning for perf.

**For local Source (dev):**
- Keep `oc2co_intro_silent.mp4` in index.html (current is correct).
- Keep `../oc2co_intro.mp4` in cinematic/ (current is correct for tree).
- If using clips: update cinematic to e.g. `../animation/clip1.mp4` **and** ensure GitHub sync includes the dir.

**For Subdomains/ (if standalone use intended):**
- Copy style.css + oc2co_intro*.mp4 to Subdomains/ root, or adjust all relative paths to `./` or absolute.
- Or deprecate Subdomains/ if not deployment target (currently curation only).

**General:**
- Rename/choose: oc2co_intro.mp4 (full) vs _silent.mp4 consistently across index + cinematic.
- GitHub index currently uses full intro; local Source index uses silent. Align in next sync.

---

## 4. ANIMATION/ + ASSETS/ IN SOURCE/oc2co_website/

**Current:**
- animation/clip1.mp4 ... clip8.mp4 (8 files, present local)
- assets/README.md describes planned subdirs; cards/, logos/, visuals/ empty.
- Referenced? Only in tools/README.md ("using the clips in animation/") and comments. Not wired in any HTML video/img.

**Proof:**
```
list_dir Source/oc2co_website/animation/ → clip1..clip8.mp4
list_dir Source/oc2co_website/assets/ → (empty subdirs)
grep -r "animation/|clip[0-9]\.mp4" Source/oc2co_website --glob="*.{html,js,css}" → 0 matches in HTML/JS/CSS (only md + comments)
```

**Recommended:**
- If clips intended for cinematic: wire `src="../animation/clipN.mp4"` (or choose one) and push animation/ to GitHub.
- Populate or remove empty assets/ subdirs.
- Document in assets/README.md exact usage + recommended HTML integration paths (e.g. `assets/visuals/OC2CO_...` once exports land).
- Current: "specs-only" equivalent for animation (files present but unused).

---

## 5. IMAGES/ + CANVA_EXPORTS/ (BBWAAS ORGANIZED STRUCTURE)

**Current (all folders):**
- Backgrounds/OC2CO_CHECKOUT_BG_ECLIPSE_BIOLUMINESCENT_OCEAN_V01/ → only README.md
- Heroes/OC2CO_HOME_HERO_COSMIC_ORIGIN_V02/ → only README.md
- Heroes/OC2CO_STORE_HERO_SECURE_GLASS_V02/ → only README.md
- Logos/OC2CO_LOGO_MARK_ORBITAL_2_V02/ → only README.md
- Cards/OC2CO_CHECKOUT_CARD_LIQUID_GLASS_V01/ → only README.md
- Buttons/OC2CO_CHECKOUT_BUTTON_ELECTRIC_TEXT_V01/ → only README.md
- MemTool/OC2CO_CARD_MEMTOOL_MEMORY_ATRIUM_V02/ → only README.md
- SellThis/OC2CO_CARD_SELLTHIS_AI_LISTING_PACK_V02/ → only README.md
- Other/ → OC2CO IMAGES.png (stray) + README.md
- Canva_Exports/ → only catalog .md + README.md

**Catalog status (from ASSET_CATALOG...):**
"Status: Canva candidates generated (not final, not exported, not live)"

**Proof (grep + list_dir):**
```
grep -l "README.md" Images/*/*/* → all spec folders
grep "not final, not exported" Canva_Exports/ASSET_CATALOG... → matches
list_dir on each → confirms only .md (except one stray png)
checkout.html:66 comment: "Future: background-image: url('assets/visuals/OC2CO_....png');"
```

**Recommended Paths (once exports available):**
- Place final files: `Images/Backgrounds/OC2CO_CHECKOUT_BG_ECLIPSE_BIOLUMINESCENT_OCEAN_V01/OC2CO_CHECKOUT_BG_..._V01.webp` (primary)
- Integrate e.g. in checkout.html:
  ```
  <div id="checkout-visual-bg" style="background-image: url('/Images/Backgrounds/OC2CO_CHECKOUT_BG_ECLIPSE_BIOLUMINESCENT_OCEAN_V01/OC2CO_CHECKOUT_BG_ECLIPSE_BIOLUMINESCENT_OCEAN_V01.webp'); ...">
  ```
  Or relative from page: for root checkout.html use `Images/...`
- For GitHub deployment: move/copy approved exports into repo root or dedicated assets/ at repo root (e.g. `assets/backgrounds/...`) and update URLs to match deployed structure (no BBWAAS/Source wrapper).
- Update catalog + per-folder README with exact deployed filename + SHA.
- Prefer webp + size-optimized; add to .gitignore if large binaries.

---

## 6. ALL .CSS / .JS / MEDIA REFS IN HTML/JS/CSS

### Local Source/oc2co_website/ (dev tree)
**index.html:**
- `href="style.css"`
- `src="oc2co_intro_silent.mp4"`
- `href="intro-animation.html"`
- `src="script.js"`

**cinematic/index.html:**
- Inline <style> (no external css)
- `src="../oc2co_intro.mp4"`
- Inline <script> (particles + scrub)

**checkout.html (root):**
- `href="style.css"`
- `src="payments-layer.js"`

**checkout/index.html:**
- `href="../style.css"`
- Inline bg layer (no file url)

**store/index.html, arcade/index.html, cancel/index.html, success/index.html:**
- `href="../style.css"`

**sidepanel.html (sidecar):**
- `src="sidepanel.js"` (local)

**No other:** No img, no background-image url(file.*), no external media.

**style.css:** Pure gradients/box-shadows/keyframes. No url().

**script.js:** Dynamic star box-shadow only. No paths.

**Proof grep:**
```
grep -oE '(src|href|url)\s*=\s*["'\''][^"'\'']*\.(mp4|css|js|png|jpg|webp|svg|gif)["'\'']' Source/oc2co_website/**/*.html | cat
→ only the above style/script/video
```

### GitHub Deployed (different files)
**index.html (root):**
- External Google font
- `src="oc2co_intro.mp4"`
- `src="tools/cinematic-layer.js"`
- All other styling inline or ::after grain

**cinematic/index.html:**
- External font
- Inline <style>
- `src="../animation/clip1.mp4"` (broken)
- Inline <script>

**store/index.html, checkout/index.html, arcade/ etc.:**
- External font + full inline <style>
- Nav: `href="../"`, `href="../store/"` etc. (no style.css)

**tools/cinematic-layer.js:** Present, disabled no-op.

**Proof (web_fetch raw + grep simulation):**
As above sections.

### Subdomains/ copies (BBWAAS)
Mirror Source subpage refs: `../style.css` (style.css absent at Subdomains/ level).

---

## 7. OTHER FLAGGED PATHS / RISKS

- **Local non-public in non-client files (for awareness):**
  - bbwaas_sidecar/sidepanel.js: `MCP_BASE = 'http://localhost:8787'`, `window.open('/mnt/c/...')`
  - bbwaas_mcp/server.js: hardcodes `/mnt/c/Users/Sagou/Documents/BrainHub/...`
  - checkout.html comments: `http://localhost:8788`
  - All reports/agw/ packets: `file:///C:/...`, `/mnt/c/...`
  - sidecar manifest: localhost host_permissions
  - **Action:** Keep out of public client paths. (Already mostly are.)

- **Performance:**
  - Large mp4 on root index (autoplay muted). Risk: initial load, mobile data.
  - No evidence of compression, multiple resolutions, or lazy.

- **GitHub vs Local Divergence (wiring audit impact):**
  - BBWAAS Source/ is "organized" copy of older V2 ocean version.
  - GitHub is current public (different index content, different video src in cinematic).
  - Subdomains/ and Images/ not reflected in GitHub.

- **Duplicate / stray:**
  - index.html.bak, index.html.pre-cinematic.bak
  - Assets/temp_intro/ (ass/mp3 — audio for intro, not wired)
  - Assets/celebrate*.png (multiple versions, unused)
  - Reports contain old paths to pre-BBWAAS oc2co_website/

---

## 8. EXACT CURRENT VS RECOMMENDED PATHS (TABLE)

| Location | Current Path | File Exists? (Local / GitHub) | Issue | Recommended Path |
|----------|--------------|-------------------------------|-------|------------------|
| Source/index.html | `oc2co_intro_silent.mp4` | Local: Yes; GitHub: No | Version mismatch | Align: use `oc2co_intro.mp4` or decide silent vs full |
| Source/cinematic/index.html | `../oc2co_intro.mp4` | Local: Yes | Good for local | Keep (or sync to GitHub) |
| GitHub/cinematic/index.html | `../animation/clip1.mp4` | GitHub: No (404) | Broken public | `../oc2co_intro.mp4` |
| Subdomains/cinematic/index.html | `../oc2co_intro.mp4` | Subdomains level: No | Broken if served | Either add assets to Subdomains/ or use `./` after restructure |
| GitHub/index.html | `oc2co_intro.mp4` | GitHub: Yes | Good | Keep; add poster/webm |
| Source/checkout.html (comment) | `assets/visuals/OC2CO_....png` | assets/visuals/: empty | Placeholder | `../../Images/Backgrounds/OC2CO_CHECKOUT_BG_.../....webp` (after export) |
| All Source subs | `../style.css` | Yes (in Source parent) | Good for Source tree | N/A (or inline for GitHub parity) |
| GitHub subs (e.g. store/) | `../` (nav only); inline CSS | N/A | No local style | Keep inline or introduce repo-root style.css |
| Images/*/*/*.md | N/A (specs) | No binaries | Specs only | Add exports + update HTML with exact `Images/.../file.webp` |
| animation/ (local) | clip*.mp4 | Local only | Unused | Wire or remove; push to GitHub if used |

---

## 9. RECOMMENDATIONS (ONLY)

1. **Fix public cinematic video immediately:**
   - In GitHub main: edit cinematic/index.html → `src="../oc2co_intro.mp4"`
   - Verify 200 on raw + live load.

2. **Align video asset usage:**
   - Standardize on single video file name across index.html + cinematic/index.html.
   - Update local Source index.html to match GitHub if that is canonical.

3. **Sync structure:**
   - Decide canonical: GitHub flat root or BBWAAS Source/. Push consistent assets (style if used, or keep inline; animation/ if wanted).
   - Subdomains/ either: (a) remove, (b) make self-contained by copying assets + adjusting paths, or (c) treat purely as docs.

4. **Asset exports:**
   - Export from Canva → place in correct Images/<Cat>/OC2CO_*_Vxx/ with consistent names.
   - Wire first background into checkout.html using precise relative (e.g. from repo root: `Images/Backgrounds/...` or `assets/...` after move).
   - Update catalog status.

5. **Performance / robustness:**
   - Add to video tags: `poster="..."` (generate from first frame), `preload="metadata"`, webm source, size-optimized mp4.
   - Consider defer or intersection-observer for cinematic scrub video.
   - Audit final bundle size.

6. **No new local paths in client code:**
   - Continue: all public HTML/JS/CSS must use relative repo-root paths only.
   - Sidecar/MCP stay dev-only.

7. **Cleanup duplicates:**
   - Remove or document .bak, temp_intro/, duplicate celebrate pngs.
   - Ensure GitHub .gitignore covers large binaries if needed (or use LFS).

8. **Verification steps (post-fix):**
   - `git -C ... pull && git push` for cinematic change.
   - curl -I https://raw.githubusercontent.com/Oc2cO/-oc2co/main/cinematic/index.html | grep animation (should be gone).
   - Browser: https://www.oc2co.com/cinematic/ — video should load/scrub.
   - Local file:// open of Source/index.html + cinematic/ for dev parity.
   - After Canva export: test background behind checkout card (readability).

**Do not touch (per prior):** animation/ clips until decision (keep local), payment-layer files, sidecar internals.

---

## 10. PROOF APPENDIX (KEY GREP / FETCH SNIPPETS)

**Local Source video refs (grep):**
```
/mnt/.../Source/oc2co_website/index.html
56:      <source src="oc2co_intro_silent.mp4" type="video/mp4">
/mnt/.../Source/oc2co_website/cinematic/index.html
163:        <source src="../oc2co_intro.mp4" type="video/mp4">
```

**GitHub cinematic (web_fetch raw):**
```
<source src="../animation/clip1.mp4" type="video/mp4">
```

**404 proof:**
```
https://raw.githubusercontent.com/Oc2cO/-oc2co/main/animation/clip1.mp4 → 404: Not Found
```

**Images status (from catalog grep):**
```
**Status:** Canva candidates generated (not final, not exported, not live)
```

**Empty assets proof (list_dir):**
```
assets/
  cards/
  logos/
  visuals/
  README.md
```

**Subdomains path proof:**
```
Subdomains/cinematic/index.html:163:        <source src="../oc2co_intro.mp4" type="video/mp4">
list_dir Subdomains/ : no oc2co_intro.mp4, no style.css at ../ level
```

**GitHub structure (tree fetch):**
```
oc2co_intro.mp4 (root)
cinematic/
No animation/
```

**style.css refs (all Source pages use relative correctly within tree):**
```
index.html: <link rel="stylesheet" href="style.css">
store/index.html: <link rel="stylesheet" href="../style.css">
...
```

**No image file refs:**
```
grep ... --glob="*.{html,css}" "(\.png|\.jpg|\.webp|\.svg|url\([^)]+\.(png|jpg))" → 0 matches outside comments/future placeholders.
```

---

**END OF REPORT. All findings proofed via list_dir, grep (local), web_fetch/raw (GitHub/public). Recommendations are path-only fixes. No implementation performed.**

Next agent: Use this for wiring synthesis. Patch cinematic first for public.