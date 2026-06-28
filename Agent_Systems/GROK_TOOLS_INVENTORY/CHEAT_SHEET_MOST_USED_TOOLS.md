# Grok Tools Cheat Sheet - Most Used for BBWAAS / Oc2cO (2026-06-27)

## Quick Invoke
- Skills: `/<skill-name>` e.g. `/superpowers` , `/vercel-cli:deploy` , `/create-skill`
- MCPs: Use `search_tool` first for schema (query="grok_com_github" or tool), then `use_tool` with qualified name e.g. `grok_com_github__search_issues`
- CLI: `grok mcp list` | `grok mcp doctor` | `grok plugin list`
- TUI: `/skills` , `/plugins` , `/mcp` , `/marketplace`

## Top Skills (from inventories)
1. **superpowers** (and subs: using-superpowers, subagent-driven-development, executing-plans, systematic-debugging, brainstorming, test-driven-development, verification-before-completion, dispatching-parallel-agents, writing-skills/plans)
   - When: complex dev, parallel bg agents, planning, TDD, agent workflows.
   - Example: Use before any big task; "bg agents=5 <task>"

2. **vercel-*** (vercel-cli, deployments-cicd, vercel-agent, vercel-sandbox, vercel-firewall, etc.)
   - Deploy, env, logs, sandbox, AI gateway for oc2co site.

3. **chrome-devtools-*** (chrome-devtools, chrome-devtools-cli, debug-optimize-lcp, a11y-debugging, memory-leak-debugging, troubleshooting, web-perf)
   - Browser automation, test www.oc2co.com , perf, a11y, screenshots, network.

4. **firecrawl-*** (firecrawl-scrape, firecrawl-crawl, firecrawl-search, firecrawl-agent, firecrawl-map, etc + skill-gen)
   - Scrape research, docs, competitors for packets.

5. **airtable-*** (airtable overview, filters, marketing-ops, product-ops, sales-ops, cli)
   - Ops, inventory, reports, brain tracking.

6. **create-skill** / **implement** / **execute-plan** / **review** / **code-review**
   - Build skills, implement features, run plans, review code.

7. **amplitude-*** (analyze-*, instrument-events, create-chart/dashboard, replay-ux-audit, etc.)
   - Analytics for MemTool/SellThis/Oc2cO.

8. **auth0-*** (various quickstarts for nextjs, react, etc.)
   - Auth integration.

9. **adobe-for-creativity** subs (batch-edit-photos, design-from-template, create-social-variations, etc.)
   - Visual assets, batch for Canva_Exports/Images.

10. **cloudflare** / **neon** / **mongodb** skills
    - Infra, DB for BBWAAS.

## Top MCPs / Connectors (grok_com_* and plugins)
- **grok_com_github** (91 tools): search_issues, list_pull_requests, create_pull_request, push_files, run_secret_scanning, check_dependency_vulnerabilities, semantic_issues_search, get_file_contents, etc.
  - For Oc2cO/-oc2co: audit, PRs, vulns, secrets.
  - Test: `search_tool "grok_com_github"` then `use_tool grok_com_github__get_me` or search_issues with owner=Oc2cO repo=-oc2co

- **chrome-devtools** (29 tools): navigate_page, click, take_screenshot, lighthouse_audit, get_network_request, evaluate_script, etc.
  - Test site live.

- **grok_com_canva** (32 tools): list-brand-kits, search-brand-templates, generate-design, export-design, etc.
  - Design for Oc2cO visuals.

- **grok_com_linear** (38 tools): list_issues, save_issue, list_projects, etc.
  - Track work packets.

- **grok_com_vercel** : deploy_to_vercel, check domains, get access.
  - Deploy/test oc2co.

- **firecrawl** (via plugin/MCP): scrape, crawl, search, agent.
  - Research.

- **appwrite-docs**, **cloudflare-docs**, **neon**, **airtable** via plugins.
  - Docs, infra, DB, ops.

- **grok_com_notion**, others in catalog (Gmail, Drive, Salesforce, etc.)

## How to Authorize / Connect
- TUI: Settings > Connectors / Marketplace > authorize OAuth for github, vercel, canva, linear, cloudflare, etc.
- CLI: `grok mcp add --transport http <name> <url> --header "..."` 
- Test: `grok mcp doctor` ; search_tool then use_tool.
- bbwaas: Already in config; run `node server.js` in its dir (now started on 8787).

## Most Used Patterns for Our Work
- Parallel bg: Use /superpowers + spawn_subagent background=true for "bg agents=N <packet>"
- Oc2cO website: vercel + chrome-devtools + canva/adobe + github + firecrawl
- BBWAAS agents: superpowers + custom bbwaas MCP + agentforce + create-skill
- Inventory/brain: airtable + amplitude + write to Agent_Systems/GROK_TOOLS_INVENTORY/
- Auth/DB: auth0 + neon/mongodb + appwrite-docs

See full inventories in this dir for details. Update this cheat sheet after new installs.

**Last updated:** 2026-06-27 (from 5 bg agents audit)
