import { ISLIntent, ISLRecognitionResult } from '../types/isl';

export interface IISLRecognitionService {
  isAvailable(): Promise<boolean>;
  recognizeGesture(frameData?: any): Promise<ISLRecognitionResult>;
  recognizePresetScenario(scenarioId: string): Promise<ISLRecognitionResult>;
}

export class MockISLRecognitionService implements IISLRecognitionService {
  public async isAvailable(): Promise<boolean> {
    return true;
  }

  public async recognizeGesture(): Promise<ISLRecognitionResult> {
    // Simulate real computer-vision frame processing delay (500ms)
    await new Promise((resolve) => setTimeout(resolve, 550));

    return {
      rawIntents: ['HELP', 'EMERGENCY'],
      interpretationText: 'User is signaling an urgent need for medical assistance.',
      confidenceScore: 0.94,
      confidenceTier: 'high',
      boundingBox: { x: 22, y: 18, width: 56, height: 64 },
      detectedGestures: [
        { name: 'HELP (Two-handed palm sweep)', confidence: 0.95, timestamp: Date.now() },
        { name: 'EMERGENCY (Rapid chest point)', confidence: 0.93, timestamp: Date.now() },
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  }

  public async recognizePresetScenario(scenarioId: string): Promise<ISLRecognitionResult> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    switch (scenarioId) {
      case 'fall_head_injury':
        return {
          rawIntents: ['WIFE', 'FALL', 'HEAD_INJURY', 'UNCONSCIOUS', 'BREATHING_PROBLEM'],
          interpretationText: 'My wife fell and hit her head. She is unconscious and having difficulty breathing.',
          confidenceScore: 0.93,
          confidenceTier: 'high',
          boundingBox: { x: 20, y: 15, width: 60, height: 70 },
          detectedGestures: [
            { name: 'WIFE (Female sign + relation)', confidence: 0.96, timestamp: Date.now() },
            { name: 'FALL (Downward hand drop)', confidence: 0.94, timestamp: Date.now() },
            { name: 'HEAD_INJURY (Temple touch + impact)', confidence: 0.91, timestamp: Date.now() },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };

      case 'breathing_problem':
        return {
          rawIntents: ['SELF', 'BREATHING_PROBLEM', 'EMERGENCY'],
          interpretationText: 'I am having severe difficulty breathing and chest tightness.',
          confidenceScore: 0.91,
          confidenceTier: 'high',
          boundingBox: { x: 25, y: 20, width: 50, height: 60 },
          detectedGestures: [
            { name: 'BREATHING_PROBLEM (Throat clutch + inhale motion)', confidence: 0.93, timestamp: Date.now() },
            { name: 'URGENT (Repeated wrist twist)', confidence: 0.89, timestamp: Date.now() },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };

      case 'chest_pain_medium_conf':
        return {
          rawIntents: ['CHEST_PAIN', 'PAIN'],
          interpretationText: 'User reports acute chest pain/pressure. Clarification recommended between muscle spasm and cardiac discomfort.',
          confidenceScore: 0.74,
          confidenceTier: 'medium',
          boundingBox: { x: 30, y: 25, width: 45, height: 55 },
          detectedGestures: [
            { name: 'CHEST_PRESSURE (Fist over sternum)', confidence: 0.76, timestamp: Date.now() },
            { name: 'PAIN (Facial grimace + hand flick)', confidence: 0.72, timestamp: Date.now() },
          ],
          clarificationRequired: {
            question: 'Is the pain sharp with movement, or continuous heavy pressure?',
            options: ['Heavy continuous pressure', 'Sharp localized pain with movement', 'Muscle tightness'],
            fieldToUpdate: 'symptoms',
          },
          uncertaintyReason: 'Hand position near sternum overlap with both thoracic pain and muscular strain signs.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };

      case 'bleeding_low_conf':
        return {
          rawIntents: ['BLEEDING'],
          interpretationText: 'Signs detected but visual occlusion is too high to interpret safely.',
          confidenceScore: 0.38,
          confidenceTier: 'low',
          boundingBox: { x: 15, y: 40, width: 70, height: 45 },
          detectedGestures: [
            { name: 'PARTIAL_SIGN (Arm motion blurred)', confidence: 0.41, timestamp: Date.now() },
          ],
          uncertaintyReason: 'Partial hand occlusion and rapid erratic movement below safety thresholds. "Know when you don\'t know."',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };

      case 'call_ambulance':
        return {
          rawIntents: ['ACCIDENT', 'CALL_AMBULANCE', 'HELP'],
          interpretationText: 'Road accident occurred. Please call an ambulance immediately.',
          confidenceScore: 0.95,
          confidenceTier: 'high',
          boundingBox: { x: 20, y: 15, width: 60, height: 65 },
          detectedGestures: [
            { name: 'ACCIDENT (Vehicle collision clash)', confidence: 0.96, timestamp: Date.now() },
            { name: 'AMBULANCE (Flashing beacon sign + vehicle)', confidence: 0.94, timestamp: Date.now() },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };

      default:
        return {
          rawIntents: ['HELP'],
          interpretationText: 'User requires immediate assistance.',
          confidenceScore: 0.88,
          confidenceTier: 'high',
          detectedGestures: [{ name: 'HELP', confidence: 0.88, timestamp: Date.now() }],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };
    }
  }
}

export const islRecognitionService = new MockISLRecognitionService();
