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
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
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
        if (cardsData.length >= 4) {
          const generatedQuestions = generateQuestions(cardsData);
          setQuestions(generatedQuestions);
        }
      }
    } catch (error) {
      console.error('Error fetching deck:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQuestions = (cards) => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    
    return shuffledCards.map(card => {
      const otherCards = cards.filter(c => c._id !== card._id);
      const shuffledOthers = otherCards.sort(() => Math.random() - 0.5).slice(0, 3);
      
      const options = [card.back, ...shuffledOthers.map(c => c.back)];
      const shuffledOptions = options.sort(() => Math.random() - 0.5);
      
      return {
        question: card.front,
        options: shuffledOptions,
        correctAnswer: card.back
      };
    });
  };

  const handleSelectAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswered(true);
    
    const currentQuestion = questions[currentIndex];
    const isCorrect = currentQuestion.options[selectedAnswer] === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => [...prev, {
        question: currentQuestion.question,
        yourAnswer: currentQuestion.options[selectedAnswer],
        correctAnswer: currentQuestion.correctAnswer
      }]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRetry = async () => {
    try {
      const cardsResponse = await fetch(`/flashcards/decks/${deckId}/cards`);
      if (cardsResponse.ok) {
        const cardsData = await cardsResponse.json();
        const generatedQuestions = generateQuestions(cardsData);
        setQuestions(generatedQuestions);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setCorrectCount(0);
        setIncorrectAnswers([]);
        setIsComplete(false);
      }
    } catch (error) {
      console.error('Error fetching cards for retry:', error);
    }
  };

  const handleExit = () => {
    navigate(`/deck/${deckId}`);
  };

  if (loading) {
    return (
      <div className="quiz-mode">
        <Navbar />
        <div className="loading">Loading quiz...</div>
      </div>
    );
  }

  if (!deck || questions.length === 0) {
    return (
      <div className="quiz-mode">
        <Navbar />
        <div className="quiz-content">
          <div className="no-cards">
            <h2>Not enough cards for quiz</h2>
            <p>You need at least 4 cards to take a quiz.</p>
            <button onClick={handleExit}>Back to Deck</button>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="quiz-mode">
        <Navbar />
        <div className="quiz-content">
          <QuizResult
            totalQuestions={questions.length}
            correctCount={correctCount}
            incorrectAnswers={incorrectAnswers}
            onRetry={handleRetry}
            onExit={handleExit}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-mode">
      <Navbar />
      <div className="quiz-content">
        <div className="quiz-header">
          <button className="exit-button" onClick={handleExit}>
            ✕ Exit
          </button>
          <h1 className="quiz-title">{deck.title}</h1>
        </div>

        <div className="quiz-card-container">
          <QuizProgress 
            current={currentIndex + 1} 
            total={questions.length} 
          />

          <QuizQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            isAnswered={isAnswered}
            onSelectAnswer={handleSelectAnswer}
            onCheckAnswer={handleCheckAnswer}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

export default QuizModePage;