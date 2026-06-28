# AGENT 01 DOMAIN DNS REPORT

## Agent Lens

DOMAIN / DNS / LIVE SURFACE AUDITOR for the OC2CO website wiring audit.

Focus: All live public HTTP surfaces, DNS records (NS, A, CNAME, MX, etc.), subdomains, redirects, and hosting for oc2co.com and listed related surfaces. Read-only verification. No changes, no deploys, no DNS edits. Proofs drawn from live fetches (via page browsing tools) and public DNS resolver queries. Local BBWAAS structure scanned for notes only via list_dir/grep/read_file.

## Files / URLs Checked

**Live URLs (fetched for content/status):**
- https://oc2co.com
- https://www.oc2co.com
- https://oc2coos-2.polsia.app
- https://www.oc2co.com/store/
- https://www.oc2co.com/checkout/
- https://www.oc2co.com/arcade/
- https://www.oc2co.com/cinematic/
- https://www.oc2co.com/iris_oracle/
- Additional probes: https://www.oc2co.com/store (no trailing slash), https://oc2coos-2.polsia.app/store, https://oc2coos-2.polsia.app/arcade, https://oc2coos-2.polsia.app/checkout, https://oc2co.github.io (direct)

**Potential subdomains probed (HTTP fetch + DNS A query):**
- store.oc2co.com
- checkout.oc2co.com
- arcade.oc2co.com
- community.oc2co.com
- memtool.oc2co.com
- sellthis.oc2co.com
- agents.oc2co.com
- studio.oc2co.com
- botlab.oc2co.com
- api-studio.oc2co.com

**DNS queries (via public resolver for authoritative data):**
- oc2co.com (NS, A, CNAME for www, MX)
- All listed potential subdomains (A records)
- www.oc2co.com (CNAME + A resolution chain)

**Local BBWAAS files scanned (list_dir, grep, read_file for DNS/hosting notes only):**
- /mnt/c/Users/Sagou/Documents/BrainHub/bbwaas-static-proof/BBWAAS_PIN_BOARD_CURRENT.md (detailed DNS baseline, Cloudflare, GitHub Pages proofs, prior curl/nslookup)
- /mnt/c/Users/Sagou/Documents/BrainHub/00_MASTER_FRONT_DOOR/BBWAAS_POLSIA_NAMECHEAP_LIVE_HARDWIRE_PLAN_01.md (old subdomain plans, architecture, polsia role)
- /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/CNAME
- /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/README.md
- /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Subdomains/README.md
- /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/index.html (nav links)
- /mnt/c/Users/Sagou/Documents/BrainHub/iris_oracle/MASTER_PACKET.md
- /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Documents/Reports/ (multiple including prior stub AGENT_01, OC2CO_POLSIA_LINKING_REPORT.md, OC2CO_PAYMENT_HUB_CROSSAPP_V1_REPORT.md, BBWAAS_GROK_*, 10BG/ others)
- /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/ (READMEs, structure)
- Additional cross-greps across BBWAAS for "DNS|Cloudflare|nameserver|oc2co\.com|polsia\.app|subdomain|GitHub Pages|CNAME|A record"

**Other:**
- https://polsia.app (probe for related domain)
- https://dns.google/resolve (multiple for NS/A/CNAME/MX on oc2co.com and subs)

## Confirmed Facts

- **Registrar:** Namecheap (per multiple local docs including pinboard and iris packet).
- **DNS provider / nameservers:** Cloudflare. Confirmed live: brenna.ns.cloudflare.com and paul.ns.cloudflare.com. (DNS query 2026-06-27).
- **Apex domain (oc2co.com):** Four A records pointing to GitHub Pages IPs: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. Confirmed via DNS query.
- **www subdomain:** CNAME www.oc2co.com → oc2co.github.io. (resolves further to the same four GitHub A records). Confirmed via DNS query.
- **MX records (email):** 10 mx1.privateemail.com. and 10 mx2.privateemail.com. Confirmed via DNS query. (Additional CNAMEs for mail/autoconfig etc. noted in historical pinboard baseline.)
- **Hosting for oc2co.com surfaces:** GitHub Pages static hosting (confirmed by live content serving HTML/CSS/JS, footer text "Live on oc2co.com (GitHub Pages)", CNAME file content, DNS A/CNAME records matching GitHub Pages requirements). Static site includes full landing + subpaths with index.html files.
- **Redirect behavior:** https://oc2co.com redirects (301) to https://www.oc2co.com/ (historical verified via prior curl; current fetches normalize to serving the www content).
- **Live static surfaces on www.oc2co.com (and normalized oc2co.com):** All return 200 OK with full HTML content:
  - Root: "Oc2cO — Build. Ship. Evolve." landing page (MemTool IN DEVELOPMENT, SellThis COMING SOON, website LIVE as GitHub Pages static, nav links, video embed, feature cards, parked CTAs).
  - /store/: "Oc2cO Store — Request Access" (static skeleton, placeholders for SellThis/MemTool/general order, "Coming soon", "In development").
  - /checkout/: "Oc2cO Checkout Bridge — Pending" (explicitly "Not connected", links back to store/home/arcade).
  - /arcade/: "Oc2cO Arcade — Prototype Hub" (mini-app hub, SellThis/MemTool Lite prototypes parked).
  - /cinematic/: "Oc2cO • Cinematic" (brand film scroll experience with stats 42/2/8, MemTool/SellThis/Oc2cO sections).
  - /iris_oracle/: "Iris Oracle — The All-Seeing Eye" (interactive oracle UI with iris/palm/tongue/fingerprint/nail/voice modes; "Free" labels, reading interface).
- **oc2coos-2.polsia.app (related surface):** Resolves and is reachable (subdomain of polsia.app). Root returns "No content found". Paths /store, /arcade, /checkout return JSON: {"success":false,"message":"Cannot GET /<path>"} (Express-style backend, no HTML served at these routes currently). Used as target in static site nav/links (hardcoded https://oc2coos-2.polsia.app/store etc. in Source index.html and subpages).
- **Potential subdomains (listed):** No A records exist. All queries return Status:3 (NXDOMAIN) with authority SOA from Cloudflare. HTTP fetches to https://<sub>.oc2co.com fail (no content / DNS resolution failure at HTTP layer). Examples: store.oc2co.com, checkout.oc2co.com, arcade.oc2co.com, community.oc2co.com, memtool.oc2co.com (referenced in some payment reports), sellthis.oc2co.com, agents.oc2co.com, studio.oc2co.com, botlab.oc2co.com, api-studio.oc2co.com.
- **Direct GitHub Pages:** https://oc2co.github.io returns 404 "Site not found · GitHub Pages" (expected/normal when custom domain + CNAME file is used; traffic routes via DNS A/CNAME).
- **polsia.app root:** DNS does not resolve (probe failed); only specific instances like oc2coos-2.polsia.app are active.
- **Local evidence alignment:** Source/oc2co_website/ contains the build (CNAME: "www.oc2co.com", subfolders arcade/store/etc with index.html, hardcoded polsia links in nav). Subdomains/ holds curated copies. Historical pinboard (2026-06-23) matches current DNS (NS, A, CNAME, GitHub Pages 200/301 via curl). Plans reference future subdomains and Namecheap hosting but current state is Cloudflare + GitHub Pages. Reports note polsia for "live" functional store/arcade/checkout (but live probes contradict current serving).

## PASS Items

- Core domain surfaces live and consistent: www.oc2co.com (and redirect target) + all requested subpaths (/store/, /checkout/, /arcade/, /cinematic/, /iris_oracle/) serve expected static HTML content with 200 responses.
- DNS correctly wired for GitHub Pages: Apex A records + www CNAME present and matching GitHub IPs/CNAME target.
- Nameservers stable on Cloudflare (confirmed live query).
- Email MX records present and unchanged from baseline.
- oc2coos-2.polsia.app subdomain resolves (related surface exists).
- Static site self-describes as GitHub Pages custom domain.
- No unexpected wildcards or leaking subdomains; only intended surfaces respond.
- Local CNAME file and source structure match the observed GitHub Pages setup.

## WARN Items

- **Link / surface mismatch:** Static site nav, SellThis buttons, and subpage links (e.g. in Source index.html) hardcode https://oc2coos-2.polsia.app/store and /arcade (and similar in reports). These paths currently return backend 404 JSON ("Cannot GET"), not HTML storefronts/arcades. Static /store/ etc. on oc2co.com are only placeholder skeletons. Docs (e.g. Polsia linking report) describe polsia as serving "live Store, Arcade, Checkout" — current probes show disconnect.
- Referenced but unprovisioned subdomains: memtool.oc2co.com (used in payment hub examples for return_to URLs), sellthis.oc2co.com, agents.oc2co.com etc. appear in sidepanel notes, plans, and reports but have zero DNS records (NXDOMAIN). Risk of broken references.
- oc2co.github.io direct 404 (standard but noted for completeness).
- Polsia.app apex does not resolve (only the oc2coos-2 instance).
- Historical plans (Polsia Namecheap hardwire) assume Namecheap cPanel/subdomains for sellthis/cmd etc.; reality has migrated to Cloudflare + GitHub Pages (no evidence of active Namecheap hosting for web).
- Some paths in static have "pending"/"coming soon"/"parked" labels; functional wiring to backend incomplete per live checks.
- Relative vs absolute links and subdir structure in Source/Subdomains create dev/prod differences (not DNS but impacts surface consistency).
- No CAA records or advanced security DNS observed in baseline (optional but recommended for GitHub Pages).

## FAIL Items

- None blocking for the primary domain (oc2co.com / www.oc2co.com surfaces are live and DNS healthy).
- Functional wiring gap qualifies as FAIL for "live surfaces" expectation: polsia-linked paths do not deliver the referenced content (JSON errors instead of app HTML). This is a cross-surface inconsistency for the audit.
- Absence of DNS for planned/referenced subdomains (e.g. memtool.oc2co.com in docs) is a gap if those are intended live surfaces.
- No evidence of active subdomains beyond root + www (and the external polsia instance).

## Exact Evidence

**DNS queries (public resolver, 2026-06-27):**
- NS for oc2co.com: {"Status":0,"Answer":[{"data":"brenna.ns.cloudflare.com."},{"data":"paul.ns.cloudflare.com."}]}
- A for oc2co.com: {"Status":0,"Answer":[{"data":"185.199.108.153"},{"data":"185.199.111.153"},{"data":"185.199.109.153"},{"data":"185.199.110.153"}]}
- CNAME for www.oc2co.com: {"Status":0,"Answer":[{"data":"oc2co.github.io."}] } (further resolves to GitHub A records)
- MX for oc2co.com: {"Status":0,"Answer":[{"data":"10 mx2.privateemail.com."},{"data":"10 mx1.privateemail.com."}]}
- A for store.oc2co.com (example of all tested subs): {"Status":3,"Authority":[SOA for oc2co.com]} (NXDOMAIN)
- Identical NXDOMAIN (Status:3) for checkout., arcade., community., memtool., sellthis., agents., studio., api-studio.oc2co.com

**Live HTTP surfaces (browse/fetch results):**
- https://www.oc2co.com : "# Oc2cO — Build. Ship. Evolve." Full landing with MemTool/SellThis status, "Live on oc2co.com (GitHub Pages)", links including to store/ (relative in some contexts) and GitHub.
- https://oc2co.com : Serves equivalent content (redirect behavior observed/normalized).
- https://www.oc2co.com/store/ : "# Oc2cO Store — Request Access" ... "Public Store Skeleton" ... "Checkout status: checkout connection pending." ... "In development"
- https://www.oc2co.com/checkout/ : "# Oc2cO Checkout Bridge — Pending" ... "Not connected: no Stripe secret keys..."
- https://www.oc2co.com/arcade/ : "# Oc2cO Arcade — Prototype Hub" ... "Parked" ... "Future lane"
- https://www.oc2co.com/cinematic/ : "# Oc2cO • Cinematic" brand film, scroll sections, stats (42 active, 2 paying, 8 clips)
- https://www.oc2co.com/iris_oracle/ : "# Iris Oracle — The All-Seeing Eye" ... modes (Iris Free, Palm Free, ..., Voice V2), "Center your iris in the circle"
- https://oc2coos-2.polsia.app : "No content found"
- https://oc2coos-2.polsia.app/store : {"success":false,"message":"Cannot GET /store"}
- https://oc2coos-2.polsia.app/arcade : {"success":false,"message":"Cannot GET /arcade"}
- https://oc2co.github.io : 404 "There isn't a GitHub Pages site here."
- Subdomain HTTP: All "Failed to retrieve page content." or equivalent (consistent with NXDOMAIN).

**Local file proofs:**
- Source/oc2co_website/CNAME contains exactly: `www.oc2co.com`
- Source README: "Sub pages use external hosted links in index.html (e.g. https://oc2coos-2.polsia.app/arcade )"
- Index.html nav: `<a href="https://oc2coos-2.polsia.app/store" ...>Store</a>` `<a href="https://oc2coos-2.polsia.app/arcade" ...>Arcade</a>` + SellThis button to same.
- Pinboard: Explicit baseline records (A apex, CNAME www to oc2co.github.io, MX privateemail), "oc2co.com redirects to www.oc2co.com", "www.oc2co.com returns HTTP/1.1 200 OK Server: GitHub.com", nameservers, "DNS-only / gray cloud".
- Polsia plan and reports: Reference oc2coos-2.polsia.app as backend, future subdomains (sellthis.oc2co.com etc.), Namecheap vs current Cloudflare.
- Sidepanel.html: Notes "Future: studio.oc2co.com · agents.oc2co.com · botlab.oc2co.com"
- Reports (e.g. Polsia linking, payment hub): Assume polsia serves /store etc. and reference memtool.oc2co.com.

## Recommended Fixes

- **Resolve polsia surface mismatch:** Either (a) deploy/serve HTML-capable frontend at https://oc2coos-2.polsia.app/store , /arcade etc. (update backend routes or add static serving), or (b) update all hardcoded links in static Source/ (index.html, subpages, cinematic, etc.) and reports to point to current correct functional locations (or consolidate everything under oc2co.com subpaths). Re-test live clicks.
- **Provision or remove references to subdomains:** For any intended (e.g. store.oc2co.com, memtool.oc2co.com, sellthis.oc2co.com, agents.oc2co.com, studio.oc2co.com, botlab.oc2co.com): Add DNS in Cloudflare (CNAME to GitHub Pages, polsia, or new host; or A records). Update all cross-references in code/docs. If not planned, clean references to avoid dead links.
- **Unify routing story:** Decide delegation model (static shell on oc2co.com + functional on polsia vs full static vs dedicated subdomains). Update nav consistently. Consider Cloudflare Workers/Pages for routing/proxy if unifying (per prior notes).
- **Update docs and reports:** Sync pinboard, Polsia linking report, payment examples, sidepanel notes, and MASTER_PACKET with current observed state (GitHub Pages confirmed, polsia paths not serving HTML, subdomains absent).
- **Email / ancillary:** Verify privateemail MX + related CNAMEs/TXT still desired and configured correctly. Consider adding SPF/DMARC if not present.
- **Security/hygiene (DNS):** Review proxy status (keep DNS-only for GitHub Pages per historical). Add CAA records for GitHub if desired. Monitor TTLs.
- **Verification steps (future):** After any change, re-run DNS queries + live fetches. Test full user flow (home → store link → actual content).
- **Registrar hygiene:** Confirm Namecheap is registrar-only; no active hosting conflicting with Cloudflare/GitHub.

## Do Not Touch

- Any Cloudflare DNS records (A, CNAME, MX, NS, TXT, etc.) for oc2co.com or www without explicit separate approval and change control.
- GitHub Pages repo settings, CNAME file in source, or Pages custom domain configuration.
- Namecheap registrar account or advanced DNS (if still visible; Cloudflare is control plane).
- Live polsia instance or any backend code.
- Existing static content files unless part of separate approved wiring pass.
- Any subdomains or new records.
- Historical local files (preserve for audit trail).

## Open Questions

- What is the authoritative "live" implementation for Store / Arcade / Checkout functionality right now? (Polsia backend expected per docs/links, but probes return only JSON errors; static skeletons on oc2co.com are placeholders.)
- Which (if any) of the tested potential subdomains are actively planned for near-term activation (store.oc2co.com, memtool.oc2co.com, sellthis.oc2co.com, agents.oc2co.com, studio.oc2co.com, botlab.oc2co.com, etc.)? What targets should they point to?
- Exact current active routes/paths on oc2coos-2.polsia.app (is it primarily API for MemTool/Polsia, a full app at other paths, or provisioned instance with different structure)?
- Is polsia.com the main public Polsia site (separate from *.polsia.app instances)?
- Status of email via privateemail.com — actively used, or legacy?
- GitHub repo visibility (Oc2cO user/org) and exact repo name used for Pages (direct .github.io 404s normal but confirmation helpful).
- Any other parked/related domains from original Namecheap registration not yet audited?
- Intent for memtool.oc2co.com references in payment/integration docs if subdomain has no DNS?
- Timeline or priority for subdomain provisioning vs keeping paths under main domain or external polsia?

## Next Action

1. Share this report with other agents (e.g. route/link crawler AGENT_05, synthesis in 10BG) for cross-reference.
2. Owner confirmation on polsia vs static surface ownership and exact target URLs for Store/Arcade/Checkout.
3. If subdomains approved, draft specific Cloudflare DNS additions (with owner) + update all links/references.
4. Re-probe polsia paths and main site after any backend updates on polsia side.
5. Update local pinboard and key reports with 2026-06-27 live facts (DNS confirmed, surfaces observed).
6. Full end-to-end click test from live https://www.oc2co.com (nav Store/Arcade) and document results.
7. Proceed to next lens in wiring audit (no DNS changes until approved).

**Report generated read-only. All observations current as of tool executions (2026-06-27).**