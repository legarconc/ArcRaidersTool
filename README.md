# Arc Raiders Companion Tool

A browser-based companion for **Arc Raiders** solo raiders. It gives you a living database for loot, workshops, skills, blueprints, and mission planning while keeping everything local via `localStorage` (with optional JSON backup/restore).

## Highlights

- **Authoritative Loot Database** – Every entry now carries hand-authored `rarity`, `locationTag`, and `status` labels (`KEEP`, `SELL`, `RECYCLE`, `USE`). Filters respect these tags, including new `Topside` and `Crafting` hotspots for farmable vs. refiner-only materials.
- **Live Alpha/Beta Data** – Skills, blueprints, quests, and loot flags are synced with the latest Arc Raiders playtest (e.g., the refreshed Mobility tree, S-tier Bettina/Renegade/Anvil rankings, 1x Fertilizer for Unexpected Initiative, and the Toaster → `RECYCLE` change).
- **Crash-Resistant Local Storage** – Workshop levels, Scrappy progress, skills, and blueprints store via a client-only hook that now guards against hydration loops, so toggling levels or importing saves won’t spam console errors.
- **Contextual Farming Routes** – Items inherit curated hotspots (ARC crash sites, Refiner station, etc.) so the planner can generate realistic solo-friendly routes per mission requirement.
- **Planner (Upgrades + Quests)** – The Session Planner auto-generates every bench/Scrappy upgrade directly from `workshopDb`, groups them by workbench, and splits UI controls between Upgrades and Quests. It also ships with the default quest chain (Unexpected Initiative, Doctor’s Orders, Expedition Prep, Snap & Salvage, Tribute to Toledo, Armored Transports) so you can prep for story beats.
- **Workshop + Scrappy Tracker** – Track each bench level, required materials, unlocks, and a recommended solo-friendly upgrade order. Scrappy upgrades are included for planning passive income.
- **Skill + Blueprint Tracking** – Collapsible skill trees with recommended point buckets, plus a blueprint catalog that filters by ownership, bench, and priority.
- **Solo Raider Roadmap** – A dedicated Progression tab walks you through phased checklists (Rat → Scavenger → Operator → Apex) with per-task tips plus planner deep links, so you always know the next craft, quest, loot run, or upgrade.
- **Phone-Friendly Layouts** – Mobile users get a sticky tab bar and card-based mission views so requirements, hotspots, and roadmap steps stay readable on small screens without affecting desktop.
- **Progress Sync** – All player inputs persist in the browser and can be exported/imported as JSON to sync between devices.

## Getting Started

```bash
npm install
npm run dev
```

Then browse to [http://localhost:3000](http://localhost:3000).

## Planner Details

- All upgrade missions are generated from the canonical `workshopDb` + Scrappy definitions. When bench data changes, the planner automatically reflects the new material requirements/unlock notes.
- The Session Planner UI now exposes two chips (Upgrades / Quests). Upgrade selection shows grouped `<optgroup>` lists for each bench (including Scrappy). Quest selection lists the default in-game quests.
- Mission planning respects your saved workshop/scrappy levels; completed upgrades are marked as such, and required materials inherit loot metadata (rarity, color tags, route hints).

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
