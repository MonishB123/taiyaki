import React from 'react';
import './SelfGradeButtons.css';

function SelfGradeButtons({ onGrade }) {
  return (
    <div className="self-grade-container">
      <p className="grade-prompt">How well did you know this?</p>
      <div className="grade-buttons">
        <button 
          className="grade-button wrong"
          onClick={() => onGrade(false)}
        >
          Didn't Know
        </button>
        <button 
          className="grade-button correct"
          onClick={() => onGrade(true)}
        >
          Got It!
        </button>
      </div>
    </div>
  );
}

export default SelfGradeButtons;