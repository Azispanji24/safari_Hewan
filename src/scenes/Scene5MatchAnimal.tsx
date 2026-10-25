import React, { useState } from 'react';
import { ElephantSvg, RabbitSvg, DuckSvg } from '../assets/illustrations';
import { FeedbackToast } from '../components/FeedbackToast';
import { soundEngine } from '../utils/soundEngine';
import type { FeedbackState } from '../types';

interface Scene5MatchAnimalProps {
  onNext: () => void;
  onBack: () => void;
}

interface MatchQuestion {
  id: number;
  animalName: string;
  syllables: string;
  illustration: React.ReactNode;
  hint: string;
  options: string[];
}

export const Scene5MatchAnimal: React.FC<Scene5MatchAnimalProps> = ({ onNext, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState>({
    type: 'idle',
    message: '',
  });

  const questions: MatchQuestion[] = [
    {
      id: 1,
      animalName: 'Gajah',
      syllables: 'Ga - jah',
      illustration: <ElephantSvg size="100%" />,
      hint: 'Hewan berbadan besar dengan belalai panjang.',
      options: ['Bebek', 'Gajah', 'Kelinci'],
    },
    {
      id: 2,
      animalName: 'Kelinci',
      syllables: 'Ke - lin - ci',
      illustration: <RabbitSvg size="100%" />,
      hint: 'Hewan berbulu halus dengan dua telinga panjang.',
      options: ['Kelinci', 'Burung', 'Gajah'],
    },
    {
      id: 3,
      animalName: 'Bebek',
      syllables: 'Be - bek',
      illustration: <DuckSvg size="100%" />,
      hint: 'Hewan berparuh pipih yang suka berenang di air.',
      options: ['Burung', 'Kelinci', 'Bebek'],
    },
  ];

  const currentQ = questions[currentQuestionIndex];
  const isAllCompleted = completedQuestions.length === questions.length;

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);

    if (option === currentQ.animalName) {
      if (!completedQuestions.includes(currentQ.id)) {
        setCompletedQuestions(prev => [...prev, currentQ.id]);
      }
      setFeedback({
        type: 'correct',
        message: 'Tepat sekali! Luar biasa! ⭐',
        submessage: `Ini adalah kartu kata "${currentQ.animalName}" (${currentQ.syllables}).`,
      });
      soundEngine.playSound('/audio/success-chime.wav', { fallbackType: 'chime' });
    } else {
      setFeedback({
        type: 'incorrect',
        message: 'Ayo coba lagi, kamu pasti bisa! 💡',
        submessage: `Petunjuk: ${currentQ.hint}`,
      });
      soundEngine.synthesizeSound('pop');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setFeedback({ type: 'idle', message: '' });
      soundEngine.synthesizeSound('pop');
    }
  };

  const handleNext = () => {
    soundEngine.synthesizeSound('pop');
    onNext();
  };

  return (
    <div className="scene-view scene-matching-notebook-stage">
      {/* Scene Header */}
      <div className="scene-stage-header">
        <span className="scene-step-tag">Adegan 5 dari 6</span>
        <h2 className="scene-story-heading">Buku Catatan Safari: Pasangkan Nama Hewan</h2>
      </div>

      {/* Tracker Banner */}
      <div className="notebook-tracker-banner">
        <div className="tracker-paw-group">
          <span className="tracker-label">
            Tantangan {currentQuestionIndex + 1} dari {questions.length}
          </span>
          <div className="tracker-compass-dots" aria-label={`Pertanyaan ${currentQuestionIndex + 1} dari 3`}>
            {questions.map((q, idx) => {
              const isDone = completedQuestions.includes(q.id);
              const isCurrent = idx === currentQuestionIndex;
              return (
                <span
                  key={q.id}
                  className={`compass-dot ${isDone ? 'is-done' : isCurrent ? 'is-current' : ''}`}
                  title={`Pertanyaan ${idx + 1}`}
                >
                  {isDone ? '⭐' : idx + 1}
                </span>
              );
            })}
          </div>
        </div>
        <span className="tracker-subhint">Sentuh balok nama yang cocok dengan gambar!</span>
      </div>

      {/* Instruction Ribbon */}
      <div className="notebook-instruction-ribbon">
        <span className="ribbon-icon" aria-hidden="true">👀</span>
        <p className="instruction-text">
          Perhatikan gambar teman safari di bawah ini, lalu pilih <strong>nama yang tepat</strong>!
        </p>
      </div>

      {/* Field Notebook Double-Page Layout */}
      <div className="matching-notebook-desk">
        {/* Left Side: Illustrated Animal Polaroid Display */}
        <div className="notebook-polaroid-side">
          <div className="polaroid-pin-badge" aria-hidden="true">📌 Sketsa Hewan</div>
          <div className="polaroid-art-frame">
            {currentQ.illustration}
          </div>
          <div className="polaroid-hint-strip">
            <span className="hint-icon" aria-hidden="true">💡</span>
            <span className="hint-text">{currentQ.hint}</span>
          </div>
        </div>

        {/* Right Side: Tactile Wooden Name Blocks */}
        <div className="notebook-blocks-side">
          <h3 className="blocks-heading" id="word-block-options-label">
            Pilih Balok Nama Hewan:
          </h3>

          <div
            className="wooden-blocks-grid"
            role="radiogroup"
            aria-labelledby="word-block-options-label"
          >
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQ.animalName;
              const stateClass = isSelected
                ? isCorrect
                  ? 'is-correct-block'
                  : 'is-incorrect-block'
                : '';

              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectOption(opt)}
                  className={`btn-wooden-option ${stateClass} ${isSelected ? 'is-selected' : ''}`}
                >
                  <span className="wooden-carved-text">{opt}</span>
                  {isSelected && (
                    <span className="wooden-status-badge" aria-hidden="true">
                      {isCorrect ? '✓ Tepat Sekali!' : '✕ Coba Lagi'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Question Button if correct */}
          {selectedOption === currentQ.animalName && currentQuestionIndex < questions.length - 1 && (
            <div className="next-challenge-container">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="btn-next-challenge-hero"
                aria-label="Lanjut ke tantangan hewan berikutnya"
              >
                <span>Tantangan Hewan Berikutnya</span>
                <span aria-hidden="true">➔</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Toast */}
      <FeedbackToast feedback={feedback} />

      {/* Completion Celebration Alert */}
      {isAllCompleted && (
        <div className="notebook-all-done-banner" role="status">
          <span className="celebration-badge-emoji" aria-hidden="true">🎉</span>
          <div className="completion-copy">
            <h4 className="completion-title">Hebat! Semua Hewan Berhasil Dipasangkan!</h4>
            <p className="completion-subtext">
              Kamu sudah mengenali Gajah, Kelinci, dan Bebek dengan sangat baik. Ayo kita pilih hewan favoritmu di akhir petualangan!
            </p>
          </div>
        </div>
      )}

      {/* Storybook Navigation */}
      <div className="scene-storybook-nav">
        <button
          type="button"
          onClick={onBack}
          className="btn-story-nav btn-story-back"
          aria-label="Kembali ke Adegan 4"
        >
          ← Kembali
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`btn-story-nav btn-story-next ${isAllCompleted ? 'btn-highlight-ready' : ''}`}
          aria-label="Lanjut ke Adegan 6: Hewan Favorit dan Refleksi"
        >
          <span>{isAllCompleted ? 'Lanjut ke Hewan Favorit' : 'Lanjut ke Refleksi'}</span>
          <span aria-hidden="true">➔</span>
        </button>
      </div>
    </div>
  );
};
