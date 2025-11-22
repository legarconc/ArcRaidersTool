export interface Skill {
  id: string;
  name: string;
  maxPoints: number;
  recommendedPoints: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Optional';
  description: string;
  benefit: string;
  prerequisitePoints?: number; // Points needed in branch to unlock
  isMajor?: boolean; // Major skills usually cost 1 point but have prerequisites
}

export interface SkillBranch {
  id: string;
  name: string;
  description: string;
  priority: number;
  color: string;
  skills: Skill[];
}

export const skillBranches: SkillBranch[] = [
  {
    id: 'mobility',
    name: 'Mobility',
    description: 'Stamina efficiency, speed, and traversal.',
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
        benefit: '-5% stamina cost per point',
        isMajor: false
      },
      {
        id: 'youthful-lungs',
        name: 'Youthful Lungs',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Increases maximum stamina pool',
        benefit: '+10% max stamina per point',
        isMajor: false
      },
      {
        id: 'slip-and-slide',
        name: 'Slip and Slide',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'High',
        description: 'Faster sliding and stamina regen while sliding',
        benefit: 'Extended slide distance',
        isMajor: false
      },
      {
        id: 'sturdy-ankles',
        name: 'Sturdy Ankles',
        maxPoints: 5,
        recommendedPoints: 1,
        priority: 'Medium',
        description: 'Reduces fall damage taken',
        benefit: '-15% fall damage per point',
        isMajor: false
      },
      {
        id: 'ready-to-roll',
        name: 'Ready to Roll',
        maxPoints: 5,
        recommendedPoints: 1,
        priority: 'Optional',
        description: 'Increases timing window for recovery rolls',
        benefit: 'Easier fall recovery',
        isMajor: false
      },
      {
        id: 'carry-the-momentum',
        name: 'Carry the Momentum',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'Medium',
        description: 'Sprint immediately after rolling without stamina cost',
        benefit: 'Free sprint after dodge',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'calming-stroll',
        name: 'Calming Stroll',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Regenerate stamina while walking',
        benefit: 'Passive regen during walk',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'nimble-climber',
        name: 'Nimble Climber',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Faster climbing and mantling speed',
        benefit: '+10% climb speed per point',
        isMajor: false
      }
    ]
  },
  {
    id: 'survival',
    name: 'Survival',
    description: 'Looting speed, crafting, and carry capacity.',
    priority: 2,
    color: 'amber',
    skills: [
      {
        id: 'looters-instincts',
        name: "Looter's Instincts",
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Faster item identification and search speed',
        benefit: '-10% search time per point',
        isMajor: false
      },
      {
        id: 'looters-luck',
        name: "Looter's Luck",
        maxPoints: 5,
        recommendedPoints: 1,
        priority: 'Optional',
        description: 'Chance to reveal multiple items at once',
        benefit: 'Small chance for double reveal',
        isMajor: false
      },
      {
        id: 'broad-shoulders',
        name: 'Broad Shoulders',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'High',
        description: 'Increases maximum weight capacity',
        benefit: '+2kg capacity per point',
        isMajor: false
      },
      {
        id: 'agile-croucher',
        name: 'Agile Croucher',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Move faster while crouched',
        benefit: '+8% crouch speed per point',
        isMajor: false
      },
      {
        id: 'revitalizing-squat',
        name: 'Revitalizing Squat',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'High',
        description: 'Regenerate stamina faster while crouched',
        benefit: '+15% stamina regen while crouched',
        isMajor: false
      },
      {
        id: 'in-round-crafting',
        name: 'In-Round Crafting',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'Critical',
        description: 'Ability to craft basic items during raids',
        benefit: 'Unlock field crafting menu',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'traveling-tinkerer',
        name: 'Traveling Tinkerer',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Unlocks additional field crafting recipes',
        benefit: 'Craft advanced items field-side',
        prerequisitePoints: 25,
        isMajor: true
      },
      {
        id: 'security-breach',
        name: 'Security Breach',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Unlock security lockers without keys',
        benefit: 'Access red security containers',
        prerequisitePoints: 36,
        isMajor: true
      },
      {
        id: 'good-as-new',
        name: 'Good as New',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'Medium',
        description: 'Increased stamina regen while under healing effects',
        benefit: 'Stamina boost while healing',
        prerequisitePoints: 15,
        isMajor: true
      }
    ]
  },
  {
    id: 'conditioning',
    name: 'Conditioning',
    description: 'Health, damage reduction, and recovery.',
    priority: 3,
    color: 'blue',
    skills: [
      {
        id: 'gentle-pressure',
        name: 'Gentle Pressure',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'Medium',
        description: 'Quieter breaching and door opening',
        benefit: 'Noise reduction',
        isMajor: false
      },
      {
        id: 'used-to-the-weight',
        name: 'Used to the Weight',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'High',
        description: 'Reduced movement penalty from shields',
        benefit: '-8% encumbrance per point',
        isMajor: false
      },
      {
        id: 'blast-born',
        name: 'Blast-Born',
        maxPoints: 5,
        recommendedPoints: 1,
        priority: 'Optional',
        description: 'Hearing is less affected by explosions',
        benefit: 'Resist tinnitus effects',
        isMajor: false
      },
      {
        id: 'survivors-stamina',
        name: "Survivor's Stamina",
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'Critical',
        description: 'Faster stamina regen when critically hurt',
        benefit: 'Emergency escape energy',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'fight-or-flight',
        name: 'Fight or Flight',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Regain fixed stamina when taking damage',
        benefit: 'Burst stamina on hit (Cooldown)',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'turtle-crawl',
        name: 'Turtle Crawl',
        maxPoints: 5,
        recommendedPoints: 1,
        priority: 'Optional',
        description: 'Take less damage when downed',
        benefit: 'Damage reduction while DBNO',
        isMajor: false
      },
      {
        id: 'downed-but-determined',
        name: 'Downed but Determined',
        maxPoints: 5,
        recommendedPoints: 1,
        priority: 'Optional',
        description: 'Increases bleed-out time',
        benefit: '+5s bleed timer per point',
        isMajor: false
      },
      {
        id: 'proficient-pryer',
        name: 'Proficient Pryer',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'High',
        description: 'Faster breaching and prying speed',
        benefit: '-10% breach time per point',
        isMajor: false
      }
    ]
  }
];

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

export const soloStealthBuildOrder = [
  { skillId: 'marathon-runner', points: 5, reason: 'Core mobility - escape danger' },
  { skillId: 'youthful-lungs', points: 5, reason: 'More stamina is king' },
  { skillId: 'looters-instincts', points: 5, reason: 'Less time looting = less time exposed' },
  { skillId: 'in-round-crafting', points: 1, reason: 'Craft meds mid-raid' },
  { skillId: 'used-to-the-weight', points: 3, reason: 'Offset heavy shield penalties' },
  { skillId: 'survivors-stamina', points: 1, reason: 'Clutch escapes at low HP' },
  { skillId: 'calming-stroll', points: 1, reason: 'Regen stamina without stopping' },
  { skillId: 'broad-shoulders', points: 3, reason: 'Carry more loot out' },
  { skillId: 'security-breach', points: 1, reason: 'Access high-tier red lockers' }
];
