# Arc Raiders Companion Tool

A browser-based companion for **Arc Raiders** solo raiders. It gives you a living database for loot, workshops, skills, blueprints, and a step-by-step mission roadmap while keeping everything local via `localStorage` (with optional JSON backup/restore).

## Highlights

- **Solo Raider Roadmap** – A research-backed, 20-mission progression guide organized into 4 phases (The Rat → The Scavenger → The Operator → The Apex). Each mission shows expandable resource requirements with farming locations, explains WHY it matters, and tracks your completion. Click the caret to reveal materials, best maps/hotspots, and pro tips.
- **Authoritative Loot Database** – Every entry carries hand-authored `rarity`, `locationTag`, and `status` labels (`KEEP`, `SELL`, `RECYCLE`, `USE`). Filters respect these tags, including `Topside` and `Crafting` hotspots for farmable vs. refiner-only materials.
- **Live Alpha/Beta Data** – Skills, blueprints, quests, and loot flags are synced with the latest Arc Raiders playtest (e.g., the refreshed Mobility tree, S-tier Bettina/Renegade/Anvil rankings, 1x Fertilizer for Unexpected Initiative, and the Toaster → `RECYCLE` change).
- **Crash-Resistant Local Storage** – Workshop levels, Scrappy progress, skills, blueprints, and roadmap completion store via a client-only hook that guards against hydration loops.
- **Contextual Farming Routes** – Items inherit curated hotspots (ARC crash sites, Refiner station, etc.) so the roadmap displays realistic solo-friendly farming locations per mission requirement.
- **Workshop + Scrappy Tracker** – Track each bench level, required materials, unlocks, and a recommended solo-friendly upgrade order. Scrappy upgrades are included for planning passive income.
- **Skill + Blueprint Tracking** – Collapsible skill trees with recommended point buckets, plus a blueprint catalog that filters by ownership, bench, and priority.
- **Phone-Friendly Layouts** – Mobile users get a sticky tab bar and card-based mission views so requirements, hotspots, and roadmap steps stay readable on small screens without affecting desktop.
- **Progress Sync** – All player inputs persist in the browser and can be exported/imported as JSON to sync between devices.

## Getting Started

```bash
npm install
npm run dev
```

Then browse to [http://localhost:3000](http://localhost:3000).

## Roadmap Details

The Roadmap tab is the heart of the companion app. It provides a clear, sequential mission guide based on community research and solo play optimization:

**Phase 1: The Rat (Levels 1-5)**
- Unlock trading, Scrappy, and mobility skills
- Focus: Establish economy and passive income

**Phase 2: The Scavenger (Levels 5-15)**
- Gunsmith L2, Medical Lab, In-Round Crafting
- Focus: Self-sustaining crafting and faster looting

**Phase 3: The Operator (Levels 15-25)**
- THE SURVIVABILITY SPIKE: Gear Bench L2 → Medium Shield
- Refiner L2, Gunsmith L3 for meta weapons (Anvil)
- Focus: Stop getting one-shot, become combat effective

**Phase 4: The Apex (Levels 25+)**
- Heavy Shield, Vita Spray, Security Breach skill
- Max Scrappy for passive rare materials
- Focus: Endgame optimization and dominance

Each mission card expands to show required materials with quantities, best farming locations (map + hotspot), location tags, and pro tips for solo raiders.

## Loot & Data Model Notes

- Loot metadata lives in `lib/lootDb.ts`. Each `Item` defines name, reason, raw location text, and explicit `rarity`/`locationTag` metadata. Any missing metadata throws during import, which keeps the dataset honest.
- Location tags include ARC, Industrial, Residential, Commercial, Nature, Medical, Military, Topside, Crafting, and fallback Various. `Topside` surfaces low-pressure surface runs; `Crafting` highlights Refiner-only conversions.
- Consumables or craft inputs that should be used (not sold) are tagged `USE`, which shows up as amber “Use/Consume” pills in the UI.

## Development

- **Lint:** `npm run lint`
- **Type Safety:** `tsconfig.json` + strict hooks like `useSyncExternalStore` enforce client-only state hydration.
- **Testing:** Run the dev server locally (`npm run dev`) to interact with localStorage, filters, planner flows, and mission routes.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4 beta](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
