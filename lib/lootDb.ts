export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
export type LocationTag = 'ARC' | 'Industrial' | 'Residential' | 'Commercial' | 'Nature' | 'Medical' | 'Military' | 'Various';

export interface Item {
  name: string;
  status: 'KEEP' | 'SELL' | 'RECYCLE';
  reason: string;
  location: string;
}

// Helper function to determine rarity based on item characteristics
export function getItemRarity(item: Item): Rarity {
  const name = item.name.toLowerCase();

  // Legendary items
  if (name.includes('queen') || name.includes('matriarch')) return 'Legendary';

  // Epic items
  if (name.includes('exodus') || name.includes('magnetic accelerator') ||
      name.includes('advanced') || name.includes('power rod') ||
      name.includes('mixtape') || name.includes('snow globe')) return 'Epic';

  // Rare items - ARC parts, keys, refined materials
  if (name.includes('driver') || name.includes('cell') || name.includes('vault') ||
      name.includes('scanner') || name.includes('pulse unit') || name.includes('core') ||
      name.includes('key') || name.includes('circuitry') || name.includes('components') ||
      item.reason.includes('5,000') || item.reason.includes('3,000')) return 'Rare';

  // Uncommon items
  if (name.includes('arc ') || name.includes('gun parts') ||
      name.includes('industrial') || name.includes('motor') ||
      item.reason.includes('2,000') || item.reason.includes('upgrade')) return 'Uncommon';

  // Common items
  return 'Common';
}

// Helper function to determine location tag
export function getLocationTag(item: Item): LocationTag {
  const location = item.location.toLowerCase();
  const name = item.name.toLowerCase();

  if (location.includes('enemy') || location.includes('arc') ||
      name.includes('driver') || name.includes('cell') || name.includes('pulse')) return 'ARC';
  if (location.includes('industrial') || location.includes('factory') ||
      location.includes('garage')) return 'Industrial';
  if (location.includes('house') || location.includes('residential') ||
      location.includes('kitchen')) return 'Residential';
  if (location.includes('commercial') || location.includes('store') ||
      location.includes('shop')) return 'Commercial';
  if (location.includes('nature') || location.includes('grove') ||
      location.includes('tree') || name.includes('fruit')) return 'Nature';
  if (location.includes('medical') || location.includes('hospital')) return 'Medical';
  if (location.includes('military') || location.includes('security')) return 'Military';

  return 'Various';
}

// Filter functions
export function filterByStatus(items: Item[], status: Item['status'] | 'ALL'): Item[] {
  if (status === 'ALL') return items;
  return items.filter(item => item.status === status);
}

export function filterByRarity(items: Item[], rarity: Rarity | 'ALL'): Item[] {
  if (rarity === 'ALL') return items;
  return items.filter(item => getItemRarity(item) === rarity);
}

export function filterByLocationTag(items: Item[], tag: LocationTag | 'ALL'): Item[] {
  if (tag === 'ALL') return items;
  return items.filter(item => getLocationTag(item) === tag);
}

export function searchItems(items: Item[], query: string): Item[] {
  if (!query.trim()) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter(item =>
    item.name.toLowerCase().includes(lowerQuery) ||
    item.reason.toLowerCase().includes(lowerQuery) ||
    item.location.toLowerCase().includes(lowerQuery)
  );
}

export const lootDb: Item[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - ARC ENEMY PARTS (Quest & Upgrade Essential)
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Leaper Pulse Unit', status: 'KEEP', reason: 'Quest item, Utility Station III, Expedition', location: 'Leaper enemies' },
  { name: 'Rocketeer Driver', status: 'KEEP', reason: 'Quest item, Explosives Station III', location: 'Rocketeer enemies' },
  { name: 'Surveyor Vault', status: 'KEEP', reason: 'Quest item, Medical Lab III', location: 'Surveyor enemies' },
  { name: 'Hornet Driver', status: 'KEEP', reason: 'Quest item, Gear Bench II', location: 'Hornet enemies' },
  { name: 'Wasp Driver', status: 'KEEP', reason: 'Quest item, Gunsmith II', location: 'Wasp enemies' },
  { name: 'Snitch Scanner', status: 'KEEP', reason: 'Quest item, Utility Station II', location: 'Snitch enemies' },
  { name: 'Spotter Relay', status: 'KEEP', reason: 'Quest/upgrade material', location: 'Spotter enemies' },
  { name: 'Bastion Cell', status: 'KEEP', reason: 'Gear Bench III upgrade', location: 'Bastion enemies' },
  { name: 'Bombardier Cell', status: 'KEEP', reason: 'Refiner III upgrade', location: 'Bombardier enemies' },
  { name: 'Sentinel Firing Core', status: 'KEEP', reason: 'Gunsmith III upgrade', location: 'Sentinel enemies' },
  { name: 'Tick Pod', status: 'KEEP', reason: 'Medical Lab II upgrade', location: 'Tick enemies' },
  { name: 'Fireball Burner', status: 'KEEP', reason: 'Quest item, Refiner II', location: 'Fireball enemies' },
  { name: 'Pop Trigger', status: 'KEEP', reason: 'Explosives Station II upgrade', location: 'Pop enemies' },
  { name: 'Queen Reactor', status: 'KEEP', reason: 'Rare boss drop, very valuable', location: 'Queen boss' },
  { name: 'Matriarch Reactor', status: 'KEEP', reason: 'Rare boss drop', location: 'Matriarch boss' },
  { name: 'Power Rod', status: 'KEEP', reason: 'Quest item (Tribute to Toledo)', location: 'Rare ARC drops' },
  { name: 'Shredder Gyro', status: 'KEEP', reason: 'Stella Montis upgrade material', location: 'Shredder enemies' },
  { name: 'ARC Gyroscope', status: 'KEEP', reason: 'Upgrade material', location: 'Shredder enemies' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - ADVANCED MATERIALS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'ARC Alloy', status: 'KEEP', reason: 'Multiple workshop upgrades, Expedition', location: 'ARC enemies, containers' },
  { name: 'Advanced Electrical Components', status: 'KEEP', reason: 'Gear Bench III, Utility Station III, Expedition', location: 'Craft at Refiner' },
  { name: 'Advanced Mechanical Components', status: 'KEEP', reason: 'Gunsmith III upgrade', location: 'Craft at Refiner' },
  { name: 'Mod Components', status: 'KEEP', reason: 'Weapon modifications', location: 'Rare containers' },
  { name: 'Exodus Modules', status: 'KEEP', reason: 'Expedition Project Stage 3', location: 'Rare containers' },
  { name: 'Magnetic Accelerator', status: 'KEEP', reason: 'Expedition Project Stage 4', location: 'Matriarch, Queen, rare containers' },
  { name: 'ARC Circuitry', status: 'KEEP', reason: 'Refiner III upgrade', location: 'Rocketeer, Surveyor, Bastion' },
  { name: 'ARC Motion Core', status: 'KEEP', reason: 'Refiner II upgrade', location: 'Rocketeer, Surveyor, Bastion' },
  { name: 'ARC Powercell', status: 'KEEP', reason: 'Refiner I upgrade, shield recharges', location: 'All ARC enemies' },
  { name: 'Advanced ARC Powercell', status: 'KEEP', reason: 'Advanced crafting', location: 'Leaper, Rocketeer, larger ARCs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - REFINED MATERIALS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Electrical Components', status: 'KEEP', reason: 'Gear Bench II, Utility Station II, Expedition', location: 'Recycle electronics, Industrial POIs' },
  { name: 'Mechanical Components', status: 'KEEP', reason: 'Gunsmith II, weapon crafting', location: 'Craft at Refiner' },
  { name: 'Antiseptic', status: 'KEEP', reason: 'Quest item, Medical Lab III', location: 'Medical containers' },
  { name: 'Crude Explosives', status: 'KEEP', reason: 'Explosives Station II', location: 'Pop, Fireball, craft at Refiner' },
  { name: 'Durable Cloth', status: 'KEEP', reason: 'Quest item, Expedition Stage 2', location: 'Craft at Refiner' },
  { name: 'Explosive Compound', status: 'KEEP', reason: 'Explosives Station III', location: 'Leaper, craft at Refiner' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - BASIC MATERIALS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Metal Parts', status: 'KEEP', reason: 'Critical - Gunsmith I, Refiner I, Expedition', location: 'Containers, recycle items' },
  { name: 'Plastic Parts', status: 'KEEP', reason: 'Gear Bench I, Utility Station I', location: 'Containers, recycle items' },
  { name: 'Rubber Parts', status: 'KEEP', reason: 'Gunsmith I, Expedition', location: 'Containers, recycle items' },
  { name: 'Fabric', status: 'KEEP', reason: 'Gear Bench I, Medical Lab I', location: 'Houses, tents, recycle clothes' },
  { name: 'Chemicals', status: 'KEEP', reason: 'Explosives Station I', location: 'Industrial POIs, recycle cleaners' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - TOPSIDE MATERIALS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Battery', status: 'KEEP', reason: 'Quest item, Expedition Stage 3', location: 'Topside containers' },
  { name: 'Wires', status: 'KEEP', reason: 'Quest item, Expedition Stage 2', location: 'Topside containers' },
  { name: 'Steel Spring', status: 'KEEP', reason: 'Expedition Stage 1', location: 'Topside containers' },
  { name: 'Sensors', status: 'KEEP', reason: 'Expedition Stage 3', location: 'Snitch, Surveyor, containers' },
  { name: 'Magnet', status: 'KEEP', reason: 'Crafting material', location: 'Topside containers' },
  { name: 'Oil', status: 'KEEP', reason: 'Crafting material', location: 'Topside containers' },
  { name: 'Processor', status: 'KEEP', reason: 'Rare, electronics crafting', location: 'Topside containers' },
  { name: 'Voltage Converter', status: 'KEEP', reason: 'Electrical crafting', location: 'Topside containers' },
  { name: 'Syringe', status: 'KEEP', reason: 'Quest item (Doctor\'s Orders)', location: 'Medical containers' },
  { name: 'Synthesized Fuel', status: 'KEEP', reason: 'Explosives Station II', location: 'Industrial POIs' },
  { name: 'Speaker Component', status: 'KEEP', reason: 'Crafting material', location: 'Topside containers' },
  { name: 'Canister', status: 'KEEP', reason: 'Crafting material', location: 'Topside containers' },
  { name: 'Duct Tape', status: 'KEEP', reason: 'Crafting material', location: 'Topside containers' },
  { name: 'Rope', status: 'KEEP', reason: 'Crafting material', location: 'Topside containers' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - GUN PARTS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Simple Gun Parts', status: 'KEEP', reason: 'Basic weapon repairs', location: 'Hornet, Commercial POIs' },
  { name: 'Light Gun Parts', status: 'KEEP', reason: 'Weapon repairs & crafting (rare)', location: 'Commercial POIs' },
  { name: 'Medium Gun Parts', status: 'KEEP', reason: 'Weapon repairs & crafting (rare)', location: 'Bombardier, Bastion, Commercial POIs' },
  { name: 'Heavy Gun Parts', status: 'KEEP', reason: 'Weapon repairs & crafting (rare)', location: 'Rocketeer, Commercial POIs' },
  { name: 'Complex Gun Parts', status: 'KEEP', reason: 'Advanced weapon crafting', location: 'Rare containers' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - NATURE ITEMS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Great Mullein', status: 'KEEP', reason: 'Quest item (Doctor\'s Orders)', location: 'Nature areas, Topside' },
  { name: 'Fertilizer', status: 'KEEP', reason: 'Quest item (Unexpected Initiative)', location: 'Nature areas, gardens' },
  { name: 'Apricot', status: 'KEEP', reason: 'Scrappy III & V upgrade', location: 'Blue Gate Olive Grove' },
  { name: 'Lemon', status: 'KEEP', reason: 'Scrappy III upgrade', location: 'Blue Gate Olive Grove' },
  { name: 'Mushroom', status: 'KEEP', reason: 'Scrappy V upgrade', location: 'Shaded areas, caves' },
  { name: 'Olives', status: 'KEEP', reason: 'Scrappy IV upgrade', location: 'Blue Gate Olive Grove' },
  { name: 'Prickly Pear', status: 'KEEP', reason: 'Scrappy IV upgrade', location: 'Buried City, Dam cacti' },
  { name: 'Agave', status: 'KEEP', reason: 'Nature crafting', location: 'Desert areas' },
  { name: 'Assorted Seeds', status: 'KEEP', reason: 'Garden/nature crafting', location: 'Nature areas, Scrappy' },
  { name: 'Moss', status: 'KEEP', reason: 'Nature crafting', location: 'Shaded areas, Topside' },
  { name: 'Resin', status: 'KEEP', reason: 'Crafting material', location: 'Trees, nature areas' },
  { name: 'Roots', status: 'KEEP', reason: 'Nature crafting', location: 'Nature areas' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - WORKSHOP UPGRADE ITEMS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Water Pump', status: 'KEEP', reason: 'Quest item (Unexpected Initiative)', location: 'Industrial containers' },
  { name: 'Cooling Fan', status: 'KEEP', reason: 'Expedition Stage 2', location: 'Industrial containers' },
  { name: 'Cracked Bioscanner', status: 'KEEP', reason: 'Medical Lab II upgrade', location: 'Medical POIs' },
  { name: 'Damaged Heat Sink', status: 'KEEP', reason: 'Utility Station II upgrade', location: 'Industrial POIs' },
  { name: 'Fried Motherboard', status: 'KEEP', reason: 'Utility Station III upgrade', location: 'Electronics containers' },
  { name: 'Industrial Battery', status: 'KEEP', reason: 'Gear Bench III upgrade', location: 'Industrial POIs' },
  { name: 'Laboratory Reagents', status: 'KEEP', reason: 'Explosives Station III upgrade', location: 'Laboratory POIs' },
  { name: 'Motor', status: 'KEEP', reason: 'Refiner III upgrade', location: 'Industrial containers' },
  { name: 'Power Cable', status: 'KEEP', reason: 'Gear Bench II upgrade', location: 'Electrical POIs' },
  { name: 'Rusted Gears', status: 'KEEP', reason: 'Gunsmith III upgrade', location: 'Industrial containers' },
  { name: 'Rusted Gear', status: 'KEEP', reason: 'Gunsmith III upgrade', location: 'Industrial containers' },
  { name: 'Rusted Shut Medical Kit', status: 'KEEP', reason: 'Medical Lab III upgrade', location: 'Medical containers' },
  { name: 'Rusted Tools', status: 'KEEP', reason: 'Gunsmith II upgrade', location: 'Industrial containers' },
  { name: 'Toaster', status: 'KEEP', reason: 'Refiner II upgrade', location: 'Houses, kitchens' },
  { name: 'Humidifier', status: 'KEEP', reason: 'Expedition Stage 4', location: 'Houses' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - SCRAPPY & TRINKET UPGRADES
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Dog Collar', status: 'KEEP', reason: 'Scrappy II upgrade', location: 'Residential areas' },
  { name: 'Cat Bed', status: 'KEEP', reason: 'Scrappy IV upgrade', location: 'Commercial/Residential, shops' },
  { name: 'Very Comfortable Pillow', status: 'KEEP', reason: 'Scrappy V upgrade (need 3)', location: 'Commercial/Residential, red lockers' },
  { name: 'Light Bulb', status: 'KEEP', reason: 'Expedition Stage 3', location: 'Houses, stores' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - QUEST-SPECIFIC ITEMS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Flow Controller', status: 'KEEP', reason: 'Quest item (Snap and Salvage)', location: 'Quest-specific' },
  { name: 'Magnetron', status: 'KEEP', reason: 'Quest item (Snap and Salvage)', location: 'Quest-specific' },
  { name: 'Ion Sputter', status: 'KEEP', reason: 'Expedition Project material', location: 'Rare containers' },
  { name: 'Geiger Counter', status: 'KEEP', reason: 'Expedition Project material', location: 'Industrial POIs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - KEYS (Always Keep - Open Rare Loot Rooms)
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Blue Gate Communication Tower Key', status: 'KEEP', reason: 'Opens locked room', location: 'Blue Gate' },
  { name: 'Blue Gate Confiscation Room Key', status: 'KEEP', reason: 'Opens locked room', location: 'Blue Gate' },
  { name: 'Blue Gate Cellar Key', status: 'KEEP', reason: 'Opens locked room', location: 'Blue Gate' },
  { name: 'Blue Gate Village Key', status: 'KEEP', reason: 'Opens locked room', location: 'Blue Gate' },
  { name: 'Buried City Hospital Key', status: 'KEEP', reason: 'Opens locked room', location: 'Buried City' },
  { name: 'Buried City JKV Employee Access Card', status: 'KEEP', reason: 'Opens locked room', location: 'Buried City' },
  { name: 'Buried City Residential Mastery Key', status: 'KEEP', reason: 'Opens locked room', location: 'Buried City' },
  { name: 'Buried City Town Hall Key', status: 'KEEP', reason: 'Opens locked room', location: 'Buried City' },
  { name: 'Dam Control Tower Key', status: 'KEEP', reason: 'Opens locked room', location: 'Dam' },
  { name: 'Dam Staff Room Key', status: 'KEEP', reason: 'Opens locked room', location: 'Dam' },
  { name: 'Dam Surveillance Key', status: 'KEEP', reason: 'Opens locked room', location: 'Dam' },
  { name: 'Dam Testing Annex Key', status: 'KEEP', reason: 'Opens locked room', location: 'Dam' },
  { name: 'Dam Utility Key', status: 'KEEP', reason: 'Opens locked room', location: 'Dam' },
  { name: 'Patrol Car Key', status: 'KEEP', reason: 'Quest item (Armored Transports)', location: 'Guard huts' },
  { name: 'Raider Hatch Key', status: 'KEEP', reason: 'Opens Raider Hatch', location: 'Quest reward' },
  { name: 'Spaceport Container Storage Key', status: 'KEEP', reason: 'Opens locked room', location: 'Spaceport' },
  { name: 'Spaceport Control Tower Key', status: 'KEEP', reason: 'Opens locked room', location: 'Spaceport' },
  { name: 'Spaceport Trench Tower Key', status: 'KEEP', reason: 'Opens locked room', location: 'Spaceport' },
  { name: 'Spaceport Warehouse Key', status: 'KEEP', reason: 'Opens locked room', location: 'Spaceport' },
  { name: 'Stella Montis Archives Key', status: 'KEEP', reason: 'Opens locked room', location: 'Stella Montis' },
  { name: 'Stella Montis Assembly Admin Key', status: 'KEEP', reason: 'Opens locked room', location: 'Stella Montis' },
  { name: 'Stella Montis Medical Storage Key', status: 'KEEP', reason: 'Opens locked room', location: 'Stella Montis' },
  { name: 'Stella Montis Security Checkpoint Key', status: 'KEEP', reason: 'Opens locked room', location: 'Stella Montis' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEEP - MISCELLANEOUS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Volcanic Rock', status: 'KEEP', reason: 'Crafting material', location: 'Volcanic areas' },

  // ═══════════════════════════════════════════════════════════════════════════
  // SELL - TRINKETS (High Value - $5000+)
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Lance\'s Mixtape (5th Edition)', status: 'SELL', reason: 'Epic trinket, sells for 10,000₡', location: 'Rare spawn, various containers' },
  { name: 'Breathtaking Snow Globe', status: 'SELL', reason: 'Epic trinket, sells for 7,000₡', location: 'Houses, stores' },
  { name: 'Playing Cards', status: 'SELL', reason: 'Rare trinket, sells for 5,000₡', location: 'Houses' },
  { name: 'Red Coral Jewelry', status: 'SELL', reason: 'Rare trinket, sells for 5,000₡', location: 'Various containers' },
  { name: 'Music Box', status: 'SELL', reason: 'Rare trinket, sells for 5,000₡', location: 'Houses' },

  // ═══════════════════════════════════════════════════════════════════════════
  // SELL - TRINKETS (Medium Value - $3000)
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Fine Wristwatch', status: 'SELL', reason: 'Rare trinket, sells for 3,000₡', location: 'Various containers' },
  { name: 'Music Album', status: 'SELL', reason: 'Rare trinket, sells for 3,000₡', location: 'Houses, stores' },
  { name: 'Silver Teaspoon Set', status: 'SELL', reason: 'Rare trinket, sells for 3,000₡', location: 'Houses' },
  { name: 'Statuette', status: 'SELL', reason: 'Rare trinket, sells for 3,000₡', location: 'Various containers' },
  { name: 'Vase', status: 'SELL', reason: 'Common trinket, sells for 3,000₡', location: 'Houses' },

  // ═══════════════════════════════════════════════════════════════════════════
  // SELL - TRINKETS (Low-Medium Value - $2000)
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Air Freshener', status: 'SELL', reason: 'Uncommon trinket, sells for 2,000₡', location: 'Houses, cars' },
  { name: 'Dart Board', status: 'SELL', reason: 'Uncommon trinket, sells for 2,000₡', location: 'Houses, bars' },
  { name: 'Film Reel', status: 'SELL', reason: 'Rare trinket, sells for 2,000₡', location: 'Various containers' },
  { name: 'Painted Box', status: 'SELL', reason: 'Common trinket, sells for 2,000₡', location: 'Various containers' },
  { name: 'Poster of Natural Wonders', status: 'SELL', reason: 'Uncommon trinket, sells for 2,000₡', location: 'Houses, stores' },
  { name: 'Pottery', status: 'SELL', reason: 'Uncommon trinket, sells for 2,000₡', location: 'Various containers' },
  { name: 'Rosary', status: 'SELL', reason: 'Rare trinket, sells for 2,000₡', location: 'Various containers' },

  // ═══════════════════════════════════════════════════════════════════════════
  // SELL - TRINKETS (Low Value - $1000)
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Bloated Tuna Can', status: 'SELL', reason: 'Restores stamina, sells for 1,000₡', location: 'Various containers' },
  { name: 'Coffee Pot', status: 'SELL', reason: 'Common trinket, sells for 1,000₡', location: 'Houses, offices' },
  { name: 'Empty Wine Bottle', status: 'SELL', reason: 'Crafts Agave Juice, sells for 1,000₡', location: 'Houses, bars' },
  { name: 'Expired Pasta', status: 'SELL', reason: 'Restores health, sells for 1,000₡', location: 'Houses, stores' },
  { name: 'Rubber Duck', status: 'SELL', reason: 'Can be thrown as distraction, sells for 1,000₡', location: 'Houses' },
  { name: 'Torn Book', status: 'SELL', reason: 'Common trinket, sells for 1,000₡', location: 'Houses, libraries' },

  // ═══════════════════════════════════════════════════════════════════════════
  // SELL - TRINKETS (Lowest Value)
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Faded Photograph', status: 'SELL', reason: 'Common trinket, sells for 640₡', location: 'Houses' },

  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLE - DAMAGED ARC PARTS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Damaged Hornet Driver', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Hornet enemies' },
  { name: 'Damaged Wasp Driver', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Wasp enemies' },
  { name: 'Damaged Rocketeer Driver', status: 'RECYCLE', reason: 'Yields components', location: 'Rocketeer enemies' },
  { name: 'Damaged Snitch Scanner', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Snitch enemies' },
  { name: 'Damaged Tick Pod', status: 'RECYCLE', reason: 'Yields components', location: 'Tick enemies' },
  { name: 'Damaged ARC Motion Core', status: 'RECYCLE', reason: 'Yields components', location: 'ARC enemies' },
  { name: 'Damaged ARC Powercell', status: 'RECYCLE', reason: 'Yields components', location: 'ARC enemies' },
  { name: 'Damaged Fireball Burner', status: 'RECYCLE', reason: 'Yields components', location: 'Fireball enemies' },
  { name: 'Burned ARC Circuitry', status: 'RECYCLE', reason: 'Yields electrical components', location: 'ARC enemies' },
  { name: 'Rusty ARC Steel', status: 'RECYCLE', reason: 'Yields metal parts', location: 'ARC enemies' },
  { name: 'Degraded ARC Rubber', status: 'RECYCLE', reason: 'Yields rubber parts', location: 'ARC enemies' },
  { name: 'Dried-Out ARC Resin', status: 'RECYCLE', reason: 'Yields plastic parts', location: 'ARC enemies' },
  { name: 'Impure ARC Coolant', status: 'RECYCLE', reason: 'Yields chemicals', location: 'ARC enemies' },
  { name: 'Tattered ARC Lining', status: 'RECYCLE', reason: 'Yields fabric', location: 'ARC enemies' },

  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLE - ARC MATERIALS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'ARC Coolant', status: 'RECYCLE', reason: 'Yields chemicals', location: 'Queen, ARC enemies' },
  { name: 'ARC Flex Rubber', status: 'RECYCLE', reason: 'Yields rubber parts', location: 'Leaper, Matriarch' },
  { name: 'ARC Performance Steel', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Leaper, Bombardier, Matriarch' },
  { name: 'ARC Synthetic Resin', status: 'RECYCLE', reason: 'Yields plastic parts', location: 'Snitch, Matriarch, Queen' },
  { name: 'ARC Thermo Lining', status: 'RECYCLE', reason: 'Yields fabric', location: 'Pop, Queen' },

  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLE - BROKEN ELECTRONICS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Broken Flashlight', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Various containers' },
  { name: 'Broken Guidance System', status: 'RECYCLE', reason: 'Yields electrical components', location: 'ARC enemies, containers' },
  { name: 'Broken Handheld Radio', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Various containers' },
  { name: 'Broken Taser', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Security areas' },
  { name: 'Blown Fuses', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Electrical POIs' },
  { name: 'Remote Control', status: 'RECYCLE', reason: 'Yields electrical/plastic parts', location: 'Houses' },
  { name: 'Portable TV', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Houses' },
  { name: 'Projector', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Offices, houses' },
  { name: 'Headphones', status: 'RECYCLE', reason: 'Yields electrical/plastic parts', location: 'Various containers' },
  { name: 'Thermostat', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Houses, buildings' },
  { name: 'Frequency Modulation Box', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Industrial POIs' },
  { name: 'Rotary Encoder', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Industrial POIs' },
  { name: 'Signal Amplifier', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Industrial POIs' },
  { name: 'Spectrum Analyzer', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Industrial POIs' },
  { name: 'Telemetry Transceiver', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Industrial POIs' },
  { name: 'Power Bank', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Various containers' },
  { name: 'Sample Cleaner', status: 'RECYCLE', reason: 'Yields chemicals/components', location: 'Laboratory POIs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLE - MECHANICAL ITEMS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Alarm Clock', status: 'RECYCLE', reason: 'Yields mechanical components', location: 'Houses' },
  { name: 'Bicycle Pump', status: 'RECYCLE', reason: 'Yields rubber/metal parts', location: 'Garages, stores' },
  { name: 'Cooling Coil', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Industrial POIs' },
  { name: 'Industrial Charger', status: 'RECYCLE', reason: 'Yields electrical components', location: 'Industrial POIs' },
  { name: 'Industrial Magnet', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Industrial POIs' },
  { name: 'Rocket Thruster', status: 'RECYCLE', reason: 'Yields metal/mechanical parts', location: 'ARC enemies' },
  { name: 'Spring Cushion', status: 'RECYCLE', reason: 'Yields metal/fabric parts', location: 'Houses' },
  { name: 'Turbo Pump', status: 'RECYCLE', reason: 'Yields mechanical components', location: 'Industrial POIs' },
  { name: 'Water Filter', status: 'RECYCLE', reason: 'Yields plastic/chemical parts', location: 'Houses, buildings' },
  { name: 'Rusted Bolts', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Industrial containers' },
  { name: 'Metal Brackets', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Industrial containers' },

  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLE - HOUSEHOLD ITEMS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Camera Lens', status: 'RECYCLE', reason: 'Yields plastic/glass parts', location: 'Various containers' },
  { name: 'Candle Holder', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Houses' },
  { name: 'Frying Pan', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Houses, kitchens' },
  { name: 'Garlic Press', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Houses, kitchens' },
  { name: 'Ice Cream Scooper', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Houses, kitchens' },
  { name: 'Number Plate', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Cars, garages' },
  { name: 'Rubber Pad', status: 'RECYCLE', reason: 'Yields rubber parts', location: 'Various locations' },
  { name: 'Household Cleaner', status: 'RECYCLE', reason: 'Yields chemicals', location: 'Houses, stores' },
  { name: 'Crumpled Plastic Bottle', status: 'RECYCLE', reason: 'Yields plastic parts', location: 'Various locations' },
  { name: 'Deflated Football', status: 'RECYCLE', reason: 'Yields rubber parts', location: 'Houses, parks' },
  { name: 'Diving Goggles', status: 'RECYCLE', reason: 'Yields rubber/plastic parts', location: 'Various containers' },

  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLE - RUINED/DAMAGED ITEMS
  // ═══════════════════════════════════════════════════════════════════════════
  { name: 'Expired Respirator', status: 'RECYCLE', reason: 'Yields rubber/fabric parts', location: 'Industrial POIs' },
  { name: 'Polluted Air Filter', status: 'RECYCLE', reason: 'Yields fabric/plastic parts', location: 'Industrial POIs' },
  { name: 'Ripped Safety Vest', status: 'RECYCLE', reason: 'Yields fabric parts', location: 'Industrial POIs' },
  { name: 'Ruined Accordion', status: 'RECYCLE', reason: 'Yields various parts', location: 'Houses' },
  { name: 'Ruined Augment', status: 'RECYCLE', reason: 'Yields electrical components', location: 'ARC enemies' },
  { name: 'Ruined Baton', status: 'RECYCLE', reason: 'Yields metal/rubber parts', location: 'Security areas' },
  { name: 'Ruined Handcuffs', status: 'RECYCLE', reason: 'Yields metal parts', location: 'Security areas' },
  { name: 'Ruined Parachute', status: 'RECYCLE', reason: 'Yields fabric parts', location: 'Various locations' },
  { name: 'Ruined Tactical Vest', status: 'RECYCLE', reason: 'Yields fabric parts', location: 'Military POIs' },
  { name: 'Ruined Riot Shield', status: 'RECYCLE', reason: 'Yields plastic/metal parts', location: 'Security areas' },
  { name: 'Tattered Clothes', status: 'RECYCLE', reason: 'Yields fabric parts', location: 'Houses, stores' },
  { name: 'Torn Blanket', status: 'RECYCLE', reason: 'Yields fabric parts', location: 'Houses' },
  { name: 'Unusable Weapon', status: 'RECYCLE', reason: 'Yields metal/mechanical parts', location: 'Various locations' },
];
