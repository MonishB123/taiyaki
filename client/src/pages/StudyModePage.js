import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import FlipCard from '../components/study/FlipCard';
import StudyProgress from '../components/study/StudyProgress';
import SelfGradeButtons from '../components/study/SelfGradeButtons';
import StudyComplete from '../components/study/StudyComplete';
import './StudyModePage.css';

function StudyModePage() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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
        const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
        setCards(shuffled);
        }
    } catch (error) {
        console.error('Error fetching deck:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const handleGrade = (correct) => {
    if (correct) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }

    // Move to next card or complete
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIsComplete(false);
  };

  const handleExit = () => {
    navigate(`/deck/${deckId}`);
  };

  if (loading) {
    return (
      <div className="study-mode">
        <Navbar />
        <div className="loading">Loading cards...</div>
      </div>
    );
  }

  if (!deck || cards.length === 0) {
    return (
      <div className="study-mode">
        <Navbar />
        <div className="study-content">
          <div className="no-cards">
            <div className="no-cards-icon">📚</div>
            <h2 className="no-cards-title">No Cards to Study</h2>
            <p className="no-cards-text">Add some flashcards to this deck first!</p>
            <button className="back-to-deck-button" onClick={handleExit}>
              Back to Deck
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="study-mode">
        <Navbar />
        <div className="study-content">
          <StudyComplete
            totalCards={cards.length}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            onRestart={handleRestart}
            onExit={handleExit}
          />
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="study-mode">
      <Navbar />
      <div className="study-content">
        <div className="study-header">
          <button className="exit-button" onClick={handleExit}>
            ✕ Exit
          </button>
          <h1 className="study-title">{deck.title}</h1>
        </div>

        <div className="study-card-container">
          <StudyProgress 
            current={currentIndex + 1} 
            total={cards.length} 
          />

          <FlipCard
            front={currentCard.front}
            back={currentCard.back}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />

          {isFlipped && (
            <SelfGradeButtons onGrade={handleGrade} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyModePage;