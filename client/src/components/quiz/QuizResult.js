import React from 'react';
import './QuizResult.css';

function QuizResult({ results, onRestart, onExit }) {
  const correctCount = results.filter(r => r.isCorrect).length;
  const totalCount = results.length;
  const percentage = Math.round((correctCount / totalCount) * 100);
  const missedQuestions = results.filter(r => !r.isCorrect);

  const getGrade = () => {
    if (percentage >= 90) return { letter: 'A', color: '#28a745' };
    if (percentage >= 80) return { letter: 'B', color: '#5cb85c' };
    if (percentage >= 70) return { letter: 'C', color: '#f0ad4e' };
    if (percentage >= 60) return { letter: 'D', color: '#ff9800' };
    return { letter: 'F', color: '#dc3545' };
  };

  const grade = getGrade();

  return (
    <main className="quiz-result">
      <div className="result-card">
        <h1 className="result-title">Quiz Complete!</h1>
        
        <div 
          className="grade-circle"
          style={{ backgroundColor: grade.color }}
        >
          <span className="grade-letter">{grade.letter}</span>
        </div>

        <div className="score-display">
          <span className="score-number">{correctCount}</span>
          <span className="score-separator">/</span>
          <span className="score-total">{totalCount}</span>
        </div>
        
        <p className="score-percentage">{percentage}% Correct</p>

        {missedQuestions.length > 0 && (
          <div className="missed-section">
            <h3 className="missed-title">Questions to Review</h3>
            <div className="missed-list">
              {missedQuestions.map((item, index) => (
                <div key={index} className="missed-item">
                  <div className="missed-question">
                    <span className="missed-label">Q:</span>
                    <span>{item.card.front}</span>
                  </div>
                  <div className="missed-your-answer">
                    <span className="missed-label">Your answer:</span>
                    <span className="wrong-answer">{item.userAnswer}</span>
                  </div>
                  <div className="missed-correct-answer">
                    <span className="missed-label">Correct:</span>
                    <span className="right-answer">{item.card.back}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="result-actions">
          <button 
            className="action-button restart"
            onClick={onRestart}
          >
            Retake Quiz
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

export default QuizResult;