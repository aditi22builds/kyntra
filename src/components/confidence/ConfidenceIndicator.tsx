import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { ConfidenceTier } from '../../types/confidence';

interface ConfidenceIndicatorProps {
  tier: ConfidenceTier;
  score?: number;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  tier,
  score,
  showDetails = false,
  size = 'md',
}) => {
  const config = {
    high: {
      label: 'High Confidence',
      sublabel: 'AI is confident. Please review and confirm.',
      icon: <CheckCircle2 className="shrink-0 text-emerald-400" />,
      badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      barColor: 'bg-emerald-500',
    },
    medium: {
      label: 'Please Confirm',
      sublabel: 'Possible ambiguity detected. Please verify.',
      icon: <AlertTriangle className="shrink-0 text-amber-400" />,
      badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      barColor: 'bg-amber-500',
    },
    low: {
      label: 'Not Confident Enough to Interpret Safely',
      sublabel: '"Know when you don\'t know" — Fallback to text or human help.',
      icon: <ShieldAlert className="shrink-0 text-red-400" />,
      badgeBg: 'bg-red-500/15 border-red-500/30 text-red-300',
      barColor: 'bg-red-500',
    },
  }[tier];

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3.5 py-1.5',
    lg: 'text-base px-4 py-2.5',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <div className="inline-flex flex-col gap-1">
      <div
        className={`inline-flex items-center gap-2 rounded-xl border font-semibold ${config.badgeBg} ${sizeClasses}`}
        role="status"
        aria-live="polite"
      >
        <span className={iconSizes}>{config.icon}</span>
        <span>{config.label}</span>
        {score !== undefined && (
          <span className="font-mono text-xs opacity-80 border-l border-current/30 pl-2 ml-1">
            {score}%
          </span>
        )}
      </div>

      {showDetails && (
        <p className="text-xs text-slate-400 max-w-sm mt-0.5">{config.sublabel}</p>
      )}
    </div>
  );
};
