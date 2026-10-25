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
  const [feedback, setFeedback] = useState<FeedbackState>({
    type: 'idle',
    message: '',
  });

  const correctAnswer: AnimalId = 'bebek';

  const choices: { id: AnimalId; name: string; illustration: React.ReactNode }[] = [
    {
      id: 'gajah',
      name: 'Gajah',
      illustration: <ElephantSvg size="100%" />,
    },
    {
      id: 'bebek',
      name: 'Bebek',
      illustration: <DuckSvg size="100%" />,
    },
    {
      id: 'kelinci',
      name: 'Kelinci',
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
        submessage: 'Itu adalah suara Bebek: "Kwek... kwek... kwek!" Bebek suka berenang di danau.',
      });
      soundEngine.playSound('/audio/success-chime.wav', { fallbackType: 'chime' });
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
    <div className="scene-view scene-3-view">
      <div className="scene-card">
        {/* Scene Indicator */}
        <div className="scene-badge-header">
          <span className="scene-step-pill">Adegan 3 dari 6</span>
          <h2 className="scene-heading">Tebak Suara Hewan</h2>
        </div>

        {/* Clear Instruction */}
        <div className="sound-quiz-instruction">
          <p className="instruction-lead">
            🎧 <strong>Langkah 1:</strong> Klik tombol hijau di bawah untuk mendengarkan suara hewannya!
          </p>
        </div>

        {/* Functional Audio Player Control */}
        <div className="sound-player-center">
          <AudioButton
            label="Putar Suara Misteri"
            replayLabel="Putar Ulang Suara"
            sublabel="Dengarkan suara hewan asli"
            soundPath="/audio/bebek-quack.mp3"
            fallbackType="quack"
            size="large"
            variant="primary"
          />
          <p className="sound-subtext-accessible">
            <em>Teks suara alternatif: "Kwek... kwek... kwek!"</em>
          </p>
        </div>

        {/* Choice Instruction */}
        <div className="choices-instruction">
          <p className="instruction-lead">
            👆 <strong>Langkah 2:</strong> Hewan manakah yang menghasilkan suara tersebut?
          </p>
        </div>

        {/* 3 Large Animal Choice Cards */}
        <div className="animal-cards-grid" role="radiogroup" aria-label="Pilihan hewan tebak suara">
          {choices.map((choice) => {
            const isSelected = selectedChoice === choice.id;
            const isTarget = choice.id === correctAnswer;
            const cardStateClass = isSelected
              ? isTarget
                ? 'choice-correct'
                : 'choice-incorrect'
              : '';

            return (
              <button
                key={choice.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectChoice(choice.id)}
                className={`choice-card ${cardStateClass} ${isSelected ? 'is-selected' : ''}`}
                aria-label={`Pilih ${choice.name}`}
              >
                <div className="card-illustration-box">
                  {choice.illustration}
                </div>
                <div className="card-footer-title">
                  <span className="card-name">{choice.name}</span>
                  {isSelected && (
                    <span className="card-indicator" aria-hidden="true">
                      {isTarget ? '✓ Benar' : 'Coba lagi'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Supportive Feedback Toast */}
        <FeedbackToast feedback={feedback} />

        {/* Navigation */}
        <div className="scene-nav-actions">
          <button
            type="button"
            onClick={onBack}
            className="btn-nav btn-nav-back"
            aria-label="Kembali ke Adegan 2"
          >
            ← Kembali
          </button>

          <button
            type="button"
            onClick={handleNext}
            className={`btn-nav btn-nav-next ${isAnswerCorrect ? 'btn-highlight-ready' : ''}`}
            aria-label="Lanjut ke Adegan 4: Ayo Bergerak Seperti Hewan"
          >
            <span>{isAnswerCorrect ? 'Lanjut ke Ayo Bergerak!' : 'Lewati & Lanjut'}</span>
            <span aria-hidden="true">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
