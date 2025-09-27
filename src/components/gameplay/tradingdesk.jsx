// src/components/gameplay/tradingdesk.jsx
import React, { useState } from "react";
import MoneyWallet from "./moneywallet";
import StockWallet from "./stockwallet";
import Trade from "./trade";

function TradingDesk() {
  const [balance, setBalance] = useState(10000); // starting cash
  const [holdings, setHoldings] = useState([]);  // array of { ticker, qty, avgPrice }

  // Buy stock
  const buyStock = ({ ticker, qty, price }) => {
    const cost = qty * price;
    if (cost > balance) {
      return { ok: false, reason: "Not enough balance" };
    }

    setBalance((b) => b - cost);

    setHoldings((prev) => {
      const existing = prev.find((h) => h.ticker === ticker);
      if (existing) {
        const newQty = existing.qty + qty;
        const newAvg =
          (existing.avgPrice * existing.qty + price * qty) / newQty;
        return prev.map((h) =>
          h.ticker === ticker ? { ...h, qty: newQty, avgPrice: newAvg } : h
        );
      }
      return [...prev, { ticker, qty, avgPrice: price }];
    });

    return { ok: true };
  };

  // Sell stock
  const sellStock = ({ ticker, qty, price }) => {
    const existing = holdings.find((h) => h.ticker === ticker);
    if (!existing) {
      return { ok: false, reason: `No holdings for ${ticker}` };
    }
    if (qty > existing.qty) {
      return { ok: false, reason: `You only own ${existing.qty} shares` };
    }

    const proceeds = qty * price;
    setBalance((b) => b + proceeds);

    setHoldings((prev) =>
      prev
        .map((h) =>
          h.ticker === ticker ? { ...h, qty: h.qty - qty } : h
        )
        .filter((h) => h.qty > 0)
    );

    return { ok: true };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <MoneyWallet balance={balance} />
      <Trade balance={balance} onBuy={buyStock} onSell={sellStock} holdings={holdings} />
      <StockWallet holdings={holdings} onSell={sellStock} />
    </div>
  );
}

export default TradingDesk;
