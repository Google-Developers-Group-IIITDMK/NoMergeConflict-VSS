import React, { useState, useEffect } from 'react';
export default function CseStockPrice() {
  const [currStock, setCurrStock] = useState(() => gaussianRandom(100, 0.5));
  const [lastChange, setLastChange] = useState(0);

  function gaussianRandom(mean = 0, stdev = 1) {
    let u = 1 - Math.random(); // Subtraction to avoid log(0)
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const change = gaussianRandom(0, 5);
      setLastChange(change);
      setCurrStock(prevStock => prevStock + change);

    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const isPositive = lastChange >= 0;
  const textColorClass = isPositive ? 'text-green-400' : 'text-red-400';
  const changeSymbol = isPositive ? '▲' : '▼';

  return (
    <>
            {currStock.toFixed(4)}
    </>
  );
}
