import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import FlashcardList from '../components/flashcard/FlashcardList';
import FlashcardForm from '../components/flashcard/FlashcardForm';
import './DeckDetailPage.css';

// MOCK DATA
const MOCK_DECKS = {
  '1': { _id: '1', title: 'Biology Chapter 5', description: 'Cell structure and functions' },
  '2': { _id: '2', title: 'Spanish Vocabulary', description: 'Common phrases and words' },
  '3': { _id: '3', title: 'JavaScript Basics', description: 'Variables, functions, and loops' },
};

const MOCK_CARDS = {
  '1': [
    { _id: 'c1', front: 'What is a cell?', back: 'The basic unit of life' },
    { _id: 'c2', front: 'What is the mitochondria?', back: 'The powerhouse of the cell' },
    { _id: 'c3', front: 'What is DNA?', back: 'Deoxyribonucleic acid - carries genetic information' },
    { _id: 'c4', front: 'What is the nucleus?', back: 'Control center of the cell' },
  ],
  '2': [
    { _id: 'c5', front: 'Hola', back: 'Hello' },
    { _id: 'c6', front: 'Gracias', back: 'Thank you' },
    { _id: 'c7', front: 'Por favor', back: 'Please' },
    { _id: 'c8', front: 'Adiós', back: 'Goodbye' },
  ],
  '3': [
    { _id: 'c9', front: 'What is a variable?', back: 'A container for storing data' },
    { _id: 'c10', front: 'What is a function?', back: 'A reusable block of code' },
    { _id: 'c11', front: 'What is a loop?', back: 'Code that repeats' },
    { _id: 'c12', front: 'What is an array?', back: 'A list of items' },
  ],
};

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

//   const fetchDeckAndCards = async () => {
//     try {
//       // Fetch deck info
//       const deckResponse = await fetch(`/flashcards/decks/${deckId}`);
//       if (deckResponse.ok) {
//         const deckData = await deckResponse.json();
//         setDeck(deckData);
//       }

//       // Fetch cards in this deck
//       const cardsResponse = await fetch(`/flashcards/decks/${deckId}/cards`);
//       if (cardsResponse.ok) {
//         const cardsData = await cardsResponse.json();
//         setCards(cardsData);
//       }
//     } catch (error) {
//       console.error('Error fetching deck:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  const fetchDeckAndCards = async () => {
    // MOCK MODE
    setTimeout(() => {
        const mockDeck = MOCK_DECKS[deckId];
        const mockCards = MOCK_CARDS[deckId] || [];
        
        if (mockDeck) {
        setDeck(mockDeck);
        setCards(mockCards);
        }
        setLoading(false);
    }, 500);
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