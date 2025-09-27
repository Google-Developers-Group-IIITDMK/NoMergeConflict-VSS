import React, { useContext } from 'react';
import { ThemeContext } from '../App';

const MoneyWallet = ({ balance }) => {
  const { isNightMode } = useContext(ThemeContext);
  
  return (
    <div className={`wallet ${isNightMode ? 'wallet-dark' : 'wallet-light'}`}>
      <h3>💰 Wallet Balance</h3>
      <div className="wallet-amount">₹{balance.toFixed(2)}</div>
    </div>
  );
};

export default MoneyWallet;