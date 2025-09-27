// src/components/tradingdesk.jsx
import React, { useEffect, useState } from "react";
import MoneyWallet from "./moneywallet";
import StockWallet from "./stockwallet";
import Trade from "./trade";

/**
 * TradingDesk: top-level parent that keeps the canonical state
 * - balance: number (cash)
 * - holdings: { ticker: string, qty: number, avgPrice: number }[]
 *
 * Persists to localStorage so it works without a backend.
 */

const BAL_KEY = "vss:balance";
const HOLD_KEY = "vss:holdings";

const readJSON = (k, fallback) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

export default function TradingDesk() {
  const [balance, setBalance] = useState(() => readJSON(BAL_KEY, 10000)); // start with 10k
  const [holdings, setHoldings] = useState(() => readJSON(HOLD_KEY, []));

  useEffect(() => writeJSON(BAL_KEY, balance), [balance]);
  useEffect(() => writeJSON(HOLD_KEY, holdings), [holdings]);

  // deposit / withdraw
  const changeBalance = (delta) => {
    setBalance((b) => {
      const next = Math.round((b + delta) * 100) / 100;
      return next < 0 ? 0 : next;
    });
  };

  // buy: ticker, qty, price => reduces balance, updates holdings
  const buyStock = ({ ticker, qty, price }) => {
    const cost = Math.round(qty * price * 100) / 100;
    if (cost > balance) {
      return { ok: false, reason: "Insufficient cash" };
    }
    setBalance((b) => Math.round((b - cost) * 100) / 100);
    setHoldings((prev) => {
      const idx = prev.findIndex((h) => h.ticker === ticker);
      if (idx === -1) {
        return [...prev, { ticker, qty, avgPrice: price }];
      } else {
        const existing = prev[idx];
        const totalQty = existing.qty + qty;
        const totalCost = existing.avgPrice * existing.qty + price * qty;
        const newAvg = Math.round((totalCost / totalQty) * 100) / 100;
        const copy = [...prev];
        copy[idx] = { ticker, qty: totalQty, avgPrice: newAvg };
        return copy;
      }
    });
    return { ok: true };
  };

  // sell: ticker, qty, price => increases balance, updates holdings
  const sellStock = ({ ticker, qty, price }) => {
    const idx = holdings.findIndex((h) => h.ticker === ticker);
    if (idx === -1) return { ok: false, reason: "Not holding this ticker" };
    const holding = holdings[idx];
    if (qty > holding.qty) return { ok: false, reason: "Not enough shares" };
    const proceeds = Math.round(qty * price * 100) / 100;
    setBalance((b) => Math.round((b + proceeds) * 100) / 100);

    setHoldings((prev) => {
      const copy = [...prev];
      const newQty = holding.qty - qty;
      if (newQty <= 0) {
        copy.splice(idx, 1);
      } else {
        copy[idx] = { ...holding, qty: newQty };
      }
      return copy;
    });
    return { ok: true };
  };

  return (
    <div style={{ maxWidth: 960, margin: "24px auto", fontFamily: "system-ui, -apple-system, Roboto, 'Segoe UI', 'Helvetica Neue', Arial" }}>
      <h1 style={{ marginBottom: 12 }}>Trading Desk</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 20 }}>
        <div>
          <Trade onBuy={buyStock} balance={balance} />
          <div style={{ marginTop: 20 }}>
            <StockWallet holdings={holdings} onSell={sellStock} />
          </div>
        </div>

        <div>
          <MoneyWallet balance={balance} onChangeBalance={changeBalance} />
          <div style={{ marginTop: 12, fontSize: 13, color: "#555" }}>
            <strong>Persistence:</strong> balance & holdings are saved to localStorage.
          </div>
        </div>
      </div>
    </div>
  );
}
