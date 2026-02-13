'use client';

import { useState, useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Search, CheckCircle, DollarSign, Recycle, Flame, Package, Target, BookOpen, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { lootDb, Item, getItemRarity, getLocationTag, Rarity, LocationTag, searchItems, filterByStatus, filterByRarity, filterByLocationTag, getBestMapLocations } from '@/lib/lootDb';
import { skillBranches, soloStealthBuildOrder } from '@/lib/skillsDb';
import { blueprints } from '@/lib/blueprintsDb';

type Tab = 'loot' | 'skills' | 'blueprints';

const statusStyles: Record<Item['status'], { border: string; text: string; bg: string; icon: LucideIcon }> = {
  KEEP: { border: 'border-green-500', text: 'text-green-500', bg: 'bg-green-500/20', icon: CheckCircle },
  SELL: { border: 'border-red-500', text: 'text-red-500', bg: 'bg-red-500/20', icon: DollarSign },
  RECYCLE: { border: 'border-blue-500', text: 'text-blue-500', bg: 'bg-blue-500/20', icon: Recycle },
  USE: { border: 'border-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/20', icon: Flame }
};

const rarityColors: Record<Rarity, string> = {
  Common: 'text-zinc-400',
  Uncommon: 'text-green-400',
  Rare: 'text-blue-400',
  Epic: 'text-purple-400',
  Legendary: 'text-orange-400'
};

const locationTagColors: Record<LocationTag, string> = {
  ARC: 'bg-red-500/20 text-red-400',
  Industrial: 'bg-amber-500/20 text-amber-400',
  Residential: 'bg-blue-500/20 text-blue-400',
  Commercial: 'bg-green-500/20 text-green-400',
  Nature: 'bg-emerald-500/20 text-emerald-400',
  Medical: 'bg-pink-500/20 text-pink-400',
  Military: 'bg-slate-500/20 text-slate-400',
  Topside: 'bg-orange-500/20 text-orange-400',
  Crafting: 'bg-indigo-500/20 text-indigo-400',
  Various: 'bg-zinc-500/20 text-zinc-400'
};

const priorityColors: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/20',
  High: 'text-amber-400 bg-amber-500/20',
  Medium: 'text-blue-400 bg-blue-500/20',
  Optional: 'text-zinc-400 bg-zinc-500/20',
  Essential: 'text-red-400 bg-red-500/20',
  'High Value': 'text-amber-400 bg-amber-500/20',
  Situational: 'text-blue-400 bg-blue-500/20',
  'Low Priority': 'text-zinc-400 bg-zinc-500/20'
};

const LAST_UPDATE = 'February 13, 2026';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('loot');

  // Loot tab state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Item['status'] | 'ALL'>('ALL');
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'ALL'>('ALL');
  const [locationFilter, setLocationFilter] = useState<LocationTag | 'ALL'>('ALL');
  const [expandedLootCard, setExpandedLootCard] = useState<string | null>(null);

  // Skills tab state
  const [expandedBranch, setExpandedBranch] = useState<string | null>('mobility');

  // Blueprints tab state
  const [blueprintSearch, setBlueprintSearch] = useState('');

  // Filtered loot
  const filteredLoot = useMemo(() => {
    let items = lootDb;
    items = searchItems(items, searchTerm);
    items = filterByStatus(items, statusFilter);
    items = filterByRarity(items, rarityFilter);
    items = filterByLocationTag(items, locationFilter);
    return items;
  }, [searchTerm, statusFilter, rarityFilter, locationFilter]);

  // Filtered blueprints
  const filteredBlueprints = useMemo(() => {
    if (!blueprintSearch.trim()) return blueprints;
    const query = blueprintSearch.toLowerCase();
    return blueprints.filter(bp =>
      bp.name.toLowerCase().includes(query) ||
      bp.description.toLowerCase().includes(query) ||
      (bp.location && bp.location.toLowerCase().includes(query))
    );
  }, [blueprintSearch]);


  // Calculate total recommended skill points
  const totalRecommendedPoints = useMemo(() => {
    return skillBranches.reduce((total, branch) =>
      total + branch.skills.reduce((sum, skill) => sum + skill.recommendedPoints, 0), 0
    );
  }, []);

  const skippableSkills = useMemo(() => {
    return skillBranches.flatMap(branch =>
      branch.skills
        .filter(skill => skill.recommendedPoints === 0)
        .map(skill => ({
          id: skill.id,
          name: skill.name,
          description: skill.description,
          branch: branch.name
        }))
    );
  }, []);


  const tabs = [
    { id: 'loot' as Tab, label: 'Loot Database', icon: Package },
    { id: 'skills' as Tab, label: 'Skills', icon: Target },
    { id: 'blueprints' as Tab, label: 'Blueprints', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-yellow-500">ARC Raiders Companion</h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-xs text-zinc-400 uppercase tracking-wide">Last update: {LAST_UPDATE}</p>
                <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20 font-bold uppercase">Escalation Season Roadmap</span>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-zinc-800 text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8">
        {/* LOOT DATABASE TAB */}
        {activeTab === 'loot' && (
          <div>
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg">
                <option value="ALL">All Status</option>
                <option value="KEEP">Keep</option>
                <option value="SELL">Sell</option>
                <option value="RECYCLE">Recycle</option>
                <option value="USE">Use/Consume</option>
              </select>
              <select value={rarityFilter} onChange={e => setRarityFilter(e.target.value as typeof rarityFilter)} className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg">
                <option value="ALL">All Rarity</option>
                <option value="Common">Common</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
              </select>
              <select value={locationFilter} onChange={e => setLocationFilter(e.target.value as typeof locationFilter)} className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg">
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

            <p className="text-zinc-500 mb-4">{filteredLoot.length} items found</p>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredLoot.map((item, i) => {
                const style = statusStyles[item.status];
                const Icon = style.icon;
                const rarity = getItemRarity(item);
                const locationTag = getLocationTag(item);
                const bestLocations = getBestMapLocations(item);
                const isExpanded = expandedLootCard === item.name;
                return (
                  <div key={i} className={`bg-zinc-800 rounded-lg p-4 border-l-4 ${style.border}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-bold ${rarityColors[rarity]}`}>{item.name}</h3>
                      <Icon size={18} className={style.text} />
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${style.bg} ${style.text}`}>{item.status}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${locationTagColors[locationTag]}`}>{locationTag}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-2">{item.reason}</p>
                    <p className="text-xs text-zinc-500">{item.location}</p>
                    {bestLocations.length > 0 && (
                      <div className="mt-3 border-t border-zinc-700 pt-3">
                        <button
                          onClick={() => setExpandedLootCard(prev => (prev === item.name ? null : item.name))}
                          className="w-full flex items-center justify-between text-xs font-semibold text-yellow-400"
                        >
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> Best spots by map
                          </span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {isExpanded && (
                          <div className="mt-2 space-y-2">
                            {bestLocations.map((loc, idx) => (
                              <div key={`${loc.map}-${idx}`} className="bg-zinc-900/40 rounded-lg p-2 border border-zinc-700">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-semibold text-white">{loc.map}</span>
                                  <span className="text-amber-400">{loc.hotspot}</span>
                                </div>
                                <p className="text-xs text-zinc-400 mt-1">{loc.tip}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-4 border border-yellow-500/50">
              <h2 className="text-lg font-bold text-yellow-500 mb-2">Recommended Skill Progression</h2>
              <p className="text-sm text-zinc-400 mb-4">
                Follow this order when spending the {totalRecommendedPoints} recommended points. It covers every critical mobility,
                survival, and combat perk for late-game raids.
              </p>
              <div className="space-y-2">
                {soloStealthBuildOrder.map((step, i) => {
                  const branch = skillBranches.find(b => b.skills.some(s => s.id === step.skillId));
                  const skill = branch?.skills.find(s => s.id === step.skillId);
                  const cumulativePoints = soloStealthBuildOrder.slice(0, i + 1).reduce((sum, s) => sum + s.points, 0);
                  return (
                    <div key={step.skillId} className="flex items-start gap-3 p-3 rounded-lg border border-zinc-700 bg-zinc-900/40">
                      <span className="w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold bg-yellow-500 text-black">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-white">{skill?.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">{step.points} pts</span>
                          <span className="text-xs text-zinc-500">{branch?.name}</span>
                          <span className="text-xs text-yellow-400 font-semibold">Total {cumulativePoints} pts</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{step.reason}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {skippableSkills.length > 0 && (
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h3 className="text-lg font-bold text-white mb-2">Skills You Can Skip</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  These unlocks have a negligible payoff—avoid investing points here until the rest of your kit is finished.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skippableSkills.map(skill => (
                    <div key={skill.id} className="p-3 rounded-lg border border-zinc-700 bg-zinc-900/40">
                      <p className="font-medium text-white">{skill.name}</p>
                      <p className="text-xs text-zinc-500">{skill.branch}</p>
                      <p className="text-xs text-zinc-400 mt-1">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skill Branches */}
            <div className="space-y-4">
              {skillBranches.map(branch => {
                const branchPoints = branch.skills.reduce((sum, s) => sum + s.recommendedPoints, 0);
                return (
                  <div key={branch.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
                    <button
                      onClick={() => setExpandedBranch(expandedBranch === branch.id ? null : branch.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-zinc-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full bg-${branch.color}-500`} />
                        <h3 className="font-bold text-lg">{branch.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-400">Priority #{branch.priority}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">{branchPoints} pts recommended</span>
                      </div>
                      {expandedBranch === branch.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {expandedBranch === branch.id && (
                      <div className="px-4 pb-4 space-y-2">
                        <p className="text-sm text-zinc-500 mb-3">{branch.description}</p>
                        {branch.skills.map(skill => (
                          <div key={skill.id} className="flex items-start gap-3 p-3 bg-zinc-700/50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-medium">{skill.name}</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[skill.priority]}`}>{skill.priority}</span>
                                {skill.prerequisitePoints && (
                                  <span className="text-xs text-zinc-500">Requires {skill.prerequisitePoints} pts in tree</span>
                                )}
                              </div>
                              <p className="text-sm text-zinc-400">{skill.description}</p>
                              <p className="text-xs text-green-400 mt-1">{skill.benefit}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-yellow-500 font-bold">{skill.recommendedPoints}/{skill.maxPoints}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BLUEPRINTS TAB */}
        {activeTab === 'blueprints' && (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search blueprints by name, description, or location..."
                value={blueprintSearch}
                onChange={(e) => setBlueprintSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <p className="text-sm text-zinc-500">
              {filteredBlueprints.length} blueprint{filteredBlueprints.length === 1 ? '' : 's'} match your search.
            </p>

            {/* Blueprint Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredBlueprints.map(bp => (
                <div key={bp.id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-yellow-500/40 transition">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white">{bp.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">
                      {bp.workbench.replace(/-/g, ' ')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-400">{bp.type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[bp.priority]}`}>{bp.priority}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${rarityColors[bp.rarity]} bg-zinc-700`}>{bp.rarity}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-1">Requires level {bp.requiredLevel}</p>
                  <p className="text-sm text-zinc-400">{bp.description}</p>
                  {bp.location && (
                    <div className="mt-2 flex items-start gap-1">
                      <MapPin size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-amber-400">{bp.location}</p>
                    </div>
                  )}
                  {bp.soloNote && <p className="text-xs text-yellow-500/80 mt-1">{bp.soloNote}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-zinc-950/95 border-t border-zinc-800 px-2 py-2 flex items-center justify-around z-30 backdrop-blur">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center text-[10px] font-medium px-2 py-1 rounded-lg transition ${
              activeTab === tab.id ? 'text-yellow-400' : 'text-zinc-500'
            }`}
          >
            <tab.icon size={18} />
            <span className="mt-1">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
