import { EmergencyContext } from '../types/context';
import { EmergencySession, InstitutionalMetrics } from '../types/session';

const SESSIONS_KEY = 'kyntra_demo_sessions_v1';

export class StorageService {
  public static getInitialSessions(): EmergencySession[] {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(SESSIONS_KEY) : null;
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        // fallback
      }
    }

    // Default rich demo dataset
    return [
      {
        sessionId: 'sess-1042',
        sessionNumber: 1042,
        status: 'confirmed',
        createdAt: '10:42 AM',
        updatedAt: '10:44 AM',
        currentContext: {
          id: 'CTX-1042',
          person: 'Wife',
          incident: 'Fall from stairs at home',
          injuries: ['Head impact with swelling'],
          consciousness: 'Unconscious',
          symptoms: ['Difficulty breathing'],
          duration: '15 mins ago',
          knownConditions: ['Diabetes Type 2'],
          allergies: ['Penicillin'],
          medications: ['Metformin'],
          immediateRequest: 'Immediate trauma triage',
          confirmedByUser: true,
          confidenceTier: 'high',
          confidenceScore: 94,
          criticalFlag: true,
          timestamp: '10:42 AM',
          updatedAt: '10:44 AM',
        },
        messages: [
          {
            id: 'msg-1',
            sender: 'isl_user',
            senderName: 'ISL Patient (Ravi K.)',
            channel: 'isl_gesture',
            content: 'My wife fell down the stairs and hit her head. She is unconscious.',
            confidence: 'high',
            confirmed: true,
            timestamp: '10:42 AM',
          },
          {
            id: 'msg-2',
            sender: 'hearing_person',
            senderName: 'Dr. Anand (Triage CMO)',
            channel: 'speech_to_text',
            content: 'Does she have any known drug allergies or medical conditions?',
            timestamp: '10:43 AM',
          },
          {
            id: 'msg-3',
            sender: 'isl_user',
            senderName: 'ISL Patient (Ravi K.)',
            channel: 'text_typed',
            content: 'She is allergic to Penicillin. She takes Metformin for Diabetes.',
            confidence: 'high',
            confirmed: true,
            timestamp: '10:44 AM',
          },
        ],
        confidenceHistory: [
          { timestamp: '10:42 AM', tier: 'high', score: 94 },
          { timestamp: '10:44 AM', tier: 'high', score: 96 },
        ],
        notes: 'Triaged to Red Trauma Bay 2. Penicillin allergy highlighted to pharmacology.',
      },
      {
        sessionId: 'sess-1041',
        sessionNumber: 1041,
        status: 'escalated_to_interpreter',
        createdAt: '10:37 AM',
        updatedAt: '10:39 AM',
        currentContext: {
          id: 'CTX-1041',
          person: 'Self',
          incident: 'Laceration / Deep cut',
          injuries: ['Arm bleeding'],
          consciousness: 'Conscious',
          symptoms: ['Severe localized pain'],
          knownConditions: [],
          allergies: [],
          medications: [],
          immediateRequest: 'Surgical wound inspection',
          confirmedByUser: false,
          confidenceTier: 'low',
          confidenceScore: 38,
          criticalFlag: true,
          timestamp: '10:37 AM',
          updatedAt: '10:39 AM',
        },
        messages: [
          {
            id: 'msg-1',
            sender: 'ai_system',
            senderName: 'KYNTRA Safety Guard',
            channel: 'relay_interpreter',
            content: 'Visual confidence was below safety threshold (38%). Escalated to certified human interpreter Priya Sharma.',
            confidence: 'low',
            confirmed: false,
            timestamp: '10:38 AM',
          },
        ],
        confidenceHistory: [{ timestamp: '10:37 AM', tier: 'low', score: 38 }],
        escalationId: 'INT-8842',
        notes: 'Interpreter Priya Sharma connected via relay. Clear patient handover established.',
      },
      {
        sessionId: 'sess-1040',
        sessionNumber: 1040,
        status: 'resolved',
        createdAt: '10:12 AM',
        updatedAt: '10:28 AM',
        currentContext: {
          id: 'CTX-1040',
          person: 'Child',
          incident: 'High fever and febrile seizure history',
          injuries: [],
          consciousness: 'Conscious',
          symptoms: ['Temperature 103 F', 'Shivering'],
          knownConditions: ['Febrile convulsions history'],
          allergies: [],
          medications: ['Paracetamol syrup'],
          immediateRequest: 'Pediatric urgent consult',
          confirmedByUser: true,
          confidenceTier: 'high',
          confidenceScore: 91,
          criticalFlag: false,
          timestamp: '10:12 AM',
          updatedAt: '10:15 AM',
        },
        messages: [],
        confidenceHistory: [{ timestamp: '10:12 AM', tier: 'high', score: 91 }],
        notes: 'Pediatrician administered antipyretic. Temperature stabilized to 99.2 F.',
      },
    ];
  }

  public static getMetrics(): InstitutionalMetrics {
    return {
      activeSessions: 3,
      emergencySessionsToday: 12,
      interpreterEscalations: 4,
      avgConfirmationTimeSec: 8.2,
      safetyScore: 99.4,
      highConfidenceRatio: 86.5,
    };
  }

  public static clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSIONS_KEY);
      sessionStorage.clear();
    }
  }
}
