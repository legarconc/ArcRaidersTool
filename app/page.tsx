'use client';

import { useState, useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Search, CheckCircle, DollarSign, Recycle, Flame, Package, Target, BookOpen, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { lootDb, Item, getItemRarity, getLocationTag, Rarity, LocationTag, searchItems, filterByStatus, filterByRarity, filterByLocationTag, getBestMapLocations } from '@/lib/lootDb';
import { skillBranches, recommendedBuildOrder } from '@/lib/skillsDb';
import { blueprints } from '@/lib/blueprintsDb';

type Tab = 'loot' | 'blueprints' | 'skills';

const statusStyles: Record<Item['status'], { border: string; text: string; bg: string; icon: LucideIcon }> = {
  KEEP:    { border: 'border-l-green-500',  text: 'text-green-400',  bg: 'bg-green-500/10',  icon: CheckCircle },
  SELL:    { border: 'border-l-red-500',    text: 'text-red-400',    bg: 'bg-red-500/10',    icon: DollarSign },
  RECYCLE: { border: 'border-l-blue-500',   text: 'text-blue-400',   bg: 'bg-blue-500/10',   icon: Recycle },
  USE:     { border: 'border-l-amber-500',  text: 'text-amber-400',  bg: 'bg-amber-500/10',  icon: Flame }
};

const rarityColors: Record<Rarity, string> = {
  Common:    'text-zinc-400',
  Uncommon:  'text-green-400',
  Rare:      'text-blue-400',
  Epic:      'text-purple-400',
  Legendary: 'text-orange-400'
};

const locationTagColors: Record<LocationTag, string> = {
  ARC:         'bg-red-500/15 text-red-400',
  Industrial:  'bg-amber-500/15 text-amber-400',
  Residential: 'bg-blue-500/15 text-blue-400',
  Commercial:  'bg-green-500/15 text-green-400',
  Nature:      'bg-emerald-500/15 text-emerald-400',
  Medical:     'bg-pink-500/15 text-pink-400',
  Military:    'bg-slate-500/15 text-slate-300',
  Topside:     'bg-orange-500/15 text-orange-400',
  Crafting:    'bg-indigo-500/15 text-indigo-400',
  Various:     'bg-zinc-500/15 text-zinc-400'
};

const priorityColors: Record<string, string> = {
  Essential:      'text-yellow-400 bg-yellow-500/10 border border-yellow-500/30',
  'High Value':   'text-amber-400 bg-amber-500/10',
  Situational:    'text-blue-400 bg-blue-500/10',
  'Low Priority': 'text-zinc-500 bg-zinc-500/10'
};

const LAST_UPDATE = 'February 26, 2026';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('loot');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Item['status'] | 'ALL'>('ALL');
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'ALL'>('ALL');
  const [locationFilter, setLocationFilter] = useState<LocationTag | 'ALL'>('ALL');
  const [expandedLootCard, setExpandedLootCard] = useState<string | null>(null);

  const [expandedBranch, setExpandedBranch] = useState<string | null>('mobility');
  const [blueprintSearch, setBlueprintSearch] = useState('');

  const filteredLoot = useMemo(() => {
    let items = lootDb;
    items = searchItems(items, searchTerm);
    items = filterByStatus(items, statusFilter);
    items = filterByRarity(items, rarityFilter);
    items = filterByLocationTag(items, locationFilter);
    return items;
  }, [searchTerm, statusFilter, rarityFilter, locationFilter]);

  const filteredBlueprints = useMemo(() => {
    if (!blueprintSearch.trim()) return blueprints;
    const query = blueprintSearch.toLowerCase();
    return blueprints.filter(bp =>
      bp.name.toLowerCase().includes(query) ||
      bp.description.toLowerCase().includes(query) ||
      (bp.location && bp.location.toLowerCase().includes(query))
    );
  }, [blueprintSearch]);

  const skippableSkills = useMemo(() => {
    return skillBranches.flatMap(branch =>
      branch.skills
        .filter(skill => skill.recommendedPoints === 0)
        .map(skill => ({ id: skill.id, name: skill.name, description: skill.description, branch: branch.name }))
    );
  }, []);

  const tabs = [
    { id: 'loot'       as Tab, label: 'Loot Database', icon: Package },
    { id: 'blueprints' as Tab, label: 'Blueprints',    icon: BookOpen },
    { id: 'skills'     as Tab, label: 'Skills',        icon: Target }
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#e2e2e2]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-[#0b0b0b]/97 backdrop-blur-sm border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 pt-3 pb-0">

          <div className="flex items-end justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Brand stripes – echoes the diagonal colour bars in the artwork */}
              <div className="flex gap-[3px] h-8 items-stretch self-center">
                <div className="w-[3px] bg-yellow-400  [clip-path:polygon(15%_0%,100%_0%,85%_100%,0%_100%)]" />
                <div className="w-[3px] bg-yellow-400/50 [clip-path:polygon(15%_0%,100%_0%,85%_100%,0%_100%)]" />
                <div className="w-[3px] bg-yellow-400/20 [clip-path:polygon(15%_0%,100%_0%,85%_100%,0%_100%)]" />
              </div>
              <div>
                <h1 className="font-display font-bold uppercase tracking-widest leading-none">
                  <span className="text-yellow-400 text-2xl">ARC</span>
                  <span className="text-white text-2xl"> RAIDERS</span>
                  <span className="text-zinc-500 text-base font-normal tracking-wider hidden sm:inline ml-2">{"// COMPANION"}</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-zinc-600 uppercase tracking-widest">Updated {LAST_UPDATE}</p>
                  <span className="text-[11px] bg-yellow-400/10 text-yellow-400 px-1.5 py-0.5 border border-yellow-400/20 font-bold uppercase tracking-wider">
                    Shrouded Sky 1.17.0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex gap-0.5 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-base font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-black'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-5 pb-24 md:pb-8">

        {/* ── LOOT DATABASE ── */}
        {activeTab === 'loot' && (
          <div>
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-5">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#141414] border border-[#272727] text-base focus:outline-none focus:border-yellow-400/50 transition-colors placeholder:text-zinc-600 uppercase tracking-wide"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
                className="px-3 py-2 bg-[#141414] border border-[#272727] text-sm text-zinc-400 focus:outline-none focus:border-yellow-400/50 uppercase tracking-widest"
              >
                <option value="ALL">All Status</option>
                <option value="KEEP">Keep</option>
                <option value="SELL">Sell</option>
                <option value="RECYCLE">Recycle</option>
                <option value="USE">Use / Consume</option>
              </select>
              <select
                value={rarityFilter}
                onChange={e => setRarityFilter(e.target.value as typeof rarityFilter)}
                className="px-3 py-2 bg-[#141414] border border-[#272727] text-sm text-zinc-400 focus:outline-none focus:border-yellow-400/50 uppercase tracking-widest"
              >
                <option value="ALL">All Rarity</option>
                <option value="Common">Common</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
              </select>
              <select
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value as typeof locationFilter)}
                className="px-3 py-2 bg-[#141414] border border-[#272727] text-sm text-zinc-400 focus:outline-none focus:border-yellow-400/50 uppercase tracking-widest"
              >
                <option value="ALL">All Locations</option>
                <option value="ARC">ARC Enemies</option>
                <option value="Industrial">Industrial</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Nature">Nature</option>
                <option value="Medical">Medical</option>
                <option value="Military">Military</option>
                <option value="Topside">Topside</option>
                <option value="Crafting">Crafting</option>
                <option value="Various">Various</option>
              </select>
            </div>

            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">{filteredLoot.length} items</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {filteredLoot.map((item, i) => {
                const style = statusStyles[item.status];
                const Icon = style.icon;
                const rarity = getItemRarity(item);
                const locationTag = getLocationTag(item);
                const bestLocations = getBestMapLocations(item);
                const isExpanded = expandedLootCard === item.name;
                return (
                  <div key={i} className={`bg-[#141414] border-t border-r border-b border-[#222] border-l-2 ${style.border}`}>
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-bold text-lg leading-tight ${rarityColors[rarity]}`}>{item.name}</h3>
                        <Icon size={18} className={`${style.text} flex-shrink-0 mt-0.5 ml-1`} />
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className={`text-xs px-1.5 py-0.5 font-bold uppercase tracking-widest ${style.bg} ${style.text}`}>{item.status}</span>
                        <span className={`text-xs px-1.5 py-0.5 uppercase tracking-wide ${locationTagColors[locationTag]}`}>{locationTag}</span>
                      </div>
                      <p className="text-base text-zinc-400 mb-1.5 leading-relaxed">{item.reason}</p>
                      <p className="text-sm text-zinc-600 leading-relaxed">{item.location}</p>

                      {bestLocations.length > 0 && (
                        <div className="mt-3 border-t border-[#1f1f1f] pt-2">
                          <button
                            onClick={() => setExpandedLootCard(prev => prev === item.name ? null : item.name)}
                            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-widest text-yellow-400/70 hover:text-yellow-400 transition-colors"
                          >
                            <span className="flex items-center gap-1"><MapPin size={12} /> Best spots</span>
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                          {isExpanded && (
                            <div className="mt-2 space-y-1.5">
                              {bestLocations.map((loc, idx) => (
                                <div key={`${loc.map}-${idx}`} className="bg-[#1a1a1a] p-2 border border-[#272727]">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-bold uppercase tracking-wide text-zinc-300">{loc.map}</span>
                                    <span className="text-xs text-yellow-500/60 text-right">{loc.hotspot}</span>
                                  </div>
                                  <p className="text-xs text-zinc-600 mt-1">{loc.tip}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── BLUEPRINTS ── */}
        {activeTab === 'blueprints' && (
          <div className="space-y-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input
                type="text"
                placeholder="Search blueprints..."
                value={blueprintSearch}
                onChange={e => setBlueprintSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#141414] border border-[#272727] text-base focus:outline-none focus:border-yellow-400/50 transition-colors placeholder:text-zinc-600 uppercase tracking-wide"
              />
            </div>

            <p className="text-xs text-zinc-600 uppercase tracking-widest">
              {filteredBlueprints.length} blueprint{filteredBlueprints.length === 1 ? '' : 's'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {filteredBlueprints.map(bp => (
                <div key={bp.id} className="bg-[#141414] border border-[#222] hover:border-yellow-400/25 transition-colors p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg text-white leading-tight">{bp.name}</h3>
                    <span className="text-xs px-1.5 py-0.5 bg-[#1d1d1d] text-zinc-500 uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                      {bp.workbench.replace(/-/g, ' ')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="text-xs px-1.5 py-0.5 bg-[#1d1d1d] text-zinc-500 uppercase tracking-wide">{bp.type}</span>
                    <span className={`text-xs px-1.5 py-0.5 uppercase tracking-wide ${priorityColors[bp.priority]}`}>{bp.priority}</span>
                    <span className={`text-xs px-1.5 py-0.5 bg-[#1d1d1d] uppercase tracking-wide ${rarityColors[bp.rarity]}`}>{bp.rarity}</span>
                  </div>
                  <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1.5">Level {bp.requiredLevel}</p>
                  <p className="text-base text-zinc-400 leading-relaxed">{bp.description}</p>
                  {bp.location && (
                    <div className="mt-2 flex items-start gap-1">
                      <MapPin size={12} className="text-yellow-500/50 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-500/50 leading-relaxed">{bp.location}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SKILLS ── */}
        {activeTab === 'skills' && (
          <div className="space-y-4">

            {/* Top 10 */}
            <div className="bg-[#141414] border border-[#222] border-l-2 border-l-yellow-400">
              <div className="px-4 pt-4 pb-3 border-b border-[#1f1f1f]">
                <h2 className="font-display font-bold uppercase tracking-widest text-yellow-400 text-base">Top 10 Skills to Prioritize</h2>
                <p className="text-sm text-zinc-600 mt-1">Spend your first points here — most impactful mobility, survival, and looting perks.</p>
              </div>
              <div className="p-3 space-y-1.5">
                {recommendedBuildOrder.slice(0, 10).map((step, i) => {
                  const branch = skillBranches.find(b => b.skills.some(s => s.id === step.skillId));
                  const skill = branch?.skills.find(s => s.id === step.skillId);
                  return (
                    <div key={step.skillId} className="flex items-start gap-3 p-2.5 bg-[#1a1a1a] border border-[#252525]">
                      <span className="w-5 h-5 flex items-center justify-center text-xs font-bold bg-yellow-400 text-black flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-lg text-white">{skill?.name}</span>
                          <span className="text-xs px-1.5 py-0.5 bg-[#252525] text-zinc-400 uppercase tracking-wide">{step.points} pts</span>
                          <span className="text-xs text-zinc-600 uppercase tracking-wide">{branch?.name}</span>
                        </div>
                        <p className="text-sm text-zinc-500 mt-0.5 leading-snug">{step.reason}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Skills to skip */}
            {skippableSkills.length > 0 && (
              <div className="bg-[#141414] border border-[#222]">
                <div className="px-4 pt-4 pb-3 border-b border-[#1f1f1f]">
                  <h3 className="font-display font-bold uppercase tracking-widest text-zinc-500 text-base">Skills to Skip</h3>
                  <p className="text-sm text-zinc-600 mt-1">Negligible payoff — invest here only after your core kit is done.</p>
                </div>
                <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {skippableSkills.map(skill => (
                    <div key={skill.id} className="p-2.5 bg-[#1a1a1a] border border-[#252525]">
                      <p className="font-bold text-lg text-zinc-400">{skill.name}</p>
                      <p className="text-xs text-zinc-600 uppercase tracking-wide mt-0.5">{skill.branch}</p>
                      <p className="text-sm text-zinc-600 mt-1 leading-snug">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All skill branches */}
            <div className="space-y-1.5">
              {skillBranches.map(branch => {
                const branchPoints = branch.skills.reduce((sum, s) => sum + s.recommendedPoints, 0);
                const isOpen = expandedBranch === branch.id;
                return (
                  <div key={branch.id} className="bg-[#141414] border border-[#222] overflow-hidden">
                    <button
                      onClick={() => setExpandedBranch(isOpen ? null : branch.id)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#191919] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 bg-${branch.color}-500 flex-shrink-0`} />
                        <span className="font-bold text-lg uppercase tracking-wide">{branch.name}</span>
                        <span className="text-xs px-1.5 py-0.5 bg-[#1d1d1d] text-zinc-600 uppercase tracking-wide hidden sm:inline">
                          Priority #{branch.priority}
                        </span>
                        <span className="text-xs text-yellow-400/60 uppercase tracking-wide">{branchPoints} pts</span>
                      </div>
                      {isOpen
                        ? <ChevronUp size={18} className="text-zinc-600 flex-shrink-0" />
                        : <ChevronDown size={18} className="text-zinc-600 flex-shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#1f1f1f]">
                        <p className="text-base text-zinc-600 px-4 py-2.5">{branch.description}</p>
                        <div className="px-3 pb-3 space-y-1.5">
                          {branch.skills.map(skill => (
                            <div key={skill.id} className="flex items-start gap-3 p-2.5 bg-[#1a1a1a] border border-[#252525]">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="font-bold text-lg text-zinc-200">{skill.name}</span>
                                  <span className={`text-xs px-1.5 py-0.5 uppercase tracking-wider ${priorityColors[skill.priority]}`}>{skill.priority}</span>
                                  {skill.prerequisitePoints && (
                                    <span className="text-xs text-zinc-600 uppercase tracking-wide">Req. {skill.prerequisitePoints} pts</span>
                                  )}
                                </div>
                                <p className="text-base text-zinc-500 leading-relaxed">{skill.description}</p>
                                <p className="text-sm text-green-400/70 mt-1">{skill.benefit}</p>
                              </div>
                              <span className="text-yellow-400 font-bold text-base font-mono flex-shrink-0">
                                {skill.recommendedPoints}/{skill.maxPoints}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-[#0b0b0b]/98 border-t border-[#1f1f1f] px-2 py-2 flex items-center justify-around z-30">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
              activeTab === tab.id ? 'text-yellow-400' : 'text-zinc-600'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[11px] font-bold uppercase tracking-widest">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
