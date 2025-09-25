import React, { useRef, useState } from "react";
import MoneyWallet from "./moneywallet";
import StockWallet from "./stockwallet";


export default function TradingDesk({ stockPrices = {} }) {
  // stockPrices should be an object like: 
  // { AIDS: 123.45, CSE: 98.76, ECE: 110.2, MECH: 77.1 }

  const moneyWalletRef = useRef();
  const stockWalletRef = useRef();

  const [selectedStock, setSelectedStock] = useState("AIDS");

  // Map stock names to the right wallet updater functions
  const stockMethods = {
    AIDS: {
      update: (change) => stockWalletRef.current.updatestock1(change),
      get: () => stockWalletRef.current.getCurrentStock1(),
    },
    CSE: {
      update: (change) => stockWalletRef.current.updatestock2(change),
      get: () => stockWalletRef.current.getCurrentStock2(),
    },
    ECE: {
      update: (change) => stockWalletRef.current.updatestock3(change),
      get: () => stockWalletRef.current.getCurrentStock3(),
    },
    MECH: {
      update: (change) => stockWalletRef.current.updatestock4(change),
      get: () => stockWalletRef.current.getCurrentStock4(),
    },
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
        marginTop: "20px",
      }}
    >
      {/* Wallets (compact stacked view) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <MoneyWallet ref={moneyWalletRef} />
        <StockWallet ref={stockWalletRef} />
      </div>

      {/* Trade Box */}
      <div>
        <h2>Trading Panel</h2>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Select Stock:
            {stockPrices && Object.keys(stockPrices).length > 0 ? (
              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                style={{ marginLeft: "10px" }}
              >
                {Object.keys(stockPrices).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            ) : (
              <span style={{ marginLeft: "10px" }}>No stock prices available</span>
            )}
          </label>
        </div>

        {/* Pass correct wallet + stock methods + current stock price */}
        <Trade
          moneyWalletRef={moneyWalletRef}
          stockWalletRef={{
            current: {
              updatestock1: stockMethods[selectedStock].update,
              getCurrentStock1: stockMethods[selectedStock].get,
            },
          }}
          stockPrice={stockPrices[selectedStock] ?? 0}  // safe fallback
        />
      </div>
    </div>
  );
}
