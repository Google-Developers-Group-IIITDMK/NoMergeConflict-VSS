import React, { useState, useEffect, useCallback } from 'react';
import StockChart from './StockChart';
import Trade from './Trade';
import MoneyWallet from './MoneyWallet';
import StockWallet from './StockWallet';

const TradingDesk = () => {
  const [walletBalance, setWalletBalance] = useState(10000);
  const [selectedStock, setSelectedStock] = useState('aids');
  const [timeRange, setTimeRange] = useState('1h'); // 10m, 1h, 6h, 24h, all
  const [holdings, setHoldings] = useState({
    aids: { quantity: 0, avgPrice: 0 },
    cse: { quantity: 0, avgPrice: 0 },
    ece: { quantity: 0, avgPrice: 0 },
    mech: { quantity: 0, avgPrice: 0 }
  });
  const [currentPrices, setCurrentPrices] = useState({
    aids: 100,
    cse: 150,
    ece: 80,
    mech: 120
  });
  const [priceHistory, setPriceHistory] = useState({
    aids: [],
    cse: [],
    ece: [],
    mech: []
  });
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const generateCandleData = useCallback((previousPrice) => {
    const changePercent = (Math.random() - 0.5) * 0.1;
    const newPrice = previousPrice * (1 + changePercent);
    const high = Math.max(previousPrice, newPrice) * (1 + Math.random() * 0.02);
    const low = Math.min(previousPrice, newPrice) * (1 - Math.random() * 0.02);
    
    return {
      open: previousPrice,
      high: high,
      low: low,
      close: newPrice,
      time: Date.now() / 1000
    };
  }, []);

  // Filter data based on selected time range
  const getFilteredData = useCallback((data) => {
    const now = Date.now() / 1000;
    let timeFilter;
    
    switch (timeRange) {
      case '10m':
        timeFilter = now - (10 * 60);
        break;
      case '1h':
        timeFilter = now - (60 * 60);
        break;
      case '6h':
        timeFilter = now - (6 * 60 * 60);
        break;
      case '24h':
        timeFilter = now - (24 * 60 * 60);
        break;
      case 'all':
      default:
        return data; // Return all data
    }
    
    return data.filter(candle => candle.time >= timeFilter);
  }, [timeRange]);

  useEffect(() => {
    const stocks = ['aids', 'cse', 'ece', 'mech'];
    
    const initializeHistory = () => {
      const basePrices = { aids: 100, cse: 150, ece: 80, mech: 120 };
      const history = {};
      
      stocks.forEach(stock => {
        const stockHistory = [];
        let currentPrice = basePrices[stock];
        const now = Date.now() / 1000;
        
        // Generate 200 initial candles (about 3+ hours of data at 1-minute intervals)
        for (let i = 200; i >= 0; i--) {
          const candle = generateCandleData(currentPrice);
          candle.time = now - (i * 60); // 1-minute intervals
          stockHistory.push(candle);
          currentPrice = candle.close;
        }
        
        history[stock] = stockHistory;
        setCurrentPrices(prev => ({ ...prev, [stock]: currentPrice }));
      });
      
      setPriceHistory(history);
    };

    initializeHistory();

    const interval = setInterval(() => {
      setPriceHistory(prevHistory => {
        const newHistory = { ...prevHistory };
        const newPrices = { ...currentPrices };
        
        stocks.forEach(stock => {
          const lastCandle = newHistory[stock][newHistory[stock].length - 1];
          const newCandle = generateCandleData(lastCandle.close);
          
          // Append new candle instead of replacing old ones
          newHistory[stock] = [...newHistory[stock], newCandle];
          newPrices[stock] = newCandle.close;
        });
        
        setCurrentPrices(newPrices);
        return newHistory;
      });
    }, 2000); // Add new candle every 2 seconds

    return () => clearInterval(interval);
  }, [generateCandleData]);

  const handleTrade = (action, stock, quantity) => {
    const price = currentPrices[stock];
    const totalValue = price * quantity;

    if (action === 'buy') {
      if (totalValue > walletBalance) {
        showNotification('Insufficient funds!', 'error');
        return false;
      }
      setWalletBalance(prev => prev - totalValue);
      
      setHoldings(prev => {
        const current = prev[stock];
        const newQuantity = current.quantity + quantity;
        const newAvgPrice = current.quantity === 0 ? price : 
          ((current.quantity * current.avgPrice) + totalValue) / newQuantity;
        
        return {
          ...prev,
          [stock]: {
            quantity: newQuantity,
            avgPrice: newAvgPrice
          }
        };
      });
      
      showNotification(`Successfully bought ${quantity} shares of ${stock.toUpperCase()}`, 'success');
    } else {
      if (quantity > holdings[stock].quantity) {
        showNotification('Insufficient shares!', 'error');
        return false;
      }
      setWalletBalance(prev => prev + totalValue);
      
      setHoldings(prev => ({
        ...prev,
        [stock]: {
          ...prev[stock],
          quantity: prev[stock].quantity - quantity
        }
      }));
      
      showNotification(`Successfully sold ${quantity} shares of ${stock.toUpperCase()}`, 'success');
    }
    return true;
  };

  const filteredData = getFilteredData(priceHistory[selectedStock]);

  return (
    <div className="trading-desk">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="header">
        <h1>📈 Stock Trading Desk</h1>
        <p>Trade stocks in real-time with simulated market data</p>
      </div>

      <div className="dashboard">
        <div className="chart-section">
          <div className="chart-controls">
            <div className="chart-controls-left">
              <select 
                className="stock-selector"
                value={selectedStock} 
                onChange={(e) => setSelectedStock(e.target.value)}
              >
                <option value="aids">AIDS - ₹{currentPrices.aids.toFixed(2)}</option>
                <option value="cse">CSE - ₹{currentPrices.cse.toFixed(2)}</option>
                <option value="ece">ECE - ₹{currentPrices.ece.toFixed(2)}</option>
                <option value="mech">MECH - ₹{currentPrices.mech.toFixed(2)}</option>
              </select>
              
              <select 
                className="time-range-selector"
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="10m">Last 10 minutes</option>
                <option value="1h">Last 1 hour</option>
                <option value="6h">Last 6 hours</option>
                <option value="24h">Last 24 hours</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            <div className="chart-controls-right">
              <div className="live-price">
                Live: ₹{currentPrices[selectedStock].toFixed(2)}
              </div>
              <div className="data-count">
                Showing {filteredData.length} candles
              </div>
            </div>
          </div>
          
          <StockChart 
            data={filteredData} 
            currentPrice={currentPrices[selectedStock]}
            stock={selectedStock}
            timeRange={timeRange}
          />
        </div>

        <div className="trading-panel">
          <MoneyWallet balance={walletBalance} />
          <Trade 
            onTrade={handleTrade}
            selectedStock={selectedStock}
            onStockChange={setSelectedStock}
            currentPrice={currentPrices[selectedStock]}
          />
        </div>

        <div className="holdings-section">
          <StockWallet 
            holdings={holdings} 
            currentPrices={currentPrices}
          />
        </div>
      </div>
    </div>
  );
};

export default TradingDesk;