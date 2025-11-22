# Arc Raiders Companion Tool

A browser-based companion for **Arc Raiders** solo raiders. It gives you a living database for loot, workshops, skills, blueprints, and mission planning while keeping everything local via `localStorage` (with optional JSON backup/restore).

## Highlights

- **Authoritative Loot Database** – Every entry now carries hand-authored `rarity`, `locationTag`, and `status` labels (`KEEP`, `SELL`, `RECYCLE`, `USE`). Filters respect these tags, including new `Topside` and `Crafting` hotspots for farmable vs. refiner-only materials.
- **Contextual Farming Routes** – Items inherit curated hotspots (ARC crash sites, Refiner station, etc.) so the planner can generate realistic solo-friendly routes per mission requirement.
- **Workshop + Scrappy Planner** – Track each bench level, required materials, unlocks, and a recommended solo-friendly upgrade order. Scrappy upgrades are included for planning passive income.
- **Skill + Blueprint Tracking** – Collapsible skill trees with recommended point buckets, plus a blueprint catalog that filters by ownership, bench, and priority.
- **Progress Sync** – All player inputs persist in the browser and can be exported/imported as JSON to sync between devices.

## Getting Started

```bash
npm install
npm run dev
```

Then browse to [http://localhost:3000](http://localhost:3000).

## Data Model Notes

- Loot metadata lives in `lib/lootDb.ts`. Each `Item` defines name, reason, raw location text, and explicit `rarity`/`locationTag` metadata. Any missing metadata throws during import, which keeps the dataset honest.
- Location tags include ARC, Industrial, Residential, Commercial, Nature, Medical, Military, Topside, Crafting, and fallback Various. `Topside` surfaces low-pressure surface runs; `Crafting` highlights Refiner-only conversions.
- Consumables or craft inputs that should be used (not sold) are tagged `USE`, which shows up as amber “Use/Consume” pills in the UI.

## Development

- **Lint:** `npm run lint`
- **Type Safety:** `tsconfig.json` + strict hooks like `useSyncExternalStore` enforce client-only state hydration.
- **Testing:** Run the dev server locally (`npm run dev`) to interact with localStorage, filters, and mission planning flows.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4 beta](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
