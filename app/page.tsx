'use client';

import { useState, useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Search, CheckCircle, DollarSign, Recycle, Flame, Package, Target, BookOpen, Download, Upload, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { lootDb, Item, getItemRarity, getLocationTag, Rarity, LocationTag, searchItems, filterByStatus, filterByRarity, filterByLocationTag, getBestMapLocations } from '@/lib/lootDb';
import { skillBranches, soloStealthBuildOrder } from '@/lib/skillsDb';
import { blueprints, getCollectionStats } from '@/lib/blueprintsDb';
import { useLocalStorage, AppData, downloadData, importData } from '@/lib/useLocalStorage';

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

const LAST_UPDATE = 'December 20, 2025';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('loot');

  // Loot tab state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Item['status'] | 'ALL'>('ALL');
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'ALL'>('ALL');
  const [locationFilter, setLocationFilter] = useState<LocationTag | 'ALL'>('ALL');
  const [expandedLootCard, setExpandedLootCard] = useState<string | null>(null);

  // Skills tab state
  const [playerLevel, setPlayerLevel] = useLocalStorage<number>('arc-player-level', 1);
  const [expandedBranch, setExpandedBranch] = useState<string | null>('mobility');

  // Blueprints tab state
  const [ownedBlueprints, setOwnedBlueprints] = useLocalStorage<string[]>('arc-blueprints', []);
  const [blueprintFilter, setBlueprintFilter] = useState<'all' | 'owned' | 'missing'>('all');
  const [workbenchFilter, setWorkbenchFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
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
    let bps = blueprints;
    if (blueprintSearch.trim()) {
      const query = blueprintSearch.toLowerCase();
      bps = bps.filter(bp =>
        bp.name.toLowerCase().includes(query) ||
        bp.description.toLowerCase().includes(query) ||
        (bp.location && bp.location.toLowerCase().includes(query))
      );
    }
    if (blueprintFilter === 'owned') bps = bps.filter(bp => ownedBlueprints.includes(bp.id));
    if (blueprintFilter === 'missing') bps = bps.filter(bp => !ownedBlueprints.includes(bp.id));
    if (workbenchFilter !== 'all') bps = bps.filter(bp => bp.workbench === workbenchFilter);
    if (priorityFilter !== 'all') bps = bps.filter(bp => bp.priority === priorityFilter);
    return bps;
  }, [blueprintFilter, workbenchFilter, priorityFilter, ownedBlueprints, blueprintSearch]);

  const blueprintStats = useMemo(() => getCollectionStats(ownedBlueprints), [ownedBlueprints]);

  // Calculate total recommended skill points
  const totalRecommendedPoints = useMemo(() => {
    return skillBranches.reduce((total, branch) =>
      total + branch.skills.reduce((sum, skill) => sum + skill.recommendedPoints, 0), 0
    );
  }, []);

  // Export/Import handlers
  const handleExport = () => {
    const data: AppData = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      ownedBlueprints,
      playerLevel
    };
    downloadData(data);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = importData(event.target?.result as string);
      if (data) {
        if (data.ownedBlueprints) setOwnedBlueprints(data.ownedBlueprints);
        if (data.playerLevel) setPlayerLevel(data.playerLevel);
        alert('Progress imported successfully!');
      } else {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const toggleBlueprint = (id: string) => {
    setOwnedBlueprints(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

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
              <p className="text-xs text-zinc-400 uppercase tracking-wide">Last update: {LAST_UPDATE}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleExport} className="flex items-center gap-1 px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg">
                <Download size={14} /> Export
              </button>
              <label className="flex items-center gap-1 px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer">
                <Upload size={14} /> Import
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
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
            {/* Point Calculator */}
            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-zinc-400">Player Level:</label>
                  <input
                    type="number"
                    min="1"
                    max="75"
                    value={playerLevel}
                    onChange={e => setPlayerLevel(Math.min(75, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-20 px-3 py-1 bg-zinc-700 border border-zinc-600 rounded text-center"
                  />
                </div>
                <div className="text-sm">
                  <span className="text-zinc-400">Available Points: </span>
                  <span className="text-yellow-500 font-bold">{playerLevel}</span>
                </div>
                <div className="text-sm">
                  <span className="text-zinc-400">Recommended Build: </span>
                  <span className="text-green-500 font-bold">{totalRecommendedPoints} points</span>
                </div>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (playerLevel / totalRecommendedPoints) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                {playerLevel >= totalRecommendedPoints ? 'All recommended skills available!' : `Reach level ${totalRecommendedPoints} for full build`}
              </p>
            </div>

            {/* Recommended Skill Progression */}
            <div className="bg-zinc-800 rounded-lg p-4 border border-yellow-500/50">
              <h2 className="text-lg font-bold text-yellow-500 mb-3">Recommended Skill Progression (Solo)</h2>
              <p className="text-sm text-zinc-400 mb-4">Follow this order when spending skill points for optimal solo gameplay:</p>
              <div className="space-y-2">
                {soloStealthBuildOrder.map((step, i) => {
                  const branch = skillBranches.find(b => b.skills.some(s => s.id === step.skillId));
                  const skill = branch?.skills.find(s => s.id === step.skillId);
                  const cumulativePoints = soloStealthBuildOrder.slice(0, i + 1).reduce((sum, s) => sum + s.points, 0);
                  const isUnlocked = playerLevel >= cumulativePoints;
                  return (
                    <div key={step.skillId} className={`flex items-center gap-3 p-3 rounded-lg ${isUnlocked ? 'bg-green-500/10 border border-green-500/30' : 'bg-zinc-700/50'}`}>
                      <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${isUnlocked ? 'bg-green-500 text-black' : 'bg-zinc-600 text-zinc-400'}`}>{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${isUnlocked ? 'text-green-400' : 'text-white'}`}>{skill?.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-400">{step.points} pts</span>
                          <span className="text-xs text-zinc-500">({branch?.name})</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{step.reason}</p>
                      </div>
                      <span className="text-xs text-zinc-500">Lvl {cumulativePoints}</span>
                    </div>
                  );
                })}
              </div>
            </div>

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
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 text-center">
                <p className="text-2xl font-bold text-yellow-500">{blueprintStats.owned}/{blueprintStats.total}</p>
                <p className="text-xs text-zinc-500">Total Collected</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 text-center">
                <p className="text-2xl font-bold text-red-400">{blueprintStats.essentialOwned}/{blueprintStats.essentialTotal}</p>
                <p className="text-xs text-zinc-500">Essential</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 text-center">
                <div className="w-full bg-zinc-700 rounded-full h-3 mb-1">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{ width: `${(blueprintStats.owned / blueprintStats.total) * 100}%` }} />
                </div>
                <p className="text-xs text-zinc-500">{Math.round((blueprintStats.owned / blueprintStats.total) * 100)}% Complete</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 text-center">
                <p className="text-2xl font-bold text-green-400">{blueprintStats.total - blueprintStats.owned}</p>
                <p className="text-xs text-zinc-500">Remaining</p>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="text"
                  placeholder="Search blueprints..."
                  value={blueprintSearch}
                  onChange={(e) => setBlueprintSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <select value={blueprintFilter} onChange={e => setBlueprintFilter(e.target.value as typeof blueprintFilter)} className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg">
                <option value="all">All Blueprints</option>
                <option value="owned">Owned</option>
                <option value="missing">Missing</option>
              </select>
              <select value={workbenchFilter} onChange={e => setWorkbenchFilter(e.target.value)} className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg">
                <option value="all">All Workbenches</option>
                <option value="gunsmith">Gunsmith</option>
                <option value="gear-bench">Gear Bench</option>
                <option value="medical-lab">Medical Lab</option>
                <option value="utility-station">Utility Station</option>
                <option value="explosives-station">Explosives</option>
                <option value="refiner">Refiner</option>
              </select>
              <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg">
                <option value="all">All Priority</option>
                <option value="Essential">Essential</option>
                <option value="High Value">High Value</option>
                <option value="Situational">Situational</option>
                <option value="Low Priority">Low Priority</option>
              </select>
            </div>

            <p className="text-zinc-500">{filteredBlueprints.length} blueprints found</p>

            {/* Blueprint Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredBlueprints.map(bp => {
                const owned = ownedBlueprints.includes(bp.id);
                return (
                  <div
                    key={bp.id}
                    onClick={() => toggleBlueprint(bp.id)}
                    className={`bg-zinc-800 rounded-lg p-4 border cursor-pointer transition-all ${
                      owned ? 'border-green-500 bg-green-500/10' : 'border-zinc-700 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-medium ${owned ? 'text-green-400' : 'text-white'}`}>{bp.name}</h3>
                      <input type="checkbox" checked={owned} onChange={() => {}} className="w-5 h-5 accent-green-500" />
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-400">{bp.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[bp.priority]}`}>{bp.priority}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${rarityColors[bp.rarity]} bg-zinc-700`}>{bp.rarity}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-1">L{bp.requiredLevel} {bp.workbench.replace(/-/g, ' ')}</p>
                    <p className="text-sm text-zinc-400">{bp.description}</p>
                    {bp.location && (
                      <div className="mt-2 flex items-start gap-1">
                        <MapPin size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-400">{bp.location}</p>
                      </div>
                    )}
                    {bp.soloNote && <p className="text-xs text-yellow-500/80 mt-1">{bp.soloNote}</p>}
                  </div>
                );
              })}
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
