import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { speechNarration } from '../utils/speechNarration';

interface AudioButtonProps {
  label: string;
  sublabel?: string;
  soundPath?: string;
  narrationText?: string;
  fallbackType?: 'quack' | 'trumpet' | 'chime' | 'pop';
  className?: string;
  variant?: 'primary' | 'secondary' | 'badge';
  size?: 'normal' | 'large';
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  label,
  sublabel,
  soundPath,
  narrationText,
  fallbackType = 'pop',
  className = '',
  variant = 'primary',
  size = 'normal',
  onPlayStart,
  onPlayEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleClick = async () => {
    if (isPlaying) {
      soundEngine.stopAll();
      speechNarration.stop();
      setIsPlaying(false);
      onPlayEnd?.();
      return;
    }

    setIsPlaying(true);
    onPlayStart?.();

    if (soundPath) {
      // Play local sound file or synthesize
      await soundEngine.playSound(soundPath, {
        onStart: () => setIsPlaying(true),
        onEnd: () => {
          setIsPlaying(false);
          onPlayEnd?.();
        },
        fallbackType,
      });
    } else if (narrationText) {
      // Speak Indonesian text
      speechNarration.speak(
        narrationText,
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          onPlayEnd?.();
        }
      );
    } else {
      soundEngine.synthesizeSound(
        fallbackType,
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          onPlayEnd?.();
        }
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`audio-btn audio-btn-${variant} audio-btn-${size} ${isPlaying ? 'is-playing' : ''} ${className}`}
      aria-label={`${label}${sublabel ? ' - ' + sublabel : ''}. Klik untuk ${isPlaying ? 'menghentikan' : 'mendengarkan'}`}
      aria-pressed={isPlaying}
    >
      <span className="audio-btn-icon" aria-hidden="true">
        {isPlaying ? (
          <span className="sound-wave-anim">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </span>
        ) : (
          <span className="speaker-icon">🔊</span>
        )}
      </span>
      <span className="audio-btn-content">
        <span className="audio-btn-label">{label}</span>
        {sublabel && <span className="audio-btn-sublabel">{sublabel}</span>}
      </span>
    </button>
  );
};
