// src/components/trade.jsx
import React, { useState } from "react";

/**
 * Trade: buy-only simple component
 * Props:
 *  - onBuy({ticker, qty, price}) => { ok, reason }
 *  - balance (number)
 *
 * For demo, price can be entered or "use market" (mock price).
 */

const mockPrice = (ticker) => {
  if (!ticker) return 0;
  return Math.round((50 + ticker.length * 3 + ticker.charCodeAt(0) % 100) * 100) / 100;
};

export default function Trade({ onBuy = () => {}, balance = 0 }) {
  const [ticker, setTicker] = useState("");
  const [qty, setQty] = useState("");
  const [useMarket, setUseMarket] = useState(true);
  const [limitPrice, setLimitPrice] = useState("");
  const [message, setMessage] = useState("");

  const price = useMarket ? mockPrice(ticker) : Number(limitPrice);

  const handleBuy = (e) => {
    e.preventDefault();
    setMessage("");
    if (!ticker || !/^[A-Za-z]{1,6}$/.test(ticker.trim())) {
      setMessage("Enter a valid ticker (1-6 letters).");
      return;
    }
    const q = Number(qty);
    if (!Number.isFinite(q) || q <= 0 || !Number.isInteger(q)) {
      setMessage("Enter a positive integer quantity.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setMessage("Invalid price.");
      return;
    }
    const cost = Math.round(q * price * 100) / 100;
    if (cost > balance) {
      setMessage(`Insufficient cash. Need ₹${cost.toLocaleString()}, have ₹${balance.toLocaleString()}.`);
      return;
    }
    const res = onBuy({ ticker: ticker.toUpperCase(), qty: q, price });
    if (!res.ok) {
      setMessage(res.reason || "Buy failed");
    } else {
      setMessage(`Bought ${q} ${ticker.toUpperCase()} @ ₹${price} (cost ₹${cost}).`);
      setTicker("");
      setQty("");
      setLimitPrice("");
    }
  };

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>Trade — Buy</h3>
      <form onSubmit={handleBuy} style={{ display: "grid", gap: 8 }}>
        <div>
          <label style={{ fontSize: 13 }}>Ticker</label>
          <input value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="AAPL" style={{ width: "100%", padding: "8px" }} />
        </div>

        <div>
          <label style={{ fontSize: 13 }}>Quantity</label>
          <input value={qty} onChange={(e) => setQty(e.target.value)} inputMode="numeric" placeholder="10" style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <label>
            <input type="radio" checked={useMarket} onChange={() => setUseMarket(true)} /> Use market price (auto)
          </label>
          <label>
            <input type="radio" checked={!useMarket} onChange={() => setUseMarket(false)} /> Limit price
          </label>
        </div>

        {!useMarket && (
          <div>
            <label style={{ fontSize: 13 }}>Limit price</label>
            <input value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} placeholder="100.00" style={{ width: "100%", padding: "8px" }} />
          </div>
        )}

        <div>
          <div style={{ marginBottom: 8, fontSize: 13 }}>
            Price preview: <strong>₹{price || "—"}</strong>
          </div>
          <button type="submit" style={{ padding: "8px 12px" }}>
            Buy
          </button>
        </div>
      </form>

      {message && <div style={{ marginTop: 10, color: message.startsWith("Bought") ? "green" : "crimson" }}>{message}</div>}
    </div>
  );
}
