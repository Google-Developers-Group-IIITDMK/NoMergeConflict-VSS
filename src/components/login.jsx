import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  return (
        <div className="login">
      <div className="header">
        <h2>Virtual Stock Simulator</h2>
      </div>
      <label className="small">Enter a username (no email required)</label>
      <input
        type="text"
        placeholder="your username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />
      <div style={{display:'flex',gap:8}}>
        <button className="btn" onClick={()=>onLogin(username || 'guest')}>Enter</button>
      </div>
      <p className="footer-note">Starting balance: 1000 gdg bits. This demo is for learning Git/GitHub branching.</p>
    </div>
  );
}
