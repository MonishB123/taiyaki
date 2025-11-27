import React from 'react';
import FlashcardItem from './FlashcardItem';
import './FlashcardList.css';

function FlashcardList({ cards, onEdit, onDelete }) {
  if (cards.length === 0) {
    return (
      <div className="empty-cards">
        <div className="empty-cards-icon">🃏</div>
        <h3 className="empty-cards-title">No flashcards yet</h3>
        <p className="empty-cards-text">
          Add your first flashcard to start building this deck!
        </p>
      </div>
    );
  }

  return (
    <div className="flashcard-list">
      {cards.map((card, index) => (
        <FlashcardItem
          key={card._id}
          card={card}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default FlashcardList;