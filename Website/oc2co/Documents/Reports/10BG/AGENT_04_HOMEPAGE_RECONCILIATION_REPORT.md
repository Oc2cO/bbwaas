# AGENT_04_HOMEPAGE_RECONCILIATION_REPORT

**AGENT:** AGENT 4 — HOMEPAGE / LANDING PAGE RECONCILIATION AGENT for the OC2CO website wiring audit  
**TASK:** Reconcile the current GitHub homepage, the intro video, and the preferred Polsia-style landing page. Inspect specified locations, determine GitHub vs preferred alignment, Polsia landing source existence, and provide exact patch plan for **ONE canonical homepage only**. Do not create a second landing page. Homepage fixes only.  
**DATE:** 2026-06-27  
**STATUS:** ANALYSIS COMPLETE — PATCH PLAN PROVIDED (no code changes executed; read-only inspection + report only)  

---

## INSPECTED ARTIFACTS (with absolute paths and proof excerpts)

### 1. Local Homepage Source (preferred / evolved state)
- **Path:** `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/index.html`
- **Hero / Copy (current):**
  ```html
  <header class="hero">
    <div class="hero-content">
      <div class="logo">Oc2cO</div>
      <h1>Organized chaos. Built into tools, memory, and living systems.</h1>
      <p>Oc2cO is a creative technology lab building AI-assisted apps, tools, memory systems, and visual product worlds.</p>
    </div>
  </header>
  ```
- **Intro Video (inline):**
  ```html
  <section class="intro-media container">
    <video controls muted playsinline preload="metadata" style="width:100%; max-width:820px; border-radius:12px; border:1px solid var(--border); display:block; margin:0 auto;">
      <source src="oc2co_intro_silent.mp4" type="video/mp4">
    </video>
    <div style="text-align:center; margin-top:8px; font-size:0.8rem; color:var(--text-dim);">
      <a href="intro-animation.html" style="color:var(--cyan);">View Intro Animation</a>
    </div>
  </section>
  ```
- **Feature Cards:**
  - Build Systems
  - Memory Tools
  - Product Worlds
- **Nav:** Home (self), Store/Arcade (https://oc2coos-2.polsia.app/...), Projects/Connect (anchors)
- **Parked CTAs + SellThis:** Links to Polsia store; others show "Coming soon" / "Parked" toasts.
- **Background:** `.ocean-night-scene` (V2A base + V2B celestial: sky, stars, clouds, horizon, water/waves, shore, biolum, sky-glow, celestial-world planet with emblem, moon1/moon2, constellations).
- **Supporting files:** `style.css` (full V2 ocean + celestial + glass cards + parked + visibility z-index fixes), `script.js` (parked toasts + static stars init).

**Backups present (old state):** `index.html.bak`, `index.html.pre-cinematic.bak` (both "Build. Ship. Evolve." monolithic).

### 2. GitHub Repo State (current homepage on main + branches)
- **Repo:** https://github.com/Oc2cO/-oc2co (CNAME: www.oc2co.com; Pages source: main / via enable_pages.sh)
- **Main branch raw index.html (https://raw.githubusercontent.com/Oc2cO/-oc2co/main/index.html):** Monolithic self-contained old version.
  - Title: "Oc2cO — Build. Ship. Evolve."
  - Fullscreen autoplay hero video wrapper (`#hero-video-wrapper` with `oc2co_intro.mp4`, Skip Intro → button, fade-out logic).
  - Nav: relative links (store/, arcade/, #projects, #connect).
  - Hero: "Build. Ship. Evolve." + update badge.
  - Structure: Projects section with glass cards (🧠 MemTool IN DEVELOPMENT, 💼 SellThis COMING SOON, 🌐 Oc2cO Website LIVE) + detailed stack/features/tags/links.
  - Cinematic overlays: film grain (`body::after`), particles canvas, scroll progress.
  - No `.ocean-night-scene`, no "Organized chaos" copy, no feature cards, no Polsia absolute links in main nav, no parked-row.
  - Includes `<script src="tools/cinematic-layer.js">` + inline JS.
- **Live deployed:** https://www.oc2co.com renders the above old version (confirmed via content fetch matching "Build. Ship. Evolve.", project cards, relative links).
- **Other branches inspected (raw):**
  - `visual-system-canva-01`: Still old "Build. Ship. Evolve." monolithic (minor nav/CTA diffs).
  - `oc2co-route-video-home-fix-01`: Still old monolithic with fullscreen video.
  - No branch contains the local V2 ocean/index.html + style.css + script.js structure.
- **Repo files note:** No root `style.css` or `script.js` on main (all inline in index.html). Videos and subdirs (cinematic/, store/, etc.) present. No separate Polsia landing HTML.

**GitHub vs Local delta summary (proof via direct fetches + local reads):**
- Background: None/cinematic grain vs full fixed ocean-night-scene + celestial layers (V2B alive atmosphere).
- Hero text + structure: "Build. Ship. Evolve." + projects list vs "Organized chaos..." + 3 feature cards + inline video + parked buttons.
- Video: Fullscreen intro overlay (oc2co_intro.mp4) vs inline framed `oc2co_intro_silent.mp4`.
- Links: Relative/broken in context of Polsia split vs absolute https://oc2coos-2.polsia.app for Store/Arcade.
- CSS/JS: Inline monolithic cinematic vs external modular + ocean CSS + parked logic.
- Visual evolution: Pre-V1/V2 vs post-V1 landing + V2A ocean base + V2B celestial + visibility repair + Polsia linking.

### 3. Reports in `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Documents/Reports/`
- `OC2CO_LANDING_PAGE_V1_REPORT.md`: Documents V1 restructure (dark premium cosmic → self-contained; old full content moved to APPENDIX). Later evolved.
- `OC2CO_WEBSITE_V2A_OCEAN_BASE_REPORT.md`: Added `.ocean-night-scene` CSS foundation (sky, stars, clouds, water/waves, shore) over prior content. Preserved hero/cards/video.
- `OC2CO_WEBSITE_V2B_ALIVE_ATMOSPHERE_REPORT.md`: Incremental celestial layers (planet/emblem, moons, constellations, sky-glow, biolum enhancements). All animations slow/restrained.
- `OC2CO_WEBSITE_V2B_VISIBILITY_REPAIR_REPORT.md`: Z-index/body transparent fixes, size/opacity boosts for visibility of ocean/celestial. Confirmed content (hero text, feature cards, intro video, parked, Polsia CTA) on top at z-10.
- `OC2CO_POLSIA_LINKING_REPORT.md`: Updated nav/SellThis to https://oc2coos-2.polsia.app/store etc. Static home preserved as visual shell; functional to Polsia. "No changes to style.css, script.js".
- `OC2CO_PAYMENT_HUB...`, `OC2CO_MEMTOOL...`, `BBWAAS_GROK_*_REPORT.md`: Reference the V2B ocean/celestial + "Organized chaos" hero + feature cards + Polsia routes as current state. Parked video size note (smaller inline preview preferred in future; not executed without approval).
- `10BG/`: Empty (target for this report).

**Key preserved in reports:** Exact hero text "Organized chaos. Built into tools, memory, and living systems.", feature cards ("Memory Tools"), inline video, ocean-night-scene + V2B celestial, Polsia links, parked buttons. Local Source matches post-V2B state.

### 4. Canva_Exports and Images/ for visual direction
- **Canva_Exports/ASSET_CATALOG_OC2CO_FINISHED_ASSETS_V01.md + README:** Specs only (no PNG/WEBP/SVG files).
- **Images/Heroes/OC2CO_HOME_HERO_COSMIC_ORIGIN_V02/README.md** (and siblings): 
  - "Homepage hero background. Premium organized chaos becoming structure. Cosmic origin with glassmorphic living-system energy. Trustworthy and futuristic."
  - "Dark cosmic but premium. Organized chaos → signal feeling. Protects text areas."
  - Sizes: 1920×1080 primary. "Behind hero content on index.html." Status: "Spec saved. Awaiting Steven selection." No actual image files.
- **Other:** OC2CO_LOGO_MARK_ORBITAL_2_V02, checkout eclipse ocean, liquid-glass cards, MemTool/SellThis cards — all README specs only. No exported assets in FS.
- **Alignment:** Canva hero description matches local V2 hero copy ("Organized chaos") and glassmorphic + ocean cosmic mood (current pure-CSS implementation of the direction).

### 5. Polsia landing references (documents, reports, BBWAAS, Source)
- `OC2CO_POLSIA_LINKING_REPORT.md` + Alignment/*.md + multiple reports/packets: Polsia (https://oc2coos-2.polsia.app) hosts **functional** Store, Arcade, Checkout (Stripe/Neon/RevenueCat backend). Static homepage (www.oc2co.com) is visual shell only.
  - Explicit: "Polsia (at https://oc2coos-2.polsia.app) serves the live Store, Arcade, Checkout with backend."
  - Home links to static; Store/Arcade/SellThis delegate to Polsia absolute URLs.
  - No "Polsia landing page" HTML/source described or present.
- Source subdirs (store/, arcade/ etc.): Placeholder/dev copies only (actual served from Polsia).
- No references to a separate "Polsia-style landing page" source (HTML/CSS) for homepage itself. "Polsia-style" = integrated routing + visual consistency with Polsia-hosted apps (premium, trustworthy).
- GitHub fetches and local searches: No Polsia-hosted landing source found (only linking + visual shell).

### 6. Intro Video Assets
- Local Source: `oc2co_intro.mp4` (full), `oc2co_intro_silent.mp4` (inline use), animation/ clips, intro-animation.html.
- GitHub/main: `oc2co_intro.mp4` (fullscreen hero).
- Reports note: Video too large for hero in some contexts; future "smaller preview, framed inline, expand option, preserve asset, premium" parked (per BBWAAS_GROK_RULE_01 and PAYMENT_HUB reports). Local V2 uses inline silent version.

---

## DETERMINATIONS

**Does current GitHub homepage have enough of the preferred look?**  
**No.** It is the pre-V1 / cinematic "Build. Ship. Evolve." monolithic version (fullscreen video + projects list + grain/particles). It lacks:
- V2 ocean-night-scene + V2B celestial alive atmosphere (core visual direction post V2A/V2B/visibility reports).
- Updated hero copy and feature-card structure ("Organized chaos..." + Build/Memory/Product Worlds).
- Inline video integration (vs fullscreen intro trap).
- Polsia-consistent navigation and parked-button UX.
- Modular CSS/JS + visibility fixes.
- Alignment with Canva OC2CO_HOME_HERO_COSMIC_ORIGIN_V02 specs (glassmorphic cosmic origin).

Live www.oc2co.com and all inspected branches reflect this outdated state. Local Source is post-evolution (V1 landing restructure + V2 series + Polsia linking).

**What needs reconciliation?**  
- Sync GitHub main (deploy source) to match local canonical V2 state (one homepage).
- Ensure intro video handling matches preferred inline + silent version.
- Align Polsia links/nav (already in local).
- Visuals: Canva hero specs ready for future image layer integration (currently pure CSS ocean approximates the direction).
- No drift to cinematic/old projects-list or creation of duplicate landing.

**Whether source for Polsia landing exists locally or only visuals?**  
**Only visuals (specs); no source.** 
- No Polsia landing page HTML/CSS/JS source found in local Source/, GitHub, Canva_Exports, Images/, or any reports/packets.
- Polsia references are exclusively **linking/integration** (delegation of /store /arcade /checkout to https://oc2coos-2.polsia.app) and visual catalog (Canva specs for shared ocean/glass/cosmic language).
- Homepage source is exclusively the static oc2co_website (local Source + GitHub). Polsia provides the functional app layer, not a homepage/landing source.

**Preferred look summary (from evolution + visuals):**  
Local Source/index.html + style.css (V2 ocean night base + alive celestial + glassmorphic feature cards + "Organized chaos" hero + inline silent video + Polsia links + parked). Matches Canva hero direction ("organized chaos becoming structure... glassmorphic"), V2 reports, and Polsia-split architecture. This is the ONE canonical.

---

## EXACT PATCH PLAN FOR ONE CANONICAL HOMEPAGE (Homepage Only — Do Not Touch Anything Else)

**Canonical source of truth:** `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/index.html` + `style.css` + `script.js` + `oc2co_intro_silent.mp4` (and supporting oc2co_intro.mp4, intro-animation.html, CNAME, etc. as-is).

**Goal:** Make GitHub main (and Pages deploy) identical to local canonical. No new landing page. No changes to store/arcade/checkout subpages, cinematic/, tools/, agw/, payments, backend, etc. Homepage only.

**Recommended fix steps (in order; all homepage-scoped):**

1. **Sync core homepage files to GitHub main:**
   - Replace `index.html` on main with exact content from local Source `index.html` (ocean scene container, hero "Organized chaos...", inline video section with silent.mp4, feature cards, parked-row with Polsia SellThis, Polsia nav, footer).
   - Add/replace `style.css` (full V2 ocean + V2B celestial + glass + parked + visibility z-10 fixes + responsive).
   - Add/replace `script.js` (parked toast logic + stars init for ocean).
   - Commit with message referencing V2B + Polsia linking reconciliation.

2. **Video / intro handling (homepage only):**
   - Ensure `oc2co_intro_silent.mp4` is present at repo root for inline use.
   - Keep `oc2co_intro.mp4` for cinematic/ or other (do not alter fullscreen logic elsewhere).
   - Optionally update intro link or poster if needed for homepage (per parked notes in reports: prefer framed inline).

3. **Polsia integration on homepage:**
   - Confirm nav and SellThis button use exact `https://oc2coos-2.polsia.app/store` and `/arcade` (already in local).
   - Update any homepage-only references (e.g., footer, if present) to match POLSIA_LINKING_REPORT.

4. **Visual direction / Canva assets (homepage hero only):**
   - Current CSS ocean + celestial approximates OC2CO_HOME_HERO_COSMIC_ORIGIN_V02 ("organized chaos... glassmorphic... cosmic origin").
   - When Steven selects/export final from Canva: add as `background-image` layer in `.ocean-night-scene` or hero (low z, pointer-events:none, text-protect via existing z-10 + shadows). Do not replace entire scene without approval.
   - Update Images/Heroes/.../README.md post-export if files added. Test readability.
   - No other pages (store hero etc.) touched.

5. **GitHub/Pages specifics (homepage deploy):**
   - Verify `CNAME` = "www.oc2co.com".
   - Run/test `enable_pages.sh` logic or manual Pages settings (main / root).
   - After push: confirm https://www.oc2co.com renders exact local file:// experience (ocean visible first viewport, readable hero/cards/video, Polsia links work, no fullscreen video overlay).
   - Branches: If a specific branch is Pages source, sync it too (or merge main). Document in report/packet.
   - No DNS/Cloudflare changes.

6. **Preservation & safety (strict):**
   - Preserve all V2B ocean/celestial exactly.
   - Preserve exact hero text, feature cards, video section, parked buttons, Polsia URLs.
   - No new content, no second landing, no cinematic re-introduction on homepage.
   - No edits to subpages, backend, agw packets, videos beyond homepage usage, or non-home files.
   - No secrets, deploys in this plan execution (recommend manual after review).

7. **Verification checklist (post-patch, homepage only):**
   - Local file:///.../index.html == live www.oc2co.com (hero, video inline, ocean scene visible behind z-10 content, cards, nav).
   - GitHub main index.html + style.css + script.js match local Source.
   - Polsia Store/Arcade clicks from homepage succeed.
   - Mobile responsive (existing media queries).
   - No regression to old "Build. Ship. Evolve." or projects-list structure.
   - Canva hero spec cross-ref noted (future image layer).

8. **Rollback / appendix:** Keep .bak files or commit old monolithic as tag/branch if needed. Full prior GitHub content can be referenced via raw history.

**Proof of plan inputs (this report only):** Direct raw GitHub fetches (main + branches), live site fetch, full local file reads (index.html, style.css partials with ocean/V2B rules, script.js), dir listings (Canva/Images only READMEs), grep across Reports/Documents for Polsia/hero/video/ocean, branch list.

**No second landing:** All work targets single canonical (the V2 ocean local state) on www.oc2co.com.

---

## NEXT RECOMMENDED ACTIONS (after this report)
- Steven review/approval of canonical (local V2 vs any Canva export preference).
- Execute patch plan (homepage files only) + test.
- Create BBWAAS packet in agw/AGENT_WORKSPACE/PACKETS/ summarizing this reconciliation (per rules in prior reports).
- If video patch (inline refinement) approved explicitly: smaller framed preview only on homepage.
- Future: Integrate selected Canva hero image as layer.
- Monitor live after deploy for visibility (per V2B_VISIBILITY_REPAIR).

**EVIDENCE FILES (for cross-check):**
- This report saved at: `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Documents/Reports/10BG/AGENT_04_HOMEPAGE_RECONCILIATION_REPORT.md`
- Local canonical: `/mnt/c/Users/Sagou/Documents/BrainHub/BBWAAS/Website/oc2co/Source/oc2co_website/index.html`
- GitHub raw (old): https://raw.githubusercontent.com/Oc2cO/-oc2co/main/index.html
- Key reports: OC2CO_LANDING_PAGE_V1_REPORT.md, OC2CO_WEBSITE_V2*_*.md, OC2CO_POLSIA_LINKING_REPORT.md
- Visual specs: `Images/Heroes/OC2CO_HOME_HERO_COSMIC_ORIGIN_V02/README.md` + Canva_Exports/ASSET_CATALOG...

**RETURN: PATCH PLAN READY — ONE CANONICAL (local V2 ocean / organized chaos) confirmed as preferred. GitHub requires full homepage sync. No Polsia landing source exists (visuals + linking only).**

---

## APPENDIX: KEY LOCAL CANONICAL EXCERPTS (for patch reference)

(Full files readable at paths above; excerpts for verification.)

**index.html (abridged canonical hero + video + cards):**
[see INSPECTED ARTIFACTS section 1 above]

**style.css key V2 sections (ocean + celestial + fixes):**
- .ocean-night-scene { position:fixed; inset:0; z-index:1; ... }
- Full sky / stars / cloud / horizon / water / wave / shore / biolum / celestial-world / moon / constellations / sky-glow rules (V2A + V2B).
- Visibility: .hero-content, .features etc. { z-index:10; opacity:1 !important; }
- Glass cards, parked-btn, responsive.

**script.js:** Parked toast + ocean stars box-shadow population.

**GitHub old contrast (abridged from raw):** Fullscreen #hero-video-wrapper + "Build. Ship. Evolve." + .section projects glass cards + cinematic grain + particles.

All proof from direct tool reads/fetches on 2026-06-27. No assumptions.

**END OF REPORT**