/**
 * Sound Engine for Safari Hewan
 * Provides audio playback using authentic local recordings (MP3/WAV) with resilient Web Audio API synthesizer fallbacks.
 * Ensures zero overlap between animal sounds and narrator speech.
 */

import { speechNarration } from './speechNarration';

class SoundEngine {
  private audioContext: AudioContext | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private isMuted: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAll();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public stopAll() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('safari-sound-stop'));
    }
  }

  /**
   * Play an audio file from public/audio path with fallback to Web Audio synthesis.
   * Guarantees that any previous audio or speech is immediately stopped to prevent overlapping.
   */
  public async playSound(
    soundPath: string,
    options?: {
      onStart?: () => void;
      onEnd?: () => void;
      fallbackType?: 'quack' | 'trumpet' | 'chime' | 'pop';
    }
  ): Promise<boolean> {
    if (this.isMuted) return false;

    // Mutually stop any ongoing speech narration and sound effects
    speechNarration.stop();
    this.stopAll();

    // Broadcast sound start event for UI synchronization
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('safari-sound-start', { detail: { path: soundPath } }));
    }

    try {
      const baseUrl = import.meta.env.BASE_URL || '/';
      const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const resolvedPath = soundPath.startsWith('/') ? `${cleanBase}${soundPath}` : soundPath;

      const audio = new Audio(resolvedPath);
      audio.volume = 0.8; // Comfortable, consistent volume
      this.currentAudioElement = audio;

      audio.onplay = () => {
        options?.onStart?.();
      };

      audio.onended = () => {
        if (this.currentAudioElement === audio) {
          this.currentAudioElement = null;
        }
        options?.onEnd?.();
      };

      audio.onerror = () => {
        // If MP3 fails, try WAV fallback, or synthesize
        if (soundPath.endsWith('.mp3')) {
          const wavPath = soundPath.replace('.mp3', '.wav');
          this.playSound(wavPath, options);
          return;
        }
        // Fallback to Web Audio synthesis
        this.synthesizeSound(options?.fallbackType || 'pop', options?.onStart, options?.onEnd);
      };

      await audio.play();
      return true;
    } catch {
      // Autoplay or network issue -> fallback to Web Audio
      this.synthesizeSound(options?.fallbackType || 'pop', options?.onStart, options?.onEnd);
      return false;
    }
  }

  /**
   * Resilient Web Audio synthesizer fallback for offline or restricted environments
   */
  public synthesizeSound(
    type: 'quack' | 'trumpet' | 'chime' | 'pop',
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    speechNarration.stop();
    onStart?.();

    const now = ctx.currentTime;

    if (type === 'quack') {
      // Harmonic formant quack
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(3.5, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);

      setTimeout(() => onEnd?.(), 450);
    } else if (type === 'chime') {
      // Cheerful 3-note ascending arpeggio (C5, E5, G5)
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((freq, idx) => {
        const noteStart = now + idx * 0.15;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.01, noteStart);
        gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.55);
      });

      setTimeout(() => onEnd?.(), 800);
    } else if (type === 'trumpet') {
      // Elephant trumpet: brassy harmonized swell
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.linearRampToValueAtTime(450, now + 0.3);
      osc.frequency.linearRampToValueAtTime(380, now + 0.8);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);

      setTimeout(() => onEnd?.(), 850);
    } else {
      // Gentle bubble pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);

      setTimeout(() => onEnd?.(), 160);
    }
  }
}

export const soundEngine = new SoundEngine();
