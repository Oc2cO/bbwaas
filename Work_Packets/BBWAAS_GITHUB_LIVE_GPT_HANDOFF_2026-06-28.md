# BBWAAS GITHUB LIVE — GPT HANDOFF PACKET 01

**From:** Hermes (via Steven/Oc2cO)
**Date:** 2026-06-28
**Topic:** BBWAAS master umbrella is now live on GitHub. System is accessible to any agent.

---

## 1. WHAT JUST HAPPENED

The BBWAAS master umbrella (`BBWAAS/`) was consolidated, git-initialized, and pushed to GitHub as a public repo.

**Repo:** https://github.com/Oc2cO/bbwaas
**Branch:** main
**Files:** 172 tracked
**Size:** ~15MB (structure + docs + app code; large binaries excluded)
**Pushed:** 2026-06-28

---

## 2. SYSTEM ARCHITECTURE (The Single Tree)

Everything is organized under `BBWAAS/` with grandparent > parent > child structure:

```
BBWAAS/                          ← MASTER (clone this)
├── App_Store_Apps/              ← MemTool, SellThis
├── Website/                     ← oc2co site design docs + asset specs
├── Agent_Systems/               ← tool inventories, MCP, skills
├── Other_Projects/              ← Iris Oracle, Polymarket, etc.
├── Work_Packets/                ← WP1/WP2/WP3 completion reports
├── README.md                    ← Master docs
├── INVENTORY.md                 ← Full path inventory
└── .gitignore                   ← Excludes: STALE_BBWAAS, secrets, venvs, node_modules, nested .git
```

**What's NOT in the repo (and why):**
- `oc2co_website/` (nested inside Website/oc2co/Source/) — has its own repo at `Oc2cO/-oc2co` with working GitHub Pages. Already live.
- `bbwaas_evolution/` (857MB), `bbwaas_command_center/`, `bbwaas_hosted_workspace/` — symlinked locally, not pushed. They're the historical source of truth on the local BrainHub.
- `STALE_BBWAAS/` (1.4GB archive) — excluded.
- Secrets, .env, tokens, venvs, node_modules.

**Local symlinks** (not in git, break on clone):
```
AGENT_WORKSPACE/   → ../00_MASTER_FRONT_DOOR/AGENT_WORKSPACE
EVOLUTION/         → ../bbwaas_evolution
HOSTED_WORKSPACE/  → ../bbwaas_hosted_workspace
MCP_SERVER/        → ../bbwaas_mcp_server
COMMAND_CENTER/    → ../bbwaas_command_center
```
These are LOCAL navigation shortcuts. Agents cloning the repo should use the real directories under App_Store_Apps/, Website/, etc.

---

## 3. CURRENT STATE (What's Live vs Local)

| Component | Location | Status |
|-----------|----------|--------|
| bbwaas repo | github.com/Oc2cO/bbwaas | LIVE — public |
| oc2co.com | Namecheap DNS + Render | LIVE — shows MemTool login |
| www.oc2co.com | CNAME → oc2coos-2.polsia.app | LIVE — SSL mismatch |
| oc2co_website source | Oc2cO/-oc2co (GitHub Pages) | LIVE — working repo |
| MemTool (Polsia) | oc2coos-2.polsia.app | LIVE — 42 users, 33 captures |
| BrainHub local | C:\Users\Sagou\Documents\BrainHub | LOCAL — full source of truth |
| BBWAAS/ umbrella | Same path + GitHub | SYNCED — local + remote |
| bbwaas_evolution/ | Local only | LOCAL — 440+ historical files |
| Mattermost | Local Docker (offline) | OFFLINE — needs Docker Desktop |
| bbwaas_mcp_server | Local | UNBUILT — port 8787 planned |
| Namecheap cPanel | Hosting expired | EXPIRED — DNS still works |
| 00_MASTER_FRONT_DOOR/ | Local only | LOCAL — Pin Board, SOT, AGENT_WORKSPACE |

---

## 4. WHAT GROK DID (Before Today)

Grok background agents ran a full consolidation on 2026-06-27:
- Discovered 5 separate umbrella roots (00_MASTER_FRONT_DOOR, bbwaas_evolution, etc.)
- Created BBWAAS/ umbrella with grandparent/parent/child hierarchy
- Linked everything via symlinks
- Produced INVENTORY.md, Work_Packets, and consolidation reports
- Built the GROK_TOOLS_INVENTORY/ audit of all installed Grok skills/plugins/MCPs

**What Grok didn't do:**
- Push to GitHub (left .git empty)
- Handle auth/credential setup
- Document enforcement rules for agents
- Set up sync/cron

---

## 5. WHAT HERMES DID (Today, Jun 28)

- Created .gitignore excluding: STALE_BBWAAS, secrets, large binaries, nested .git, agent caches
- Git init on BBWAAS/ as main branch
- First commit: all 172 tracked files (structure + docs + app code + asset specs)
- Created public repo at github.com/Oc2cO/bbwaas
- Pushed 2 commits
- Updated Pin Board with GitHub URL
- Configured git credential helper for future pushes

---

## 6. NEXT ACTIONS (For GPT)

### A. Know the Single Tree
When planning work, reference the BBWAAS/ structure. The repo IS the canonical agent-accessible tree. Clone it:
```
git clone https://github.com/Oc2cO/bbwaas.git
```

### B. Enforcement Rule
When writing packets, specify save paths under BBWAAS/ hierarchy:
- New agent reports → `Agent_Systems/Reports/`
- New project work → `App_Store_Apps/<Project>/`
- New website work → `Website/oc2co/<section>/`
- New packets → `Work_Packets/`

### C. Website Source
The oc2co_website is at `Oc2cO/-oc2co` (separate repo, GitHub Pages). Don't confuse it with the local Website/oc2co/Source/ path. The BBWAAS/ Website/ folder contains design docs, image specs, and asset catalogs — NOT the deployable website source.

### D. Large Assets
Images and binaries are documented in BBWAAS/ Website/oc2co/Images/ by spec READMEs (descriptions, dimensions, export format). The actual PNG/JPG files are local-only. Generate or reference them as needed.

### E. BBWAAS Repo Content Summary

What's actually inside the 172 tracked files:

| Section | Files | Content |
|---------|-------|---------|
| Agent_Systems/ | 16 | Grok tools inventory, MCP audit, skill/plugin catalogs |
| App_Store_Apps/MemTool/ | 30 | Assets, code components, docs, references |
| App_Store_Apps/SellThis/ | 35 | Assets (v2b PNGs, skies), code, proofs |
| Website/oc2co/ | 75 | Design docs, image spec READMEs, Canva exports, subdomain pages |
| Work_Packets/ | 13 | WP1-WP3 completion reports, BG agent reports |
| Root | 3 | README.md, INVENTORY.md, .gitignore |

---

## 7. BUDGET STATUS

- **Provider:** Nous inference (deepseek/deepseek-v4-flash)
- **Balance:** ~$0.30
- **Switch to free:** When balance hits $0.02
- **Next top-up:** ~Monday (Jun 29)
- **Free fallback options:**
  - OpenRouter free models (mistral, llama)
  - Google Gemini free tier (gemini-2.0-flash)
  - Local Ollama (if running)

Steven wants to keep using deepseek until $0.02, then switch.

---

## 8. CANVA / DESIGN STATUS

Steven needs help designing pages for his app and website using Canva. Existing assets and design specs are documented in:

- `Website/oc2co/Canva_Exports/ASSET_CATALOG_OC2CO_FINISHED_ASSETS_V01.md` — Full catalog of candidate designs
- `Website/oc2co/Images/` — Organized by type: Backgrounds/, Buttons/, Cards/, Heroes/, Logos/, MemTool/, SellThis/
- Each image folder has a README.md with exact design specs (dimensions, colors, style notes)

Designs already specified:
1. **OC2CO_CHECKOUT_BG_ECLIPSE_BIOLUMINESCENT_OCEAN_V01** — 1920×1080 checkout background
2. **OC2CO_LOGO_MARK_ORBITAL_2_V02** — SVG brand mark
3. **OC2CO_CARD_MEMTOOL_MEMORY_ATRIUM_V02** — 1200×900 project card
4. **OC2CO_CARD_SELLTHIS_AI_LISTING_PACK_V02** — SellThis project card
5. **OC2CO_HOME_HERO_COSMIC_ORIGIN_V02** — Homepage hero
6. **OC2CO_STORE_HERO_SECURE_GLASS_V02** — Store page hero
7. **OC2CO_CHECKOUT_BUTTON_ELECTRIC_TEXT_V01** — CTA button style
8. **OC2CO_CHECKOUT_CARD_LIQUID_GLASS_V01** — Checkout card style

These have Canva candidates generated but need finalization, cleanup, and SVG conversion.

---

## 9. HERMES TOOLS AVAILABLE FOR DESIGN WORK

Hermes has:
- **image_generate** (FAL backend) — create new visuals from prompts
- **vision_analyze** — read and describe existing images
- **browser** — navigate Canva web interface (guidance, not auto-design)
- **web_search** — find Canva tutorials, templates, techniques
- **file access** — read/write design docs, asset specs, export notes

Hermes does NOT have direct Canva API access. Canva work requires:
1. Hermes provides asset specs and guidance
2. Steven (or GPT with Canva GPT) executes in Canva
3. Or Hermes generates assets via FAL that Steven imports to Canva

---

*Created by Hermes 2026-06-28. Save to Work_Packets/ for GPT reference.*
