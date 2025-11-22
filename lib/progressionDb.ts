export interface ProgressionTask {
  id: string;
  label: string;
  type: 'craft' | 'quest' | 'skill' | 'upgrade' | 'loot';
  targetId?: string; // Matches IDs in other DBs
  tip?: string; // Context for solo play
}

export interface ProgressionStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  tasks: ProgressionTask[];
}

export const progressionSteps: ProgressionStep[] = [
  // ════════════════════════════════════════════════════════════════════════
  // PHASE 1: THE RAT (Levels 1-5)
  // Focus: unlock economy & movement. Avoid all PvP.
  // ════════════════════════════════════════════════════════════════════════
  {
    id: 'step-basics',
    phase: 'Phase 1: The Rat (Survive)',
    title: 'Establish Basic Economy',
    description: 'Unlock the traders and your passive income source immediately.',
    tasks: [
      {
        id: 'task-quest-picking',
        label: 'Complete Quest: Picking Up the Pieces',
        type: 'quest',
        tip: 'Given by Shani. Just loot 3 containers in Dam Battlegrounds. Unlocks basic trading.'
      },
      {
        id: 'task-marathon',
        label: 'Unlock Skill: Marathon Runner (1/5)',
        type: 'skill',
        targetId: 'marathon-runner',
        tip: 'Your #1 defense is running away. Prioritize this over health early on.'
      },
      {
        id: 'task-quest-scrappy',
        label: 'Complete Quest: Unexpected Initiative',
        type: 'quest',
        targetId: 'quest-unexpected-initiative',
        tip: 'Fertilizer is on Grandioso Apts roof. Water Pump is at Piazza Roma gardens.'
      }
    ]
  },
  {
    id: 'step-scrappy-start',
    phase: 'Phase 1: The Rat (Survive)',
    title: 'Wake Up Scrappy',
    description: 'Scrappy generates free items while you are offline. Critical for solo play.',
    tasks: [
      {
        id: 'task-scrappy-2',
        label: 'Upgrade Scrappy to Level 2',
        type: 'upgrade',
        targetId: 'scrappy-level-2',
        tip: 'Requires 1x Dog Collar. Check residential kitchens/living rooms.'
      },
      {
        id: 'task-skill-lungs',
        label: 'Unlock Skill: Youthful Lungs',
        type: 'skill',
        targetId: 'youthful-lungs',
        tip: 'More stamina = longer sprints after escaping.'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════
  // PHASE 2: THE SCAVENGER (Levels 5-15)
  // Focus: Crafting meds & essential resource farming
  // ════════════════════════════════════════════════════════════════════════
  {
    id: 'step-meds',
    phase: 'Phase 2: The Scavenger (Stabilize)',
    title: 'Secure Medical Supply',
    description: 'Stop relying on found meds. You need to craft your own.',
    tasks: [
      {
        id: 'task-quest-doctor',
        label: "Complete Quest: Doctor's Orders",
        type: 'quest',
        targetId: 'quest-doctors-orders',
        tip: 'Unlocks Medical Lab. Find Great Mullein in nature areas (Dam Testing Annex).'
      },
      {
        id: 'task-med-bench-2',
        label: 'Upgrade Medical Lab to Level 2',
        type: 'upgrade',
        targetId: 'medical-lab-level-2',
        tip: 'Unlocks Advanced Bandages. Requires Cracked Bioscanners (Medical POIs).'
      },
      {
        id: 'task-craft-mid',
        label: 'Unlock Skill: In-Round Crafting',
        type: 'skill',
        targetId: 'in-round-crafting',
        tip: 'Turn found fabric into bandages mid-raid to save inventory space.'
      }
    ]
  },
  {
    id: 'step-trash-treasure',
    phase: 'Phase 2: The Scavenger (Stabilize)',
    title: 'Resource Bottlenecks',
    description: 'Gather the specific tech materials needed for the mid-game.',
    tasks: [
      {
        id: 'task-quest-trash',
        label: 'Complete Quest: Trash Into Treasure',
        type: 'quest',
        tip: 'Requires extracting 6 Wires + 1 Battery. Check Industrial/Tech zones in Dam.'
      },
      {
        id: 'task-loot-cables',
        label: 'Loot: 3x Power Cables',
        type: 'loot',
        targetId: 'Power Cable',
        tip: 'Essential for Gear Bench Lvl 2. Do not sell these!'
      },
      {
        id: 'task-skill-looter',
        label: "Unlock Skill: Looter's Instincts (3/5)",
        type: 'skill',
        targetId: 'looters-instincts',
        tip: 'Speeds up looting to reduce exposure time.'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════
  // PHASE 3: THE OPERATOR (Levels 15-25)
  // Focus: The "Meta" Loadout (Anvil + Medium Shield)
  // ════════════════════════════════════════════════════════════════════════
  {
    id: 'step-shield-spike',
    phase: 'Phase 3: The Operator (Fight)',
    title: 'The Survivability Spike',
    description: 'The most important upgrade in the game. Stops you from getting one-shot.',
    tasks: [
      {
        id: 'task-gear-2',
        label: 'Upgrade Gear Bench to Level 2',
        type: 'upgrade',
        targetId: 'gear-bench-level-2',
        tip: 'Requires those Power Cables you saved. Unlocks Medium Shield.'
      },
      {
        id: 'task-craft-shield-med',
        label: 'Craft: Medium Shield',
        type: 'craft',
        targetId: 'shield-medium',
        tip: 'Never deploy without this again. Massive HP boost.'
      }
    ]
  },
  {
    id: 'step-anvil-rush',
    phase: 'Phase 3: The Operator (Fight)',
    title: 'The Solo Meta Weapon',
    description: 'Unlock the Anvil Hand Cannon. Hits like a sniper, handles like a pistol.',
    tasks: [
      {
        id: 'task-refiner-2',
        label: 'Upgrade Refiner to Level 2',
        type: 'upgrade',
        targetId: 'refiner-level-2',
        tip: 'Required to craft Mechanical Components.'
      },
      {
        id: 'task-gunsmith-2',
        label: 'Upgrade Gunsmith to Level 2',
        type: 'upgrade',
        targetId: 'gunsmith-level-2'
      },
      {
        id: 'task-craft-anvil',
        label: 'Craft: Anvil Hand Cannon',
        type: 'craft',
        targetId: 'anvil',
        tip: 'S-Tier economy. 2-taps AI, cheap ammo, high burst damage.'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════
  // PHASE 4: THE APEX (Levels 25+)
  // Focus: Endgame tech & automated farming
  // ════════════════════════════════════════════════════════════════════════
  {
    id: 'step-passive-income',
    phase: 'Phase 4: The Apex (Dominate)',
    title: 'Max Passive Income',
    description: 'Let Scrappy farm rare materials while you hunt players.',
    tasks: [
      {
        id: 'task-loot-fruit',
        label: 'Loot: 6x Prickly Pear, 6x Olives',
        type: 'loot',
        tip: 'Dedicated run to Blue Gate (Olive Grove) required.'
      },
      {
        id: 'task-scrappy-5',
        label: 'Upgrade Scrappy to Level 5',
        type: 'upgrade',
        targetId: 'scrappy-level-5',
        tip: 'Scrappy now generates mushrooms and rare crafting mats.'
      }
    ]
  },
  {
    id: 'step-endgame-combat',
    phase: 'Phase 4: The Apex (Dominate)',
    title: 'Be The Boss',
    description: 'Top tier healing and damage capabilities.',
    tasks: [
      {
        id: 'task-med-3',
        label: 'Upgrade Medical Lab to Level 3',
        type: 'upgrade',
        targetId: 'medical-lab-level-3'
      },
      {
        id: 'task-craft-vita',
        label: 'Craft: Vita Spray',
        type: 'craft',
        targetId: 'vita-spray',
        tip: 'Heal while sprinting. The ultimate solo advantage.'
      },
      {
        id: 'task-craft-renegade',
        label: 'Craft: Renegade Battle Rifle',
        type: 'craft',
        targetId: 'renegade',
        tip: 'The best long-range solo weapon when you can afford the ammo.'
      }
    ]
  }
];
