import React from 'react';
import { SafariGateSvg } from '../assets/illustrations';
import { AudioButton } from '../components/AudioButton';
import { ANIMALS, ANIMAL_LIST } from '../data/animals';
import { soundEngine } from '../utils/soundEngine';
import type { AnimalId } from '../types';

interface Scene1WelcomeProps {
  selectedAnimal: AnimalId;
  onSelectAnimal: (id: AnimalId) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Scene1Welcome: React.FC<Scene1WelcomeProps> = ({
  selectedAnimal,
  onSelectAnimal,
  onNext,
  onBack,
}) => {
  const currentAnimal = ANIMALS[selectedAnimal] || ANIMALS.gajah;

  const narrationText =
    'Halo sahabat kecil! Selamat datang di Safari Hewan. Hari ini kita akan menjelajah alam bebas, mendengar suara hewan yang unik, dan bergerak bersama!';

  const getDiscoveryResponse = (id: AnimalId) => {
    switch (id) {
      case 'gajah':
        return '🎉 Pilihan hebat! Ayo langkahkan kaki kita menemui sahabat Gajah yang besar, berbelalai panjang, dan ramah!';
      case 'kelinci':
        return '🎉 Pilihan hebat! Ayo langkahkan kaki kita menemui sahabat Kelinci yang lucu, berbulu halus, dan lincah!';
      case 'bebek':
        return '🎉 Pilihan hebat! Ayo langkahkan kaki kita menemui sahabat Bebek yang pandai berenang dan bersuara kwek-kwek!';
      case 'burung':
        return '🎉 Pilihan hebat! Ayo langkahkan kaki kita menemui sahabat Burung yang bersayap indah dan berkicau merdu!';
      default:
        return '🎉 Pilihan hebat! Ayo langkahkan kaki kita menjelajahi sahabat hewan!';
    }
  };

  const handleSelectAnimal = (id: AnimalId) => {
    onSelectAnimal(id);
    soundEngine.synthesizeSound('pop');
  };

  const handleNext = () => {
    soundEngine.synthesizeSound('pop');
    onNext();
  };

  return (
    <div className="scene-view scene-gateway-stage">
      {/* Scene Header with Storybook Ribbon */}
      <div className="scene-stage-header">
        <span className="scene-step-tag">Adegan 1 dari 6</span>
        <h2 className="scene-story-heading">Selamat Datang di Gerbang Safari!</h2>
      </div>

      {/* Safari Gate Landscape Visual */}
      <div className="gateway-visual-centerpiece">
        <SafariGateSvg size="100%" className="gateway-illustration-svg" />
      </div>

      {/* Storybook Narration Scroll */}
      <div className="story-dialogue-parchment">
        <div className="parchment-inner">
          <p className="story-speaker-text">
            "Halo sahabat kecil! Selamat datang di Safari Hewan. Hari ini kita akan menjelajah alam bebas, mendengar suara hewan yang unik, dan bergerak bersama!"
          </p>
          <div className="parchment-audio-row">
            <AudioButton
              label="Dengarkan Guru Membaca"
              replayLabel="Dengarkan Lagi"
              sublabel="Suara Ramah Ibu Guru"
              narrationPath="/audio/narration/narration-scene1-gateway.mp3"
              narrationText={narrationText}
              variant="secondary"
            />
          </div>
        </div>
      </div>

      {/* Discovery Prompt: Interactive Animal Discovery Tokens */}
      <div className="discovery-prompt-card">
        <h3 className="discovery-prompt-title" id="curious-animal-label">
          ✨ Hewan apa yang paling ingin kamu temui hari ini?
        </h3>
        <p className="discovery-prompt-hint">Sentuh salah satu teman hewan di bawah ini:</p>

        <div
          className="discovery-tokens-grid"
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
                className={`discovery-token-btn ${isSelected ? 'is-selected' : ''}`}
                style={{ '--token-color': animal.color } as React.CSSProperties}
              >
                <div className="token-icon-disc">
                  <span className="token-emoji">{animal.badge.split(' ')[0]}</span>
                </div>
                <span className="token-name">{animal.name}</span>
                {isSelected && <span className="token-checkmark" aria-hidden="true">✓ Dipilih</span>}
              </button>
            );
          })}
        </div>

        {selectedAnimal && (
          <div className="discovery-success-bubble" role="status" aria-live="polite">
            <span>{getDiscoveryResponse(selectedAnimal)}</span>
          </div>
        )}
      </div>

      {/* Scene Navigation */}
      <div className="scene-storybook-nav">
        <button
          type="button"
          onClick={onBack}
          className="btn-story-nav btn-story-back"
          aria-label="Kembali ke Halaman Pembuka"
        >
          ← Kembali
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="btn-story-nav btn-story-next"
          aria-label={`Lanjut ke Adegan 2: Berkenalan dengan ${currentAnimal.name}`}
        >
          <span>Lanjut ke Sahabat {currentAnimal.name}</span>
          <span aria-hidden="true">➔</span>
        </button>
      </div>
    </div>
  );
};
