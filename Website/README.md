# Website — Parent Branch (BBWAAS Master)

**Description:** Container for all BBWAAS website projects and hosting work. Primary child is the oc2co website (landing, subdomains, assets, source, cinematic layers, payments, store, iris_oracle embed, etc.). Curated under grandparent BBWAAS/.

**Save Format Used:**
- Parent (Website) > Child (oc2co) > Grandchildren (Images/ with subcats, Source/, Documents/, Canva_Exports/, Subdomains/, Assets/)
- Images categorized by purpose (Backgrounds, Buttons, Cards, Heroes, Logos, MemTool, SellThis, ...)
- Source holds full build + embedded agent tools (bbwaas_mcp, sidecar copies for integration)
- All under BBWAAS master. Symlinks preserve references.
- Standardized labels enforced. No child before parent.

**Contents:**
- oc2co/
  - Images/
    - Backgrounds/
    - Buttons/
    - Cards/
    - Heroes/
    - Logos/
    - MemTool/
    - SellThis/
    - (other)
  - Source/ (oc2co_website/ with index.html, style, script, animation/, arcade/, cinematic/, checkout/, payments/, store/, tools/, web-apps/, iris_oracle/, bbwaas_mcp/, bbwaas_sidecar/, reports, CNAME, etc.)
  - Documents/ (OC2CO_* reports, V2* , alignment packets, handoffs)
  - Canva_Exports/
  - Assets/
  - Subdomains/
  - (See WP2 for curation details on Images + Source; do not redo here)

**Links to Children:**
- oc2co/ (main; see oc2co/README.md if present + Source/ and Documents/ for details)
  - Sub: Images/, Source/, Documents/, Subdomains/

**Links:**
- Parent: ../README.md (BBWAAS master grandparent)
- App_Store_Apps/ sibling (MemTool/SellThis integration)
- Agent_Systems/ for BBWAAS agent tooling used in site
- Other_Projects/ for supporting visual/email work

**How to add new:** Add website assets to oc2co/Images/ in correct subcat. Source changes in oc2co/Source/. Docs to Documents/. Update this + master README. Use symlinks for cross refs.

WP2 completed curation of oc2co Images/Source. This README added in WP3 for hierarchy completion. Prepare for domain update.
