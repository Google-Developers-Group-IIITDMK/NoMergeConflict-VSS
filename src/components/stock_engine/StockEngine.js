// src/components/stock_engine/StockEngine.js
import { useState, useEffect } from "react";

export const useStockEngine = ({
  initialPrice = 100,
  intervalMs = 1000,
  maxChange = 3,
  maxDataPoints = 300
}) => {
  const [stockData, setStockData] = useState([
    { time: new Date(), price: initialPrice }
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStockData((currentData) => {
        const lastDataPoint = currentData[currentData.length - 1];
        const change = (Math.random() * 2 - 1) * maxChange; // random [-maxChange, +maxChange]
        const newPrice = Math.max(
          0,
          parseFloat((lastDataPoint.price + change).toFixed(2))
        );

        const newDataPoint = { time: new Date(), price: newPrice };
        const updatedData = [...currentData, newDataPoint];

        if (updatedData.length > maxDataPoints) {
          return updatedData.slice(updatedData.length - maxDataPoints);
        }
        return updatedData;
      });
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [intervalMs, maxChange, maxDataPoints]);

  return stockData;
};
