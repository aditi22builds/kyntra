export interface InterpreterProfile {
  id: string;
  name: string;
  certification: string; // e.g. "Certified ISL Interpreter (ISLRTC #842)"
  languages: string[]; // ["ISL", "English", "Hindi"]
  avatarUrl: string;
  rating: number;
  status: 'available' | 'in_call' | 'offline';
  avgResponseSec: number;
}

export interface InterpreterEscalationState {
  status: 'idle' | 'searching' | 'connecting' | 'connected' | 'ended';
  assignedInterpreter?: InterpreterProfile;
  queuePosition?: number;
  estimatedWaitSec?: number;
  sharedContextId?: string;
  connectedAt?: string;
}
