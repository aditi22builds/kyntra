import React, { useState } from 'react';
import {
  FileText,
  Volume2,
  VolumeX,
  Maximize2,
  Edit3,
  Share2,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  HeartPulse,
  User,
  Activity,
  AlertTriangle,
  Pill,
} from 'lucide-react';
import { EmergencyContext } from '../../types/context';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SpeechService } from '../../services/SpeechService';

interface EmergencyCardProps {
  context: EmergencyContext;
  onShowToDoctor: () => void;
  onEdit: () => void;
  onClearSession: () => void;
  onShare?: () => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({
  context,
  onShowToDoctor,
  onEdit,
  onClearSession,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    const text = `KYNTRA EMERGENCY CARD
Person: ${context.person}
Incident: ${context.incident || 'N/A'}
Consciousness: ${context.consciousness}
Injuries: ${context.injuries.join(', ') || 'None reported'}
Symptoms: ${context.symptoms.join(', ') || 'None reported'}
Allergies: ${context.allergies.join(', ') || 'None known'}
Conditions: ${context.knownConditions.join(', ') || 'None reported'}
Request: ${context.immediateRequest}
Status: ${context.confirmedByUser ? 'Confirmed by User' : 'Unconfirmed'}
Timestamp: ${context.timestamp}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0B132B] border-2 border-blue-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 text-slate-100 relative overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-emerald-400 to-indigo-500" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white uppercase">
                Emergency Communication Card
              </h3>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Generated {context.timestamp} • Last updated {context.updatedAt}
            </p>
          </div>
        </div>

        {/* Confirmation Status Badge */}
        <div>
          {context.confirmedByUser ? (
            <Badge variant="success" size="md" icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}>
              ✓ USER CONFIRMED
            </Badge>
          ) : (
            <Badge variant="warning" size="md" icon={<AlertCircle className="w-4 h-4 text-amber-400" />}>
              PENDING USER CONFIRMATION
            </Badge>
          )}
        </div>
      </div>

      {/* Critical Patient Triage Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Person */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-blue-400" />
            Person
          </span>
          <p className="text-base font-bold text-white">{context.person || 'Self'}</p>
        </div>

        {/* Incident */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            Incident
          </span>
          <p className="text-sm font-semibold text-slate-200">{context.incident || 'Not specified'}</p>
        </div>

        {/* Consciousness */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <HeartPulse className="w-3.5 h-3.5 text-red-400" />
            Consciousness
          </span>
          <p className={`text-base font-extrabold ${
            context.consciousness === 'Unconscious' ? 'text-red-400' : 'text-emerald-400'
          }`}>
            {context.consciousness}
          </p>
        </div>
      </div>

      {/* Structured Details List */}
      <div className="space-y-2.5">
        {/* Injuries */}
        {context.injuries && context.injuries.length > 0 && (
          <div className="bg-red-950/20 border border-red-900/40 rounded-xl p-3 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-red-300 font-bold uppercase tracking-wider mr-2">Injuries Reported:</strong>
              <span className="text-red-200 font-medium">{context.injuries.join(', ')}</span>
            </div>
          </div>
        )}

        {/* Symptoms */}
        {context.symptoms && context.symptoms.length > 0 && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-start gap-3">
            <Activity className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-slate-400 font-bold uppercase tracking-wider mr-2">Current Symptoms:</strong>
              <span className="text-slate-200 font-semibold">{context.symptoms.join(', ')}</span>
            </div>
          </div>
        )}

        {/* Allergies */}
        {context.allergies && context.allergies.length > 0 && (
          <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-amber-300 font-bold uppercase tracking-wider mr-2">Known Allergies:</strong>
              <span className="text-amber-200 font-extrabold">{context.allergies.join(', ')}</span>
            </div>
          </div>
        )}

        {/* Known Conditions & Medications */}
        {(context.knownConditions.length > 0 || context.medications.length > 0) && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-start gap-3">
            <Pill className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              {context.knownConditions.length > 0 && (
                <div>
                  <strong className="text-slate-400 font-bold uppercase tracking-wider mr-2">Known Conditions:</strong>
                  <span className="text-slate-200">{context.knownConditions.join(', ')}</span>
                </div>
              )}
              {context.medications.length > 0 && (
                <div>
                  <strong className="text-slate-400 font-bold uppercase tracking-wider mr-2">Medications:</strong>
                  <span className="text-slate-200">{context.medications.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Immediate Request */}
        {context.immediateRequest && (
          <div className="bg-blue-950/30 border border-blue-800/50 rounded-xl p-3 flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
            <div className="text-xs">
              <strong className="text-blue-300 font-bold uppercase tracking-wider mr-2">Immediate Request:</strong>
              <span className="text-blue-100 font-bold text-sm">{context.immediateRequest}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={onShowToDoctor}
            icon={<Maximize2 className="w-4 h-4" />}
            className="font-bold bg-blue-600 hover:bg-blue-500 text-white"
          >
            SHOW TO DOCTOR
          </Button>

          <Button
            variant={isPlayingAudio ? 'danger' : 'secondary'}
            size="md"
            onClick={handlePlayAudio}
            icon={isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          >
            {isPlayingAudio ? 'Stop Audio' : 'PLAY ALOUD'}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onEdit} icon={<Edit3 className="w-3.5 h-3.5" />}>
            Edit
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            icon={<Share2 className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied!' : 'Share / Copy'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSession}
            icon={<RotateCcw className="w-3.5 h-3.5 text-slate-400" />}
            title="Privacy First: Reset current session"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Mandatory Safety Notice */}
      <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 flex items-center gap-1.5">
        <AlertCircle className="w-3 h-3 text-slate-500 shrink-0" />
        <span>KYNTRA communicates user-reported information. It does not diagnose medical conditions.</span>
      </div>
    </div>
  );
};
