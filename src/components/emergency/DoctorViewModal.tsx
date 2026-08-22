import React, { useState } from 'react';
import { Volume2, VolumeX, X, ShieldAlert, CheckCircle2, HeartPulse, Pill, Clock } from 'lucide-react';
import { EmergencyContext } from '../../types/context';
import { Button } from '../ui/Button';
import { SpeechService } from '../../services/SpeechService';

interface DoctorViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: EmergencyContext;
}

export const DoctorViewModal: React.FC<DoctorViewModalProps> = ({
  isOpen,
  onClose,
  context,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      SpeechService.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      SpeechService.speakEmergencySummary(context, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col p-4 sm:p-8 overflow-y-auto text-yellow-300 select-none">
      {/* High Contrast Doctor Header */}
      <div className="flex items-center justify-between pb-4 border-b-4 border-yellow-400">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-extrabold text-2xl">
            +
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              TRIAGE / CLINICAL FLASHCARD
            </h1>
            <p className="text-sm font-bold text-yellow-400 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              TRANSCRIBED FROM ISL BY KYNTRA • USER CONFIRMED ({context.timestamp})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={isPlayingAudio ? 'danger' : 'warning'}
            size="lg"
            onClick={handlePlayAudio}
            icon={isPlayingAudio ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          >
            {isPlayingAudio ? 'STOP VOICE' : 'PLAY VOICE'}
          </Button>

          <button
            onClick={onClose}
            className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl border-2 border-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Giant high-visibility clinical grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Person & Incident */}
        <div className="bg-[#10141E] border-2 border-yellow-400/80 rounded-2xl p-6 space-y-2">
          <span className="text-xs font-black tracking-wider uppercase text-yellow-400">PATIENT IDENTITY</span>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">{context.person}</p>
          <p className="text-lg font-bold text-slate-300 mt-2">
            Incident: <span className="text-yellow-300">{context.incident || 'None reported'}</span>
          </p>
        </div>

        {/* Consciousness Status */}
        <div className="bg-[#10141E] border-2 border-yellow-400/80 rounded-2xl p-6 space-y-2">
          <span className="text-xs font-black tracking-wider uppercase text-yellow-400 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4" /> CONSCIOUSNESS
          </span>
          <p
            className={`text-3xl sm:text-4xl font-black ${
              context.consciousness === 'Unconscious' ? 'text-red-400 animate-pulse' : 'text-emerald-400'
            }`}
          >
            {context.consciousness.toUpperCase()}
          </p>
          <p className="text-xs text-slate-400">Reported at {context.timestamp}</p>
        </div>

        {/* Immediate Request */}
        <div className="bg-[#10141E] border-2 border-yellow-400/80 rounded-2xl p-6 space-y-2">
          <span className="text-xs font-black tracking-wider uppercase text-yellow-400">PATIENT REQUEST</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{context.immediateRequest}</p>
        </div>
      </div>

      {/* Critical Medical Flags */}
      <div className="space-y-4 flex-1">
        {context.injuries.length > 0 && (
          <div className="bg-red-950/60 border-3 border-red-500 rounded-2xl p-5 text-white flex items-start gap-4">
            <ShieldAlert className="w-8 h-8 text-red-400 shrink-0 mt-1" />
            <div>
              <span className="text-xs font-black uppercase text-red-400 tracking-wider">REPORTED INJURIES:</span>
              <p className="text-2xl font-black text-red-200 mt-0.5">{context.injuries.join(' • ')}</p>
            </div>
          </div>
        )}

        {context.symptoms.length > 0 && (
          <div className="bg-slate-900 border-2 border-yellow-400 rounded-2xl p-5 text-white">
            <span className="text-xs font-black uppercase text-yellow-400 tracking-wider">CURRENT SYMPTOMS:</span>
            <p className="text-2xl font-bold text-yellow-200 mt-1">{context.symptoms.join(' • ')}</p>
          </div>
        )}

        {context.allergies.length > 0 && (
          <div className="bg-amber-950/60 border-3 border-amber-400 rounded-2xl p-5 text-white flex items-start gap-4">
            <Pill className="w-8 h-8 text-amber-400 shrink-0 mt-1" />
            <div>
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">KNOWN ALLERGIES:</span>
              <p className="text-3xl font-black text-amber-200 mt-0.5">{context.allergies.join(' • ')}</p>
            </div>
          </div>
        )}

        {context.knownConditions.length > 0 && (
          <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 text-white">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">KNOWN MEDICAL CONDITIONS:</span>
            <p className="text-xl font-bold text-slate-200 mt-1">{context.knownConditions.join(' • ')}</p>
          </div>
        )}
      </div>

      {/* Clinical Disclaimer Footer */}
      <div className="pt-6 mt-6 border-t-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p className="flex items-center gap-2 text-emerald-400 font-bold">
          <CheckCircle2 className="w-4 h-4" />
          Information verified with Deaf ISL user via interactive visual confirmation.
        </p>
        <Button variant="outline" size="md" onClick={onClose}>
          Exit Fullscreen Flashcard
        </Button>
      </div>
    </div>
  );
};
