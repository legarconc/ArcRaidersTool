'use client';

import { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  MapPin,
  Zap,
  Target,
  Package,
  Wrench,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import {
  roadmapMissions,
  getMissionWithDetails,
  getPhases,
  calculateProgress,
  type RoadmapMission,
  type MissionType
} from '@/lib/roadmapDb';
import type { LocationTag } from '@/lib/lootDb';

interface RoadmapTabProps {
  completedMissions: string[];
  onToggleMission: (missionId: string) => void;
}

const missionTypeConfig: Record<MissionType, { icon: typeof Zap; color: string; label: string }> = {
  quest: { icon: Target, color: 'text-green-400 bg-green-500/20', label: 'Quest' },
  upgrade: { icon: Wrench, color: 'text-blue-400 bg-blue-500/20', label: 'Upgrade' },
  skill: { icon: Zap, color: 'text-purple-400 bg-purple-500/20', label: 'Skill' },
  loot: { icon: Package, color: 'text-amber-400 bg-amber-500/20', label: 'Loot' },
  craft: { icon: BookOpen, color: 'text-pink-400 bg-pink-500/20', label: 'Craft' }
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

const phaseColors: Record<string, { bg: string; border: string; text: string }> = {
  'Phase 1: The Rat': { bg: 'bg-zinc-800/50', border: 'border-zinc-600', text: 'text-zinc-300' },
  'Phase 2: The Scavenger': { bg: 'bg-amber-900/20', border: 'border-amber-700/50', text: 'text-amber-400' },
  'Phase 3: The Operator': { bg: 'bg-blue-900/20', border: 'border-blue-700/50', text: 'text-blue-400' },
  'Phase 4: The Apex': { bg: 'bg-purple-900/20', border: 'border-purple-700/50', text: 'text-purple-400' }
};

export function RoadmapTab({ completedMissions, onToggleMission }: RoadmapTabProps) {
  const [expandedMission, setExpandedMission] = useState<string | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(() => {
    // Auto-expand the phase containing the next incomplete mission
    const nextIncomplete = roadmapMissions.find(m => !completedMissions.includes(m.id));
    return new Set(nextIncomplete ? [nextIncomplete.phase] : []);
  });

  const phases = useMemo(() => getPhases(), []);
  const progress = useMemo(() => calculateProgress(completedMissions), [completedMissions]);

  const togglePhase = (phase: string) => {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      if (next.has(phase)) {
        next.delete(phase);
      } else {
        next.add(phase);
      }
      return next;
    });
  };

  const toggleMissionExpand = (missionId: string) => {
    setExpandedMission(prev => (prev === missionId ? null : missionId));
  };

  // Find the current (next incomplete) mission
  const currentMissionId = roadmapMissions.find(m => !completedMissions.includes(m.id))?.id;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-xl p-5 border border-zinc-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-yellow-500">Solo Raider Roadmap</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Your step-by-step guide to dominating Arc Raiders
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{progress.completed}/{progress.total}</p>
              <p className="text-xs text-zinc-500">Missions Complete</p>
            </div>
            <div className="w-32">
              <div className="w-full h-3 bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 text-center mt-1">{progress.percent}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Sections */}
      <div className="space-y-4">
        {phases.map(phase => {
          const phaseMissions = roadmapMissions.filter(m => m.phase === phase);
          const phaseCompleted = phaseMissions.filter(m => completedMissions.includes(m.id)).length;
          const isExpanded = expandedPhases.has(phase);
          const colors = phaseColors[phase] || phaseColors['Phase 1: The Rat'];
          const subtitle = phaseMissions[0]?.phaseSubtitle || '';

          return (
            <section key={phase} className={`rounded-xl border ${colors.border} overflow-hidden`}>
              {/* Phase Header */}
              <button
                type="button"
                onClick={() => togglePhase(phase)}
                className={`w-full flex items-center justify-between px-5 py-4 ${colors.bg} hover:bg-zinc-800/80 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown size={20} className="text-zinc-400" />
                  ) : (
                    <ChevronRight size={20} className="text-zinc-400" />
                  )}
                  <div className="text-left">
                    <h3 className={`font-bold ${colors.text}`}>{phase}</h3>
                    <p className="text-xs text-zinc-500">{subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-400">
                    {phaseCompleted}/{phaseMissions.length}
                  </span>
                  <div className="w-20 h-2 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 transition-all"
                      style={{ width: `${(phaseCompleted / phaseMissions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </button>

              {/* Phase Missions */}
              {isExpanded && (
                <div className="p-4 space-y-3 bg-zinc-900/50">
                  {phaseMissions.map(mission => {
                    const isCompleted = completedMissions.includes(mission.id);
                    const isCurrent = mission.id === currentMissionId;
                    const isExpanded = expandedMission === mission.id;
                    const typeConfig = missionTypeConfig[mission.type];
                    const TypeIcon = typeConfig.icon;

                    return (
                      <MissionCard
                        key={mission.id}
                        mission={mission}
                        isCompleted={isCompleted}
                        isCurrent={isCurrent}
                        isExpanded={isExpanded}
                        typeConfig={typeConfig}
                        TypeIcon={TypeIcon}
                        onToggleComplete={() => onToggleMission(mission.id)}
                        onToggleExpand={() => toggleMissionExpand(mission.id)}
                      />
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

interface MissionCardProps {
  mission: RoadmapMission;
  isCompleted: boolean;
  isCurrent: boolean;
  isExpanded: boolean;
  typeConfig: { icon: typeof Zap; color: string; label: string };
  TypeIcon: typeof Zap;
  onToggleComplete: () => void;
  onToggleExpand: () => void;
}

function MissionCard({
  mission,
  isCompleted,
  isCurrent,
  isExpanded,
  typeConfig,
  TypeIcon,
  onToggleComplete,
  onToggleExpand
}: MissionCardProps) {
  const missionWithDetails = useMemo(() => getMissionWithDetails(mission), [mission]);
  const hasRequirements = mission.requirements.length > 0;

  return (
    <article
      className={`rounded-xl border transition-all ${
        isCurrent && !isCompleted
          ? 'border-yellow-500/50 bg-yellow-500/5 ring-1 ring-yellow-500/20'
          : isCompleted
          ? 'border-green-500/30 bg-green-500/5'
          : 'border-zinc-700 bg-zinc-800/50'
      }`}
    >
      {/* Mission Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Step Number & Checkbox */}
          <div className="flex flex-col items-center gap-2">
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                isCompleted
                  ? 'bg-green-500 text-black'
                  : isCurrent
                  ? 'bg-yellow-500 text-black'
                  : 'bg-zinc-700 text-zinc-400'
              }`}
            >
              {mission.step}
            </span>
            <button
              type="button"
              onClick={onToggleComplete}
              className="transition-transform hover:scale-110"
              aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {isCompleted ? (
                <CheckCircle2 className="text-green-400" size={22} />
              ) : (
                <Circle className="text-zinc-600 hover:text-zinc-400" size={22} />
              )}
            </button>
          </div>

          {/* Mission Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4
                className={`font-semibold ${
                  isCompleted ? 'text-green-400 line-through opacity-70' : 'text-white'
                }`}
              >
                {mission.title}
              </h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeConfig.color}`}>
                <TypeIcon size={12} className="inline mr-1" />
                {typeConfig.label}
              </span>
              {isCurrent && !isCompleted && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 animate-pulse">
                  Current
                </span>
              )}
            </div>
            <p className={`text-sm ${isCompleted ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {mission.description}
            </p>

            {/* WHY callout */}
            <div className="mt-2 flex items-start gap-2 p-2 bg-zinc-900/50 rounded-lg border border-zinc-700/50">
              <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-400/90">{mission.why}</p>
            </div>

            {/* Expand Toggle */}
            {(hasRequirements || mission.tips.length > 0 || mission.unlocks.length > 0) && (
              <button
                type="button"
                onClick={onToggleExpand}
                className="mt-3 flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span>{isExpanded ? 'Hide Details' : 'Show Resources & Tips'}</span>
                {hasRequirements && (
                  <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded-full text-zinc-400">
                    {mission.requirements.length} items
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-zinc-700/50 mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {/* Requirements */}
            {hasRequirements && (
              <div>
                <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Package size={14} className="text-yellow-500" />
                  Required Materials
                </h5>
                <div className="space-y-2">
                  {missionWithDetails.requirementDetails.map((req, idx) => (
                    <div
                      key={idx}
                      className="bg-zinc-800 rounded-lg p-3 border border-zinc-700"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-white">{req.itemName}</span>
                        <span className="text-yellow-400 font-bold">x{req.quantity}</span>
                      </div>
                      {req.note && (
                        <p className="text-xs text-zinc-500 mb-2">{req.note}</p>
                      )}
                      {req.locationTag && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${locationTagColors[req.locationTag]}`}
                        >
                          {req.locationTag}
                        </span>
                      )}
                      {req.bestSpots.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {req.bestSpots.slice(0, 2).map((spot, spotIdx) => (
                            <div
                              key={spotIdx}
                              className="flex items-start gap-2 text-xs bg-zinc-900/50 rounded p-2"
                            >
                              <MapPin size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-white">{spot.map}</span>
                                <span className="text-zinc-500"> - {spot.hotspot}</span>
                                <p className="text-zinc-500 mt-0.5">{spot.tip}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unlocks & Tips */}
            <div className="space-y-4">
              {mission.unlocks.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Zap size={14} className="text-green-500" />
                    Unlocks
                  </h5>
                  <ul className="space-y-1">
                    {mission.unlocks.map((unlock, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-green-400 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {unlock}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {mission.tips.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Target size={14} className="text-blue-500" />
                    Pro Tips
                  </h5>
                  <ul className="space-y-1">
                    {mission.tips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-zinc-400 flex items-start gap-2"
                      >
                        <span className="text-blue-400 mt-1">*</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
