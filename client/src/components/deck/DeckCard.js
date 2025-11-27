import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeckCard.css';

function DeckCard({ deck, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/deck/${deck._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(deck);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(deck._id);
  };

  return (
    <div className="deck-card" onClick={handleClick}>
      <div className="deck-card-content">
        <h3 className="deck-card-title">{deck.title}</h3>
        <p className="deck-card-description">
          {deck.description || 'No description'}
        </p>
        <div className="deck-card-stats">
          <span className="deck-card-count">
            {deck.cardCount || 0} cards
          </span>
        </div>
      </div>

      <div className="deck-card-actions">
        <button 
          className="deck-action-button edit-button"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button 
          className="deck-action-button delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeckCard;