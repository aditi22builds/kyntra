import { EmergencyContext, CommunicationMessage } from './context';

export interface EmergencySession {
  sessionId: string;
  sessionNumber: number;
  status: 'active' | 'confirmed' | 'escalated_to_interpreter' | 'resolved' | 'cleared';
  createdAt: string;
  updatedAt: string;
  currentContext: EmergencyContext;
  messages: CommunicationMessage[];
  confidenceHistory: {
    timestamp: string;
    tier: 'high' | 'medium' | 'low';
    score: number;
  }[];
  escalationId?: string;
  notes?: string;
}

export interface InstitutionalMetrics {
  activeSessions: number;
  emergencySessionsToday: number;
  interpreterEscalations: number;
  avgConfirmationTimeSec: number;
  safetyScore: number; // 99.4%
  highConfidenceRatio: number; // 84%
}
