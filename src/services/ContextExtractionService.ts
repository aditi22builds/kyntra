import { EmergencyContext } from '../types/context';
import { ISLIntent } from '../types/isl';

export class ContextExtractionService {
  public static createEmptyContext(): EmergencyContext {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
      id: 'CTX-' + Math.floor(1000 + Math.random() * 9000),
      person: 'Self',
      incident: '',
      symptoms: [],
      injuries: [],
      consciousness: 'Conscious',
      duration: 'Just now',
      knownConditions: [],
      allergies: [],
      medications: [],
      immediateRequest: 'Medical assistance',
      confirmedByUser: false,
      confidenceTier: 'high',
      confidenceScore: 92,
      criticalFlag: false,
      timestamp: now,
      updatedAt: now,
    };
  }

  public static fromIntents(intents: ISLIntent[], rawConfidence: number = 90): EmergencyContext {
    const ctx = this.createEmptyContext();
    ctx.confidenceScore = rawConfidence;
    ctx.confidenceTier = rawConfidence >= 85 ? 'high' : rawConfidence >= 50 ? 'medium' : 'low';

    const intentSet = new Set(intents);

    // Person
    if (intentSet.has('WIFE')) ctx.person = 'Wife';
    else if (intentSet.has('HUSBAND')) ctx.person = 'Husband';
    else if (intentSet.has('CHILD')) ctx.person = 'Child';
    else if (intentSet.has('SELF')) ctx.person = 'Self';

    // Incident
    if (intentSet.has('FALL')) ctx.incident = 'Fall from standing/stairs';
    else if (intentSet.has('ACCIDENT')) ctx.incident = 'Road / traffic accident';
    else if (intentSet.has('EMERGENCY')) ctx.incident = 'Acute medical emergency';

    // Injuries
    if (intentSet.has('HEAD_INJURY')) {
      ctx.injuries.push('Head impact / Trauma');
      ctx.criticalFlag = true;
    }
    if (intentSet.has('BLEEDING')) {
      ctx.injuries.push('External bleeding');
      ctx.criticalFlag = true;
    }

    // Consciousness
    if (intentSet.has('UNCONSCIOUS')) {
      ctx.consciousness = 'Unconscious';
      ctx.criticalFlag = true;
    }

    // Symptoms (NO MEDICAL DIAGNOSIS - strictly reported symptoms)
    if (intentSet.has('BREATHING_PROBLEM')) {
      ctx.symptoms.push('Difficulty breathing / Respiratory distress');
      ctx.criticalFlag = true;
    }
    if (intentSet.has('CHEST_PAIN')) {
      ctx.symptoms.push('Chest pain / Pressure');
      ctx.criticalFlag = true;
    }
    if (intentSet.has('PAIN')) {
      ctx.symptoms.push('Severe acute pain');
    }

    // Allergies & Conditions
    if (intentSet.has('PENICILLIN') || intentSet.has('ALLERGY')) {
      ctx.allergies.push('Penicillin allergy reported');
    }
    if (intentSet.has('DIABETES')) {
      ctx.knownConditions.push('Diabetes');
    }
    if (intentSet.has('MEDICINE')) {
      ctx.medications.push('Currently on regular prescription medication');
    }

    // Immediate Request
    if (intentSet.has('CALL_AMBULANCE')) {
      ctx.immediateRequest = 'Emergency ambulance dispatch requested';
      ctx.criticalFlag = true;
    } else if (intentSet.has('CALL_POLICE')) {
      ctx.immediateRequest = 'Police assistance requested';
    } else {
      ctx.immediateRequest = 'Immediate clinical assessment by doctor';
    }

    return ctx;
  }

  public static isCritical(ctx: EmergencyContext): boolean {
    return (
      ctx.consciousness === 'Unconscious' ||
      ctx.symptoms.some((s) => s.toLowerCase().includes('chest') || s.toLowerCase().includes('breath')) ||
      ctx.injuries.some((i) => i.toLowerCase().includes('head') || i.toLowerCase().includes('bleed'))
    );
  }
}
