import React from 'react';
import { Compass, CheckCircle2, Clock, Sparkles, Cpu, ShieldCheck, Hospital, Globe2, Building } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface RoadmapViewProps {
  onStartEmergency: () => void;
  onStartPitchDemo: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onStartEmergency, onStartPitchDemo }) => {
  const phases = [
    {
      phase: 'Phase 1 (Current MVP)',
      title: 'Functional Prototype & Emergency Focus',
      status: 'completed',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      items: [
        'Controlled emergency vocabulary recognition model abstraction (ISLRecognitionService)',
        'Context Extraction Engine & structured clinical card generation',
        'Multi-factor confidence scoring (High / Medium / Low) with safety guardrails',
        'Doctor two-way speech-to-text with large readable captions',
        'Certified human interpreter video relay escalation simulation',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Real-Time Edge ISL Recognition & Extended Vocabulary',
      status: 'in_progress',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      items: [
        'Integration of 3D spatial landmark CNN + Transformer models on edge devices',
        'Vocabulary expansion to 500+ acute clinical and emergency symptoms',
        'Advanced ISL non-manual marker & facial grammar detection',
        'Zero-cloud local inference pipeline for enhanced privacy',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Two-Way ISL Synthesis & 3D Sign Avatars',
      status: 'planned',
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      items: [
        'Expressive 3D sign avatar rendering doctor replies directly in ISL',
        'Continuous speech-to-sign semantic animation engine',
        'Multi-dialect regional ISL variations (North / South / East India dialects)',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'On-Device / Offline Emergency Inference',
      status: 'planned',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      items: [
        'Quantized WebAssembly & ONNX runtime for 100% offline emergency operation',
        'Sub-100ms local inference on standard smartphones and hospital tablets without active internet',
      ],
    },
    {
      phase: 'Phase 5',
      title: 'Certified Interpreter Network Integration',
      status: 'planned',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      items: [
        'Direct partnership with ISLRTC certified human interpreter networks',
        'Sub-15 second SLA on-demand emergency video relay service',
        'Automated HIPAA / DISHA compliant session logging and EHR integration',
      ],
    },
    {
      phase: 'Phase 6',
      title: 'Hospital & Emergency Department Pilot',
      status: 'planned',
      icon: <Hospital className="w-5 h-5 text-rose-400" />,
      items: [
        'Clinical trial and triage integration in top tertiary care hospital ERs in India',
        'EMS / Ambulance paramedic tablet deployment',
      ],
    },
    {
      phase: 'Phase 7',
      title: 'Civic & Public Infrastructure Deployment',
      status: 'planned',
      icon: <Building className="w-5 h-5 text-sky-400" />,
      items: [
        'Police stations, railway assistance desks, airports, and courtrooms',
        'Dedicated physical accessibility kiosks with high-contrast hardware',
      ],
    },
    {
      phase: 'Phase 8',
      title: 'Pan-Asian & Global Sign Language Expansion',
      status: 'planned',
      icon: <Globe2 className="w-5 h-5 text-indigo-400" />,
      items: [
        'ASL (American Sign Language), BSL (British Sign Language), and Auslan support',
        'Cross-lingual sign translation for deaf travelers',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16 text-slate-100">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="prototype">Product Strategy</Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white">KYNTRA Strategic Roadmap</h1>
        <p className="text-sm sm:text-base text-slate-300">
          From high-impact emergency triage prototype to ubiquitous public infrastructure accessibility.
        </p>
      </div>

      {/* Offline & On-Device Architecture Vision Box */}
      <div className="bg-gradient-to-r from-blue-950/60 via-[#0B132B] to-slate-900 border-2 border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-blue-400 font-extrabold text-xs uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          Offline & On-Device Resilience Commitment
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Why On-Device Inference is Vital for Emergencies
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          In rural areas, underground metro stations, basements, or during natural disasters, internet connectivity frequently fails. KYNTRA's architecture is explicitly engineered so that the core emergency vocabulary will operate entirely <strong>offline and on-device</strong> via quantized WebAssembly/ONNX models.
        </p>
      </div>

      {/* Phase Timeline Cards */}
      <div className="space-y-4">
        {phases.map((p, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl border transition-all ${
              p.status === 'completed'
                ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg'
                : p.status === 'in_progress'
                ? 'bg-slate-900/90 border-amber-500/40 shadow-lg'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">{p.icon}</div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    {p.phase}
                  </span>
                  <h3 className="text-lg font-extrabold text-white">{p.title}</h3>
                </div>
              </div>

              <div>
                {p.status === 'completed' && <Badge variant="success" size="sm">Live in Prototype</Badge>}
                {p.status === 'in_progress' && <Badge variant="warning" size="sm">Active R&D</Badge>}
                {p.status === 'planned' && <Badge variant="neutral" size="sm">Planned Horizon</Badge>}
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 text-xs text-slate-300">
              {p.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
        <Button variant="danger" size="lg" onClick={onStartEmergency} icon={<Compass className="w-4 h-4" />}>
          Try Current Prototype
        </Button>
        <Button variant="warning" size="lg" onClick={onStartPitchDemo}>
          ★ View 2-Min Live Pitch Demo
        </Button>
      </div>
    </div>
  );
};
