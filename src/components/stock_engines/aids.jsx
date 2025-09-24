import React, { useEffect, useState } from 'react';
import AidsStockChart from "../stock_charts/aids";

export default function AidsStockPrice({ currStock, setCurrStock }) {
  const [lastChange, setLastChange] = useState(0);
  const [cur_time, setCurTime] = useState(0);
  const [data, setData] = useState([{ time: cur_time, value: currStock }]);

  function gaussianRandom(mean = 0, stdev = 1) {
    let u = 1 - Math.random();
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const change = gaussianRandom(0, 1);
      setLastChange(change);

      setCurrStock(prevStock => {
        const newStock = prevStock + change;

        setCurTime(prevTime => prevTime + 1);

        setData(prevData => [...prevData, { time: prevData.length, value: newStock }]);

        return newStock;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setCurrStock]);

  const isPositive = lastChange >= 0;
  const changeSymbol = isPositive ? '▲' : '▼';

  return (
    <div style={{ width: "1500px" }}>
      <h3>AIDS Stock</h3>
      <p>Current Price: ${currStock.toFixed(2)} {changeSymbol}</p>
      <AidsStockChart data={data} key={data.length} />
    </div>
  );
}
