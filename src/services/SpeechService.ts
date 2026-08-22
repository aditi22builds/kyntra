import { EmergencyContext } from '../types/context';

export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static recognition: any = null;

  public static speak(text: string, onEnd?: () => void): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser environment.');
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // cancel any previous utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN'; // Indian English accent default

      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Failed to speak text:', err);
      if (onEnd) onEnd();
    }
  }

  public static speakEmergencySummary(ctx: EmergencyContext, onEnd?: () => void): void {
    const parts: string[] = [];
    parts.push(`Emergency communication card for ${ctx.person}.`);
    if (ctx.incident) parts.push(`Incident: ${ctx.incident}.`);
    if (ctx.injuries.length) parts.push(`Injuries reported: ${ctx.injuries.join(', ')}.`);
    parts.push(`Consciousness status: ${ctx.consciousness}.`);
    if (ctx.symptoms.length) parts.push(`Reported symptoms: ${ctx.symptoms.join(', ')}.`);
    if (ctx.allergies.length) parts.push(`Allergies: ${ctx.allergies.join(', ')}.`);
    if (ctx.knownConditions.length) parts.push(`Known medical conditions: ${ctx.knownConditions.join(', ')}.`);
    if (ctx.immediateRequest) parts.push(`Patient request: ${ctx.immediateRequest}.`);
    parts.push('This is user-reported information transcribed by Kyntra.');

    this.speak(parts.join(' '), onEnd);
  }

  public static stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public static isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public static startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: string) => void
  ): () => void {
    if (!this.isSpeechRecognitionSupported()) {
      onError('Speech recognition is not supported in this browser. You can type instead.');
      return () => {};
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = 'en-IN';

      recog.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const text = finalTranscript || interimTranscript;
        if (text) {
          onResult(text.trim(), !!finalTranscript);
        }
      };

      recog.onerror = (event: any) => {
        onError(`Speech recognition notice: ${event.error || 'Mic input interrupted'}`);
      };

      recog.start();
      this.recognition = recog;

      return () => {
        try {
          recog.stop();
        } catch (e) {
          // ignore
        }
      };
    } catch (e: any) {
      onError(e?.message || 'Could not start speech recognition');
      return () => {};
    }
  }
}
