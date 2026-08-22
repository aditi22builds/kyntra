import React, { useState } from 'react';
import {
  Presentation,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Mic,
  Headphones,
  RotateCcw,
  Sparkles,
  Volume2,
  FileText,
} from 'lucide-react';
import { EmergencyContext } from '../types/context';
import { SpeechService } from '../services/SpeechService';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ConfidenceIndicator } from '../components/confidence/ConfidenceIndicator';
import { EmergencyCard } from '../components/emergency/EmergencyCard';
import { InterpreterEscalationModal } from '../components/interpreter/InterpreterEscalationModal';
import { DoctorViewModal } from '../components/emergency/DoctorViewModal';

interface PitchDeckViewProps {
  onReturnToApp: () => void;
}

export const PitchDeckView: React.FC<PitchDeckViewProps> = ({ onReturnToApp }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [interpreterModalOpen, setInterpreterModalOpen] = useState(false);

  // Dynamic context for the guided hospital pitch demo
  const [pitchContext, setPitchContext] = useState<EmergencyContext>({
    id: 'CTX-1042',
    person: 'Wife',
    incident: 'Fall from stairs at home',
    injuries: ['Head impact with swelling'],
    consciousness: 'Unconscious',
    symptoms: ['Difficulty breathing / Gasping'],
    duration: '15 minutes ago',
    knownConditions: ['Diabetes Type 2'],
    allergies: [],
    medications: ['Metformin 500mg'],
    immediateRequest: 'Immediate trauma resuscitation',
    confirmedByUser: false,
    confidenceTier: 'high',
    confidenceScore: 94,
    criticalFlag: true,
    timestamp: '10:42 AM',
    updatedAt: '10:42 AM',
  });

  const demoSteps = [
    {
      step: 1,
      badge: 'Step 1 of 8: ISL User Signs',
      title: 'Deaf User Communicates in ISL',
      desc: 'Patient Ravi K. signs urgently in Indian Sign Language into the camera: "My wife fell and hit her head."',
      actionLabel: 'Simulate ISL Visual Recognition →',
      onAction: () => setCurrentStep(2),
    },
    {
      step: 2,
      badge: 'Step 2 of 8: AI Interpretation',
      title: 'AI Interprets Intent & Spatial Motion',
      desc: 'KYNTRA analyzes 42 3D landmarks and produces: "My wife fell and hit her head."',
      actionLabel: 'Check Confidence Evaluation →',
      onAction: () => setCurrentStep(3),
    },
    {
      step: 3,
      badge: 'Step 3 of 8: Confidence Check',
      title: 'Confidence Engine Evaluates Safety',
      desc: 'System rates confidence at 94% (HIGH CONFIDENCE) based on crisp landmark coordinate capture and emergency lexical match.',
      actionLabel: 'Simulate 1-Tap User Confirmation →',
      onAction: () => {
        setPitchContext((p) => ({ ...p, confirmedByUser: true }));
        setCurrentStep(4);
      },
    },
    {
      step: 4,
      badge: 'Step 4 of 8: Context Clarification',
      title: 'Context Clarification: "Is she conscious?"',
      desc: 'System asks: "Is she conscious?" User selects: NO. System asks: "Is she having difficulty breathing?" User selects: YES.',
      actionLabel: 'Compile Structured Emergency Card →',
      onAction: () => setCurrentStep(5),
    },
    {
      step: 5,
      badge: 'Step 5 of 8: Actionable Emergency Card',
      title: 'Structured Emergency Communication Card Generated',
      desc: 'Card dynamically compiles: Person (Wife), Incident (Fall), Head Impact (Yes), Consciousness (Unconscious), Symptom (Difficulty breathing).',
      actionLabel: 'Doctor Asks: "Any Allergies?" (Hearing Mode) →',
      onAction: () => {
        SpeechService.speak('Does she have any known drug allergies?');
        setCurrentStep(6);
      },
    },
    {
      step: 6,
      badge: 'Step 6 of 8: Two-Way Hearing Exchange',
      title: 'Doctor Speaks: "Does she have any known allergies?"',
      desc: 'Doctor speaks into microphone &rarr; Speech-to-text renders large high-contrast captions for user &rarr; User responds: "Penicillin".',
      actionLabel: 'Update Card with Verified Allergy →',
      onAction: () => {
        setPitchContext((p) => ({ ...p, allergies: ['Penicillin'] }));
        setCurrentStep(7);
      },
    },
    {
      step: 7,
      badge: 'Step 7 of 8: Low-Confidence Fail-Safe',
      title: 'Demonstrating Low-Confidence Safety Halt',
      desc: 'What if visual occlusion or noise makes AI uncertain? "Know when you don\'t know." System halts inference and offers live certified human ISL interpreter.',
      actionLabel: 'Simulate Instant Human Interpreter Relay →',
      onAction: () => {
        setInterpreterModalOpen(true);
        setCurrentStep(8);
      },
    },
    {
      step: 8,
      badge: 'Step 8 of 8: Conclusion & Differentiator',
      title: '"We don\'t just translate signs. We help people be understood."',
      desc: 'Judge Takeaway: Translation → Understanding → Context Extraction → Confidence Check → User Confirmation → Clear Action → Human Escalation.',
      actionLabel: 'Restart Pitch Demo ↻',
      onAction: () => {
        setPitchContext((p) => ({ ...p, confirmedByUser: false, allergies: [] }));
        setCurrentStep(1);
      },
    },
  ];

  const current = demoSteps[currentStep - 1];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 text-slate-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-[#0B132B] to-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white">
              2-Minute Live Pitch Demonstrator
            </h1>
            <Badge variant="warning" size="sm">Demo Day Runner</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Step-by-step hospital emergency flow highlighting confidence awareness, context extraction, two-way bridge, and human escalation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onReturnToApp}>
            Exit Pitch Mode
          </Button>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {demoSteps.map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step)}
            className={`p-2 rounded-xl border text-center transition-all ${
              currentStep === s.step
                ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md ring-2 ring-amber-400/40'
                : currentStep > s.step
                ? 'bg-slate-900 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            <span className="text-[10px] font-bold uppercase block">Step {s.step}</span>
            <span className="text-xs truncate block">{s.title.split(':')[0]}</span>
          </button>
        ))}
      </div>

      {/* Main Pitch Step Card */}
      <div className="bg-[#0B1120] border-2 border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              {current.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{current.title}</h2>
          </div>
          <ConfidenceIndicator
            tier={currentStep === 7 ? 'low' : 'high'}
            score={currentStep === 7 ? 38 : 94}
            size="md"
          />
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm sm:text-base text-slate-200 leading-relaxed">
          {current.desc}
        </div>

        {/* Step-specific visual preview */}
        {currentStep <= 4 && (
          <div className="p-6 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>ISL Visual Processing Simulation:</span>
              <span className="font-mono text-emerald-400">● 42 3D KEYPOINTS TRACKED</span>
            </div>
            <p className="text-lg font-bold text-white">
              "My wife fell down the stairs and hit her head. She lost consciousness."
            </p>
            {currentStep >= 3 && (
              <div className="flex items-center gap-2 pt-2 text-xs text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified by User Confirmation (1-tap 8.2s response time)</span>
              </div>
            )}
          </div>
        )}

        {currentStep >= 5 && currentStep <= 7 && (
          <div className="space-y-4">
            <EmergencyCard
              context={pitchContext}
              onShowToDoctor={() => setDoctorModalOpen(true)}
              onEdit={() => {}}
              onClearSession={() => {}}
            />
          </div>
        )}

        {currentStep === 8 && (
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-950/40 via-[#0F172A] to-[#070C18] border-2 border-blue-500/40 text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Don't guess. Help people be understood.
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              KYNTRA is ready for emergency pilots, healthcare department trials, and accessibility infrastructure partnerships.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Button variant="danger" size="lg" onClick={onReturnToApp}>
                Explore Full Application
              </Button>
            </div>
          </div>
        )}

        {/* Action Button for Next Pitch Step */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
            disabled={currentStep === 1}
            className="text-xs text-slate-400 hover:text-white disabled:opacity-30"
          >
            &larr; Previous Step
          </button>

          <Button
            variant="warning"
            size="lg"
            onClick={current.onAction}
            icon={<ArrowRight className="w-5 h-5 text-slate-950" />}
            className="font-black text-slate-950 shadow-lg shadow-amber-950/40"
          >
            {current.actionLabel}
          </Button>
        </div>
      </div>

      {/* Doctor Flashcard Modal */}
      <DoctorViewModal
        isOpen={doctorModalOpen}
        onClose={() => setDoctorModalOpen(false)}
        context={pitchContext}
      />

      {/* Human Interpreter Escalation Modal */}
      <InterpreterEscalationModal
        isOpen={interpreterModalOpen}
        onClose={() => setInterpreterModalOpen(false)}
        context={pitchContext}
      />
    </div>
  );
};
