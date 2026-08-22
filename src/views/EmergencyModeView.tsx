import React, { useState } from 'react';
import {
  Camera,
  Keyboard,
  Mic,
  Headphones,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Send,
  HelpCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { EmergencyContext } from '../types/context';
import { ConfidenceTier } from '../types/confidence';
import { ISLRecognitionResult } from '../types/isl';
import { DemoScenarioInfo, DEMO_SCENARIOS } from '../services/DemoScenarios';
import { islRecognitionService } from '../services/ISLRecognitionService';
import { ContextExtractionService } from '../services/ContextExtractionService';
import { CameraFeed } from '../components/camera/CameraFeed';
import { EmergencyCard } from '../components/emergency/EmergencyCard';
import { QuickSymptomPad } from '../components/emergency/QuickSymptomPad';
import { ConfirmationModal } from '../components/emergency/ConfirmationModal';
import { DoctorViewModal } from '../components/emergency/DoctorViewModal';
import { InterpreterEscalationModal } from '../components/interpreter/InterpreterEscalationModal';
import { DemoPresetBar } from '../components/emergency/DemoPresetBar';
import { ConfidenceIndicator } from '../components/confidence/ConfidenceIndicator';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface EmergencyModeViewProps {
  context: EmergencyContext;
  onUpdateContext: (updated: Partial<EmergencyContext>) => void;
  onClearSession: () => void;
  onStartPitchDemo: () => void;
  onSwitchToHearingMode: () => void;
}

export const EmergencyModeView: React.FC<EmergencyModeViewProps> = ({
  context,
  onUpdateContext,
  onClearSession,
  onStartPitchDemo,
  onSwitchToHearingMode,
}) => {
  const [isSigningActive, setIsSigningActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTypeBox, setShowTypeBox] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [activeScenarioId, setActiveScenarioId] = useState<string | undefined>(undefined);

  // Modals state
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [interpreterModalOpen, setInterpreterModalOpen] = useState(false);

  // Current recognition active buffer
  const [lastRecognition, setLastRecognition] = useState<ISLRecognitionResult | null>(null);

  // Trigger Sign Recognition Loop
  const handleStartSigning = async (scenarioKey?: string) => {
    setIsSigningActive(true);
    setIsProcessing(true);

    try {
      const result = scenarioKey
        ? await islRecognitionService.recognizePresetScenario(scenarioKey)
        : await islRecognitionService.recognizeGesture();

      setLastRecognition(result);
      setIsSigningActive(false);
      setIsProcessing(false);

      // Open confirmation modal for verification
      setConfirmationOpen(true);
    } catch (err) {
      console.warn('Sign recognition error:', err);
      setIsSigningActive(false);
      setIsProcessing(false);
    }
  };

  // Trigger Scenario Preset
  const handleSelectScenario = (scenario: DemoScenarioInfo) => {
    setActiveScenarioId(scenario.id);
    onUpdateContext(scenario.context);
    handleStartSigning(scenario.id);
  };

  // User Confirmation Action
  const handleConfirmInterpretation = () => {
    if (lastRecognition) {
      const structured = ContextExtractionService.fromIntents(
        lastRecognition.rawIntents,
        Math.round(lastRecognition.confidenceScore * 100)
      );
      structured.confirmedByUser = true;
      onUpdateContext(structured);
    }
    setConfirmationOpen(false);
  };

  // Manual typed message submit
  const handleSendTypedMessage = () => {
    if (!typedMessage.trim()) return;

    onUpdateContext({
      symptoms: [...context.symptoms, typedMessage.trim()],
      confirmedByUser: true,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setTypedMessage('');
    setShowTypeBox(false);
  };

  // Quick symptom pad selection
  const handleQuickSymptom = (sym: string) => {
    if (sym.toLowerCase().includes('allerg')) {
      onUpdateContext({ allergies: [...context.allergies, sym] });
    } else {
      onUpdateContext({ symptoms: [...context.symptoms, sym] });
    }
  };

  const handleQuickIncident = (inc: string) => {
    onUpdateContext({ incident: inc });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 text-slate-100">
      {/* 1-Click Interactive Demo Preset Selector */}
      <DemoPresetBar
        activeScenarioId={activeScenarioId}
        onSelectScenario={handleSelectScenario}
        onStartPitchDemo={onStartPitchDemo}
      />

      {/* Emergency Header Bar */}
      <div className="bg-[#0B1120] border-2 border-red-500/40 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              EMERGENCY COMMUNICATION MODE
            </h1>
            <Badge variant="prototype" size="sm">Prototype Live Mode</Badge>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Usable under high stress. Position inside frame and communicate in ISL or use quick controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="warning"
            size="sm"
            onClick={onStartPitchDemo}
            className="font-bold text-xs"
          >
            ★ Run 2-Min Pitch Demo
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSession}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Critical Symptom Urgent Safety Alert (When chest pain, breathing, unconscious detected) */}
      {ContextExtractionService.isCritical(context) && (
        <div className="bg-red-950/40 border-2 border-red-500/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-red-200 animate-in fade-in">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <strong className="text-red-300 font-extrabold text-sm uppercase tracking-wider block">
              Urgent Medical Alert: Serious Symptoms Reported
            </strong>
            <p>
              User reports potential acute trauma, breathing difficulty, or unconsciousness. Serious symptoms may require immediate medical attention. Show this emergency card immediately to doctor or triage nurse.
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: Visual Signing Viewport & Structured Emergency Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Camera Feed & High-Stress Control Pad */}
        <div className="lg:col-span-7 space-y-5">
          {/* Live Camera Feed */}
          <CameraFeed isSigningActive={isSigningActive || isProcessing} detectedLandmarks={true} />

          {/* 4 Primary High-Stress Big Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleStartSigning('hospital_pitch_demo')}
              icon={<Camera className="w-5 h-5" />}
              className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm py-4 rounded-2xl"
              disabled={isProcessing}
            >
              {isProcessing ? 'Recognizing...' : 'START SIGNING'}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowTypeBox(!showTypeBox)}
              icon={<Keyboard className="w-5 h-5" />}
              className="font-bold text-xs sm:text-sm py-4 rounded-2xl"
            >
              TYPE MESSAGE
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onSwitchToHearingMode}
              icon={<Mic className="w-5 h-5 text-blue-400" />}
              className="font-bold text-xs sm:text-sm py-4 rounded-2xl"
            >
              SPEAK (DOCTOR)
            </Button>

            <Button
              variant="danger"
              size="lg"
              onClick={() => setInterpreterModalOpen(true)}
              icon={<Headphones className="w-5 h-5" />}
              className="font-black text-xs sm:text-sm py-4 rounded-2xl bg-rose-600 hover:bg-rose-500"
            >
              GET HUMAN HELP
            </Button>
          </div>

          {/* Optional Type Box */}
          {showTypeBox && (
            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-4 space-y-3 animate-in fade-in">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Type Emergency Message / Symptoms:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Broken right ankle, severe pain..."
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendTypedMessage()}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <Button variant="primary" size="md" onClick={handleSendTypedMessage} icon={<Send className="w-4 h-4" />}>
                  Add
                </Button>
              </div>
            </div>
          )}

          {/* Quick Symptom Pad */}
          <QuickSymptomPad
            onSelectSymptom={handleQuickSymptom}
            onSelectIncident={handleQuickIncident}
          />
        </div>

        {/* Right 5 Cols: Live Structured Emergency Communication Card */}
        <div className="lg:col-span-5 space-y-5">
          <EmergencyCard
            context={context}
            onShowToDoctor={() => setDoctorModalOpen(true)}
            onEdit={() => setShowTypeBox(true)}
            onClearSession={onClearSession}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {lastRecognition && (
        <ConfirmationModal
          isOpen={confirmationOpen}
          interpretationText={lastRecognition.interpretationText}
          confidenceTier={lastRecognition.confidenceTier}
          confidenceScore={Math.round(lastRecognition.confidenceScore * 100)}
          clarificationQuestion={lastRecognition.clarificationRequired?.question}
          clarificationOptions={lastRecognition.clarificationRequired?.options}
          onConfirm={handleConfirmInterpretation}
          onSelectOption={(opt) => {
            onUpdateContext({ symptoms: [...context.symptoms, opt] });
            handleConfirmInterpretation();
          }}
          onEdit={() => {
            setConfirmationOpen(false);
            setShowTypeBox(true);
          }}
          onTryAgain={() => {
            setConfirmationOpen(false);
            handleStartSigning();
          }}
          onEscalateToHuman={() => {
            setConfirmationOpen(false);
            setInterpreterModalOpen(true);
          }}
        />
      )}

      {/* Fullscreen Doctor Flashcard Modal */}
      <DoctorViewModal
        isOpen={doctorModalOpen}
        onClose={() => setDoctorModalOpen(false)}
        context={context}
      />

      {/* Human Interpreter Escalation Modal */}
      <InterpreterEscalationModal
        isOpen={interpreterModalOpen}
        onClose={() => setInterpreterModalOpen(false)}
        context={context}
      />
    </div>
  );
};
