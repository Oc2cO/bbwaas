# AGENT 02 GITHUB REPO REPORT

## Agent Lens
GITHUB / PUBLIC REPO AUDITOR for the OC2CO website wiring audit.

Focus: public GitHub repo `Oc2cO/-oc2co` on branch `oc2co-route-video-home-fix-01`, PR #2, file tree, specific files/paths, video references (oc2co_intro.mp4, animation/ clips), missing pages (success/, cancel/), and comparison to local mirror at `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/`.

Tools used: GitHub REST API (`/repos/.../git/trees/...`, `/contents/...`), raw.githubusercontent.com fetches, web_fetch/browse_page for content inspection. No local edits, no patches applied. Proof-based only.

PR context (from API): https://github.com/Oc2cO/-oc2co/pull/2 is open draft PR titled "Audit Oc2cO website route bridge". Head: `oc2co-route-video-home-fix-01` (sha c7bb8ec7b809fd417eaa36fb84c0c084248d32bf). Base: main. Adds 2 commits (150 additions): docs for GPT audit report and 10BG wiring packet. No wiring code changes in this PR (per summary and changed_files=2).

## Files / URLs Checked
**Public repo (branch oc2co-route-video-home-fix-01):**
- https://github.com/Oc2cO/-oc2co/tree/oc2co-route-video-home-fix-01
- https://api.github.com/repos/Oc2cO/-oc2co/git/trees/oc2co-route-video-home-fix-01?recursive=1
- https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/CNAME
- https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/index.html
- https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/oc2co_intro.mp4 (blob existence via tree)
- https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/store/index.html
- https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/checkout/index.html
- https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/arcade/index.html
- https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/cinematic/index.html
- https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/iris_oracle/index.html
- https://api.github.com/repos/Oc2cO/-oc2co/contents/success?ref=oc2co-route-video-home-fix-01 (and main)
- https://api.github.com/repos/Oc2cO/-oc2co/contents/cancel?ref=oc2co-route-video-home-fix-01 (and main)
- https://api.github.com/repos/Oc2cO/-oc2co/contents/tools?ref=oc2co-route-video-home-fix-01
- https://api.github.com/repos/Oc2cO/-oc2co/contents/assets?ref=oc2co-route-video-home-fix-01
- https://api.github.com/repos/Oc2cO/-oc2co/contents/animation?ref=oc2co-route-video-home-fix-01
- https://api.github.com/repos/Oc2cO/-oc2co/contents/agw?ref=oc2co-route-video-home-fix-01
- Additional: https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/intro-animation.html , first-video-script.md , enable_pages.sh , agw/ reports/packets (e.g. OC2CO_WEBSITE_WIRING_10BG_PACKET_2026-06-27.md)
- PR: https://github.com/Oc2cO/-oc2co/pull/2 and API details
- GitHub Pages note: has_pages=true on repo.

**Local mirror (for state comparison only):**
- /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/
  - CNAME, index.html, oc2co_intro.mp4 (and oc2co_intro_silent.mp4), store/index.html, checkout/index.html + checkout.html (root), arcade/index.html, cinematic/index.html, iris_oracle/index.html, success/index.html, cancel/index.html
  - animation/ (clip1.mp4 ... clip8.mp4), assets/, tools/ (more files), agw/ (expanded), audio/, bbwaas_*, etc.
- Confirmed via list_dir, read_file, grep on local paths.

## Confirmed Facts
- Repo and branch exist and are public. CNAME = "www.oc2co.com" on both main and the branch.
- oc2co_intro.mp4 exists at repo root on the branch (blob size 25417686 bytes).
- index.html (GH branch): uses `<source src="oc2co_intro.mp4" type="video/mp4">` in hero-video-wrapper (fixed overlay intro). Nav links to store/, arcade/, cinematic/, #projects, #connect. Includes `<script src="tools/cinematic-layer.js"></script>`. No references to success/, cancel/, animation/, or iris_oracle in nav/projects.
- store/index.html, checkout/index.html, arcade/index.html, cinematic/index.html, iris_oracle/index.html all exist on GH branch with relative Home links (e.g. ../ or ./) back to root in most navs.
- cinematic/index.html (GH branch, lines ~162-163): `<source src="../animation/clip1.mp4" type="video/mp4">` (plus comment "Using one of your brand animation clips"). 8 brand film clips mentioned in content.
- tools/ on GH: only cinematic-layer.css and cinematic-layer.js.
- agw/ present with AGENT_REPORTS, AGENT_WORKSPACE, PACKETS (including the 10BG wiring packet and GPT audit report), README.md, etc.
- success/ and cancel/ : 404 Not Found on both the branch and main (confirmed via /contents API).
- animation/ and assets/ : 404 Not Found on the branch.
- Local Source/oc2co_website/ has full set: animation/ (8 clips), assets/, success/, cancel/, more tools/ files (README.md, animated-cinematic-website.skill.md), root checkout.html, style.css, script.js, oc2co_intro_silent.mp4, etc.
- Local cinematic/index.html uses `<source src="../oc2co_intro.mp4" type="video/mp4">` (different from GH branch).
- Local index.html is structurally different (external Polsia store/arcade links, ocean-night-scene CSS, uses oc2co_intro_silent.mp4, links to intro-animation.html).
- PR #2 adds only documentation (audit report + packet) to the branch; the site files reflect the "video home fix" state.
- No success/cancel references or links appear in GH branch's public .html files (only textual "checkout" mentions in store/checkout).
- GitHub API confirms repo has_pages=true, language mix HTML/JS/CSS/Shell. No large file issues flagged in tree.

## PASS Items
- CNAME present and correctly set to www.oc2co.com (matches local).
- oc2co_intro.mp4 exists at root and correctly referenced by index.html on GH branch (hero video).
- store/, checkout/, arcade/, cinematic/, iris_oracle/ subdirs + index.html present on GH branch.
- Most subpages include navigation back to Home (../ or ./) or Store/Arcade.
- tools/cinematic-layer.js referenced by index.html and present.
- agw/ structure present with relevant reports/packets matching the audit lens.
- No secrets/tokens/wallets or live payment logic in the static GH checkout/index.html (confirmed in browsed content and prior reports).
- Video file size/blob confirmed via tree (public repo state).
- PR #2 exists, is draft, correctly scoped to audit/docs only.

## WARN Items
- GH index.html on branch is self-contained/inlined styles + hero-video (differs significantly from local Source index.html which uses external style.css/script.js, different hero, silent video, Polsia external links).
- cinematic/index.html on GH references ../animation/clip1.mp4 (and implies multiple clips) but animation/ dir absent.
- tools/ on GH is minimal (only 2 files) vs local (includes README.md, skill.md, more).
- Additional GH files present not in minimal local Source list: index.html.pre-cinematic.bak, first-video-script.md, bbwaas_mcp/, bbwaas_sidecar/, intro-animation.html (CSS-only letters animation).
- Local has oc2co_intro_silent.mp4 and root checkout.html (example/server scripts) absent from GH tree.
- No direct evidence of iris_oracle linked from GH index.html nav (per packet/audit notes).
- GitHub Pages enabled on repo but sub-routes (e.g. /cinematic/) rely on static file presence; large mp4 may have serving implications (not tested here).
- Branch has 34 commits vs main 32; PR is the audit anchor.

## FAIL Items
- animation/ directory entirely missing on GH branch (and main) despite explicit reference in cinematic/index.html.
- assets/ directory missing on GH branch.
- success/index.html entirely missing (404) on GH branch and main.
- cancel/index.html entirely missing (404) on GH branch and main.
- cinematic video path on GH branch is broken (../animation/clip1.mp4 does not resolve; local cinematic uses working oc2co_intro.mp4 instead).
- success/ and cancel/ pages (present locally as static "prepared for future checkout" routes) are not in public repo file tree, creating incomplete checkout flow skeleton if/when linked.
- No animation/ clips (clip1.mp4–clip8.mp4) present on GH despite cinematic content claiming "8 Brand film clips".

## Exact Evidence
**CNAME:**
- GH: `https://raw.githubusercontent.com/Oc2cO/-oc2co/oc2co-route-video-home-fix-01/CNAME` → "www.oc2co.com"
- Local: matches exactly.

**index.html video ref (GH branch):**
```
<div id="hero-video-wrapper" ...>
  <video id="hero-video" ...>
    <source src="oc2co_intro.mp4" type="video/mp4">
  </video>
```
(Full browse confirmed 262 lines; no success/cancel/checkout refs.)

**cinematic video ref (GH branch, exact):**
```
<video id="cinematic-video" ...>
  <!-- Using one of your brand animation clips -->
  <source src="../animation/clip1.mp4" type="video/mp4">
</video>
```
(370-line file; chapter content references 8 clips.)

**Missing dirs (API proof):**
- `https://api.github.com/repos/Oc2cO/-oc2co/contents/animation?ref=oc2co-route-video-home-fix-01` → {"message":"Not Found", "status":"404"}
- Same for assets/, success/, cancel/ (also on main ref).
- Tree recursive confirmed no paths matching these.

**Present subpages (examples):**
- store/index.html: nav has `<a href="../">Home</a>`, `<a href="../checkout/">Checkout Bridge</a>`, checkout status text.
- checkout/index.html: nav Home/Store/Arcade; "Checkout connection pending."; no success/cancel urls.
- arcade/index.html: similar Home links.
- iris_oracle/index.html: full app (landing/ orb / select / camera / processing / reading); internal videos via getUserMedia; no top-level "Home" link to ../ (per audit report).

**oc2co_intro.mp4:**
- GH tree: path present, size 25417686, type blob.
- Referenced in GH index.html (exists).

**Local vs GH diff (key):**
- Local cinematic: `src="../oc2co_intro.mp4"`
- Local index: uses `oc2co_intro_silent.mp4` + external Polsia links + style.css/script.js.
- Local has animation/ (8 clips), success/, cancel/, assets/, full tools/.

**PR evidence (API):**
- state: "open", draft: true, commits:2, changed_files:2, head ref matches branch.
- Body explicitly notes: "cinematic video source", "first broken-link risks", "Iris Oracle Home link".

**Additional GH files (tree excerpts):**
- tools/: cinematic-layer.css (1577B), cinematic-layer.js (372B)
- agw/PACKETS/OC2CO_WEBSITE_WIRING_10BG_PACKET_2026-06-27.md (contains "cinematic/index.html likely points at a missing video file: `../animation/clip1.mp4`")
- agw/AGENT_REPORTS/OC2CO_WEBSITE_ROUTE_BRIDGE_GPT_AUDIT_2026-06-27.md (confirms findings 4 and 5 on cinematic and iris_oracle).

## Recommended Fixes
(For review only; do not apply without approval per packet.)
1. Fix cinematic/index.html: change src from `../animation/clip1.mp4` to `../oc2co_intro.mp4` (or add animation/ with approved clips). Match local cinematic source.
2. Add missing directories and pages to public repo: animation/ (with clips if approved), assets/ (per local structure), success/index.html, cancel/index.html (copy/update from local Source/ versions or create minimal static like store/checkout).
3. Ensure success/ and cancel/ are linked from checkout flow if/when Polsia backend is wired (currently no links in GH pages).
4. Reconcile index.html between local Source/ and GH branch (or document which is canonical for public). Current GH branch appears to be the "video home fix" version.
5. Add explicit Oc2cO Home link to iris_oracle/index.html landing (as noted in PR/audit).
6. Add animation/ or update all refs consistently; update cinematic content if clips not ready ("8 clips" claim).
7. Sync tools/: add local README.md and skill.md if relevant to public.
8. Verify GitHub Pages serves /cinematic/, /store/ etc. after any tree changes (CNAME already correct).
9. Update agw/ reports with this audit's findings for synthesis.
10. Keep all on branch + draft PR until Steven review; no direct main push.

## Do Not Touch
- DNS records or custom domain settings.
- GitHub Pages repo settings or deploy configs.
- Any payment/checkout backend, Polsia URLs, Stripe logic, secrets, tokens, or wallets (none present in static files).
- Private BBWAAS command room / internal paths outside public repo.
- Local Source/ files (this is audit only; no sync/patch here).
- Root checkout.html or server example scripts unless explicitly approved for public.
- Non-specified files (e.g. bbwaas_mcp/, intro-animation.html) without review.

## Open Questions
- Is the animation/ dir + clips intended for public repo, or was the cinematic src change in the branch a temporary/mistaken edit (local cinematic uses oc2co_intro.mp4)?
- When will success/ and cancel/ be added to the public repo tree, and will checkout bridge link to them (e.g. via query params or redirects)?
- Which index.html (GH branch self-contained version vs local Source/ version) is the intended public state? Current divergence affects video refs and nav.
- Status of assets/ — are they to be added, or was reference removed?
- Is iris_oracle meant to be discoverable from main nav/home, or standalone for now?
- Any plan to push oc2co_intro_silent.mp4 or other local assets to GH?
- GitHub Pages large file handling for 25MB+ mp4 (oc2co_intro.mp4) and future clips?
- Next agent coordination: how does this (AGENT 02) feed into other lenses (e.g. route crawler, asset integrity)?

## Next Action
- Review this report + PR #2 + the 10BG packet + GPT audit report.
- Decide on reversible patch plan for cinematic video source, missing pages (success/cancel/animation/assets), and any home links.
- Confirm with Steven before any tree changes, merge, or DNS.
- Coordinate with other agents (e.g. route map, video integrity) using the shared packet format.
- After decisions: create follow-up branch for approved patches only; verify via raw URLs and Pages preview.
- Update reports under agw/AGENT_REPORTS/ and 10BG/ with synthesis.
- Do not merge or deploy until full 10BG review and approval gates cleared.

Proof sources: GitHub API responses, raw content fetches (web:0–5 etc. from tool results), local filesystem inspection, PR metadata. All statements traceable to fetched content or directory listings as of current date.

(End of report. Read-only audit complete.)