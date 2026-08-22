import React from 'react';
import { ShieldCheck, HeartHandshake, AlertCircle } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070C18] text-slate-400 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white font-sans">KYNTRA</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Early Stage Prototype
              </span>
            </div>
            <p className="text-slate-300 text-sm font-medium">
              "We don't just translate signs. We help people be understood."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              KYNTRA is an AI-assisted accessibility communication platform designed primarily for Indian Sign Language (ISL) users who need to communicate with hearing people during high-stakes emergency and healthcare moments.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('emergency')} className="hover:text-white transition-colors">
                  Emergency Mode
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('hearing')} className="hover:text-white transition-colors">
                  Hearing Two-Way Mode
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboard')} className="hover:text-white transition-colors">
                  Institutional Access Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('architecture')} className="hover:text-white transition-colors">
                  AI Architecture & Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('roadmap')} className="hover:text-white transition-colors">
                  Roadmap & On-Device Vision
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Principles */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Safety & Trust</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Confidence-Aware AI (No Guessing)
              </li>
              <li className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-blue-400" />
                Human Interpreter Escalation
              </li>
              <li className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                User Confirmation Mandatory
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Safety Notice Box */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">
            Important Prototype & Safety Notice:
          </p>
          <p>
            KYNTRA is an assistive communication prototype designed to structure and convey user-reported information. <strong className="text-slate-200">KYNTRA does NOT diagnose medical conditions</strong>, does NOT provide medical advice, and does NOT guarantee automated emergency dispatch. The current MVP uses a controlled prototype vocabulary and guided demo scenarios to demonstrate confidence-aware interpretation and human escalation workflows.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© 2026 KYNTRA Assistive Technologies. Built with respect for the Deaf and ISL community.</p>
          <p className="font-mono">v1.0.0 • React + TypeScript + WebSpeech</p>
        </div>
      </div>
    </footer>
  );
};
