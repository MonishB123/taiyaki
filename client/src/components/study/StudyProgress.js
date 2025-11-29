import React from 'react';
import './StudyProgress.css';

function StudyProgress({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="study-progress">
      <p className="progress-text">
        Card <span className="progress-current">{current}</span> of <span className="progress-total">{total}</span>
      </p>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default StudyProgress;