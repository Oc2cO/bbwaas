# HOSTING_DEPLOY_AUDIT_BG3_REPORT.md
**BG Agent 3 (Hosting & Deploy Lens)**  
**Task:** Audit all hosting/deploy locations for Oc2cO/BBWAAS bridging.  
**Date:** 2026-06-27  
**Scope:** Polsia (oc2coos-2.polsia.app + references), GitHub Pages (www.oc2co.com via CNAME), Cloudflare (workers/pages/configs/DNS), elsewhere (Vercel etc.). Isolated exploration via ls/grep/find, git references, live probes (web_fetch, browse, DNS context from prior reports), MCPs where relevant (github, no direct CF project tools used beyond docs). No edits.

## Executive Summary
- **Canonical live:** GitHub Pages at `https://www.oc2co.com` (and `https://oc2co.com` which redirects/serves same). Self-described as "GitHub Pages Static Site Portfolio". DNS: Cloudflare nameservers + GitHub Pages A records.
- **Source of truth:** `Website/oc2co/Source/oc2co_website/` (rich cinematic/ocean V2B index.html with video + polsia nav overrides; CNAME `www.oc2co.com`; `enable_pages.sh`).
- **Misalignments:** Latest source index.html (ocean/organized chaos hero, polsia links) not reflected on live GH Pages (serves older "Build. Ship. Evolve." simple portfolio). Polsia URLs hardcoded everywhere but Polsia instance currently serves no HTML ("No content found" / JSON backend errors).
- **Polsia role:** Intended functional backend for Store/Arcade/Checkout (Stripe/Neon/etc per reports), but currently non-functional for frontend paths. Links in source/Subdomains point there.
- **Cloudflare:** DNS/NS only (brenna.ns.cloudflare.com, paul.ns.cloudflare.com; apex A to GH IPs; www CNAME to oc2co.github.io). **No wrangler.toml, no Cloudflare Pages/Workers configs, no workers code, no cf-*.json found in source or project.**
- **Other:** No Vercel (no vercel.json, no deploy evidence for site; tools available in inventory only). No Netlify, Render, etc. oc2co.github.io = 404 (expected for custom domain). Subdomains/ = local curation copies only (not hosted).
- **Polsia "download":** No active download/hosting artifact found; references only in code/links (e.g. old MemTool components hardcode the URL). Polsia/ in Other_Projects/ is pointer/README only.
- **Key issues:** Broken user flows (polsia links to non-HTML), source/live drift on homepage visuals/Canva-aligned ocean elements, hardcoded external addresses vs relative subpaths, pending consolidation of static + functional.

## Current Live Addresses & What They Host

| Hosting Target | Address | Status | Alignment with Canonical | Issues (esp. pages/visuals/Canva addresses) |
|---------------|---------|--------|--------------------------|---------------------------------------------|
| GitHub Pages (main) | https://www.oc2co.com (apex https://oc2co.com normalizes) | Live (200 OK, GitHub Pages server; robots.txt returns GH 404 page) | Partial (self-describes "GitHub Pages"; CNAME matches). Latest source not deployed. | Homepage serves simple "Build. Ship. Evolve." markdown-style portfolio (MemTool/SellThis/Website sections, relative links to /store/ /arcade/ /cinematic/). Does **not** match source's rich ocean-night-scene + video hero + "Organized chaos..." . Subpaths (/store/, /arcade/, /cinematic/, /checkout/, /success/, /cancel/, /iris_oracle/) serve static skeletons from repo. Live nav/footer consistent with older source. Canva/visuals (ocean/glass) in source not live on root. |
| GitHub Pages subs | https://www.oc2co.com/store/ etc. | Live (200) | Aligned with source skeletons | Placeholders only ("Public Store Skeleton", "Checkout status: pending", "No live payment"). Hardcoded polsia links inside. No functional backend. |
| Polsia (intended functional) | https://oc2coos-2.polsia.app | Live but empty ("No content found") | Not aligned (intended for Store/Arcade/Checkout per pointers/links/reports) | Root: "No content found". /store, /arcade, /checkout: JSON `{"success":false,"message":"Cannot GET /..."}` (Express backend). No HTML storefronts/arcades. Links from oc2co.com point here → broken UX. Polsia used in MemTool old code, store-backend.js comments, alignment docs (SITE_URL, webhook, success/cancel). No "download" hosting found. |
| Polsia subs (links) | https://oc2coos-2.polsia.app/store , /arcade , /checkout , /store/checkout | Referenced | Misaligned | Hardcoded absolute in **every** nav/CTA in source index.html, store/, arcade/, cinematic/, checkout/, success/, cancel/, Subdomains/ copies, old components, reports (e.g. OC2CO_POLSIA_LINKING_REPORT, 10BG agents). Not serving HTML. |
| GitHub raw/direct | https://oc2co.github.io | 404 "Site not found" | N/A (expected) | Normal for custom domain + CNAME setup. |
| Other subdomains (planned) | e.g. memtool.oc2co.com, sellthis.oc2co.com, store.oc2co.com etc. | NXDOMAIN / no records | Not provisioned | Referenced in payment docs, MemTool, future plans. Zero DNS (Cloudflare SOA). No hosting. |
| Cloudflare | DNS only (no workers/pages) | Active (NS + records) | DNS supports GH Pages | No project configs (wrangler, pages, workers) in Website/, Source/, bbwaas/, Subdomains/, Other_Projects/Polsia/, Work_Packets, AGENT_WORKSPACE etc. No CF Pages/Workers detected live or in code. Likely only for DNS/proxy (common with GH custom domains). No evidence of CF hosting the site content. |
| Vercel / elsewhere | None detected | N/A | N/A | Inventory mentions Vercel tools/plugins available for deploy (e.g. oc2co site), but no vercel.json, no deploy scripts beyond enable_pages.sh, no live Vercel URLs in source/links/live. No other (Netlify, Render, etc.). |

**Live content probes summary (current):** Root + subs return GitHub Pages HTML (skeletons + simple portfolio). Polsia non-HTML. Matches prior 10BG/AGENT_01 reports but with source drift (new cinematic index pushed per raw.githubusercontent but not yet on live GH Pages).

## Source vs Live Misalignments
- **Source index.html** (Website/oc2co/Source/oc2co_website/index.html + pushed to GH main): Rich V2B ocean-night + celestial layers, intro video (oc2co_intro_silent.mp4), feature cards, nav overrides Store/Arcade/SellThis to https://oc2coos-2.polsia.app/*, footer "Live on oc2co.com (GitHub Pages)".
- **Live root:** Older/simple "Build. Ship. Evolve." (no ocean video; different hero/sections). Sub skeletons partially aligned but contain polsia hardcodes.
- **Subdomains/ copies:** Exact mirrors of Source subfolders (arcade/, store/ etc.) with polsia links; for curation only (per README), not separate deploys.
- **enable_pages.sh + CNAME:** In source and repo; sets GH Pages source=main / . Matches DNS.
- **Other files:** store-backend.js, payments-*.js, alignment/*.md, reports (OC2CO_POLSIA_*, 10BG/*) hardcode polsia.app extensively. Canva exports/visual assets (ocean/glass/cosmic) tied to source but addresses mixed.
- **Drift cause:** Recent source updates (cinematic/V2B) not reflected live (GH Pages rebuild pending post-push?); Polsia delegation never fully materialized on that host.

## Cloudflare Check (specific)
- **Found:** DNS provider (NS records), A records for GH Pages compatibility.
- **Not found:** wrangler.toml, cloudflare.toml, wrangler.json, .pages/, workers/, any CF-specific code/scripts in source tree, Subdomains/, agw/, Other_Projects/Polsia/, Work_Packets/, AGENT_WORKSPACE/, STATIC_PROOF/, HOSTED_WORKSPACE/.
- **MCP/Inventory:** cloudflare-docs and plugin available (workers/pages/R2/AI), but no active use/config for Oc2cO. Historical notes (AGENT_01) confirm migration to Cloudflare DNS from Namecheap plans.
- **No workers/pages hosting the visuals or site.**

## Other Hosting Locations Audited
- **Vercel:** Tools present (vercel-plugin, grok_com_vercel mentions for deploy), but zero evidence of deployment for www.oc2co.com or oc2co site. No configs, no URLs in links/source/live.
- **Polsia "download":** No filesystem download or separate hosted Polsia artifact located (searches across bbwaas/Downloads-equivalent paths, Other_Projects, reports). References are URL-only.
- **Local proofs:** HOSTED_WORKSPACE/, STATIC_PROOF/, bbwaas_mcp/ etc. are dev/local only (not public).
- **GitHub repo:** https://github.com/Oc2cO/-oc2co (public, has_pages: true, 32+ commits). No .github/workflows/ deploys found. enable_pages.sh is manual API curl.
- **No other:** No additional subdomains live, no alternative CDNs beyond GH + CF DNS.

## Misalignments Table (Key Files/Links)
| File/Path | Current Address (hardcoded) | Expected/Canonical | Issue |
|-----------|-----------------------------|--------------------|-------|
| Source index.html (nav + SellThis) | https://oc2coos-2.polsia.app/store , /arcade | https://www.oc2co.com/store (or relative) | External polsia (non-functional); source richer than live |
| Source store/index.html , arcade/ etc. | https://oc2coos-2.polsia.app/... | Internal or consolidated | Self-ref + polsia; checkout preview wrong path |
| All Subdomains/*.html + cinematic/ etc. | Same polsia hardcodes + mixed www.oc2co.com home | Consistent base | Dupe copies amplify drift; Canva visuals point via mixed addresses |
| Reports (10BG, POLSIA_LINKING, etc.) + store-backend.js | polsia.app URLs + old assumptions | Update post-consolidation | Outdated "Polsia serves live Store" vs reality |
| Live root (GH) | Simple portfolio (no ocean/video) | Source cinematic | Visual/Canva misalignment; users see outdated branding |

## Recommendations: Consolidation Target & Fixes
**Recommended canonical target:** **https://www.oc2co.com (GitHub Pages)** for **all** static + visual content (home, cinematic, arcade prototypes, store skeletons, Canva-aligned ocean/glass visuals). 
- Rationale: Already live + DNS-wired + self-described + source/CNAME/enable_pages.sh point here. Avoids split (static vs "Polsia functional"). Polsia remains backend/API only (or migrate storefront to static/Express on same GH if simple, or later Vercel/CF Pages).
- Alternative (if Polsia frontend matures): Provision subdomains (store.oc2co.com etc.) via Cloudflare + update DNS/CNAMEs, but adds complexity; current NXDOMAIN. Not recommended for consolidation.
- Long-term: If dynamic needed, evaluate Vercel (tools ready) or Cloudflare Pages for unified deploy (source + assets).

**Concrete fixes (prioritized, no secrets):**
1. **Align live with source:** Push latest Source/oc2co_website/ (ensure index.html + assets/videos/style/script). Trigger GH Pages rebuild (use enable_pages.sh with token or push to main). Verify root serves cinematic/ocean version + video.
2. **Fix addresses/links:** 
   - Replace all `https://oc2coos-2.polsia.app/store` (and /arcade, /checkout variants) with relative `store/`, `arcade/`, `checkout/` (or `https://www.oc2co.com/store/` for absolute safety).
   - Update nav/CTA in index.html, store/, arcade/, cinematic/, checkout/, Subdomains/ copies, success/cancel, reports/docs.
   - Label if needed: "Store (via Polsia backend — coming)" but prefer consolidate to GH paths.
3. **Polsia:** Update to serve HTML at /store /arcade (or deprecate external links). Or remove Polsia refs if backend-only now. Re-test with chrome-devtools.
4. **Cloudflare:** 
   - Confirm/keep DNS (Apex GH IPs, www CNAME, NS).
   - No action for workers unless adding (e.g. /workers for API proxy). Add if proxy needed.
   - Audit subdomains in Cloudflare dashboard (none provisioned).
5. **Subdomains/:** Keep as curation mirrors or sync from Source post-fix. Document as "not hosted".
6. **Other:** 
   - Update AGENT_01/10BG reports + POLSIA_LINKING if stale.
   - Add .github/workflows/deploy.yml? (optional, for future; current manual).
   - Verify no private paths/C:\ in source before more deploys.
   - Test full flow post-fix with live probes + chrome.
7. **Canva/visuals:** Ensure Canva exports (Images/, Canva_Exports/) referenced in source match live addresses (use relative or oc2co.com base). Re-export if branding drift.
8. **Verification:** Re-run chrome-devtools on www.oc2co.com + polsia; git diff before push; update this report.

**Risks if not fixed:** User confusion (click Store → JSON error or old UI); branding inconsistency (Canva ocean not live); stalled BBWAAS/Oc2cO bridge.

## DELIVERABLES
- This report: `/home/sagou/bbwaas/Work_Packets/HOSTING_DEPLOY_AUDIT_BG3_REPORT.md`
- Tables: Hosting target | Address | Status | Alignment | Issues (completed above).
- Recommendations: Consolidation to www.oc2co.com GH Pages + link fixes + source/live sync.
- Packet summary below.

**Related artifacts referenced (no new files created besides this report):**
- Source: Website/oc2co/Source/oc2co_website/{CNAME,enable_pages.sh,index.html,store/,arcade/,...}
- Subdomains: Website/oc2co/Subdomains/
- Reports: Website/oc2co/Documents/Reports/10BG/AGENT_01_DOMAIN_DNS_REPORT.md , OC2CO_POLSIA_LINKING_REPORT.md , others
- Live probes + GitHub repo (Oc2cO/-oc2co)
- DNS context: Cloudflare + GH Pages

## Packet Summary
**BG3 Packet complete.** Full isolated audit of hosting/deploy surfaces completed using filesystem tools, live web probes, GitHub API/raw, prior agent reports. No Cloudflare workers/pages in project; Polsia references misaligned with reality; GH Pages is primary but source/live drift + polsia hardcodes are primary issues. Concrete consolidation to GH Pages recommended with specific link/source fixes. Ready for parallel agents or next steps (e.g. PR for link updates + Pages trigger). 

**End of BG Agent 3 (Hosting & Deploy Lens) Report.**