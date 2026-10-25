import React from 'react';
import { SafariFriendsSvg, SavannahHillsSvg } from '../assets/illustrations';
import { soundEngine } from '../utils/soundEngine';

interface WelcomeScreenProps {
  onStart: () => void;
  onOpenTeacherGuide: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onOpenTeacherGuide,
}) => {
  const handleStart = () => {
    soundEngine.synthesizeSound('pop');
    onStart();
  };

  return (
    <div className="scene-view welcome-story-stage">
      {/* Decorative sunburst ambiance */}
      <div className="story-sunburst-glow" aria-hidden="true" />

      {/* Main Storybook Entrance Card / Stage */}
      <div className="welcome-storybook-container">
        {/* Child-friendly Age & Theme Ribbon */}
        <div className="story-ribbon" aria-label="Media Edukasi PAUD 5-6 Tahun">
          <span className="ribbon-leaf" aria-hidden="true">🌿</span>
          <span className="ribbon-text">Petualangan Hewan di Sekitar Kita • PAUD Usia 5–6 Tahun</span>
          <span className="ribbon-leaf" aria-hidden="true">🌿</span>
        </div>

        {/* Storybook Hero Title Banner */}
        <div className="welcome-story-title-banner">
          <h1 className="story-title">Safari Hewan</h1>
          <p className="story-subtitle">Lihat, Tebak, dan Bergerak</p>
          <p className="story-tagline">
            Yuk sahabat kecil, kita berkeliling safari mengenal teman-teman hewan, mendengarkan suaranya, dan melompat gembira bersama!
          </p>
        </div>

        {/* Hero Character Stage */}
        <div className="welcome-character-stage">
          <div className="stage-illustration-wrap">
            <SafariFriendsSvg size="100%" className="friends-hero-illustration" />
          </div>
          <SavannahHillsSvg className="welcome-stage-hills" />
        </div>

        {/* Big Prominent Action Area */}
        <div className="welcome-story-actions">
          <button
            type="button"
            onClick={handleStart}
            className="btn-start-hero"
            aria-label="Mulai Petualangan Safari Hewan"
          >
            <span className="btn-hero-sparkle" aria-hidden="true">✨</span>
            <span className="btn-hero-text">Mulai Petualangan!</span>
            <span className="btn-hero-icon" aria-hidden="true">➔</span>
          </button>

          <button
            type="button"
            onClick={onOpenTeacherGuide}
            className="btn-teacher-parchment"
            aria-label="Buka Panduan Guru dan Aktivitas Nyata"
          >
            <span aria-hidden="true">📖</span>
            <span>Panduan Guru & Kegiatan Nyata</span>
          </button>
        </div>

        {/* Safety & Child Privacy Badge */}
        <div className="welcome-trust-pill">
          <span className="trust-icon" aria-hidden="true">🛡️</span>
          <span>100% Aman untuk Anak: Bebas iklan, tanpa pelacak, dan tanpa data pribadi.</span>
        </div>
      </div>
    </div>
  );
};
