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
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState({
    correct: [],
    incorrect: [],
  });
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
        // Shuffle cards for study session
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
    setIsFlipped(!isFlipped);
  };

  const handleGrade = (knew) => {
    const currentCard = cards[currentIndex];
    
    if (knew) {
      setResults(prev => ({
        ...prev,
        correct: [...prev.correct, currentCard],
      }));
    } else {
      setResults(prev => ({
        ...prev,
        incorrect: [...prev.incorrect, currentCard],
      }));
    }

    // Move to next card or complete
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
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
    setResults({ correct: [], incorrect: [] });
    setIsComplete(false);
  };

  const handleStudyMissed = () => {
    if (results.incorrect.length === 0) return;
    
    const shuffled = [...results.incorrect].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults({ correct: [], incorrect: [] });
    setIsComplete(false);
  };

  if (loading) {
    return (
      <div className="study-mode">
        <Navbar />
        <div className="loading">Loading study session...</div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="study-mode">
        <Navbar />
        <div className="empty-study">
          <h2>No cards to study</h2>
          <p>Add some flashcards to this deck first!</p>
          <button onClick={() => navigate(`/deck/${deckId}`)}>
            Go to Deck
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="study-mode">
        <Navbar />
        <StudyComplete
          results={results}
          totalCards={cards.length}
          onRestart={handleRestart}
          onStudyMissed={handleStudyMissed}
          onExit={() => navigate(`/deck/${deckId}`)}
        />
      </div>
    );
  }

  return (
    <div className="study-mode">
      <Navbar />
      
      <main className="study-content">
        <div className="study-header">
          <button 
            className="exit-button"
            onClick={() => navigate(`/deck/${deckId}`)}
          >
            ✕ Exit
          </button>
          <h1 className="study-title">{deck?.title}</h1>
        </div>

        <StudyProgress 
          current={currentIndex + 1} 
          total={cards.length} 
        />

        <div className="study-card-container">
          <FlipCard
            front={cards[currentIndex].front}
            back={cards[currentIndex].back}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </div>

        {isFlipped && (
          <SelfGradeButtons onGrade={handleGrade} />
        )}

        {!isFlipped && (
          <p className="flip-hint">Click the card to reveal the answer</p>
        )}
      </main>
    </div>
  );
}

export default StudyModePage;