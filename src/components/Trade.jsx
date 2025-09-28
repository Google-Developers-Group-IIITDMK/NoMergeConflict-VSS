import React, { useState } from 'react';

const Trade = ({ onTrade, selectedStock, onStockChange, currentPrice, currentPrices }) => {
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

  // Calculate total for Buy All
  const calculateTotal = () => {
    const qty = parseInt(quantity) || 0;
    if (selectedStock === 'all') {
      return Object.values(currentPrices).reduce((sum, price) => sum + price, 0) * qty;
    }
    return currentPrice * qty;
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
          <option value="all">ALL STOCKS</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          {selectedStock === 'all' ? 'Combined Price:' : 'Current Price:'} 
          ₹{currentPrice.toFixed(2)}
        </label>
        {selectedStock === 'all' && (
          <div className="price-breakdown">
            <small>
              AIDS: ₹{currentPrices.aids.toFixed(2)} + 
              CSE: ₹{currentPrices.cse.toFixed(2)} + 
              ECE: ₹{currentPrices.ece.toFixed(2)} + 
              MECH: ₹{currentPrices.mech.toFixed(2)}
            </small>
          </div>
        )}
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
          {selectedStock === 'all' ? 'BUY ALL' : 'BUY'}
        </button>
        {selectedStock !== 'all' && (
          <button 
            className="sell-btn"
            onClick={() => handleSubmit('sell')}
          >
            SELL
          </button>
        )}
      </div>

      {quantity && (
        <div className="trade-summary">
          <strong>Total: ₹{calculateTotal().toFixed(2)}</strong>
          {selectedStock === 'all' && (
            <div className="breakdown">
              <small>
                You'll get {quantity} shares of each: AIDS, CSE, ECE, MECH
              </small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Trade;