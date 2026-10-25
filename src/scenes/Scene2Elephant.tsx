import React, { useState } from 'react';
import { ElephantSvg } from '../assets/illustrations';
import { AudioButton } from '../components/AudioButton';
import { soundEngine } from '../utils/soundEngine';

import { audioController } from '../utils/audioController';

interface Scene2ElephantProps {
  onNext: () => void;
  onBack: () => void;
}

export const Scene2Elephant: React.FC<Scene2ElephantProps> = ({ onNext, onBack }) => {
  const [highlightPart, setHighlightPart] = useState<'trunk' | 'ears' | null>(null);
  const [observationNote, setObservationNote] = useState<string | null>(null);

  const narrationText =
    'Wah, lihat siapa yang datang! Ini adalah gajah. Gajah berbadan besar sekali! Coba perhatikan, gajah memiliki belalai yang panjang dan telinga yang sangat lebar. Ayo, coba sentuh belalai atau telinganya!';

  const handlePointTrunk = () => {
    setHighlightPart('trunk');
    setObservationNote(
      '🌟 Pintar sekali! Itu belalai gajah yang panjang. Gajah menggunakan belalainya untuk minum air dan mengambil makanan.'
    );
    audioController.playNarration('/audio/narration/narration-scene2-trunk.mp3', {
      fallbackText: 'Pintar sekali! Itu belalai gajah yang panjang. Gajah menggunakan belalainya untuk minum air dan mengambil makanan.',
    });
  };

  const handlePointEars = () => {
    setHighlightPart('ears');
    setObservationNote(
      '🌟 Hebat! Itu telinga gajah yang lebar. Telinganya berguna untuk mendengar suara dari jauh dan mengipasi tubuhnya agar tetap sejuk.'
    );
    audioController.playNarration('/audio/narration/narration-scene2-ears.mp3', {
      fallbackText: 'Hebat! Itu telinga gajah yang lebar. Telinganya berguna untuk mendengar suara dari jauh dan mengipasi tubuhnya agar tetap sejuk.',
    });
  };

  const handleNext = () => {
    soundEngine.synthesizeSound('pop');
    onNext();
  };

  return (
    <div className="scene-view scene-character-hero-stage">
      {/* Scene Header */}
      <div className="scene-stage-header">
        <span className="scene-step-tag">Adegan 2 dari 6</span>
        <h2 className="scene-story-heading">Berkenalan dengan Gajah</h2>
      </div>

      {/* Main Character Focus Stage */}
      <div className="character-spotlight-arena">
        {/* Animal Name & Syllable Reading Tiles */}
        <div className="character-name-badge-group">
          <h3 className="character-giant-name">Gajah</h3>
          <div className="syllable-tiles-row" aria-label="Ejaan suku kata: Ga - jah">
            <span className="syllable-tile">Ga</span>
            <span className="syllable-divider">—</span>
            <span className="syllable-tile">jah</span>
          </div>
        </div>

        {/* Large Dominant Elephant Illustration */}
        <div className="character-hero-display">
          <div className="character-glow-halo" aria-hidden="true" />
          <ElephantSvg
            size="100%"
            highlightPart={highlightPart}
            className="character-hero-svg elephant-hero"
          />
        </div>

        {/* Observation Interaction Station */}
        <div className="interactive-observation-station">
          <p className="observation-lead-prompt">
            👀 <strong>Ayo Amati:</strong> Coba sentuh bagian tubuh gajah di bawah ini!
          </p>

          <div className="observation-buttons-row">
            <button
              type="button"
              onClick={handlePointTrunk}
              className={`btn-observe-feature ${highlightPart === 'trunk' ? 'is-active' : ''}`}
              aria-label="Tunjuk belalai gajah yang panjang"
            >
              <span className="feature-icon" aria-hidden="true">🐘</span>
              <span className="feature-text">Tunjuk Belalai Panjang</span>
            </button>

            <button
              type="button"
              onClick={handlePointEars}
              className={`btn-observe-feature ${highlightPart === 'ears' ? 'is-active' : ''}`}
              aria-label="Tunjuk telinga gajah yang lebar"
            >
              <span className="feature-icon" aria-hidden="true">👂</span>
              <span className="feature-text">Tunjuk Telinga Lebar</span>
            </button>
          </div>

          {observationNote && (
            <div className="observation-dialogue-card" role="status" aria-live="polite">
              <span className="dialogue-star" aria-hidden="true">✨</span>
              <p>{observationNote}</p>
            </div>
          )}
        </div>

        {/* Story Fact Banner & Audio */}
        <div className="character-story-banner">
          <p className="character-fact-text">
            "Gajah memiliki <strong>belalai yang panjang</strong> dan <strong>telinga yang sangat lebar</strong>."
          </p>
          <div className="character-audio-wrapper">
            <AudioButton
              label="Dengarkan Cerita Gajah"
              replayLabel="Dengarkan Lagi"
              sublabel="Suara Ramah Ibu Guru"
              narrationPath="/audio/narration/narration-scene2-elephant.mp3"
              narrationText={narrationText}
              variant="secondary"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="scene-storybook-nav">
        <button
          type="button"
          onClick={onBack}
          className="btn-story-nav btn-story-back"
          aria-label="Kembali ke Adegan 1"
        >
          ← Kembali
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="btn-story-nav btn-story-next"
          aria-label="Lanjut ke Adegan 3: Tebak Suara Hewan"
        >
          <span>Lanjut ke Tebak Suara</span>
          <span aria-hidden="true">➔</span>
        </button>
      </div>
    </div>
  );
};
