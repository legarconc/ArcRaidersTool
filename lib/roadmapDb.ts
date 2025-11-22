import { lootDb, getBestMapLocations, getLocationTag, type Item, type MapLocation, type LocationTag } from './lootDb';

export type MissionType = 'quest' | 'upgrade' | 'skill' | 'loot' | 'craft';

export interface MissionRequirement {
  itemName: string;
  quantity: number;
  note?: string;
}

export interface RoadmapMission {
  id: string;
  step: number;
  phase: string;
  phaseSubtitle: string;
  title: string;
  description: string;
  why: string; // Explains WHY this step matters for progression
  type: MissionType;
  requirements: MissionRequirement[];
  unlocks: string[];
  tips: string[];
  targetBench?: string;
  targetLevel?: number;
  targetSkill?: string;
}

export interface RequirementDetail {
  itemName: string;
  quantity: number;
  note?: string;
  itemData?: Item;
  bestSpots: MapLocation[];
  locationTag?: LocationTag;
}

export interface MissionWithDetails extends RoadmapMission {
  requirementDetails: RequirementDetail[];
}

// ============================================================================
// RESEARCH-BACKED OPTIMAL PROGRESSION ORDER
// Based on community guides and solo play optimization
// ============================================================================

export const roadmapMissions: RoadmapMission[] = [
  // ════════════════════════════════════════════════════════════════════════════
  // PHASE 1: THE RAT (Levels 1-5)
  // Focus: Establish economy, unlock passive income, build mobility
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 'mission-1',
    step: 1,
    phase: 'Phase 1: The Rat',
    phaseSubtitle: 'Survive & Establish Economy (Levels 1-5)',
    title: 'Unlock Basic Trading',
    description: 'Complete the introductory quest to enable trading with Haven merchants.',
    why: 'Trading is your lifeline. Without it, you cannot buy essential supplies or sell loot for cash.',
    type: 'quest',
    requirements: [
      { itemName: 'Rusted Tools', quantity: 4, note: 'Industrial areas, garages' },
      { itemName: 'Metal Parts', quantity: 25, note: 'Everywhere - focus Dam Battlegrounds' },
      { itemName: 'Electrical Components', quantity: 3, note: 'Refiner craft OR tech buildings' }
    ],
    unlocks: ['Basic trading posts in Haven', 'Ability to sell loot', 'Access to merchant supplies'],
    tips: [
      'This is given by Shani at camp',
      'Dam Battlegrounds has high loot density for early runs',
      'Avoid PvP hotspots - run from other players'
    ]
  },
  {
    id: 'mission-2',
    step: 2,
    phase: 'Phase 1: The Rat',
    phaseSubtitle: 'Survive & Establish Economy (Levels 1-5)',
    title: 'First Skill Point: Marathon Runner',
    description: 'Invest your first skill point into Marathon Runner (Mobility tree).',
    why: 'Your #1 defense is running away. Reduced stamina cost = longer escapes = survival.',
    type: 'skill',
    targetSkill: 'marathon-runner',
    requirements: [],
    unlocks: ['-5% stamina cost for sprinting', 'Foundation for mobility build'],
    tips: [
      'Stamina is more valuable than damage early game',
      'You can outrun most threats if you conserve stamina',
      'Put 5 points here as you level up'
    ]
  },
  {
    id: 'mission-3',
    step: 3,
    phase: 'Phase 1: The Rat',
    phaseSubtitle: 'Survive & Establish Economy (Levels 1-5)',
    title: 'Wake Up Scrappy',
    description: 'Complete Unexpected Initiative quest to unlock Scrappy, your passive loot gatherer.',
    why: 'Scrappy generates FREE materials while you are offline. Critical for solo players who cannot farm 24/7.',
    type: 'quest',
    requirements: [
      { itemName: 'Fertilizer', quantity: 1, note: 'Rooftop of Grandioso Apartments' },
      { itemName: 'Water Pump', quantity: 1, note: 'Piazza Roma rooftop gardens' }
    ],
    unlocks: ['Scrappy companion', 'Passive material generation', 'Camp upgrade path'],
    tips: [
      'Both items are in Buried City - do in ONE run',
      'Grandioso Apts is near the center spawn',
      'Water Pump is on rooftop near Piazza Roma fountain',
      'Extract from the closest point after grabbing both'
    ]
  },
  {
    id: 'mission-4',
    step: 4,
    phase: 'Phase 1: The Rat',
    phaseSubtitle: 'Survive & Establish Economy (Levels 1-5)',
    title: 'Upgrade Scrappy to Level 2',
    description: 'Find a Dog Collar to upgrade Scrappy for better passive drops.',
    why: 'Level 2 Scrappy gathers more diverse materials. Every upgrade compounds over time.',
    type: 'upgrade',
    targetBench: 'scrappy',
    targetLevel: 2,
    requirements: [
      { itemName: 'Dog Collar', quantity: 1, note: 'Residential areas - kitchens, living rooms' }
    ],
    unlocks: ['Increased loot variety', 'Faster gathering speed'],
    tips: [
      'Check residential apartments in Buried City',
      'Dog Collars spawn near pet beds and living areas',
      'Blue Gate residential also has good spawn rates'
    ]
  },
  {
    id: 'mission-5',
    step: 5,
    phase: 'Phase 1: The Rat',
    phaseSubtitle: 'Survive & Establish Economy (Levels 1-5)',
    title: 'Max Mobility Foundation',
    description: 'Put points into Youthful Lungs (5 pts) for maximum stamina pool.',
    why: 'More stamina = longer sprints. Combined with Marathon Runner, you become nearly uncatchable.',
    type: 'skill',
    targetSkill: 'youthful-lungs',
    requirements: [],
    unlocks: ['+50% max stamina at 5 points', 'Ability to cross entire zones without stopping'],
    tips: [
      'This is the second priority after Marathon Runner',
      'Together they make escape nearly guaranteed',
      'At level 10 you should have both maxed'
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PHASE 2: THE SCAVENGER (Levels 5-15)
  // Focus: Secure crafting, unlock key benches, build looting efficiency
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 'mission-6',
    step: 6,
    phase: 'Phase 2: The Scavenger',
    phaseSubtitle: 'Stabilize & Craft (Levels 5-15)',
    title: 'Upgrade Gunsmith to Level 2',
    description: 'First workshop priority - better weapons dramatically improve survival.',
    why: 'DPS is king in Arc Raiders. Better weapons = faster kills = less exposure to danger.',
    type: 'upgrade',
    targetBench: 'gunsmith',
    targetLevel: 2,
    requirements: [
      { itemName: 'Rusted Tools', quantity: 3, note: 'Industrial buildings, garages' },
      { itemName: 'Mechanical Components', quantity: 5, note: 'Craft at Refiner OR loot tech areas' },
      { itemName: 'Wasp Driver', quantity: 8, note: 'Kill Wasp ARC units' }
    ],
    unlocks: ['Tier 2 weapons', 'Silencers', 'Advanced scopes', 'Arpeggio SMG', 'Tempest AR'],
    tips: [
      'Wasps are flying ARC units - use pistol/SMG',
      'Mechanical Components can be crafted at Refiner L1 (5 Metal Parts = 1)',
      'Prioritize this over other benches'
    ]
  },
  {
    id: 'mission-7',
    step: 7,
    phase: 'Phase 2: The Scavenger',
    phaseSubtitle: 'Stabilize & Craft (Levels 5-15)',
    title: 'Unlock Medical Lab',
    description: "Complete Doctor's Orders quest to unlock the Medical Lab workbench.",
    why: 'Stop relying on found meds. Crafting your own healing items is essential for solo survival.',
    type: 'quest',
    requirements: [
      { itemName: 'Great Mullein', quantity: 5, note: 'Nature areas - Dam Testing Annex bushes' },
      { itemName: 'Antiseptic', quantity: 4, note: 'Medical buildings, pharmacies' },
      { itemName: 'Syringe', quantity: 3, note: 'Medical facilities, clinics' }
    ],
    unlocks: ['Medical Lab workbench', 'Bandage crafting', 'Self-sustaining healing'],
    tips: [
      'Great Mullein is a plant - look for yellow flowers',
      'Dam has good nature spawns near the testing annex',
      'Medical items cluster in hospital/clinic buildings'
    ]
  },
  {
    id: 'mission-8',
    step: 8,
    phase: 'Phase 2: The Scavenger',
    phaseSubtitle: 'Stabilize & Craft (Levels 5-15)',
    title: 'Unlock In-Round Crafting',
    description: 'Invest 6 points in Survival tree to unlock In-Round Crafting (requires 15 pts in branch).',
    why: 'Turn found fabric into bandages MID-RAID. Saves inventory space and ensures you never run out of heals.',
    type: 'skill',
    targetSkill: 'in-round-crafting',
    requirements: [],
    unlocks: ['Craft basic items during raids', 'Bandages, Shield Rechargers, Grenades in-field'],
    tips: [
      'Path: Agile Croucher (2) + Revitalizing Squat (3) + other skills to 15',
      'This is a GAME CHANGER for solo play',
      'Prioritize after mobility foundation is set'
    ]
  },
  {
    id: 'mission-9',
    step: 9,
    phase: 'Phase 2: The Scavenger',
    phaseSubtitle: 'Stabilize & Craft (Levels 5-15)',
    title: 'Upgrade Medical Lab to Level 2',
    description: 'Unlock advanced healing items for better survivability.',
    why: 'Advanced Bandages and Combat Stims give you the edge in prolonged fights.',
    type: 'upgrade',
    targetBench: 'medical-lab',
    targetLevel: 2,
    requirements: [
      { itemName: 'Cracked Bioscanner', quantity: 2, note: 'Medical POIs, hospital labs' },
      { itemName: 'Durable Cloth', quantity: 5, note: 'Craft at Refiner (Fabric conversion)' },
      { itemName: 'Tick Pod', quantity: 8, note: 'Kill Tick ARC units' }
    ],
    unlocks: ['Advanced Bandages', 'Combat Stim', 'Adrenaline Shot'],
    tips: [
      'Ticks are small spider-like ARC units',
      'They often appear in groups - use explosives',
      'Durable Cloth requires Refiner L2 to craft'
    ]
  },
  {
    id: 'mission-10',
    step: 10,
    phase: 'Phase 2: The Scavenger',
    phaseSubtitle: 'Stabilize & Craft (Levels 5-15)',
    title: "Max Looter's Instincts",
    description: "Put 5 points into Looter's Instincts for maximum search speed.",
    why: 'Less time looting = less time exposed to danger. 50% faster searches at max rank.',
    type: 'skill',
    targetSkill: 'looters-instincts',
    requirements: [],
    unlocks: ['-50% search time at 5 points', 'Safer looting in hot zones'],
    tips: [
      'This is a CRITICAL skill for solo players',
      'Faster looting means faster extracts',
      'Combine with In-Round Crafting for efficiency'
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PHASE 3: THE OPERATOR (Levels 15-25)
  // Focus: Survivability spike, meta loadout, combat effectiveness
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 'mission-11',
    step: 11,
    phase: 'Phase 3: The Operator',
    phaseSubtitle: 'Fight & Dominate (Levels 15-25)',
    title: 'Upgrade Refiner to Level 2',
    description: 'Enable crafting of Mechanical and Electrical Components.',
    why: 'The Refiner is your bottleneck breaker. Convert abundant materials into rare components.',
    type: 'upgrade',
    targetBench: 'refiner',
    targetLevel: 2,
    requirements: [
      { itemName: 'Toaster', quantity: 3, note: 'Residential kitchens' },
      { itemName: 'ARC Motion Core', quantity: 5, note: 'Medium ARC units (Surveyors, Hornets)' },
      { itemName: 'Fireball Burner', quantity: 8, note: 'Kill Fireball ARC units' }
    ],
    unlocks: ['Mechanical Components crafting', 'Electrical Components crafting', 'Durable Cloth crafting'],
    tips: [
      'Fireballs are aggressive flame ARC units',
      'ARC Motion Cores drop from medium-sized ARC',
      'Toasters are common in apartment kitchens'
    ]
  },
  {
    id: 'mission-12',
    step: 12,
    phase: 'Phase 3: The Operator',
    phaseSubtitle: 'Fight & Dominate (Levels 15-25)',
    title: 'THE SURVIVABILITY SPIKE: Gear Bench L2',
    description: 'Unlock Medium Shield - the most important single upgrade in the game.',
    why: 'Medium Shield stops you from getting one-shot. This is THE turning point in your progression.',
    type: 'upgrade',
    targetBench: 'gear-bench',
    targetLevel: 2,
    requirements: [
      { itemName: 'Power Cable', quantity: 3, note: 'Industrial buildings, power stations' },
      { itemName: 'Electrical Components', quantity: 5, note: 'Craft at Refiner L2' },
      { itemName: 'Hornet Driver', quantity: 5, note: 'Kill Hornet ARC units' }
    ],
    unlocks: ['Medium Shield', 'Looting Augment Mk.2', 'Combat Augment Mk.2'],
    tips: [
      'THIS IS YOUR #1 PRIORITY AT THIS STAGE',
      'Hornets are flying ARC - target the Driver component',
      'Power Cables are in industrial/electrical areas',
      'Never deploy without Medium Shield again'
    ]
  },
  {
    id: 'mission-13',
    step: 13,
    phase: 'Phase 3: The Operator',
    phaseSubtitle: 'Fight & Dominate (Levels 15-25)',
    title: 'Craft Your First Medium Shield',
    description: 'Use Gear Bench L2 to craft a Medium Shield before your next raid.',
    why: 'The shield absorbs massive damage. Combined with healing, you become very hard to kill.',
    type: 'craft',
    requirements: [
      { itemName: 'ARC Alloy', quantity: 8, note: 'All ARC units drop this' },
      { itemName: 'Electrical Components', quantity: 3, note: 'Craft at Refiner' },
      { itemName: 'Durable Cloth', quantity: 2, note: 'Craft at Refiner (from Fabric)' }
    ],
    unlocks: ['Massive HP boost', 'Ability to tank multiple hits', 'Confidence to engage threats'],
    tips: [
      'Always keep a backup shield in stash',
      'Shield breaks? Extract immediately',
      'Pair with Combat Stim for maximum tankiness'
    ]
  },
  {
    id: 'mission-14',
    step: 14,
    phase: 'Phase 3: The Operator',
    phaseSubtitle: 'Fight & Dominate (Levels 15-25)',
    title: 'Upgrade Gunsmith to Level 3',
    description: 'Unlock tier 3 weapons including the Anvil Hand Cannon.',
    why: 'The Anvil is the solo meta weapon. Hits like a sniper, handles like a pistol, cheap ammo.',
    type: 'upgrade',
    targetBench: 'gunsmith',
    targetLevel: 3,
    requirements: [
      { itemName: 'Rusted Gear', quantity: 3, note: 'Industrial machinery, garages' },
      { itemName: 'Advanced Mechanical Components', quantity: 5, note: 'Craft at Refiner L3 OR rare loot' },
      { itemName: 'Sentinel Firing Core', quantity: 4, note: 'Kill Sentinel ARC units (large bipeds)' }
    ],
    unlocks: ['Tier 3 weapons', 'Osprey Sniper', 'Anvil Hand Cannon', 'Advanced mods'],
    tips: [
      'Sentinels are tough - use cover and grenades',
      'Firing Core is a rare drop - may take multiple kills',
      'Advanced Mech Components require Refiner L3'
    ]
  },
  {
    id: 'mission-15',
    step: 15,
    phase: 'Phase 3: The Operator',
    phaseSubtitle: 'Fight & Dominate (Levels 15-25)',
    title: 'Unlock Used to the Weight',
    description: 'Put 5 points into Used to the Weight (Conditioning) to offset shield penalties.',
    why: 'Heavy shields slow you down. This skill negates the movement penalty so you stay mobile.',
    type: 'skill',
    targetSkill: 'used-to-the-weight',
    requirements: [],
    unlocks: ['-40% shield movement penalty at 5 points', 'Full mobility with heavy gear'],
    tips: [
      'Essential for Heavy Shield users later',
      'Stacks with mobility skills for maximum speed',
      'Priority after core survival skills'
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PHASE 4: THE APEX (Levels 25+)
  // Focus: Endgame optimization, passive income, dominance
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 'mission-16',
    step: 16,
    phase: 'Phase 4: The Apex',
    phaseSubtitle: 'Dominate & Optimize (Levels 25+)',
    title: 'Upgrade Gear Bench to Level 3',
    description: 'Unlock Heavy Shield for maximum protection.',
    why: 'Heavy Shield + Used to the Weight = tank mode. You can face-tank most threats.',
    type: 'upgrade',
    targetBench: 'gear-bench',
    targetLevel: 3,
    requirements: [
      { itemName: 'Industrial Battery', quantity: 3, note: 'Industrial areas, power plants' },
      { itemName: 'Advanced Electrical Components', quantity: 5, note: 'Craft at Refiner L3' },
      { itemName: 'Bastion Cell', quantity: 6, note: 'Kill Bastion ARC units (heavy walkers)' }
    ],
    unlocks: ['Heavy Shield', 'Looting Augment Mk.3', 'Combat Augment Mk.3'],
    tips: [
      'Bastions are mini-bosses - bring friends or heavy weapons',
      'Bastion Cells are guaranteed drops',
      'Heavy Shield is the endgame survivability option'
    ]
  },
  {
    id: 'mission-17',
    step: 17,
    phase: 'Phase 4: The Apex',
    phaseSubtitle: 'Dominate & Optimize (Levels 25+)',
    title: 'Upgrade Medical Lab to Level 3',
    description: 'Unlock Vita Spray - the ultimate solo healing item.',
    why: 'Vita Spray lets you heal WHILE SPRINTING. This is the ultimate solo advantage.',
    type: 'upgrade',
    targetBench: 'medical-lab',
    targetLevel: 3,
    requirements: [
      { itemName: 'Rusted Shut Medical Kit', quantity: 3, note: 'Medical facilities, hospitals' },
      { itemName: 'Antiseptic', quantity: 8, note: 'Medical areas, pharmacies' },
      { itemName: 'Surveyor Vault', quantity: 5, note: 'Kill Surveyor ARC units' }
    ],
    unlocks: ['Vita Spray', 'Emergency Medkit', 'Auto-Injector'],
    tips: [
      'Surveyors are flying scanner ARC units',
      'Rusted Medical Kits are rare - check all medical POIs',
      'Vita Spray + Heavy Shield = unkillable'
    ]
  },
  {
    id: 'mission-18',
    step: 18,
    phase: 'Phase 4: The Apex',
    phaseSubtitle: 'Dominate & Optimize (Levels 25+)',
    title: 'Unlock Security Breach',
    description: 'Invest points to unlock Security Breach (requires 36 pts in Survival).',
    why: 'Access red security lockers without keys. These contain high-value materials and blueprints.',
    type: 'skill',
    targetSkill: 'security-breach',
    requirements: [],
    unlocks: ['Open red security containers', 'Access to rare loot without keys', 'Massive loot value increase'],
    tips: [
      'Requires 36 points in Survival branch',
      'Security lockers are in military/secure areas',
      'Best loot in the game behind these doors'
    ]
  },
  {
    id: 'mission-19',
    step: 19,
    phase: 'Phase 4: The Apex',
    phaseSubtitle: 'Dominate & Optimize (Levels 25+)',
    title: 'Max Scrappy to Level 5',
    description: 'Gather fruits and comfort items to maximize Scrappy passive income.',
    why: 'Level 5 Scrappy generates rare materials including mushrooms while you sleep. Free resources forever.',
    type: 'upgrade',
    targetBench: 'scrappy',
    targetLevel: 5,
    requirements: [
      { itemName: 'Lemon', quantity: 3, note: 'Fruit trees - Blue Gate orchard areas' },
      { itemName: 'Apricot', quantity: 15, note: 'Fruit trees - various nature areas' },
      { itemName: 'Prickly Pear', quantity: 6, note: 'Desert areas, cacti' },
      { itemName: 'Olives', quantity: 6, note: 'Blue Gate olive groves' },
      { itemName: 'Mushroom', quantity: 12, note: 'Dark areas, caves, under trees' },
      { itemName: 'Cat Bed', quantity: 1, note: 'Residential apartments' },
      { itemName: 'Very Comfortable Pillow', quantity: 3, note: 'Residential bedrooms' }
    ],
    unlocks: ['Master Hoarder title', 'Maximum loot quality', 'All material types passively'],
    tips: [
      'Dedicated fruit farming runs to Blue Gate',
      'Olives are near the olive grove in Blue Gate',
      'Mushrooms are in dark/damp locations',
      'Comfort items are in residential bedrooms'
    ]
  },
  {
    id: 'mission-20',
    step: 20,
    phase: 'Phase 4: The Apex',
    phaseSubtitle: 'Dominate & Optimize (Levels 25+)',
    title: 'Upgrade Refiner to Level 3',
    description: 'Enable crafting of Advanced Components for endgame gear.',
    why: 'Advanced Components are required for all Level 3 bench recipes. This is your crafting capstone.',
    type: 'upgrade',
    targetBench: 'refiner',
    targetLevel: 3,
    requirements: [
      { itemName: 'Motor', quantity: 3, note: 'Industrial machinery, vehicles' },
      { itemName: 'ARC Circuitry', quantity: 10, note: 'Medium-large ARC units' },
      { itemName: 'Bombardier Cell', quantity: 6, note: 'Kill Bombardier ARC units' }
    ],
    unlocks: ['Advanced Mechanical Components', 'Advanced Electrical Components', 'Explosive Compound'],
    tips: [
      'Bombardiers are artillery ARC units',
      'ARC Circuitry drops from Surveyors, Hornets, Sentinels',
      'Motors are in industrial machinery rooms'
    ]
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getMissionWithDetails(mission: RoadmapMission): MissionWithDetails {
  const requirementDetails: RequirementDetail[] = mission.requirements.map(req => {
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

  return { ...mission, requirementDetails };
}

export function getPhases(): string[] {
  const phases: string[] = [];
  roadmapMissions.forEach(m => {
    if (!phases.includes(m.phase)) phases.push(m.phase);
  });
  return phases;
}

export function getMissionsByPhase(phase: string): RoadmapMission[] {
  return roadmapMissions.filter(m => m.phase === phase);
}

export function getNextIncompleteMission(completedIds: string[]): RoadmapMission | null {
  return roadmapMissions.find(m => !completedIds.includes(m.id)) || null;
}

export function calculateProgress(completedIds: string[]): { completed: number; total: number; percent: number } {
  const total = roadmapMissions.length;
  const completed = completedIds.length;
  const percent = Math.round((completed / total) * 100);
  return { completed, total, percent };
}
