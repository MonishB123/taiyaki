import React from 'react';
import './FlipCard.css';

function FlipCard({ front, back, isFlipped, onFlip }) {
  return (
    <div className="flip-card-wrapper">
      <div className="flip-card-container">
        <div 
          className={`flip-card ${isFlipped ? 'flipped' : ''}`}
          onClick={onFlip}
        >
          <div className="flip-card-front">
            <p className="card-content">{front}</p>
          </div>
          <div className="flip-card-back">
            <p className="card-content">{back}</p>
          </div>
        </div>
      </div>
      {!isFlipped && <p className="flip-hint">Tap to flip</p>}
    </div>
  );
}

export default FlipCard;