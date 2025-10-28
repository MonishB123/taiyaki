import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css';
import './LoginPage.css'; 

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // TODO: Add actual signup logic here
    console.log('Signup data:', formData);
    alert('Signup functionality coming soon!');
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="signup-title">Sign Up for Taiyaki</h2>
        
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
            />
          </div>

          <button type="submit" className="signup-submit-button">
            Sign Up
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