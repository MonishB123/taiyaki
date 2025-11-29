import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizProgress from '../components/quiz/QuizProgress';
import QuizResult from '../components/quiz/QuizResult';
import './QuizModePage.css';

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

  // const fetchDeckAndCards = async () => {
  //   try {
  //     const deckResponse = await fetch(`/flashcards/decks/${deckId}`);
  //     if (deckResponse.ok) {
  //       const deckData = await deckResponse.json();
  //       setDeck(deckData);
  //     }

  //     const cardsResponse = await fetch(`/flashcards/decks/${deckId}/cards`);
  //     if (cardsResponse.ok) {
  //       const cardsData = await cardsResponse.json();
  //       const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
  //       setCards(shuffled);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching deck:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchDeckAndCards = () => {
    setTimeout(() => {
      const mockDeck = MOCK_DECKS[deckId];
      const mockCards = MOCK_CARDS[deckId] || [];
      
      if (mockDeck && mockCards.length >= 4) {
        setDeck(mockDeck);
        const generatedQuestions = generateQuestions(mockCards);
        setQuestions(generatedQuestions);
      }
      setLoading(false);
    }, 500);
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

  const handleRetry = () => {
    const mockCards = MOCK_CARDS[deckId] || [];
    const generatedQuestions = generateQuestions(mockCards);
    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIncorrectAnswers([]);
    setIsComplete(false);
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