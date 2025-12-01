import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import FlashcardList from '../components/flashcard/FlashcardList';
import FlashcardForm from '../components/flashcard/FlashcardForm';
import './DeckDetailPage.css';

function DeckDetailPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    fetchDeckAndCards();
  }, [deckId]);

  const fetchDeckAndCards = async () => {
    try {
      const deckResponse = await fetch(`/flashcards/decks/${deckId}`);
      if (deckResponse.ok) {
        const deckData = await deckResponse.json();
        setDeck(deckData);
      }

      const cardsResponse = await fetch(`/flashcards/decks/${deckId}/cards`);
      if (cardsResponse.ok) {
        const cardsData = await cardsResponse.json();
        setCards(cardsData);
      }
    } catch (error) {
      console.error('Error fetching deck:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (cardData) => {
    try {
      const response = await fetch(`/flashcards/decks/${deckId}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
      });

      if (response.ok) {
        const newCard = await response.json();
        setCards([...cards, newCard]);
        setShowCardForm(false);
      }
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleUpdateCard = async (cardData) => {
    try {
      const response = await fetch(`/flashcards/cards/${editingCard._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
      });

      if (response.ok) {
        const updatedCard = await response.json();
        setCards(cards.map(c => c._id === updatedCard._id ? updatedCard : c));
        setEditingCard(null);
        setShowCardForm(false);
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;

    try {
      const response = await fetch(`/flashcards/cards/${cardId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCards(cards.filter(c => c._id !== cardId));
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const openEditForm = (card) => {
    setEditingCard(card);
    setShowCardForm(true);
  };

  const closeForm = () => {
    setShowCardForm(false);
    setEditingCard(null);
  };

  const startStudy = () => {
    navigate(`/deck/${deckId}/study`);
  };

  const startQuiz = () => {
    navigate(`/deck/${deckId}/quiz`);
  };

  if (loading) {
    return (
      <div className="deck-detail">
        <Navbar />
        <div className="loading">Loading deck...</div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="deck-detail">
        <Navbar />
        <div className="error-state">
          <h2>Deck not found</h2>
          <button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="deck-detail">
      <Navbar />
      
      <main className="deck-detail-content">
        <button 
          className="back-button"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Decks
        </button>

        {/* <div className="deck-header">
          <div className="deck-info">
            <h1 className="deck-title">{deck.title}</h1>
            <p className="deck-description">
              {deck.description || 'No description'}
            </p>
            <span className="deck-card-count">{cards.length} cards</span>
          </div>

          <div className="deck-actions">
            <button 
              className="study-button"
              onClick={startStudy}
              disabled={cards.length === 0}
            >
              📖 Study
            </button>
            <button 
              className="quiz-button"
              onClick={startQuiz}
              disabled={cards.length < 4}
            >
              📝 Quiz
            </button>
          </div>
        </div> */}

        <div className="deck-header">
            <h1 className="deck-title">{deck.title}</h1>
            <p className="deck-description">
                {deck.description || 'No description'}
            </p>

            <div className="deck-info-row">
                <span className="stat-badge cards">{cards.length} cards</span>
                <button 
                className="study-button"
                onClick={startStudy}
                disabled={cards.length === 0}
                >
                📖 Study
                </button>
                <button 
                className="quiz-button"
                onClick={startQuiz}
                disabled={cards.length < 4}
                >
                📝 Quiz
                </button>
            </div>
            </div>

        <div className="cards-section">
          <div className="cards-header">
            <h2 className="cards-title">Flashcards</h2>
            <button 
              className="add-card-button"
              onClick={() => setShowCardForm(true)}
            >
              + Add Card
            </button>
          </div>

          <FlashcardList 
            cards={cards}
            onEdit={openEditForm}
            onDelete={handleDeleteCard}
          />
        </div>

        {showCardForm && (
          <FlashcardForm
            card={editingCard}
            onSubmit={editingCard ? handleUpdateCard : handleAddCard}
            onClose={closeForm}
          />
        )}
      </main>
    </div>
  );
}

export default DeckDetailPage;