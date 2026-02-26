export interface ProjectRequirement {
  item: string;
  qty: string;
}

export interface ProjectStage {
  name: string;
  description?: string;
  requirements: ProjectRequirement[];
  rewards?: ProjectRequirement[];
  note?: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'Active' | 'Recurring' | 'Past';
  dateRange?: string;
  description: string;
  stages: ProjectStage[];
  completionRewards?: string[];
}

export const projects: Project[] = [
  {
    id: 'expedition',
    name: 'Expedition',
    status: 'Recurring',
    dateRange: 'Dec 22, 2025 – Mar 1, 2026',
    description:
      'A 69-day recurring project where players prepare a caravan and send their Raider on an expedition. Completing it resets progression but grants permanent rewards including stash space and skill points.',
    stages: [
      {
        name: 'Foundation',
        requirements: [
          { item: 'Metal Parts',          qty: '150x'  },
          { item: 'Rubber Parts (Exp 1)', qty: '200x'  },
          { item: 'Plastic Parts (Exp 2)',qty: '200x'  },
          { item: 'ARC Alloy',            qty: '80x'   },
          { item: 'Steel Springs',        qty: '15x'   },
        ],
      },
      {
        name: 'Core Systems',
        requirements: [
          { item: 'Durable Cloth',            qty: '35x' },
          { item: 'Wires',                    qty: '30x' },
          { item: 'Electrical Components',    qty: '30x' },
          { item: 'Cooling Fans (Exp 1)',     qty: '5x'  },
          { item: 'Cooling Coils (Exp 2)',    qty: '5x'  },
        ],
      },
      {
        name: 'Framework',
        requirements: [
          { item: 'Light Bulbs',    qty: '5x'  },
          { item: 'Batteries',      qty: '30x' },
          { item: 'Sensors',        qty: '20x' },
          { item: 'Exodus Module',  qty: '1x'  },
        ],
      },
      {
        name: 'Outfitting',
        requirements: [
          { item: 'Humidifiers',                    qty: '5x' },
          { item: 'Advanced Electrical Components', qty: '5x' },
          { item: 'Magnetic Accelerators',          qty: '3x' },
          { item: 'Leaper Pulse Units',             qty: '3x' },
        ],
      },
      {
        name: 'Load',
        requirements: [
          { item: 'Combat Items',   qty: '250,000 coins' },
          { item: 'Survival Items', qty: '100,000 coins' },
          { item: 'Provisions',     qty: '180,000 coins' },
          { item: 'Materials',      qty: '300,000 coins' },
        ],
      },
      {
        name: 'Departure',
        note: 'Registration window: Feb 25 – Mar 1, 2026',
        requirements: [],
      },
    ],
    completionRewards: [
      'Exclusive outfit variants',
      'Cosmetic headgear',
      '+12 stash space per expedition',
      'Up to 5 skill points',
      'Repair, XP, and material buffs',
    ],
  },
  {
    id: 'weather-monitor',
    name: 'Weather Monitor System',
    status: 'Active',
    dateRange: 'Started Feb 24, 2026',
    description:
      'Collect the required parts to build a private weather station, and help monitor the turbulent weather above.',
    stages: [
      {
        name: 'Atmospheric Pressure',
        description: 'Lets you measure if that heavy weight on your shoulders is actually just the air.',
        requirements: [
          { item: 'Plastic Parts', qty: '25x' },
          { item: 'Metal Parts',   qty: '15x' },
          { item: 'ARC Alloy',     qty: '5x'  },
          { item: 'Oil',           qty: '3x'  },
        ],
        rewards: [
          { item: 'Durable Cloth',  qty: '5x' },
          { item: 'Great Mullein',  qty: '5x' },
          { item: 'Antiseptics',    qty: '5x' },
          { item: 'Vita Shots',     qty: '3x' },
        ],
      },
      {
        name: 'Sunlight',
        description: 'Sunlight might be sparse in Speranza, but ultraviolet rays can still be measured by the right equipment.',
        requirements: [
          { item: 'Snitch Scanner',  qty: '1x' },
          { item: 'Wires',           qty: '3x' },
          { item: 'Sensors',         qty: '3x' },
          { item: 'Comet Igniter',   qty: '1x' },
        ],
        rewards: [
          { item: 'Processors',                     qty: '10x' },
          { item: 'Advanced Electrical Components', qty: '5x'  },
          { item: 'Zipline',                        qty: '3x'  },
          { item: 'Raider Hatch Key',               qty: '1x'  },
        ],
      },
      {
        name: 'Precipitation',
        description: 'Very few parts of Speranza are completely waterproof. Now you can say it\'s for science.',
        requirements: [
          { item: 'ARC Powercell',   qty: '5x' },
          { item: 'Canister',        qty: '5x' },
          { item: 'Steel Spring',    qty: '5x' },
          { item: 'Fine Wristwatch', qty: '1x' },
        ],
        rewards: [
          { item: 'Medium Gun Parts',               qty: '3x' },
          { item: 'Complex Gun Parts',              qty: '2x' },
          { item: 'Advanced Mechanical Components', qty: '3x' },
          { item: 'Renegade III',                   qty: '1x' },
        ],
      },
      {
        name: 'Humidity',
        description: 'Great for keeping your skin looking luminous, and your walls somewhat moldy.',
        requirements: [
          { item: 'Duct Tape',    qty: '10x' },
          { item: 'Rusted Bolts', qty: '3x'  },
          { item: 'Water Pump',   qty: '1x'  },
          { item: 'Wasp Driver',  qty: '3x'  },
        ],
        rewards: [
          { item: 'Explosive Compound', qty: '10x' },
          { item: 'Showstoppers',       qty: '3x'  },
          { item: 'Trailblazer',        qty: '3x'  },
          { item: 'Extended Barrel',    qty: '1x'  },
        ],
      },
      {
        name: 'Temperature',
        description: 'Significantly more accurate than counting shivers per minute.',
        requirements: [
          { item: 'Camera Lens',       qty: '3x' },
          { item: 'Damaged Heat Sink', qty: '1x' },
          { item: 'Firefly Burner',    qty: '1x' },
          { item: 'Voltage Converter', qty: '3x' },
        ],
        rewards: [
          { item: 'Medium Shield',           qty: '1x' },
          { item: 'Surge Shield Recharger',  qty: '5x' },
          { item: 'Sterilized Bandage',      qty: '3x' },
          { item: 'Tactical Mk. 3 (Revival)',qty: '1x' },
        ],
      },
    ],
    completionRewards: [
      'Anemometer (Backpack Charm)',
      '250x Raider Tokens',
    ],
  },
  {
    id: 'trophy-display',
    name: 'Trophy Display',
    status: 'Active',
    dateRange: 'Started Jan 27, 2026',
    description:
      'Construct hunting trophies to validate tales of Topside adventures against ARC threats.',
    stages: [
      {
        name: 'Roaming Threats',
        requirements: [
          { item: 'Rusted Bolts',   qty: '3x'  },
          { item: 'Mod Components', qty: '10x' },
          { item: 'Pop Trigger',    qty: '15x' },
          { item: 'Power Rod',      qty: '3x'  },
          { item: 'Tick Pod',       qty: '15x' },
        ],
        rewards: [
          { item: 'Raider Tokens',             qty: '10x' },
          { item: 'Surveyor Vault',            qty: '5x'  },
          { item: 'Light Gun Parts Blueprint', qty: '1x'  },
        ],
      },
      {
        name: 'Soaring Menaces',
        requirements: [
          { item: 'Spotter Relay',        qty: '10x' },
          { item: 'Vita Spray',           qty: '3x'  },
          { item: 'Expired Respirator',   qty: '3x'  },
          { item: 'Photoelectric Cloak',  qty: '3x'  },
          { item: 'Wasp Driver',          qty: '20x' },
        ],
        rewards: [
          { item: 'Raider Tokens',       qty: '20x' },
          { item: 'Hornet Driver',       qty: '15x' },
          { item: 'Vita Shot Blueprint', qty: '1x'  },
        ],
      },
      {
        name: 'Ferocious Foes',
        requirements: [
          { item: 'ARC Performance Steel', qty: '10x' },
          { item: 'Kinetic Converter',     qty: '1x'  },
          { item: 'Shredder Gyro',         qty: '5x'  },
          { item: 'Anvil Splitter',        qty: '3x'  },
          { item: 'Leaper Pulse Unit',     qty: '10x' },
        ],
        rewards: [
          { item: 'Raider Tokens',             qty: '30x' },
          { item: 'Bastion Cell',              qty: '5x'  },
          { item: 'Shotgun Silencer Blueprint',qty: '1x'  },
        ],
      },
      {
        name: 'Dominant Dangers',
        requirements: [
          { item: 'ARC Synthetic Resin',  qty: '10x' },
          { item: 'Bobcat IV',            qty: '1x'  },
          { item: 'Magnetic Accelerator', qty: '10x' },
          { item: 'Wolfpack',             qty: '5x'  },
          { item: 'Rocketeer Driver',     qty: '8x'  },
        ],
        rewards: [
          { item: 'Raider Tokens',  qty: '40x' },
          { item: 'Queen Reactor',  qty: '3x'  },
          { item: 'Bobcat Blueprint',qty: '1x' },
        ],
      },
      {
        name: 'Imposing Behemoths',
        requirements: [
          { item: 'Exodus Module',        qty: '5x'  },
          { item: 'Snap Hook',            qty: '2x'  },
          { item: 'Magnetic Accelerator', qty: '10x' },
          { item: 'Aphelion',             qty: '1x'  },
          { item: 'Bombardier Cell',      qty: '8x'  },
        ],
        rewards: [
          { item: 'Raider Tokens',     qty: '50x' },
          { item: 'Matriarch Reactor', qty: '3x'  },
          { item: 'Snap Hook Blueprint',qty: '1x' },
        ],
      },
    ],
    completionRewards: [
      'Howl Emote',
      'Jupiter (weapon)',
      'Acoustic Guitar',
      '5x Energy Clip',
      '300,000 Coins',
    ],
  },
  {
    id: 'flickering-flames',
    name: 'Flickering Flames',
    status: 'Past',
    dateRange: 'Dec 16, 2025 – Jan 13, 2026',
    description:
      'A festival of resilient warmth, centered around the hardy candleberry bush.',
    stages: [
      {
        name: 'Candlelight',
        requirements: [
          { item: 'Empty Wine Bottle', qty: '1x' },
        ],
        rewards: [
          { item: 'Firecracker',    qty: '5x'  },
          { item: 'Plastic Parts',  qty: '25x' },
          { item: 'Candleberries',  qty: '20x' },
          { item: 'Raider Tokens',  qty: '50x' },
        ],
      },
      {
        name: 'Decorations',
        requirements: [
          { item: 'Candle Holder',  qty: '3x' },
          { item: 'Red Light Stick',qty: '1x' },
          { item: 'Light Bulb',     qty: '3x' },
        ],
        rewards: [
          { item: 'Industrial Battery', qty: '1x'  },
          { item: 'Candleberries',      qty: '50x' },
          { item: 'Raider Tokens',      qty: '50x' },
        ],
      },
      {
        name: 'Presents',
        requirements: [
          { item: 'Snap Blast Grenade', qty: '5x'  },
          { item: 'Trailblazer',        qty: '3x'  },
          { item: 'Duct Tape',          qty: '10x' },
        ],
        rewards: [
          { item: 'Film Reel',     qty: '1x'  },
          { item: 'Candleberries', qty: '60x' },
          { item: 'Raider Tokens', qty: '50x' },
        ],
      },
      {
        name: 'Beverages',
        requirements: [
          { item: 'Coffee Pot',      qty: '2x'  },
          { item: 'Vita Spray',      qty: '1x'  },
          { item: 'Fireball Burner', qty: '10x' },
        ],
        rewards: [
          { item: 'Water Filter',  qty: '2x'  },
          { item: 'Candleberries', qty: '60x' },
          { item: 'Raider Tokens', qty: '50x' },
        ],
      },
      {
        name: 'Meals',
        requirements: [
          { item: 'Mushroom',   qty: '7x' },
          { item: 'Snap Hook',  qty: '1x' },
          { item: 'Frying Pan', qty: '2x' },
        ],
        rewards: [
          { item: 'Music Album',   qty: '2x'  },
          { item: 'Candleberries', qty: '70x' },
          { item: 'Raider Tokens', qty: '50x' },
        ],
      },
    ],
    completionRewards: [
      'Snowglobe Charm',
      'Bettina III',
      'Extended Barrel',
      'Kinetic Converter',
    ],
  },
];
