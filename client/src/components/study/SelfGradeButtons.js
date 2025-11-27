import React from 'react';
import './SelfGradeButtons.css';

function SelfGradeButtons({ onGrade }) {
  return (
    <div className="self-grade-buttons">
      <p className="grade-prompt">How well did you know this?</p>
      <div className="grade-options">
        <button 
          className="grade-button incorrect"
          onClick={() => onGrade(false)}
        >
          <span className="grade-icon">✗</span>
          <span className="grade-text">Didn't Know</span>
        </button>
        <button 
          className="grade-button correct"
          onClick={() => onGrade(true)}
        >
          <span className="grade-icon">✓</span>
          <span className="grade-text">Got It!</span>
        </button>
      </div>
    </div>
  );
}

export default SelfGradeButtons;