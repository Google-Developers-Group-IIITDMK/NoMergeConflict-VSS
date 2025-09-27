import React, { useState } from 'react';
import TradingDesk from './components/TradingDesk';
import './index.css';
import Login from "./components/login"

function App() {
  const [username, setUsername] = useState("");

  const handleLogin = (user) => {
    setUsername(user);
  };

  if(!username) return <Login onLogin={handleLogin} />;
  
  return (
    <div className="app">
      <TradingDesk username={username} />
    </div>
  );
}

export default App;