import React from 'react';
import { Activity, ShieldAlert, HeartPulse, Wind, Stethoscope, AlertTriangle } from 'lucide-react';

interface QuickSymptomPadProps {
  onSelectSymptom: (symptom: string) => void;
  onSelectIncident: (incident: string) => void;
}

export const QuickSymptomPad: React.FC<QuickSymptomPadProps> = ({
  onSelectSymptom,
  onSelectIncident,
}) => {
  const rapidIncidents = [
    { label: 'Fall / Slip', icon: <Activity className="w-4 h-4 text-amber-400" /> },
    { label: 'Road Accident', icon: <AlertTriangle className="w-4 h-4 text-red-400" /> },
    { label: 'Fainted / Collapse', icon: <HeartPulse className="w-4 h-4 text-purple-400" /> },
    { label: 'Severe Injury', icon: <ShieldAlert className="w-4 h-4 text-red-400" /> },
  ];

  const rapidSymptoms = [
    { label: 'Chest Pain', icon: <HeartPulse className="w-4 h-4 text-red-400" />, critical: true },
    { label: 'Difficulty Breathing', icon: <Wind className="w-4 h-4 text-sky-400" />, critical: true },
    { label: 'Bleeding', icon: <AlertTriangle className="w-4 h-4 text-red-400" />, critical: true },
    { label: 'Head Impact', icon: <ShieldAlert className="w-4 h-4 text-amber-400" />, critical: true },
    { label: 'Severe Pain', icon: <Activity className="w-4 h-4 text-amber-400" /> },
    { label: 'Penicillin Allergy', icon: <Stethoscope className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 text-slate-200">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Quick Incident / Emergency Selector
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {rapidIncidents.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectIncident(item.label)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-blue-900/30 border border-slate-800 hover:border-blue-500/50 text-xs font-semibold text-slate-200 transition-all text-left"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Reported Symptoms & Critical Alerts
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {rapidSymptoms.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSymptom(item.label)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-xs font-medium text-slate-200 transition-all text-left"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
