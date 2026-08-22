import React, { useState, useEffect } from 'react';
import {
  Video,
  Mic,
  MicOff,
  PhoneOff,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { EmergencyContext } from '../../types/context';
import { InterpreterProfile, InterpreterEscalationState } from '../../types/interpreter';
import { InterpreterService } from '../../services/InterpreterService';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface InterpreterEscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: EmergencyContext;
}

export const InterpreterEscalationModal: React.FC<InterpreterEscalationModalProps> = ({
  isOpen,
  onClose,
  context,
}) => {
  const [escalationState, setEscalationState] = useState<InterpreterEscalationState>({
    status: 'idle',
  });
  const [micMuted, setMicMuted] = useState(false);
  const [cameraMuted, setCameraMuted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger live simulated escalation sequence
      InterpreterService.requestEscalation(context, (state) => {
        setEscalationState(state);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#070C18] border-2 border-blue-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100">
        {/* Header with Certified Relay Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-400">
                AI &rarr; HUMAN ESCALATION
              </span>
              <Badge variant="prototype" size="sm">
                Demo Interpreter Connection
              </Badge>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Live Certified ISL Video Relay
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              "Know when you don't know." When AI confidence is uncertain, KYNTRA seamlessly connects to a human interpreter.
            </p>
          </div>

          <div>
            {escalationState.status === 'connected' ? (
              <Badge variant="success" size="md" icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}>
                ● RELAY CONNECTED
              </Badge>
            ) : (
              <Badge variant="warning" size="md" icon={<Clock className="w-4 h-4 animate-spin text-amber-400" />}>
                {escalationState.status.toUpperCase()}...
              </Badge>
            )}
          </div>
        </div>

        {/* Video Relay Viewport & Context Card Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: Video Feeds */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video bg-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center">
              {escalationState.status === 'connected' && escalationState.assignedInterpreter ? (
                <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-slate-900 to-black">
                  {/* Simulated High-Res Video Feed Placeholder with Realistic Interpreter Portrait */}
                  <img
                    src={escalationState.assignedInterpreter.avatarUrl}
                    alt={escalationState.assignedInterpreter.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

                  {/* Upper Interpreter Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="bg-black/80 backdrop-blur border border-emerald-500/40 rounded-xl px-3 py-1.5 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <div>
                        <p className="text-xs font-bold text-white">{escalationState.assignedInterpreter.name}</p>
                        <p className="text-[10px] text-emerald-300">
                          {escalationState.assignedInterpreter.certification}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                      60 FPS HD
                    </span>
                  </div>

                  {/* Picture-in-Picture Patient Cam */}
                  <div className="relative z-10 self-end w-28 h-20 rounded-xl bg-slate-900/90 border border-blue-400 overflow-hidden flex items-center justify-center text-[10px] text-blue-300 font-bold shadow-lg">
                    <span>You (Patient)</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-blue-900/30 border border-blue-500/40 flex items-center justify-center animate-spin text-blue-400">
                    <Clock className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {escalationState.status === 'searching'
                      ? 'Matching with Available ISL Interpreter...'
                      : 'Establishing Secure Video Stream...'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Estimated wait time: ~{escalationState.estimatedWaitSec || 5} seconds. AI context is pre-loading.
                  </p>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="flex items-center justify-center gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
              <button
                onClick={() => setMicMuted(!micMuted)}
                className={`p-3 rounded-xl border transition-colors ${
                  micMuted ? 'bg-red-600/20 text-red-300 border-red-500/40' : 'bg-slate-800 text-white border-slate-700'
                }`}
                title="Toggle Mic"
              >
                {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setCameraMuted(!cameraMuted)}
                className={`p-3 rounded-xl border transition-colors ${
                  cameraMuted ? 'bg-red-600/20 text-red-300 border-red-500/40' : 'bg-slate-800 text-white border-slate-700'
                }`}
                title="Toggle Video"
              >
                <Video className="w-5 h-5" />
              </button>

              <Button variant="danger" size="md" onClick={onClose} icon={<PhoneOff className="w-4 h-4" />}>
                End Call
              </Button>
            </div>
          </div>

          {/* Right 5 Cols: Pre-Compiled Shared Context Card */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <HeartHandshake className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Shared AI Pre-Handover Summary
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                The human interpreter receives this pre-structured information instantly so the patient does not need to start over:
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Patient:</span>
                  <span className="font-bold text-white">{context.person}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Incident:</span>
                  <span className="text-slate-200">{context.incident || 'Acute Medical Emergency'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Consciousness:</span>
                  <span className="font-bold text-red-400">{context.consciousness}</span>
                </div>
                {context.symptoms.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Symptoms:</span>
                    <span className="text-slate-200">{context.symptoms.join(', ')}</span>
                  </div>
                )}
                {context.allergies.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Allergies:</span>
                    <span className="font-bold text-amber-300">{context.allergies.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-900/40 text-[11px] text-blue-300 space-y-1">
              <span className="font-bold">Human + AI Hybrid Principle:</span>
              <p>
                KYNTRA is designed to augment and collaborate with human interpreters, never replace them in high-ambiguity or life-critical scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
