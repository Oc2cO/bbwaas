# OC2CO LANDING VISUAL UPGRADE — 10BG SYNTHESIS

**Date:** 2026-06-27  
**Source:** Gated packet `agw/PACKETS/GROK_OC2CO_LANDING_VISUAL_10BG_PACKET_2026-06-27.md` on branch `oc2co-route-video-home-fix-01` (Oc2cO/-oc2co)  
**Mode:** RESEARCH / VISUAL CAPTURE / SYNTHESIS / PATCH-PLAN ONLY. No patch executed.  
**10BG Agents:** Spawned (IDs: 019f0bb1-573e-7780-98f6-0f392371766e ... 019f0bb1-982f-7ee3-999a-e857ad171c58). Outputs from Agents 1 (live site), 6 (routes), 7 (layout), 8 (motion) + partial 2/5 + live fetches, GitHub tree, local canonical (BBWAAS/Website/oc2co/Source/oc2co_website/), Polsia ZIP extract, Canva catalog used as truth.  
**Key directive followed:** Do not redo broad inventory. Finish visuals. Use public site, mem-tool.polsia.app/*, Canva, ZIP, canonical source. No DNS/Cloudflare/Stripe/.env/private/BrainHub/main touches.

---

## 1. Final target identity

Premium, futuristic, organized-chaos front door. Dark cosmic / quasar navy (#060A14 / #0A0F1E / #070D1A), vivid cyan (#64D4FF / #00E5FF), teal accents, gold/amber Oc2cO (#FBBF24 / #FFB300) highlights. Glassmorphic cards (backdrop-filter blur 16-22px, rgba glass, cyan border glows, subtle radial refraction). Living ocean-night celestial background (V2B sky/stars/clouds/moons/constellations + biolum water waves) as persistent foundation. App-dashboard energy: emoji/icon rich, clean cards, progress/streaks, category pills. Public-trust polish. Not portfolio list. Not childish. "Organized chaos. Commanded into tools." / "Build. Ship. Evolve." hybrid headline. All functional depth delegated to live `https://mem-tool.polsia.app/`.

Visual sources of truth:
- Live Polsia app: dark navy cards, cyan/teal, Quick Capture, Games, Progress, Upgrade modal.
- Branch video home (oc2co-route-video-home-fix-01): full-bleed intro video + skip, glass project cards, particles/grain/scroll progress.
- Canonical source ocean + celestial layers + glass vars.
- Canva catalog: OC2CO_HOME_HERO_COSMIC_ORIGIN_V02, OC2CO_CHECKOUT_BG_ECLIPSE_BIOLUMINESCENT_OCEAN_V01, OC2CO_CARD_MEMTOOL_MEMORY_ATRIUM_V02, OC2CO_STORE_HERO_SECURE_GLASS_V02, liquid glass checkout card/button.

---

## 2. Current site problems

- **Live vs source drift (critical):** Live `www.oc2co.com/` shows project-list (MemTool IN DEV, SellThis SOON, Website LIVE with status badges) matching old bak. Branch/source on fix-01 and local has richer video-intro + ocean-night + glass but not deployed to home. Cinematic page strongest premium example (grain, scrub, glass).
- Portfolio-list feel on main: rigid cards, repetitive "under construction", weak living motion. No rich MemTool/Store/Arcade previews.
- Store/Arcade/Checkout skeletons use inline styles, parked labels, "pending"/"not connected". No Polsia delegation CTAs prominent.
- Missing Polsia visual fidelity: no Quick Capture panels, no category pills, no game grid, no progress stats on public landing.
- Limited glassmorphic + cosmic on primary home; yellow accents weak; ocean layers not surfaced.
- Checkout/community: placeholder only — "Not connected", "Secure by Stripe" but no real flow. HOLD needed.
- Nav/footers functional but not premium command rail with glass.
- Subpage drift: arcade/store basic vs rich Polsia game/store UI.

Evidence: Agent 1 output, web_fetch on oc2co.com + mem-tool.polsia.app/*, GitHub tree + file contents on branch, local canonical read, ZIP public/index.html snippet.

---

## 3. Polsia/MemTool visual source of truth

https://mem-tool.polsia.app/ (and /store, /games.html):
- Dark quasar: --bg-deep #060A14, --bg-navy #0A0F1E, --bg-card rgba(13,20,40,0.85), --cyan #00E5FF / teal #00D4AA / purple #7B61FF / amber #FFB300.
- Hero/nav: Logo + "Organize Chaos", Guest/Sign In, "Shop Oc2cO Store →".
- Core cards: QUICK CAPTURE (+), Log a Call (📞), Wellness (💗), Streak counter, Today, Daily Boost/AI Insight.
- Archive: tabs All/Ideas/Notes/Memories/Tasks/Random/Starred.
- Brain Games: 5+ (Mind Sync, Neural Recall, Cortex Grid, 24 Game, Memory Match, + Simon/Sudoku/Picture Scramble). Leaderboards.
- Progress: Total Memories, Streaks, Brain Score, Weekly Activity, Game Performance, Achievements (Bronze+), Upgrade to Pro $4.99/mo modal (unlimited, all games, AI recaps).
- Store (/store): "Curated Gear for Focused Minds", category pills (All | Featured | Tech/Tools | Home/Useful | Creative/Visual | Coming Soon). "Checkout being set up".
- Games (/games.html): 7 game list with icons/descriptions + global rankings.
- Community (/chat): Live chat skeleton (HOLD).
- UI: Inter + Orbitron, glass cards, emoji icons, clean tabs, modals, guest mode supported. High polish app-dashboard.

ZIP extract confirms public/index.html + game htmls + subscription pages match.

---

## 4. Canva visual source of truth

Used search terms: Oc2cO, MemTool, SellThis, Cosmic Checkout, Dark Ocean Eclipse, liquid glass, hero, store, arcade, checkout.

From canonical catalog (ASSET_CATALOG_OC2CO_FINISHED_ASSETS_V01.md in Canva_Exports/):
- OC2CO_HOME_HERO_COSMIC_ORIGIN_V02 (1920x1080): Cosmic origin, glassmorphic living-system, dark premium trustworthy. For hero bg.
- OC2CO_CHECKOUT_BG_ECLIPSE_BIOLUMINESCENT_OCEAN_V01: Eclipse + biolum ocean, protected center for card readability. For trust/checkout bg.
- OC2CO_CARD_MEMTOOL_MEMORY_ATRIUM_V02 (1200x900): Soft cyan/blue glass, memory atrium, wise/caring.
- OC2CO_CARD_SELLTHIS_AI_LISTING_PACK_V02: Premium commerce listing.
- OC2CO_STORE_HERO_SECURE_GLASS_V02: Secure glass commerce, no fake badges.
- OC2CO_CHECKOUT_CARD_LIQUID_GLASS_V01 + OC2CO_CHECKOUT_BUTTON_ELECTRIC_TEXT_V01: Liquid glass card, quasar-blue morphic CTA, electric text, chrome refraction.
- OC2CO_LOGO_MARK_ORBITAL_2_V02: Orbital double-O mark.

Placement: layer behind (pointer-events none), protect text/CTA areas. Export WEBP/PNG + SVG for logos. Test readability on dark glass.

Canva MCP auth limited in session (transport/auth error); relied on exported catalog + local Images/ dirs + packet terms.

---

## 5. Asset list

**Core visual system assets (reference + plan):**
- Backgrounds: OC2CO_HOME_HERO_COSMIC_ORIGIN_V02, OC2CO_CHECKOUT_BG_ECLIPSE_BIOLUMINESCENT_OCEAN_V01, ocean-night-scene layers (current source), biolum water, celestial moons/constellations.
- Cards/Previews: OC2CO_CARD_MEMTOOL_MEMORY_ATRIUM_V02, OC2CO_CARD_SELLTHIS_AI_LISTING_PACK_V02, liquid glass checkout card.
- Buttons/CTAs: OC2CO_CHECKOUT_BUTTON_ELECTRIC_TEXT_V01 (electric flowing text).
- Logos: OC2CO_LOGO_MARK_ORBITAL_2_V02 + current text "Oc2cO".
- Video: oc2co_intro.mp4 + oc2co_intro_silent.mp4 (branch + source, muted/preload metadata, skip control).
- Particles/Grain: canvas particles (cinematic 25-38 low count), body grain (steps, screen blend, low opacity 0.022-0.032).
- UI: Emoji icons (🧠📞💗🎮 etc from Polsia), category pills, status badges (green/purple/amber/cyan).
- Local in Source: animation/, assets/, audio/vibe*, tools/cinematic-layer.* (grain/scrub/glass).

Placeholders in Images/ dirs for Canva exports. No direct files present beyond catalog metadata; use refs + generate/place later post-approval.

---

## 6. Final route map

**Primary public:** https://www.oc2co.com/ (GitHub Pages, CNAME www.oc2co.com)

**Delegation (only current live):**
- MemTool / Home: https://mem-tool.polsia.app/
- Store (shop): https://mem-tool.polsia.app/store
- Arcade / Games: https://mem-tool.polsia.app/games.html (or / via app entry)
- Community: https://mem-tool.polsia.app/chat (HOLD — skeleton)
- Checkout candidate: https://mem-tool.polsia.app/store/checkout?product=memtool-pro-12mo (HOLD — use for trust preview only)
- Pro upgrade: in-app modal $4.99/mo

**Static site subpages (relative, glass unified):**
- /store/ → request-access skeleton + checkout bridge link
- /arcade/ → prototype hub
- /checkout/ → preview (HOLD)
- /cinematic/ → brand film experience (keep/enhance)
- Anchors: #memtool, #store, #arcade, #community, #trust, #bbwaas

**Nav:** Sticky glass command rail. Home | MemTool | Store (polsia) | Arcade (polsia) | Orbit/Community (soft) | Trust/Checkout (soft).

No legacy oc2coos-2.polsia.app. All external open in new tab with rel noopener. Relative for site pages.

(Full from Agent 6 output.)

---

## 7. Landing page section-by-section blueprint

Follows Agent 7 + packet targets + Polsia fidelity + Canva cosmic glass + V2B ocean foundation (persistent low z).

1. **Sticky Nav** — glass blur, logo (orbital mark), links to #memtool / polsia store/arcade, CTA button.
2. **Hero / Command Front Door** — ocean-night + celestial bg, logo, headline "Organize your mind. Build your world.", sub "Living studio for memory tools, AI companions, mini-apps, games, agent systems.", inline preview-glass cards (MemTool/Store/Arcade), primary CTAs "Enter MemTool" / "Shop Store →" / "See Arcade →". Video teaser optional (link cinematic or small intro-media).
3. **MemTool Preview** — 4-col (responsive 1-2) glass cards: Quick Capture, Archive & Atrium, Games & Daily, Memora. Emojis/icons, meta, "Open MemTool →" to polsia.
4. **Store Preview** — pills row (All/Featured/Tools/...),  grid glass cards for SellThis, MemTool Pro, curated items. "Visit Store →" to polsia/store.
5. **Arcade Preview** — glass cards for game prototypes (24 Game etc mapped to polsia), "Play Arcade →".
6. **Community (soft)** — glass card "The Orbit", GitHub + soft links, "being wired".
7. **Checkout / Pro Trust** — 3 trust cards (secure, private, policies) using eclipse bg + liquid glass card refs. "Experience on Polsia", HOLD note + link candidate.
8. **BBWAAS / Agent-Built Proof** — public-safe glass card, "Proof-first", link to public static proof only.
9. **Footer** — brand, links (Home/MemTool/Store/Arcade/Privacy/Terms/GitHub), "Built proof-first by Oc2cO".

All on transparent content z-10+ over ocean scene. Glass everywhere. Responsive collapse. Inter + system.

Detailed HTML/CSS in Agent 7 output. Unify with branch video + current ocean CSS.

---

## 8. Button/link map

- Hero primary: <a href="https://mem-tool.polsia.app/">Open MemTool App →</a> (btn-primary grad)
- <a href="https://mem-tool.polsia.app/store" target="_blank">Shop Oc2cO Store →</a>
- <a href="https://mem-tool.polsia.app/games.html" target="_blank">See Arcade →</a>
- Nav: relative store/ arcade/ + # sections + polsia externals.
- Store cards: polsia links + static /checkout/ (HOLD).
- Arcade: polsia + static prototypes.
- Trust: polsia candidate + static /checkout/ HOLD.
- Footer + GitHub: https://github.com/Oc2cO / -oc2co
- All external: target=_blank rel="noopener"

No broken/legacy. Use polsia for functional.

---

## 9. Motion/animation plan

Lightweight, CSS-first per Agent 8:

- **Ocean foundation:** Preserve full (waves 13s+, clouds long drift, bio-shimmer, moons). Add will-change to waves.
- **Stars/Particles:** Static box-shadow (120) + light twinkle CSS. Optional canvas ≤25 slow particles (screen blend, rAF). Hero micro radial stars.
- **Logo/Orb pulse:** 5.5s scale+ glow on .logo + h1 gradient.
- **Glass hovers:** translateY(-5px) + border cyan glow + shadow lift (0.28s cubic).
- **Scroll reveals:** IntersectionObserver on sections, fade+translateY, stagger children.
- **Grain:** body::after subtle grid, 1.4s steps, low opacity, screen. Reduced gate.
- **Video:** Branch full-bleed intro + skip (auto 4s or click). Muted, controls on secondary intro-media. Cinematic for opt-in scrub.
- **Other:** Scroll progress thin top bar (grad). No heavy concurrent. All gated by prefers-reduced-motion (none transitions + static stars).

Extend script.js init + style.css (keyframes, .glass, .reveal-section, @media reduce). Ref cinematic-layer for grain/scrub.

Performance: low counts, GPU transforms, test 6x slowdown/Lighthouse.

---

## 10. Copy deck

- Logo: Oc2cO (orbital mark)
- Hero h1: "Organize your mind.<br>Build your world." or "Build. Ship. Evolve."
- Sub: "Oc2cO is a living studio for memory tools, AI companions, mini-apps, games, and agent-built systems. Proof-first."
- Section eyes: Memory System / Marketplace / Playground / The Orbit / Secure by design / Built with BBWAAS
- CTAs: "Enter MemTool" / "Open Store →" / "Play Arcade →" / "View on Store →"
- Trust: "Secure by Polsia + Stripe" / "256-bit SSL" / "Private & Intentional" / "Clear Policies"
- Footer: "Signal from chaos." "Built proof-first by Oc2cO" "© 2026"
- Badges: "Daily updates", status LIVE/IN DEV/SOON (green/purple/amber)
- MemTool cards: "Quick Capture", "Archive & Atrium", "Games & Daily Tip", "Memora"
- Store: "Curated Gear for Focused Minds", "Premium tools & experiences"

---

## 11. Safety/payment/privacy checks

**PASS (per packet + Agent 9 intent):**
- No private Polsia dashboard/BrainHub files/tokens/Stripe secrets/.env/wallets exposed.
- Checkout presented only as "candidate / HOLD / verify" with "being set up" + "experience lives on Polsia". No claims of live processing on public landing.
- Links to polsia/store/checkout candidate only for preview/trust.
- Privacy/Terms: referenced in footers (add /privacy /terms if missing on static; point to polsia or oc2co.com pages).
- Success/cancel: static pages exist in source (use for future).
- Public-safe only for BBWAAS proof section.
- Video/assets: no secrets.
- Glass layers / Canva: visual only, no data overlays on buttons/totals/product info.

**HOLD items marked:** Community /chat (skeleton), full checkout flow, Stripe connection. "Do not promote as primary CTA until verified."

**Do-not-touch enforced in plan:** DNS, Cloudflare, GitHub Pages config, secrets, private data, main branch.

Verification: grep for polsia legacy/secret patterns (none in current proposed), manual review of patch PR before Steven signoff.

---

## 12. Files to patch

**Target branch post-approval:** oc2co-landing-visual-upgrade-01 (from oc2co-route-video-home-fix-01 base or merge key video elements).

**Primary:**
- `index.html`: Replace/extend hero+projects with full section blueprint (nav + hero previews + memtool/store/arcade previews + trust + proof + footer). Keep video skip if desired or move to cinematic link. Add reveal classes.
- `style.css`: Extend root glass/cyan/grad vars, full ocean (preserve V2B), .glass / .glass-card / .preview-glass / pills / btn-primary / btn-glass, reveal keyframes, grain, reduced-motion, star twinkle, logo pulse, hover lifts. Integrate Canva bg notes as comments.
- `script.js`: Unify init (stars + parked if any + scroll reveals + light particles + progress + reduced guard). Add skip video handlers if kept.
- Subpages (unify style): store/index.html, arcade/index.html, checkout/index.html, cinematic/index.html — swap to consistent nav + glass cards + relative/polsia links. Add category pills to store.
- Optional: link tools/cinematic-layer.css/js for grain/scrub on home or keep inline. Add asset placeholders/comments for Canva images (e.g. hero bg url or CSS radial + later <img>).
- CNAME / enable_pages.sh / .git: untouched.
- New/updated: perhaps public-proof link in BBWAAS section.

**Patch strategy (exact plan):** Small focused diffs only. Test reduced motion, mobile, perf. Reversible. No secrets added. After Steven approves this synthesis, commit on upgrade branch. Then deploy to Pages for review.

---

## 13. Verification checklist

- [ ] All CTAs route correctly (polsia for app, relative for static subpages). No legacy domains.
- [ ] Visuals match: dark cosmic + cyan/yellow + glassmorphic + ocean/celestial + Polsia card language + Canva refs.
- [ ] Sections present and ordered per blueprint.
- [ ] Motion subtle, no jank, reduced-motion passes (prefers-reduced-motion test).
- [ ] No secrets/private data (grep .env, keys, brain paths, polsia dashboard).
- [ ] Checkout/Community marked HOLD with clear notes.
- [ ] Responsive: desktop 4-col previews → mobile stack/scroll. Nav collapses.
- [ ] Accessibility: contrast, aria, focus visible, alt where assets.
- [ ] Perf: Lighthouse mobile/desktop (LCP, CLS low; particles/grain minimal). Video metadata only.
- [ ] Cross browser: Chrome/Firefox/Safari (glass blur, gradients).
- [ ] Content: copy deck exact, no overclaims.
- [ ] Deploy check: live after patch matches this synthesis (compare to current live problems).
- [ ] Screenshot proof: capture home + sections vs Polsia refs + Canva catalog.

Run manual + agent re-verify post patch (pre Steven final).

---

## 14. Approval gates

1. **This synthesis** reviewed by Steven (exact layout, visuals, routes, motion, safety, patch plan).
2. **Steven explicit approval** (comment or signal) before any code edit/push.
3. **Patch only on new branch** `oc2co-landing-visual-upgrade-01` (never direct to main, never this branch without review).
4. **Post-patch:** Deploy Pages, full verification checklist run, screenshots compared to synthesis + Polsia/Canva.
5. **No merge to main** or DNS/Infra changes without further Steven signoff.

**Next step after approval:** Orchestrator applies exact edits via search_replace or PR to upgrade branch. Re-run 10BG or spot checks for diff review.

---

**End of 10BG Synthesis.**  
All work proof-first, public-safe, visual-source aligned. Ready for Steven review. No patches applied in this session.

(Agents 1/6/7/8 full outputs incorporated. Others contributed via partial + main research. Canva limited by auth; catalog authoritative.)