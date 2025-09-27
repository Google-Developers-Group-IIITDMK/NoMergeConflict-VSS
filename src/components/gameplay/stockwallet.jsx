// StockWallet.jsx
import React, { useState, useMemo } from "react";

const mockPrice = (ticker) => {
  // same as your code or real price fetch
  return Math.round((50 + ticker.length * 3 + ticker.charCodeAt(0) % 100) * 100) / 100;
};

function StockWallet({ holdings = [], onSell = () => {} }) {
  const [sellTicker, setSellTicker] = useState("");
  const [sellQty, setSellQty] = useState("");
  const [message, setMessage] = useState("");

  const totalValue = useMemo(() => {
    return holdings.reduce((sum, h) => sum + h.qty * mockPrice(h.ticker), 0);
  }, [holdings]);

  const handleSellSubmit = (e) => {
    e.preventDefault();
    const ticker = sellTicker.trim().toUpperCase();
    const qty = Number(sellQty);
    if (!ticker) {
      setMessage("Select a ticker to sell");
      return;
    }
    if (!Number.isFinite(qty) || qty <= 0 || !Number.isInteger(qty)) {
      setMessage("Enter a valid positive integer quantity");
      return;
    }
    const holding = holdings.find((h) => h.ticker === ticker);
    if (!holding) {
      setMessage(`No holdings for ${ticker}`);
      return;
    }
    if (qty > holding.qty) {
      setMessage(`You only have ${holding.qty} shares of ${ticker}`);
      return;
    }
    const price = mockPrice(ticker);
    const result = onSell({ ticker, qty, price });
    if (!result.ok) {
      setMessage(result.reason || "Sell failed");
    } else {
      setMessage(`Sold ${qty} ${ticker} @ ₹${price}`);
      // clear form
      setSellTicker("");
      setSellQty("");
    }
  };

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
      <h3>Stock Wallet</h3>
      <div>Portfolio value: ₹{Math.round(totalValue).toLocaleString()}</div>

      {holdings.length === 0 ? (
        <div>No holdings yet.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
          <thead>
            <tr>
              <th>Ticker</th><th>Qty</th><th>Avg Price</th><th>Market</th><th>Value</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => {
              const mkt = mockPrice(h.ticker);
              return (
                <tr key={h.ticker}>
                  <td>{h.ticker}</td>
                  <td>{h.qty}</td>
                  <td>₹{h.avgPrice}</td>
                  <td>₹{mkt}</td>
                  <td>₹{Math.round(h.qty * mkt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* Sell form */}
      <form onSubmit={handleSellSubmit} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <label>Ticker</label>
          <select
            value={sellTicker}
            onChange={(e) => setSellTicker(e.target.value)}
          >
            <option value="">Select ticker</option>
            {holdings.map((h) => (
              <option value={h.ticker} key={h.ticker}>{h.ticker}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity to sell</label>
          <input
            type="number"
            min="1"
            value={sellQty}
            onChange={(e) => setSellQty(e.target.value)}
            placeholder="0"
          />
        </div>
        <div>
          <button type="submit">Sell</button>
        </div>
      </form>

      {message && <div style={{ marginTop: 12, color: message.startsWith("Sold") ? "green" : "crimson" }}>{message}</div>}
    </div>
  );
}

export default StockWallet;
