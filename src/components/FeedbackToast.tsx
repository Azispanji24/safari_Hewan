import React from 'react';
import type { FeedbackState } from '../types';

interface FeedbackToastProps {
  feedback: FeedbackState;
  onDismiss?: () => void;
}

export const FeedbackToast: React.FC<FeedbackToastProps> = ({ feedback, onDismiss }) => {
  if (feedback.type === 'idle' || !feedback.message) {
    return null;
  }

  const isSuccess = feedback.type === 'correct';
  const isIncorrect = feedback.type === 'incorrect';

  return (
    <aside
      className={`feedback-toast feedback-${feedback.type}`}
      role="status"
      aria-live="polite"
    >
      <div className="feedback-icon" aria-hidden="true">
        {isSuccess ? '🌟' : isIncorrect ? '🌱' : '💡'}
      </div>
      <div className="feedback-body">
        <strong className="feedback-title">{feedback.message}</strong>
        {feedback.submessage && (
          <p className="feedback-submessage">{feedback.submessage}</p>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="feedback-dismiss-btn"
          aria-label="Tutup pesan bantuan"
        >
          ✕
        </button>
      )}
    </aside>
  );
};
