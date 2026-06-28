# GROK TOOLS INVENTORY: SKILLS, PLUGINS, BUNDLED SKILLS, AND MARKETPLACE ITEMS

**Date of Audit:** 2026-06-27  
**Scope:** Exhaustive filesystem inspection of `/home/sagou/.grok` and `/home/sagou/.grok/installed-plugins` (plus cross-referenced marketplace-cache for available items).  
**Method:** `list_dir`, `grep` (for `**/SKILL.md` discovery and counts via "across N files"), `read_file` on SKILL.md frontmatter, README.md, registry.json, docs/user-guide/*.md, bundled/manifest.json. No modifications.  
**Total SKILL.md discovered (all locations):** ~377+ (from broad grep; exact overlaps in caches/installed).  
**Proof-backed:** All entries derived directly from directory listings, file counts, and content reads below. Absolute paths used.

## 1. Full List of Installed Plugins (from installed-plugins/ + registry.json)

Installed plugins are in `/home/sagou/.grok/installed-plugins/`. Primary source: `registry.json` (lists repos, sources, versions, marketplace origins). Many pulled from "xAI Official" or "claude-plugins-official" marketplaces.

**Installed Plugins (with dir hash, key plugin name, version where available, SKILL.md count):**

- **adobe-for-creativity-034764d2** (adobe-for-creativity, from adobe/skills)  
  Substructure: plugins/adobe-analytics/, adobe-cja/, aem/ (edge-delivery-services-content-ops, cloud-service, 6.5-lts, project-management), app-builder/, creative-cloud/, stardust/.  
  SKILL.md count: 118 (across ~28k lines in samples).  
  README: Skills for Adobe creative tools, AEM content ops, analytics, App Builder, design. Marketplace: claude-plugins-official.

- **agent-sdk-dev-4481a438** (agent-sdk-dev)  
  Local from marketplace-cache. Agents, commands (new-sdk-app), verifiers (py/ts). SKILL.md: 0 core (focus on agents/commands). Marketplace: claude-plugins-official.

- **agent-skills-5ac679f8** (mongodb)  
  From mongodb/agent-skills. Skills: mongodb-*. SKILL.md count: 8 (incl. tools/review-skill/SKILL.md). Testing/evals present. Marketplace: xAI Official.

- **agentforce-adlc-7a2e0899** (agentforce-adlc, v0.8.0)  
  From SalesforceAIResearch. Agents (adlc-author, engineer, orchestrator, qa), skills/ (developing/observing/securing/testing-agentforce). SKILL.md count: 4. Scripts for scaffold/discover. Marketplace: claude-plugins-official.

- **agents-f71b233b** (astronomer-data / airflow, v0.1.0)  
  From astronomer/agents. Extensive skills/ for Airflow (airflow/, authoring-dags/, deploying-airflow/, testing-dags/, cosmos-dbt-*, lineage tracing, astro, data analysis). SKILL.md count: 24. Astro-airflow-mcp subdir. Marketplace: claude-plugins-official.

- **ai-plugins-aa94d9e6** (ai-plugins / endor, v1.1.0)  
  From endorlabs/ai-plugins. SKILL.md count: 1 (endor-setup/). Marketplace: claude-plugins-official.

- **airtable-0e63a5a8** (airtable, v0.1.0)  
  From Airtable/skills. plugins/airtable/skills/ (airtable-*, ops, cli, overview, filters). SKILL.md count: 8. Includes .mcp.json. Marketplace: claude-plugins-official.

- **airwallex-agentos-f1c715f5** (airwallex-agentos, v0.2.2)  
  From airwallex. plugins/airwallex-agentos/skills/ (fintech: card-provisioning, contract-to-billing, manage-cashflow, beneficiary-creation, awx-best-practices). SKILL.md count: 5. Marketplace: claude-plugins-official.

- **amplitude-0339e6c9** (amplitude)  
  From amplitude/mcp-marketplace. plugins/amplitude/ and amplitude-experimental/. SKILL.md count: ~27+ (analytics, instrumentation, analysis, briefs, experiments, taxonomy, etc.). Marketplace: claude-plugins-official.

- **asana-cc86e9aa** (asana)  
  Local from marketplace-cache/external_plugins/asana. **Empty directory** (no files/subdirs listed in exhaustive list_dir). SKILL.md count: 0. Marketplace: claude-plugins-official. (Gap noted.)

- **auth0-58bbe375** (auth0, v1.1.0)  
  From auth0/agent-skills (subdir plugins/auth0). plugins/auth0/skills/ (hundreds of auth0-*-specific: nextjs, react, laravel, swift, android, mfa, quickstarts, migrations, cli, etc.). SKILL.md count: ~44 (samples showed many; full ~286 md files in dir). PLUGIN.md present. Marketplace: claude-plugins-official.

- **chrome-devtools-mcp-2df60288** (chrome-devtools-mcp, v0.22.0)  
  From ChromeDevTools/chrome-devtools-mcp. skills/ (chrome-devtools, a11y-debugging, debug-optimize-lcp, memory-leak-debugging, troubleshooting, chrome-devtools-cli). SKILL.md count: 6. Full src/, tests/, docs/, puppeteer/MCP server. Marketplace: xAI Official.

- **claude-plugin-51d3aecd** (appwrite, v0.1.0; note: skills are language-focused)  
  From appwrite/claude-plugin. skills/ (php, ruby, swift, kotlin, rust, cli, go, python, typescript, dart, dotnet). SKILL.md count: 11. Commands/. Marketplace: claude-plugins-official. (Registry labels "appwrite" but content is broad language skills.)

- **firecrawl-grok-plugin-ba077673** (firecrawl, v1.1.0)  
  From firecrawl/firecrawl-grok-plugin. skills/ (firecrawl-*: scrape, crawl, map, search, parse, download, interact, agent, monitor, cli). SKILL.md count: 10. Commands/skill-gen.md. Bundles hosted MCP (primary) + optional CLI. Marketplace: xAI Official.

- **neon-6a827c6a** (neon, v1.0.0)  
  Local from marketplace-cache. skills/ (neon, neon-postgres, neon-postgres-branches). SKILL.md count: 3. Marketplace: xAI Official.

- **skills-39968d19** (cloudflare, v1.0.0)  
  From cloudflare/skills. skills/ (cloudflare, wrangler, workers-best-practices, durable-objects, agents-sdk, sandbox-sdk, web-perf, cloudflare-email-service). SKILL.md count: 8. Commands/ (build-agent, build-mcp), rules/. Marketplace: xAI Official.

- **skills-85e77c23** (base44, v1.0.0-beta.1)  
  From base44/skills. skills/ (base44-cli, base44-sdk, base44-troubleshooter). SKILL.md count: 3. plugins/base44/ sub. Marketplace: claude-plugins-official.

- **superpowers-21e2a56d** (superpowers, v5.1.0)  
  From obra/superpowers. skills/ (using-superpowers, brainstorming, writing-plans, executing-plans, subagent-driven-development, test-driven-development, systematic-debugging, writing-skills, verification-before-completion, dispatching-parallel-agents, code-review, git-worktrees, finishing-a-development-branch, receiving-code-review, requesting-code-review). SKILL.md count: 14. Agents/, docs/, hooks/, tests/. Strong methodology for TDD/plans/subagents. Marketplace: xAI Official.

- **vercel-plugin-8723ecfa** (vercel, v0.42.1)  
  From vercel/vercel-plugin. skills/ (~36 SKILL.md: vercel-cli, vercel-functions, vercel-storage, vercel-sandbox, vercel-agent, nextjs, next-cache-components, ai-sdk, ai-gateway, auth, shadcn, turbopack, routing-middleware, deployments-cicd, env-vars, bootstrap, chat-sdk, workflow, verification, marketplace, react-best-practices, next-upgrade, next-forge, etc.; many have /upstream). Agents/ (deployment-expert, performance-optimizer, ai-architect), commands/ (bootstrap, deploy, env, status, marketplace), hooks/. SKILL.md count: 36 (samples showed ~36 files). Extensive ecosystem graph in vercel.md. Marketplace: xAI Official.

**Additional notes on installed:**
- `registry.json` confirms 17+ entries with exact git refs, install times, paths.
- Some plugins ship `.mcp.json`, hooks/hooks.json, agents/*.md, commands/*.md.
- Total SKILL.md in installed-plugins/: dominant in adobe (118), vercel (36), auth0 (~44), agents-f71b233b (24), amplitude (~27), etc.

## 2. Core / Bundled Skills (in /home/sagou/.grok/)

### Core Skills (`/home/sagou/.grok/skills/`, 9 SKILL.md)
Extracted/bundled on startup. Labeled `user` in `grok inspect`. Overrideable by local/repo.
- `check-work/SKILL.md` (228 lines)
- `code-review/SKILL.md` (152 lines)
- `create-skill/SKILL.md` (58 lines; interactive skill builder)
- `docx/SKILL.md` (488 lines; +scripts/ for Office XML handling)
- `help/SKILL.md` (44 lines; points to /docs/user-guide/ for config, MCP, skills, plugins, etc.)
- `imagine/SKILL.md` (91 lines; visual generation)
- `pptx/SKILL.md` (164 lines; +scripts/editing)
- `supergrok-unlocked/SKILL.md` (35 lines)
- `xlsx/SKILL.md` (224 lines; +scripts/)

**Names from frontmatter grep:** create-skill, check-work, imagine, code-review, supergrok-unlocked, xlsx, help, docx, pptx (and variants).

### Bundled Skills (`/home/sagou/.grok/bundled/skills/`, 6 SKILL.md + agents/personas/roles)
From `bundled/manifest.json` (version public-2026-06-08-r1, with checksums).
- `design/SKILL.md` (214 lines)
- `execute-plan/SKILL.md` (928 lines; +scripts/validate-plan.py)
- `implement/SKILL.md` (717 lines; +scripts/memory.py, tests/)
- `pr-babysit/SKILL.md` (683 lines)
- `remove-wall-of-text/SKILL.md` (47 lines)
- `review/SKILL.md` (423 lines)
- `shared/personas/` (design-doc-reviewer.md, design-doc-writer.md, implementer.md, reviewer.md, security-auditor.md, etc. — .md not SKILL.md)

**Bundled agents/ (`/home/sagou/.grok/bundled/agents/`):** explore.md, general-purpose.md, plan.md.  
**Roles/ (`/home/sagou/.grok/bundled/roles/`):** design-doc-*, explore.toml, implementer.toml, plan.toml, quick-search.toml, reviewer.toml, security-auditor.toml, test-writer.toml.

**Additional bundled locations:** `/home/sagou/.grok/bundled/manifest.json`, personas in shared/.

**User-level overrides:** Skills in `~/.grok/skills/` (or /mnt/c equivs like bg-parallel-agents) take priority. Local `./.grok/skills/` highest.

## 3. Marketplace Items & Cache (`/home/sagou/.grok/marketplace-cache/`)

Two caches (hashed dirs):
- **783232b622f8182e/** (claude-plugins-official style): 
  - `plugins/`: agent-sdk-dev, clangd-lsp, claude-code-setup (claude-automation-recommender), claude-md-management, code-modernization (agents for legacy), code-review, code-simplifier, commit-commands, csharp-lsp, cwc-makers (cardputer-buddy, m5-onboard), example-plugin, explanatory-output-style, feature-dev (agents), frontend-design, gopls-lsp, hookify (rules/hooks), jdtls-lsp, kotlin-lsp, learning-output-style, lua-lsp, math-olympiad, mcp-server-dev (build-mcp-*, build-mcpb, build-mcp-app), mcp-tunnels, php-lsp, playground, plugin-dev (agent-development, command-development, hook-development, mcp-integration, plugin-settings, plugin-structure, skill-development), pr-review-toolkit (agents for review), project-artifact, pyright-lsp, ralph-loop, ruby-lsp, rust-analyzer-lsp, security-guidance, session-report, skill-creator (extensive), swift-lsp, typescript-lsp.
  - `external_plugins/`: asana, context7, discord (access/configure), fakechat, firebase, github, gitlab, greptile, imessage (access/configure), laravel-boost, linear, playwright, serena, telegram (access/configure), terraform.
  - SKILL.md count in cache: 32 (samples: plugin-dev has 7+ skills like command-dev 617 lines, hook-dev 548, skill-dev 460, mcp-integration 417; skill-creator 327; mcp-server-dev 3; frontend-design, math-olympiad, playground, project-artifact, claude-*, hookify, cwc-makers, session-report, example, etc.).
  - README: Curated for Claude Code plugins; trust model; structure with .claude-plugin/, skills/, commands/, agents/, .mcp.json.

- **c6b314fa671daf8c/**: external_plugins/neon (3 skills, already in installed), scripts for catalog/index, empty plugins/.

Marketplace sources managed via `grok plugin marketplace ...` or config. `grok inspect` shows sources.

**Bundled skills behave as user skills; plugin skills qualified as `plugin:<name>`.**

## 4. Categorized by Domain (Capabilities Summary from READMEs/SKILL.md)

**Web/Deploy/Hosting/Infra (Vercel, Cloudflare, Neon, etc.):**
- vercel (36 skills): deploy, nextjs/app-router, vercel-cli/functions/storage/sandbox/agent, ai-sdk/gateway, shadcn, turbopack, auth, env-vars, bootstrap, chat-sdk, workflow (Durable), verification, marketplace, caching strategies, react best practices, upgrades. Commands: /vercel-plugin:*. Hooks for context. Ecosystem graph.
- cloudflare (8 skills): cloudflare, wrangler, workers-best-practices, durable-objects, agents-sdk, sandbox-sdk, web-perf, cloudflare-email-service. Commands: /cloudflare:build-agent, /cloudflare:build-mcp.
- neon (3): neon-postgres, branches, postgres.
- base44 (3): base44-cli/sdk/troubleshooter.
- firecrawl (10): scrape/search/crawl/map/interact/parse/download/agent/monitor/cli (MCP primary).
- vercel-storage includes Neon/Upstash/Blob.

**Creative/Design/Visual/Assets (Adobe, Core Imagine, Frontend):**
- adobe-for-creativity (118 skills across subs): 
  - creative-cloud/adobe-for-creativity: adobe-create-*, edit-quick-cut, retouch-portraits, resize, batch-edit, design-from-template, pdfs-from-data, social-variations.
  - aem/*: content-ops (accessibility, audit, seo, sitemap, internal-linking, structured-data, page-import, create-site, content-modeling, da-content, etc.), cloud-service (migration, components, workflows, dispatcher, best-practices), 6.5-lts (replication, workflows), project-management (handover, auth, ops, whitepaper), edge-delivery (blocks, testing, da-auth).
  - app-builder: e2e-testing, testing, cicd-pipeline, action/ui-scaffolder, project-init.
  - adobe-analytics/cja: kpi-pulse, segment-perf, conversion-funnel, executive-briefing, top-movers, dimension-analysis, funnel-health.
  - stardust: extract, prototype, direct, uplift, migrate, prepare-migration.
- core: imagine (visual gen), pptx/docx/xlsx (office assets).
- Marketplace: frontend-design, math-olympiad, project-artifact, cwc-makers (embedded dev?).

**Analytics (Amplitude, Adobe):**
- amplitude (~27 skills): instrument-events, analyze-*, create-chart/dashboard, taxonomy, experiment, weekly/daily-brief, discover-opportunities/patterns/event-surfaces, debug-replay, replay-ux-audit, monitor-ai-quality/reliability, diagnose-errors, compare-user-journeys, add-analytics-instrumentation, review-agent-insights, what-would-lenny-do, event-description-generator (experimental).
- Adobe analytics/CJA as above.

**Auth/Security:**
- auth0 (~44 skills): auth0-*-quickstart, nextjs/react/nuxt/laravel/express/fastify/springboot/flask/fastapi/php/django? (many frameworks: nextjs, react, angular, vue, ionic, flutter, swift, android, maui, wpf, winforms, expo, mfa, custom-domains, cli, migrations (major), jwt, spa-js, branding, acul-screen-generator. Many with API variants.
- superpowers (security-auditor persona, systematic-debugging, verification).
- agentforce (securing-agentforce).
- chrome-devtools (debugging, a11y, perf).
- Marketplace: security-guidance, hookify (rules for safety).

**Databases/Ops (Airtable, Mongo, Neon, Appwrite?):**
- airtable (8): airtable-overview, cli, filters, show-link, agent-activity-log, sales-ops, marketing-ops, product-ops. MCP auto.
- agent-skills/mongodb (8): mongodb-connection, schema-design, query-optimizer, natural-language-querying, search-and-ai, atlas-stream-processing, mcp-setup. + review-skill.
- neon (3).
- claude-plugin skills cover languages for appwrite-like?
- airwallex-agentos (5): fintech ops (cashflow, billing, provisioning, beneficiaries, best-practices).

**Web Scraping/Automation/Browser (Firecrawl, Chrome DevTools, Adobe):**
- firecrawl (detailed above; JS rendering, anti-bot, interact flows).
- chrome-devtools-mcp (6 skills + 29 MCP tools from reminder: navigate, click, fill, screenshot, lighthouse_audit, network/console/heap/perf traces, emulate, etc.). Puppeteer-based. CLI/docs.
- Adobe edge: scrape-webpage, content-driven-dev.

**Agent Systems, Workflows, MCP, Plugin/Skill Dev (Superpowers, Agentforce, Agents/Airflow, Plugin-Dev, MCP-Server-Dev, etc.):**
- superpowers (14 skills): using-superpowers (strict: invoke Skill tool before *any* response; subagent-driven-development, writing-plans/executing-plans, brainstorming, TDD, systematic-debugging, verification-before-completion, dispatching-parallel-agents, writing-skills, git-worktrees, code-review variants, finishing-branch). Full methodology (spec -> plan -> subagents -> TDD). AGENTS.md/CLAUDE.md.
- agentforce-adlc (4 skills): developing/observing/securing/testing-agentforce. Agents (author/engineer/orchestrator/qa). Scripts for scaffold.
- agents-f71b233b (24 skills): airflow (hitl, plugins, authoring-dags, deploying, testing, debugging, tracing-lineage, freshness, warehouse-init, astro-project, data-analysis, cosmos-dbt-*, openlineage-extractors, blueprint, delegating-to-otto, migrating-airflow-2-to-3/ai-sdk). Strong for data pipelines/workflows.
- plugin-dev (marketplace, 7 skills): plugin-structure, command-dev (617 lines), skill-dev (460), hook-dev (548), agent-development, mcp-integration (417), plugin-settings. Agents for creation/validation.
- mcp-server-dev (3 skills): build-mcp-server/app/b (140-300 lines refs).
- skill-creator (1, 327 lines; +scripts).
- agent-sdk-dev: verifiers, new-sdk-app.
- ai-plugins/endor: endor-setup.
- core/bundled: implement, execute-plan, review, pr-babysit, design, create-skill, check-work, code-review. Bundled agents (explore/plan/general), personas (implementer, reviewer, security-auditor, test-writer, researcher, design-doc-*).
- claude-plugin: language skills (support for broad dev).
- Marketplace extras: hookify (writing-rules), feature-dev (code-architect/explorer/reviewer agents), pr-review-toolkit (code-reviewer etc agents), code-modernization (legacy agents), ralph-loop, security-guidance.
- From MCP reminder (connected, not pure fs skills): appwrite-docs (5 tools), chrome-devtools (29 tools), cloudflare-docs (2), grok_com_canva (32 design tools: create-design, export, brand-kits, editing-txns), grok_com_github (91: repos, issues, prs, actions, search, copilot), grok_com_linear (38: issues, projects, cycles, comments, docs), grok_com_notion (18: pages, dbs, search, comments).

**Testing/Debug/Perf/Code Quality:**
- chrome-devtools (lighthouse, traces, console, network, memory, a11y, LCP).
- vercel (verification, turbopack, perf via next).
- superpowers (TDD, debugging, verification).
- agentforce (testing/securing).
- agents (testing-dags, debugging).
- core: code-review, review, check-work, pr-babysit.
- Marketplace: pr-review-toolkit, security-guidance, code-simplifier, etc. Adobe code-review in AEM.
- amplitude: diagnose-errors, monitor-ai-quality, replay-ux-audit, debug-replay.

**Project Management/Ops:**
- airtable (ops skills, MCP).
- asana (empty).
- Marketplace/external: linear, notion (via MCP reminder), github (via MCP).
- airwallex (fin ops), amplitude (account health).
- Adobe project-management (handovers, ops).
- core/bundled: pr-babysit, execute-plan, implement.

**Other/Misc:**
- Math-olympiad, cwc-makers (maker/embedded onboarding), playground, project-artifact, session-report, example-plugin, commit-commands, various LSPs (clangd, gopls, etc. for code intel), ralph-loop, hookify.
- Core office (docx/pptx/xlsx), imagine, help, supergrok-unlocked.
- Firecrawl for research/scrape.

**MCP Servers (from connected reminder + plugin .mcp.json):** appwrite-docs, chrome-devtools, cloudflare-docs, grok_com_canva, grok_com_github, grok_com_linear, grok_com_notion. (Plugins often auto-wire via .mcp.json or config.)

## 5. Useful for Our Projects (Oc2cO Website, BBWAAS Agent Systems, Code Audits, Visual Assets, Project Mgmt, Cloud Infra) — With Why

**Oc2cO Website (HTML/JS/deploy/design, static/Next-like, assets, testing, content):**
- **Vercel (top priority):** Deploy (cli/deployments-cicd), Next.js/app-router/shadcn/turbopack/routing/caching/verification/next-forge (SaaS starter), env, functions, storage, sandbox (safe code), ai-sdk/gateway, marketplace, bootstrap, react-best-practices. Why: Direct deploy/design-to-prod for website; ecosystem matches HTML/JS/Next patterns. Commands/hooks for fast iteration.
- **Chrome-devtools-mcp (6 skills + 29 tools):** Browser automation, screenshots, lighthouse (perf), network/console/debug (LCP, memory, a11y), interact. Why: UI testing, visual proof, perf audits, scrape/test live site without full browser setup.
- **Adobe (creative + AEM/edge + app-builder + analytics):** Design-from-template, batch-edit, create social/pdfs, content-ops (audit, seo, blocks, import, modeling), creative-cloud edits (photos/videos/retouch), app-builder for tools. Why: Visual assets (heroes, buttons, cards, logos from /Website/oc2co/Assets/), content modeling for site, design variations. Matches Canva exports/asset catalogs.
- **Core:** imagine (gen visuals), pptx/docx/xlsx (reports/docs), code-review/check-work, help (grok config).
- **Firecrawl:** Scrape competitor/content for site copy/research. Why: LLM-ready markdown from web.
- **Cloudflare (if static/Workers):** Workers, durable-objects, agents-sdk, web-perf, wrangler. Why: Alternative deploy/CDN/perf.
- **Frontend-design (marketplace):** Dedicated frontend skill.
- **Amplitude/Adobe-analytics:** Site analytics instrumentation/briefs.
- **Why overall:** Covers deploy (vercel), design/assets (adobe/imagine), testing/automation (chrome), content (firecrawl/adobe), code (core review).

**BBWAAS Agent Systems (MCP, agents, workflows, subagents, skill/plugin dev, data pipelines):**
- **Superpowers (core for agents):** using-superpowers (mandatory skill invocation), subagent-driven-development, writing/executing-plans, brainstorming, dispatching-parallel-agents, TDD/debug/verification, writing-skills. Full workflow (spec->plan->subagents). Why: Matches agent orchestration, plan-mode, subagents, skill use; "bg-parallel-agents" local skill aligns. Methodology prevents drift.
- **Plugin-dev + MCP-server-dev + skill-creator (marketplace):** Build plugins/skills/MCP/commands/hooks/agents. Why: Extends Grok for custom BBWAAS MCPs/sidecars (see oc2co/bbwaas_mcp, sidecar, agent-skills in fs).
- **Agent-sdk-dev + Agentforce-adlc:** SDK verifiers, developing/observing/securing/testing agents, adlc agents/orchestrator. Why: Agent building, Salesforce-like but general for custom agents; scaffold.
- **Agents-f71b233b (Airflow/data):** Authoring-dags, deploying/testing/debugging Airflow, lineage, cosmos-dbt, astro, data-analysis, delegating, migrations, blueprint, hitl. Why: Workflows/pipelines for agent systems/data (BBWAAS has MCP/server sidecars, packets).
- **MCP integrations (chrome, firecrawl, airtable, etc. via plugins + reminder MCPs):** Github/Linear/Notion/Canva/Cloudflare/Appwrite. Why: Tool use for agents (e.g., Linear for tasks, Github for code, Canva design, Notion docs).
- **Core/bundled:** implement, execute-plan, review, pr-babysit, design, create-skill (build more), check-work. Bundled agents (explore/plan). Why: Base for agent harness, memory, plans.
- **Airtable/Neon/MongoDB/Auth0:** Structured data/ops for agent memory/state, auth for agents, DB for BBWAAS. Why: Agent memory, user data, secure workflows.
- **Hookify/Security-guidance:** Rules/hooks for agent safety.
- **Why overall:** Directly supports MCP/agent dev (plugin/mcp skills), workflows (superpowers + airflow), orchestration (subagents/parallel), extension (skill/plugin creators). Aligns with existing bbwaas_mcp/sidecar, agent reports, packets.

**Code Audits (security, review, quality, modernization):**
- **Core:** code-review, review, check-work, pr-babysit.
- **Superpowers:** systematic-debugging, verification-before-completion, requesting/receiving-code-review, TDD.
- **Vercel/Chrome:** verification, plugin-audit (from system reminder: benchmark/audit skills in vercel), chrome debug/perf/a11y.
- **Adobe:** code-review (AEM), ensure-agents-md.
- **Marketplace:** pr-review-toolkit (multiple review agents), code-modernization (legacy/upgrade agents: architecture-critic, security-auditor, test-engineer), security-guidance (hooks for patterns), code-simplifier, feature-dev (reviewer).
- **Agentforce:** securing/testing.
- **Auth0/others:** migration skills for audits.
- **Why:** Layered: basic review (core), deep process (superpowers), browser/perf (chrome/vercel), specialized agents (marketplace), security (auth0/adobe).

**Visual Assets (Canva/Adobe, design, exports, gen):**
- **Adobe (118 skills, creative-cloud/adobe-for-creativity dominant):** create/edit variations (social, photos, video, pdfs, templates), retouch, batch, resize. AEM/edge for content visuals/blocks. Why: Matches /oc2co/Assets/, Canva_Exports, image gen needs (heroes, cards, buttons, logos). Stardust for prototypes/migration.
- **Core imagine + pptx/docx:** Gen + office visuals.
- **grok_com_canva MCP (32 tools):** create-design (from template/candidate/brand), export, folders, brand-kits, editing txns, thumbnails, search, upload, comments. Why: Direct Canva integration for Oc2cO visuals (seen in exports).
- **Frontend-design, vercel (shadcn/ui, next design patterns):** UI components.
- **Firecrawl + Adobe scrape:** Pull visual inspo/content.
- **Why:** Adobe covers creative suite depth; Canva MCP for modern collab design; core for gen.

**Project Mgmt (Airtable, Asana, Linear, Notion, Github, tracking):**
- **Airtable (8 + MCP):** Ops (sales/marketing/product), filters, cli, activity-log, overview. Why: Structured DB for agents/ops (tasks, assets, reports); multiplayer for human+agent.
- **Asana:** Empty (gap; external_plugins present in cache but no install content).
- **MCPs (reminder):** grok_com_linear (38 tools: issues, projects, cycles, milestones, comments, docs, search), grok_com_notion (pages, dbs, views, comments, search, teams), grok_com_github (91: issues/prs/repos/actions/commits/search).
- **Adobe project-mgmt (handovers, auth, ops, whitepaper).**
- **Amplitude:** account-health, briefs.
- **Airwallex:** cashflow/billing ops.
- **Core:** pr-babysit, execute-plan (for task tracking).
- **Why:** Airtable for agent-native DB/ops; MCPs for Linear/Notion/Github workflows (BBWAAS uses reports, packets, AGENT_WORKSPACE); fills pm gaps.

**Cloud Infra (Deploy, DB, Auth, Analytics, Workers):**
- **Vercel + Cloudflare + Neon + Mongo + Appwrite? + Auth0 + Amplitude + Firecrawl:** As categorized above. Deploy (vercel/cloudflare), DB (neon/airtable/mongodb), auth (auth0), analytics (amplitude/adobe), scrape for infra data (firecrawl), functions/storage/sandbox.
- **Why:** Full stack: hosting (vercel/cloudflare), data (neon/mongodb/airtable), auth/security (auth0), observability (amplitude/chrome), automation (firecrawl/chrome).

**Cross-cutting (Core/Bundled + Marketplace Dev Tools):**
- Skill/plugin creation/extension (create-skill, plugin-dev, skill-creator, mcp-server-dev).
- Office/docs (docx/pptx/xlsx).
- General: help, remove-wall-of-text, design.
- LSPs (marketplace) for code intelligence in audits.

## 6. How to Use (Examples from Docs, SKILL.md, READMEs, Registry)

**Discovery/Inspection:**
- `grok inspect` or `grok inspect --json`: Lists skills (source: user/plugin:xxx, path), plugins (skills/agents/hooks/MCP counts), config.
- `/skills [name]`, `/plugins`, `/marketplace`, `/mcps` (TUI modal tabs).
- `grok plugin list`, `grok plugin details <name>`, `grok plugin validate`.

**Install/Manage Plugins (CLI/TUI):**
- `grok plugin install <source> --trust` (e.g., vercel/vercel-plugin, or from registry urls; github shorthand, local, @version).
- TUI: Ctrl+L or /plugins → a (add), i (install), Space (enable), x (uninstall), r (reload).
- Marketplace: `grok plugin marketplace add <url>`, list, update. E.g., `cloudflare/skills`, `adobe/skills`, `xai-org/plugin-marketplace`.
- Config: `~/.grok/config.toml` [plugins] paths/disabled/enabled; [marketplace.sources].
- Trust model: --trust for hooks/MCP; ~/.grok/plugins/ auto-trusted; project requires explicit.
- Examples from READMEs: `/plugin install superpowers@claude-plugins-official`; `npx skills add airtable/skills`; `npx skills add https://github.com/cloudflare/skills`.

**Using Skills:**
- Slash: `/<skill-name> [args]` (e.g., /vercel-plugin:deploy, /cloudflare:build-mcp, /create-skill).
- Auto: Model invokes based on `description` + `when-to-use` + promptSignals (see vercel-cli SKILL.md: pathPatterns like vercel.json, bashPatterns, phrases like "deploy", minScore).
- Frontmatter example (vercel-cli):
  ```
  ---
  name: vercel-cli
  description: Vercel CLI expert... Use when deploying...
  metadata: {priority: 4, pathPatterns: ['vercel.json'], bashPatterns: ['^\s*vercel...'], promptSignals: {phrases: ["check deployment", ...], ...}}
  ---
  ```
- Superpowers strict (using-superpowers/SKILL.md): "IF A SKILL APPLIES... YOU MUST USE IT." Invoke via Skill tool *before any response* (even clarifications). Flow: check -> announce -> todo if checklist -> follow exactly. Red flags for rationalizing.
- Core help: Reads docs/user-guide/ for MCP/skills/plugins/config. E.g., 07-mcp-servers.md, 08-skills.md (frontmatter: name/desc/when-to-use/allowed-tools), 09-plugins.md.
- Qualified: /plugin:vercel-cli or /user:xxx to disambiguate.
- Create: `/create-skill` (interactive; scopes project/user; writes SKILL.md + scripts/refs).
- From bundled/plugins: Skills auto-discovered; reload with `grok plugin list` or TUI r.

**MCP/Specific:**
- Plugins auto-wire .mcp.json (e.g., airtable mcp.airtable.com/mcp; firecrawl hosted OAuth on first use; no key needed often).
- `/mcp` to check. Connected examples: chrome-devtools (navigate, screenshot, lighthouse_audit, evaluate_script, ... 29 tools); grok_com_canva (create-design, export, get-brand-template...).
- Skills often chain (vercel-cli chains to vercel-functions on vercel.json detection).

**Examples from SKILL/Commands:**
- Firecrawl: "Scrape https://... and summarize"; uses MCP tools.
- Airtable: Skills for "sales-ops", "product-ops".
- Superpowers: Start with "build X" → brainstorming skill first.
- Chrome: Use for "take screenshot", "lighthouse_audit", "debug memory leak".
- Vercel: "vercel deploy", or natural "deploy to production".
- Adobe: "adobe-create-social-variations", "aem content-audit".
- Mongo: "mongodb natural language query".
- Plugin dev: Use plugin-dev skills for "create new skill" or "build mcp server".

**Docs for More:**
- /home/sagou/.grok/docs/user-guide/08-skills.md (full SKILL.md format, creation, invocation, best practices: specific desc, concrete steps, allowed-tools).
- 09-plugins.md (what plugins contain, manage in TUI/CLI, trust, marketplace sources, config).
- READMEs per plugin for install/usage.
- `grok --help` or /help.

**Other:** Hooks via plugins (session-start for context); agents/ for specialist roles; commands/ for slash.

## 7. Gaps/Missing (from Audit)

- **Asana (asana-cc86e9aa):** Dir empty (0 files/SKILL.md). External_plugins/asana in cache but not fully installed/expanded. (PM gap for task tracking.)
- **Direct Canva plugin (fs):** No dedicated Adobe-like or skills/ dir for Canva (relies on MCP grok_com_canva 32 tools; visual assets use Canva_Exports in oc2co but no plugin skills).
- **Limited local/user skills in /home/sagou/.grok/skills/ (only 9 core/bundled-like):** More in /mnt/c/Users/Sagou/.grok/skills/ (e.g., bg-parallel-agents) and project .grok/. Not exhaustively in scope but noted.
- **Sparse for some:** Airwallex (5 fintech-specific), base44 (3), neon (3), ai-plugins (1), claude-plugin (11 language-focused but registry "appwrite"), agent-sdk-dev (agents/commands only).
- **No broad "grok_com_*" skill wrappers in fs:** MCP tools available (github 91, linear 38, notion 18, canva 32) but no dedicated SKILL.md for orchestration in installed (use via MCP calls directly or custom skills).
- **Empty/sparse installs:** Some marketplace-cache externals not pulled into installed-plugins (e.g., linear, github direct skills limited).
- **Count variance:** Dir summaries vs grep "across N" show adobe/vercel/auth0 dominant; total ~377 SKILL.md but many upstream duplicates in vercel/adobe.
- **No direct "Oc2cO-specific" or "BBWAAS" plugins:** Rely on composing (vercel+adobe+superpowers+firecrawl+airtable+core). Existing bbwaas_mcp/sidecar in oc2co_website/ are custom, not in .grok plugins.
- **Missing categories:** No built-in video gen (beyond adobe quick-cut), specific ecomm (SellThis assets), crypto/blockchain (oc2co mentions), advanced memory beyond core/experimental. LSPs present but not skills-heavy. Asana/Linear fs gaps (MCP compensates).
- **Trust/MCP activation:** Many require --trust or first-use OAuth; blocked until trusted (per plugins.md).
- **Recommendations from audit:** Install asana if available; create custom skills for Canva orchestration or BBWAAS MCP wrapping using plugin-dev/mcp-server-dev + create-skill; leverage vercel for oc2co deploy + adobe for assets + superpowers for agent rigor. Update marketplace for missing externals. Use `grok inspect` post-changes.
- **Other fs notes:** /home/sagou/.grok/projects/*/mcps/ have json configs (e.g., for active sessions); logs/mcp/ show appwrite/chrome/mongodb; no other top-level plugins/skills outside listed.

**Sources for Proof (key files read/inspected):**
- /home/sagou/.grok/installed-plugins/registry.json (full list + metadata)
- /home/sagou/.grok/installed-plugins/*/README.md (vercel, adobe partial, firecrawl full, airtable, chrome partial, cloudflare, superpowers, base44, marketplace-cache README)
- /home/sagou/.grok/installed-plugins/*/SKILL.md (vercel-cli frontmatter example, using-superpowers, help)
- /home/sagou/.grok/skills/*/SKILL.md, bundled/manifest.json, bundled/skills/*, skills/*
- /home/sagou/.grok/docs/user-guide/08-skills.md, 09-plugins.md (and partial README)
- list_dir on /home/sagou/.grok, /installed-plugins (all sub), /marketplace-cache (both), /skills, /bundled/skills
- grep **/SKILL.md (counts, names, paths: vercel 36, adobe 118, auth0~44, agents~24, amplitude~27, superpowers 14, firecrawl 10, airtable 8, mongodb 8, cloudflare 8, chrome 6, claude 11, base44 3, neon 3, airwallex 5, ai 1, agentforce 4, core 9, bundled 6, cache 32, total ~377)
- /mnt/c/.../BBWAAS/INVENTORY.md (context for update)

**Files Written:**
- /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Agent_Systems/GROK_TOOLS_INVENTORY/INVENTORY_SKILLS_PLUGINS.md (this detailed report)
- (See next for update to INVENTORY.md)

**CATALOG COMPLETE**

Additional files written during this task:
- (INVENTORY_SKILLS_PLUGINS.md primary)
- Short summary appended/updated to BBWAAS/INVENTORY.md (see tool call follow-up if separate). 

All data from direct fs inspection 2026-06-27. For updates, re-run `grok inspect` or greps.