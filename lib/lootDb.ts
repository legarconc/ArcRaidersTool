export interface Item {
  name: string;
  status: 'KEEP' | 'SELL' | 'RECYCLE';
  reason: string;
  location: string;
}

export const lootDb: Item[] = [
  { name: 'Kinetic Helmet', status: 'KEEP', reason: 'Best in slot', location: 'The Depths' },
  { name: 'Axiom Rifle', status: 'KEEP', reason: 'High DPS', location: 'The Spire' },
  { name: 'Scrap Metal', status: 'RECYCLE', reason: 'Crafting material', location: 'Dusty Caverns' },
  { name: 'Gold Ring', status: 'SELL', reason: 'Vendor trash', location: 'Ancient Ruins' },
  { name: 'Damaged Weave', status: 'RECYCLE', reason: 'Basic component', location: 'The Warrens' },
  { name: 'Gravity Boots', status: 'KEEP', reason: 'Mobility', location: 'Zero-G Lab' },
  { name: 'Alien Trinket', status: 'SELL', reason: 'Valuable antique', location: 'Xenoid Hive' },
  { name: 'Plasma Cutter', status: 'RECYCLE', reason: 'Obsolete model', location: 'Abandoned Ship' },
  { name: 'Data Chip', status: 'KEEP', reason: 'Quest item', location: 'The Core' },
  { name: 'Bio-Enhancer', status: 'SELL', reason: 'Common drop', location: 'The Greenhouse' },
  { name: 'Nanite Infusion', status: 'KEEP', reason: 'Critical crafting component', location: 'The Lab' },
  { name: 'Cracked Power Core', status: 'RECYCLE', reason: 'Unstable, but yields energy cells', location: 'The Power Plant' },
  { name: 'Xylosian Artifact', status: 'SELL', reason: 'Collector\'s item', location: 'Xylosian Temple' },
  { name: 'Gauss Cannon Barrel', status: 'KEEP', reason: 'Upgrade for main weapon', location: 'The Forge' },
  { name: 'Synthetic Muscle Fiber', status: 'RECYCLE', reason: 'Used in armor crafting', location: 'Bio-mechanics Lab' },
  { name: 'Old Terran Coin', status: 'SELL', reason: 'Historical value', location: 'Sunken City' },
  { name: 'Phase-Shift Module', status: 'KEEP', reason: 'Allows short-range teleportation', location: 'The Spire' },
  { name: 'Corrupted Data-slate', status: 'SELL', reason: 'Black market info', location: 'The Undercity' },
  { name: 'Crystalline Matrix', status: 'RECYCLE', reason: 'Can be refined into optics', location: 'Crystal Caves' },
  { name: 'Hydraulic Servos', status: 'KEEP', reason: 'Enhances melee power', location: 'The Factory' },
  { name: 'Standard Issue Medkit', status: 'SELL', reason: 'Common, low-powered healing', location: 'Anywhere' },
  { name: 'Exo-suit Plating', status: 'RECYCLE', reason: 'Standard armor material', location: 'The Barracks' },
  { name: 'Z-Particle Emitter', status: 'KEEP', reason: 'Rare energy source', location: 'The Rift' },
  { name: 'Precursor Idol', status: 'SELL', reason: 'Sells for a high price', location: 'The Tomb' },
  { name: 'Hyper-thread Coolant', status: 'RECYCLE', reason: 'Used in high-performance mods', location: 'Engine Room' },
  { name: 'Stasis Grenade', status: 'KEEP', reason: 'Tactical advantage', location: 'The Armory' },
  { name: 'Scavenged Wires', status: 'RECYCLE', reason: 'Basic electronics', location: 'The Wreckage' },
  { name: 'Orion Corp Shares Certificate', status: 'SELL', reason: 'Worthless paper, but some collector might buy it', location: 'The Exchange' },
  { name: 'Singularity Core', status: 'KEEP', reason: 'Powers ultimate abilities', location: 'The Singularity' },
  { name: 'Broken Golem Head', status: 'RECYCLE', reason: 'Ancient parts', location: 'The Golem Graveyard' }
];
