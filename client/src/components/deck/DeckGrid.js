import React from 'react';
import DeckCard from './DeckCard';
import './DeckGrid.css';

function DeckGrid({ decks, onEdit, onDelete }) {
  if (decks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📚</div>
        <h2 className="empty-state-title">No decks yet</h2>
        <p className="empty-state-text">
          Create your first deck to start studying!
        </p>
      </div>
    );
  }

  return (
    <div className="deck-grid">
      {decks.map(deck => (
        <DeckCard 
          key={deck._id} 
          deck={deck}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default DeckGrid;