export interface Blueprint {
  id: string;
  name: string;
  workbench: 'gunsmith' | 'gear-bench' | 'medical-lab' | 'utility-station' | 'explosives-station' | 'refiner';
  requiredLevel: number;
  type: 'Weapon' | 'Attachment' | 'Shield' | 'Augment' | 'Consumable' | 'Tool' | 'Explosive' | 'Component';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  priority: 'Essential' | 'High Value' | 'Situational' | 'Low Priority';
  description: string;
  soloNote?: string;
}

export const blueprints: Blueprint[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // GUNSMITH - WEAPONS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'arpeggio',
    name: 'Arpeggio SMG',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Fast-firing SMG, excellent for close quarters',
    soloNote: 'Great backup weapon for emergencies'
  },
  {
    id: 'tempest',
    name: 'Tempest AR',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Versatile assault rifle, good at all ranges',
    soloNote: 'Best all-around weapon for solo play'
  },
  {
    id: 'osprey',
    name: 'Osprey Sniper',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Long-range precision rifle',
    soloNote: 'Pick off ARCs from safety'
  },
  {
    id: 'anvil',
    name: 'Anvil LMG',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'High-capacity light machine gun',
    soloNote: 'Good for ARC events but heavy'
  },
  {
    id: 'cascade',
    name: 'Cascade Shotgun',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Pump-action shotgun for close range',
    soloNote: 'Devastating but limited range'
  },
  {
    id: 'viper',
    name: 'Viper Pistol',
    workbench: 'gunsmith',
    requiredLevel: 1,
    type: 'Weapon',
    rarity: 'Uncommon',
    priority: 'High Value',
    description: 'Reliable sidearm with good damage',
    soloNote: 'Always have a backup weapon'
  },
  {
    id: 'storm',
    name: 'Storm DMR',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Semi-auto marksman rifle',
    soloNote: 'Excellent for picking off targets'
  },
  {
    id: 'echo',
    name: 'Echo Revolver',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'High-damage revolver',
    soloNote: 'Style points but slow reload'
  },
  {
    id: 'phantom',
    name: 'Phantom SMG',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Suppressed SMG with integrated silencer',
    soloNote: 'Perfect for stealth players'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GUNSMITH - ATTACHMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'silencer-light',
    name: 'Light Silencer',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Reduces weapon noise for pistols and SMGs',
    soloNote: 'Critical for stealth - reduces ARC detection'
  },
  {
    id: 'silencer-heavy',
    name: 'Heavy Silencer',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Reduces weapon noise for rifles',
    soloNote: 'Silenced AR is a game-changer'
  },
  {
    id: 'scope-2x',
    name: '2x Scope',
    workbench: 'gunsmith',
    requiredLevel: 1,
    type: 'Attachment',
    rarity: 'Uncommon',
    priority: 'High Value',
    description: 'Low magnification scope',
    soloNote: 'Good for medium range engagements'
  },
  {
    id: 'scope-4x',
    name: '4x Scope',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Medium magnification scope',
    soloNote: 'Essential for DMR and sniper'
  },
  {
    id: 'scope-8x',
    name: '8x Scope',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Attachment',
    rarity: 'Epic',
    priority: 'Situational',
    description: 'High magnification sniper scope',
    soloNote: 'Only for dedicated sniping'
  },
  {
    id: 'extended-mag',
    name: 'Extended Magazine',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Increases ammo capacity',
    soloNote: 'More shots before reload'
  },
  {
    id: 'grip-stability',
    name: 'Stability Grip',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Reduces weapon recoil',
    soloNote: 'Better accuracy for sustained fire'
  },
  {
    id: 'muzzle-brake',
    name: 'Muzzle Brake',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Attachment',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Reduces vertical recoil',
    soloNote: 'Alternative to silencer for damage'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GEAR BENCH - SHIELDS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'shield-light',
    name: 'Light Shield',
    workbench: 'gear-bench',
    requiredLevel: 1,
    type: 'Shield',
    rarity: 'Uncommon',
    priority: 'Essential',
    description: 'Basic energy shield with fast recharge',
    soloNote: 'Starting shield, replace ASAP'
  },
  {
    id: 'shield-medium',
    name: 'Medium Shield',
    workbench: 'gear-bench',
    requiredLevel: 2,
    type: 'Shield',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Balanced protection and mobility',
    soloNote: 'Good mid-game shield'
  },
  {
    id: 'shield-heavy',
    name: 'Heavy Shield',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Shield',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Maximum protection, slower recharge',
    soloNote: 'Best survivability for solo'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GEAR BENCH - AUGMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'augment-looting-1',
    name: 'Looting Augment Mk.1',
    workbench: 'gear-bench',
    requiredLevel: 1,
    type: 'Augment',
    rarity: 'Uncommon',
    priority: 'High Value',
    description: 'Increases loot detection range',
    soloNote: 'Find loot faster'
  },
  {
    id: 'augment-looting-2',
    name: 'Looting Augment Mk.2',
    workbench: 'gear-bench',
    requiredLevel: 2,
    type: 'Augment',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Greatly increases loot detection',
    soloNote: 'See loot through walls'
  },
  {
    id: 'augment-looting-3',
    name: 'Looting Augment Mk.3',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Augment',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Maximum loot detection and highlight',
    soloNote: 'Never miss valuable loot'
  },
  {
    id: 'augment-combat-1',
    name: 'Combat Augment Mk.1',
    workbench: 'gear-bench',
    requiredLevel: 1,
    type: 'Augment',
    rarity: 'Uncommon',
    priority: 'Situational',
    description: 'Slight damage boost',
    soloNote: 'Minor combat improvement'
  },
  {
    id: 'augment-combat-2',
    name: 'Combat Augment Mk.2',
    workbench: 'gear-bench',
    requiredLevel: 2,
    type: 'Augment',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Moderate damage and reload boost',
    soloNote: 'Good for ARC fights'
  },
  {
    id: 'augment-combat-3',
    name: 'Combat Augment Mk.3',
    workbench: 'gear-bench',
    requiredLevel: 3,
    type: 'Augment',
    rarity: 'Epic',
    priority: 'High Value',
    description: 'Significant combat enhancements',
    soloNote: 'Best for combat-focused builds'
  },
  {
    id: 'augment-mobility-2',
    name: 'Mobility Augment Mk.2',
    workbench: 'gear-bench',
    requiredLevel: 2,
    type: 'Augment',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Increased movement speed',
    soloNote: 'Faster escapes'
  },
  {
    id: 'augment-stealth-2',
    name: 'Stealth Augment Mk.2',
    workbench: 'gear-bench',
    requiredLevel: 2,
    type: 'Augment',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Reduced noise and detection',
    soloNote: 'Critical for avoiding ARCs and players'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDICAL LAB
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bandage-basic',
    name: 'Bandages',
    workbench: 'medical-lab',
    requiredLevel: 1,
    type: 'Consumable',
    rarity: 'Common',
    priority: 'Essential',
    description: 'Basic healing over time',
    soloNote: 'Cheap and effective'
  },
  {
    id: 'bandage-advanced',
    name: 'Advanced Bandages',
    workbench: 'medical-lab',
    requiredLevel: 2,
    type: 'Consumable',
    rarity: 'Uncommon',
    priority: 'Essential',
    description: 'Faster healing, more HP restored',
    soloNote: 'Upgrade from basic bandages'
  },
  {
    id: 'medkit-basic',
    name: 'Basic Medkit',
    workbench: 'medical-lab',
    requiredLevel: 1,
    type: 'Consumable',
    rarity: 'Uncommon',
    priority: 'High Value',
    description: 'Instant moderate healing',
    soloNote: 'Emergency healing'
  },
  {
    id: 'medkit-emergency',
    name: 'Emergency Medkit',
    workbench: 'medical-lab',
    requiredLevel: 3,
    type: 'Consumable',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Large instant heal',
    soloNote: 'Critical for survival'
  },
  {
    id: 'vita-spray',
    name: 'Vita Spray',
    workbench: 'medical-lab',
    requiredLevel: 3,
    type: 'Consumable',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Rapid healing spray, multiple uses',
    soloNote: 'Best healing item in game - essential'
  },
  {
    id: 'combat-stim',
    name: 'Combat Stim',
    workbench: 'medical-lab',
    requiredLevel: 2,
    type: 'Consumable',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Temporary damage boost',
    soloNote: 'Pop before tough fights'
  },
  {
    id: 'adrenaline-shot',
    name: 'Adrenaline Shot',
    workbench: 'medical-lab',
    requiredLevel: 2,
    type: 'Consumable',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Temporary speed and stamina boost',
    soloNote: 'Perfect for escaping'
  },
  {
    id: 'splint',
    name: 'Splint',
    workbench: 'medical-lab',
    requiredLevel: 1,
    type: 'Consumable',
    rarity: 'Common',
    priority: 'Situational',
    description: 'Cures broken leg status',
    soloNote: 'Carry one just in case'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UTILITY STATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'raider-hatch-key',
    name: 'Raider Hatch Key',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Opens Raider Hatches for rare loot',
    soloNote: 'Access to best loot containers'
  },
  {
    id: 'arc-lure',
    name: 'ARC Lure',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Attracts ARCs to a location',
    soloNote: 'Distract ARCs or bait players'
  },
  {
    id: 'barricade',
    name: 'Barricade',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Uncommon',
    priority: 'Situational',
    description: 'Deployable cover',
    soloNote: 'Create safe spots'
  },
  {
    id: 'lockpick-set',
    name: 'Lockpick Set',
    workbench: 'utility-station',
    requiredLevel: 1,
    type: 'Tool',
    rarity: 'Common',
    priority: 'Essential',
    description: 'Opens locked containers quietly',
    soloNote: 'Silent alternative to breaching'
  },
  {
    id: 'flare',
    name: 'Flare',
    workbench: 'utility-station',
    requiredLevel: 1,
    type: 'Tool',
    rarity: 'Common',
    priority: 'Situational',
    description: 'Illuminates dark areas',
    soloNote: 'Also distracts ARCs'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPLOSIVES STATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'frag-grenade',
    name: 'Frag Grenade',
    workbench: 'explosives-station',
    requiredLevel: 1,
    type: 'Explosive',
    rarity: 'Uncommon',
    priority: 'High Value',
    description: 'Standard explosive grenade',
    soloNote: 'Good for groups of ARCs'
  },
  {
    id: 'smoke-grenade',
    name: 'Smoke Grenade',
    workbench: 'explosives-station',
    requiredLevel: 1,
    type: 'Explosive',
    rarity: 'Common',
    priority: 'Essential',
    description: 'Creates smoke cover',
    soloNote: 'Essential for escaping'
  },
  {
    id: 'stun-grenade',
    name: 'Stun Grenade',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Stuns enemies briefly',
    soloNote: 'Disable ARCs for easy kills'
  },
  {
    id: 'emp-grenade',
    name: 'EMP Grenade',
    workbench: 'explosives-station',
    requiredLevel: 3,
    type: 'Explosive',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Disables ARC enemies',
    soloNote: 'Best tool against ARCs'
  },
  {
    id: 'proximity-mine',
    name: 'Proximity Mine',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Triggered explosive trap',
    soloNote: 'Guard your back'
  },
  {
    id: 'trigger-grenade',
    name: 'Trigger Grenade',
    workbench: 'explosives-station',
    requiredLevel: 2,
    type: 'Explosive',
    rarity: 'Rare',
    priority: 'Situational',
    description: 'Remote detonation grenade',
    soloNote: 'Set traps for followers'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REFINER
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'mechanical-components',
    name: 'Mechanical Components',
    workbench: 'refiner',
    requiredLevel: 2,
    type: 'Component',
    rarity: 'Uncommon',
    priority: 'Essential',
    description: 'Crafted from 5 Metal Parts',
    soloNote: 'Required for Gunsmith upgrades'
  },
  {
    id: 'electrical-components',
    name: 'Electrical Components',
    workbench: 'refiner',
    requiredLevel: 2,
    type: 'Component',
    rarity: 'Uncommon',
    priority: 'Essential',
    description: 'Crafted from electronics',
    soloNote: 'Required for Gear Bench upgrades'
  },
  {
    id: 'durable-cloth',
    name: 'Durable Cloth',
    workbench: 'refiner',
    requiredLevel: 2,
    type: 'Component',
    rarity: 'Uncommon',
    priority: 'Essential',
    description: 'Crafted from Fabric',
    soloNote: 'Required for Medical Lab'
  },
  {
    id: 'advanced-mechanical',
    name: 'Advanced Mechanical Components',
    workbench: 'refiner',
    requiredLevel: 3,
    type: 'Component',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'High-tier crafting component',
    soloNote: 'Required for Tier 3 weapons'
  },
  {
    id: 'advanced-electrical',
    name: 'Advanced Electrical Components',
    workbench: 'refiner',
    requiredLevel: 3,
    type: 'Component',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'High-tier crafting component',
    soloNote: 'Required for Tier 3 gear'
  },
  {
    id: 'explosive-compound',
    name: 'Explosive Compound',
    workbench: 'refiner',
    requiredLevel: 3,
    type: 'Component',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Advanced explosive material',
    soloNote: 'Required for advanced explosives'
  }
];

// Get blueprints by workbench
export const getBlueprintsByWorkbench = (workbench: Blueprint['workbench']) => {
  return blueprints.filter(bp => bp.workbench === workbench);
};

// Get blueprints by priority
export const getBlueprintsByPriority = (priority: Blueprint['priority']) => {
  return blueprints.filter(bp => bp.priority === priority);
};

// Calculate collection stats
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

  return {
    total,
    owned,
    essentialTotal: essential.length,
    essentialOwned,
    byWorkbench
  };
};
