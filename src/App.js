import React, { useState, createContext, useContext } from 'react';
import TradingDesk from './components/TradingDesk';
import './index.css';
import Login from "./components/login"

// Create Theme Context
export const ThemeContext = createContext();

function App() {
  const [username, setUsername] = useState("");
  const [isNightMode, setIsNightMode] = useState(false);

  const handleLogin = (user) => {
    setUsername(user);
  };

  const handleLogout = () => {
    setUsername("");
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  if(!username) return (
    <ThemeContext.Provider value={{ isNightMode, toggleNightMode }}>
      <Login onLogin={handleLogin} />
    </ThemeContext.Provider>
  );
  
  return (
    <ThemeContext.Provider value={{ isNightMode, toggleNightMode }}>
      <div className={`app ${isNightMode ? 'night-mode' : ''}`}>
        <TradingDesk username={username} onLogout={handleLogout} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;