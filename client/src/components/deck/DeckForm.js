import React, { useState, useEffect } from 'react';
import './DeckForm.css';

function DeckForm({ deck, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (deck) {
      setFormData({
        title: deck.title || '',
        description: deck.description || '',
      });
    }
  }, [deck]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {deck ? 'Edit Deck' : 'Create New Deck'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="deck-form">
          <div className="input-group">
            <label className="input-label">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., Biology Chapter 5"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field textarea"
              placeholder="What's this deck about?"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Saving...' : deck ? 'Update Deck' : 'Create Deck'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeckForm;