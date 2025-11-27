import React from 'react';
import './QuizQuestion.css';

function QuizQuestion({ 
  question, 
  options, 
  correctAnswer, 
  selectedAnswer, 
  showResult, 
  onSelectAnswer 
}) {
  const getOptionClass = (option) => {
    if (!showResult) {
      return selectedAnswer === option ? 'selected' : '';
    }
    
    if (option === correctAnswer) {
      return 'correct';
    }
    
    if (option === selectedAnswer && option !== correctAnswer) {
      return 'incorrect';
    }
    
    return 'disabled';
  };

  return (
    <div className="quiz-question">
      <div className="question-card">
        <span className="question-label">QUESTION</span>
        <p className="question-text">{question}</p>
      </div>

      <div className="options-list">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${getOptionClass(option)}`}
            onClick={() => onSelectAnswer(option)}
            disabled={showResult}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
            {showResult && option === correctAnswer && (
              <span className="option-icon">✓</span>
            )}
            {showResult && option === selectedAnswer && option !== correctAnswer && (
              <span className="option-icon">✗</span>
            )}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`result-message ${selectedAnswer === correctAnswer ? 'correct' : 'incorrect'}`}>
          {selectedAnswer === correctAnswer ? (
            <span>🎉 Correct!</span>
          ) : (
            <span>❌ Incorrect. The answer was: {correctAnswer}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizQuestion;