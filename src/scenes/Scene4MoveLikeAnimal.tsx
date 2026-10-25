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
      actionGuide: string;
      narration: string;
      icon: string;
      illustration: React.ReactNode;
      color: string;
    }
  > = {
    kelinci: {
      title: 'Melompat Seperti Kelinci',
      prompt: 'Ayo melompat lincah seperti kelinci!',
      actionGuide:
        '1. Tekuk sedikit kedua lututmu.\n2. Letakkan kedua tangan di atas kepala seperti telinga kelinci.\n3. Melompat kecil ke depan: Hop! Hop! Hop!',
      narration:
        'Ayo anak-anak, kita berdiri! Letakkan tangan di samping kepala seperti telinga kelinci, lalu melompat gembira: Hop! Hop! Hop!',
      icon: '🐰',
      illustration: <RabbitSvg size="100%" />,
      color: '#E09F67',
    },
    gajah: {
      title: 'Berjalan Seperti Gajah',
      prompt: 'Ayo berjalan tegap dan perlahan seperti gajah besar!',
      actionGuide:
        '1. Berdiri tegak dan langkahkan kaki dengan mantap: Buuk... buuk...\n2. Rentangkan satu tangan ke depan seperti belalai gajah.\n3. Ayunkan belalai perlahan ke kanan dan ke kiri.',
      narration:
        'Ayo berjalan seperti gajah besar! Langkahkan kaki perlahan dan ayunkan lenganmu seperti belalai gajah yang gagah.',
      icon: '🐘',
      illustration: <ElephantSvg size="100%" />,
      color: '#5C7D8D',
    },
    burung: {
      title: 'Mengepakkan Tangan Seperti Burung',
      prompt: 'Ayo mengepakkan tangan seperti burung yang terbang bebas!',
      actionGuide:
        '1. Berdiri dengan santai dan pandangan ke depan.\n2. Rentangkan kedua tanganmu lebar-lebar ke samping.\n3. Kepakkan tangan perlahan ke atas dan ke bawah seperti sayap burung.',
      narration:
        'Ayo rentangkan kedua tanganmu ke samping seperti sayap burung yang indah. Kepakkan perlahan ke atas dan ke bawah!',
      icon: '🐦',
      illustration: <BirdSvg size="100%" />,
      color: '#3A9BB7',
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
    <div className="scene-view scene-4-view">
      <div className="scene-card">
        {/* Scene Indicator */}
        <div className="scene-badge-header">
          <span className="scene-step-pill">Adegan 4 dari 6</span>
          <h2 className="scene-heading">Ayo Bergerak Bersama!</h2>
        </div>

        {/* Teacher Supervision Notice */}
        <div className="teacher-supervision-banner" role="note">
          <span className="banner-icon" aria-hidden="true">👨‍🏫</span>
          <p className="banner-text">
            <strong>Catatan Guru & Pendamping:</strong> Ajak anak berdiri dari tempat duduk. Pastikan ruangan cukup lapang dan anak bergerak dengan aman!
          </p>
        </div>

        {/* Movement Selector Tabs */}
        <div className="movement-tabs-row" role="tablist" aria-label="Pilihan gerakan hewan">
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
                className={`movement-tab-btn ${isActive ? 'is-active' : ''}`}
              >
                <span className="tab-icon" aria-hidden="true">{move.icon}</span>
                <span className="tab-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </button>
            );
          })}
        </div>

        {/* Main Movement Activity Frame */}
        <div className="movement-display-box">
          <div className="movement-visual-side">
            <div className="movement-svg-frame">
              {currentMove.illustration}
            </div>
            <span className="movement-tag-pill">{currentMove.title}</span>
          </div>

          <div className="movement-instructions-side">
            <h3 className="movement-prompt-title">{currentMove.prompt}</h3>

            <div className="movement-steps-list">
              {currentMove.actionGuide.split('\n').map((step, idx) => (
                <div key={idx} className="movement-step-row">
                  <span className="step-badge">{idx + 1}</span>
                  <p className="step-text">{step.replace(/^\d+\.\s*/, '')}</p>
                </div>
              ))}
            </div>

            <div className="movement-audio-row">
              <AudioButton
                label="Dengarkan Aba-Aba Gerakan"
                narrationText={currentMove.narration}
                variant="secondary"
              />
            </div>
          </div>
        </div>

        {/* Child Participation Acknowledgment */}
        <div className="movement-confirmation-area">
          {!hasTried ? (
            <button
              type="button"
              onClick={handleConfirmTried}
              className="btn-confirm-movement"
              aria-label="Saya sudah mencoba gerakan ini"
            >
              <span className="check-icon" aria-hidden="true">👍</span>
              <span>Hore, Saya Sudah Mencoba Bergerak!</span>
            </button>
          ) : (
            <div className="movement-success-badge" role="status">
              <span className="badge-stars" aria-hidden="true">🎉 ⭐ 🌟</span>
              <p className="badge-text">
                <strong>Hebat sekali!</strong> Tubuhmu jadi sehat, ceria, dan bersemangat!
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="scene-nav-actions">
          <button
            type="button"
            onClick={onBack}
            className="btn-nav btn-nav-back"
            aria-label="Kembali ke Adegan 3"
          >
            ← Kembali
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="btn-nav btn-nav-next"
            aria-label="Lanjut ke Adegan 5: Pasangkan Hewan dan Namanya"
          >
            <span>Lanjut Pasangkan Hewan</span>
            <span aria-hidden="true">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
