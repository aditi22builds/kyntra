export type ISLIntent =
  | 'HELP'
  | 'EMERGENCY'
  | 'ACCIDENT'
  | 'FALL'
  | 'PAIN'
  | 'CHEST_PAIN'
  | 'BREATHING_PROBLEM'
  | 'BLEEDING'
  | 'UNCONSCIOUS'
  | 'HEAD_INJURY'
  | 'ALLERGY'
  | 'MEDICINE'
  | 'CALL_AMBULANCE'
  | 'CALL_POLICE'
  | 'YES'
  | 'NO'
  | 'CONFIRM'
  | 'WIFE'
  | 'HUSBAND'
  | 'CHILD'
  | 'SELF'
  | 'PENICILLIN'
  | 'DIABETES';

export interface ISLRecognitionResult {
  rawIntents: ISLIntent[];
  interpretationText: string;
  confidenceScore: number; // 0.0 to 1.0
  confidenceTier: 'high' | 'medium' | 'low';
  boundingBox?: { x: number; y: number; width: number; height: number };
  detectedGestures: {
    name: string;
    confidence: number;
    timestamp: number;
  }[];
  clarificationRequired?: {
    question: string;
    options: string[];
    fieldToUpdate: string;
  };
  uncertaintyReason?: string;
  timestamp: string;
}

export interface ISLGestureLandmark {
  id: number;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  visibility: number;
  label?: string;
}
