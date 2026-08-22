import React from 'react';
import { PlayCircle, ShieldCheck, HelpCircle, ShieldAlert, Sparkles, Presentation } from 'lucide-react';
import { DEMO_SCENARIOS, DemoScenarioInfo } from '../../services/DemoScenarios';

interface DemoPresetBarProps {
  activeScenarioId?: string;
  onSelectScenario: (scenario: DemoScenarioInfo) => void;
  onStartPitchDemo: () => void;
}

export const DemoPresetBar: React.FC<DemoPresetBarProps> = ({
  activeScenarioId,
  onSelectScenario,
  onStartPitchDemo,
}) => {
  return (
    <div className="bg-[#0B132B]/80 border-y border-blue-500/20 px-4 py-3 text-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-extrabold uppercase tracking-wider border border-blue-500/30">
            DEMO PRESETS
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            1-Click Interactive Test Scenarios:
          </span>
        </div>

        {/* Scenario Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={onStartPitchDemo}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-extrabold shadow-md shadow-amber-900/30 border border-amber-300/50 transition-all"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>★ 2-Min Pitch Demo</span>
          </button>

          {DEMO_SCENARIOS.map((sc) => {
            const isSelected = activeScenarioId === sc.id;
            const icon =
              sc.expectedConfidence === 'high' ? (
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
              ) : sc.expectedConfidence === 'medium' ? (
                <HelpCircle className="w-3 h-3 text-amber-400" />
              ) : (
                <ShieldAlert className="w-3 h-3 text-red-400" />
              );

            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/80'
                }`}
              >
                {icon}
                <span>{sc.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
