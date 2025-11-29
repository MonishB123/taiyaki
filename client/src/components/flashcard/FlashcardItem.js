import React, { useState } from 'react';
import './FlashcardItem.css';

function FlashcardItem({ card, index, onEdit, onDelete }) {
  const [showBack, setShowBack] = useState(false);

  return (
    <div className="flashcard-item">
      <div className="flashcard-number">{index + 1}</div>
      
      <div className="flashcard-content">
        <div className="flashcard-front">
          <span className="flashcard-label">Front</span>
          <p className="flashcard-text">{card.front}</p>
        </div>
        
        <div className="flashcard-divider"></div>
        
        <div className="flashcard-back">
          <span className="flashcard-label">Back</span>
          {showBack ? (
            <p className="flashcard-text">{card.back}</p>
          ) : (
            <button 
              className="reveal-button"
              onClick={() => setShowBack(true)}
            >
              Click to reveal
            </button>
          )}
        </div>
      </div>

      <div className="flashcard-actions">
        <button 
          className="flashcard-action-btn edit-btn"
          onClick={() => onEdit(card)}
        >
          ✏️
        </button>
        <button 
          className="flashcard-action-btn delete-btn"
          onClick={() => onDelete(card._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default FlashcardItem;