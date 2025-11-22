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
  { name: 'Bio-Enhancer', status: 'SELL', reason: 'Common drop', location: 'The Greenhouse' }
];
