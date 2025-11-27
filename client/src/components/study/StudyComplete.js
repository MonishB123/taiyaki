import React from 'react';
import './StudyComplete.css';

function StudyComplete({ totalCards, correctCount, incorrectCount, onRestart, onExit }) {
  const percentage = totalCards > 0 ? Math.round((correctCount / totalCards) * 100) : 0;

  return (
    <div className="study-complete">
      <div className="complete-icon">🎉</div>
      <h2 className="complete-title">Study Complete!</h2>
      <p className="complete-message">
        Great job! You've reviewed all {totalCards} cards.
      </p>

      <div className="study-stats">
        <div className="stat-item correct">
          <span className="stat-value">{correctCount}</span>
          <span className="stat-label">Got It</span>
        </div>
        <div className="stat-item incorrect">
          <span className="stat-value">{incorrectCount}</span>
          <span className="stat-label">Didn't Know</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{percentage}%</span>
          <span className="stat-label">Score</span>
        </div>
      </div>

      <div className="complete-actions">
        <button className="study-again-button" onClick={onRestart}>
          Study Again
        </button>
        <button className="back-button" onClick={onExit}>
          Back to Deck
        </button>
      </div>
    </div>
  );
}

export default StudyComplete;