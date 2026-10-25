import React, { useState } from 'react';
import { RabbitSvg, ElephantSvg, BirdSvg } from '../assets/illustrations';
import { AudioButton } from '../components/AudioButton';
import { soundEngine } from '../utils/soundEngine';

interface Scene4MoveLikeAnimalProps {
  onNext: () => void;
  onBack: () => void;
}

type MovementAnimal = 'kelinci' | 'gajah' | 'burung';

export const Scene4MoveLikeAnimal: React.FC<Scene4MoveLikeAnimalProps> = ({ onNext, onBack }) => {
  const [activeMovement, setActiveMovement] = useState<MovementAnimal>('kelinci');
  const [hasTried, setHasTried] = useState<boolean>(false);

  const movements: Record<
    MovementAnimal,
    {
      title: string;
      prompt: string;
      steps: string[];
      narration: string;
      icon: string;
      illustration: React.ReactNode;
      color: string;
      callout: string;
    }
  > = {
    kelinci: {
      title: 'Kelinci Melompat',
      prompt: 'Ayo berdiri dan melompat lincah seperti kelinci!',
      steps: [
        'Tekuk kedua lututmu sedikit.',
        'Taruh tangan di atas kepala seperti telinga kelinci yang panjang.',
        'Melompat kecil ke depan: Hop! Hop! Hop!',
      ],
      narration:
        'Ayo anak-anak, kita berdiri! Letakkan tangan di samping kepala seperti telinga kelinci, lalu melompat gembira: Hop! Hop! Hop!',
      icon: '🐰',
      illustration: <RabbitSvg size="100%" />,
      color: '#D97A53',
      callout: 'Lompat riang: Hop! Hop!',
    },
    gajah: {
      title: 'Gajah Berjalan',
      prompt: 'Ayo berjalan tegap dan mantap seperti gajah besar!',
      steps: [
        'Berdiri tegak dan buka kakimu selebar bahu.',
        'Ayunkan satu tanganmu ke depan seperti belalai gajah.',
        'Langkahkan kaki perlahan: Buuk... buuk... buuk!',
      ],
      narration:
        'Ayo berjalan seperti gajah besar! Langkahkan kaki perlahan dan ayunkan lenganmu seperti belalai gajah yang gagah.',
      icon: '🐘',
      illustration: <ElephantSvg size="100%" />,
      color: '#5C7D8D',
      callout: 'Langkah gagah: Buuk... buuk!',
    },
    burung: {
      title: 'Burung Terbang',
      prompt: 'Ayo rentangkan tangan dan terbang seperti burung!',
      steps: [
        'Berdiri santai dengan pandangan ke depan.',
        'Rentangkan kedua tanganmu lebar-lebar ke samping seperti sayap.',
        'Kepakkan tangan naik dan turun perlahan seperti melayang di langit.',
      ],
      narration:
        'Ayo rentangkan kedua tanganmu ke samping seperti sayap burung yang indah. Kepakkan perlahan ke atas dan ke bawah!',
      icon: '🐦',
      illustration: <BirdSvg size="100%" />,
      color: '#3A9BB7',
      callout: 'Terbang bebas: Kepak... kepak!',
    },
  };

  const currentMove = movements[activeMovement];

  const handleSelectMovement = (key: MovementAnimal) => {
    setActiveMovement(key);
    soundEngine.synthesizeSound('pop');
  };

  const handleConfirmTried = () => {
    setHasTried(true);
    soundEngine.playSound('/audio/success-chime.wav', { fallbackType: 'chime' });
  };

  const handleNext = () => {
    soundEngine.synthesizeSound('pop');
    onNext();
  };

  return (
    <div className="scene-view scene-movement-arena-stage">
      {/* Scene Header */}
      <div className="scene-stage-header">
        <span className="scene-step-tag">Adegan 4 dari 6</span>
        <h2 className="scene-story-heading">Ayo Bergerak Bersama!</h2>
      </div>

      {/* Teacher Supervision Notice */}
      <div className="teacher-movement-notice" role="note">
        <span className="notice-icon" aria-hidden="true">👨‍🏫</span>
        <p className="notice-text">
          <strong>Peran Guru & Pendamping:</strong> Ajak seluruh anak berdiri dari kursi. Pastikan ruang kelas aman dan beri jarak antar teman!
        </p>
      </div>

      {/* Movement Switcher Tabs */}
      <div className="movement-hero-tabs" role="tablist" aria-label="Pilihan gerakan hewan">
        {(Object.keys(movements) as MovementAnimal[]).map((key) => {
          const move = movements[key];
          const isActive = activeMovement === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelectMovement(key)}
              className={`movement-hero-tab ${isActive ? 'is-active' : ''}`}
            >
              <span className="tab-emoji" aria-hidden="true">{move.icon}</span>
              <span className="tab-title">{move.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Movement Demonstration Arena */}
      <div className="movement-arena-card">
        {/* Left Side: Large Action Character Stage */}
        <div className="movement-character-column">
          <div className="movement-illustration-wrapper">
            {currentMove.illustration}
          </div>
          <div className="movement-action-pill">
            <span>✨ {currentMove.callout}</span>
          </div>
        </div>

        {/* Right Side: Step-by-Step Giant Instructions */}
        <div className="movement-guide-column">
          <h3 className="movement-heading-prompt">{currentMove.prompt}</h3>

          <div className="movement-big-steps">
            {currentMove.steps.map((stepText, idx) => (
              <div key={idx} className="movement-card-step">
                <span className="big-step-number">{idx + 1}</span>
                <p className="big-step-description">{stepText}</p>
              </div>
            ))}
          </div>

          <div className="movement-audio-action">
            <AudioButton
              label="Dengarkan Aba-Aba Gerakan"
              replayLabel="Ulangi Aba-Aba"
              narrationText={currentMove.narration}
              variant="secondary"
            />
          </div>
        </div>
      </div>

      {/* Child Physical Participation Confirmation */}
      <div className="movement-action-celebration">
        {!hasTried ? (
          <button
            type="button"
            onClick={handleConfirmTried}
            className="btn-confirm-body-movement"
            aria-label="Saya sudah berdiri dan mencoba gerakan ini"
          >
            <span className="confirm-icon" aria-hidden="true">👍</span>
            <span className="confirm-text">Hore, Saya Sudah Mencoba Bergerak!</span>
          </button>
        ) : (
          <div className="movement-celebration-banner" role="status">
            <span className="celebration-stars" aria-hidden="true">🎉 🌟 ⭐ 🌟 🎉</span>
            <h4 className="celebration-title">Luar Biasa! Tubuhmu Jadi Bugar & Berenergi!</h4>
            <p className="celebration-subtext">
              Bergerak menirukan hewan membuat otot sehat, hati gembira, dan pikiran segar.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="scene-storybook-nav">
        <button
          type="button"
          onClick={onBack}
          className="btn-story-nav btn-story-back"
          aria-label="Kembali ke Adegan 3"
        >
          ← Kembali
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="btn-story-nav btn-story-next"
          aria-label="Lanjut ke Adegan 5: Pasangkan Hewan dan Namanya"
        >
          <span>Lanjut Pasangkan Hewan</span>
          <span aria-hidden="true">➔</span>
        </button>
      </div>
    </div>
  );
};
