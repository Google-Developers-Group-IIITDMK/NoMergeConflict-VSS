import React from 'react';

const StockWallet = ({ holdings, currentPrices }) => {
  const stocks = ['aids', 'cse', 'ece', 'mech'];

  const calculateProfitLoss = (stock) => {
    const holding = holdings[stock];
    if (holding.quantity === 0) return 0;
    
    const currentValue = holding.quantity * currentPrices[stock];
    const investedValue = holding.quantity * holding.avgPrice;
    return currentValue - investedValue;
  };

  const calculateProfitLossPercent = (stock) => {
    const holding = holdings[stock];
    if (holding.quantity === 0 || holding.avgPrice === 0) return 0;
    
    return ((currentPrices[stock] - holding.avgPrice) / holding.avgPrice) * 100;
  };

  return (
    <div className="portfolio">
      <h3>📊 Portfolio Holdings</h3>
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Quantity</th>
            <th>Avg. Price</th>
            <th>Current Price</th>
            <th>Current Value</th>
            <th>P&L</th>
            <th>P&L %</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => {
            const holding = holdings[stock];
            const currentValue = holding.quantity * currentPrices[stock];
            const pnl = calculateProfitLoss(stock);
            const pnlPercent = calculateProfitLossPercent(stock);
            
            return (
              <tr key={stock}>
                <td><strong>{stock.toUpperCase()}</strong></td>
                <td>{holding.quantity}</td>
                <td>₹{holding.avgPrice.toFixed(2)}</td>
                <td>₹{currentPrices[stock].toFixed(2)}</td>
                <td>₹{currentValue.toFixed(2)}</td>
                <td className={pnl >= 0 ? 'profit' : 'loss'}>
                  {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)}
                </td>
                <td className={pnlPercent >= 0 ? 'profit' : 'loss'}>
                  {pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockWallet;