import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');
    
  //   try {
  //     const response = await fetch('/users/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();
      
  //     if (response.ok) {
  //       login(data);
  //       navigate('/dashboard');
  //     } else {
  //       setError(data.message || 'Login failed');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     setError('Server error. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // MOCK MODE - Skip backend
    setTimeout(() => {
      login({ 
        username: 'TestUser', 
        email: formData.email 
      });
      navigate('/dashboard');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="form-logo-container">
          <img src="/taiyaki.png" alt="Taiyaki" className="form-logo" />
        </div>
        
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Log in to continue learning</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
}

export default LoginPage;