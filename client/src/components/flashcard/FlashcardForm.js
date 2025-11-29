import React, { useState, useEffect } from 'react';
import './FlashcardForm.css';

function FlashcardForm({ card, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    front: '',
    back: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (card) {
      setFormData({
        front: card.front || '',
        back: card.back || '',
      });
    }
  }, [card]);

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
            {card ? 'Edit Flashcard' : 'Add New Flashcard'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flashcard-form">
          <div className="input-group">
            <label className="input-label">Front (Term/Question) *</label>
            <textarea
              name="front"
              value={formData.front}
              onChange={handleChange}
              required
              className="input-field textarea"
              placeholder="Enter the term or question"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Back (Definition/Answer) *</label>
            <textarea
              name="back"
              value={formData.back}
              onChange={handleChange}
              required
              className="input-field textarea"
              placeholder="Enter the definition or answer"
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
              {loading ? 'Saving...' : card ? 'Update Card' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FlashcardForm;