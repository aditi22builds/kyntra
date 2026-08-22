import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, Volume2, Sparkles, MessageSquare, CheckCircle2, RefreshCw } from 'lucide-react';
import { EmergencyContext } from '../../types/context';
import { Button } from '../ui/Button';
import { SpeechService } from '../../services/SpeechService';

interface HearingPersonModeProps {
  context: EmergencyContext;
  onUpdateContext: (updated: Partial<EmergencyContext>) => void;
  onSendISLMessage: (msg: string) => void;
}

export const HearingPersonMode: React.FC<HearingPersonModeProps> = ({
  context,
  onUpdateContext,
  onSendISLMessage,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [typedQuestion, setTypedQuestion] = useState('');
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);
  const [doctorLog, setDoctorLog] = useState<{ sender: string; text: string; time: string }[]>([
    {
      sender: 'Doctor / Hearing Person',
      text: 'Hello. I am Dr. Anand. What happened and where is the pain?',
      time: '10:41 AM',
    },
  ]);

  const toggleMic = () => {
    if (isListening) {
      if (stopListeningFn) stopListeningFn();
      setIsListening(false);
    } else {
      setIsListening(true);
      const stop = SpeechService.startListening(
        (transcript, isFinal) => {
          setSpokenText(transcript);
          if (isFinal) {
            handleSendDoctorMessage(transcript);
            setIsListening(false);
          }
        },
        (error) => {
          console.warn('Speech recognition:', error);
          setIsListening(false);
        }
      );
      setStopListeningFn(() => stop);
    }
  };

  const handleSendDoctorMessage = (textToSend?: string) => {
    const content = textToSend || typedQuestion || spokenText;
    if (!content.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDoctorLog((prev) => [...prev, { sender: 'Doctor / Hearing Staff', text: content.trim(), time }]);

    // Detect if doctor is asking about allergies or conditions to update context intelligently
    const lower = content.toLowerCase();
    if (lower.includes('allerg')) {
      // Prompt will appear for ISL user
    }

    setSpokenText('');
    setTypedQuestion('');
  };

  const handleQuickQuestion = (q: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDoctorLog((prev) => [...prev, { sender: 'Doctor / Hearing Staff', text: q, time }]);
    SpeechService.speak(q);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 via-[#0B132B] to-slate-900 border border-blue-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-extrabold uppercase tracking-wider border border-blue-500/30">
                Two-Way Bridge
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Hearing Staff ↔ Deaf ISL User Communication
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Live speech-to-text for the hearing doctor + structured sign interpretation for the ISL user.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => SpeechService.speakEmergencySummary(context)}
              icon={<Volume2 className="w-4 h-4 text-blue-400" />}
            >
              Hear Patient Summary
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Hearing Person Input (Speak / Type) */}
        <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mic className="w-4 h-4 text-blue-400" />
              1. Hearing Doctor Voice / Text Input
            </h3>
            <span className="text-xs text-slate-400">Doctor &rarr; ISL User</span>
          </div>

          {/* Voice Input Button (Giant Mic Button) */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-900/80 border-2 border-dashed border-slate-700/80 rounded-2xl space-y-3 text-center">
            <button
              onClick={toggleMic}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse shadow-red-900/50 scale-105 ring-4 ring-red-500/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30'
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
            <p className="text-xs font-bold text-slate-200">
              {isListening ? 'LISTENING... SPEAK CLEARLY' : 'TAP TO SPEAK (DOCTOR)'}
            </p>
            <p className="text-[11px] text-slate-400 max-w-xs">
              Converts spoken words to high-visibility readable captions instantly.
            </p>
          </div>

          {/* Spoken Text Live Preview */}
          {spokenText && (
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/40 space-y-2">
              <span className="text-[10px] font-bold text-blue-300 uppercase">Live Transcribing:</span>
              <p className="text-base font-bold text-white">"{spokenText}"</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSendDoctorMessage(spokenText)}
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Send Caption to ISL User
              </Button>
            </div>
          )}

          {/* Quick Doctor Preset Questions */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Quick Doctor Triage Prompts:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'Does she have any known allergies?',
                'Is she taking any regular medicines?',
                'Did she lose consciousness after falling?',
                'Where is the exact location of the pain?',
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-900/40 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all text-left"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>

          {/* Manual Type Box */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              placeholder="Or type a question for the ISL user..."
              value={typedQuestion}
              onChange={(e) => setTypedQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendDoctorMessage()}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <Button
              variant="primary"
              size="md"
              onClick={() => handleSendDoctorMessage()}
              icon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </div>
        </div>

        {/* Right Col: High-Visibility Captions Display for Deaf User */}
        <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                2. Live Captions for ISL User
              </h3>
              <span className="text-xs text-emerald-400 font-bold">High Contrast</span>
            </div>

            {/* Giant Live Caption Box (Last Question Asked) */}
            <div className="p-6 rounded-2xl bg-black border-2 border-yellow-400/80 space-y-2">
              <span className="text-xs font-black uppercase text-yellow-400 tracking-wider">
                LATEST DOCTOR QUESTION:
              </span>
              <p className="text-2xl sm:text-3xl font-black text-white leading-tight">
                "{doctorLog[doctorLog.length - 1]?.text || 'Waiting for doctor...'}"
              </p>
            </div>

            {/* Conversation Transcript Feed */}
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Full Dialogue History:
              </span>
              {doctorLog.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                    <span className="font-bold text-blue-400">{item.sender}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="text-slate-100 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Future ISL Avatar Generation Vision Box */}
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 text-indigo-200 text-xs space-y-1.5 mt-4">
            <div className="flex items-center justify-between font-bold text-indigo-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Future Roadmap Feature
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300 border border-indigo-500/30">
                Phase 3 Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              <strong>ISL Visual Response Generation:</strong> Future iterations will generate an expressive 3D sign language avatar in real time so the Deaf user can view replies directly in ISL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
