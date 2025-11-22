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
  // GUNSMITH - WEAPONS (META UPDATED)
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
    soloNote: 'S-Tier. Hits harder than most rifles. Very ammo efficient.'
  },
  {
    id: 'stitcher',
    name: 'Stitcher SMG',
    workbench: 'gunsmith',
    requiredLevel: 1,
    type: 'Weapon',
    rarity: 'Common',
    priority: 'High Value',
    description: 'Reliable starter SMG with cheap ammo economy.',
    soloNote: 'Budget spray weapon for early solos until you unlock Tempest.'
  },
  {
    id: 'renegade',
    name: 'Renegade Battle Rifle',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Lever-action rifle. High damage, moderate fire rate.',
    soloNote: 'S-Tier. The best solo weapon for wiping squads.'
  },
  {
    id: 'bettina',
    name: 'Bettina AR',
    workbench: 'gunsmith',
    requiredLevel: 3,
    type: 'Weapon',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Top-tier Assault Rifle.',
    soloNote: 'S-Tier. Expensive to run, but shreds everything.'
  },
  {
    id: 'tempest',
    name: 'Tempest AR',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Rare',
    priority: 'High Value',
    description: 'Versatile assault rifle, good at all ranges',
    soloNote: 'Reliable A-Tier weapon if you cannot afford Bettina.'
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
    soloNote: 'Best starter sniper. Essential for picking off Rocketeers.'
  },
  {
    id: 'arpeggio',
    name: 'Arpeggio SMG',
    workbench: 'gunsmith',
    requiredLevel: 2,
    type: 'Weapon',
    rarity: 'Uncommon',
    priority: 'Low Priority',
    description: 'Burst-fire SMG.',
    soloNote: 'C-Tier. Lacks DPS for solo clutches. Use Tempest instead.'
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
    soloNote: 'King of close quarters, but useless at range.'
  },
  {
    id: 'viper',
    name: 'Viper Pistol',
    workbench: 'gunsmith',
    requiredLevel: 1,
    type: 'Weapon',
    rarity: 'Uncommon',
    priority: 'Situational',
    description: 'Reliable sidearm.',
    soloNote: 'Good fallback, but replace with Anvil ASAP.'
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
    soloNote: 'Essential for dedicated stealth runs.'
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
    description: 'Balanced protection and mobility',
    soloNote: 'Standard issue for survival.'
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
    soloNote: 'Combine with "Used to the Weight" skill.'
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
    soloNote: 'Wallhacks for loot. Never raid without it.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDICAL & UTILITY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'vita-spray',
    name: 'Vita Spray',
    workbench: 'medical-lab',
    requiredLevel: 3,
    type: 'Consumable',
    rarity: 'Epic',
    priority: 'Essential',
    description: 'Rapid healing spray, multiple uses',
    soloNote: 'The only reliable way to heal mid-combat.'
  },
  {
    id: 'raider-hatch-key',
    name: 'Raider Hatch Key',
    workbench: 'utility-station',
    requiredLevel: 2,
    type: 'Tool',
    rarity: 'Rare',
    priority: 'Essential',
    description: 'Opens Raider Hatches for rare loot',
    soloNote: 'Required to access best underground loot rooms.'
  },
  {
    id: 'mechanical-components',
    name: 'Mechanical Components',
    workbench: 'refiner',
    requiredLevel: 2,
    type: 'Component',
    rarity: 'Uncommon',
    priority: 'Essential',
    description: 'Crafted from 5 Metal Parts + ARC Powercell',
    soloNote: 'Bottleneck resource for all gun upgrades.'
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
