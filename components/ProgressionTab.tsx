'use client';

import { useMemo, useState } from 'react';
import { progressionSteps, type ProgressionTask } from '@/lib/progressionDb';
import { CheckCircle2, Circle, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface ProgressionTabProps {
  completionState: Record<string, boolean>;
  onToggleTask: (taskId: string, nextValue: boolean) => void;
  onNavigateToPlanner?: (task: ProgressionTask) => void;
}

const linkableTaskTypes: ProgressionTask['type'][] = ['upgrade', 'quest'];

export function ProgressionTab({ completionState, onToggleTask, onNavigateToPlanner }: ProgressionTabProps) {
  const phases = useMemo(() => {
    const unique: string[] = [];
    progressionSteps.forEach(step => {
      if (!unique.includes(step.phase)) {
        unique.push(step.phase);
      }
    });
    return unique;
  }, []);

  const phaseBuckets = useMemo(() => {
    return phases.map(phase => {
      const steps = progressionSteps.filter(step => step.phase === phase);
      const totalTasks = steps.reduce((sum, step) => sum + step.tasks.length, 0);
      const completedTasks = steps.reduce(
        (sum, step) =>
          sum + step.tasks.filter(task => completionState?.[buildTaskKey(step.id, task.id)]).length,
        0
      );
      return { phase, steps, totalTasks, completedTasks };
    });
  }, [phases, completionState]);

  const defaultPhase = phaseBuckets.find(bucket => bucket.completedTasks < bucket.totalTasks)?.phase || phaseBuckets[0]?.phase || null;
  const [expandedPhase, setExpandedPhase] = useState<string | null>(defaultPhase);

  return (
    <div className="space-y-4">
      {phaseBuckets.map(({ phase, steps, totalTasks, completedTasks }) => {
        const isExpanded = expandedPhase === phase;
        const completionPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
        return (
          <section key={phase} className="border border-zinc-800 rounded-xl bg-zinc-900/40">
            <button
              type="button"
              onClick={() => setExpandedPhase(prev => (prev === phase ? null : phase))}
              className="w-full flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="text-left">
                <p className="text-xs uppercase tracking-wide text-zinc-500">{phase}</p>
                <h3 className="text-base font-semibold text-white">Solo Raider Roadmap</h3>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-zinc-400">
                  {completedTasks}/{totalTasks} tasks
                </span>
                <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 transition-all" style={{ width: `${completionPercent}%` }} />
                </div>
                {isExpanded ? <ChevronUp size={18} className="text-zinc-400" /> : <ChevronDown size={18} className="text-zinc-400" />}
              </div>
            </button>
            {isExpanded && (
              <div className="px-5 pb-5 border-t border-zinc-800">
                <div className="relative ml-4 pl-6 border-l border-zinc-800 space-y-6 pt-5">
                  {steps.map(step => (
                    <article
                      key={step.id}
                      className="relative bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 shadow-lg shadow-black/30"
                    >
                      <div className="absolute -left-9 top-6 bg-zinc-900 border border-yellow-500 rounded-full w-4 h-4" />
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <h4 className="text-base font-semibold text-white">{step.title}</h4>
                          <p className="text-sm text-zinc-400 mt-1">{step.description}</p>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {step.tasks.map(task => {
                          const taskKey = buildTaskKey(step.id, task.id);
                          const checked = Boolean(completionState?.[taskKey]);
                          const isLinkable = Boolean(task.targetId && linkableTaskTypes.includes(task.type));
                          return (
                            <li
                              key={taskKey}
                              className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2"
                            >
                              <button
                                type="button"
                                onClick={() => onToggleTask(taskKey, !checked)}
                                className="mt-1"
                                aria-label={`Mark ${task.label} as ${checked ? 'incomplete' : 'complete'}`}
                              >
                                {checked ? (
                                  <CheckCircle2 className="text-yellow-400" size={18} />
                                ) : (
                                  <Circle className="text-zinc-600" size={18} />
                                )}
                              </button>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap text-sm text-white">
                                  <span>{task.label}</span>
                                  <span className="text-xs uppercase tracking-wide text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded-full">
                                    {task.type}
                                  </span>
                                </div>
                                {task.tip && <p className="text-xs text-zinc-400 mt-1">{task.tip}</p>}
                              </div>
                              {isLinkable && onNavigateToPlanner && (
                                <button
                                  type="button"
                                  onClick={() => onNavigateToPlanner(task)}
                                  className="mt-1 flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300"
                                >
                                  <MapPin size={14} /> Focus
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function buildTaskKey(stepId: string, taskId: string) {
  return `${stepId}-${taskId}`;
}
