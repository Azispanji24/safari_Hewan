/**
 * Sound Engine for Safari Hewan
 * Delegated to the Centralized AudioController to ensure unified audio mixing,
 * ducking, and prevention of overlapping sound effects or speech.
 */

import { audioController } from './audioController';

export const soundEngine = {
  playSound: (
    soundPath: string,
    options?: {
      onStart?: () => void;
      onEnd?: () => void;
      fallbackType?: 'quack' | 'trumpet' | 'chime' | 'pop' | 'bird';
    }
  ) => audioController.playSound(soundPath, options),

  synthesizeSound: (
    type: 'quack' | 'trumpet' | 'chime' | 'pop' | 'bird',
    onStart?: () => void,
    onEnd?: () => void
  ) => audioController.synthesizeSound(type, onStart, onEnd),

  stopAll: () => audioController.stopForeground(),

  setMuted: (_muted: boolean) => audioController.toggleMasterMute(),

  getIsMuted: () => audioController.getIsMuted(),
};
