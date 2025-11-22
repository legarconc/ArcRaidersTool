import { workbenches } from './workshopDb';
import { lootDb, Item, getBestMapLocations, getLocationTag, MapLocation } from './lootDb';

type MissionType = 'upgrade' | 'quest';

export interface MissionRequirement {
  itemName: string;
  quantity: number;
  note?: string;
}

export interface Mission {
  id: string;
  type: MissionType;
  title: string;
  description: string;
  target?: {
    benchId: string;
    targetLevel: number;
  };
  requirements?: MissionRequirement[];
  rewardNote?: string;
}

export interface RequirementSummary {
  itemName: string;
  quantity: number;
  note?: string;
  itemData?: Item;
  bestSpots: MapLocation[];
  locationTag?: ReturnType<typeof getLocationTag>;
}

export interface RouteSuggestion {
  map: string;
  hotspots: Array<{
    hotspot: string;
    tip: string;
    items: string[];
  }>;
}

export interface MissionPlan {
  mission: Mission;
  requirements: RequirementSummary[];
  routes: RouteSuggestion[];
  isComplete: boolean;
}

export const missions: Mission[] = [
  {
    id: 'gear-bench-3',
    type: 'upgrade',
    title: 'Gear Bench → Level 3',
    description: 'Finish gearing for heavy solo runs with Heavy Shield & Mk.3 augments.',
    target: { benchId: 'gear-bench', targetLevel: 3 },
    rewardNote: 'Unlock Heavy Shield, Looting/Combat Augment Mk.3'
  },
  {
    id: 'medical-lab-3',
    type: 'upgrade',
    title: 'Medical Lab → Level 3',
    description: 'Prep for high-pressure fights with Vita Spray and advanced meds.',
    target: { benchId: 'medical-lab', targetLevel: 3 },
    rewardNote: 'Unlock Vita Spray + Emergency Medkit'
  },
  {
    id: 'gunsmith-3',
    type: 'upgrade',
    title: 'Gunsmith → Level 3',
    description: 'Push weapon crafting to top tier for ARC encounters.',
    target: { benchId: 'gunsmith', targetLevel: 3 },
    rewardNote: 'Unlock Osprey, Anvil, advanced mods'
  },
  {
    id: 'quest-unexpected-initiative',
    type: 'quest',
    title: 'Quest: Unexpected Initiative',
    description: 'Scrappy needs supplies to expand operations.',
    requirements: [
      { itemName: 'Fertilizer', quantity: 3 },
      { itemName: 'Water Pump', quantity: 1 }
    ],
    rewardNote: 'Unlock better Scrappy pulls and quest progression'
  },
  {
    id: 'quest-doctors-orders',
    type: 'quest',
    title: "Quest: Doctor's Orders",
    description: 'Gather herbal supplies for the camp medic.',
    requirements: [
      { itemName: 'Great Mullein', quantity: 5 },
      { itemName: 'Antiseptic', quantity: 4 }
    ],
    rewardNote: 'Unlock advanced medical crafting and XP'
  },
  {
    id: 'quest-expedition-prep',
    type: 'quest',
    title: 'Quest: Expedition Prep',
    description: 'Help the crew stabilize expedition gear for ARC dives.',
    requirements: [
      { itemName: 'Cooling Fan', quantity: 2 },
      { itemName: 'Motor', quantity: 2 },
      { itemName: 'Industrial Battery', quantity: 1 }
    ],
    rewardNote: 'Progress Expedition unlock chain'
  }
];

const missionIndex: Record<string, Mission> = missions.reduce((acc, mission) => {
  acc[mission.id] = mission;
  return acc;
}, {} as Record<string, Mission>);

function summarizeMaterials(materials: MissionRequirement[]): MissionRequirement[] {
  const map = new Map<string, MissionRequirement>();
  materials.forEach(req => {
    const existing = map.get(req.itemName);
    if (existing) {
      existing.quantity += req.quantity;
    } else {
      map.set(req.itemName, { ...req });
    }
  });
  return Array.from(map.values());
}

export function computeMissionPlan(missionId: string, workshopLevels: Record<string, number>): MissionPlan | null {
  const mission = missionIndex[missionId];
  if (!mission) return null;

  let baseRequirements: MissionRequirement[] = [];
  let isComplete = false;

  if (mission.type === 'upgrade' && mission.target) {
    const bench = workbenches.find(w => w.id === mission.target!.benchId);
    if (!bench) return null;
    const currentLevel = workshopLevels[bench.id] || 1;
    if (currentLevel >= mission.target.targetLevel) {
      isComplete = true;
    } else {
      bench.levels
        .filter(level => level.level > currentLevel && level.level <= mission.target!.targetLevel)
        .forEach(level => {
          level.materials.forEach(mat => {
            baseRequirements.push({ itemName: mat.name, quantity: mat.quantity });
          });
        });
    }
  }

  if (mission.type === 'quest' && mission.requirements) {
    baseRequirements = mission.requirements;
  }

  const summarized = summarizeMaterials(baseRequirements);

  const requirements: RequirementSummary[] = summarized.map(req => {
    const itemData = lootDb.find(item => item.name.toLowerCase() === req.itemName.toLowerCase());
    const bestSpots = itemData ? getBestMapLocations(itemData) : [];
    const locationTag = itemData ? getLocationTag(itemData) : undefined;
    return {
      itemName: req.itemName,
      quantity: req.quantity,
      note: req.note,
      itemData,
      bestSpots,
      locationTag
    };
  });

  const routes = buildRoutes(requirements);

  return { mission, requirements, routes, isComplete };
}

function buildRoutes(requirements: RequirementSummary[]): RouteSuggestion[] {
  const mapRoutes: Record<string, RouteSuggestion> = {};

  requirements.forEach(req => {
    if (!req.bestSpots.length) return;
    const primary = req.bestSpots[0];
    if (!mapRoutes[primary.map]) {
      mapRoutes[primary.map] = { map: primary.map, hotspots: [] };
    }
    const existingHotspot = mapRoutes[primary.map].hotspots.find(h => h.hotspot === primary.hotspot);
    if (existingHotspot) {
      existingHotspot.items.push(req.itemName);
    } else {
      mapRoutes[primary.map].hotspots.push({ hotspot: primary.hotspot, tip: primary.tip, items: [req.itemName] });
    }
  });

  return Object.values(mapRoutes);
}

export function getMissionOptions() {
  return missions;
}
