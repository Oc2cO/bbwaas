# GROK TOOLS CHEAT SHEET: MOST USED SKILLS / PLUGINS / MCPs
**Date:** 2026-06-27  
**Source:** Based on key parts of the 3 inventories in this dir:  
- GROK_TOOLS_SKILLS_MCPS_INVENTORY_2026-06-27.md  
- INVENTORY_SKILLS_PLUGINS.md  
- INVENTORY_MCPS_CONNECTORS.md  

**Scope:** Top ~13 most useful for **Oc2cO website** (deploy/design/HTML/JS/assets/testing), **BBWAAS agents** (MCP/sidecar/workflows/packets), **deploy**, **design/visuals**, **audit/security**, **research**, **ops/PM**, etc. Concise reference.  

**MCP Protocol (critical):** For all grok_com_* and connected MCPs (e.g. github, linear, canva, chrome):  
1. Call `search_tool(query="grok_com_github" or specific tool name)` first to get exact input schema.  
2. Then `use_tool(name="grok_com_xxx__tool_name", tool_input={...})` with schema params. NEVER guess.  
See inventories for full lists (github 91 tools, etc.). Use `grok mcp list/doctor`.

**Core / Bundled Skills (always available):** /imagine, /code-review, /create-skill, /help, /docx, /pptx, /xlsx, /implement, /execute-plan, /review (from ~/.grok/skills + bundled).

---

## Top Most-Used Cheat List

### 1. bg-parallel-agents (Local Skill)
- **Desc:** Parallel same-task multi-agent (spawn N bg subagents for reliability, less hallucination, concrete work). Main orchestrates + applies via tools/MCPs + saves to BrainHub.
- **Invoke:** `/bg agents = N <full task>` (user signal)
- **Example:** `/bg agents = 3 Audit oc2co website homepage JS for issues and generate patches using chrome-devtools + github MCP`
- **Use case:** Complex research, patching, website builds, audits (as used in 10BG/WP).

### 2. superpowers (Plugin: 14+ skills)
- **Desc:** Strict methodology: subagent-driven-dev, writing/executing plans, TDD, systematic-debug, verification, dispatching-parallel-agents, git-worktrees, code-review. MUST invoke before responses per rules.
- **Invoke:** `/using-superpowers` or specific e.g. `/subagent-driven-development`, `/writing-plans`, `/dispatching-parallel-agents` (or auto via signals)
- **Example:** Invoke for any hard task: plan -> parallel agents -> TDD -> verify -> apply.
- **Use case:** BBWAAS agent systems, all complex work (see bg-parallel alignment).

### 3. vercel-plugin + grok_com_vercel (Plugin + MCP)
- **Desc:** Deployments/CI-CD, Next.js/app-router, shadcn, env-vars, functions, storage, sandbox, verification, ai-sdk, bootstrap, marketplace. Full stack for static/JS sites.
- **Invoke:** `/vercel-plugin:deploy`, `/vercel-cli:*` or MCP via search_tool("grok_com_vercel") + use_tool (e.g. deploy_to_vercel)
- **Example:** Deploy / update oc2co website; check domains; bootstrap new preview.
- **Use case:** Oc2cO website deploy + hosting (primary match to Source/oc2co_website + CNAME).

### 4. grok_com_github (MCP, 91 tools)
- **Desc:** Full GitHub: repos, branches, PRs, issues, search_code/commits/issues/pulls, secret scanning, vuln checks, actions, files (get/push/create/update), collaborators.
- **Invoke:** `search_tool("grok_com_github")` then `use_tool("grok_com_github__<tool>", {owner, repo, ...})`
- **Example:** `search_issues`, `run_secret_scanning` + `check_dependency_vulnerabilities` on Oc2cO repo, `create_pull_request`, `push_files`.
- **Use case:** Oc2cO repo audit/PRs/vulns, code changes, BBWAAS code.

### 5. grok_com_linear (MCP, 38 tools)
- **Desc:** Issues, projects, milestones, cycles, labels, comments, docs, status updates. (Pass strings with real newlines, no \n escapes.)
- **Invoke:** `search_tool("grok_com_linear")` then use_tool e.g. `grok_com_linear__save_issue`, `grok_com_linear__list_issues`
- **Example:** Create/save work packet as issue, track milestones for BBWAAS WP.
- **Use case:** Project/PM tracking for packets, reports, agent work.

### 6. grok_com_canva (MCP, 32 tools)
- **Desc:** Design gen/export, brand-kits, templates, folders, editing txns, thumbnails, search, upload, comments. Brand-consistent visuals.
- **Invoke:** `search_tool("grok_com_canva")` then use e.g. `create-design-from-brand-template`, `export-design`, `list-brand-kits`
- **Example:** Generate new Oc2cO hero/card from brand template + export assets.
- **Use case:** Visuals for Website/oc2co/Images/, Canva_Exports/, SellThis/MemTool assets.

### 7. chrome-devtools (MCP 29 tools + Plugin skills)
- **Desc:** Browser automation: navigate, click, fill, screenshot, lighthouse_audit, perf traces, console/network, emulate, a11y, memory, wait.
- **Invoke:** MCP `search_tool("chrome-devtools")` + use_tool("chrome-devtools__take_screenshot", "chrome-devtools__lighthouse_audit", etc.); or `/chrome-devtools*` skills.
- **Example:** Navigate to live oc2co site, screenshot, run perf/a11y audit, interact to test store/checkout.
- **Use case:** Website testing, visual proof, audits, research (Oc2cO + BBWAAS frontdoor).

### 8. adobe-for-creativity (Plugin, 118 skills)
- **Desc:** Creative batch/edit (photos/video), design-from-template, resize/retouch, PDFs, social variations; AEM content-ops (seo, blocks, audit), app-builder, analytics.
- **Invoke:** `/adobe-for-creativity:*` or specific e.g. `/design-from-template`, `/batch-edit`
- **Example:** Batch process/resize Oc2cO heroes/buttons/cards; generate social variants or content models.
- **Use case:** Design/visual assets (oc2co/Images + Canva), creative for website.

### 9. firecrawl (Plugin 10+ skills + MCP)
- **Desc:** Scrape/crawl/map/search/parse web to markdown (JS-render, anti-bot). Agent/interact flows.
- **Invoke:** `/firecrawl-scrape`, `/firecrawl-crawl` etc. or MCP via search.
- **Example:** Scrape docs/competitors/research for packets or site content.
- **Use case:** Research (10BG reports, crypto sources, packets), content gathering.

### 10. airtable (Plugin, 8+ skills + .mcp)
- **Desc:** Ops/inventory: overview, filters, cli, marketing/product/sales-ops, agent-activity-log, links.
- **Invoke:** `/airtable-overview`, `/airtable-cli`, `/airtable-agent-activity-log`
- **Example:** Log BG agent activity, maintain brain inventory of assets/packets.
- **Use case:** BBWAAS ops, structured data for BrainHub/AGENT_WORKSPACE, reports.

### 11. cloudflare (Plugin skills + cloudflare-docs MCP)
- **Desc:** Workers, durable-objects, wrangler, pages, r2, web-perf, email, agents-sdk; docs search + migrate guide.
- **Invoke:** `/cloudflare:build-mcp`, `/cloudflare:wrangler` etc.; `search_tool("cloudflare-docs")`
- **Example:** DNS for oc2co subdomains (arcade/store), Workers/Pages deploy, perf.
- **Use case:** Alt hosting/CDN/tunnels for Oc2cO + custom MCPs (bbwaas).

### 12. imagine (Core Skill)
- **Desc:** Text-to-image visual generation.
- **Invoke:** `/imagine <detailed prompt>`
- **Example:** `/imagine Bioluminescent cosmic ocean hero background for Oc2cO homepage, cinematic`
- **Use case:** Quick visuals for oc2co (Heroes/Backgrounds etc.), prototypes.

### 13. grok_com_notion (MCP, 18 tools)
- **Desc:** Pages, databases, views, search, comments, teams, move/duplicate.
- **Invoke:** `search_tool("grok_com_notion")` + use_tool e.g. `notion-create-pages`, `notion-query-database-view`
- **Example:** Create docs pages or query meeting notes for project knowledge.
- **Use case:** Docs/knowledge base alongside Linear/Github for BBWAAS/Oc2cO.

### Bonus: bbwaas (Custom MCP, config-enabled)
- **Desc:** Agent coordination: packets (open/claim/close), notes, reports, git sync to static-proof, dispatch, lane status.
- **Invoke:** Config in ~/.grok/config.toml (http://127.0.0.1:8787/mcp); start server from bbwaas_mcp_server/; use via tools (local calls).
- **Example:** packet creation, gate_in, sync_status for BrainHub.
- **Use case:** Core BBWAAS MCP/sidecar integration (fix handshake as needed).

### Extension Tools
- **create-skill / plugin-dev / mcp-server-dev / skill-creator (Core + Marketplace):** `/create-skill`; marketplace plugins for building custom.
- **amplitude:** Analytics, events, briefs, UX replays (instrument site).
- **auth0:** Auth SDKs for future apps.

---

**Quick Commands (CLI/TUI):**
- Inspect: `grok inspect`, `/skills`, `/plugins`, `/mcp`, `grok mcp doctor/list`
- Install: `grok plugin install vercel/vercel-plugin --trust`
- Docs: ~/.grok/docs/user-guide/ (08-skills.md, 09-plugins.md, 07-mcp-servers.md)

**Next Steps:** Authorize OAuth in grok.com/connectors for full grok_com_* (github/linear/canva/vercel priority). Start bbwaas server. Use in bg-parallel + superpowers for high-quality work. All saves to BBWAAS/ + AGENT_WORKSPACE.

See full inventories for exhaustive lists, counts, schemas, paths, and gaps. Update this cheat as tools evolve.