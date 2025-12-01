import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignupPage.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        login(data);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="form-logo-container">
          <img src="/taiyaki.png" alt="Taiyaki" className="form-logo" />
        </div>
        
        <h2 className="signup-title">Join Taiyaki!</h2>
        <p className="signup-subtitle">Create an account to start learning</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Choose a username"
              disabled={loading}
            />
          </div>

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
              placeholder="Create a password"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Confirm your password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="signup-submit-button"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
        
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
}

export default SignupPage;