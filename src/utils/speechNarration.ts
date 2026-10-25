/**
 * Speech Narration utility for Safari Hewan
 * Uses Web Speech API (SpeechSynthesis) configured for Indonesian (id-ID)
 * Helps children aged 5-6 who are still developing independent reading skills.
 */

class SpeechNarration {
  private isSpeaking: boolean = false;

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // Fallback: visual reading only
      onStart?.();
      setTimeout(() => onEnd?.(), 1500);
      return;
    }

    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9; // Slightly slower, clear and child-friendly cadence
      utterance.pitch = 1.1; // Warm, friendly tone

      // Pick Indonesian voice if available
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        onStart?.();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        onEnd?.();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeaking = false;
      onEnd?.();
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechNarration = new SpeechNarration();
