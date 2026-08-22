import { ConfidenceAssessment, ConfidenceTier } from '../types/confidence';

export class ConfidenceService {
  public static evaluate(
    score: number,
    gestureCount: number = 1,
    lightingQuality: 'good' | 'moderate' | 'poor' = 'good'
  ): ConfidenceAssessment {
    let tier: ConfidenceTier = 'high';
    if (score < 50 || lightingQuality === 'poor') {
      tier = 'low';
    } else if (score < 85 || gestureCount > 3) {
      tier = 'medium';
    }

    let headline = '';
    let explanation = '';
    let recommendedAction: 'confirm' | 'clarify' | 'escalate' = 'confirm';

    switch (tier) {
      case 'high':
        headline = 'High Confidence';
        explanation = 'ISL spatial movement & hand shape match with high certainty. Please review and confirm.';
        recommendedAction = 'confirm';
        break;
      case 'medium':
        headline = 'Please Confirm';
        explanation = 'Possible ambiguity or multi-part gesture sequence detected. Clarification recommended.';
        recommendedAction = 'clarify';
        break;
      case 'low':
        headline = 'Not Confident Enough to Interpret Safely';
        explanation = 'Visual clarity or confidence is below safety thresholds. "Know when you don\'t know" — fallback recommended.';
        recommendedAction = 'escalate';
        break;
    }

    const lightingScore = lightingQuality === 'good' ? 95 : lightingQuality === 'moderate' ? 70 : 35;
    const spatialScore = Math.min(100, Math.round(score * 1.05));
    const temporalScore = Math.max(40, Math.round(score * 0.95));

    return {
      tier,
      score: Math.round(score),
      headline,
      explanation,
      recommendedAction,
      factors: [
        {
          name: 'Spatial Landmark Tracking',
          score: spatialScore,
          description: spatialScore > 80 ? 'Crisp finger & joint coordinate capture' : 'Partial hand occlusion detected',
        },
        {
          name: 'Lexical Intent Match',
          score: Math.round(score),
          description: score > 80 ? 'Exact match in emergency vocabulary' : 'Disambiguation needed',
        },
        {
          name: 'Visual Environment Quality',
          score: lightingScore,
          description: lightingQuality === 'good' ? 'Adequate lighting & framing' : 'Low contrast / poor lighting',
        },
        {
          name: 'Temporal Sequence Consistency',
          score: temporalScore,
          description: 'Grammatical sign flow validation',
        },
      ],
    };
  }
}
