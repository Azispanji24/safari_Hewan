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
    <div className="scene-view scene-5-view">
      <div className="scene-card">
        {/* Scene Indicator */}
        <div className="scene-badge-header">
          <span className="scene-step-pill">Adegan 5 dari 6</span>
          <h2 className="scene-heading">Pasangkan Hewan dan Namanya</h2>
        </div>

        {/* Question Counter Indicator */}
        <div className="question-tracker-bar">
          <span className="question-count-text">
            Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
          </span>
          <div className="question-dots-row" aria-hidden="true">
            {questions.map((q, idx) => (
              <span
                key={q.id}
                className={`dot ${completedQuestions.includes(q.id) ? 'is-done' : idx === currentQuestionIndex ? 'is-current' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Instruction */}
        <div className="match-instruction-banner">
          <p className="instruction-lead">
            👀 Perhatikan gambar hewan di bawah ini, lalu klik <strong>nama hewan yang tepat</strong>!
          </p>
        </div>

        {/* Animal Display Card */}
        <div className="match-question-layout">
          <div className="match-animal-target">
            <div className="match-illustration-frame">
              {currentQ.illustration}
            </div>
            <span className="match-hint-pill">{currentQ.hint}</span>
          </div>

          {/* Word Name Options */}
          <div className="match-options-grid" role="radiogroup" aria-label="Pilihan nama hewan">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQ.animalName;
              const stateClass = isSelected
                ? isCorrect
                  ? 'is-correct'
                  : 'is-incorrect'
                : '';

              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectOption(opt)}
                  className={`btn-name-option ${stateClass} ${isSelected ? 'is-selected' : ''}`}
                >
                  <span className="option-name-text">{opt}</span>
                  {isSelected && (
                    <span className="option-mark" aria-hidden="true">
                      {isCorrect ? '✓ Benar!' : '✕ Coba lagi'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback message */}
        <FeedbackToast feedback={feedback} />

        {/* Question Advancement or Final Completion */}
        {selectedOption === currentQ.animalName && currentQuestionIndex < questions.length - 1 && (
          <div className="next-question-container">
            <button
              type="button"
              onClick={handleNextQuestion}
              className="btn-next-question"
              aria-label="Lanjut ke pertanyaan berikutnya"
            >
              <span>Pertanyaan Berikutnya</span>
              <span aria-hidden="true">➔</span>
            </button>
          </div>
        )}

        {isAllCompleted && (
          <div className="match-completion-alert" role="status">
            <span className="alert-emoji" aria-hidden="true">🎉</span>
            <div>
              <strong>Luar Biasa! Semua Hewan Berhasil Dipasangkan!</strong>
              <p>Kamu sudah mengenali Gajah, Kelinci, dan Bebek dengan sangat baik.</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="scene-nav-actions">
          <button
            type="button"
            onClick={onBack}
            className="btn-nav btn-nav-back"
            aria-label="Kembali ke Adegan 4"
          >
            ← Kembali
          </button>

          <button
            type="button"
            onClick={handleNext}
            className={`btn-nav btn-nav-next ${isAllCompleted ? 'btn-highlight-ready' : ''}`}
            aria-label="Lanjut ke Adegan 6: Hewan Favorit dan Refleksi"
          >
            <span>{isAllCompleted ? 'Lanjut ke Hewan Favorit' : 'Lanjut ke Refleksi'}</span>
            <span aria-hidden="true">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
