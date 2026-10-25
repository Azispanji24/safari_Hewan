import React, { useState, useEffect, useRef, useId } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { speechNarration } from '../utils/speechNarration';

interface AudioButtonProps {
  label: string;
  sublabel?: string;
  replayLabel?: string;
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
  replayLabel,
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
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);
  const reactId = useId();
  const buttonId = useRef(`audio-btn-${reactId}`);

  useEffect(() => {
    const handleSoundStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ buttonId?: string }>;
      if (customEvent.detail?.buttonId !== buttonId.current) {
        setIsPlaying(false);
      }
    };

    const handleSpeechStart = () => {
      // If this is a sound button, stop playing when speech starts
      if (soundPath) {
        setIsPlaying(false);
      }
    };

    const handleSoundStop = () => {
      setIsPlaying(false);
    };

    window.addEventListener('safari-sound-start', handleSoundStart);
    window.addEventListener('safari-speech-start', handleSpeechStart);
    window.addEventListener('safari-sound-stop', handleSoundStop);

    return () => {
      window.removeEventListener('safari-sound-start', handleSoundStart);
      window.removeEventListener('safari-speech-start', handleSpeechStart);
      window.removeEventListener('safari-sound-stop', handleSoundStop);
    };
  }, [soundPath]);

  const handleClick = async () => {
    if (isPlaying) {
      soundEngine.stopAll();
      speechNarration.stop();
      setIsPlaying(false);
      onPlayEnd?.();
      return;
    }

    setIsPlaying(true);
    setHasPlayed(true);
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

  const currentLabel = isPlaying
    ? 'Sedang Berbunyi...'
    : hasPlayed && replayLabel
    ? replayLabel
    : label;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`audio-btn audio-btn-${variant} audio-btn-${size} ${isPlaying ? 'is-playing' : ''} ${hasPlayed ? 'has-played' : ''} ${className}`}
      aria-label={`${currentLabel}${sublabel ? ' - ' + sublabel : ''}. Klik untuk ${isPlaying ? 'menghentikan' : 'mendengarkan'}`}
      aria-pressed={isPlaying}
    >
      <span className="audio-btn-icon" aria-hidden="true">
        {isPlaying ? (
          <span className="sound-wave-anim">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </span>
        ) : hasPlayed ? (
          <span className="speaker-icon">🔁</span>
        ) : (
          <span className="speaker-icon">🔊</span>
        )}
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
