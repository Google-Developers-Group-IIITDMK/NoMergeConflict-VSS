import React, { useState } from 'react';

const Trade = ({ onTrade, selectedStock, onStockChange, currentPrice }) => {
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (action) => {
    const qty = parseInt(quantity);
    if (qty <= 0 || isNaN(qty)) {
      alert('Please enter a valid quantity');
      return;
    }

    const success = onTrade(action, selectedStock, qty);
    if (success) {
      setQuantity('');
    }
  };

  return (
    <div className="trade-form">
      <h3>Trade Stocks</h3>
      
      <div className="form-group">
        <label>Select Stock:</label>
        <select 
          value={selectedStock} 
          onChange={(e) => onStockChange(e.target.value)}
          className="stock-selector"
        >
          <option value="aids">AIDS</option>
          <option value="cse">CSE</option>
          <option value="ece">ECE</option>
          <option value="mech">MECH</option>
        </select>
      </div>

      <div className="form-group">
        <label>Current Price: ₹{currentPrice.toFixed(2)}</label>
      </div>

      <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          min="1"
        />
      </div>

      <div className="trade-buttons">
        <button 
          className="buy-btn"
          onClick={() => handleSubmit('buy')}
        >
          BUY
        </button>
        <button 
          className="sell-btn"
          onClick={() => handleSubmit('sell')}
        >
          SELL
        </button>
      </div>

      {quantity && (
        <div style={{ marginTop: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
          <strong>Total: ₹{(currentPrice * parseInt(quantity) || 0).toFixed(2)}</strong>
        </div>
      )}
    </div>
  );
};

export default Trade;