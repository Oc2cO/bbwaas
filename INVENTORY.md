# BBWAAS SINGLE UMBRELLA - FULL PATH INVENTORY (2026-06-27)

This is the authoritative list of all BBWAAS-related directories discovered under /mnt/c/Users/Sagou (exhaustive find).

## Git Repository

- **URL:** https://github.com/Oc2cO/bbwaas
- **Branch:** main
- **Clone:** `git clone https://github.com/Oc2cO/bbwaas.git`

All new agent saves should target the BBWAAS/ umbrella. This repo IS the canonical source for agents that cannot access local files. The local BrainHub has additional content (symlinked folders, historical archives) but the BBWAAS/ structure is the single entry point.

## Canonical / Active Umbrella
- /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/   <--- NEW SINGLE ENTRY POINT
  - AGENT_WORKSPACE -> ../00_MASTER_FRONT_DOOR/AGENT_WORKSPACE (primary shared registry)
  - EVOLUTION -> ../bbwaas_evolution
  - COMMAND_CENTER -> ../bbwaas_command_center
  - ... (see symlinks)
  - CONSOLIDATION_REPORTS -> ../BBWAAS_CONSOLIDATION_2026-06-27

## Primary Shared Workspace (all agent writes should target this)
- /mnt/c/Users/Sagou/Documents/BrainHub/00_MASTER_FRONT_DOOR/AGENT_WORKSPACE/
  (PACKETS/, AGENT_REPORTS/, CHECKER_REPORTS/, etc.)

## Major Stores (now under BBWAAS symlinks)
- bbwaas_evolution/ (440+ files, history, core)
- bbwaas_command_center/
- bbwaas_hosted_workspace/
- bbwaas_mcp_server/
- bbwaas_sidecar_panel/
- bbwaas-static-proof/ (and its AGENT_WORKSPACE now symlinked)

## Project / Forked
- Website/oc2co/Source/oc2co_website/ (CANONICAL single deployable website source truth)
- agw/ (inside Source/: agent brain snapshot with BBWAAS_MASTER_LINK + local AGENT_WORKSPACE copy for convenience; primary writes go to BBWAAS/AGENT_WORKSPACE)
- bbwaas_mcp , bbwaas_sidecar (now correctly symlinked via PROJECT_* from canonical inside Source)

## Archives / Gathers (historical copies - do not write new here)
- 00_MASTER_WORK_GATHER/...
- tool_sandboxes/ (many hermes/bbwaas experiments)
- Codex/ copies (external)

## User-level
- /mnt/c/Users/Sagou/bbwaas_mcp_server/ (symlinked as USER_ROOT_MCP)

## Linux/WSL Leaks (symlinked from /home/sagou/bbwaas and .hermes/bbwaas)
- /home/sagou/.hermes/memories/bbwaas_*
- /home/sagou/.hermes/skills/bbwaas
- /home/sagou/.openhands-bbwaas-sandbox/
- /home/sagou/.grok/ sessions/projects (mixed paths)
- /home/sagou/.claude/ etc.

See:
- BBWAAS/README.md
- CONSOLIDATION_REPORTS/DISCOVERY_EXPLORER1.md (full paths + analysis)
- CONSOLIDATION_REPORTS/DISCOVERY_EXPLORER2_REFS.md (configs, histories, hardcodes)
- 00_MASTER_FRONT_DOOR/AGENT_WORKSPACE/PACKETS/BBWAAS_UNIFY_SINGLE_UMBRELLA_2026-06-27.md

All new saves must go through BBWAAS/AGENT_WORKSPACE or via the MCP (enforced).
Legacy paths are symlinked for compatibility.

## Broader /mnt/c Scan (2026-06-27 background task)
Command: find /mnt/c -type d -iname "*bbwaas*" | head -30
Result: Same core set under /mnt/c/Users/Sagou/... (user mcp deep nests, gather clones, evolution subs, tool_sandboxes specifics, oc2co bbwaas_mcp/sidecar, our BBWAAS/CONSOLIDATION).
No additional top-level roots surfaced in first 30.
Administrator check: no tree found (access limited or none; echo 'no admin...').

All active save locations now covered by symlinks in this umbrella.
Newly linked (BG5 fixed 2026-06-27): PROJECT_OC2CO_MCP -> Website/oc2co/Source/oc2co_website/bbwaas_mcp , PROJECT_OC2CO_SIDECAR -> .../bbwaas_sidecar , Other_Projects/Canva_Exports -> ../Website/oc2co/Canva_Exports (consolidated, was broken).

## Final Broad /mnt/c + oc2co Scan Confirmation (2026-06-27)
- Canonical: Website/oc2co/Source/oc2co_website/ (full source, agw/ snapshot, bbwaas_mcp/sidecar inside)
- PROJECT symlinks point inside canonical source (fixed).
- These are now symlinked as PROJECT_OC2CO_MCP and PROJECT_OC2CO_SIDECAR under BBWAAS/
- Grep for Administrator/OtherUsers/AppData/Program paths with *bbwaas* : no results (empty)
- Conclusion: 100% of BBWAAS material lives under /Users/Sagou/ trees. No separate admin or other-user branches exist. All active and historical locations now have symlinks or direct links inside the single BBWAAS/ umbrella.

## GROK TOOLS / SKILLS / PLUGINS AUDIT SUMMARY (2026-06-27)
**See full detailed report:** /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Agent_Systems/GROK_TOOLS_INVENTORY/INVENTORY_SKILLS_PLUGINS.md

**Key Stats (from fs inspection of /home/sagou/.grok + installed-plugins + marketplace-cache):**
- Installed plugins: 17+ (adobe-for-creativity, vercel, auth0, superpowers, chrome-devtools, firecrawl, airtable, amplitude, agentforce, agents/airflow, cloudflare, mongodb, neon, base44, appwrite/claude-lang, airwallex, ai-plugins/endor, agent-sdk-dev; asana empty).
- SKILL.md total ~377 (adobe 118, vercel 36, auth0 ~44, agents-f71b 24, amplitude ~27, superpowers 14, firecrawl 10, etc.).
- Core skills (~9 in /home/sagou/.grok/skills/): check-work, code-review, create-skill, docx, help, imagine, pptx, supergrok-unlocked, xlsx.
- Bundled (~6 + agents/personas): design, execute-plan, implement, pr-babysit, remove-wall-of-text, review + bundled/agents (explore/plan/general), personas/roles.
- Marketplace-cache items: 30+ (plugin-dev, mcp-server-dev, skill-creator, frontend-design, hookify, code-modernization, pr-review-toolkit, security-guidance, cwc-makers, math-olympiad, playground, external: discord/telegram/imessage/neon/asana/linear/github/etc.).
- MCPs connected (reminder): appwrite-docs, chrome-devtools (29 tools), cloudflare-docs, grok_com_canva (32), grok_com_github (91), grok_com_linear (38), grok_com_notion (18).

**Top Useful for Oc2cO (website deploy/design/HTML-JS/assets/testing):**
- Vercel (deploy, nextjs, cli, verification, shadcn, ai-sdk, sandbox).
- Adobe (creative design/edit, AEM content/blocks/seo, app-builder, analytics).
- Chrome-devtools (browser automation, lighthouse, screenshots, debug).
- Core: imagine (gen), pptx/docx, code-review.
- Firecrawl (scrape content), Cloudflare (alt infra), frontend-design.

**Top Useful for BBWAAS (agents/MCP/workflows/agent systems):**
- Superpowers (subagent-driven-dev, plans, TDD, debugging, skill invocation; strict methodology).
- Plugin-dev + mcp-server-dev + skill-creator (build/extend skills/plugins/MCP/hooks).
- Agentforce (develop/secure/test agents), Agents (airflow data workflows/pipelines).
- Agent-sdk-dev.
- Core/bundled: implement/execute-plan/review/create-skill.
- DB/Auth/Analytics: airtable (ops/MCP), neon/mongodb, auth0, amplitude.
- MCPs: github/linear/notion/canva for agent tools.

**Other:** Code audits (core review + superpowers + marketplace pr-review/security + chrome/vercel verification); Visual (adobe + canva MCP + imagine); PM (airtable + linear/notion/github MCPs; asana empty gap); Cloud (vercel/cloudflare/neon/auth0/firecrawl/amplitude).

**Gaps:** Asana empty; limited direct Canva skills (MCP only); no Oc2cO/BBWAAS custom plugins in .grok (use custom bbwaas_mcp/sidecar + create-skill/plugin-dev to extend); some installs sparse.

**How to Use (quick):**
- Install: `grok plugin install vercel/vercel-plugin --trust` (or /plugins TUI); marketplace add e.g. cloudflare/skills.
- Skills: `/<name>` (e.g. /vercel-plugin:deploy, /create-skill); auto via desc/signals. See superpowers for mandatory pre-response invocation.
- Inspect: `grok inspect`, `/skills`, `/plugins`, `/mcp`.
- Docs: ~/.grok/docs/user-guide/08-skills.md (SKILL.md format), 09-plugins.md.
- Full details + all paths/counts/examples in the linked INVENTORY_SKILLS_PLUGINS.md (proof from list_dir/grep/read_file on SKILL.md/READMEs/registry).

**Action:** New Grok skills/plugins reports/saves go to GROK_TOOLS_INVENTORY/. Compose tools for oc2co/BBWAAS (e.g. vercel+adobe+superpowers+airtable+MCPs). Re-audit with greps on SKILL.md after installs. 

(End of Grok summary section; see full report for exhaustive categorized lists, SKILL counts per plugin, frontmatter examples, and gap analysis.)