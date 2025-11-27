import React from 'react';
import './StudyProgress.css';

function StudyProgress({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="study-progress">
      <div className="progress-text">
        Card {current} of {total}
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

export default StudyProgress;