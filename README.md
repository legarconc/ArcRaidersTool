# Arc Raiders Companion Tool

This project is a personal companion app for **Arc Raiders** players—especially solo raiders—who want a fast way to plan upgrades, track loot, and keep tabs on long-term goals. It is built with Next.js + Tailwind and runs entirely in the browser, persisting your inputs via `localStorage` and optional JSON export/import.

## What It Does

- **Loot Database:** Curated list of high-value drops with KEEP/SELL/RECYCLE tags, reasons, and location hints. Powerful search and filters for status, rarity (auto-inferred), and location category.
- **Workshop Planner:** Interactive cards for each workbench plus Scrappy, showing current level, next-level materials/unlocks, and a solo-focused recommended upgrade order sourced from the in-game priorities.
- **Skill Planning:** Level-based point calculator with collapsible skill branches that highlight recommended point allocations, priorities, and prerequisites for a stealth-friendly solo build.
- **Blueprint Tracker:** Complete blueprint catalog with filters (owned/missing, workbench, priority) and collection stats to see progress toward essential items.
- **Progress Sync:** All selections (bench levels, Scrappy level, owned blueprints, player level) stay in `localStorage` and can be exported/imported as a JSON file for easy backup or sync across devices.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

*   [Next.js](https://nextjs.org/) - React framework for building the user interface.
*   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
*   [Lucide React](https://lucide.dev/) - Library for icons.
*   [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
