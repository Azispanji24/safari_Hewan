import React, { useState, useEffect } from 'react';
import { audioController, type AudioState } from '../utils/audioController';
import type { SceneId } from '../types';

interface HeaderProps {
  currentScene: SceneId;
  onOpenTeacherGuide: () => void;
  onRestart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScene,
  onOpenTeacherGuide,
  onRestart,
}) => {
  const [audioState, setAudioState] = useState<AudioState>({
    isMasterMuted: audioController.getIsMuted(),
    isMusicEnabled: audioController.getIsMusicEnabled(),
    masterVolume: audioController.getMasterVolume(),
    musicVolume: 0.22,
    isMusicPlaying: false,
    isNarrationPlaying: false,
    isSfxPlaying: false,
  });

  useEffect(() => {
    const unsubscribe = audioController.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handleToggleMasterMute = () => {
    audioController.toggleMasterMute();
  };

  const handleToggleMusic = () => {
    audioController.toggleMusic();
  };

  const handleCycleVolume = () => {
    // Cycles: 0.9 -> 0.5 -> 0.25 -> 0.9
    let nextVol = 0.9;
    if (audioState.masterVolume > 0.7) {
      nextVol = 0.55;
    } else if (audioState.masterVolume > 0.4) {
      nextVol = 0.28;
    } else {
      nextVol = 0.9;
    }
    audioController.setMasterVolume(nextVol);
  };

  const getVolumeLabel = () => {
    if (audioState.masterVolume > 0.7) return 'Vol: Jelas';
    if (audioState.masterVolume > 0.4) return 'Vol: Sedang';
    return 'Vol: Lembut';
  };

  const getVolumeIcon = () => {
    if (audioState.masterVolume > 0.7) return '📢';
    if (audioState.masterVolume > 0.4) return '🔊';
    return '🔉';
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand-group">
          <button
            type="button"
            onClick={onRestart}
            className="brand-logo-btn"
            aria-label="Kembali ke Layar Pembuka Safari Hewan"
          >
            <span className="brand-icon" aria-hidden="true">🦁</span>
            <div className="brand-text">
              <h1 className="brand-title">Safari Hewan</h1>
              <span className="brand-tagline">Lihat, Tebak, dan Bergerak</span>
            </div>
          </button>
        </div>

        <div className="header-actions">
          {/* Background Music (BGM) Toggle */}
          <button
            type="button"
            onClick={handleToggleMusic}
            className={`btn-header-control btn-music-toggle ${!audioState.isMusicEnabled ? 'is-music-off' : 'is-music-on'}`}
            aria-label={audioState.isMusicEnabled ? 'Musik latar aktif. Klik untuk mematikan musik latar' : 'Musik latar mati. Klik untuk menyalakan musik latar'}
            title={audioState.isMusicEnabled ? 'Matikan Musik Latar' : 'Nyalakan Musik Latar'}
          >
            <span aria-hidden="true">{audioState.isMusicEnabled ? '🎵' : '🔇'}</span>
            <span className="btn-label-text">
              {audioState.isMusicEnabled ? 'Musik: Aktif' : 'Musik: Mati'}
            </span>
          </button>

          {/* Master Volume Cycling Button */}
          <button
            type="button"
            onClick={handleCycleVolume}
            className="btn-header-control btn-volume-control"
            aria-label={`Volume saat ini: ${getVolumeLabel()}. Klik untuk mengubah tingkat volume.`}
            title="Ubah Tingkat Volume"
          >
            <span aria-hidden="true">{getVolumeIcon()}</span>
            <span className="btn-label-text">{getVolumeLabel()}</span>
          </button>

          {/* Master Sound Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={handleToggleMasterMute}
            className={`btn-header-control ${audioState.isMasterMuted ? 'is-muted' : ''}`}
            aria-label={audioState.isMasterMuted ? 'Seluruh suara dimatikan. Klik untuk menyalakan suara' : 'Suara aktif. Klik untuk mematikan seluruh suara (mode hening)'}
            title={audioState.isMasterMuted ? 'Nyalakan Semua Suara' : 'Mode Hening / Matikan Semua Suara'}
          >
            <span aria-hidden="true">{audioState.isMasterMuted ? '🔇' : '🔊'}</span>
            <span className="btn-label-text">
              {audioState.isMasterMuted ? 'Hening' : 'Suara'}
            </span>
          </button>

          {/* Teacher Guide Button */}
          <button
            type="button"
            onClick={onOpenTeacherGuide}
            className="btn-header-control btn-teacher-guide"
            aria-label="Buka Panduan Guru dan Kegiatan Nyata"
          >
            <span aria-hidden="true">📖</span>
            <span className="btn-label-text">Panduan Guru</span>
          </button>

          {/* Restart Button (visible in scenes) */}
          {currentScene !== 'welcome' && (
            <button
              type="button"
              onClick={onRestart}
              className="btn-header-control btn-restart"
              aria-label="Ulangi petualangan dari awal"
              title="Ulangi Petualangan"
            >
              <span aria-hidden="true">🔄</span>
              <span className="btn-label-text">Mulai Ulang</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
