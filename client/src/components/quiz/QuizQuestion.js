import React from 'react';
import './QuizQuestion.css';

function QuizQuestion({ 
  question, 
  options, 
  selectedAnswer, 
  correctAnswer,
  isAnswered,
  onSelectAnswer,
  onCheckAnswer,
  onNext 
}) {
  const letters = ['A', 'B', 'C', 'D'];

  const getOptionClass = (option, index) => {
    if (!isAnswered) {
      return selectedAnswer === index ? 'selected' : '';
    }
    if (option === correctAnswer) {
      return 'correct';
    }
    if (selectedAnswer === index && option !== correctAnswer) {
      return 'incorrect';
    }
    return '';
  };

  return (
    <div className="quiz-question">
      <p className="question-text">{question}</p>
      
      <div className="options-list">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${getOptionClass(option, index)}`}
            onClick={() => !isAnswered && onSelectAnswer(index)}
            disabled={isAnswered}
          >
            <span className="option-letter">{letters[index]}</span>
            {option}
          </button>
        ))}
      </div>

      {!isAnswered && selectedAnswer !== null && (
        <button className="check-button" onClick={onCheckAnswer}>
          Check Answer
        </button>
      )}

      {isAnswered && (
        <button className="next-button" onClick={onNext}>
          Next Question
        </button>
      )}
    </div>
  );
}

export default QuizQuestion;