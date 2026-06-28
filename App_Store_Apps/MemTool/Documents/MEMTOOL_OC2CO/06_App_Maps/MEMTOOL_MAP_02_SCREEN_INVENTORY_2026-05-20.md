\*\*A. Repo Proof\*\*



Repo: `C:\\Users\\Sagou\\memtool-upload`  

Branch proof: `## mobile-app...origin/mobile-app`  

Latest commit: `6634dbc docs: sync home atrium narrowed checkpoint`  

MAP-01 / Brain Sync / SOT pointer were read successfully. No files changed.



\*\*B. Screen Inventory Checklist\*\*



Legend: `confirmed from file`, `needs screenshot proof`, `needs device proof`, `later visual lane`, `later code lane`



| Portal | Screens / routes | Current labels |

| --- | --- | --- |

| Home / Memory Atrium | `app\\(app)\\(tabs)\\index.tsx` | confirmed from file; needs screenshot proof; later visual lane |

| Capture | `app\\(app)\\capture.tsx`, `app\\(app)\\log-call.tsx` | confirmed from file; needs screenshot proof; needs device proof for camera/photo; later code lane |

| Voice Capture | `app\\(app)\\voice-capture.tsx` | confirmed from file; needs screenshot proof; needs device proof for mic/speech/live activity; later visual lane |

| MeMChat / Memora | `app\\(app)\\ai-guide.tsx`, `app\\(app)\\(tabs)\\ai-guide.tsx` | confirmed from file; needs screenshot proof; later visual lane |

| Archive / Journal | `app\\(app)\\(tabs)\\archive.tsx` | confirmed from file; needs screenshot proof; later visual lane |

| Photo viewer | `app\\(app)\\photo\\\[clientId].tsx` | confirmed from file; needs screenshot proof; needs seeded memory/photo proof |

| Recap | `app\\(app)\\recap.tsx` | confirmed from file; needs screenshot proof; needs device proof for calendar permission |

| Games | `app\\(app)\\memory-match.tsx`, `app\\(app)\\game-24.tsx` | confirmed from file; needs screenshot proof; later visual lane |

| Progress / Skills | `app\\(app)\\(tabs)\\progress.tsx`, `app\\(app)\\skills\\\*.tsx` | confirmed from file; needs screenshot proof; later code lane for entitlement behavior |

| Settings | `app\\(app)\\(tabs)\\settings.tsx` | confirmed from file; needs screenshot proof; needs device proof for haptics/audio/export |

| Profile / Edit Profile | `app\\(app)\\edit-profile.tsx` | confirmed from file; needs screenshot proof; later code lane for profile behavior |

| Onboarding / Auth | `app\\login.tsx`, `app\\forgot-password.tsx`, `app\\onboarding.tsx`, `app\\onboarding-chat.tsx` | confirmed from file; needs screenshot proof; needs device/auth proof |

| Subscription | `app\\(app)\\subscription.tsx` | confirmed from file; needs screenshot proof; needs device proof; do not trigger purchases |

| Support / About / Licenses | `app\\(app)\\support.tsx`, `app\\(app)\\about.tsx`, `app\\(app)\\licenses.tsx` | confirmed from file; needs screenshot proof |



\*\*C. Screenshot Capture Plan\*\*



1\. Capture authenticated app shell first: Home, Archive, Progress, Mem, Settings.

2\. Capture stack/modal routes from safe navigation only: Capture, Voice Capture idle state, Recap, Games level-select screens, Skills home/paywall view, Subscription view.

3\. Capture account/onboarding separately to avoid disturbing the active logged-in state: Login, Signup mode, Forgot Password, Onboarding intro, Onboarding Chat.

4\. Device-only proof should be a separate pass: mic, camera, calendar permission, haptics, RevenueCat/App Store purchase surface. Do not test purchases or backend mutations in this lane.

5\. Avoid destructive or cost-bearing actions: no delete, no export share unless approved, no purchase, no illustration generation, no upload, no API-triggering experiments beyond normal screen load.



\*\*D. What Each Screenshot Should Prove\*\*



\- Home: current V1 Memory Atrium doorway structure exists and routes are visible.

\- Capture: text/photo/voice/log-call entry points are visible.

\- Voice Capture: voice modal state and unavailable/idle handling are visible.

\- MeMChat: Memora/chat surface exists without redesign proof.

\- Archive: memory list/search/filter/sync UI exists.

\- Photo viewer: full-screen memory photo route exists when seeded.

\- Recap: today/week/month/custom structure and mood/streak areas exist.

\- Games: Memory Match and 24 Game entry/level-select states exist.

\- Progress / Skills: stats, learning tiles, skills/paywall surfaces exist.

\- Settings: profile, privacy/export, haptics, captions, cognitive audio, support links exist.

\- Profile: editable profile surface exists.

\- Onboarding/Auth: login/signup/reset/onboarding flow exists.

\- Subscription: Pro paywall/manage/restore surface exists without purchase action.

\- Support/About/Licenses: compliance/support surfaces exist.



\*\*E. Folder/File Naming Convention\*\*



Recommended folder:

`C:\\Users\\Sagou\\Documents\\BrainHub\\MEMTOOL\_OC2CO\\07\_Screen\_Proof\\MEMTOOL\_MAP\_02\_2026-05-20\\`



Recommended filenames:

`01\_home\_memory\_atrium\_iphone67.png`  

`02\_capture\_idle\_iphone67.png`  

`03\_voice\_capture\_idle\_iphone67.png`  

`04\_memchat\_memora\_idle\_iphone67.png`  

`05\_archive\_journal\_iphone67.png`  

`06\_photo\_viewer\_seeded\_iphone67.png`  

`07\_recap\_today\_iphone67.png`  

`08\_games\_memory\_match\_level\_select\_iphone67.png`  

`09\_games\_24\_level\_select\_iphone67.png`  

`10\_progress\_skills\_iphone67.png`  

`11\_settings\_top\_iphone67.png`  

`12\_edit\_profile\_iphone67.png`  

`13\_login\_auth\_iphone67.png`  

`14\_onboarding\_chat\_iphone67.png`  

`15\_subscription\_iphone67.png`  

`16\_support\_about\_licenses\_iphone67.png`



\*\*F. Next Recommended Lane After Screenshot Proof\*\*



`MEMTOOL-MAP-03 — Screenshot Evidence Review \& Portal Gap Packet`



\*\*G. What Must Not Be Touched\*\*



No app code, no redesign, no generated images, no EAS/build credits, no RevenueCat/backend/Apple/EAS config, no route/file renames, no staging/commit/push, no `git add .`, no Memory Synthesis Engine architecture yet, no purchases, no deletes, no uploads, no source images.

