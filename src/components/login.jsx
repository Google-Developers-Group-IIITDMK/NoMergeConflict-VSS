import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username.trim() || 'guest');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">📈</div>
            <h1>Virtual Stock Simulator</h1>
          </div>
          <p className="subtitle">Trade like a pro with virtual money</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">Choose your trader name</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              className="username-input"
            />
          </div>
          
          <button type="submit" className="login-button">
            <span>🚀 Start Trading</span>
          </button>
        </form>
        
        <div className="login-features">
          <div className="feature-item">
            <span className="feature-icon">💸</span>
            <span>Start with 1000 GDG Bits</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span>Real-time market simulation</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span>Risk-free learning environment</span>
          </div>
        </div>
        
        <p className="footer-note">
          Perfect for learning Git/GitHub branching • No registration required
        </p>
      </div>
    </div>
  );
}