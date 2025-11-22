export interface WorkshopMaterial {
  name: string;
  quantity: number;
}

export interface WorkshopLevel {
  level: number;
  materials: WorkshopMaterial[];
  unlocks: string[];
}

export interface Workbench {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  levels: WorkshopLevel[];
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  priorityNote: string;
}

export const workbenches: Workbench[] = [
  {
    id: 'gunsmith',
    name: 'Gunsmith',
    description: 'Craft and modify weapons',
    maxLevel: 3,
    priority: 'Critical',
    priorityNote: 'First upgrade priority - better weapons improve survival',
    levels: [
      {
        level: 1,
        materials: [
          { name: 'Metal Parts', quantity: 20 },
          { name: 'Rubber Parts', quantity: 30 }
        ],
        unlocks: ['Basic weapon repairs', 'Simple weapon crafting', 'Basic attachments']
      },
      {
        level: 2,
        materials: [
          { name: 'Rusted Tools', quantity: 3 },
          { name: 'Mechanical Components', quantity: 5 },
          { name: 'Wasp Driver', quantity: 8 }
        ],
        unlocks: ['Tier 2 weapons', 'Silencers', 'Advanced scopes', 'Arpeggio SMG', 'Tempest AR']
      },
      {
        level: 3,
        materials: [
          { name: 'Rusted Gear', quantity: 3 },
          { name: 'Advanced Mechanical Components', quantity: 5 },
          { name: 'Sentinel Firing Core', quantity: 4 }
        ],
        unlocks: ['Tier 3 weapons', 'Osprey Sniper', 'Anvil LMG', 'Advanced mods']
      }
    ]
  },
  {
    id: 'gear-bench',
    name: 'Gear Bench',
    description: 'Craft armor and augments',
    maxLevel: 3,
    priority: 'High',
    priorityNote: 'Heavy Shield dramatically increases survivability',
    levels: [
      {
        level: 1,
        materials: [
          { name: 'Plastic Parts', quantity: 25 },
          { name: 'Fabric', quantity: 30 }
        ],
        unlocks: ['Basic shields', 'Light augments', 'Backpack upgrades']
      },
      {
        level: 2,
        materials: [
          { name: 'Power Cable', quantity: 3 },
          { name: 'Electrical Components', quantity: 5 },
          { name: 'Hornet Driver', quantity: 5 }
        ],
        unlocks: ['Medium Shield', 'Looting Augment Mk.2', 'Combat Augment Mk.2']
      },
      {
        level: 3,
        materials: [
          { name: 'Industrial Battery', quantity: 3 },
          { name: 'Advanced Electrical Components', quantity: 5 },
          { name: 'Bastion Cell', quantity: 6 }
        ],
        unlocks: ['Heavy Shield', 'Looting Augment Mk.3', 'Combat Augment Mk.3']
      }
    ]
  },
  {
    id: 'medical-lab',
    name: 'Medical Lab',
    description: 'Craft healing items and medical supplies',
    maxLevel: 3,
    priority: 'High',
    priorityNote: 'Essential for solo survival - Vita Spray is game-changing',
    levels: [
      {
        level: 1,
        materials: [
          { name: 'Fabric', quantity: 50 },
          { name: 'ARC Alloy', quantity: 6 }
        ],
        unlocks: ['Bandages', 'Basic Medkit', 'Splint']
      },
      {
        level: 2,
        materials: [
          { name: 'Cracked Bioscanner', quantity: 2 },
          { name: 'Durable Cloth', quantity: 5 },
          { name: 'Tick Pod', quantity: 8 }
        ],
        unlocks: ['Advanced Bandages', 'Combat Stim', 'Adrenaline Shot']
      },
      {
        level: 3,
        materials: [
          { name: 'Rusted Shut Medical Kit', quantity: 3 },
          { name: 'Antiseptic', quantity: 8 },
          { name: 'Surveyor Vault', quantity: 5 }
        ],
        unlocks: ['Vita Spray', 'Emergency Medkit', 'Auto-Injector']
      }
    ]
  },
  {
    id: 'utility-station',
    name: 'Utility Station',
    description: 'Craft utility items and tools',
    maxLevel: 3,
    priority: 'Medium',
    priorityNote: 'Raider Hatch Keys and lures useful for stealth play',
    levels: [
      {
        level: 1,
        materials: [
          { name: 'Plastic Parts', quantity: 50 },
          { name: 'ARC Alloy', quantity: 6 }
        ],
        unlocks: ['Lockpicks', 'Flares', 'Basic tools']
      },
      {
        level: 2,
        materials: [
          { name: 'Damaged Heat Sink', quantity: 2 },
          { name: 'Electrical Components', quantity: 5 },
          { name: 'Snitch Scanner', quantity: 6 }
        ],
        unlocks: ['Raider Hatch Key', 'ARC Lure', 'Barricade']
      },
      {
        level: 3,
        materials: [
          { name: 'Fried Motherboard', quantity: 3 },
          { name: 'Advanced Electrical Components', quantity: 5 },
          { name: 'Leaper Pulse Unit', quantity: 4 }
        ],
        unlocks: ['Advanced Lure', 'EMP Device', 'Portable Shield']
      }
    ]
  },
  {
    id: 'explosives-station',
    name: 'Explosives Station',
    description: 'Craft grenades, mines, and explosives',
    maxLevel: 3,
    priority: 'Medium',
    priorityNote: 'Grenades help with ARC fights but optional for stealth',
    levels: [
      {
        level: 1,
        materials: [
          { name: 'Chemicals', quantity: 50 },
          { name: 'ARC Alloy', quantity: 6 }
        ],
        unlocks: ['Frag Grenade', 'Smoke Grenade', 'Basic mines']
      },
      {
        level: 2,
        materials: [
          { name: 'Synthesized Fuel', quantity: 3 },
          { name: 'Crude Explosives', quantity: 5 },
          { name: 'Pop Trigger', quantity: 5 }
        ],
        unlocks: ['Stun Grenade', 'Proximity Mine', 'Trigger Grenade']
      },
      {
        level: 3,
        materials: [
          { name: 'Laboratory Reagents', quantity: 3 },
          { name: 'Explosive Compound', quantity: 5 },
          { name: 'Rocketeer Driver', quantity: 3 }
        ],
        unlocks: ['EMP Grenade', 'C4 Charge', 'Remote Detonator']
      }
    ]
  },
  {
    id: 'refiner',
    name: 'Refiner',
    description: 'Convert basic materials into advanced components',
    maxLevel: 3,
    priority: 'High',
    priorityNote: 'Essential for crafting - converts 5 Metal Parts to 1 Mechanical Component',
    levels: [
      {
        level: 1,
        materials: [
          { name: 'Metal Parts', quantity: 60 },
          { name: 'ARC Powercell', quantity: 5 }
        ],
        unlocks: ['Basic material conversion', 'Crude Explosives crafting']
      },
      {
        level: 2,
        materials: [
          { name: 'Toaster', quantity: 3 },
          { name: 'ARC Motion Core', quantity: 5 },
          { name: 'Fireball Burner', quantity: 8 }
        ],
        unlocks: ['Mechanical Components', 'Electrical Components', 'Durable Cloth']
      },
      {
        level: 3,
        materials: [
          { name: 'Motor', quantity: 3 },
          { name: 'ARC Circuitry', quantity: 10 },
          { name: 'Bombardier Cell', quantity: 6 }
        ],
        unlocks: ['Advanced Mechanical Components', 'Advanced Electrical Components', 'Explosive Compound']
      }
    ]
  }
];

export interface ScrappyLevel {
  level: number;
  materials: WorkshopMaterial[];
  unlocks: string[];
}

export const scrappyUpgrades: ScrappyLevel[] = [
  {
    level: 2,
    materials: [
      { name: 'Dog Collar', quantity: 1 }
    ],
    unlocks: ['Increased loot variety', 'Faster gathering']
  },
  {
    level: 3,
    materials: [
      { name: 'Lemon', quantity: 3 },
      { name: 'Apricot', quantity: 3 }
    ],
    unlocks: ['Nature items', 'Better quality loot']
  },
  {
    level: 4,
    materials: [
      { name: 'Prickly Pear', quantity: 6 },
      { name: 'Olives', quantity: 6 },
      { name: 'Cat Bed', quantity: 1 }
    ],
    unlocks: ['Rare materials', 'Chemicals & seeds']
  },
  {
    level: 5,
    materials: [
      { name: 'Apricot', quantity: 12 },
      { name: 'Mushroom', quantity: 12 },
      { name: 'Very Comfortable Pillow', quantity: 3 }
    ],
    unlocks: ['Master Hoarder', 'Maximum loot quality', 'All material types']
  }
];

// Recommended upgrade order for solo players
export const upgradeOrder = [
  { id: 'gunsmith', targetLevel: 2, reason: 'Better weapons improve survival across all activities' },
  { id: 'scrappy', targetLevel: 2, reason: 'Passive income accelerates future upgrades' },
  { id: 'gear-bench', targetLevel: 2, reason: 'Medium Shield provides critical protection' },
  { id: 'refiner', targetLevel: 2, reason: 'Enables advanced component crafting' },
  { id: 'medical-lab', targetLevel: 2, reason: 'Better healing items for solo survival' },
  { id: 'gunsmith', targetLevel: 3, reason: 'Access to top-tier weapons' },
  { id: 'gear-bench', targetLevel: 3, reason: 'Heavy Shield and Mk.3 augments' },
  { id: 'medical-lab', targetLevel: 3, reason: 'Vita Spray is essential for endgame' },
  { id: 'refiner', targetLevel: 3, reason: 'Advanced components for all crafting' },
  { id: 'utility-station', targetLevel: 2, reason: 'Raider Hatch Keys for rare loot' },
  { id: 'scrappy', targetLevel: 5, reason: 'Maximum passive income' }
];
