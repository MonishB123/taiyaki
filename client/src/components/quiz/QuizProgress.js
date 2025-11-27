import React from 'react';
import './QuizProgress.css';

function QuizProgress({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="quiz-progress">
      <div className="progress-text">
        Question {current} of {total}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default QuizProgress;