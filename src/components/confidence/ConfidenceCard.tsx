import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { ConfidenceAssessment } from '../../types/confidence';
import { ConfidenceIndicator } from './ConfidenceIndicator';

interface ConfidenceCardProps {
  assessment: ConfidenceAssessment;
}

export const ConfidenceCard: React.FC<ConfidenceCardProps> = ({ assessment }) => {
  return (
    <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-5 space-y-4 text-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Confidence-Aware AI Evaluation
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">{assessment.explanation}</p>
        </div>
        <ConfidenceIndicator tier={assessment.tier} score={assessment.score} size="md" />
      </div>

      {/* Factor Breakdown */}
      <div className="space-y-3 pt-1">
        <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Detection Quality Factors
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {assessment.factors.map((factor, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-300">{factor.name}</span>
                <span className="font-mono font-bold text-slate-400">{factor.score}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    factor.score > 80 ? 'bg-emerald-500' : factor.score > 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Guideline Box */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-950/20 border border-blue-900/40 text-blue-300 text-xs">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Product Principle:</strong> KYNTRA never fabricates certainty. If confidence drops below safe operating limits, the system halts automated inference and offers instant typing or human relay.
        </p>
      </div>
    </div>
  );
};
