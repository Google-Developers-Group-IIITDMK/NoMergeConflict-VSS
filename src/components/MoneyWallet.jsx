import React from 'react';

const MoneyWallet = ({ balance }) => {
  return (
    <div className="wallet">
      <h3>💰 Wallet Balance</h3>
      <div className="wallet-amount">₹{balance.toFixed(2)}</div>
    </div>
  );
};

export default MoneyWallet;