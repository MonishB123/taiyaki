import React from 'react';
import './StudyComplete.css';

function StudyComplete({ results, totalCards, onRestart, onStudyMissed, onExit }) {
  const correctCount = results.correct.length;
  const incorrectCount = results.incorrect.length;
  const percentage = Math.round((correctCount / totalCards) * 100);

  return (
    <main className="study-complete">
      <div className="complete-card">
        <div className="complete-icon">🎉</div>
        <h1 className="complete-title">Session Complete!</h1>
        
        <div className="score-circle">
          <span className="score-percentage">{percentage}%</span>
        </div>

        <div className="score-breakdown">
          <div className="score-item correct">
            <span className="score-label">Got It</span>
            <span className="score-value">{correctCount}</span>
          </div>
          <div className="score-divider"></div>
          <div className="score-item incorrect">
            <span className="score-label">Missed</span>
            <span className="score-value">{incorrectCount}</span>
          </div>
        </div>

        {incorrectCount > 0 && (
          <div className="missed-cards">
            <h3 className="missed-title">Cards to Review</h3>
            <ul className="missed-list">
              {results.incorrect.map((card, index) => (
                <li key={index} className="missed-item">
                  <span className="missed-front">{card.front}</span>
                  <span className="missed-arrow">→</span>
                  <span className="missed-back">{card.back}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="complete-actions">
          {incorrectCount > 0 && (
            <button 
              className="action-button study-missed"
              onClick={onStudyMissed}
            >
              Study Missed ({incorrectCount})
            </button>
          )}
          <button 
            className="action-button restart"
            onClick={onRestart}
          >
            Restart All
          </button>
          <button 
            className="action-button exit"
            onClick={onExit}
          >
            Back to Deck
          </button>
        </div>
      </div>
    </main>
  );
}

export default StudyComplete;