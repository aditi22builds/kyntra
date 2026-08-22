import React from 'react';
import { Check, Edit3, RotateCcw, HelpCircle, ShieldAlert } from 'lucide-react';
import { ConfidenceTier } from '../../types/confidence';
import { Button } from '../ui/Button';
import { ConfidenceIndicator } from '../confidence/ConfidenceIndicator';

interface ConfirmationModalProps {
  isOpen: boolean;
  interpretationText: string;
  confidenceTier: ConfidenceTier;
  confidenceScore: number;
  clarificationQuestion?: string;
  clarificationOptions?: string[];
  onConfirm: () => void;
  onSelectOption?: (option: string) => void;
  onEdit: () => void;
  onTryAgain: () => void;
  onEscalateToHuman: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  interpretationText,
  confidenceTier,
  confidenceScore,
  clarificationQuestion,
  clarificationOptions,
  onConfirm,
  onSelectOption,
  onEdit,
  onTryAgain,
  onEscalateToHuman,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#0B1224] border-2 border-blue-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 animate-in zoom-in-95 duration-150">
        {/* Header with Confidence Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              KYNTRA ISL UNDERSTANDING
            </span>
            <h3 className="text-lg font-extrabold text-white mt-0.5">Please Confirm Interpretation</h3>
          </div>
          <ConfidenceIndicator tier={confidenceTier} score={confidenceScore} size="md" />
        </div>

        {/* Recognized Message */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Detected Communication:
          </span>
          <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            "{interpretationText}"
          </p>
        </div>

        {/* Optional Clarification Prompt (Medium Confidence) */}
        {clarificationQuestion && clarificationOptions && clarificationOptions.length > 0 && (
          <div className="bg-amber-950/30 border border-amber-900/50 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <HelpCircle className="w-4 h-4" />
              <span>{clarificationQuestion}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {clarificationOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => onSelectOption && onSelectOption(opt)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-xs font-semibold border border-amber-500/40 text-amber-200 transition-all text-left"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Low Confidence Safety Warning */}
        {confidenceTier === 'low' && (
          <div className="p-4 rounded-2xl bg-red-950/30 border border-red-900/50 text-xs text-red-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-red-300">
              <ShieldAlert className="w-4 h-4" />
              <span>Safety Rule: Never fabricate certainty</span>
            </div>
            <p>
              Visual confidence is low. Please do not guess critical medical signs. You can type your message or connect to a live certified human ISL interpreter.
            </p>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={onConfirm}
              icon={<Check className="w-5 h-5" />}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
            >
              ✓ CONFIRM
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onEdit}
              icon={<Edit3 className="w-4 h-4" />}
            >
              ✎ EDIT
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onTryAgain}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              ↻ TRY AGAIN
            </Button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex justify-center">
            <button
              onClick={onEscalateToHuman}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold hover:underline py-1 flex items-center gap-1.5"
            >
              AI isn't confident? Connect to Human ISL Interpreter &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
