/**
 * Centralized Audio Controller for Safari Hewan 2.0
 * Manages Background Music (BGM), Natural Teacher Narration, Authentic Animal Sounds,
 * Audio Ducking, Volume Balancing, and Session Preferences.
 *
 * Attribution:
 * - BGM: "Carefree" by Kevin MacLeod (incompetech.com), licensed under CC BY 3.0.
 * - Animal SFX: Authentic Mallard Quack (Jonathon Jongsma, CC BY-SA 3.0 via Xeno-canto/Wikimedia Commons).
 * - Teacher Narration: High-quality natural Indonesian voice (id-ID-GadisNeural) generated for early childhood education.
 */

export interface AudioState {
  isMasterMuted: boolean;
  isMusicEnabled: boolean;
  masterVolume: number; // 0.0 - 1.0
  musicVolume: number;  // 0.0 - 1.0
  isMusicPlaying: boolean;
  isNarrationPlaying: boolean;
  isSfxPlaying: boolean;
}

type AudioStateListener = (state: AudioState) => void;

class AudioController {
  private bgmAudio: HTMLAudioElement | null = null;
  private narrationAudio: HTMLAudioElement | null = null;
  private sfxAudio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;

  // Session preferences
  private isMasterMuted: boolean = false;
  private isMusicEnabled: boolean = false; // BGM is strictly OFF by default (user/teacher opt-in)
  private masterVolume: number = 0.9;
  private baseMusicVolume: number = 0.22; // Comfortable, gentle BGM level
  private duckedMusicVolume: number = 0.04; // 80%+ reduction during speech/sfx
  private fadeIntervalId: number | null = null;

  private isMusicPlaying: boolean = false;
  private isNarrationPlaying: boolean = false;
  private isSfxPlaying: boolean = false;
  private hasUserInteracted: boolean = false;

  private stateListeners: Set<AudioStateListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.restorePreferences();
      this.setupAutoplayUnlock();
    }
  }

  private getResolvedPath(rawPath: string): string {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return rawPath.startsWith('/') ? `${cleanBase}${rawPath}` : rawPath;
  }

  private restorePreferences() {
    try {
      const savedMuted = sessionStorage.getItem('safari_master_muted');
      if (savedMuted !== null) {
        this.isMasterMuted = savedMuted === 'true';
      }
      const savedMusic = sessionStorage.getItem('safari_music_enabled');
      if (savedMusic !== null) {
        this.isMusicEnabled = savedMusic === 'true';
      } else {
        this.isMusicEnabled = false;
      }
      const savedVol = sessionStorage.getItem('safari_master_volume');
      if (savedVol !== null) {
        const v = parseFloat(savedVol);
        if (!isNaN(v) && v >= 0 && v <= 1) {
          this.masterVolume = v;
        }
      }
    } catch {
      // Session storage unavailable
    }
  }

  private savePreferences() {
    try {
      sessionStorage.setItem('safari_master_muted', String(this.isMasterMuted));
      sessionStorage.setItem('safari_music_enabled', String(this.isMusicEnabled));
      sessionStorage.setItem('safari_master_volume', String(this.masterVolume));
    } catch {
      // Session storage unavailable
    }
  }

  private notifyState() {
    const state: AudioState = {
      isMasterMuted: this.isMasterMuted,
      isMusicEnabled: this.isMusicEnabled,
      masterVolume: this.masterVolume,
      musicVolume: this.baseMusicVolume,
      isMusicPlaying: this.isMusicPlaying,
      isNarrationPlaying: this.isNarrationPlaying,
      isSfxPlaying: this.isSfxPlaying,
    };
    this.stateListeners.forEach((listener) => listener(state));
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.stateListeners.add(listener);
    listener({
      isMasterMuted: this.isMasterMuted,
      isMusicEnabled: this.isMusicEnabled,
      masterVolume: this.masterVolume,
      musicVolume: this.baseMusicVolume,
      isMusicPlaying: this.isMusicPlaying,
      isNarrationPlaying: this.isNarrationPlaying,
      isSfxPlaying: this.isSfxPlaying,
    });
    return () => this.stateListeners.delete(listener);
  }

  private setupAutoplayUnlock() {
    const unlock = () => {
      this.hasUserInteracted = true;
      // Resume Web Audio context if suspended
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume().catch(() => {});
      }
      // NOTE: BGM is NEVER started automatically here!
      // Music only plays upon explicit click on the Header music button.
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
  }

  // --------------------------------------------------------------------------
  // BACKGROUND MUSIC (BGM)
  // --------------------------------------------------------------------------
  public async startBgm(force: boolean = false) {
    if (typeof window === 'undefined') return;
    if ((!this.isMusicEnabled || this.isMasterMuted) && !force) return;

    if (!this.bgmAudio) {
      const bgmPath = this.getResolvedPath('/audio/bgm-safari-adventure.mp3');
      this.bgmAudio = new Audio(bgmPath);
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0; // Starts at 0 and fades in gently
    }

    try {
      if (this.bgmAudio.paused) {
        await this.bgmAudio.play();
        this.isMusicPlaying = true;
        this.notifyState();
      }
      // Target volume: ducked if speech/sfx active, else base volume
      const target = (this.isNarrationPlaying || this.isSfxPlaying)
        ? this.duckedMusicVolume
        : this.baseMusicVolume * this.masterVolume;
      this.fadeBgm(target, 800);
    } catch {
      // Browser autoplay blocked until user click
      this.isMusicPlaying = false;
      this.notifyState();
    }
  }

  public pauseBgm() {
    if (this.bgmAudio && !this.bgmAudio.paused) {
      this.fadeBgm(0, 400, () => {
        this.bgmAudio?.pause();
        this.isMusicPlaying = false;
        this.notifyState();
      });
    } else {
      this.isMusicPlaying = false;
      this.notifyState();
    }
  }

  public toggleMusic(): boolean {
    const nextState = !this.isMusicEnabled;
    this.isMusicEnabled = nextState;
    this.savePreferences();

    if (nextState) {
      if (!this.isMasterMuted) {
        this.startBgm(true);
      }
    } else {
      this.pauseBgm();
    }
    this.notifyState();
    return nextState;
  }

  public toggleMasterMute(): boolean {
    const nextState = !this.isMasterMuted;
    this.isMasterMuted = nextState;
    this.savePreferences();

    if (nextState) {
      this.stopAll();
      this.pauseBgm();
    } else {
      if (this.isMusicEnabled && this.hasUserInteracted) {
        this.startBgm();
      }
    }
    this.notifyState();
    return nextState;
  }

  public setMasterVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.masterVolume = clamped;
    this.savePreferences();
    if (this.bgmAudio && this.isMusicPlaying) {
      const target = (this.isNarrationPlaying || this.isSfxPlaying)
        ? this.duckedMusicVolume
        : this.baseMusicVolume * this.masterVolume;
      this.bgmAudio.volume = target;
    }
    this.notifyState();
  }

  /**
   * Smoothly interpolate BGM volume to prevent sudden jarring audio jumps
   */
  private fadeBgm(targetVolume: number, durationMs: number = 400, onComplete?: () => void) {
    if (!this.bgmAudio) return;
    if (this.fadeIntervalId !== null) {
      clearInterval(this.fadeIntervalId);
      this.fadeIntervalId = null;
    }

    const startVolume = this.bgmAudio.volume;
    const clampedTarget = Math.max(0, Math.min(1, targetVolume));
    if (Math.abs(startVolume - clampedTarget) < 0.01) {
      this.bgmAudio.volume = clampedTarget;
      onComplete?.();
      return;
    }

    const steps = 16;
    const stepInterval = Math.max(16, durationMs / steps);
    let currentStep = 0;

    this.fadeIntervalId = window.setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      if (this.bgmAudio) {
        this.bgmAudio.volume = startVolume + (clampedTarget - startVolume) * progress;
      }
      if (currentStep >= steps) {
        if (this.fadeIntervalId !== null) {
          clearInterval(this.fadeIntervalId);
          this.fadeIntervalId = null;
        }
        if (this.bgmAudio) {
          this.bgmAudio.volume = clampedTarget;
        }
        onComplete?.();
      }
    }, stepInterval);
  }

  /**
   * Duck BGM volume down during speech or animal sound effects
   */
  private duckBgm() {
    if (this.bgmAudio && this.isMusicPlaying && !this.isMasterMuted) {
      this.fadeBgm(this.duckedMusicVolume, 300);
    }
  }

  /**
   * Restore BGM volume back to base level once narration or sound finishes
   */
  private unduckBgm() {
    // Only unduck if neither narration nor sfx is still active
    if (!this.isNarrationPlaying && !this.isSfxPlaying) {
      if (this.bgmAudio && this.isMusicPlaying && !this.isMasterMuted && this.isMusicEnabled) {
        setTimeout(() => {
          if (!this.isNarrationPlaying && !this.isSfxPlaying) {
            this.fadeBgm(this.baseMusicVolume * this.masterVolume, 600);
          }
        }, 300); // Gentle natural pause before bringing back music
      }
    }
  }

  // --------------------------------------------------------------------------
  // NARRATION CHANNEL (LOCAL AUDIO WITH SSML/SYNTHESIS FALLBACK)
  // --------------------------------------------------------------------------
  public async playNarration(
    narrationPath: string,
    options?: {
      fallbackText?: string;
      onStart?: () => void;
      onEnd?: () => void;
    }
  ): Promise<boolean> {
    if (this.isMasterMuted) return false;

    // Mutually stop any running sound effects or previous narration
    this.stopNarration();
    this.stopSfx();

    this.isNarrationPlaying = true;
    this.duckBgm();
    this.notifyState();

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('safari-narration-start', { detail: { path: narrationPath } }));
    }

    try {
      const resolved = this.getResolvedPath(narrationPath);
      const audio = new Audio(resolved);
      audio.volume = Math.min(1.0, 1.0 * this.masterVolume);
      this.narrationAudio = audio;

      audio.onplay = () => {
        options?.onStart?.();
      };

      audio.onended = () => {
        if (this.narrationAudio === audio) {
          this.narrationAudio = null;
          this.isNarrationPlaying = false;
          this.unduckBgm();
          this.notifyState();
        }
        options?.onEnd?.();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('safari-narration-stop'));
        }
      };

      audio.onerror = () => {
        // Fallback to speech synthesis if local audio file fails
        this.fallbackSpeechSynthesis(options?.fallbackText, options?.onStart, options?.onEnd);
      };

      await audio.play();
      return true;
    } catch {
      this.fallbackSpeechSynthesis(options?.fallbackText, options?.onStart, options?.onEnd);
      return false;
    }
  }

  public stopNarration() {
    if (this.narrationAudio) {
      this.narrationAudio.pause();
      this.narrationAudio.currentTime = 0;
      this.narrationAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isNarrationPlaying = false;
    this.unduckBgm();
    this.notifyState();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('safari-narration-stop'));
    }
  }

  private fallbackSpeechSynthesis(text?: string, onStart?: () => void, onEnd?: () => void) {
    if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.isNarrationPlaying = false;
      this.unduckBgm();
      this.notifyState();
      onStart?.();
      setTimeout(() => onEnd?.(), 1000);
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.88;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(
        (v) => (v.lang.startsWith('id') || v.lang.includes('ID')) &&
               (v.name.includes('Gadis') || v.name.includes('Natural') || v.name.includes('Google'))
      ) || voices.find((v) => v.lang.toLowerCase().startsWith('id'));

      if (idVoice) utterance.voice = idVoice;

      utterance.onstart = () => {
        this.isNarrationPlaying = true;
        this.duckBgm();
        this.notifyState();
        onStart?.();
      };

      utterance.onend = () => {
        this.isNarrationPlaying = false;
        this.unduckBgm();
        this.notifyState();
        onEnd?.();
      };

      utterance.onerror = () => {
        this.isNarrationPlaying = false;
        this.unduckBgm();
        this.notifyState();
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.isNarrationPlaying = false;
      this.unduckBgm();
      this.notifyState();
      onEnd?.();
    }
  }

  // --------------------------------------------------------------------------
  // SOUND EFFECTS CHANNEL (ANIMAL SOUNDS & TACTILE CLICKS)
  // --------------------------------------------------------------------------
  public async playSound(
    soundPath: string,
    options?: {
      onStart?: () => void;
      onEnd?: () => void;
      fallbackType?: 'quack' | 'trumpet' | 'chime' | 'pop' | 'bird';
    }
  ): Promise<boolean> {
    if (this.isMasterMuted) return false;

    // Mutually stop any ongoing narration and previous SFX
    this.stopNarration();
    this.stopSfx();

    this.isSfxPlaying = true;
    this.duckBgm();
    this.notifyState();

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('safari-sound-start', { detail: { path: soundPath } }));
    }

    try {
      const resolved = this.getResolvedPath(soundPath);
      const audio = new Audio(resolved);
      audio.volume = Math.min(1.0, 0.85 * this.masterVolume);
      this.sfxAudio = audio;

      audio.onplay = () => {
        options?.onStart?.();
      };

      audio.onended = () => {
        if (this.sfxAudio === audio) {
          this.sfxAudio = null;
          this.isSfxPlaying = false;
          this.unduckBgm();
          this.notifyState();
        }
        options?.onEnd?.();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('safari-sound-stop'));
        }
      };

      audio.onerror = () => {
        if (soundPath.endsWith('.mp3')) {
          const wavPath = soundPath.replace('.mp3', '.wav');
          this.playSound(wavPath, options);
          return;
        }
        this.synthesizeSound(options?.fallbackType || 'pop', options?.onStart, options?.onEnd);
      };

      await audio.play();
      return true;
    } catch {
      this.synthesizeSound(options?.fallbackType || 'pop', options?.onStart, options?.onEnd);
      return false;
    }
  }

  public stopSfx() {
    if (this.sfxAudio) {
      this.sfxAudio.pause();
      this.sfxAudio.currentTime = 0;
      this.sfxAudio = null;
    }
    this.isSfxPlaying = false;
    this.unduckBgm();
    this.notifyState();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('safari-sound-stop'));
    }
  }

  /**
   * Resilient Web Audio synthesizer fallback
   */
  public synthesizeSound(
    type: 'quack' | 'trumpet' | 'chime' | 'pop' | 'bird',
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (this.isMasterMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.stopNarration();
    this.stopSfx();

    this.isSfxPlaying = true;
    this.duckBgm();
    this.notifyState();
    onStart?.();

    const now = ctx.currentTime;

    if (type === 'quack') {
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
      gain.gain.linearRampToValueAtTime(0.25 * this.masterVolume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);

      setTimeout(() => {
        this.isSfxPlaying = false;
        this.unduckBgm();
        this.notifyState();
        onEnd?.();
      }, 450);
    } else if (type === 'chime') {
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((freq, idx) => {
        const noteStart = now + idx * 0.15;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.01, noteStart);
        gain.gain.linearRampToValueAtTime(0.18 * this.masterVolume, noteStart + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.55);
      });

      setTimeout(() => {
        this.isSfxPlaying = false;
        this.unduckBgm();
        this.notifyState();
        onEnd?.();
      }, 800);
    } else if (type === 'trumpet') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.linearRampToValueAtTime(450, now + 0.3);
      osc.frequency.linearRampToValueAtTime(380, now + 0.8);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18 * this.masterVolume, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);

      setTimeout(() => {
        this.isSfxPlaying = false;
        this.unduckBgm();
        this.notifyState();
        onEnd?.();
      }, 850);
    } else if (type === 'bird') {
      // Natural bird chirp (sweet melodic avian frequency sweeps 3100Hz - 4600Hz)
      const chirps = [
        { start: 0.0, f1: 3100, f2: 4400, len: 0.12 },
        { start: 0.16, f1: 3400, f2: 4700, len: 0.14 },
        { start: 0.36, f1: 3200, f2: 4300, len: 0.18 },
      ];
      chirps.forEach(({ start, f1, f2, len }) => {
        const noteStart = now + start;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f1, noteStart);
        osc.frequency.exponentialRampToValueAtTime(f2, noteStart + len * 0.55);
        osc.frequency.exponentialRampToValueAtTime(f1 * 0.95, noteStart + len);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.18 * this.masterVolume, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + len);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + len + 0.02);
      });

      setTimeout(() => {
        this.isSfxPlaying = false;
        this.unduckBgm();
        this.notifyState();
        onEnd?.();
      }, 620);
    } else {
      // Pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.12);

      gain.gain.setValueAtTime(0.18 * this.masterVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);

      setTimeout(() => {
        this.isSfxPlaying = false;
        this.unduckBgm();
        this.notifyState();
        onEnd?.();
      }, 160);
    }
  }

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

  /**
   * Stop all foreground narration and SFX without abruptly stopping BGM
   * Used during scene navigation
   */
  public stopForeground() {
    this.stopNarration();
    this.stopSfx();
  }

  /**
   * Stop everything including background music
   */
  public stopAll() {
    this.stopNarration();
    this.stopSfx();
    this.pauseBgm();
  }

  public getIsMuted(): boolean {
    return this.isMasterMuted;
  }

  public getIsMusicEnabled(): boolean {
    return this.isMusicEnabled;
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }
}

export const audioController = new AudioController();

// Backwards-compatibility wrapper for soundEngine
export const soundEngine = {
  playSound: (soundPath: string, options?: { onStart?: () => void; onEnd?: () => void; fallbackType?: 'quack' | 'trumpet' | 'chime' | 'pop' | 'bird' }) =>
    audioController.playSound(soundPath, options),
  synthesizeSound: (type: 'quack' | 'trumpet' | 'chime' | 'pop' | 'bird', onStart?: () => void, onEnd?: () => void) =>
    audioController.synthesizeSound(type, onStart, onEnd),
  stopAll: () => audioController.stopForeground(),
  setMuted: (_muted: boolean) => audioController.toggleMasterMute(),
  getIsMuted: () => audioController.getIsMuted(),
};
