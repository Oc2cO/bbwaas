# OC2CO WEBSITE WIRING — 10BG SYNTHESIS

## 1. Executive Summary
10 background agents (domain, GitHub, local source, homepage, route/link crawl, nav/home, checkout/store safety, asset/video, security, synthesis) completed a proof-backed audit of the Oc2cO public website under the BBWAAS umbrella.

Key findings:
- Canonical public homepage: https://www.oc2co.com/ (GitHub Pages).
- GitHub repo (Oc2cO/-oc2co, branch oc2co-route-video-home-fix-01, draft PR #2) has broken cinematic video, missing success/cancel pages and animation/assets dirs.
- Local Source (BBWAAS/Website/oc2co/Source/oc2co_website/) is more complete and evolved (correct video ref, full assets, V2 homepage).
- All core routes load on live site (200s). Home links mostly present but some weak/dead.
- No client-side payment secrets; checkout/store wording safe and pending-clear.
- Private exposure risk: agw/ folder + /mnt/c/ + localhost paths in dev JS will be public if pushed.
- No duplicate landing pages. One canonical homepage recommended.
- Polsia (oc2coos-2.polsia.app) currently serves JSON not HTML at /store etc.; static site is shell + links.
- Intro video works in local + GH homepage; cinematic broken on GH.

All agents produced mandated reports in 10BG/. No irreversible actions, no patches, no DNS/deploy.

## 2. Canonical Public Website Decision
https://www.oc2co.com/ is the single canonical public homepage.

- Serves the intro video (currently fullscreen hero on live).
- Preferred evolved look from local V2 (ocean-night-scene + celestial + "Organized chaos. Built into tools, memory, and living systems." + feature cards + inline silent video + Polsia delegation for store/arcade).
- No second landing page. Polsia provides functional backend (not homepage source). Visual direction (Canva specs) to be integrated into this one page only after route fixes.
- GitHub Pages + CNAME www.oc2co.com confirmed.

## 3. Confirmed Live Domains and Subdomains
- www.oc2co.com : 200 OK (GitHub Pages), full static content. Redirect target.
- oc2co.com : 200 OK (serves same or redirects).
- oc2coos-2.polsia.app : Resolves; /store, /arcade, /checkout return JSON 404-like (no HTML storefronts yet).
- Subdomains (store., checkout., arcade., memtool., sellthis., agents., etc.): NXDOMAIN (no A/CNAME). Future only.
- DNS: Cloudflare nameservers, apex A records to GitHub Pages IPs, www CNAME to oc2co.github.io. MX privateemail. Correct for Pages.

No subdomains created. Map only.

## 4. Confirmed GitHub Pages Setup
Repo: Oc2cO/-oc2co
CNAME: www.oc2co.com (present on main + fix branch).
Pages enabled.
Current branch state (PR #2 draft, oc2co-route-video-home-fix-01):
- Has index.html (old monolithic), store/, checkout/, arcade/, cinematic/, iris_oracle/, oc2co_intro.mp4, tools/ (minimal), agw/, CNAME.
- Missing: animation/, assets/, success/, cancel/.
- PR adds only docs (GPT audit + this packet).

Live serves the old "Build. Ship. Evolve." homepage + routes.

## 5. Confirmed Local Source Map
Master: /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/
- Source/oc2co_website/: full site (index V2 + css/js, routes, oc2co_intro*.mp4, animation/clip1-8.mp4, success/, cancel/, tools/, intro-animation.html, bbwaas_* dev).
- Images/: categorized (Heroes/, Cards/ etc.) from Canva — specs/READMEs only, no final binaries yet.
- Subdomains/: staging copies (incomplete, broken relatives).
- Documents/Reports/: prior V2 reports + 10BG/.
- Assets/Canva_Exports/: visual specs.

## 6. Confirmed Public Route Map

| Route          | Source file                  | Status (live) | Home link                  | Notes |
|----------------|------------------------------|---------------|----------------------------|-------|
| /              | index.html                   | 200 (old GH)  | Yes (self)                 | Needs V2 reconciliation |
| /store/        | store/index.html             | 200           | Yes (https://www.oc2co.com)| Polsia hardcoded for real store |
| /checkout/     | checkout/index.html          | 200           | Yes (multiple)             | "Not Connected Yet"; safe skeleton |
| /arcade/       | arcade/index.html            | 200           | Yes                        | Prototype hub |
| /cinematic/    | cinematic/index.html         | 200           | Yes                        | GH: broken clip1.mp4; local: good oc2co_intro.mp4 |
| /iris_oracle/  | iris_oracle/index.html       | 200           | Yes (strong fixed)         | Good public Home; SPA |
| /success/      | success/index.html           | Local only    | Yes                        | Missing on GH |
| /cancel/       | cancel/index.html            | Local only    | Yes                        | Missing on GH |

## 7. Intro Video / Cinematic Status
- Local: cinematic uses `../oc2co_intro.mp4` (file present, ~25MB); homepage uses `oc2co_intro_silent.mp4` (inline framed preferred in V2).
- GitHub (branch + main): homepage uses `oc2co_intro.mp4` (fullscreen hero); cinematic uses `../animation/clip1.mp4` (animation/ dir absent → 404).
- oc2co_intro.mp4 confirmed present in repo (blob size confirmed).
- Recommendation: cinematic → use ../oc2co_intro.mp4. Keep clips local or add selectively later. Prefer inline silent on homepage per V2 reports.

## 8. Preferred Landing Page Reconciliation
- GH live/main/fix-branch: pre-V2 monolithic cinematic ("Build. Ship. Evolve.", fullscreen video, project list, film grain).
- Local Source: post-V2B (ocean-night-scene + celestial layers, glassmorphic, "Organized chaos..." hero, feature cards Build/Memory/Product Worlds, inline video, parked CTAs, Polsia absolute links).
- Canva: OC2CO_HOME_HERO_COSMIC_ORIGIN_V02 etc. are specs/READMEs only (no images); description matches V2 ocean/cosmic glass.
- No separate Polsia landing page HTML source exists — only visual language + delegation links.
- Decision: ONE canonical = local V2 state. Sync homepage (index.html + style.css + script.js) to GitHub after Group A route fixes. No duplicate page.

## 9. Broken Link / Broken Asset List

| Page                  | Broken item              | Current value                    | Recommended value              | Risk |
|-----------------------|--------------------------|----------------------------------|--------------------------------|------|
| cinematic/index.html (GH) | video src               | ../animation/clip1.mp4          | ../oc2co_intro.mp4            | 404 video |
| Multiple (store, arcade, etc.) | Dead anchors            | #projects, #connect, ../#connect | Add ids or remove / point to real | UX dead |
| checkout (various)    | Back to Store            | https://oc2coos-2.polsia.app/store | /store/ or clear Polsia label | Routing confusion |
| All Polsia CTAs       | Label / target           | Hardcoded polsia + "Request Access" | Clarify "via Polsia (pending)" | User confusion |
| Subdomains/ copies    | All relatives (css, Home) | ../style.css etc.               | Absolute or self-contained    | Broken in staging |
| checkout.html / comments | Success paths         | /store/success or checkout.html?success | /success/ /cancel/            | Flow mismatch |
| sidepanel.js          | fs + localhost           | /mnt/c/... and localhost:8787   | Remove from public            | Private exposure + breakage |

## 10. Store / Checkout Safety
- No Stripe secrets, keys, tokens, wallet data in static HTML/JS.
- Explicit safe wording: "Secure Checkout — Not Connected Yet", "Not connected: no Stripe secret keys".
- Store clearly labels prototypes ("In development", "Coming soon").
- success/ and cancel/ skeletons exist locally with proper nav back.
- No misleading "live payment" claims.
- PASS for this pass. Backend untouched.

## 11. MemTool / SellThis Link and Label Fixes
- Public pages label as "MemTool IN DEVELOPMENT", "SellThis COMING SOON", "Request access".
- Links mostly go to Polsia or dead #connect.
- GitHub link appears in cinematic.
- Recommended: keep "Prototype" / "Parked" clarity; no direct live product links yet. Update labels for precision in Group B.

## 12. Private Exposure / Security Review
- High risk items in Source (will publish on Pages):
  - /mnt/c/Users/Sagou/Documents/BrainHub absolute paths (server.js, sidepanel.js).
  - localhost:8787 and ngrok refs.
  - "BBWAAS", "AGENT_WORKSPACE" strings + dev tooling.
  - agw/ (PACKETS + AGENT_REPORTS) present on GitHub branch → publicly served.
- No client secrets reproduced.
- Sidecar/MCP server code should stay internal.
- agw/ and bbwaas_* should be excluded from public repo.
- Recommendation: clean before any public patch or full live.

## 13. Files To Patch First
- cinematic/index.html (video src fix)
- success/index.html + cancel/index.html (add to GH)
- iris_oracle/index.html (already has Home; confirm)
- index.html (for anchors/labels, later V2)
- Possibly store/checkout/arcade for label + Home standardization
- Route map doc (agw or root)
- Cleanup: remove/exclude agw/ + private path files from public tree

## 14. Files Not To Touch
- Any Stripe, payment, RevenueCat, backend logic or keys.
- DNS, Namecheap, GitHub Pages settings, CNAME changes.
- Private BBWAAS/AGENT_WORKSPACE full content.
- Canva spec READMEs as image replacements (use real exports).
- Local animation/ clips (unless explicitly approved for public).
- Subdomains/ staging copies (fix or discard).

## 15. Reversible Patch Plan

### Patch 1 — Cinematic video source
File: cinematic/index.html (on PR branch)
Change: `../animation/clip1.mp4` → `../oc2co_intro.mp4`
Risk: low. Reversible. Matches local + asset present.

### Patch 2 — Iris Oracle Home link
Status: already has strong `https://www.oc2co.com` link. Confirm no regression. Add if any other entry points missing.

### Patch 3 — Add success/ and cancel/ skeletons
Copy minimal versions from local Source/ (or create static "Success" / "Canceled" + Home/Store links).
Add to branch so /success/ /cancel/ 200.

### Patch 4 — Route map document
Create: agw/AGENT_REPORTS/OC2CO_PUBLIC_ROUTE_MAP_2026-06-27.md or root ROUTE_MAP.md (simple table of routes, ownership, status).

### Patch 5 — Link label + Home standardization (Group B)
- Standardize Home to `https://www.oc2co.com` or root-relative.
- Fix or document dead #anchors.
- Clarify Polsia labels ("Polsia Backend (pending)").
- Update "Request access" CTAs for clarity.

### Patch 6 — Homepage V2 reconciliation (Group C, after A)
Sync index.html + style.css + script.js from local V2 (ocean + celestial + copy + inline video).
Preserve all V2 elements exactly.

### Patch 7 — Private cleanup (parallel with A)
Remove agw/, bbwaas_sidecar, bbwaas_mcp, server.js etc. from public Source for deploy (or move to internal BBWAAS only). Replace fs/localhost refs.

## 16. Verification Commands
Local:
```bash
cd /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website
find . -maxdepth 3 -type f | sort
grep -RInE 'href=|src=|url\(|location\.href' . --include='*.html' --include='*.js'
grep -RInE 'BrainHub|BBWAAS|/mnt/c/|localhost|oc2co_intro|clip1' . --include='*.html'
find . -iname '*.mp4' | sort
```
Public:
```bash
curl -I https://www.oc2co.com/
curl -I https://www.oc2co.com/cinematic/
curl -I https://www.oc2co.com/iris_oracle/
curl -I https://www.oc2co.com/store/
# After patch: verify video plays, Home works, no 404s on success/cancel
```
DNS: nslookup www.oc2co.com ; nslookup store.oc2co.com (expect NX)

## 17. Steven Approval Gates
1. Approve canonical www.oc2co.com + single homepage.
2. Approve Patch Group A (cinematic video, add skeletons, basic Home fixes, private cleanup) on the draft PR branch only.
3. Approve no private exposure (confirm agw/ removal plan).
4. Approve Polsia vs static routing story.
5. Approve Group B labels.
6. Approve Group C visuals (homepage V2 + future image layers from Images/).
7. Approve any subdomain creation or DNS later (Group D).
8. Final sign-off before any merge or deploy.

## 18. Recommended Agent Routing After Synthesis
- Use focused subagent(s) to apply Group A patches to the branch (reversible, one file at a time).
- Separate subagent for homepage V2 sync (after A passes).
- Visual integration subagent once Canva final exports available in Images/.
- Domain/subdomain planning packet only after Steven gate.
- Verification subagent to run curls + link checks post-patch.

## 19. Final PASS/WARN/FAIL
- Routes: PASS (core) / FAIL (cinematic video on GH) / WARN (dead anchors, Polsia mismatch)
- Video/Asset: FAIL on GH cinematic; PASS local + homepage video
- Home links: PASS (most) / WARN (some weak/dead)
- Store/Checkout safety: PASS (no secrets, clear wording)
- Private exposure: FAIL (agw/ + paths present)
- Homepage: WARN (drift between GH and local V2)
- DNS/Live: PASS (healthy GitHub Pages)
- Organization: PASS (BBWAAS umbrella)

Overall: Route integrity incomplete on public repo; ready for safe Group A after Steven.

## 20. Next Work Packet
OC2CO_WEBSITE_PATCH_GROUP_A_10BG-02 (or equivalent):
- Apply cinematic video fix + add success/cancel + private cleanup + minimal Home standardization to oc2co-route-video-home-fix-01.
- Update reports.
- Run verification.
- Present diff + live proof for Steven.
- Then Group B (labels) and Group C (V2 homepage).

All 10 agent reports + this synthesis in:
`/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Documents/Reports/10BG/`

Bring to GPT/Steven: list of reports, this synthesis, exact patch list above, risks (private files), confirmation that PR branch is draft only.

No merge. No deploy. No DNS. Proof-backed only.

Status: Synthesis complete from agent outputs + direct verification. Ready for review and targeted reversible patches.