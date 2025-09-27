import React, { useState, useEffect } from 'react';
import MechStockChart from "../stock_charts/mech"

export default function MechStockPrice() {
  const [currStock, setCurrStock] = useState(() => gaussianRandom(100, 1));
  const [lastChange, setLastChange] = useState(0);
  const [cur_time, setCurTime] = useState(0);
  const [data, setData] = useState([{time : cur_time, value : currStock}]);
  function gaussianRandom(mean = 0, stdev = 1) {
    let u = 1 - Math.random(); // Subtraction to avoid log(0)
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const change = gaussianRandom(0, 1);
      setCurrStock(prevStock => {
      const change = gaussianRandom(0, 1);
      setLastChange(change);

      const newStock = prevStock + change;

      // Increment time based on previous data length
      setCurTime(prevTime => prevTime + 1);

      // Add new data point using the **latest stock and next time**
      setData(prevData => [
        ...prevData,
        { time: prevData.length, value: newStock }
      ]);

      return newStock;
    });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const isPositive = lastChange >= 0;
  const textColorClass = isPositive ? 'text-green-400' : 'text-red-400';
  const changeSymbol = isPositive ? '▲' : '▼';

  return (
      <>
        <div>
          {data.time}

          {data.value}
        </div>
        <MechStockChart data = {data} key = {data.time}/>
      </>
  );
}
