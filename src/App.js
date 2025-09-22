import React, { useState, useEffect } from "react";
import { useStockEngine } from "./components/stock_engine/StockEngine";
import Graph from "./components/graph_visualizing/Graph";
import Login from "./components/login";

// Optional Sidebar component (simple version)
const Sidebar = () => (
  <div className="bg-gray-800 w-64 min-h-screen p-4 text-white">
    <h2 className="text-2xl font-bold mb-6">Stock Dashboard</h2>
    <ul className="space-y-4">
      <li className="hover:text-green-400 cursor-pointer">Dashboard</li>
      <li className="hover:text-green-400 cursor-pointer">Profile</li>
      <li className="hover:text-green-400 cursor-pointer">Settings</li>
    </ul>
  </div>
);

export default function App() {
  const stockData = useStockEngine({
    initialPrice: 150,
    intervalMs: 1000,
    maxChange: 2.5,
  });

  const [username, setUsername] = useState(null);
  const [prediction, setPrediction] = useState(null); // 'up' or 'down'
  const [predictionStartPrice, setPredictionStartPrice] = useState(0);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(0);

  const latestPrice = stockData[stockData.length - 1]?.price || 0;
  const highestPrice = Math.max(...stockData.map(d => d.price));
  const lowestPrice = Math.min(...stockData.map(d => d.price));

  // Prediction timer effect
  useEffect(() => {
    if (timer <= 0 || !prediction) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, prediction]);

  // Check result when timer reaches 0
  useEffect(() => {
    if (timer === 0 && prediction) {
      if (
        (prediction === "up" && latestPrice > predictionStartPrice) ||
        (prediction === "down" && latestPrice < predictionStartPrice)
      ) {
        setResult("You Won!");
      } else {
        setResult("You Lost!");
      }
      setPrediction(null);
    }
  }, [timer, prediction, latestPrice, predictionStartPrice]);

  const handlePrediction = (direction, duration = 5) => {
    if (prediction) return;
    setPrediction(direction);
    setPredictionStartPrice(latestPrice);
    setTimer(duration);
    setResult(null);
  };

  if (!username) return <Login onLogin={setUsername} />;

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-sans">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-400">Real-Time Stock Simulator</h1>
          <span className="text-gray-300">Welcome, {username}</span>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-2xl shadow p-4 border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-300">Latest Price</h2>
            <p className="text-2xl text-green-400">${latestPrice.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl shadow p-4 border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-300">Highest Price</h2>
            <p className="text-2xl text-green-400">${highestPrice.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl shadow p-4 border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-300">Lowest Price</h2>
            <p className="text-2xl text-red-400">${lowestPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Prediction Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <button
            disabled={!!prediction}
            className="bg-green-500 hover:bg-green-600 rounded-xl px-6 py-2 font-semibold text-black"
            onClick={() => handlePrediction("up", 5)}
          >
            Predict Up
          </button>
          <button
            disabled={!!prediction}
            className="bg-red-500 hover:bg-red-600 rounded-xl px-6 py-2 font-semibold text-black"
            onClick={() => handlePrediction("down", 5)}
          >
            Predict Down
          </button>
          {prediction && <p className="text-yellow-400 font-bold">Time left: {timer}s</p>}
        </div>

        {/* Prediction Result */}
        {result && (
          <div className="mt-4 bg-gray-800 rounded-2xl p-4 text-center text-xl font-bold">
            {result}
          </div>
        )}

        {/* Graph */}
        <div className="bg-gray-800 rounded-2xl shadow p-4 border border-gray-700">
          <Graph data={stockData} />
        </div>
      </div>
    </div>
  );
}
