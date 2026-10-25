/**
 * Speech Narration utility for Safari Hewan
 * Delegated to the Centralized AudioController to support natural Indonesian teacher audio
 * with browser SpeechSynthesis fallback.
 */

import { audioController } from './audioController';

export const speechNarration = {
  speak: (
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    audioPath?: string
  ) => {
    if (audioPath) {
      audioController.playNarration(audioPath, {
        fallbackText: text,
        onStart,
        onEnd,
      });
    } else {
      audioController.playNarration('', {
        fallbackText: text,
        onStart,
        onEnd,
      });
    }
  },

  stop: () => audioController.stopNarration(),

  getIsSpeaking: () => false,
};
