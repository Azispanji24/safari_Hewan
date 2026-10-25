import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
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
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getIsMuted());

  const handleToggleSound = () => {
    const nextState = !isMuted;
    soundEngine.setMuted(nextState);
    setIsMuted(nextState);
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
          {/* Audio Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`btn-header-control ${isMuted ? 'is-muted' : ''}`}
            aria-label={isMuted ? 'Suara dimatikan. Klik untuk menyalakan suara' : 'Suara aktif. Klik untuk mematikan suara'}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            <span aria-hidden="true">{isMuted ? '🔇' : '🔊'}</span>
            <span className="btn-label-text">{isMuted ? 'Suara Mati' : 'Suara Aktif'}</span>
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
