import React, { useState } from 'react';
import { SafariGateSvg } from '../assets/illustrations';
import { AudioButton } from '../components/AudioButton';
import { ANIMAL_LIST } from '../data/animals';
import { soundEngine } from '../utils/soundEngine';
import type { AnimalId } from '../types';

interface Scene1WelcomeProps {
  onNext: () => void;
  onBack: () => void;
}

export const Scene1Welcome: React.FC<Scene1WelcomeProps> = ({ onNext, onBack }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalId | null>(null);

  const narrationText =
    'Halo sahabat kecil! Selamat datang di Safari Hewan. Hari ini kita akan menjelajah, mendengar suara hewan yang lucu, dan bergerak bersama!';

  const handleSelectAnimal = (id: AnimalId) => {
    setSelectedAnimal(id);
    soundEngine.synthesizeSound('pop');
  };

  const handleNext = () => {
    soundEngine.synthesizeSound('pop');
    onNext();
  };

  return (
    <div className="scene-view scene-1-view">
      <div className="scene-card">
        {/* Scene Indicator Header */}
        <div className="scene-badge-header">
          <span className="scene-step-pill">Adegan 1 dari 6</span>
          <h2 className="scene-heading">Selamat Datang di Safari!</h2>
        </div>

        {/* Visual Focal Point: Safari Gate */}
        <div className="scene-visual-frame gate-frame">
          <SafariGateSvg size="100%" className="gate-illustration" />
        </div>

        {/* Short Narration & Audio Button */}
        <div className="narration-box">
          <p className="narration-text">
            "Halo sahabat kecil! Selamat datang di Safari Hewan. Hari ini kita akan menjelajah, mendengar suara hewan, dan bergerak bersama!"
          </p>
          <div className="narration-audio-action">
            <AudioButton
              label="Dengarkan Guru Bercerita"
              narrationText={narrationText}
              variant="secondary"
            />
          </div>
        </div>

        {/* Interactive Prompt: Hewan apa yang ingin kamu temui? */}
        <div className="child-prompt-box">
          <label className="prompt-label" id="curious-animal-label">
            Hewan apa yang paling ingin kamu temui hari ini?
          </label>
          <div
            className="animal-choice-row"
            role="radiogroup"
            aria-labelledby="curious-animal-label"
          >
            {ANIMAL_LIST.map((animal) => {
              const isSelected = selectedAnimal === animal.id;
              return (
                <button
                  key={animal.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectAnimal(animal.id as AnimalId)}
                  className={`animal-chip-btn ${isSelected ? 'is-selected' : ''}`}
                >
                  <span className="chip-badge">{animal.badge.split(' ')[0]}</span>
                  <span className="chip-name">{animal.name}</span>
                </button>
              );
            })}
          </div>

          {selectedAnimal && (
            <div className="selection-acknowledgement" role="status">
              <span>✨ Wah, pilihan bagus! Ayo kita mulai petualangan melihat sahabat hewan!</span>
            </div>
          )}
        </div>

        {/* Scene Navigation */}
        <div className="scene-nav-actions">
          <button
            type="button"
            onClick={onBack}
            className="btn-nav btn-nav-back"
            aria-label="Kembali ke Layar Pembuka"
          >
            ← Kembali
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="btn-nav btn-nav-next"
            aria-label="Lanjut ke Adegan 2: Berkenalan dengan Gajah"
          >
            <span>Lanjut Berkenalan dengan Gajah</span>
            <span aria-hidden="true">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
