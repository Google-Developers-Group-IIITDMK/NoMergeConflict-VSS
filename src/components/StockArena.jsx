import React, { useState } from "react";
import AidsStockPrice from "./stock_engines/aids";
import CseStockPrice from "./stock_engines/cse";
import EceStockPrice from "./stock_engines/ece";
import MechStockPrice from "./stock_engines/mech";

export default function StockArena() {
  const [topChart, setTopChart] = useState("AIDS");
  const [bottomChart, setBottomChart] = useState("CSE");

  // **Mount all stock components once**
  const stockComponents = {
    AIDS: <AidsStockPrice key="AIDS" />,
    CSE: <CseStockPrice key="CSE" />,
    ECE: <EceStockPrice key="ECE" />,
    MECH: <MechStockPrice key="MECH" />,
  };

  const stockNames = Object.keys(stockComponents);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Top Chart */}
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <label>
          Select Top Chart:
          <select
            value={topChart}
            onChange={(e) => setTopChart(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            {stockNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <div style={{ marginTop: "10px", height: "150%" }}>
          {stockNames.map((name) => (
            <div
              key={name}
              style={{ display: topChart === name ? "block" : "none" }}
            >
              {stockComponents[name]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
