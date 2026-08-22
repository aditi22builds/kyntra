export interface EmergencyContext {
  id: string;
  person: string; // e.g. "Wife", "Self", "Father", "Child"
  incident: string; // e.g. "Fall from stairs", "Road accident", "Sudden collapse"
  symptoms: string[]; // e.g. ["Difficulty breathing", "Chest tightness"]
  injuries: string[]; // e.g. ["Head impact", "Bleeding right arm"]
  consciousness: 'Conscious' | 'Unconscious' | 'Drowsy' | 'Unspecified';
  duration?: string; // e.g. "10 minutes ago"
  knownConditions: string[]; // e.g. ["Diabetes Type 2", "Hypertension"]
  allergies: string[]; // e.g. ["Penicillin", "Sulfa drugs"]
  medications: string[]; // e.g. ["Metformin", "Aspirin"]
  immediateRequest: string; // e.g. "Immediate medical assistance", "Call ambulance"
  confirmedByUser: boolean;
  confidenceTier: 'high' | 'medium' | 'low';
  confidenceScore: number;
  criticalFlag: boolean;
  timestamp: string;
  updatedAt: string;
}

export interface CommunicationMessage {
  id: string;
  sender: 'isl_user' | 'hearing_person' | 'ai_system' | 'interpreter';
  senderName: string;
  channel: 'isl_gesture' | 'speech_to_text' | 'text_typed' | 'relay_interpreter';
  content: string;
  structuredContext?: Partial<EmergencyContext>;
  confidence?: 'high' | 'medium' | 'low';
  confirmed?: boolean;
  timestamp: string;
}
