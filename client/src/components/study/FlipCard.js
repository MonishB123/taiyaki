import React from 'react';
import './FlipCard.css';

function FlipCard({ front, back, isFlipped, onFlip }) {
  return (
    <div className="flip-card" onClick={onFlip}>
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <span className="card-label">FRONT</span>
          <p className="card-text">{front}</p>
          <span className="tap-hint">Tap to flip</span>
        </div>
        <div className="flip-card-back">
          <span className="card-label">BACK</span>
          <p className="card-text">{back}</p>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;