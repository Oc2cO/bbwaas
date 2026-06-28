# AGENT 05 ROUTE / LINK CRAWL REPORT
## OC2CO Website Wiring Audit

**Agent:** AGENT 5 — ROUTE / LINK CRAWLER AGENT  
**Scope:** All href=, src=, url(, location.href, window.location, fetch(, <form, action= in static HTML/JS/CSS  
**Target Dir:** /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/  
**Also Checked:** /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Subdomains/ copies  
**Pages Inspected:** index.html, store/index.html, checkout/index.html, arcade/index.html, cinematic/index.html, iris_oracle/index.html, success/index.html, cancel/index.html, checkout.html, intro-animation.html + supporting JS/CSS (script.js, payments-layer.js, sidepanel*, paywall-example.html, backend examples) + Subdomains/ equivalents.  
**Date:** 2026-06-27  
**Method:** grep + read_file on patterns and files. No live crawl, no edits.

## Summary of Findings
- **Polsia hardcodes:** Ubiquitous use of `https://oc2coos-2.polsia.app/*` for Store/Arcade/Checkout in navs and CTAs. Main site at www.oc2co.com but subs point externally. Inconsistent with local Source structure (store/ and checkout/ are siblings, not nested under /store/).
- **Relative link issues:** In Source/ subdirs, ../style.css and ../oc2co_intro.mp4 resolve correctly (files at root). In Subdomains/ copies, same relatives are broken (no style.css or mp4 at Subdomains/ root; no index.html at Subdomains/).
- **Dead anchors:** `#projects` and `#connect` in navs link to www.oc2co.com#... or ../#connect. No matching `id="projects"` or `id="connect"` sections exist in index.html (or most pages). Features use classes only.
- **Placeholder / broken:** Multiple `href="#"` (e.g. checkout buttons). `href="../"` in checkout/ context points to parent (works in Source/ root serve but ambiguous; broken in Subdomains/).
- **Localhost / fs paths:** `http://localhost:8787` (MCP_BASE) and `/mnt/c/Users/Sagou/...` absolute paths in sidepanel.js (window.open and server.js). Dev-only, will 404 or expose private paths in browser/deploy.
- **Missing / inconsistent routes:** 
  - Store "Checkout preview" -> `.../store/checkout` (no such nested page in Source or Subdomains; checkout/ is sibling).
  - Backend defaults/comments reference `/store/success`, `/store/cancel` but pages live at root `/success/`, `/cancel/`.
  - checkout.html (root) uses `checkout.html?success=...` while separate success/ dir exists.
  - No Subdomains/ copies of iris_oracle/, root index, or full assets.
- **MemTool/SellThis/GitHub clarity:** Labeled as "Request access", "In development", "Prototype". GitHub link only in cinematic. No direct route to live MemTool/SellThis (parked).
- **No Home return / traps:** Most pages have Home to www.oc2co.com. Iris has it. Subdomains/checkout "../" is weak attempt. Intro-animation and index have relative Home. Arcade/Store navs on subpages always point Home externally.
- **External assets OK:** Google Fonts, GitHub, Stripe/RevenueCat in comments/JS only. Videos (oc2co_intro*.mp4) and style/script present in Source/.
- **No <form> or action=** found in HTML/JS (all buttons/links; checkout uses JS fetch or layer).
- **fetch() / location:** Mostly in checkout.html (configurable BACKEND_BASE, redirects to payment_link or success), sidepanel (localhost), example servers (Stripe). No loops in static routes but potential redirect cycles via polsia + success params.
- **Route loops:** Sub navs (e.g. from arcade to polsia/arcade, store to polsia/store) + main index to polsia subs create circular external references. Polsia may be intended backend host.
- **Other:** CNAME points www.oc2co.com. Two checkout variants (checkout.html full layer demo + checkout/index.html placeholder). Subdomains appear to be for separate hosting but not self-contained.

## Full Links Table

| source page | link text | href/src | status | issue | fix |
|-------------|-----------|----------|--------|-------|-----|
| Source/oc2co_website/index.html | Home | ./ | OK (relative self) | Consistent with root | - |
| Source/oc2co_website/index.html | Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode; main site mixes local/pol sia | Use consistent base or label "Polsia Store (Backend)" |
| Source/oc2co_website/index.html | Arcade | https://oc2coos-2.polsia.app/arcade | External (Polsia hardcoded) | Polsia hardcode | Clarify or make relative if local copy |
| Source/oc2co_website/index.html | Projects | #projects | Dead anchor | No id="projects" in index.html (only hero/features/parked) | Add id or remove / point to section or /#projects on home |
| Source/oc2co_website/index.html | Connect | #connect | Dead anchor | No id="connect" in index.html | Add id or remove / point to section |
| Source/oc2co_website/index.html | (video) | oc2co_intro_silent.mp4 | OK (file exists at root) | - | - |
| Source/oc2co_website/index.html | View Intro Animation | intro-animation.html | OK (relative) | - | - |
| Source/oc2co_website/index.html | SellThis — Store / Request Access → | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode; SellThis label | Clarify "SellThis (via Polsia Store)" |
| Source/oc2co_website/store/index.html | (stylesheet) | ../style.css | OK (resolves in Source/) | - | - |
| Source/oc2co_website/store/index.html | Home | https://www.oc2co.com | OK (external) | Inconsistent with some relative Homes | Standardize all Home to https://www.oc2co.com or / |
| Source/oc2co_website/store/index.html | Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Self-reference on polsia; Polsia hardcode | - |
| Source/oc2co_website/store/index.html | Arcade | https://oc2coos-2.polsia.app/arcade | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/store/index.html | Projects | https://www.oc2co.com#projects | Dead anchor | No matching id on target home | Fix anchor or remove |
| Source/oc2co_website/store/index.html | Connect | https://www.oc2co.com#connect | Dead anchor | No matching id on target home | Fix anchor or remove |
| Source/oc2co_website/store/index.html | Checkout preview | https://oc2coos-2.polsia.app/store/checkout | External (Polsia hardcoded) | Route /store/checkout does not exist in Source structure (checkout/ is sibling, no nested); missing page | Point to https://www.oc2co.com/checkout or /checkout/ ; update structure or backend |
| Source/oc2co_website/store/index.html | Request access (SellThis) | https://www.oc2co.com#connect | Dead anchor / MemTool/SellThis clarity | SellThis labeled "Coming soon"; links to dead #connect | Clarify label "SellThis — Request Access (Coming soon)" + real anchor or form |
| Source/oc2co_website/store/index.html | Request access (MemTool) | https://www.oc2co.com#connect | Dead anchor / MemTool/SellThis clarity | MemTool labeled "In development" | Clarify label "MemTool (In development)" + real anchor or form |
| Source/oc2co_website/checkout/index.html | (stylesheet) | ../style.css | OK (resolves in Source/) | - | - |
| Source/oc2co_website/checkout/index.html | Home | https://www.oc2co.com | OK (external) | - | - |
| Source/oc2co_website/checkout/index.html | Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/checkout/index.html | Arcade | https://oc2coos-2.polsia.app/arcade | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/checkout/index.html | ← Home (Oc2cO) | ../ | OK relative in Source context | Ambiguous (../ from /checkout/); may not be /index | Use https://www.oc2co.com or ./../index.html |
| Source/oc2co_website/checkout/index.html | Secure Checkout — Not Connected Yet | # | Placeholder | href="#" dead; button is static placeholder | Replace with real route or keep explicit disabled |
| Source/oc2co_website/checkout/index.html | Back to Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/checkout/index.html | Home | https://www.oc2co.com | OK (external) | - | - |
| Source/oc2co_website/arcade/index.html | (stylesheet) | ../style.css | OK (resolves in Source/) | - | - |
| Source/oc2co_website/arcade/index.html | Home | https://www.oc2co.com | OK (external) | - | - |
| Source/oc2co_website/arcade/index.html | Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/arcade/index.html | Arcade | https://oc2coos-2.polsia.app/arcade | External (Polsia hardcoded) | Polsia hardcode (self) | - |
| Source/oc2co_website/arcade/index.html | Projects | https://www.oc2co.com#projects | Dead anchor | No matching id | Fix or remove |
| Source/oc2co_website/arcade/index.html | Connect | https://www.oc2co.com#connect | Dead anchor | No matching id | Fix or remove |
| Source/oc2co_website/arcade/index.html | Request access (SellThis) | ../#connect | Dead anchor / relative | ../#connect resolves to parent dead anchor; SellThis clarity needed | Use full https://www.oc2co.com#connect or remove #; label "SellThis Mini App (Prototype)" |
| Source/oc2co_website/arcade/index.html | Request access (MemTool) | ../#connect | Dead anchor / relative | MemTool clarity | Label "MemTool Lite (Parked)" |
| Source/oc2co_website/arcade/index.html | Stay updated | ../#connect | Dead anchor / relative | - | - |
| Source/oc2co_website/cinematic/index.html | (fonts) | https://fonts.googleapis.com/... | OK (external) | - | - |
| Source/oc2co_website/cinematic/index.html | (video) | ../oc2co_intro.mp4 | OK (file exists at root) | - | - |
| Source/oc2co_website/cinematic/index.html | START ON GITHUB → | https://github.com/Oc2cO | OK (external) | GitHub link clarity (MemTool/SellThis context in text) | Label "Oc2cO on GitHub (source)" |
| Source/oc2co_website/cinematic/index.html | Home | https://www.oc2co.com | OK (external) | - | - |
| Source/oc2co_website/cinematic/index.html | Checkout | https://oc2coos-2.polsia.app/checkout | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/cinematic/index.html | Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/cinematic/index.html | Arcade | https://oc2coos-2.polsia.app/arcade | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/iris_oracle/index.html | (fonts) | https://fonts.googleapis.com/... | OK (external) | - | - |
| Source/oc2co_website/iris_oracle/index.html | ← Oc2cO Home | https://www.oc2co.com | OK (external) | Good Home return | - |
| Source/oc2co_website/iris_oracle/index.html | (SPA buttons: New Reading, Home, back) | onclick JS (internal) | OK (SPA) | No external href | - |
| Source/oc2co_website/success/index.html | (stylesheet) | ../style.css | OK (resolves in Source/) | - | - |
| Source/oc2co_website/success/index.html | Home | https://www.oc2co.com | OK (external) | - | - |
| Source/oc2co_website/success/index.html | Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/success/index.html | Arcade | https://oc2coos-2.polsia.app/arcade | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/success/index.html | Back to Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/success/index.html | Home | https://www.oc2co.com | OK (external) | Good return | - |
| Source/oc2co_website/cancel/index.html | (stylesheet) | ../style.css | OK (resolves in Source/) | - | - |
| Source/oc2co_website/cancel/index.html | Home | https://www.oc2co.com | OK (external) | - | - |
| Source/oc2co_website/cancel/index.html | Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/cancel/index.html | Arcade | https://oc2coos-2.polsia.app/arcade | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/cancel/index.html | Back to Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/cancel/index.html | Home | https://www.oc2co.com | OK (external) | Good return | - |
| Source/oc2co_website/checkout.html | (stylesheet) | style.css | OK (resolves) | - | - |
| Source/oc2co_website/checkout.html | Home | https://www.oc2co.com | OK (external) | - | - |
| Source/oc2co_website/checkout.html | Store | https://oc2coos-2.polsia.app/store | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/checkout.html | Arcade | https://oc2coos-2.polsia.app/arcade | External (Polsia hardcoded) | Polsia hardcode | - |
| Source/oc2co_website/checkout.html | ← Home (Oc2cO) | https://www.oc2co.com | OK (external) | - | - |
| Source/oc2co_website/checkout.html | (future bg comment) | url('assets/visuals/...') | Comment only | Placeholder path | - |
| Source/oc2co_website/checkout.html | (script) | payments-layer.js | OK (resolves) | - | - |
| Source/oc2co_website/checkout.html | (JS: window.location.search, fetch, window.location.href) | Various (BACKEND_BASE + redirects) | Dev / conditional | BACKEND_BASE example 'http://localhost:8788'; funnel return_to=https://memtool.oc2co.com/app ; Polsia mentions in comments; redirects to Stripe or payment_link or checkout.html?success | Document or remove localhost examples; ensure success/cancel point to /success/ /cancel/ or handle query on checkout |
| Source/oc2co_website/intro-animation.html | ← Home (Oc2cO) | index.html | OK (relative) | Good return | - |
| Source/oc2co_website/bbwaas_sidecar/sidepanel.html | (script) | sidepanel.js | OK (relative) | - | - |
| Source/oc2co_website/web-apps/paywall-example.html | (script) | ../payments-layer.js | OK (resolves from web-apps/) | - | - |
| Source/oc2co_website/bbwaas_sidecar/sidepanel.js | (fetch) | http://localhost:8787 + paths | Localhost only | MCP_BASE hardcoded localhost; fetch calls dev server only | Make configurable or remove from static site |
| Source/oc2co_website/bbwaas_sidecar/sidepanel.js | (window.open) | /mnt/c/Users/Sagou/Documents/BrainHub/iris_oracle/... and /00_MASTER... | Hardcoded fs path | Absolute /mnt/c/ path; browser window.open will fail (not http); private BrainHub exposure | Replace with public URLs or remove; never use fs paths in web JS |
| Source/oc2co_website/bbwaas_sidecar/sidepanel.js | (mentions) | SellThis, GitHub | Text | Clarity needed | - |
| Source/oc2co_website/bbwaas_mcp/server.js | (paths / urls) | /mnt/c/... , http://localhost:8787 , https://www.oc2co.com , https://www.oc2co.com/iris_oracle/ | Server + localhost/fs | Not client static but in source; hardcodes private paths | Move sensitive to env/config only |
| Source/oc2co_website/store-backend.js | (comments / defaults) | https://oc2coos-2.polsia.app , /store/success , /store/cancel , Stripe links | Comments + defaults | Polsia hardcodes; success/cancel under /store/ but actual pages at root /success/ /cancel/ | Align URLs with actual deployed structure (root success/cancel or nest consistently) |
| Source/oc2co_website/payments-example-server.js | (urls / fetch) | https://www.oc2co.com/checkout.html?success=... , https://www.oc2co.com/checkout.html?canceled=... , https://api.stripe.com , http://localhost:PORT , revenuecat.com | Example server | Uses root checkout.html for success (vs success/ dir); localhost log | Align success/cancel to /success/ /cancel/ dirs or document; remove localhost from prod comments |
| Source/oc2co_website/enable_pages.sh | (curl) | https://api.github.com/repos/Oc2cO/-oc2co/pages | Script external | GitHub Pages enable | - |
| Subdomains/store/index.html | (stylesheet) | ../style.css | BROKEN relative | No style.css at Subdomains/ root (Subdomains/ has only subdirs + README) | Copy style.css to Subdomains/ or use absolute /style.css or update copies to be self-contained |
| Subdomains/store/index.html | (all nav / CTAs same as Source/store) | (same polsia + www + # + /store/checkout) | Mixed (externals same) | See Source/store issues + broken css | - |
| Subdomains/arcade/index.html | (stylesheet) | ../style.css | BROKEN relative | Same as above | Fix relative or duplicate assets |
| Subdomains/arcade/index.html | (buttons) | ../#connect | BROKEN relative | ../#connect from Subdomains/arcade/ points to invalid Subdomains/#connect | Use absolute https://www.oc2co.com#connect or fix structure |
| Subdomains/checkout/index.html | (stylesheet) | ../style.css | BROKEN relative | - | - |
| Subdomains/checkout/index.html | ← Home (Oc2cO) | ../ | BROKEN relative | ../ from Subdomains/checkout/ -> Subdomains/ (no index.html; missing Home) | Add index.html to Subdomains/ or use https://www.oc2co.com |
| Subdomains/checkout/index.html | Secure Checkout... | # | Placeholder | Same as Source | - |
| Subdomains/success/index.html | (stylesheet) | ../style.css | BROKEN relative | - | - |
| Subdomains/success/index.html | (nav + CTAs) | (same polsia/www) | Externals OK | Broken css | - |
| Subdomains/cancel/index.html | (stylesheet) | ../style.css | BROKEN relative | - | - |
| Subdomains/cancel/index.html | (nav + CTAs) | (same) | Externals OK | Broken css | - |
| Subdomains/cinematic/index.html | (stylesheet/fonts) | (google + @import) | OK (external) | - | - |
| Subdomains/cinematic/index.html | (video) | ../oc2co_intro.mp4 | BROKEN relative | No oc2co_intro.mp4 at Subdomains/ root | Copy video to Subdomains/ or use absolute URL |
| Subdomains/cinematic/index.html | (footer + github) | (same as Source/cinematic) | Externals OK | Broken video src | - |
| Subdomains/ (all) | (general) | N/A | Missing pages | No Subdomains/index.html ; no Subdomains/iris_oracle/ ; no Subdomains/animation/ or full assets; checkout.html root not copied | Add missing copies or document Subdomains/ as partial for specific hosting |
| Source/oc2co_website/ (all) | N/A | Polsia urls, #anchors, localhost examples | Multiple | See per-row | Standardize Home to https://www.oc2co.com ; make polsia links labeled or configurable ; remove fs/localhost from client JS ; align success/cancel routes |

## Additional Files Inspected (no new links)
- style.css, script.js, payments-layer.js, cinematic-layer.* : No href/src/route links (CSS vars, JS parked/toast, layer mock only).
- iris_oracle/reference/*.md : No inbound hrefs from HTML.
- web-apps/entitlements-example.js, revenuecat-web-layer.js : No route links (examples only).
- animation/*.mp4, audio/*, assets/* : Binary only, referenced correctly where used.
- bbwaas_mcp/package.json etc. : No client links.

## Recommendations (High Level, No Patches)
1. Eliminate or label all Polsia hardcodes (e.g. "Store (Polsia hosted)").
2. Make Subdomains/ self-contained (duplicate style.css, videos, or use root-relative URLs assuming different base).
3. Fix or remove dead #projects / #connect anchors; add real sections or external routes.
4. Standardize success/cancel routes (root /success/ vs /store/success ; checkout.html vs /checkout/).
5. Replace localhost:/mnt/ paths in any client-facing JS (sidepanel.js, examples) with relative/public URLs or config.
6. Add missing Subdomains/ copies (iris_oracle, root assets, index) or deprecate Subdomains/.
7. Clarify MemTool/SellThis as "prototype / request access" with consistent links (no dead anchors).
8. Ensure all Home returns use consistent https://www.oc2co.com or relative from root.
9. Audit deployed GitHub Pages vs local Source for drift (e.g. video paths in past reports).
10. Consider central ROUTE_MAP.md or config for base URLs.

## Verification Notes
- All Source/ relative assets (style, videos, js) exist locally.
- Subdomains/ relatives do not.
- No live fetch to external in pure static (except fonts).
- No forms.
- Route map from synthesis aligns (Polsia vs www mix noted).

**End of AGENT 05 Report**  
Stay in scope. Report only.