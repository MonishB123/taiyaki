import React from 'react';
import './QuizResult.css';

function QuizResult({ totalQuestions, correctCount, incorrectAnswers, onRetry, onExit }) {
  const incorrectCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  
  const correctPercent = (correctCount / totalQuestions) * 100;
  const incorrectPercent = (incorrectCount / totalQuestions) * 100;

  return (
    <div className="quiz-result">
      <h2 className="result-title">Quiz Complete!</h2>

      <div className="score-bar-container">
        {correctPercent > 0 && (
          <div 
            className="score-bar-correct" 
            style={{ width: `${correctPercent}%` }}
          >
            {correctCount > 0 && correctCount}
          </div>
        )}
        {incorrectPercent > 0 && (
          <div 
            className="score-bar-incorrect" 
            style={{ width: `${incorrectPercent}%` }}
          >
            {incorrectCount > 0 && incorrectCount}
          </div>
        )}
      </div>

      <p className="score-summary">{correctCount}/{totalQuestions}</p>
      <p className="score-percentage">{percentage}% Correct</p>

      {incorrectAnswers && incorrectAnswers.length > 0 ? (
        <div className="review-section">
          <h3 className="review-title">Questions to Review</h3>
          <div className="review-list">
            {incorrectAnswers.map((item, index) => (
              <div key={index} className="review-item">
                <p className="review-question">{item.question}</p>
                <div className="review-answers">
                  <p className="review-your-answer">
                    <span>Your answer:</span> {item.yourAnswer}
                  </p>
                  <p className="review-correct-answer">
                    <span>Correct:</span> {item.correctAnswer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-review">
          <div className="no-review-icon">🎉</div>
          <p>Perfect score! No questions to review.</p>
        </div>
      )}

      <div className="result-actions">
        <button className="retry-button" onClick={onRetry}>
          Retake Quiz
        </button>
        <button className="back-button" onClick={onExit}>
          Back to Deck
        </button>
      </div>
    </div>
  );
}

export default QuizResult;