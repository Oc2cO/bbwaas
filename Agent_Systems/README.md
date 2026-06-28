# Agent_Systems — Parent Branch (BBWAAS Master)

**Description:** Dedicated parent for all BBWAAS agent systems work: packets, reports, tooling (MCP, sidecar, grok skills), consolidation history, swarm coordination, front door, memory palace ops, etc. Provides clean branch separate from app/website projects. Supports BG agents, multi-agent workflows, hermes, etc.

**Save Format Used:**
- Parent (Agent_Systems) > standardized children (Packets/, Reports/, Tools_MCP_Sidecar/, Consolidation_History/)
- Symlinks to authoritative (AGENT_WORKSPACE subs, bbwaas_mcp_server/, bbwaas_sidecar_panel/, CONSOLIDATION_REPORTS/)
- Every sub has or inherits README explaining contents + links.
- Consistent with grandparent BBWAAS/ rules (see ../README.md).

**Contents List:**
- **Packets/** -> symlink to AGENT_WORKSPACE/PACKETS (live BBWAAS_* packets, sidecar proofs, unify plans, swarm json decisions, router, research lanes, ngrok, polsia stripe etc.)
- **Reports/** (BG_* agent verification reports, AGENT_REPORTS/, checker reviews, sidecar ux, gate in/out)
- **Tools_MCP_Sidecar/**
  - MCP_Server/ -> ../../bbwaas_mcp_server (the MCP server source + node_modules)
  - Sidecar_Panel/ -> ../../bbwaas_sidecar_panel (chrome extension sidepanel, manifest, bg)
  - Grok_Skills/ (bg-parallel-agents/ SKILL.md for parallel subagent workflows)
- **Consolidation_History/** -> symlink to CONSOLIDATION_REPORTS/ (UNIFY_PLAN_AGENT3.md, DISCOVERY_EXPLORER*, INITIAL_FRAGMENT_MAP.md)

**Links to Children:**
- Packets/
- Reports/
- Tools_MCP_Sidecar/ (MCP_Server, Sidecar_Panel, Grok_Skills)
- Consolidation_History/

**Links to Related:**
- Master: ../README.md
- AGENT_WORKSPACE/ (top level symlink; primary write target)
- Work_Packets/ (organization packets including WP3)
- 00_MASTER_FRONT_DOOR/ (via workspace)
- Other_Projects/ sibling for misc
- App_Store_Apps/ and Website/ for integration points (sidecar in oc2co source etc.)

**How to add:** New agent packets/reports -> Packets/ or Reports/ (via AGENT_WORKSPACE preferred). MCP/sidecar changes in Tools subs. History notes to Consolidation_History/. Always update this README + master.

**Notes (WP3):** Populated via symlinks from existing organized sources. BG agent reports (BG_AGENT*.md, BG_AGENTS_BRING_BACK...) filed here from BBWAAS root. .grok skill linked as agent tooling example. No duplication of WP1/WP2.

Ready for agent swarm and multi-agent verification continuation.

## Grok Tools Inventory & Cheat Sheet (2026-06-27)

Dedicated tooling reference for Grok Skills, Plugins, and MCPs (core to agent systems, Oc2cO website deploys/design/audits, BBWAAS MCP/sidecar/workflows).

**Directory:**
- `GROK_TOOLS_INVENTORY/`

**Key Files (read these for full details):**
- `GROK_TOOLS_INVENTORY/GROK_TOOLS_SKILLS_MCPS_INVENTORY_2026-06-27.md` (overview, config, plugin catalog, MCPs, useful stack summary)
- `GROK_TOOLS_INVENTORY/INVENTORY_SKILLS_PLUGINS.md` (detailed 20+ installed plugins, ~377 SKILL.md counts, core/bundled skills, categorized by domain: deploy/visuals/agents/audit/PM)
- `GROK_TOOLS_INVENTORY/INVENTORY_MCPS_CONNECTORS.md` (live MCPs: github 91 tools, linear 38, canva 32, chrome-devtools 29, notion 18 + appwrite/cloudflare-docs; protocol, schemas, status, recs)
- `GROK_TOOLS_INVENTORY/CHEAT_SHEET_MOST_USED_TOOLS_2026-06-27.md` (concise top 13: bg-parallel-agents, superpowers, vercel, grok_com_github/linear/canva, chrome-devtools, adobe, firecrawl, airtable, cloudflare, imagine, notion + bbwaas custom + invoke examples)

**How to Use:**
- Quick ref: CHEAT_SHEET (MCP protocol: always search_tool first then use_tool; slash commands for skills like `/bg agents = N`, `/vercel-plugin:deploy`, `/imagine`)
- Common in our work: superpowers + bg-parallel for complex tasks; vercel/github/chrome for website; canva/adobe for visuals; linear/airtable for packets/ops; custom bbwaas MCP for coordination.
- See also: Tools_MCP_Sidecar/Grok_Skills/bg-parallel-agents/SKILL.md

**Maintenance:** Update inventories + cheat on new installs/audits (use `grok inspect`, `grok mcp doctor`). Cross-link from BBWAAS/README.md and INVENTORY.md. All under BBWAAS master for brain consistency.

## Grok Tools & MCP Inventory (added 2026-06-27 via bg agents 5)
- Full audit of skills (~377), plugins (20+), MCPs/connectors (200+ tools), marketplace.
- Inventories in GROK_TOOLS_INVENTORY/ (3 detailed MDs + cheat sheet).
- Key: superpowers for bg agents, vercel/cloudflare/chrome for deploy/test, github/linear/canva for code/design, firecrawl/airtable/amplitude for research/ops.
- Cheat sheet: CHEAT_SHEET_MOST_USED_TOOLS.md
- bbwaas MCP server started (port 8787, see inventory for status).
- New tools enabled via plugins/config + OAuth (test with search_tool + use_tool protocol).
- Update this after using new MCPs/skills in packets. See also ../INVENTORY.md for links.
