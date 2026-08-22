import React, { useState } from 'react';
import {
  Camera,
  Cpu,
  Brain,
  ShieldCheck,
  CheckCircle,
  FileText,
  UserCheck,
  Headphones,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const InteractiveArchitecture: React.FC = () => {
  const [activeStep, setActiveStep] = useState(3);

  const steps = [
    {
      id: 0,
      title: '1. Multi-Modal Input',
      icon: <Camera className="w-5 h-5 text-blue-400" />,
      tag: 'Raw Capture',
      desc: 'High-framerate 2D/3D camera stream, Web Speech voice input, and accessible tactile emergency keyboard.',
      details: 'Local edge video capture with 42 3D hand/facial landmark keypoint extraction at 60 FPS.',
    },
    {
      id: 1,
      title: '2. ISL Recognition Layer',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      tag: 'CV & Sequence Model',
      desc: 'Modular spatial-temporal neural network abstracting ISL hand shapes, facial grammar, and motion trajectories.',
      details: 'Decoupled interface (ISLRecognitionService) allows plug-and-play replacement with production on-device models.',
    },
    {
      id: 2,
      title: '3. Context Engine',
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      tag: 'Semantic Structuring',
      desc: 'Transforms recognized gestures into structured clinical cards (Person, Incident, Symptoms, Allergies).',
      details: 'Enforces strict medical ethics: NEVER creates diagnoses (e.g. CHEST PAIN -> Symptom, NOT Heart Attack).',
    },
    {
      id: 3,
      title: '4. Confidence Engine',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      tag: 'Safety Guardrail',
      desc: 'Multi-factor evaluation: High (>85%), Medium (50-85%), Low (<50%). "Know when you don\'t know."',
      details: 'Evaluates visual landmark tracking, lexical intent ambiguity, and lighting contrast in real-time.',
    },
    {
      id: 4,
      title: '5. User Confirmation',
      icon: <CheckCircle className="w-5 h-5 text-amber-400" />,
      tag: 'Human in the Loop',
      desc: 'Mandatory 1-tap confirmation step for critical medical information before sharing.',
      details: 'Provides YES / NO / EDIT / DISAMBIGUATION options to guarantee the user is 100% understood.',
    },
    {
      id: 5,
      title: '6. Actionable Card & TTS',
      icon: <FileText className="w-5 h-5 text-sky-400" />,
      tag: 'Action Layer',
      desc: 'Instant high-contrast clinical flashcards, Web Speech audio broadcast, and PDF triage export.',
      details: 'Directly consumable by triage doctors, paramedics, and hospital administrative staff.',
    },
    {
      id: 6,
      title: '7. Human Interpreter Fallback',
      icon: <Headphones className="w-5 h-5 text-rose-400" />,
      tag: 'Certified Relay',
      desc: 'Low-confidence or complex queries seamlessly escalate to certified live video ISL interpreters.',
      details: 'Hands over pre-compiled context so the patient never repeats stressful information.',
    },
  ];

  return (
    <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 text-slate-100 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
          Core AI Pipeline
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Translation &rarr; Understanding &rarr; Action
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          Click any stage of KYNTRA's modular pipeline to inspect safety mechanisms and data contracts.
        </p>
      </div>

      {/* Interactive Step Timeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                isActive
                  ? 'bg-blue-900/30 border-blue-500 shadow-lg shadow-blue-950/40 ring-2 ring-blue-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">{step.icon}</span>
                <span className="font-mono text-[10px] text-slate-400">#{step.id + 1}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white line-clamp-1">{step.title.split('. ')[1]}</p>
                <span className="text-[10px] text-slate-400 block truncate">{step.tag}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep Inspection Card */}
      <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
              {steps[activeStep].icon}
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                Stage {activeStep + 1} • {steps[activeStep].tag}
              </span>
              <h4 className="text-lg font-bold text-white">{steps[activeStep].title}</h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
            >
              &larr; Prev
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white"
            >
              Next &rarr;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-400 font-bold uppercase tracking-wider">Functional Role:</span>
            <p className="text-slate-200 text-sm leading-relaxed">{steps[activeStep].desc}</p>
          </div>
          <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">Technical Contract & Safety:</span>
            <p className="text-slate-200 text-sm leading-relaxed">{steps[activeStep].details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
