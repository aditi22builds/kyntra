export type ConfidenceTier = 'high' | 'medium' | 'low';

export interface ConfidenceAssessment {
  tier: ConfidenceTier;
  score: number; // 0 to 100
  headline: string;
  explanation: string;
  recommendedAction: 'confirm' | 'clarify' | 'escalate';
  factors: {
    name: string;
    score: number; // 0 to 100
    description: string;
  }[];
}
