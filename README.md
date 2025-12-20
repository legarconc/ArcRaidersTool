# Arc Raiders Companion Tool

A browser-based companion for **Arc Raiders** solo players. Features a comprehensive loot database, focused skill guidance, and blueprint catalog with clear farming locations.

**Live App:** https://legarconc.github.io/ArcRaidersTool/

*Last updated: December 2025*

## Features

### Loot Database (212+ items)
- Every item tagged with **KEEP**, **SELL**, **RECYCLE**, or **USE** status
- Clear reasoning for each recommendation (quest requirements, workshop upgrades, crafting materials)
- Location tags: ARC, Industrial, Residential, Commercial, Nature, Medical, Military, Topside, Crafting
- Expandable map-specific farming hotspots with tips
- Filter by status, rarity, location type, and search

### Skills Guide (3 trees, 75 points)
- **Mobility** (Priority #1) — Stamina management, movement speed, parkour
- **Survival** (Priority #2) — Looting, crafting, carry capacity
- **Conditioning** (Priority #3) — Weight management, recovery, noise reduction

**Key features:**
- Recommended Skill Progression — Step-by-step solo path listing total point investment per pick
- Skip List — Highlights low-impact perks you can safely ignore until endgame
- Priority ratings (Critical, High, Medium, Optional) for each skill
- Prerequisite requirements for every major unlock

### Blueprints Catalog (53 blueprints)
- All blueprints with **drop locations** and farming tips
- Categories: Weapons, Attachments, Shields, Augments, Consumables, Tools, Explosives, Components
- Priority ratings: Essential, High Value, Situational, Low Priority
- Lightweight search for names, descriptions, or locations — no ownership tracking UI

**Notable blueprints with guaranteed sources:**
- Hullcracker — Quest: The Major's Footlocker (Tian Wen)
- Burletta — Quest: Industrial Espionage (Tian Wen)
- Lure Grenade — Quest: Greasing Her Palms (Celeste)
- Equalizer/Jupiter — Harvester Events

## Getting Started

```bash
npm install
npm run dev
```

Browse to [http://localhost:3000](http://localhost:3000).

## Data Sources

Item and blueprint data sourced from:
- [ARC Raiders Wiki](https://arcraiders.wiki/)
- [Arc Raiders Cheat Sheet](https://arcraiderscheatsheet.org/)
- [GAM3S.GG Guides](https://gam3s.gg/arc-raiders/)
- Community research and playtesting

## Tech Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)

## Development

```bash
npm run dev     # Development server
npm run build   # Production build
npm run lint    # Linting
```

## Deployment

Automatically deployed to **GitHub Pages** via GitHub Actions on push to `main`.

### Configuration

In `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ArcRaidersTool",
  assetPrefix: "/ArcRaidersTool",
  images: { unoptimized: true },
};
```

### Forking

1. Go to **Settings → Pages** and set Source to "GitHub Actions"
2. Update `basePath` and `assetPrefix` to match your repo name
3. Push to `main` — deploys automatically
