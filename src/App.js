import React, { useState } from "react";
import { useStockEngine } from "./components/stock_engine/StockEngine";
import Graph from "./components/graph_visualizing/Graph";
import Login from "./components/login";

export default function App() {
  const stockData = useStockEngine({
    initialPrice: 150,
    intervalMs: 1000,
    maxChange: 2.5,
  });

  const [username, setUsername] = useState(null);

  if (!username){
    return <Login onLogin={setUsername} />;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          Real-Time Stock Simulator
        </h1>
        <Graph data={stockData} />
      </div>
    </div>
  );
}

