// src/components/stockwallet.jsx
import React, { useMemo, useState } from "react";

/**
 * StockWallet
 * Props:
 *  - holdings: [{ ticker, qty, avgPrice }]
 *  - onSell({ticker, qty, price}) => { ok, reason }
 *
 * This component shows holdings and allows quick sell.
 * For demo we use a simple mockPrice function for current market price.
 */

const mockPrice = (ticker) => {
  // deterministic pseudo-prices (replace with real quotes)
  const base = Math.abs(
    ticker.split("").reduce((acc, c) => acc * 31 + c.charCodeAt(0), 7)
  ) % 500;
  return Math.round((base + 50 + (ticker.length % 7) * 3) * 100) / 100;
};

export default function StockWallet({ holdings = [], onSell = () => {} }) {
  const [selling, setSelling] = useState(null); // { ticker, qty }

  const totalValue = useMemo(() => {
    return holdings.reduce((sum, h) => sum + h.qty * mockPrice(h.ticker), 0);
  }, [holdings]);

  const handleQuickSell = (ticker, qty) => {
    const price = mockPrice(ticker);
    const res = onSell({ ticker, qty, price });
    if (!res.ok) {
      alert(res.reason || "Could not sell");
    }
  };

  return (
    <div style={{ padding: 16, borderRadius: 8, border: "1px solid #ddd" }}>
      <h3 style={{ marginTop: 0 }}>Stock Wallet</h3>
      <div style={{ marginBottom: 8 }}>
        Portfolio value (mock prices): <strong>₹{Math.round(totalValue).toLocaleString()}</strong>
      </div>

      {holdings.length === 0 ? (
        <div style={{ color: "#666" }}>No holdings yet.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
              <th>Ticker</th>
              <th>Qty</th>
              <th>Avg Price</th>
              <th>Market</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => {
              const mkt = mockPrice(h.ticker);
              return (
                <tr key={h.ticker} style={{ borderBottom: "1px solid #fafafa" }}>
                  <td style={{ padding: "8px 0" }}>{h.ticker}</td>
                  <td>{h.qty}</td>
                  <td>₹{h.avgPrice}</td>
                  <td>₹{mkt}</td>
                  <td>₹{Math.round(h.qty * mkt)}</td>
                  <td>
                    <button
                      onClick={() => handleQuickSell(h.ticker, Math.max(1, Math.floor(h.qty / 2)))}
                      style={{ padding: "6px 8px" }}
                    >
                      Sell half
                    </button>
                    <button
                      onClick={() => handleQuickSell(h.ticker, h.qty)}
                      style={{ padding: "6px 8px", marginLeft: 8 }}
                    >
                      Sell all
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
