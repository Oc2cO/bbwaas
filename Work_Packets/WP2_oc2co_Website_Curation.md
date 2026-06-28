# Work Packet 2: oc2co Website Build and Images Curation (Website Branch)

**Agent Focus:** Only this packet. Do not touch App_Store_Apps.

**Goal:** Create folder specific to oc2co website build under BBWAAS/Website/oc2co/ with organized subs. File away all related source, images, documents.

**Target Structure:**
- BBWAAS/Website/oc2co/
  - Images/
    - Buttons/
    - Heroes/
    - Cards/
    - Logos/
    - Backgrounds/
    - MemTool/ (if oc2co uses memtool visuals)
    - SellThis/ (if used)
    - Other/
  - Source/
    - oc2co_website/ (the full build folder or its contents: index.html, style, script, subfolders like arcade, store, assets/)
  - Documents/
    - Reports/ (all the OC2CO_*_REPORT.md )
    - Alignment/ (packets, etc.)
  - Subdomains/
    - arcade/
    - store/
    - checkout/
    - success/
    - cancel/
    - cinematic/
    - etc.
  - Assets/
  - Canva_Exports/ (the asset catalog and source image folders)

**Sources to locate and move:**
- BrainHub/oc2co_website/ --> move to Source/ or keep structure under Source/oc2co_website/
- BrainHub/canva_exports/ all OC2CO_* folders and ASSET_CATALOG_OC2CO...md --> move the image folders to Images/ with appropriate sub (e.g. OC2CO_HOME_HERO_COSMIC_ORIGIN_V02 to Heroes/, OC2CO_CHECKOUT_BUTTON... to Buttons/, OC2CO_CARD_MEMTOOL to Cards/MemTool/ or Images/MemTool/, OC2CO_LOGO to Logos/, etc. )
- Any images in oc2co_website/assets/ (cards, logos, visuals) --> to Images/ subs.
- All the OC2CO_*_REPORT.md in oc2co_website/ and BrainHub/ --> to Documents/Reports/
- Other documents related to website build (alignment packets mentioning website, V2B, etc.) --> Documents/
- Sub domain folders if separate (arcade, store etc inside the source or move contents to Subdomains/)
- Any other oc2co images from finds (AppData, temp, etc.) --> Images/ if relevant (e.g. the OC2CO IMAGES.png in PhotosAppBackground)

**Steps:**
1. Verify/create the full target sub tree under BBWAAS/Website/oc2co/
2. Locate sources using list_dir and terminal find/ls.
3. Move the main oc2co_website folder to Source/oc2co_website/
4. Curate and move the canva OC2CO image folders into the Images/ categorized subs. Rename or keep original folder names inside subs for traceability.
5. Move reports and docs to Documents/Reports/
6. If subfolders like arcade exist separate, move or symlink to Subdomains/
7. Create README.md in oc2co/ and each major sub (Images, Source, Documents) explaining contents, how images are categorized (page/button etc.), and the save format.
8. Clean any duplicates if found during move (e.g. same image in multiple places - keep one in Images/, note).
9. Report: detailed list of moves (from -> to), categories used for images, any issues (e.g. permission, what to do with system files like Chrome PWA), suggestions for subdomains integration.

**Success:** oc2co website has its dedicated branch with images organized (including page/button etc.), source intact, docs filed. All oc2co made visuals under one place.

**Focus only on oc2co website branch to stay least confusion. Use tools for locate and file away.**