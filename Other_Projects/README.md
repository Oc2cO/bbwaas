# Other_Projects — Parent Branch (BBWAAS Master)

**Description:** Catch-all parent branch for miscellaneous projects, supporting tools, experiments, intake systems, and non-App/Website work. Includes visual generation pipeline, email processing, iris oracle visual, polymarket bot, ops tooling, legacy poc, learnings, etc. Keeps the master clean by separating from core App_Store_Apps, Website, and Agent_Systems.

**Save Format Used:**
- Parent (Other_Projects) > Child projects (Visual_Intake/, Iris_Oracle/, Email_Intake/, Polymarket/ etc.)
- Symlinks (relative) to authoritative sources at BrainHub/ root level.
- Standard sub-labels where project has them (e.g. Visual_Intake has config/, input/, output/, workflows/, scripts/, README.md)
- Follows grandparent hierarchy (see ../README.md). Symlinks for compat with old paths/references.

**Contents List (symlinked children):**
- Visual_Intake/ (visual machine / intake system: full scripts, workflows/batch_*/ , image_editing/, memtool_*, visual_job_access/, output/ manifests/summaries/galleries, input/ refs, integrations/ Dify etc.)
- Iris_Oracle/ (iris/palm etc visual divination + agent dashboards, reference/, visuals, html UIs, master packet, BBWAAS visual direction)
- Email_Intake/ (email pipeline: config/, input/ gmail/yahoo, logs/, output/ indexes/action boards/summaries, scripts/)
- Canva_Exports/ (curated catalogs and md not raw images)
- Polymarket/ (bot + research; polymarket_bot.py filed here)
- Ops_Machine/ (ops packets, worker prompts, checkpoints, agent_orchestration, scripts/, templates/)
- Mattermost_Poc/ (mattermost docker poc)
- Mogo_Card_Journal_Mvp/
- Soulprint_Rebuild_Template/
- Learnings/
- Tunnel_Client/
- Tool_Sandboxes/
- Tools/
- bbwaas-static-proof/ (static hosting proof + local tools)
- command_center/ (large command center structure)
- Polsia/ (empty or pointer dir for cross-refs to polsia work in docs / 00_MASTER_FRONT_DOOR / oc2co reports)

**Links to Children:**
- See list above (each has own README.md where present; e.g. visual_intake/README.md)
- Full list in ../README.md

**Links:**
- Master grandparent: ../README.md
- Agent_Systems/ (related agent tooling / visual intake used by agents)
- Website/ (iris_oracle embed in oc2co, visual assets)
- App_Store_Apps/ (visual used for MemTool/SellThis)

**How to add new misc work:** Create child dir or symlink authoritative into Other_Projects/. Document in this README and master. Prefer moving source into BrainHub/ level then symlink.

**WP3 Notes:** All top-level misc/scattered projects from BrainHub root (not covered by WP1/WP2 MemTool/SellThis or oc2co curation) filed here via symlinks. No source duplication. Loose files (e.g. polymarket_bot.py) consolidated under their child. AppData scan: nothing non-system relevant found. .grok agents/memtool left in place (MemTool scope excluded).

Supports preparation for website update + domain integration.
