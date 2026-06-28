# Work Packet 1: MemTool and SellThis Curation (App Store Apps Branch)

**Agent Focus:** Only this packet. Do not touch Website or other.

**Goal:** File away all MemTool and SellThis related files into the organized structure under BBWAAS/App_Store_Apps/

**Target Structure (create if not):**
- BBWAAS/App_Store_Apps/MemTool/
  - References/ (the desktop "MemTool Home Atrium References" folder and any character/avatar refs)
  - Assets/ (images, visuals for MemTool)
  - Code/ (any JS, components, temp memtool-*.js if relevant)
  - Documents/ (any docs, proofs, maps from MEMTOOL_OC2CO)
- BBWAAS/App_Store_Apps/SellThis/
  - Assets/
  - Code/
  - Documents/

**Sources to locate and move (use list_dir, run_terminal to find, then mv or cp with care):**
- Desktop: "/mnt/c/Users/Sagou/Desktop/MemTool Home Atrium References" --> move to MemTool/References/
- BrainHub/MEMTOOL_OC2CO --> move to MemTool/ (or its contents to appropriate sub)
- Any memtool related in canva_exports (e.g. OC2CO_CARD_MEMTOOL... ) --> to MemTool/Assets/ or Images but since app, Assets/
- sellthis_v2/ --> to SellThis/
- Any sellthis images in canva (OC2CO_CARD_SELLTHIS...) --> to SellThis/Assets/
- .grok/agents/memtool-universe.md --> to MemTool/Documents/
- Other scattered memtool (from finds: in evolution/polsia_memtool, command_center gitleaks, etc.) --> move relevant to MemTool/Documents or note if duplicate/stale.
- Chrome PWA or AppData memtool if not system: note or copy icon to Assets/
- Temp memtool-*.js files: if they are source components, move to MemTool/Code/ ; otherwise leave in temp or note.

**Steps for agent:**
1. Verify/create the target subfolders under BBWAAS/App_Store_Apps/
2. Locate all mentioned sources using tools.
3. Move (file away) the main folders/files to the target subs, preserving names where possible.
4. For images, put in Assets/ or specific.
5. Create or update README.md in MemTool/ and SellThis/ explaining the contents and organization.
6. Update any symlinks if needed, but prioritize moving data.
7. Report: list what was moved, from where to where, any duplicates found, issues, what needs user input (e.g. confirm move vs copy, additional locations).

**Success Criteria:** All MemTool and SellThis work is now under App_Store_Apps/ in labeled subs. No scattering.

**Focus only on this to avoid confusion. Report back findings and completed moves.**