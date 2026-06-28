# BBWAAS — Master Brain (Grandparent Umbrella, Organized 2026-06-27)

This is the **canonical master root** for all BBWAAS agent memory, packets, reports, projects, apps, website work, and shared state under a single consistent hierarchy.

**Grandparent > Parent > Child > Grandchild structure** (enforced for all organization).

## Master Structure

**BBWAAS/** (master / grandparent)
- **App_Store_Apps/** (parent)
  - **MemTool/** (child)
    - Assets/
    - Code/
    - Documents/
    - References/
    - MEMTOOL_OC2CO/ (legacy sub for source-of-truth during WP1)
  - **SellThis/** (child)
    - Assets/
    - Code/
    - Documents/
- **Website/** (parent)
  - **oc2co/** (child)
    - Images/ (grandchild - categorized: Backgrounds/, Buttons/, Cards/, Heroes/, Logos/, MemTool/, SellThis/, etc.)
    - Source/ (grandchild - full oc2co_website build: html, css, js, sub-apps, animation/, arcade/, cinematic/, iris_oracle/, payments/, store/, tools/, web-apps/, bbwaas_mcp/, bbwaas_sidecar/ copies)
    - Documents/
    - Canva_Exports/
    - Assets/
    - Subdomains/
- **Agent_Systems/** (parent)
  - Packets/
  - Reports/
  - Tools_MCP_Sidecar/
    - MCP_Server/
    - Sidecar_Panel/
    - Grok_Skills/ (e.g. bg-parallel-agents)
  - Consolidation_History/
- **Other_Projects/** (parent)
  - Visual_Intake/
  - Iris_Oracle/
  - Email_Intake/
  - Canva_Exports/
  - Polymarket/
  - Ops_Machine/
  - Mattermost_Poc/
  - Mogo_Card_Journal_Mvp/
  - Soulprint_Rebuild_Template/
  - Learnings/
  - Tunnel_Client/
  - Tool_Sandboxes/
  - Tools/
  - bbwaas-static-proof/
  - command_center/
  - Polsia/ (pointers / cross-refs; no dedicated dir post-curation)
- **Work_Packets/** (organization task packets: WP1, WP2, WP3)
- Direct files: README.md, INVENTORY.md, (BG_* agent reports now filed under Agent_Systems/Reports/)
- Symlinked canonicals (for compat + unified view):
  - AGENT_WORKSPACE/ -> ../00_MASTER_FRONT_DOOR/AGENT_WORKSPACE (primary packets/reports registry)
  - EVOLUTION/ -> ../bbwaas_evolution
  - COMMAND_CENTER/ -> ../bbwaas_command_center
  - HOSTED_WORKSPACE/ -> ../bbwaas_hosted_workspace
  - MCP_SERVER/ -> ../bbwaas_mcp_server
  - SIDECAR_PANEL/ -> ../bbwaas_sidecar_panel
  - STATIC_PROOF/ -> ../bbwaas-static-proof
  - PROJECT_OC2CO_MCP/ , PROJECT_OC2CO_SIDECAR/ (point to canonical inside Website/oc2co/Source/oc2co_website/ ; fixed by BG5)
  - ARCHIVE_GATHERS/ -> historical
  - CONSOLIDATION_REPORTS/ -> ../BBWAAS_CONSOLIDATION_2026-06-27
  - TOOL_SANDBOXES/ , USER_ROOT_MCP/ , etc.
- ARCHIVE_GATHERS/ , STALE_BBWAAS/ (external for historical/stale)

## Save Format Used
- Grandparent master (BBWAAS) > parent branches (App_Store_Apps, Website, Agent_Systems, Other_Projects) > child subs (MemTool, oc2co, Visual_Intake, Packets...) > standardized grandchildren (Images/, Source/, Documents/, References/, Assets/, Code/...)
- Consistent folder labels: no creative names; use "Documents", "Source", "Assets", "Images" (with subcats), "Packets", "Reports"
- Every parent folder MUST have README.md containing:
  - Description / purpose
  - Save format used
  - Full contents list (with links)
  - How to add new work
  - Cross links to children / master
- All work under this master; symlinks used to preserve old references/paths without splitting hierarchy.
- No child before its parent. No duplicate trees (consolidated during moves).
- Authoritative sources often live at BrainHub/ peer level; symlinked here for single entry point.
- New saves route via AGENT_WORKSPACE/PACKETS/ or appropriate child. BG agents and MCP enforce.

## Contents (Key)

**App_Store_Apps/**
- MemTool/ (see its internal READMEs; WP1 curated)
- SellThis/ (see its internal READMEs; WP1 curated)

**Website/**
- oc2co/ (see its internal READMEs / Documents/; WP2 curated images + source)

**Agent_Systems/**
- Packets/ -> AGENT_WORKSPACE/PACKETS (BBWAAS_* packets, swarm decisions, unify plans, sidecar proofs etc.)
- Reports/ (BG agent reports, agent verify, grok sidecar ux etc. + AGENT_REPORTS/ via workspace)
- Tools_MCP_Sidecar/ (MCP_Server, Sidecar_Panel, Grok_Skills/bg-parallel-agents for agent tooling)
- Consolidation_History/ (unify plans, discovery explorers, fragment maps)

**Other_Projects/**
- Visual_Intake/ (full visual machine: workflows, batches, scripts, manifests, generated candidates, review tools — misc project)
- Iris_Oracle/ (visual direction, agent dashboards, reference)
- Email_Intake/ (email processing pipeline, configs, summaries)
- Canva_Exports/ (curated md catalogs not images)
- Polymarket/ (+ polymarket_bot.py)
- Ops_Machine/, Mattermost_Poc/, Mogo..., Soulprint..., Learnings/, Tunnel_Client/, Tool_Sandboxes/, Tools/ (misc tools/experiments)
- bbwaas-static-proof/, command_center/ (supporting)
- Polsia/ (cross-refs only; see 00_MASTER_FRONT_DOOR/ for historical polsia_memtool pointers)

**Work_Packets/**
- WP1_MemTool_SellThis_Curation.md
- WP2_oc2co_Website_Curation.md
- WP3_Verification_Other_Organization.md (this packet)

See full INVENTORY.md and AGENT_WORKSPACE for exhaustive.

## Verification Notes (WP3)
- Hierarchy verified: all under BBWAAS master; parents created; children symlinked or direct.
- Scattered filed: visual_intake, email_intake, iris_oracle, bbwaas-* sources (via symlinks), loose BG_* agent files, polymarket_bot.py, .grok skill for bg-parallel, canva md, consolidation history, command center etc. into logical branches.
- Duplicates checked: symlinks avoid copies; existing WP1/WP2 curation untouched (no re-move of MemTool/SellThis assets or oc2co Images/Source).
- AppData: scanned, no non-system BBWAAS work found (only system caches like browsers/docker). Permissions limit deeper; no action needed.
- .grok/agents/memtool: persona files noted but not moved (MemTool curation scope excluded per instructions).
- 00_MASTER_FRONT_DOOR/ and STALE_BBWAAS/ left as-is (linked where appropriate).
- Old references preserved via symlinks + root-level backlinks where moved (e.g. polymarket_bot.py).
- No branching splits.

## How to Use
cd /mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS
# All paths resolve here or via symlinks. AGENT_WORKSPACE is the write target for new packets/reports.

BRAINHUB=/mnt/c/Users/Sagou/Documents/BrainHub recommended for consistency.

## Next
- Website update phase.
- Domain / subdomain rearrangement recommendations (see report).
- Cloud archive of STALE_BBWAAS/.

Created / updated during WP3: Verification, Other Work, and Master READMEs (BG Subagent 3).

See:
- INVENTORY.md
- Work_Packets/WP3_Verification_Other_Organization.md
- Agent_Systems/ and Other_Projects/ READMEs
