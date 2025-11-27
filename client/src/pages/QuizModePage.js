import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizProgress from '../components/quiz/QuizProgress';
import QuizResult from '../components/quiz/QuizResult';
import './QuizModePage.css';

function QuizModePage() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
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

  const generateOptions = (correctCard) => {
    const otherCards = cards.filter(c => c._id !== correctCard._id);
    const shuffledOthers = [...otherCards].sort(() => Math.random() - 0.5);
    const distractors = shuffledOthers.slice(0, 3).map(c => c.back);
    
    const options = [...distractors, correctCard.back];
    return options.sort(() => Math.random() - 0.5);
  };

  const handleSelectAnswer = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const currentCard = cards[currentIndex];
    const isCorrect = selectedAnswer === currentCard.back;
    
    setResults([...results, {
      card: currentCard,
      userAnswer: selectedAnswer,
      isCorrect,
    }]);
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setResults([]);
    setIsComplete(false);
  };

  if (loading) {
    return (
      <div className="quiz-mode">
        <Navbar />
        <div className="loading">Loading quiz...</div>
      </div>
    );
  }

  if (cards.length < 4) {
    return (
      <div className="quiz-mode">
        <Navbar />
        <div className="empty-quiz">
          <h2>Not enough cards</h2>
          <p>You need at least 4 flashcards to take a quiz.</p>
          <button onClick={() => navigate(`/deck/${deckId}`)}>
            Go to Deck
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="quiz-mode">
        <Navbar />
        <QuizResult
          results={results}
          onRestart={handleRestart}
          onExit={() => navigate(`/deck/${deckId}`)}
        />
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const options = generateOptions(currentCard);

  return (
    <div className="quiz-mode">
      <Navbar />
      
      <main className="quiz-content">
        <div className="quiz-header">
          <button 
            className="exit-button"
            onClick={() => navigate(`/deck/${deckId}`)}
          >
            ✕ Exit
          </button>
          <h1 className="quiz-title">{deck?.title} - Quiz</h1>
        </div>

        <QuizProgress 
          current={currentIndex + 1} 
          total={cards.length} 
        />

        <QuizQuestion
          question={currentCard.front}
          options={options}
          correctAnswer={currentCard.back}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onSelectAnswer={handleSelectAnswer}
        />

        <div className="quiz-actions">
          {!showResult ? (
            <button 
              className="submit-button"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
            >
              Submit Answer
            </button>
          ) : (
            <button 
              className="next-button"
              onClick={handleNext}
            >
              {currentIndex < cards.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default QuizModePage;