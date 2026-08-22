import React from 'react';
import { Eye, Type, Volume2, ShieldCheck } from 'lucide-react';

interface AccessibilityBarProps {
  theme: 'default' | 'contrast' | 'clinical';
  onThemeChange: (t: 'default' | 'contrast' | 'clinical') => void;
  fontSize: 'normal' | 'large' | 'xl';
  onFontSizeChange: (s: 'normal' | 'large' | 'xl') => void;
  ttsAnnouncements: boolean;
  onToggleTTS: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  ttsAnnouncements,
  onToggleTTS,
}) => {
  return (
    <div className="bg-[#0B1120] border-b border-slate-800 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 text-slate-300">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-slate-400 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          Accessibility:
        </span>

        {/* Theme Contrast Selector */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => onThemeChange('default')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              theme === 'default' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => onThemeChange('contrast')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              theme === 'contrast' ? 'bg-yellow-400 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            High Contrast
          </button>
          <button
            onClick={() => onThemeChange('clinical')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              theme === 'clinical' ? 'bg-white text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Clinical Light
          </button>
        </div>

        {/* Font Size Adjuster */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
          <Type className="w-3 h-3 ml-1.5 text-slate-500" />
          <button
            onClick={() => onFontSizeChange('normal')}
            className={`px-2 py-0.5 rounded text-[11px] ${
              fontSize === 'normal' ? 'bg-slate-700 text-white' : 'text-slate-400'
            }`}
          >
            100%
          </button>
          <button
            onClick={() => onFontSizeChange('large')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              fontSize === 'large' ? 'bg-slate-700 text-white' : 'text-slate-400'
            }`}
          >
            120%
          </button>
          <button
            onClick={() => onFontSizeChange('xl')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              fontSize === 'xl' ? 'bg-slate-700 text-white' : 'text-slate-400'
            }`}
          >
            140%
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Screen Reader / Voice Prompt Indicator */}
        <button
          onClick={onToggleTTS}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] transition-colors ${
            ttsAnnouncements
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-slate-900 text-slate-400 border-slate-800'
          }`}
          title="Audio readouts for hearing doctors & screen-reader compatibility"
        >
          <Volume2 className="w-3 h-3" />
          <span>TTS Voice: {ttsAnnouncements ? 'ON' : 'OFF'}</span>
        </button>

        {/* Privacy Indicator */}
        <span className="hidden md:flex items-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Zero video recording • Local memory only
        </span>
      </div>
    </div>
  );
};
