import React from 'react';
import { X, CheckCircle2, UserCheck, ShieldAlert, Clock, FileText, Headphones, Check } from 'lucide-react';
import { EmergencySession } from '../../types/session';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ConfidenceIndicator } from '../confidence/ConfidenceIndicator';

interface SessionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: EmergencySession | null;
  onEscalate: () => void;
  onResolve: () => void;
}

export const SessionDetailModal: React.FC<SessionDetailModalProps> = ({
  isOpen,
  onClose,
  session,
  onEscalate,
  onResolve,
}) => {
  if (!isOpen || !session) return null;

  const ctx = session.currentContext;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#0B1120] border-2 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">KYNTRA Session Audit: #{session.sessionNumber}</h3>
              <Badge variant="prototype" size="sm">Verified Log</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Initiated at {session.createdAt} • Last updated {session.updatedAt}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Structured Context Summary */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              Verified Clinical Communication Payload
            </h4>
            <ConfidenceIndicator tier={ctx.confidenceTier} score={ctx.confidenceScore} size="sm" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-semibold">Patient:</span>
              <p className="text-sm font-bold text-white">{ctx.person}</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-semibold">Incident:</span>
              <p className="text-sm font-bold text-slate-200">{ctx.incident || 'None'}</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-semibold">Consciousness:</span>
              <p className="text-sm font-bold text-emerald-400">{ctx.consciousness}</p>
            </div>
          </div>

          {ctx.allergies.length > 0 && (
            <div className="p-3 bg-amber-950/30 border border-amber-900/40 rounded-xl text-xs text-amber-200">
              <strong>Allergies:</strong> {ctx.allergies.join(', ')}
            </div>
          )}
        </div>

        {/* Communication Transcript Stream */}
        {session.messages && session.messages.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Dialogue Audit Trail:
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {session.messages.map((m) => (
                <div key={m.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-blue-400">{m.senderName}</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <p className="text-slate-200">{m.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clinical Staff Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <Button
            variant="warning"
            size="md"
            onClick={onEscalate}
            icon={<Headphones className="w-4 h-4" />}
          >
            Escalate to Human Relay
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={onResolve}
              icon={<Check className="w-4 h-4" />}
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              Mark Resolved
            </Button>
            <Button variant="outline" size="md" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
