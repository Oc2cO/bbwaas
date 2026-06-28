# GROK TOOLS, SKILLS, PLUGINS, MCPs & MARKETPLACE INVENTORY
**Date:** 2026-06-27
**Grok Version:** 0.2.67
**Audit Scope:** Full exploration of ~/.grok, installed-plugins, config, marketplace-cache, docs/user-guide, mcp servers, skills, connectors. Performed via terminal, list_dir, read_file, search_tool. 2 background explore agents spawned for deep catalog (skills/plugins) and MCP discovery/connect (github, linear, vercel, canva, cloudflare, firecrawl, airtable, auth0, adobe, neon, mongodb, appwrite, asana, etc.).

**Brain Save Path:** /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Agent_Systems/GROK_TOOLS_INVENTORY/
**Related:** BBWAAS/Website/oc2co/ for Oc2cO work; previous 10BG wiring audit.

## 1. Environment Overview
- **Config (~/.grok/config.toml):** 
  - UI: yolo=true, compact_mode=true, permission_mode="always-approve"
  - Marketplace: official_marketplace_auto_installed=true, source xAI Official git.
  - Plugins enabled: chrome-devtools-mcp, neon, vercel, cloudflare, superpowers, mongodb, firecrawl, ai-plugins, airtable, airwallex-agentos, amplitude, adobe-for-creativity, agent-sdk-dev, agentforce-adlc, appwrite, asana, astronomer-data, auth0, base44 (and more in full list).
  - mcp_servers.bbwaas: url=http://127.0.0.1:8787/mcp, enabled=true.
- **installed-plugins:** 20+ dirs (detailed below).
- **Skills:** 344+ SKILL.md files (core + per-plugin). User skills in ~/.grok/skills (limited), heavy in plugins/* /skills/.
- **Marketplace:** Cache at ~/.grok/marketplace-cache/ with official + external plugins (~300+ entries across caches). Docs/user-guide/09-plugins.md explains bundles of skills/commands/agents/hooks/MCP.
- **MCP:** Loaded from config + plugin .mcp.json. grok mcp CLI available (list, doctor, add, remove). Many remote require OAuth.
- **Docs:** ~/.grok/docs/user-guide/ has 22 files: 07-mcp-servers.md, 08-skills.md, 09-plugins.md, 16-subagents.md, 20-background-tasks.md, etc. Read for usage.
- **Other:** projects/*/mcps/ json configs from past; logs/mcp/ for errors; sessions, agents/universe-build.md.

**Connection Status (from grok mcp doctor + searches):**
- Config: 1 (bbwaas)
- Plugins add: cloudflare(5), vercel, neon, adobe, appwrite(2), airwallex(2), firecrawl, amplitude, mongodb, chrome-devtools, ai-plugins.
- grok.com: 5 (vercel, cloudflare-builds etc.)
- Active in session via search_tool: appwrite-docs (search, TOC, pages, features/examples), cloudflare-docs (search docs, migrate guide), grok_com_vercel (limited: web_fetch, domain check, access link, deploy), grok_com_canva (brand kits, templates), grok_com_github (vuln check, secret scan, semantic issues), grok_com_linear (statuses, labels, issues).
- Failures: Most remote "OAuth authorization required" or transport/handshake (bbwaas local server issue). bbwaas: server starts but handshake fail (send error).
- To enable: Use Grok TUI settings/connectors for OAuth (grok.com ones). Run `grok mcp doctor`, `grok mcp list`. For local bbwaas, start server (see BBWAAS/MCP_SERVER). Add via `grok mcp add --transport http ... --header "Auth:..."`. Plugins auto if enabled in config.

## 2. Detailed Plugin & Skills Catalog (from ls/find)
**installed-plugins (20 dirs, ~344 skills total):**
- adobe-for-creativity-034764d2: Batch photos, edit quick-cut video, design-from-template, resize, retouch-portraits, create-pdfs-from-data, create-social-variations. (Useful: visuals for Oc2cO Canva_Exports/Images, batch assets.)
- agent-sdk-dev-4481a438: Agent SDK verifier, new-sdk-app cmd.
- agent-skills-5ac679f8: mongodb-*: natural-language-querying, connection, query-optimizer, schema-design, mcp-setup, search-and-ai, atlas-stream-processing. (DB for BBWAAS.)
- agentforce-adlc-7a2e0899: developing/observing/securing/testing-agentforce (92 skills, agents, tools). (AI agents.)
- agents-f71b233b (astronomer-data): Airflow/DAG authoring, cosmos-dbt, testing, debugging, lineage, deploying. (Workflows/agents.)
- ai-plugins-aa94d9e6: endor-setup.
- airtable-0e63a5a8: marketing-ops, product-ops, sales-ops, filters, cli, overview, show-link, agent-activity-log, beneficiary? (Ops, inventory, reports for brain/work packets.)
- airwallex-agentos-f1c715f5: beneficiary-creation, awx-best-practices, manage-cashflow, contract-to-billing, card-provisioning. (Finance.)
- amplitude-0339e6c9: discover-analytics, monitor-ai-quality, review-insights, daily-brief, monitor-reliability, diff-intake, what-would-lenny, replay-ux, create-chart, analyze-feedback, investigate-ai, debug-replay, instrument-events, taxonomy, create-dashboard, weekly-brief, diagnose-errors, discover-opportunities, analyze-experiment, compare-journeys, add-analytics, analyze-dashboard, analyze-account, analyze-chart, discover-event-surfaces, analyze-ai-topics. (Analytics, events, replays, experiments, AI topics for Oc2cO.)
- asana-cc86e9aa: (Project mgmt.)
- auth0-58bbe375: 287 files, plugins for nextjs, react, express, flutter, laravel, vue, etc, mfa, branding, acul, migration, many SDKs. (Auth for apps.)
- chrome-devtools-mcp-2df60288: chrome-devtools-cli, troubleshooting, debug-optimize-lcp, memory-leak, a11y, chrome-devtools, web-perf. (Browser testing for website, perf, a11y.)
- claude-plugin-51d3aecd: claude skills.
- firecrawl-grok-plugin-ba077673: firecrawl-cli, parse, map, search, monitor, crawl, download, scrape, agent, interact, skill-gen. (Research, scrape docs/research for packets.)
- neon-6a827c6a: neon-postgres, neon, postgres-branches. (DB.)
- skills-39968d19: cloudflare (full: workers, durable, pages, r2, ai, etc 358 skills), vercel? (Infra.)
- skills-85e77c23: base44 (base44 skills, cli, sdk).
- superpowers-21e2a56d: 46 skills: systematic-debug, git-worktrees, tdd, writing-skills, writing-plans, executing-plans, subagent-driven, using-superpowers, verification-before, receiving-review, dispatching-parallel, requesting-review, brainstorming, finishing-branch, deployments-cicd, vercel-*, next-*, auth, shadcn, etc. (Dev superpowers: plan, implement, review, parallel agents.)
- vercel-plugin-8723ecfa: 453 files: ai-gateway, auth, bootstrap, chat-sdk, deployments-cicd, env-vars, knowledge-update, marketplace, next-*, react-best, routing, runtime-cache, shadcn, turbopack, vercel-agent, vercel-cli, vercel-firewall, vercel-functions, vercel-sandbox, vercel-storage, verification, workflow, verification. (Full Vercel: deploy, env, firewall, agent, sdk, etc.)
- registry.json, others.

**Core ~/.grok/skills:** check-work, code-review, create-skill, docx, help, imagine, pptx, supergrok-unlocked, xlsx (plus bundled in .grok/bundled/skills: design, execute-plan, implement, pr-babysit, remove-wall, review).

**Bundled:** explore, general, plan agents; design-doc, implementer, reviewer, researcher personas/roles.

**Total hidden tools from searches:** 235+ (many in grok_com_*, plugins).

## 3. MCP Servers & Connectors (from search_tool, doctor, config, mcp list)
**Discovered/Active:**
- appwrite-docs: listFeatures, getFeatureExamples, search, TOC, getDocsPage (SDK examples for many langs).
- cloudflare-docs: search_cloudflare_documentation, migrate_pages_to_workers_guide.
- grok_com_vercel: web_fetch_vercel_url, check_domain_availability_and_price, get_access_to_vercel_url, deploy_to_vercel.
- grok_com_canva: list-brand-kits, search-brand-templates (and more for design gen).
- grok_com_github: check_dependency_vulnerabilities, run_secret_scanning, semantic_issues_search (and more for code).
- grok_com_linear: list_issue_statuses, list_project_labels, list_issue_labels (issues, projects).
- bbwaas: local (config), currently handshake fail.
- Plugin-loaded (via doctor): vercel, cloudflare-builds (OAuth req), neon, mongodb, firecrawl, amplitude, adobe, appwrite(2), airwallex(2), chrome-devtools, ai-plugins. 5 from grok.com.

**Schemas note:** Many require params like owner/repo, query, url. Auth via OAuth for remote.

**Connect Status & How:**
- Use `grok mcp list`, `grok mcp doctor` (shows OAuth fails for most remote).
- To connect: In Grok TUI (settings > connectors/marketplace), authorize OAuth for vercel, cloudflare, github, linear, canva, etc. Or `grok mcp add --transport http ... --header "Authorization: Bearer..."`.
- For bbwaas: Start local server (python or node on 8787/mcp, from BBWAAS code in previous). Handshake fail now.
- Plugins auto-load MCPs if enabled.
- Useful: github (Oc2cO repo audit/PRs/vulns), linear (work packets/issues), vercel (deploy www.oc2co), canva/adobe (assets), cloudflare (dns/subdomains, workers), firecrawl (research), airtable (brain inventory/ops), auth0 (future apps), chrome (test site), superpowers (parallel bg agents as used here).

**grok mcp CLI examples (from doc):** add, remove, doctor, list. Supports project-scope.

## 4. Marketplace & Other
- Cache has external_plugins, plugins (many from xAI official + community?).
- Auto install official.
- To download/enable more: `grok marketplace` (if subcmd) or TUI. Plugins listed in config enabled.

## 5. Useful for Our Stack (BBWAAS/Oc2cO/BrainHub)
- **Coding/Audit/Deploy:** github mcp + superpowers (implement/review/plan/parallel) + vercel/cloudflare skills + chrome-devtools (test) + firecrawl (docs).
- **Design/Visuals:** adobe + canva mcp (brand, templates, batch) -- direct match to Images/Canva_Exports.
- **Analytics/Ops/Inventory:** amplitude + airtable (reports, workflows, activity log) -- save to brain.
- **Auth/DB/Backend:** auth0 (SDKs), neon/mongodb/appwrite (skills/docs).
- **Agents/Workflows:** agentforce, agents-f71b (airflow), superpowers, bg-parallel-agents skill.
- **Project:** linear, asana.
- **All:** 235+ tools across; enable via TUI for full.

**Gaps:** bbwaas local not healthy; many OAuth pending (authorize in UI); no direct "airtable mcp" in search (use plugin skills?); start local servers.

## 6. Work Performed & Advice
- Explored via terminal/list/read (config, plugins ~20, skills 344, docs, mcp).
- search_tool for discovery (appwrite, cloudflare, vercel, canva, github, linear; others hidden 235).
- grok mcp list/doctor (status, OAuth issues, plugin MCPs).
- Prepared brain dir in BBWAAS/Agent_Systems/GROK_TOOLS_INVENTORY.
- Spawned 2 bg explore agents (ids: 019f0b17-e620... for skills/plugins catalog; 019f0b17-fcfb... for MCPs). They are running (used list/grep/read/search), will write enhanced reports.
- Saved this inventory MD.
- **Advice:** 
  - Authorize connectors in Grok UI for full grok_com_* and plugin remotes (vercel, cloudflare, github, canva, auth0 etc).
  - Start bbwaas MCP server locally for handshake.
  - Use `grok mcp doctor` regularly.
  - For work: leverage vercel/cloudflare for deploy, adobe/canva for visuals, github/linear for Oc2cO, amplitude/airtable for tracking, chrome for testing site, superpowers + bg agents for future packets (as in 10BG).
  - All saved in brain; update INVENTORY.md.
  - Next: when specs come, use these + bg agents.
- Agents output will be fetched/merged; this is base + proof from tools.

**Files Written:** This report + brain dir prepped. Agents will add SKILLS_PLUGINS and MCPS reports.

**Next Work:** Poll agents (get_command_or_subagent_output), merge, re-save full, advise user.

All work proof-backed, no changes to source except reports. Saved to brain as requested.

## TASK2 UPDATE (2026-06-27): BBWAAS MCP Server Started
- **Action:** Completed start of local bbwaas MCP server (TASK2).
- **Location:** /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/bbwaas_mcp/server.js
- **Status:** RUNNING SUCCESSFULLY on http://127.0.0.1:8787 (and 0.0.0.0:8787)
- **Verified:** /healthz returns ok, /readyz ready, /mcp lists 13 tools (gate_in, lane_status, create_packet, packets_open, claim_packet, agent_note, checker_report, close_packet, proof_index, sync_status, git_status, push_public, pull_public), JSON-RPC tools/list works.
- **Process:** Detached with nohup to /tmp/bbwaas_mcp.log (current PID around 7946 at start).
- **Resolution:** Fixed prior handshake fail / start issues noted in inventory (used nohup+disown instead of short background task).
- **Report:** Full details in TASK2_START_BBWAAS_MCP_REPORT.md (steps, all terminal commands, debug, verification).
- **Config match:** Matches mcp_servers.bbwaas in ~/.grok/config.toml. Ready for use in MCP calls / agents.
- **Note:** All via run_terminal_command only. Saved to brain.

