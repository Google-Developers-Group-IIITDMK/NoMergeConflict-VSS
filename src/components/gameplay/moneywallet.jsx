// src/components/moneywallet.jsx
import React, { useState } from "react";

/**
 * MoneyWallet
 * Props:
 *  - balance (number)
 *  - onChangeBalance(delta) — positive for deposit, negative for withdraw
 */

export default function MoneyWallet({ balance = 0, onChangeBalance = () => {} }) {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("deposit"); // deposit | withdraw
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const num = Number(amount);
    if (!Number.isFinite(num) || num <= 0) {
      setError("Enter a positive amount");
      return;
    }
    if (mode === "withdraw" && num > balance) {
      setError("Insufficient funds");
      return;
    }
    onChangeBalance(mode === "deposit" ? num : -num);
    setAmount("");
  };

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>Money Wallet</h3>
      <div style={{ fontSize: 20, marginBottom: 8 }}>
        Cash balance: <strong>₹{Number(balance).toLocaleString()}</strong>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 13 }}>Action</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: "6px 8px" }}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 13 }}>Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            inputMode="decimal"
            style={{ padding: "6px 8px", minWidth: 120 }}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <button type="submit" style={{ padding: "8px 12px" }}>
            {mode === "deposit" ? "Deposit" : "Withdraw"}
          </button>
        </div>
      </form>

      {error && <div style={{ color: "crimson", marginTop: 10 }}>{error}</div>}
    </div>
  );
}
