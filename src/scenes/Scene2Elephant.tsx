import React, { useState } from 'react';
import { AnimalIllustration } from '../assets/illustrations';
import { AudioButton } from '../components/AudioButton';
import { ANIMALS, ANIMAL_LIST } from '../data/animals';
import { soundEngine } from '../utils/soundEngine';
import { audioController } from '../utils/audioController';
import type { AnimalId } from '../types';

interface Scene2ElephantProps {
  selectedAnimal?: AnimalId;
  onSelectAnimal?: (id: AnimalId) => void;
  onNext: () => void;
  onBack: () => void;
}

interface ObservationPart {
  id: 'part1' | 'part2';
  icon: string;
  label: string;
  dialogue: string;
  ttsText: string;
  audioPath?: string;
  highlightKey: 'trunk' | 'ears' | 'legs' | 'feet' | 'wings' | 'beak' | 'all';
}

interface AnimalObservationData {
  part1: ObservationPart;
  part2: ObservationPart;
  storyNarration: string;
  narrationAudioPath?: string;
  signatureSoundPath: string;
  signatureSoundLabel: string;
}

const OBSERVATION_DATA: Record<AnimalId, AnimalObservationData> = {
  gajah: {
    part1: {
      id: 'part1',
      icon: '🐘',
      label: 'Tunjuk Belalai Panjang',
      dialogue: '🌟 Pintar sekali! Itu belalai gajah yang panjang. Gajah menggunakan belalainya untuk minum air dan mengambil makanan.',
      ttsText: 'Pintar sekali! Itu belalai gajah yang panjang. Gajah menggunakan belalainya untuk minum air dan mengambil makanan.',
      audioPath: '/audio/narration/narration-scene2-trunk.mp3',
      highlightKey: 'trunk',
    },
    part2: {
      id: 'part2',
      icon: '👂',
      label: 'Tunjuk Telinga Lebar',
      dialogue: '🌟 Hebat! Itu telinga gajah yang lebar. Telinganya berguna untuk mendengar suara dari jauh dan mengipasi tubuhnya agar tetap sejuk.',
      ttsText: 'Hebat! Itu telinga gajah yang lebar. Telinganya berguna untuk mendengar suara dari jauh dan mengipasi tubuhnya agar tetap sejuk.',
      audioPath: '/audio/narration/narration-scene2-ears.mp3',
      highlightKey: 'ears',
    },
    storyNarration:
      'Wah, lihat siapa yang datang! Ini adalah gajah. Gajah berbadan besar sekali! Coba perhatikan, gajah memiliki belalai yang panjang dan telinga yang sangat lebar. Ayo, coba sentuh belalai atau telinganya!',
    narrationAudioPath: '/audio/narration/narration-scene2-elephant.mp3',
    signatureSoundPath: '/audio/gajah-trumpet.wav',
    signatureSoundLabel: 'Dengarkan Suara Terompet Belalai',
  },
  kelinci: {
    part1: {
      id: 'part1',
      icon: '🐰',
      label: 'Tunjuk Telinga Panjang',
      dialogue: '🌟 Pintar sekali! Kelinci memiliki dua telinga panjang yang tegak ke atas untuk mendengar suara langkah kaki dari jauh.',
      ttsText: 'Pintar sekali! Kelinci memiliki dua telinga panjang yang tegak ke atas untuk mendengar suara langkah kaki dari jauh.',
      audioPath: '/audio/narration/narration-scene2-rabbit-ears.mp3',
      highlightKey: 'ears',
    },
    part2: {
      id: 'part2',
      icon: '🥕',
      label: 'Tunjuk Kaki Melompat',
      dialogue: '🌟 Hebat! Kaki belakang kelinci sangat kuat dan lentur, siap melompat riang: hop, hop, hop!',
      ttsText: 'Hebat! Kaki belakang kelinci sangat kuat dan lentur, siap melompat riang: hop, hop, hop!',
      audioPath: '/audio/narration/narration-scene2-rabbit-legs.mp3',
      highlightKey: 'legs',
    },
    storyNarration:
      'Wah, lihat kelinci mungil yang lincah! Bulunya sangat halus dan suka melompat-lompat gembira. Coba perhatikan telinganya yang panjang dan kakinya yang kuat. Ayo sentuh telinga atau kakinya!',
    narrationAudioPath: '/audio/narration/narration-scene2-rabbit.mp3',
    signatureSoundPath: '/audio/kelinci-hop.mp3',
    signatureSoundLabel: 'Dengarkan Suara Lompatan Kelinci',
  },
  bebek: {
    part1: {
      id: 'part1',
      icon: '🦆',
      label: 'Tunjuk Paruh Pipih',
      dialogue: '🌟 Pintar sekali! Paruh bebek bentuknya pipih dan lebar, sangat cocok untuk menyaring makanan di dalam air.',
      ttsText: 'Pintar sekali! Paruh bebek bentuknya pipih dan lebar, sangat cocok untuk menyaring makanan di dalam air.',
      audioPath: '/audio/narration/narration-scene2-duck-beak.mp3',
      highlightKey: 'beak',
    },
    part2: {
      id: 'part2',
      icon: '🌊',
      label: 'Tunjuk Kaki Berselaput',
      dialogue: '🌟 Hebat! Kaki bebek memiliki selaput renang seperti dayung kecil, membuat bebek pandai berenang kwek-kwek di danau!',
      ttsText: 'Hebat! Kaki bebek memiliki selaput renang seperti dayung kecil, membuat bebek pandai berenang kwek-kwek di danau!',
      audioPath: '/audio/narration/narration-scene2-duck-feet.mp3',
      highlightKey: 'feet',
    },
    storyNarration:
      'Kwek kwek kwek! Lihat sahabat bebek yang ramah berenang di air! Bebek punya paruh pipih dan kaki berselaput untuk mendayung. Ayo sentuh paruh atau kakinya!',
    narrationAudioPath: '/audio/narration/narration-scene2-duck.mp3',
    signatureSoundPath: '/audio/bebek-quack.mp3',
    signatureSoundLabel: 'Dengarkan Suara Bebek Kwek-Kwek',
  },
  burung: {
    part1: {
      id: 'part1',
      icon: '🐦',
      label: 'Tunjuk Sayap Indah',
      dialogue: '🌟 Pintar sekali! Burung punya sepasang sayap berbulu indah yang dikepakkan untuk terbang bebas meluncur di langit!',
      ttsText: 'Pintar sekali! Burung punya sepasang sayap berbulu indah yang dikepakkan untuk terbang bebas meluncur di langit!',
      audioPath: '/audio/narration/narration-scene2-bird-wings.mp3',
      highlightKey: 'wings',
    },
    part2: {
      id: 'part2',
      icon: '🎶',
      label: 'Tunjuk Paruh Merdu',
      dialogue: '🌟 Hebat! Paruh kecil burung berguna untuk mematuk biji-bijian dan berkicau merdu: cuit cuit cuit!',
      ttsText: 'Hebat! Paruh kecil burung berguna untuk mematuk biji-bijian dan berkicau merdu: cuit cuit cuit!',
      audioPath: '/audio/narration/narration-scene2-bird-beak.mp3',
      highlightKey: 'beak',
    },
    storyNarration:
      'Cuit cuit cuit! Burung kecil yang cantik sedang bertengger di ranting pohon! Sayapnya bisa dikepakkan untuk terbang tinggi. Ayo sentuh sayap atau paruhnya!',
    narrationAudioPath: '/audio/narration/narration-scene2-bird.mp3',
    signatureSoundPath: '/audio/burung-chirp.mp3',
    signatureSoundLabel: 'Dengarkan Kicauan Burung Merdu',
  },
};

export const Scene2Elephant: React.FC<Scene2ElephantProps> = ({
  selectedAnimal = 'gajah',
  onSelectAnimal,
  onNext,
  onBack,
}) => {
  const [activePart, setActivePart] = useState<'part1' | 'part2' | null>(null);
  const [observationNote, setObservationNote] = useState<string | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);

  const currentAnimal = ANIMALS[selectedAnimal] || ANIMALS.gajah;
  const currentObs = OBSERVATION_DATA[selectedAnimal] || OBSERVATION_DATA.gajah;

  const syllableParts = currentAnimal.syllables.split(/[-—]/).map((s) => s.trim());

  const handlePointPart = (partKey: 'part1' | 'part2') => {
    const part = currentObs[partKey];
    setActivePart(partKey);
    setObservationNote(part.dialogue);
    soundEngine.synthesizeSound('pop');
    audioController.playNarration(part.audioPath || part.ttsText, {
      fallbackText: part.ttsText,
    });
  };

  const handlePlaySignatureSound = () => {
    setIsPlayingSound(true);
    soundEngine.playSound(currentObs.signatureSoundPath, {
      onEnd: () => setIsPlayingSound(false),
    });
  };

  const handleSwitchAnimal = (newId: AnimalId) => {
    setActivePart(null);
    setObservationNote(null);
    soundEngine.synthesizeSound('pop');
    if (onSelectAnimal) {
      onSelectAnimal(newId);
    }
  };

  const handleNext = () => {
    soundEngine.synthesizeSound('pop');
    onNext();
  };

  const highlightKey = activePart ? currentObs[activePart].highlightKey : null;

  return (
    <div className="scene-view scene-character-hero-stage">
      {/* Scene Header */}
      <div className="scene-stage-header">
        <span className="scene-step-tag">Adegan 2 dari 6</span>
        <h2 className="scene-story-heading">Berkenalan dengan {currentAnimal.name}</h2>
      </div>

      {/* Quick Switcher Bar: Allows child/teacher to switch animal right here */}
      <div className="animal-quick-switcher" role="region" aria-label="Temui sahabat hewan lainnya">
        <span className="switcher-label">Sentuh untuk temui sahabat lain:</span>
        <div className="switcher-chips-row" role="tablist">
          {ANIMAL_LIST.map((animal) => {
            const isActive = animal.id === currentAnimal.id;
            return (
              <button
                key={animal.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSwitchAnimal(animal.id as AnimalId)}
                className={`quick-switch-chip ${isActive ? 'is-active' : ''}`}
                style={{ '--chip-accent': animal.color } as React.CSSProperties}
              >
                <span className="chip-emoji">{animal.badge.split(' ')[0]}</span>
                <span className="chip-name">{animal.name}</span>
                {isActive && <span className="chip-check" aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Character Focus Stage */}
      <div className="character-spotlight-arena">
        {/* Animal Name & Syllable Reading Tiles */}
        <div className="character-name-badge-group">
          <h3 className="character-giant-name">{currentAnimal.name}</h3>
          <div
            className="syllable-tiles-row"
            aria-label={`Ejaan suku kata: ${currentAnimal.syllables}`}
          >
            {syllableParts.map((syllable, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="syllable-divider">—</span>}
                <span className="syllable-tile">{syllable}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Large Dominant Character Illustration */}
        <div className="character-hero-display">
          <div className="character-glow-halo" aria-hidden="true" />
          <AnimalIllustration
            animalId={currentAnimal.id}
            size="100%"
            highlightPart={highlightKey}
            className={`character-hero-svg ${currentAnimal.id}-hero`}
          />
        </div>

        {/* Observation Interaction Station */}
        <div className="interactive-observation-station">
          <p className="observation-lead-prompt">
            👀 <strong>Ayo Amati:</strong> Coba sentuh bagian tubuh {currentAnimal.name} di bawah ini!
          </p>

          <div className="observation-buttons-row">
            <button
              type="button"
              onClick={() => handlePointPart('part1')}
              className={`btn-observe-feature ${activePart === 'part1' ? 'is-active' : ''}`}
              aria-label={currentObs.part1.label}
            >
              <span className="feature-icon" aria-hidden="true">{currentObs.part1.icon}</span>
              <span className="feature-text">{currentObs.part1.label}</span>
            </button>

            <button
              type="button"
              onClick={() => handlePointPart('part2')}
              className={`btn-observe-feature ${activePart === 'part2' ? 'is-active' : ''}`}
              aria-label={currentObs.part2.label}
            >
              <span className="feature-icon" aria-hidden="true">{currentObs.part2.icon}</span>
              <span className="feature-text">{currentObs.part2.label}</span>
            </button>
          </div>

          {/* Signature Sound Button */}
          <div className="animal-signature-sound-row">
            <button
              type="button"
              onClick={handlePlaySignatureSound}
              className={`btn-animal-sound ${isPlayingSound ? 'is-playing' : ''}`}
              aria-label={currentObs.signatureSoundLabel}
            >
              <span className="sound-disc-icon" aria-hidden="true">
                {isPlayingSound ? '🔊' : '🎵'}
              </span>
              <span className="sound-disc-text">
                {isPlayingSound ? 'Sedang Bersuara...' : currentObs.signatureSoundLabel}
              </span>
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
            "{currentAnimal.characteristic}"
          </p>
          <div className="character-audio-wrapper">
            <AudioButton
              label={`Dengarkan Cerita ${currentAnimal.name}`}
              replayLabel="Dengarkan Lagi"
              sublabel="Suara Ramah Ibu Guru"
              narrationPath={currentObs.narrationAudioPath}
              narrationText={currentObs.storyNarration}
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
