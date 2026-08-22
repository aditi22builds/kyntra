import React from 'react';
import { InteractiveArchitecture } from '../components/architecture/InteractiveArchitecture';
import { Badge } from '../components/ui/Badge';
import { Cpu, ShieldCheck, Database, Layers, GitBranch, Sparkles } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16 text-slate-100">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="prototype">System Design & AI Pipeline</Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white">KYNTRA Technical Architecture</h1>
        <p className="text-sm sm:text-base text-slate-300">
          Modular, confidence-aware, edge-ready architecture designed for life-critical reliability.
        </p>
      </div>

      <InteractiveArchitecture />

      {/* Deep Dive Architecture Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Modular Service Decoupling</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The core recognition layer is abstracted behind the <code>ISLRecognitionService</code> interface. In this MVP, <code>MockISLRecognitionService</code> reliably powers controlled demos and tests; in production, on-device MediaPipe/TensorFlow models drop in without application refactoring.
          </p>
        </div>

        <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Confidence-Aware Fail-Safes</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Confidence is evaluated across multiple discrete vectors: spatial coordinate tracking, temporal sequence grammar, and lighting quality. AI inference never fabricates certainty; low confidence triggers automatic fallback routes.
          </p>
        </div>

        <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Non-Diagnostic Data Contracts</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The Context Extraction Engine enforces medical ethics constraints. It converts raw signs strictly into structured patient-reported symptoms, conscious states, and allergy alerts, refusing to infer or generate clinical diagnoses.
          </p>
        </div>
      </div>
    </div>
  );
};
