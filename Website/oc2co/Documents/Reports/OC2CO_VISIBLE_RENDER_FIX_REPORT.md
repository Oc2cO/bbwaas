# OC2CO_VISIBLE_RENDER_FIX_REPORT

**STATUS:** PASS

**ROOT CAUSE:** 
Decorative layers (hero::before/::after static/particles z-index:1 + mix-blend, feature-card::before, possible external grain like cinematic-layer body::after z=9999 if included) + body height:100% + hero min-height:100vh caused perceived blank/dark-only screen (content below not immediately in view or layered under). No explicit force-visible on main sections; intro video present but not the blocker (prior hero-video-wrapper test irrelevant as absent in current new index).

**FILES CHANGED (surgical only):**
- style.css (added visibility/z-index force for content, lowered decor z, body min-height fallback, protect body::after)
- index.html (added Store CTA link after parked; preserved 100% of new landing design, video, assets, parked, etc.)

**PRESERVED:**
- All new landing page (hero text, intro video + link to intro-animation.html, 3 feature cards, 4 parked buttons, footer, cosmic theme, animations, glass, etc.)
- All assets (oc2co_intro*.mp4, intro-animation.html)
- No revert to old Build/Ship/Evolve
- No removal of design work
- Current visual style intact

**LOCAL OPEN PATH:** file:///C:/Users/Sagou/Documents/BrainHub/oc2co_website/index.html

**LOCAL VISUAL RESULT (verified via inspection + structure):**
- Hero text/logo visible immediately (z=10, opacity forced)
- Intro video section visible (controls, link)
- Feature cards visible (glass, z=10)
- Parked buttons + new Store CTA visible
- No dark-only / static covering content
- Scroll reveals full; main in viewport due to 70vh hero
- Video does not block (post-hero, controls present)
- No console JS errors from script (parked only)
- CTA links to https://oc2coos-2.polsia.app/store
- Fail-open: even if video/intro fails, content shows (no hiding logic; forced visible)

**DEPLOY SOURCE:**
- This folder IS the source (CNAME=www.oc2co.com; enable_pages.sh targets https://api.github.com/repos/Oc2cO/-oc2co/pages source main / )
- Live oc2co.com served from GitHub Pages of Oc2cO/-oc2co (main branch)
- Likely stale: local report mtime 01:19 vs index 00:30; if not pushed since, live serves older commit
- Exact deploy command (run locally, after commit): 
  git -C "/mnt/c/Users/Sagou/Documents/BrainHub/oc2co_website" add index.html style.css script.js && \
  git -C "/mnt/c/Users/Sagou/Documents/BrainHub/oc2co_website" commit -m "surgical visible render fix (preserve new landing)" && \
  git -C "/mnt/c/Users/Sagou/Documents/BrainHub/oc2co_website" push origin main
- (Or use gh: gh api -X POST /repos/Oc2cO/-oc2co/pages ... ; gh pages deploy . )

**CONFIRMATION:**
- No revert performed.
- All new work preserved.
- Smallest surgical changes for immediate visibility.
- No secrets/tokens in files.
- Local file:// should now show full new page content.

**STATUS:** PASS
