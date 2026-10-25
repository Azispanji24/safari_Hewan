import React from 'react';
import type { SceneId } from '../types';

interface ProgressBarProps {
  currentScene: SceneId;
  onNavigate?: (scene: SceneId) => void;
}

const SCENE_STEPS: { id: SceneId; title: string; shortTitle: string; icon: string }[] = [
  { id: 'scene1', title: 'Selamat Datang', shortTitle: '1. Safari', icon: '🌿' },
  { id: 'scene2', title: 'Kenal Gajah', shortTitle: '2. Gajah', icon: '🐘' },
  { id: 'scene3', title: 'Tebak Suara', shortTitle: '3. Suara', icon: '🔊' },
  { id: 'scene4', title: 'Ayo Bergerak', shortTitle: '4. Gerak', icon: '🏃' },
  { id: 'scene5', title: 'Pasangkan Hewan', shortTitle: '5. Pasang', icon: '🧩' },
  { id: 'scene6', title: 'Hewan Favorit', shortTitle: '6. Refleksi', icon: '⭐' },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentScene, onNavigate }) => {
  const currentIndex = SCENE_STEPS.findIndex(s => s.id === currentScene);
  const activeStepNum = currentIndex >= 0 ? currentIndex + 1 : 0;

  if (currentScene === 'welcome') {
    return null;
  }

  return (
    <nav
      className="progress-container"
      aria-label="Kemajuan Petualangan Safari"
      role="navigation"
    >
      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-fill"
          style={{ width: `${((activeStepNum - 1) / (SCENE_STEPS.length - 1)) * 100}%` }}
        />
      </div>

      <ol className="progress-steps-list">
        {SCENE_STEPS.map((step, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < activeStepNum;
          const isActive = stepNumber === activeStepNum;

          return (
            <li
              key={step.id}
              className={`progress-step-item ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
            >
              <button
                type="button"
                onClick={() => onNavigate && isCompleted ? onNavigate(step.id) : undefined}
                disabled={!isCompleted && !isActive}
                className="progress-step-btn"
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Langkah ${stepNumber} dari 6: ${step.title}. ${isActive ? 'Sedang dibuka' : isCompleted ? 'Sudah selesai, klik untuk kembali' : 'Belum terbuka'}`}
              >
                <span className="step-circle">
                  {isCompleted ? '✓' : step.icon}
                </span>
                <span className="step-label">{step.shortTitle}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
