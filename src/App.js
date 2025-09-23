import React, { useState, useEffect } from "react";
import { useStockEngine } from "./components/stock_engine/StockEngine";
import Graph from "./components/graph_visualizing/Graph";
import Login from "./components/login";
import { LineChart, TrendingUp, User, Settings } from "lucide-react";

// Sidebar Component
const Sidebar = () => (
  <div className="bg-gray-900 w-64 min-h-screen p-6 text-white shadow-lg border-r border-gray-800">
    <h2 className="text-2xl font-bold mb-10 text-green-400">IIIT StockSim</h2>
    <ul className="space-y-6 text-lg">
      <li className="flex items-center gap-3 hover:text-green-400 cursor-pointer">
        <LineChart size={20} /> Dashboard
      </li>
      <li className="flex items-center gap-3 hover:text-green-400 cursor-pointer">
        <User size={20} /> Profile
      </li>
      <li className="flex items-center gap-3 hover:text-green-400 cursor-pointer">
        <Settings size={20} /> Settings
      </li>
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
  const [prediction, setPrediction] = useState(null); 
  const [predictionStartPrice, setPredictionStartPrice] = useState(0);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(0);

  const latestPrice = stockData[stockData.length - 1]?.price || 0;
  const highestPrice = Math.max(...stockData.map(d => d.price));
  const lowestPrice = Math.min(...stockData.map(d => d.price));

  useEffect(() => {
    if (timer <= 0 || !prediction) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, prediction]);

  useEffect(() => {
    if (timer === 0 && prediction) {
      if (
        (prediction === "up" && latestPrice > predictionStartPrice) ||
        (prediction === "down" && latestPrice < predictionStartPrice)
      ) {
        setResult("✅ You Won!");
      } else {
        setResult("❌ You Lost!");
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
    <div className="min-h-screen bg-gray-950 text-white font-sans p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Virtual Stock Simulator</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">User: {username}</span>
          <button
            onClick={() => setUsername(null)}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-black font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
  
      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Graph */}
        <div className="md:col-span-2 bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg">
          <Graph data={stockData} />
        </div>
  
        {/* Right: Stats + Trading */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg space-y-6">
          {/* Stock Price */}
          <div>
            <h2 className="text-sm text-gray-400">Current Stock Price</h2>
            <p className="text-3xl font-bold text-white">
              {latestPrice.toFixed(2)} gdg
            </p>
          </div>
  
          {/* Vault Balance */}
          <div>
            <h2 className="text-sm text-gray-400">Vault Balance</h2>
            <p className="text-lg font-semibold text-white">1000.00 gdg bits</p>
            <p className="text-sm text-gray-400">Total Invested: 0.00 gdg</p>
            <p className="text-sm text-gray-400">Shares Owned: 0</p>
            <p className="text-sm text-gray-400">
              Unrealized P/L: <span className="text-green-400">0.00 gdg</span>
            </p>
          </div>
  
          {/* Quick Trade */}
          <div>
            <h2 className="text-sm text-gray-400 mb-2">Quick Trade</h2>
            <input
              type="number"
              defaultValue={1}
              className="w-full bg-gray-800 text-white rounded-lg p-2 mb-3 border border-gray-700"
            />
            <div className="flex gap-3">
              <button className="flex-1 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-black font-semibold">
                Buy @ {latestPrice.toFixed(2)}
              </button>
              <button className="flex-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-black font-semibold">
                Sell
              </button>
            </div>
          </div>
  
          {/* Notes */}
          <p className="text-xs text-gray-500 mt-4">
            This simulator uses normally-distributed random moves per second (gaussian noise).
          </p>
        </div>
      </div>
    </div>
  );
  
}
