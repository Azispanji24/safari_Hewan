import React from 'react';
import { SafariFriendsSvg } from '../assets/illustrations';
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
    <div className="scene-view welcome-screen-view">
      <div className="welcome-card">
        {/* Child-friendly Age & Theme Badge */}
        <div className="badge-ribbon" aria-label="Media Edukasi PAUD 5-6 Tahun">
          <span>🐾 Petualangan Hewan di Sekitar Kita • Usia 5–6 Tahun</span>
        </div>

        {/* Title and Subtitle */}
        <div className="welcome-header">
          <h1 className="welcome-title">Safari Hewan</h1>
          <p className="welcome-subtitle">Lihat, Tebak, dan Bergerak</p>
          <p className="welcome-tagline">
            Yuk, kenali sahabat hewan, dengarkan suaranya yang unik, dan bergerak bersama!
          </p>
        </div>

        {/* Friendly Group Illustration */}
        <div className="welcome-illustration-wrap">
          <SafariFriendsSvg size="100%" className="welcome-illustration" />
        </div>

        {/* Primary CTA and Teacher Guide */}
        <div className="welcome-actions">
          <button
            type="button"
            onClick={handleStart}
            className="btn-start-adventure"
            aria-label="Mulai Petualangan Safari Hewan"
          >
            <span className="btn-start-icon" aria-hidden="true">🚀</span>
            <span className="btn-start-text">Mulai Petualangan!</span>
            <span className="btn-arrow" aria-hidden="true">➔</span>
          </button>

          <button
            type="button"
            onClick={onOpenTeacherGuide}
            className="btn-welcome-teacher"
            aria-label="Buka Panduan Guru dan Aktivitas Nyata"
          >
            <span>📖 Panduan Guru & Kegiatan Nyata</span>
          </button>
        </div>

        {/* Privacy & Safety Note */}
        <div className="welcome-safety-footer">
          <span className="safety-icon" aria-hidden="true">🛡️</span>
          <span>Aman untuk anak: Bebas iklan, bebas pelacak, dan tidak meminta data pribadi.</span>
        </div>
      </div>
    </div>
  );
};
