# Arc Raiders Companion Tool

A browser-based companion for **Arc Raiders** players. Features a comprehensive loot database, blueprint catalog, and skill guidance — designed for both solo and squad play.

**Live App:** https://legarconc.github.io/ArcRaidersTool/

*Last updated: February 26, 2026 — Shrouded Sky 1.17.0*

## Features

### Loot Database (215+ items)
- Every item tagged with **KEEP**, **SELL**, **RECYCLE**, or **USE** status
- Clear reasoning for each recommendation (quest requirements, workshop upgrades, crafting materials)
- Location tags: ARC, Industrial, Residential, Commercial, Nature, Medical, Military, Topside, Crafting
- Expandable map-specific farming hotspots with tips
- Filter by status, rarity, location type, and search

### Blueprints Catalog (75+ blueprints)
- All blueprints with **drop locations** and farming tips
- Categories: Weapons, Attachments, Shields, Augments, Consumables, Tools, Explosives, Components
- Priority ratings: Essential, High Value, Situational, Low Priority
- Search by name, description, or location
- Up to date with 1.17.0 additions (Deadline Mine, Wolfpack recipe change)

### Skills Guide
- **Top 10 priority skills** highlighted at the top — spend your first points here
- All three skill trees fully listed with point recommendations
- Skip list for low-impact perks
- Prerequisite requirements for every major unlock

### UI/UX & Accessibility
- **High-Contrast Design:** Near-black palette with bright yellow accents and light grey text for maximum readability on OLED and standard displays.
- **Large Typography:** Generous font sizes optimized for quick reference during gameplay.
- **Responsive Layout:** Tailored experience for both desktop and mobile devices.
- **Visual Cues:** Rarity and status-based color coding for instant item identification.

## Shrouded Sky 1.17.0 (February 24, 2026)

- **New enemies:** Firefly (flying, flame attacks) and Comet (rolling explosive sphere)
- **New blueprint:** Deadline Mine — Epic timed explosive, crafted with Comet Igniter
- **Wolfpack** recipe updated: now requires Rocketeer Driver
- **Weapon balance:** Stitcher, Kettle, Venator nerfed; Aphelion and Jupiter buffed
- **New items:** Firefly Burner, Comet Igniter, Anemometer Backpack Charm
- **Hurricane** map condition and Dam Battlegrounds Controlled Access Zone

## Escalation Season Roadmap (2026)

- **January:** "Headwinds" — Bird City Map Condition, Looting Mk.3 Safekeeper
- **February:** "Shrouded Sky" — Hurricane, Firefly & Comet enemies, Deadline Mine
- **March:** "Flashpoint" — New ARC enemy, Second Expedition skill catch-up
- **April:** "Riven Tides" — Brand-new map

## Getting Started

```bash
npm install
npm run dev
```

Browse to [http://localhost:3000](http://localhost:3000).

## Data Sources

- [ARC Raiders Wiki](https://arcraiders.wiki/)
- [Arc Raiders Cheat Sheet](https://arcraiderscheatsheet.org/)
- [GAM3S.GG Guides](https://gam3s.gg/arc-raiders/)
- Community research and playtesting

## Tech Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Rajdhani](https://fonts.google.com/specimen/Rajdhani) (Google Fonts)
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
