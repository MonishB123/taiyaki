import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add actual login logic here
    console.log('Login data:', formData);
    alert('Login functionality coming soon!');
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">Log In to Taiyaki</h2>
        
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
            />
          </div>

          <button type="submit" className="login-submit-button">
            Log In
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