export interface Blueprint {
  id: string;
  name: string;
  workbench: 'gunsmith' | 'gear-bench' | 'medical-lab' | 'utility-station' | 'explosives-station' | 'refiner';
  requiredLevel: number;
  type: 'Weapon' | 'Attachment' | 'Shield' | 'Augment' | 'Consumable' | 'Tool' | 'Explosive' | 'Component';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  priority: 'Essential' | 'High Value' | 'Situational' | 'Low Priority';
  description: string;
  location?: string;
  soloNote?: string;
}

export const blueprints: Blueprint[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // GUNSMITH - WEAPONS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'anvil',
    name: 'Anvil Hand Cannon',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Uncommon',
    priority: 'Essential',
    description: 'High-damage hand cannon with great economy.',
    location: 'Security Lockers, Weapon Cases, Dam Battlegrounds Control Tower',
    soloNote: 'S-Tier. Hits harder than most rifles. Very ammo efficient.'
  },
  {
    id: 'bettina',
    name: 'Bettina AR',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Top-tier Assault Rifle. Buffed in 1.7.0 (Mag 22, Faster Reload).',
    location: 'Dynamic Security Lockers, High-Value Containers, Night Raids',
    soloNote: 'S-Tier. Expensive to run, but shreds everything. Now even better sustained fire.'
  },
  {
    id: 'kettle',
    name: 'Kettle AR',
    workbench: 'gunsmith',
    requiredLevel: 1,
    type: 'Weapon',
    rarity: 'Common',
    priority: 'High Value',
    description: 'Ultra-quiet semi-auto AR. Fire rate capped in 1.11.0 to 450 RPM.',
    location: 'Common containers, Bird City Map Condition',
    soloNote: 'S-Tier for stealth. One of the quietest guns. Low recoil makes it a laser.'
  },
  {
    id: 'rattler',
    name: 'Rattler AR',
    workbench: 'gunsmith',
    requiredLevel: 1,
    type: 'Weapon',
    rarity: 'Common',
    priority: 'Essential',
    description: 'Fully automatic assault rifle. Good starter weapon.',
    location: 'Common containers, early quests',
    soloNote: 'B-Tier. Reliable starter, buffed PvP TTK in 1.7.0.'
  },
  {
    id: 'renegade',
    name: 'Renegade',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Lever-action battle rifle. High accuracy and headshot damage.',
    location: 'Security Lockers, Weapon Cases',
    soloNote: 'A-Tier. Versatile and fast when upgraded.'
  },
  {
    id: 'tempest',
    name: 'Tempest AR',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Versatile assault rifle, good at all ranges.',
    location: 'Weapon Cases, Blue Gate Reinforced Reception, Security Lockers',
    soloNote: 'A-Tier. Reliable and economical alternative to Bettina.'
  },
  {
    id: 'osprey',
    name: 'Osprey Sniper',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Long-range precision rifle with high damage.',
    location: 'Security Lockers, Military Containers, Dam Control Tower',
    soloNote: 'Best starter sniper. Essential for picking off Rocketeers from distance.'
  },
  {
    id: 'vulcano',
    name: 'Vulcano Shotgun',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'Semi-auto shotgun with massive close-range damage.',
    location: 'Security Lockers, Blue Gate Village (requires key)',
    soloNote: 'King of close quarters, but useless at range. Pair with AR.'
  },
  {
    id: 'burletta',
    name: 'Burletta SMG',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'High fire rate SMG with good handling.',
    location: 'Quest reward: Industrial Espionage (Tian Wen, Buried City)',
    soloNote: 'A-Tier. Great for close-mid range combat.'
  },
  {
    id: 'bobcat',
    name: 'Bobcat Pistol',
    workbench: 'gunsmith',
    requiredLevel: 1,
    type: 'Weapon',
    rarity: 'Common',
    priority: 'Low Priority',
    description: 'Basic starter pistol.',
    location: 'Common containers, early quests',
    soloNote: 'Replace with Anvil as soon as possible.'
  },
  {
    id: 'torrente',
    name: 'Torrente LMG',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'Light machine gun with large magazine.',
    location: 'Security Lockers, Military POIs, Harvester Events',
    soloNote: 'Heavy and loud but great suppression. Better for squads.'
  },
  {
    id: 'venator',
    name: 'Venator Rifle',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Semi-auto marksman rifle.',
    location: 'Security Lockers, Weapon Cases',
    soloNote: 'B-Tier. Decent mid-range option but outclassed by Osprey.'
  },
  {
    id: 'aphelion',
    name: 'Aphelion',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Legendary',
    priority: 'High Value',
    description: 'Legendary Battle Rifle. Fires two-round bursts of high-velocity energy rounds.',
    location: 'Stella Montis (Moved in 1.7.0)',
    soloNote: 'S-Tier. Strong against ARC armor plating.'
  },
  {
    id: 'il-toro',
    name: 'Il Toro Revolver',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Heavy revolver with high damage per shot.',
    location: 'Security Lockers, Buried City residential areas',
    soloNote: 'High risk/reward. 6 shots to make count.'
  },
  {
    id: 'hullcracker',
    name: 'Hullcracker Railgun',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Legendary',
    priority: 'High Value',
    description: 'Devastating railgun requiring Magnetic Accelerator, Heavy Gun Parts, and Exodus Module.',
    location: "Quest reward: The Major's Footlocker (Tian Wen, Dam Battlegrounds)",
    soloNote: 'S-Tier endgame weapon. One-shots most enemies.'
  },
  {
    id: 'equalizer',
    name: 'Equalizer',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Legendary',
    priority: 'High Value',
    description: 'Legendary energy weapon. Requires Magnetic Accelerator, Complex Gun Parts, Queen Reactor.',
    location: 'Harvester Events (guaranteed drop)',
    soloNote: 'Endgame weapon. Farm Harvester events for blueprint.'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Legendary',
    priority: 'High Value',
    description: 'Legendary heavy weapon. Same requirements as Equalizer.',
    location: 'Harvester Events (guaranteed drop)',
    soloNote: 'Endgame alternative to Equalizer. Team-oriented.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GUNSMITH - ATTACHMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'silencer-2',
    name: 'Silencer II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Reduces weapon noise significantly.',
    location: 'Security Lockers, Weapon Cases',
    soloNote: 'Critical for solo stealth. Pair with suppressed weapons.'
  },
  {
    id: 'silencer-3',
    name: 'Silencer III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Maximum noise reduction.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Best-in-slot silencer.'
  },
  {
    id: 'compensator-2',
    name: 'Compensator II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Reduces weapon recoil.',
    location: 'Weapon Cases, Security Lockers',
    soloNote: 'Great for full-auto weapons.'
  },
  {
    id: 'compensator-3',
    name: 'Compensator III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Maximum recoil reduction.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Essential for Bettina and LMGs.'
  },
  {
    id: 'extended-medium-mag-2',
    name: 'Extended Medium Magazine II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Increases magazine capacity for medium caliber weapons.',
    location: 'Weapon Cases, Security Lockers',
    soloNote: 'More bullets = more survivability in fights.'
  },
  {
    id: 'extended-medium-mag-3',
    name: 'Extended Medium Magazine III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Maximum magazine capacity for ARs.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Must-have for extended fights.'
  },
  {
    id: 'angled-grip-2',
    name: 'Angled Grip II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Improves weapon handling.',
    location: 'Weapon Cases, various containers',
    soloNote: 'Good for hip-fire builds.'
  },
  {
    id: 'vertical-grip-2',
    name: 'Vertical Grip II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Improves recoil control.',
    location: 'Weapon Cases, various containers',
    soloNote: 'Alternative to Compensator.'
  },
  {
    id: 'stable-stock-2',
    name: 'Stable Stock II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Improves accuracy when stationary.',
    location: 'Weapon Cases, Security Lockers',
    soloNote: 'Best for snipers.'
  },
  {
    id: 'extended-barrel',
    name: 'Extended Barrel',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Increases effective range.',
    location: 'Weapon Cases, Security Lockers',
    soloNote: 'Good for marksman builds.'
  },
  {
    id: 'shotgun-choke-2',
    name: 'Shotgun Choke II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Tightens shotgun spread.',
    location: 'Weapon Cases',
    soloNote: 'Essential if running shotguns.'
  },
  {
    id: 'shotgun-choke-3',
    name: 'Shotgun Choke III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'Maximum shotgun spread tightening.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Best-in-slot for shotgun builds.'
  },
  {
    id: 'silencer-1',
    name: 'Silencer I',
    workbench: 'gunsmith',
    requiredLevel: 1,
    type: 'Attachment',
    rarity: 'Uncommon',
    priority: 'High Value',
    description: 'Basic noise reduction for weapons.',
    location: 'Common containers, Weapon Cases',
    soloNote: 'Good starter suppressor until you find Silencer II.'
  },
  {
    id: 'angled-grip-3',
    name: 'Angled Grip III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'Maximum weapon handling improvement.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Best-in-slot for hip-fire builds.'
  },
  {
    id: 'vertical-grip-3',
    name: 'Vertical Grip III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Maximum recoil control.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Excellent alternative to Compensator III.'
  },
  {
    id: 'stable-stock-3',
    name: 'Stable Stock III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Maximum accuracy when stationary.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Best-in-slot for sniper builds.'
  },
  {
    id: 'extended-light-mag-2',
    name: 'Extended Light Magazine II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Increases magazine capacity for light caliber weapons.',
    location: 'Weapon Cases, Security Lockers',
    soloNote: 'Useful for SMGs and pistols.'
  },
  {
    id: 'extended-light-mag-3',
    name: 'Extended Light Magazine III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'Maximum magazine capacity for SMGs and pistols.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Best-in-slot for Burletta builds.'
  },
  {
    id: 'extended-shotgun-mag-2',
    name: 'Extended Shotgun Magazine II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Increases shotgun tube capacity.',
    location: 'Weapon Cases, Security Lockers',
    soloNote: 'Essential for Vulcano builds.'
  },
  {
    id: 'extended-shotgun-mag-3',
    name: 'Extended Shotgun Magazine III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'Maximum shotgun tube capacity.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Best-in-slot for shotgun mains.'
  },
  {
    id: 'muzzle-brake-2',
    name: 'Muzzle Brake II',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Reduces vertical recoil.',
    location: 'Weapon Cases, Security Lockers',
    soloNote: 'Good for sniper rifles and battle rifles.'
  },
  {
    id: 'muzzle-brake-3',
    name: 'Muzzle Brake III',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Maximum vertical recoil reduction.',
    location: 'Security Lockers (requires Security Breach skill)',
    soloNote: 'Best-in-slot for Osprey and Renegade.'
  },
  {
    id: 'shotgun-silencer',
    name: 'Shotgun Silencer',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Reduces shotgun noise significantly.',
    location: 'Weapon Cases, Security Lockers',
    soloNote: 'Niche but useful for stealth shotgun builds.'
  },
  {
    id: 'padded-stock',
    name: 'Padded Stock',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Low Priority',
    description: 'Reduces weapon sway and improves ADS stability.',
    location: 'Weapon Cases, various containers',
    soloNote: 'Minor benefit. Other stocks are better.'
  },
  {
    id: 'lightweight-stock',
    name: 'Lightweight Stock',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Reduces weapon weight and improves ADS speed.',
    location: 'Weapon Cases, various containers',
    soloNote: 'Good for run-and-gun builds where weight matters.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GEAR BENCH
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'shield-medium',
    name: 'Medium Shield',
    workbench: 'gear-bench',
    requiredLevel: 2,
    type: 'Shield',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Balanced protection and mobility.',
    location: 'Gear Bench craft, various containers',
    soloNote: 'Standard issue for survival. Always bring one.'
  },
  {
    id: 'shield-heavy',
    name: 'Heavy Shield',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Shield',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Maximum protection, slower recharge.',
    location: 'Gear Bench craft, Security Lockers',
    soloNote: 'Combine with "Used to the Weight" skill for best results.'
  },
  {
    id: 'combat-mk3-aggressive',
    name: 'Combat Mk.3 (Aggressive)',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Augment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Damage-focused combat augment.',
    location: 'Blue Gate Reinforced Reception, Security Lockers',
    soloNote: 'A-Tier for combat-focused builds.'
  },
  {
    id: 'combat-mk3-flanking',
    name: 'Combat Mk.3 (Flanking)',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Augment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Movement-focused combat augment.',
    location: 'Blue Gate Reinforced Reception, Security Lockers',
    soloNote: 'Great for aggressive solo plays.'
  },
  {
    id: 'looting-mk3',
    name: 'Looting Mk.3 (Survivor)',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Augment',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Greatly increases loot detection and highlights items through walls.',
    location: 'Security Lockers, Buried City Pharmacy',
    soloNote: 'S-Tier. Wallhacks for loot. Never raid without it.'
  },
  {
    id: 'looting-mk3-safekeeper',
    name: 'Looting Mk.3 (Safekeeper)',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Augment',
    rarity: 'Epic',
    priority: 'Essential',
    description: '18 item slots, Heavy Shield compatible. Features a "Safe Pocket" that protects any item from loss upon death.',
    location: 'High Loot Zones during Major Map Conditions',
    soloNote: 'S-Tier. The ultimate safety net for your most valuable items. Added in Headwinds 1.13.0.'
  },
  {
    id: 'tactical-mk3-revival',
    name: 'Tactical Mk.3 (Revival)',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Augment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Integrated Defibrillator for free revives (4m CD) and passive health regen.',
    location: 'High Loot Zones during Major Map Conditions',
    soloNote: 'A-Tier. Only compatible with Light Shields. Great for sustain.'
  },
  {
    id: 'tactical-mk3-defensive',
    name: 'Tactical Mk.3 (Defensive)',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Augment',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'Defense-focused tactical augment.',
    location: 'Security Lockers, Military POIs',
    soloNote: 'B-Tier. Useful for high-risk extractions.'
  },
  {
    id: 'tactical-mk3-healing',
    name: 'Tactical Mk.3 (Healing)',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Augment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Healing-focused tactical augment.',
    location: 'Security Lockers, Medical POIs',
    soloNote: 'A-Tier. Great sustain for solo.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDICAL LAB
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'vita-spray',
    name: 'Vita Spray',
    workbench: 'medical-lab',
    requiredLevel: 3,
    type: 'Consumable',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Rapid healing spray with multiple uses.',
    location: 'Medical Lab craft, Medical containers',
    soloNote: 'S-Tier. The only reliable way to heal mid-combat.'
  },
  {
    id: 'vita-shot',
    name: 'Vita Shot',
    workbench: 'medical-lab',
    requiredLevel: 2,
    type: 'Consumable',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Single-use healing injection.',
    location: 'Medical Lab craft, Medical containers',
    soloNote: 'A-Tier. Quick heal but single use.'
  },
  {
    id: 'defibrillator',
    name: 'Defibrillator',
    workbench: 'medical-lab',
    requiredLevel: 3,
    type: 'Tool',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'Revives downed teammates faster.',
    location: 'Medical Lab craft, Medical POIs',
    soloNote: 'Useless solo. Only for squad play.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UTILITY STATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'light-stick',
    name: 'Light Stick',
    workbench: 'utility-station',
    requiredLevel: 1,
    type: 'Tool',
    rarity: 'Common',
    priority: 'Situational',
    description: 'Illuminates dark areas.',
    location: 'Buried City Pharmacy, Blue Gate underground',
    soloNote: 'Useful for night raids and underground areas.'
  },
  {
    id: 'barricade-kit',
    name: 'Barricade Kit',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Deploys temporary cover.',
    location: 'Utility containers, Security areas',
    soloNote: 'C-Tier. Situational for holding positions.'
  },
  {
    id: 'snap-hook',
    name: 'Snap Hook',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Allows quick rappelling down cliffs.',
    location: 'Utility containers, various POIs',
    soloNote: 'A-Tier. Essential for vertical maps like Stella Montis.'
  },
  {
    id: 'smoke-grenade',
    name: 'Smoke Grenade',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Creates smoke cover for escapes.',
    location: 'Utility containers, various POIs',
    soloNote: 'A-Tier. Excellent for disengaging from fights.'
  },
  {
    id: 'seeker-grenade',
    name: 'Seeker Grenade',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Homing grenade that targets and disables airborne ARC threats.',
    location: 'Security Lockers, Reward for Shared Watch event',
    soloNote: 'S-Tier for Shrouded Sky update. Hard counters new flying enemies.'
  },
  {
    id: 'tagging-grenade',
    name: 'Tagging Grenade',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Marks enemies in an area.',
    location: 'Utility containers',
    soloNote: 'B-Tier. Useful for scouting but reveals your position.'
  },
  {
    id: 'remote-raider-flare',
    name: 'Remote Raider Flare',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Rare',
    priority: 'Low Priority',
    description: 'Signals extraction point.',
    location: 'Utility containers',
    soloNote: 'D-Tier. Alerts everyone to your position.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPLOSIVES STATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'trigger-nade',
    name: "Trigger 'Nade",
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Remote-detonated grenade.',
    location: 'Quest reward: Sparks Fly (Apollo, any map)',
    soloNote: 'A-Tier. Great for ambushes and traps.'
  },
  {
    id: 'lure-grenade',
    name: 'Lure Grenade',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Attracts ARC enemies to a location.',
    location: 'Quest reward: Greasing Her Palms (Celeste, multiple maps)',
    soloNote: 'S-Tier. Essential for distracting ARCs while looting.'
  },
  {
    id: 'trailblazer-grenade',
    name: 'Trailblazer Grenade',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Emits a trail of flammable gas that ignites for an explosive chain reaction.',
    location: 'Security Lockers, Industrial POIs',
    soloNote: 'A-Tier. Massive area damage. Balanced in 1.15.0 for better scaling.'
  },
  {
    id: 'showstopper',
    name: 'Showstopper',
    workbench: 'explosives-station',
    requiredLevel: 3,
    type: 'Explosive',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'High-damage explosive grenade.',
    location: 'Blue Gate Reinforced Reception, Security Lockers',
    soloNote: 'A-Tier. Great burst damage for ARC hunting.'
  },
  {
    id: 'blaze-grenade',
    name: 'Blaze Grenade',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Creates area of fire damage.',
    location: 'Explosives containers, various POIs',
    soloNote: 'B-Tier. Good for area denial.'
  },
  {
    id: 'explosive-mine',
    name: 'Explosive Mine',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Proximity-triggered explosive.',
    location: 'Explosives containers, Military POIs',
    soloNote: 'B-Tier. Good for guarding your back while looting.'
  },
  {
    id: 'jolt-mine',
    name: 'Jolt Mine',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Stuns enemies in radius.',
    location: 'Explosives containers, various POIs',
    soloNote: 'B-Tier. Useful for escape routes.'
  },
  {
    id: 'gas-mine',
    name: 'Gas Mine',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Releases toxic gas cloud when triggered.',
    location: 'Explosives containers, Industrial POIs',
    soloNote: 'B-Tier. Good area denial but can affect you too.'
  },
  {
    id: 'pulse-mine',
    name: 'Pulse Mine',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'EMP mine that disables ARC enemies temporarily.',
    location: 'Explosives containers, Military POIs',
    soloNote: 'A-Tier. Excellent for disabling groups of ARCs.'
  },
  {
    id: 'wolfpack',
    name: 'Wolfpack',
    workbench: 'explosives-station',
    requiredLevel: 3,
    type: 'Explosive',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'Multi-rocket launcher explosive.',
    location: 'Security Lockers, Harvester Events',
    soloNote: 'A-Tier for ARC hunting. Expensive to run.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REFINER - COMPONENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'light-gun-parts',
    name: 'Light Gun Parts',
    workbench: 'refiner',
    requiredLevel: 1,
    type: 'Component',
    rarity: 'Common',
    priority: 'Essential',
    description: 'Crafted from Metal Parts.',
    location: 'Refiner craft',
    soloNote: 'Always keep crafting these for pistol/SMG repairs.'
  },
  {
    id: 'medium-gun-parts',
    name: 'Medium Gun Parts',
    workbench: 'refiner',
    requiredLevel: 2,
    type: 'Component',
    rarity: 'Uncommon',
    priority: 'Essential',
    description: 'Crafted from Metal Parts + ARC Powercell.',
    location: 'Refiner craft, Bombardier/Bastion enemies',
    soloNote: 'Critical for AR repairs.'
  },
  {
    id: 'heavy-gun-parts',
    name: 'Heavy Gun Parts',
    workbench: 'refiner',
    requiredLevel: 3,
    type: 'Component',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Crafted from advanced materials.',
    location: 'Refiner craft, Rocketeer enemies',
    soloNote: 'Needed for sniper/LMG repairs.'
  },
  {
    id: 'complex-gun-parts',
    name: 'Complex Gun Parts',
    workbench: 'refiner',
    requiredLevel: 3,
    type: 'Component',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Required for legendary weapons.',
    location: 'Refiner craft from advanced ARC materials',
    soloNote: 'Bottleneck for endgame weapons.'
  },
  {
    id: 'mechanical-components',
    name: 'Mechanical Components',
    workbench: 'refiner',
    requiredLevel: 2,
    type: 'Component',
    rarity: 'Uncommon',
    priority: 'Essential',
    description: 'Crafted from 5 Metal Parts + ARC Powercell.',
    location: 'Refiner craft',
    soloNote: 'Bottleneck resource for all gun upgrades.'
  },
  {
    id: 'electrical-components',
    name: 'Electrical Components',
    workbench: 'refiner',
    requiredLevel: 2,
    type: 'Component',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Required for gear and utility crafting.',
    location: 'Refiner craft, recycle electronics',
    soloNote: 'Critical for shield and augment crafting.'
  }
];

export const getBlueprintsByWorkbench = (workbench: Blueprint['workbench']) => {
  return blueprints.filter(bp => bp.workbench === workbench);
};

export const getBlueprintsByPriority = (priority: Blueprint['priority']) => {
  return blueprints.filter(bp => bp.priority === priority);
};

export const getCollectionStats = (ownedIds: string[]) => {
  const total = blueprints.length;
  const owned = ownedIds.length;
  const essential = blueprints.filter(bp => bp.priority === 'Essential');
  const essentialOwned = essential.filter(bp => ownedIds.includes(bp.id)).length;

  const byWorkbench: Record<string, { total: number; owned: number }> = {};
  blueprints.forEach(bp => {
    if (!byWorkbench[bp.workbench]) {
      byWorkbench[bp.workbench] = { total: 0, owned: 0 };
    }
    byWorkbench[bp.workbench].total++;
    if (ownedIds.includes(bp.id)) {
      byWorkbench[bp.workbench].owned++;
    }
  });

  return { total, owned, essentialTotal: essential.length, essentialOwned, byWorkbench };
};
