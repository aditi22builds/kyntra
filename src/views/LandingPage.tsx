import React from 'react';
import {
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HeartHandshake,
  Lock,
  Building2,
  Compass,
  Sparkles,
  Layers,
  Presentation,
  Activity,
  UserCheck,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ConfidenceIndicator } from '../components/confidence/ConfidenceIndicator';
import { InteractiveArchitecture } from '../components/architecture/InteractiveArchitecture';

interface LandingPageProps {
  onStartEmergency: () => void;
  onSelectTab: (tab: string) => void;
  onStartPitchDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartEmergency,
  onSelectTab,
  onStartPitchDemo,
}) => {
  return (
    <div className="space-y-24 pb-16 text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Prototype • ISL-Focused • Emergency Communication</span>
          </div>

          {/* Main Hero Typography */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              KYNTRA
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400">
              Technology that understands.
            </p>
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed pt-2">
              "We don't just translate signs. We help people be understood."
            </p>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-normal">
              AI-assisted accessibility communication designed to help Indian Sign Language (ISL) users communicate clearly with hearing people when every second counts.
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="danger"
              size="xl"
              onClick={onStartEmergency}
              icon={<ShieldAlert className="w-6 h-6 animate-pulse" />}
              className="w-full sm:w-auto font-black shadow-xl shadow-red-950/50"
            >
              START EMERGENCY MODE
            </Button>

            <Button
              variant="warning"
              size="xl"
              onClick={onStartPitchDemo}
              icon={<Presentation className="w-5 h-5 text-slate-950" />}
              className="w-full sm:w-auto font-black shadow-xl shadow-amber-950/40"
            >
              ★ 2-MIN LIVE PITCH DEMO
            </Button>
          </div>

          {/* Hero Conceptual Flow Diagram (Core Product Differentiator) */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="bg-[#0B1224] border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <span className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                The KYNTRA Core Paradigm
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-xs font-bold">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-blue-300">
                  1. ISL SIGN / SPEECH
                </div>
                <div className="hidden sm:block text-slate-500 font-mono text-lg">&rarr;</div>
                <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-200">
                  2. CONTEXT ENGINE
                </div>
                <div className="hidden sm:block text-slate-500 font-mono text-lg">&rarr;</div>
                <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-200">
                  3. CONFIDENCE CHECK
                </div>
                <div className="hidden sm:block text-slate-500 font-mono text-lg">&rarr;</div>
                <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200">
                  4. USER CONFIRM
                </div>
                <div className="hidden sm:block text-slate-500 font-mono text-lg">&rarr;</div>
                <div className="p-3.5 rounded-2xl bg-blue-600 text-white font-extrabold shadow-lg">
                  5. ACTIONABLE CARD
                </div>
              </div>
              <p className="text-xs text-slate-400 pt-2">
                "Translation &rarr; Understanding &rarr; Action &rarr; Human Escalation If Needed"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-3">
          <Badge variant="warning">The Urgent Problem</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            When communication becomes critical, every second matters.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A hearing doctor, triage nurse, or police officer cannot automatically understand Indian Sign Language (ISL). In acute emergencies, deaf individuals often have to scramble with written paper, improvised hand gestures, or wait anxiously for a family member or human interpreter to arrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <Clock className="w-6 h-6 text-red-400" />
            <h4 className="text-base font-bold text-white">Time-Critical Delay</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In traumas, strokes, and allergic reactions, delays in communicating medical history and acute symptoms can lead to severe adverse clinical outcomes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            <h4 className="text-base font-bold text-white">Loss of Nuance & Context</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generic word-by-word translation lacks crucial context: Who was hurt? Did they lose consciousness? Are there pre-existing allergies or diabetes?
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <ShieldAlert className="w-6 h-6 text-blue-400" />
            <h4 className="text-base font-bold text-white">Overconfidence in AI</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hallucinated AI translations can be dangerous. A safe accessibility tool must "know when it doesn't know" and never fabricate certainty.
            </p>
          </div>
        </div>
      </section>

      {/* 3. EXISTING GAP & WHERE KYNTRA FITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-3">
          <Badge variant="info">Where KYNTRA Fits</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Beyond raw translation: Structuring for immediate action.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Existing speech-to-text and interpreter services are vital parts of the accessibility ecosystem. KYNTRA operates on an essential complementary layer: turning communication into context-aware, structured, verified information with automated safety checks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Generic Sign Translators:
            </span>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-mono text-sm">
              "My wife fell."
            </div>
            <p className="text-xs text-slate-400">
              Leaves doctors guessing: When? Did she hit her head? Is she breathing? What are her allergies?
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-950/40 via-[#0B132B] to-slate-900 border-2 border-blue-500/40 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                KYNTRA Structured Communication Card:
              </span>
              <Badge variant="success" size="sm">Actionable Triage</Badge>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/90 border border-blue-500/30 text-xs space-y-1.5">
              <p><strong className="text-slate-400">PERSON:</strong> <span className="text-white font-bold">Wife</span></p>
              <p><strong className="text-slate-400">INCIDENT:</strong> <span className="text-slate-200">Fall from stairs</span></p>
              <p><strong className="text-slate-400">HEAD IMPACT:</strong> <span className="text-amber-300 font-bold">Yes</span></p>
              <p><strong className="text-slate-400">CONSCIOUSNESS:</strong> <span className="text-red-400 font-black">Lost / Unconscious</span></p>
              <p><strong className="text-slate-400">SYMPTOM:</strong> <span className="text-white">Difficulty breathing</span></p>
              <p><strong className="text-slate-400">ALLERGY:</strong> <span className="text-amber-300 font-bold">Penicillin</span></p>
              <p><strong className="text-slate-400">REQUEST:</strong> <span className="text-blue-300 font-bold">Immediate medical assistance</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONFIDENCE-AWARE AI (CORE PHILOSOPHY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="prototype">Core AI Ethics</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            "Know when you don't know."
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            KYNTRA never pretends that AI is infallible. Our multi-factor confidence engine prevents dangerous misinterpretations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* High */}
          <div className="bg-[#0B1120] border-2 border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-lg">
            <ConfidenceIndicator tier="high" score={94} size="md" />
            <h4 className="text-base font-bold text-white">High Confidence (&gt;85%)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Spatial tracking and lexical grammar match with high certainty. AI displays interpretation and requests 1-tap user confirmation.
            </p>
            <div className="text-[11px] text-emerald-400 font-mono font-bold">
              &rarr; Action: Show & Confirm
            </div>
          </div>

          {/* Medium */}
          <div className="bg-[#0B1120] border-2 border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-lg">
            <ConfidenceIndicator tier="medium" score={74} size="md" />
            <h4 className="text-base font-bold text-white">Medium Confidence (50-85%)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Possible ambiguity detected (e.g. chest pressure vs muscle spasm). AI prompts user with clear YES / NO / EDIT choices.
            </p>
            <div className="text-[11px] text-amber-400 font-mono font-bold">
              &rarr; Action: Disambiguate with User
            </div>
          </div>

          {/* Low */}
          <div className="bg-[#0B1120] border-2 border-red-500/30 rounded-3xl p-6 space-y-4 shadow-lg">
            <ConfidenceIndicator tier="low" score={38} size="md" />
            <h4 className="text-base font-bold text-white">Low Confidence (&lt;50%)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Visual occlusion or lighting is poor. "I'm not confident enough to interpret this safely." System halts inference and offers instant typing or human relay.
            </p>
            <div className="text-[11px] text-red-400 font-mono font-bold">
              &rarr; Action: Type Message or Escalate
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE ARCHITECTURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveArchitecture />
      </section>

      {/* 6. AI + HUMAN INTERPRETER SYNERGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-[#0B132B] to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <Badge variant="info">Human + AI Collaboration</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              "KYNTRA is not designed to replace interpreters."
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Certified human ISL interpreters are indispensable. KYNTRA handles routine, supported emergency communication when an interpreter is unavailable, and instantly escalates complex or low-confidence interactions to a human with a pre-compiled context summary.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => onSelectTab('emergency')}
                icon={<HeartHandshake className="w-4 h-4 text-blue-400" />}
              >
                Try Interpreter Escalation Demo
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Escalation Handshake Protocol</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              When escalated, the human interpreter immediately sees verified patient cards, triage notes, and past dialogue history, cutting onboarding time from minutes to zero.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PRIVACY FIRST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-3">
          <Badge variant="success">Privacy-First Architecture</Badge>
          <h2 className="text-3xl font-extrabold text-white">
            Your emergency data belongs to you.
          </h2>
          <p className="text-sm text-slate-300">
            Engineered with strict data minimization principles for medical privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">No Video Recording</h4>
            <p className="text-xs text-slate-400">Webcam streams are processed locally in volatile memory and never stored on cloud servers.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <h4 className="text-sm font-bold text-white">Mandatory Confirmation</h4>
            <p className="text-xs text-slate-400">Critical medical details are only shared after the user explicitly verifies them.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <h4 className="text-sm font-bold text-white">Instant Clear Session</h4>
            <p className="text-xs text-slate-400">1-click complete data wipe purges all temporary context and transcription history.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <UserCheck className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-bold text-white">Zero Account Friction</h4>
            <p className="text-xs text-slate-400">No login or password barrier during emergency communication moments.</p>
          </div>
        </div>
      </section>

      {/* 8. INSTITUTIONAL EXPANSION & USE CASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-3">
          <Badge variant="prototype">Institutional Expansion</Badge>
          <h2 className="text-3xl font-extrabold text-white">
            Designed for High-Stakes Public Communication
          </h2>
          <p className="text-sm text-slate-300">
            Initial focus: Emergency & Healthcare. Future rollout across civic and corporate infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { title: 'Hospitals & ERs', tag: 'Initial Launch', active: true },
            { title: 'Police Stations', tag: 'Phase 6', active: false },
            { title: 'Railway & Airports', tag: 'Phase 7', active: false },
            { title: 'Government Offices', tag: 'Phase 7', active: false },
            { title: 'Colleges & Workplaces', tag: 'Phase 8', active: false },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-left space-y-2 ${
                item.active ? 'bg-blue-950/40 border-blue-500/50 shadow-lg' : 'bg-slate-900/40 border-slate-800'
              }`}
            >
              <Building2 className={`w-5 h-5 ${item.active ? 'text-blue-400' : 'text-slate-500'}`} />
              <p className="text-xs font-bold text-white">{item.title}</p>
              <span className={`text-[10px] font-semibold block ${item.active ? 'text-emerald-400' : 'text-slate-500'}`}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-10">
        <div className="bg-gradient-to-b from-[#0F172A] to-[#070C18] border-2 border-blue-500/40 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Make yourself understood.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience how KYNTRA bridges ISL and spoken language during medical emergencies with confidence-aware understanding and human escalation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="danger"
              size="lg"
              onClick={onStartEmergency}
              icon={<ShieldAlert className="w-5 h-5" />}
              className="w-full sm:w-auto font-bold"
            >
              LAUNCH EMERGENCY MODE
            </Button>
            <Button
              variant="warning"
              size="lg"
              onClick={onStartPitchDemo}
              icon={<Presentation className="w-5 h-5 text-slate-950" />}
              className="w-full sm:w-auto font-bold"
            >
              VIEW 2-MIN PITCH DEMO
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSelectTab('dashboard')}
              icon={<Building2 className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              ACCESS DASHBOARD
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
