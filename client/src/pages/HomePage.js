import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src="/taiyaki.png" alt="Taiyaki" className="home-logo" />
        <h1 className="home-title">Taiyaki</h1>
        <p className="home-subtitle">Your adorable flashcard companion</p>
        
        <div className="button-container">
          <Link to="/login" className="login-button">
            Log In
          </Link>
          <Link to="/signup" className="signup-button">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;