import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <img src="/taiyaki.png" alt="Taiyaki" className="navbar-logo-img" />
          <span className="navbar-logo-text">Taiyaki</span>
        </Link>

        <div className="navbar-right">
          <span className="navbar-username">
            Hey, {user?.username || 'User'}! ✨
          </span>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;