export interface Skill {
  id: string;
  name: string;
  maxPoints: number;
  recommendedPoints: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Optional';
  description: string;
  benefit: string;
  prerequisitePoints?: number; // Total points needed in branch before unlock
}

export interface SkillBranch {
  id: string;
  name: string;
  description: string;
  priority: number; // 1 = highest
  color: string;
  skills: Skill[];
}

export const skillBranches: SkillBranch[] = [
  {
    id: 'mobility',
    name: 'Mobility',
    description: 'Movement speed, stamina, and traversal abilities',
    priority: 1,
    color: 'emerald',
    skills: [
      {
        id: 'marathon-runner',
        name: 'Marathon Runner',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Reduces stamina cost for sprinting',
        benefit: '-5% stamina cost per point (25% total)'
      },
      {
        id: 'youthful-lungs',
        name: 'Youthful Lungs',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Increases maximum stamina pool',
        benefit: '+10% max stamina per point (50% total)'
      },
      {
        id: 'slip-and-slide',
        name: 'Slip and Slide',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'High',
        description: 'Faster sliding and stamina regen while sliding',
        benefit: 'Extended slide distance, regen stamina mid-slide'
      },
      {
        id: 'sturdy-ankles',
        name: 'Sturdy Ankles',
        maxPoints: 5,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Reduces fall damage taken',
        benefit: '-15% fall damage per point'
      },
      {
        id: 'carry-the-momentum',
        name: 'Carry the Momentum',
        maxPoints: 5,
        recommendedPoints: 1,
        priority: 'Medium',
        description: 'Sprint immediately after rolling without stamina cost',
        benefit: 'Smooth roll-to-sprint transitions'
      },
      {
        id: 'calming-stroll',
        name: 'Calming Stroll',
        maxPoints: 5,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Regenerate stamina while walking',
        benefit: 'Passive stamina regen during walk'
      },
      {
        id: 'quick-climber',
        name: 'Quick Climber',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Faster climbing and mantling speed',
        benefit: '+10% climb speed per point'
      },
      {
        id: 'nimble-feet',
        name: 'Nimble Feet',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Move faster while crouched',
        benefit: '+8% crouch speed per point'
      }
    ]
  },
  {
    id: 'survival',
    name: 'Survival',
    description: 'Looting, stealth, and resource management',
    priority: 2,
    color: 'amber',
    skills: [
      {
        id: 'looters-instincts',
        name: "Looter's Instincts",
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Faster item identification and container searching',
        benefit: '-10% search time per point (50% total)'
      },
      {
        id: 'silent-scavenger',
        name: 'Silent Scavenger',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Reduced noise while looting containers',
        benefit: 'Near-silent container opening'
      },
      {
        id: 'in-round-crafting',
        name: 'In-Round Crafting',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'Critical',
        description: 'Ability to craft items during raids',
        benefit: 'Craft healing items and ammo mid-raid',
        prerequisitePoints: 15
      },
      {
        id: 'revitalizing-squat',
        name: 'Revitalizing Squat',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'High',
        description: 'Regenerate stamina faster while crouched',
        benefit: '+15% stamina regen per point while crouched'
      },
      {
        id: 'security-breach',
        name: 'Security Breach',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Unlock security lockers without keys',
        benefit: 'Access locked security containers',
        prerequisitePoints: 36
      },
      {
        id: 'proficient-pryer',
        name: 'Proficient Pryer',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'High',
        description: 'Faster breaching and prying speed',
        benefit: '-10% breach time per point'
      },
      {
        id: 'keen-eye',
        name: 'Keen Eye',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'Medium',
        description: 'Increased loot detection range',
        benefit: 'See loot through walls at short range'
      },
      {
        id: 'pack-rat',
        name: 'Pack Rat',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'Medium',
        description: 'Increased inventory capacity',
        benefit: '+2 inventory slots per point'
      }
    ]
  },
  {
    id: 'conditioning',
    name: 'Conditioning',
    description: 'Health, shields, and damage resistance',
    priority: 3,
    color: 'blue',
    skills: [
      {
        id: 'gentle-pressure',
        name: 'Gentle Pressure',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'High',
        description: 'Quieter breaching and door opening',
        benefit: 'Near-silent door breaches'
      },
      {
        id: 'used-to-the-weight',
        name: 'Used to the Weight',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Reduced movement penalty from shields',
        benefit: '-8% encumbrance per point'
      },
      {
        id: 'survivors-stamina',
        name: "Survivor's Stamina",
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'High',
        description: 'Faster stamina regen when critically hurt',
        benefit: '+20% stamina regen per point at low HP'
      },
      {
        id: 'thick-skin',
        name: 'Thick Skin',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Reduced damage from all sources',
        benefit: '-3% damage taken per point'
      },
      {
        id: 'quick-recovery',
        name: 'Quick Recovery',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Faster health regeneration out of combat',
        benefit: '+15% health regen per point'
      },
      {
        id: 'shield-specialist',
        name: 'Shield Specialist',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Shields recharge faster',
        benefit: '-10% shield recharge delay per point'
      },
      {
        id: 'last-stand',
        name: 'Last Stand',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Brief invulnerability when reaching critical health',
        benefit: '2 seconds of damage immunity once per raid',
        prerequisitePoints: 25
      },
      {
        id: 'iron-will',
        name: 'Iron Will',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Optional',
        description: 'Reduced flinch from damage',
        benefit: '-10% flinch per point'
      }
    ]
  }
];

// Calculate total recommended points
export const calculateRecommendedBuild = () => {
  let total = 0;
  const breakdown: { branch: string; points: number }[] = [];

  skillBranches.forEach(branch => {
    const branchTotal = branch.skills.reduce((sum, skill) => sum + skill.recommendedPoints, 0);
    breakdown.push({ branch: branch.name, points: branchTotal });
    total += branchTotal;
  });

  return { total, breakdown };
};

// Get skills by priority
export const getSkillsByPriority = (priority: Skill['priority']) => {
  const skills: (Skill & { branch: string })[] = [];

  skillBranches.forEach(branch => {
    branch.skills.forEach(skill => {
      if (skill.priority === priority) {
        skills.push({ ...skill, branch: branch.name });
      }
    });
  });

  return skills;
};

// Recommended unlock order for solo stealth build
export const soloStealthBuildOrder = [
  { skillId: 'marathon-runner', points: 5, reason: 'Core mobility - escape danger' },
  { skillId: 'youthful-lungs', points: 5, reason: 'More stamina for everything' },
  { skillId: 'looters-instincts', points: 5, reason: 'Faster looting = less exposure' },
  { skillId: 'silent-scavenger', points: 5, reason: 'Stay hidden while looting' },
  { skillId: 'gentle-pressure', points: 5, reason: 'Silent breaching' },
  { skillId: 'in-round-crafting', points: 1, reason: 'Craft healing mid-raid' },
  { skillId: 'slip-and-slide', points: 3, reason: 'Quick escapes' },
  { skillId: 'revitalizing-squat', points: 3, reason: 'Regen while hiding' },
  { skillId: 'calming-stroll', points: 1, reason: 'Passive stamina regen' },
  { skillId: 'sturdy-ankles', points: 1, reason: 'Safer drops' },
  { skillId: 'survivors-stamina', points: 3, reason: 'Escape when hurt' },
  { skillId: 'proficient-pryer', points: 2, reason: 'Faster breaching' },
  { skillId: 'security-breach', points: 1, reason: 'Access locked containers' },
  { skillId: 'carry-the-momentum', points: 1, reason: 'Smooth movement' },
  { skillId: 'last-stand', points: 1, reason: 'Emergency survival' }
];
