# AGENT 10 SYNTHESIS READINESS REPORT

## Agent Lens
SYNTHESIS / PATCH READINESS AGENT. Read all other agent outputs + evidence. Build the single recommended plan, route map, patch list, no-touch list, verification, Steven gates. One canonical architecture.

## Files / URLs Checked
All 10BG/ reports as written + Source tree + live curls + GitHub API/raw from prior agents + direct ls/grep.

## Confirmed Facts
From 01: DNS healthy for GitHub Pages www.oc2co.com; polsia mismatch (JSON not HTML); no subdomains.
From 02: GH branch has correct CNAME, oc2co_intro.mp4, core pages; MISSING animation/assets/success/cancel; cinematic uses clip1; homepage old monolithic.
From 03: Local has complete set (clips, success/cancel, correct video ref, V2 homepage).
From 04: GH homepage outdated vs local V2 ocean/"Organized chaos"; no Polsia landing source (only linking + visuals); one canonical.
From 05: Detailed link table - Polsia hardcodes everywhere, dead #anchors, Subdomains broken, localhost/fs paths, iris has good Home.
From 06: Home links mostly exist and point correct; some weak ../ or dead anchors; no traps on main routes.
From 07: Store/checkout safe wording; no secrets in static; success/cancel exist locally; "Not Connected Yet" clear.
From 08: Video path: local correct (../oc2co_intro.mp4); GH broken (../animation/clip1.mp4); Canva only specs.
From 09: Private exposure via agw/ + /mnt/c/ + localhost in dev JS; no client secrets.

## PASS Items
- Canonical www.oc2co.com confirmed live.
- Intro video asset present and referenced correctly in local + GH home.
- Core routes exist.
- Safety: no payment secrets.
- Most pages have Home return.
- Organization in BBWAAS umbrella good.

## WARN Items
- Homepage visual drift (old GH vs evolved local).
- Polsia links point to non-HTML currently.
- Dead anchors, label clarity needed.
- Private files in public tree risk.

## FAIL Items
- GH cinematic video 404 path.
- Missing success/cancel and animation/ on GH.
- Private exposure (agw/ and paths).

## Exact Evidence
(See individual reports for raw URLs, greps, API 404s, live 200s, file lists, exact src strings.)

## Recommended Fixes
Group A first (route integrity):
1. cinematic/index.html: src="../animation/clip1.mp4" → "../oc2co_intro.mp4"
2. Add success/ and cancel/ to GH (skeletons from local).
3. Add clear Home or fix weak links (iris confirmed good; standardize others).
4. Remove or exclude agw/, bbwaas_* from public tree or PR.
5. Optional: add ROUTE_MAP.md

Group B: labels, Polsia clarity, dead anchors.
Group C: homepage V2 sync (index+style+script) after A.
Group D: subdomain planning only after Steven.

## Do Not Touch
- Any Stripe keys, backend, payment logic.
- DNS, Namecheap, GitHub Pages settings.
- Private BBWAAS internals beyond cleanup.
- Canva specs as images.

## Open Questions
(See per-agent)

## Next Action
Write final OC2CO_WEBSITE_WIRING_10BG_SYNTHESIS.md with 20 sections. Present all reports + patch list to Steven for approval. Then apply Group A to the PR branch only. No deploy.