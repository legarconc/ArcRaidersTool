import { workbenches, scrappyUpgrades } from './workshopDb';
import { lootDb, Item, getBestMapLocations, getLocationTag, MapLocation } from './lootDb';

export type MissionType = 'upgrade' | 'quest';

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

interface MissionGroup {
  id: string;
  label: string;
  missions: Mission[];
}

interface PlannerBench {
  id: string;
  name: string;
  description: string;
  levels: Array<{
    level: number;
    materials: MissionRequirement[];
    unlocks: string[];
  }>;
}

export interface MissionCollections {
  upgradeGroups: MissionGroup[];
  upgradeMissions: Mission[];
  questMissions: Mission[];
}

const scrappyBench: PlannerBench = {
  id: 'scrappy',
  name: 'Scrappy',
  description: 'Passive gathering buddy for the camp.',
  levels: scrappyUpgrades.map(level => ({
    level: level.level,
    materials: level.materials.map(mat => ({ itemName: mat.name, quantity: mat.quantity })),
    unlocks: level.unlocks
  }))
};

const plannerBenches: PlannerBench[] = [
  ...workbenches.map(bench => ({
    id: bench.id,
    name: bench.name,
    description: bench.description,
    levels: bench.levels.map(level => ({
      level: level.level,
      materials: level.materials.map(mat => ({ itemName: mat.name, quantity: mat.quantity })),
      unlocks: level.unlocks
    }))
  })),
  scrappyBench
];

const benchNameMap = plannerBenches.reduce((acc, bench) => {
  acc[bench.id] = bench.name;
  return acc;
}, {} as Record<string, string>);

export function getBenchDisplayName(benchId: string) {
  return benchNameMap[benchId];
}

const upgradeMissionGroups: MissionGroup[] = plannerBenches
  .map(bench => {
    const missions = bench.levels
      .filter(level => level.level > 1)
      .map(level => {
        const unlockSummary = level.unlocks.join(', ');
        return {
          id: `${bench.id}-level-${level.level}`,
          type: 'upgrade' as const,
          title: `${bench.name} → Level ${level.level}`,
          description: unlockSummary ? `Unlocks: ${unlockSummary}` : `Upgrade ${bench.name} to level ${level.level}.`,
          target: { benchId: bench.id, targetLevel: level.level },
          rewardNote: unlockSummary || undefined
        } satisfies Mission;
      });
    return { id: bench.id, label: bench.name, missions };
  })
  .filter(group => group.missions.length > 0);

const upgradeMissions = upgradeMissionGroups.flatMap(group => group.missions);

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

const questMissions: Mission[] = [
  {
    id: 'quest-unexpected-initiative',
    type: 'quest',
    title: 'Quest: Unexpected Initiative',
    description: 'Find supplies in Buried City (Grandioso Apts & Piazza Roma). Must extract in one run.',
    requirements: [
      { itemName: 'Fertilizer', quantity: 1, note: 'Rooftop of Grandioso Apts' },
      { itemName: 'Water Pump', quantity: 1, note: 'Rooftop garden near Piazza Roma' }
    ],
    rewardNote: 'Improves Scrappy drops + XP'
  },
  {
    id: 'quest-doctors-orders',
    type: 'quest',
    title: "Quest: Doctor's Orders",
    description: 'Gather herbal supplies for the camp medic.',
    requirements: [
      { itemName: 'Great Mullein', quantity: 5 },
      { itemName: 'Antiseptic', quantity: 4 },
      { itemName: 'Syringe', quantity: 3 }
    ],
    rewardNote: 'Unlocks advanced med crafting + camp XP'
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
  },
  {
    id: 'quest-snap-and-salvage',
    type: 'quest',
    title: 'Quest: Snap and Salvage',
    description: 'Recover specialty electronics for the Archivist.',
    requirements: [
      { itemName: 'Flow Controller', quantity: 1 },
      { itemName: 'Magnetron', quantity: 1 },
      { itemName: 'Rusted Tools', quantity: 4 }
    ],
    rewardNote: 'Unlocks photo archive progression'
  },
  {
    id: 'quest-tribute-to-toledo',
    type: 'quest',
    title: 'Quest: Tribute to Toledo',
    description: 'Secure rare ARC tech for the desert outpost ceremony.',
    requirements: [
      { itemName: 'Power Rod', quantity: 1 },
      { itemName: 'ARC Alloy', quantity: 10 },
      { itemName: 'Magnetic Accelerator', quantity: 1 }
    ],
    rewardNote: 'Unlocks Tribute event + Matriarch intel'
  },
  {
    id: 'quest-armored-transports',
    type: 'quest',
    title: 'Quest: Armored Transports',
    description: 'Refit captured patrol carriers for resistance use.',
    requirements: [
      { itemName: 'ARC Circuitry', quantity: 6 },
      { itemName: 'ARC Motion Core', quantity: 4 },
      { itemName: 'ARC Powercell', quantity: 8 }
    ],
    rewardNote: 'Unlocks Patrol Car Keys + vehicle cache intel'
  }
];

const allMissions = [...upgradeMissions, ...questMissions];

const missionIndex: Record<string, Mission> = allMissions.reduce((acc, mission) => {
  acc[mission.id] = mission;
  return acc;
}, {} as Record<string, Mission>);

export function getMissionOptions(): MissionCollections {
  return {
    upgradeGroups: upgradeMissionGroups,
    upgradeMissions,
    questMissions
  };
}

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

export function computeMissionPlan(
  missionId: string,
  workshopLevels: Record<string, number>,
  scrappyLevel: number
): MissionPlan | null {
  const mission = missionIndex[missionId];
  if (!mission) return null;

  let baseRequirements: MissionRequirement[] = [];
  let isComplete = false;

  if (mission.type === 'upgrade' && mission.target) {
    const bench = plannerBenches.find(w => w.id === mission.target!.benchId);
    if (!bench) return null;
    const currentLevel = bench.id === 'scrappy' ? (scrappyLevel || 1) : (workshopLevels[bench.id] || 1);
    if (currentLevel >= mission.target.targetLevel) {
      isComplete = true;
    } else {
      bench.levels
        .filter(level => level.level > currentLevel && level.level <= mission.target!.targetLevel)
        .forEach(level => {
          level.materials.forEach(mat => {
            baseRequirements.push({ itemName: mat.itemName, quantity: mat.quantity });
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
