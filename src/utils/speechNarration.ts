/**
 * Speech Narration utility for Safari Hewan
 * Uses Web Speech API (SpeechSynthesis) configured specifically for Indonesian (id-ID)
 * Ensures natural cadence and avoids awkward foreign accents when Indonesian voice packs are missing.
 */

import { soundEngine } from './soundEngine';

class SpeechNarration {
  private isSpeaking: boolean = false;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private hasInitializedVoices: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.availableVoices = window.speechSynthesis.getVoices();
    this.hasInitializedVoices = this.availableVoices.length > 0;
  }

  public getIndonesianVoice(): SpeechSynthesisVoice | null {
    if (!this.hasInitializedVoices) {
      this.initVoices();
    }

    // 1. Prioritize natural Indonesian female voices (e.g. Microsoft Gadis, Google Bahasa Indonesia)
    const naturalVoice = this.availableVoices.find(
      v => (v.lang === 'id-ID' || v.lang === 'id_ID' || v.lang.startsWith('id')) &&
           (v.name.toLowerCase().includes('gadis') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('google'))
    );
    if (naturalVoice) return naturalVoice;

    // 2. Any Indonesian voice
    const anyIdVoice = this.availableVoices.find(
      v => v.lang.toLowerCase().startsWith('id') || v.name.toLowerCase().includes('indonesia')
    );
    if (anyIdVoice) return anyIdVoice;

    return null;
  }

  public hasIndonesianVoiceSupport(): boolean {
    return this.getIndonesianVoice() !== null;
  }

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onStart?.();
      setTimeout(() => onEnd?.(), 1500);
      return;
    }

    // Mutually stop any active animal sound effects or chimes
    soundEngine.stopAll();
    this.stop();

    // Broadcast speech start so all audio buttons sync their visual state
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('safari-speech-start'));
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.88; // Gentle, child-friendly storytelling tempo
      utterance.pitch = 1.08; // Warm, friendly tone

      const idVoice = this.getIndonesianVoice();
      if (idVoice) {
        utterance.voice = idVoice;
      } else {
        // If system has no Indonesian voice at all, do not force English voice to butcher Indonesian words.
        // Provide friendly visual subtitle and simulated speech interval.
        this.isSpeaking = true;
        onStart?.();
        const readingDuration = Math.min(5000, Math.max(2000, text.split(' ').length * 350));
        setTimeout(() => {
          this.isSpeaking = false;
          onEnd?.();
        }, readingDuration);
        return;
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
