\*\*MEMTOOL-MAP-01 — App Portal \& Branch Canvasing Audit\*\*



BBWAAS gate check: mapping/audit only. No app code edited, no build/EAS run, no APIs called, no images generated, no routes renamed, no files deleted. Repo still clean on `mobile-app`, latest commit `6634dbc`.



\*\*A. Confirmed Facts With File Paths\*\*



Repo root: `C:\\Users\\Sagou\\memtool-upload`



Core route shell:

\- `app\\\_layout.tsx`: root providers, Sentry, RevenueCat init, auth/subscription/memories/game/settings/profile providers.

\- `app\\index.tsx`: redirects unauthenticated users to `/login`, un-onboarded users to `/onboarding`, onboarded users to `/(app)/(tabs)`.

\- `app\\(app)\\\_layout.tsx`: authenticated stack routes.

\- `app\\(app)\\(tabs)\\\_layout.tsx`: five tabs: Home, Archive, Progress, Mem, Settings.



Current stack routes:

\- `/(app)/(tabs)`, `/capture`, `/voice-capture`, `/memory-match`, `/game-24`, `/recap`, `/insights`, `/ai-guide`, `/intro-video`, `/subscription`, `/support`, `/about`, `/licenses`, `/wellness`, `/photo/\[clientId]`, `/log-call`, `/edit-profile`, `/tip-archive`.



Durable BrainHub/repo SOT docs read:

\- `docs\\brainbridge\\MEMTOOL\_HOME\_ATRIUM\_SOT.md`

\- `docs\\brainbridge\\MEMTOOL\_MEMCHAT\_SOT.md`

\- `docs\\brainbridge\\MEMTOOL\_GAMES\_VISUAL\_SOT.md`

\- `docs\\brainbridge\\MEMTOOL\_MEMORY\_SYNTHESIS\_ENGINE\_SPEC.md`

\- `docs\\brainbridge\\MEMTOOL\_AGENT\_RULES.md`



\*\*B. Assumptions Needing Proof\*\*



\- Exact live visual quality of each screen needs screenshots or device/browser proof; this audit only read files.

\- Subscription/App Store behavior needs a separate policy/payment lane before touching RevenueCat, App Store, or purchase wiring.

\- “Reusable Oc2cO app shells” are inferred from current architecture and docs; they are not yet formalized as their own template package.

\- Current backend endpoint behavior was not verified by network calls, by design.



\*\*C. Portal Map\*\*



| Portal | Current files | What it does today | Later direction |

| --- | --- | --- | --- |

| Home / Memory Atrium | `app\\(app)\\(tabs)\\index.tsx`, `docs\\brainbridge\\MEMTOOL\_HOME\_ATRIUM\_SOT.md` | Main landing tab. Quick Capture is strongest action. Compact doorways route to MeMChat, Recap, Archive, Games, plus lower utility content. | Stay safe V1 doorway structure; later immersive Atrium only if Steve opens that lane. |

| Capture | `app\\(app)\\capture.tsx`, `app\\(app)\\voice-capture.tsx`, `app\\(app)\\log-call.tsx`, `context\\MemoriesContext.tsx`, `lib\\memories.ts`, `lib\\memoryPhotos.ts` | Text capture, photo/selfie capture, voice capture, call logging, drafts, facets, memory outbox, photo upload queue. | Become the low-friction intake layer for the Memory Synthesis Engine. |

| MeMChat / Memora | `app\\(app)\\ai-guide.tsx`, `app\\(app)\\(tabs)\\ai-guide.tsx`, `components\\ChatThread.tsx`, `components\\Memora.tsx`, `lib\\aiGuide.ts`, `lib\\aiGuideThread.ts`, `docs\\brainbridge\\MEMTOOL\_MEMCHAT\_SOT.md` | Memora chat, local thread persistence, word-by-word reply reveal, voice/mute/captions, backend chat boundary in `lib\\aiGuide.ts`. | Companion reflection and recall layer; visual/interaction polish is parked for its own lane. |

| Journal / Archive / Memory Book | `app\\(app)\\(tabs)\\archive.tsx`, `app\\(app)\\photo\\\[clientId].tsx`, `context\\MemoriesContext.tsx`, `lib\\archiveRows.ts`, `lib\\memories.ts` | Search, filter, delete, photo viewer, sync retry, illustration handling, Pro library-window gating. | Long-term memory vault and browsable life journal/storybook surface. |

| Recap | `app\\(app)\\recap.tsx`, `components\\MonthRecapView.tsx`, `lib\\recap.ts`, `lib\\recapMonth.ts`, `context\\MoodContext.tsx` | Daily recap, mood logging, calendar tomorrow strip, streaks, weekly/month/quarter/year/custom recap views, Pro extras. | First synthesis surface for daily chapters and approved memory artifacts. |

| Games | `app\\(app)\\memory-match.tsx`, `app\\(app)\\game-24.tsx`, `app\\(app)\\skills\\\*`, `context\\GameStatsContext.tsx`, `context\\SkillsContext.tsx`, `docs\\brainbridge\\MEMTOOL\_GAMES\_VISUAL\_SOT.md` | Memory Match, 24 Game, level ladders, versus Mem, stats, Skills mini-games and paywall. | Recall/reinforcement loop and premium game-room polish. |

| Settings / Profile / Privacy | `app\\(app)\\(tabs)\\settings.tsx`, `app\\(app)\\edit-profile.tsx`, `app\\(app)\\support.tsx`, `app\\(app)\\about.tsx`, `app\\(app)\\licenses.tsx`, `context\\ProfileContext.tsx`, `context\\SettingsContext.tsx`, `context\\AuthContext.tsx` | Profile, preferences, haptics, cognitive audio, export, account deletion, support/about/licenses, intro replay. | Privacy/control center for memory, profile, export, deletion, and companion settings. |

| Onboarding/Auth | `app\\login.tsx`, `app\\forgot-password.tsx`, `app\\onboarding.tsx`, `app\\onboarding-chat.tsx`, `context\\AuthContext.tsx`, `lib\\auth.ts`, `lib\\onboardingChat.ts` | Login/signup, forgot/reset password, cinematic onboarding, profile-building onboarding chat. | Reusable identity and first-run companion-intake shell. |

| Subscription/App Store | `app\\(app)\\subscription.tsx`, `context\\SubscriptionContext.tsx`, `lib\\subscription.ts`, `lib\\revenuecat.ts`, `components\\subscription\\RestorePurchasesButton.tsx` | Pro status, RevenueCat-backed purchase/restore/manage, capture/library/illustration gating, Skills purchase helpers. | Policy-safe monetization shell; must stay isolated behind approval lanes. |



\*\*D. Branch Map\*\*



Visual branches needed:

\- Home V1 review/tuning branch.

\- MeMChat visual/interaction polish branch.

\- Voice Capture modal + bubble/text sync visual branch.

\- Games visual polish / Memory Match premium pass branch.

\- Loading/splash/intro first-impression branch.

\- Visual journal/storybook branch after synthesis rules exist.



Code branches needed:

\- Memory Synthesis Engine data/model branch.

\- Capture intake unification branch.

\- Archive/journal structure branch.

\- Recap editable daily chapter branch.

\- Search/filter/people/timeline branch.

\- Offline sync/outbox hardening branch.

\- Game progression/reinforcement branch.



Product/policy branches needed:

\- Privacy/memory retention/deletion policy.

\- AI companion memory boundaries.

\- Subscription/App Store compliance.

\- Upload/photo/legal safety.

\- Generated asset approval/app-use policy.

\- Export/share policy.



\*\*E. Flowchart Text\*\*



`Login/Auth -> Onboarding Chat -> Home / Memory Atrium`



`Home -> Capture -> MemoriesContext/outbox -> Archive -> Recap -> MeMChat recall/reflection`



`Home -> MeMChat -> aiGuide backend boundary -> local thread -> future approved memory context`



`Home -> Recap -> mood/streak/calendar/month recap -> future daily chapter`



`Home -> Games -> GameStats/Skills -> future recall reinforcement`



`Settings -> profile/privacy/export/subscription/preferences -> all portals`



`Subscription -> gates Capture, Archive library window, Recap Pro extras, Games levels/Skills, illustrations`



\*\*F. Recommended Next 3 Lanes\*\*



1\. `MEMTOOL-MAP-02 — Portal Proof Screenshots / Screen Inventory`

2\. `MEMTOOL-ARCH-01 — Memory Synthesis Engine Architecture Packet`

3\. `MEMTOOL-HOME-REVIEW-01 — Safe V1 Home Doorway Review/Tuning`



\*\*G. What Must Not Be Touched\*\*



\- EAS/build credits.

\- RevenueCat, backend, Apple/EAS config, app wiring.

\- Source images or generated assets.

\- Route names/files.

\- App code until Steve opens a build/code lane.

\- MeMChat internals during Home work.

\- Voice Capture unless that lane is explicitly opened.

\- Games internals unless games lane is explicitly opened.

\- Secrets, API keys, tokens, passwords, credentials.

\- `git add .`, staging, commit, or push without Steve approval.

