import React, { useState } from 'react';
import { ElephantSvg } from '../assets/illustrations';
import { AudioButton } from '../components/AudioButton';
import { soundEngine } from '../utils/soundEngine';

interface Scene2ElephantProps {
  onNext: () => void;
  onBack: () => void;
}

export const Scene2Elephant: React.FC<Scene2ElephantProps> = ({ onNext, onBack }) => {
  const [highlightPart, setHighlightPart] = useState<'trunk' | 'ears' | null>(null);
  const [observationNote, setObservationNote] = useState<string | null>(null);

  const narrationText =
    'Ini adalah Gajah! Gajah berbadan besar. Coba perhatikan, gajah memiliki belalai yang panjang dan telinga yang sangat lebar.';

  const handlePointTrunk = () => {
    setHighlightPart('trunk');
    setObservationNote(
      '🌟 Pintar sekali! Itu belalai gajah yang panjang. Gajah menggunakan belalainya untuk minum air dan mengambil makanan.'
    );
    soundEngine.synthesizeSound('chime');
  };

  const handlePointEars = () => {
    setHighlightPart('ears');
    setObservationNote(
      '🌟 Hebat! Itu telinga gajah yang lebar. Telinganya berguna untuk mendengar suara jauh dan mengipasi tubuhnya agar sejuk.'
    );
    soundEngine.synthesizeSound('chime');
  };

  const handleNext = () => {
    soundEngine.synthesizeSound('pop');
    onNext();
  };

  return (
    <div className="scene-view scene-2-view">
      <div className="scene-card">
        {/* Scene Badge */}
        <div className="scene-badge-header">
          <span className="scene-step-pill">Adegan 2 dari 6</span>
          <h2 className="scene-heading">Berkenalan dengan Gajah</h2>
        </div>

        {/* Animal Name in Prominent Friendly Text */}
        <div className="animal-name-hero">
          <h3 className="animal-main-name">Gajah</h3>
          <span className="syllable-badge" aria-label="Ejaan suku kata: Ga - jah">
            Ga — jah
          </span>
        </div>

        {/* Large Recognizable Elephant Illustration */}
        <div className="scene-visual-frame animal-frame">
          <ElephantSvg
            size="100%"
            highlightPart={highlightPart}
            className="large-animal-svg"
          />
        </div>

        {/* Simple Fact & Audio Narration */}
        <div className="narration-box">
          <p className="narration-fact">
            "Gajah memiliki <strong>belalai yang panjang</strong> dan <strong>telinga yang sangat lebar</strong>."
          </p>
          <div className="narration-audio-action">
            <AudioButton
              label="Dengarkan Penjelasan Gajah"
              sublabel="Suara Narasi"
              narrationText={narrationText}
              variant="secondary"
            />
          </div>
        </div>

        {/* Child Observation Interaction */}
        <div className="child-interaction-panel">
          <p className="prompt-label">
            👀 <strong>Ayo Amati:</strong> Tunjuk ciri khas tubuh gajah di bawah ini!
          </p>
          <div className="point-buttons-row">
            <button
              type="button"
              onClick={handlePointTrunk}
              className={`btn-point-part ${highlightPart === 'trunk' ? 'is-active' : ''}`}
              aria-label="Tunjuk belalai gajah yang panjang"
            >
              <span className="part-icon" aria-hidden="true">🐘</span>
              <span>Tunjuk Belalai Panjang</span>
            </button>

            <button
              type="button"
              onClick={handlePointEars}
              className={`btn-point-part ${highlightPart === 'ears' ? 'is-active' : ''}`}
              aria-label="Tunjuk telinga gajah yang lebar"
            >
              <span className="part-icon" aria-hidden="true">👂</span>
              <span>Tunjuk Telinga Lebar</span>
            </button>
          </div>

          {observationNote && (
            <div className="observation-feedback-card" role="status" aria-live="polite">
              <p>{observationNote}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="scene-nav-actions">
          <button
            type="button"
            onClick={onBack}
            className="btn-nav btn-nav-back"
            aria-label="Kembali ke Adegan 1"
          >
            ← Kembali
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="btn-nav btn-nav-next"
            aria-label="Lanjut ke Adegan 3: Tebak Suara Hewan"
          >
            <span>Lanjut ke Tebak Suara</span>
            <span aria-hidden="true">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
