export interface Skill {
  id: string;
  name: string;
  maxPoints: number;
  recommendedPoints: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Optional';
  description: string;
  benefit: string;
  prerequisitePoints?: number;
  isMajor?: boolean;
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
  // NOTE: The "Second Expedition" update (March 2026) introduces a skill point catch-up system.
  {
    id: 'mobility',
    name: 'Mobility',
    description: 'Movement speed, stamina management, and parkour abilities. Highest priority tree - invest 28+ points before branching out.',
    priority: 1,
    color: 'emerald',
    skills: [
      {
        id: 'marathon-runner',
        name: 'Marathon Runner',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Reduces stamina cost for sprinting - your first priority skill',
        benefit: '-5% stamina cost per point (max -25%)',
        isMajor: false
      },
      {
        id: 'youthful-lungs',
        name: 'Youthful Lungs',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Increases maximum stamina pool directly',
        benefit: '+10% max stamina per point (max +50%)',
        isMajor: false
      },
      {
        id: 'slip-and-slide',
        name: 'Slip and Slide',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'High',
        description: 'Slide further and faster without extra stamina cost',
        benefit: 'Extended slide distance and speed',
        isMajor: false
      },
      {
        id: 'nimble-climber',
        name: 'Nimble Climber',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'High',
        description: 'Faster climbing and mantling speed',
        benefit: '+10% climb speed per point',
        isMajor: false
      },
      {
        id: 'sturdy-ankles',
        name: 'Sturdy Ankles',
        maxPoints: 5,
        recommendedPoints: 2,
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
        id: 'heroic-leap',
        name: 'Heroic Leap',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Extends sprint dodge roll distance',
        benefit: 'Longer dodge rolls for escaping danger',
        isMajor: false
      },
      {
        id: 'vaults-on-vaults',
        name: 'Vaults on Vaults on Vaults',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Chain vaults without delay, zero stamina cost for vaulting',
        benefit: 'Free vaulting over obstacles',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'vault-spring',
        name: 'Vault Spring',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'Medium',
        description: 'Speed boost after vaulting',
        benefit: 'Momentum boost post-vault',
        prerequisitePoints: 20,
        isMajor: true
      },
      {
        id: 'calming-stroll',
        name: 'Calming Stroll',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Regenerate stamina at the same pace as standing still while walking',
        benefit: 'Passive regen during walk - essential for long traversal',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'carry-the-momentum',
        name: 'Carry the Momentum',
        maxPoints: 1,
        recommendedPoints: 0,
        priority: 'Optional',
        description: 'Sprint immediately after rolling without stamina cost',
        benefit: 'Free sprint after dodge',
        prerequisitePoints: 20,
        isMajor: true
      }
    ]
  },
  {
    id: 'survival',
    name: 'Survival',
    description: 'Looting speed, crafting, and carry capacity. Essential for self-sufficiency.',
    priority: 2,
    color: 'amber',
    skills: [
      {
        id: 'looters-instincts',
        name: "Looter's Instincts",
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Speeds up the pace at which items populate within the looting menu',
        benefit: '-10% search time per point (max -50%)',
        isMajor: false
      },
      {
        id: 'looters-luck',
        name: "Looter's Luck",
        maxPoints: 5,
        recommendedPoints: 0,
        priority: 'Optional',
        description: 'Chance to reveal multiple items at once',
        benefit: 'Small chance for double reveal - not worth early investment',
        isMajor: false
      },
      {
        id: 'broad-shoulders',
        name: 'Broad Shoulders',
        maxPoints: 5,
        recommendedPoints: 3,
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
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Regenerate stamina faster while crouched',
        benefit: '+15% stamina regen while crouched per point',
        isMajor: false
      },
      {
        id: 'in-round-crafting',
        name: 'In-Round Crafting',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'Critical',
        description: 'Arguably the best skill in the entire game - craft bandages, shield rechargers, and ammo during raids',
        benefit: 'Unlock field crafting menu for self-sufficiency',
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
        benefit: 'Craft advanced items like grenades field-side',
        prerequisitePoints: 25,
        isMajor: true
      },
      {
        id: 'security-breach',
        name: 'Security Breach',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'Critical',
        description: 'Unlock security lockers without keys - highest blueprint drop rates in the game',
        benefit: 'Access red security containers for best blueprint farming',
        prerequisitePoints: 36,
        isMajor: true
      },
      {
        id: 'proficient-pryer',
        name: 'Proficient Pryer',
        maxPoints: 5,
        recommendedPoints: 3,
        priority: 'High',
        description: 'Accelerates breaching locked containers',
        benefit: '-10% breach time per point',
        isMajor: false
      },
      {
        id: 'good-as-new',
        name: 'Good as New',
        maxPoints: 1,
        recommendedPoints: 0,
        priority: 'Optional',
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
    description: 'Noise reduction, melee efficiency, recovery mechanics, and weight management.',
    priority: 3,
    color: 'blue',
    skills: [
      {
        id: 'used-to-the-weight',
        name: 'Used to the Weight',
        maxPoints: 5,
        recommendedPoints: 5,
        priority: 'Critical',
        description: 'Reduced movement penalty from shields and heavy gear',
        benefit: '-8% encumbrance per point - essential for running shields',
        isMajor: false
      },
      {
        id: 'gentle-pressure',
        name: 'Gentle Pressure',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Quieter breaching and door opening',
        benefit: 'Noise reduction for stealth',
        isMajor: false
      },
      {
        id: 'loaded-arms',
        name: 'Loaded Arms',
        maxPoints: 5,
        recommendedPoints: 2,
        priority: 'Medium',
        description: 'Reduces weapon encumbrance impact',
        benefit: 'Carry heavier weapons without penalty',
        isMajor: false
      },
      {
        id: 'survivors-stamina',
        name: "Survivor's Stamina",
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'Critical',
        description: 'Faster stamina regen when critically hurt',
        benefit: 'Emergency escape energy when you need it most',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'fight-or-flight',
        name: 'Fight or Flight',
        maxPoints: 1,
        recommendedPoints: 1,
        priority: 'High',
        description: 'Automatic stamina regeneration when your health hits critical levels',
        benefit: 'Burst stamina on hit (with cooldown)',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'blast-born',
        name: 'Blast-Born',
        maxPoints: 5,
        recommendedPoints: 0,
        priority: 'Optional',
        description: 'Hearing is less affected by explosions',
        benefit: 'Resist tinnitus effects',
        isMajor: false
      },
      {
        id: 'turtle-crawl',
        name: 'Turtle Crawl',
        maxPoints: 5,
        recommendedPoints: 0,
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
        priority: 'Medium',
        description: 'Increases bleed-out time',
        benefit: '+5s bleed timer per point',
        isMajor: false
      },
      {
        id: 'back-on-your-feet',
        name: 'Back on Your Feet',
        maxPoints: 1,
        recommendedPoints: 0,
        priority: 'Optional',
        description: 'Faster teammate revive times',
        benefit: 'Quicker revives - more useful in squads',
        prerequisitePoints: 15,
        isMajor: true
      },
      {
        id: 'flyswatter',
        name: 'Flyswatter',
        maxPoints: 1,
        recommendedPoints: 0,
        priority: 'Optional',
        description: 'Melee attacks can deflect projectiles',
        benefit: 'Deflect incoming attacks - situational',
        prerequisitePoints: 20,
        isMajor: true
      }
    ]
  }
];

export const soloStealthBuildOrder = [
  { skillId: 'marathon-runner', points: 5, reason: 'Core mobility - escape danger and traverse large maps like Stella Montis' },
  { skillId: 'youthful-lungs', points: 5, reason: 'More stamina compounds with Marathon Runner for maximum uptime' },
  { skillId: 'looters-instincts', points: 5, reason: 'Less time looting = less time exposed to other players' },
  { skillId: 'in-round-crafting', points: 1, reason: 'Self-sufficiency - craft meds, ammo, and shield recharges mid-raid' },
  { skillId: 'used-to-the-weight', points: 5, reason: 'Offset heavy shield penalties for survivability' },
  { skillId: 'survivors-stamina', points: 1, reason: 'Clutch escape energy when HP is critical' },
  { skillId: 'slip-and-slide', points: 3, reason: 'Slide further and faster for evasion' },
  { skillId: 'calming-stroll', points: 1, reason: 'Regen stamina while walking - essential for long distances' },
  { skillId: 'broad-shoulders', points: 3, reason: 'Carry more loot out of raids' },
  { skillId: 'nimble-climber', points: 3, reason: 'Faster climbing for quick escapes' },
  { skillId: 'vaults-on-vaults', points: 1, reason: 'Free vaulting over obstacles' },
  { skillId: 'fight-or-flight', points: 1, reason: 'Automatic stamina when taking damage' },
  { skillId: 'proficient-pryer', points: 3, reason: 'Faster container breaching' },
  { skillId: 'traveling-tinkerer', points: 1, reason: 'Craft grenades and advanced items in-field' },
  { skillId: 'security-breach', points: 1, reason: 'Access security lockers - best blueprint drop rates' }
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
