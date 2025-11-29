import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import DeckDetailPage from './pages/DeckDetailPage';
import StudyModePage from './pages/StudyModePage';
import QuizModePage from './pages/QuizModePage';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/deck/:deckId" 
            element={
              <ProtectedRoute>
                <DeckDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/deck/:deckId/study" 
            element={
              <ProtectedRoute>
                <StudyModePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/deck/:deckId/quiz" 
            element={
              <ProtectedRoute>
                <QuizModePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
