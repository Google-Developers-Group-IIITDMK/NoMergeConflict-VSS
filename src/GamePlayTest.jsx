import React, { useRef, useState, useEffect } from "react";
import MoneyWallet from "./components/gameplay/moneywallet";
import StockWallet from "./components/gameplay/stockwallet";
import Trade from "./components/gameplay/trade";
import AidsStockPrice from "./components/stock_engines/aids";

export default function App() {
  const moneyWalletRef = useRef();
  const stockWalletRef = useRef();
  const [currStock, setCurrStock] = useState(100); // initial stock price

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <MoneyWallet ref={moneyWalletRef} />
      <StockWallet ref={stockWalletRef} />

      {/* Pass current stock price and updater to AidsStockPrice */}
      <AidsStockPrice currStock={currStock} setCurrStock={setCurrStock} />

      <Trade 
        moneyWalletRef={moneyWalletRef} 
        stockWalletRef={stockWalletRef} 
        stockPrice={currStock} 
      />
    </div>
  );
}
