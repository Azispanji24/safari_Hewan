import React, { useState } from 'react';
import { ElephantSvg, DuckSvg, RabbitSvg } from '../assets/illustrations';
import { AudioButton } from '../components/AudioButton';
import { FeedbackToast } from '../components/FeedbackToast';
import { soundEngine } from '../utils/soundEngine';
import type { AnimalId, FeedbackState } from '../types';

interface Scene3GuessSoundProps {
  onNext: () => void;
  onBack: () => void;
}

export const Scene3GuessSound: React.FC<Scene3GuessSoundProps> = ({ onNext, onBack }) => {
  const [selectedChoice, setSelectedChoice] = useState<AnimalId | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [isMysterySoundPlaying, setIsMysterySoundPlaying] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<FeedbackState>({
    type: 'idle',
    message: '',
  });

  const correctAnswer: AnimalId = 'bebek';

  const choices: { id: AnimalId; name: string; habitat: string; illustration: React.ReactNode }[] = [
    {
      id: 'gajah',
      name: 'Gajah',
      habitat: 'Padang Rumput',
      illustration: <ElephantSvg size="100%" />,
    },
    {
      id: 'bebek',
      name: 'Bebek',
      habitat: 'Danau Air',
      illustration: <DuckSvg size="100%" />,
    },
    {
      id: 'kelinci',
      name: 'Kelinci',
      habitat: 'Kebun Wortel',
      illustration: <RabbitSvg size="100%" />,
    },
  ];

  const handleSelectChoice = (choiceId: AnimalId) => {
    setSelectedChoice(choiceId);

    if (choiceId === correctAnswer) {
      setIsAnswerCorrect(true);
      setFeedback({
        type: 'correct',
        message: 'Hebat sekali! Pilihanmu tepat! ⭐',
        submessage: 'Itu adalah suara Bebek: "Kwek... kwek... kwek!" Bebek suka berenang riang di danau.',
      });
      // Play teacher's warm enthusiastic feedback voice
      soundEngine.playSound('/audio/narration/narration-scene3-correct.mp3', {
        fallbackType: 'chime',
      });
    } else {
      setIsAnswerCorrect(false);
      setFeedback({
        type: 'incorrect',
        message: 'Hampir benar! Yuk kita dengarkan lagi suaranya 💡',
        submessage: 'Dengarkan baik-baik suaranya yang berbunyi kwek-kwek, lalu coba pilih lagi ya.',
      });
      soundEngine.synthesizeSound('pop');
    }
  };

  const handleNext = () => {
    soundEngine.synthesizeSound('pop');
    onNext();
  };

  return (
    <div className="scene-view scene-sound-listening-stage">
      {/* Scene Header */}
      <div className="scene-stage-header">
        <span className="scene-step-tag">Adegan 3 dari 6</span>
        <h2 className="scene-story-heading">Tebak Suara Hewan</h2>
      </div>

      {/* Main Sound Stage Arena */}
      <div className="sound-stage-arena">
        {/* Step 1: Listening Pod */}
        <div className="listening-pod-card">
          <div className="listening-pod-header">
            <span className="pod-step-badge">Langkah 1</span>
            <p className="pod-prompt-text">
              Dengarkan suara hewan misterius di bawah ini:
            </p>
          </div>

          <div className="listening-teacher-instruction">
            <AudioButton
              label="Dengarkan Aba-Aba Guru"
              replayLabel="Ulangi Aba-Aba"
              sublabel="Suara Ramah Ibu Guru"
              narrationPath="/audio/narration/narration-scene3-guess-sound.mp3"
              narrationText="Sekarang waktunya bermain tebak suara! Pasang telingamu dan dengarkan baik-baik ya. Suara hewan apakah ini? Pikirkan dulu, lalu sentuh hewan yang tepat!"
              variant="secondary"
            />
          </div>

          <div className="listening-button-center">
            <AudioButton
              label="Putar Suara Misteri"
              replayLabel="Putar Ulang Suara"
              sublabel="Dengarkan rekaman asli suara hewan"
              soundPath="/audio/bebek-quack.mp3"
              fallbackType="quack"
              size="large"
              variant="primary"
              onPlayStart={() => setIsMysterySoundPlaying(true)}
              onPlayEnd={() => setIsMysterySoundPlaying(false)}
            />
          </div>

          {/* Audio Visualizer Indicator: active only when mystery sound is playing */}
          <div
            className={`mystery-sound-visualizer ${isMysterySoundPlaying ? 'is-active' : ''}`}
            role="status"
            aria-live="polite"
          >
            <div className="visualizer-bars" aria-hidden="true">
              <span className="v-bar v-bar-1" />
              <span className="v-bar v-bar-2" />
              <span className="v-bar v-bar-3" />
              <span className="v-bar v-bar-4" />
              <span className="v-bar v-bar-5" />
            </div>
            <span className="visualizer-caption">
              {isMysterySoundPlaying
                ? '🔊 Suara sedang berbunyi... Dengarkan baik-baik ya!'
                : 'Sentuh tombol hijau di atas untuk memutar suara hewan misterius'}
            </span>
          </div>

          <div className="sound-accessible-caption">
            <span>Teks alternatif suara: <em>"Kwek... kwek... kwek!"</em></span>
          </div>
        </div>

        {/* Step 2: Animal Answer Vignettes */}
        <div className="sound-guessing-section">
          <div className="guessing-instruction-banner">
            <span className="pod-step-badge step-2-badge">Langkah 2</span>
            <p className="guessing-prompt-text">
              Hewan manakah yang menghasilkan suara kwek-kwek tersebut?
            </p>
          </div>

          <div className="animal-vignette-grid" role="radiogroup" aria-label="Pilihan hewan tebak suara">
            {choices.map((choice) => {
              const isSelected = selectedChoice === choice.id;
              const isTarget = choice.id === correctAnswer;
              const cardStateClass = isSelected
                ? isTarget
                  ? 'vignette-correct'
                  : 'vignette-incorrect'
                : '';

              return (
                <button
                  key={choice.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectChoice(choice.id)}
                  className={`animal-vignette-card ${cardStateClass} ${isSelected ? 'is-selected' : ''}`}
                  aria-label={`Pilih ${choice.name}`}
                >
                  <div className="vignette-art-frame">
                    {choice.illustration}
                  </div>
                  <div className="vignette-details">
                    <span className="vignette-name">{choice.name}</span>
                    <span className="vignette-habitat">{choice.habitat}</span>
                    {isSelected && (
                      <span className="vignette-status-badge" aria-hidden="true">
                        {isTarget ? '✓ Benar Sekali!' : 'Coba Lagi Ya'}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback message */}
        <FeedbackToast feedback={feedback} />
      </div>

      {/* Navigation */}
      <div className="scene-storybook-nav">
        <button
          type="button"
          onClick={onBack}
          className="btn-story-nav btn-story-back"
          aria-label="Kembali ke Adegan 2"
        >
          ← Kembali
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`btn-story-nav btn-story-next ${isAnswerCorrect ? 'btn-highlight-ready' : ''}`}
          aria-label="Lanjut ke Adegan 4: Ayo Bergerak Seperti Hewan"
        >
          <span>{isAnswerCorrect ? 'Lanjut ke Ayo Bergerak!' : 'Lewati & Lanjut'}</span>
          <span aria-hidden="true">➔</span>
        </button>
      </div>
    </div>
  );
};
