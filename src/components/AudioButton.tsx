import React, { useState, useEffect, useId } from 'react';
import { audioController } from '../utils/audioController';

interface AudioButtonProps {
  label: string;
  sublabel?: string;
  replayLabel?: string;
  soundPath?: string;
  narrationPath?: string;
  narrationText?: string;
  fallbackType?: 'quack' | 'trumpet' | 'chime' | 'pop' | 'bird';
  className?: string;
  variant?: 'primary' | 'secondary' | 'badge';
  size?: 'normal' | 'large';
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  label,
  sublabel,
  replayLabel,
  soundPath,
  narrationPath,
  narrationText,
  fallbackType = 'pop',
  className = '',
  variant = 'primary',
  size = 'normal',
  onPlayStart,
  onPlayEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);
  const reactId = useId();
  const buttonId = `audio-btn-${reactId.replace(/:/g, '')}`;

  useEffect(() => {
    const handleSoundStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ path?: string }>;
      if (customEvent.detail?.path !== soundPath) {
        setIsPlaying(false);
      }
    };

    const handleNarrationStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ path?: string }>;
      if (customEvent.detail?.path !== narrationPath) {
        setIsPlaying(false);
      }
    };

    const handleStop = () => {
      setIsPlaying(false);
    };

    window.addEventListener('safari-sound-start', handleSoundStart);
    window.addEventListener('safari-narration-start', handleNarrationStart);
    window.addEventListener('safari-sound-stop', handleStop);
    window.addEventListener('safari-narration-stop', handleStop);

    return () => {
      window.removeEventListener('safari-sound-start', handleSoundStart);
      window.removeEventListener('safari-narration-start', handleNarrationStart);
      window.removeEventListener('safari-sound-stop', handleStop);
      window.removeEventListener('safari-narration-stop', handleStop);
    };
  }, [soundPath, narrationPath]);

  const handleClick = async () => {
    if (isPlaying) {
      audioController.stopForeground();
      setIsPlaying(false);
      onPlayEnd?.();
      return;
    }

    setIsPlaying(true);
    setHasPlayed(true);
    onPlayStart?.();

    if (soundPath) {
      // Animal sound or tactile sound
      await audioController.playSound(soundPath, {
        onStart: () => setIsPlaying(true),
        onEnd: () => {
          setIsPlaying(false);
          onPlayEnd?.();
        },
        fallbackType,
      });
    } else if (narrationPath || narrationText) {
      // Natural Indonesian Teacher Narration
      await audioController.playNarration(narrationPath || '', {
        fallbackText: narrationText,
        onStart: () => setIsPlaying(true),
        onEnd: () => {
          setIsPlaying(false);
          onPlayEnd?.();
        },
      });
    } else {
      audioController.synthesizeSound(
        fallbackType,
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          onPlayEnd?.();
        }
      );
    }
  };

  const currentLabel = isPlaying
    ? 'Sedang Berbunyi...'
    : hasPlayed && replayLabel
    ? replayLabel
    : label;

  return (
    <button
      type="button"
      id={buttonId}
      onClick={handleClick}
      className={`audio-btn audio-btn-${variant} audio-btn-${size} ${isPlaying ? 'is-playing' : ''} ${hasPlayed ? 'has-played' : ''} ${className}`}
      aria-label={`${currentLabel}${sublabel ? ' - ' + sublabel : ''}. Klik untuk ${isPlaying ? 'menghentikan' : 'mendengarkan'}`}
      aria-pressed={isPlaying}
    >
      <span className="audio-icon-disc" aria-hidden="true">
        {isPlaying ? (
          <span className="sound-wave-anim">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
            <span className="bar bar-4"></span>
          </span>
        ) : hasPlayed ? (
          <span className="speaker-icon">🔁</span>
        ) : (
          <span className="speaker-icon">🔊</span>
        )}
        <span className="pulse-halo" aria-hidden="true"></span>
      </span>
      <span className="audio-btn-content">
        <span className="audio-btn-label">{currentLabel}</span>
        {sublabel && (
          <span className="audio-btn-sublabel">
            {isPlaying ? 'Dengarkan baik-baik ya...' : sublabel}
          </span>
        )}
      </span>
    </button>
  );
};
