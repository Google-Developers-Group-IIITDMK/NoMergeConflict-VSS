import React, { useState } from "react";

export default function Trade({ moneyWalletRef, stockWalletRef, stockPrice }) {
  const [action, setAction] = useState("buy"); // buy or sell
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");

  const handleTrade = () => {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      setMessage("Enter a valid quantity!");
      return;
    }

    const totalPrice = qty * stockPrice;

    if (action === "buy") {
      const currentMoney = moneyWalletRef.current.getCurrentMoney();
      if (currentMoney < totalPrice) {
        setMessage("Insufficient funds!");
        return;
      }
      // Deduct money and add stocks
      moneyWalletRef.current.updateMoney(-totalPrice);
      stockWalletRef.current.updatestock1(qty);
      setMessage(`Bought ${qty} stock(s) for $${totalPrice.toFixed(2)}`);
    } else {
      const currentStock = stockWalletRef.current.getCurrentStock1();
      if (currentStock < qty) {
        setMessage("Insufficient stocks to sell!");
        return;
      }
      // Deduct stocks and add money
      stockWalletRef.current.updatestock1(-qty);
      moneyWalletRef.current.updateMoney(totalPrice);
      setMessage(`Sold ${qty} stock(s) for $${totalPrice.toFixed(2)}`);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", width: "300px", marginTop: "20px" }}>
      <h3>Trade Stocks</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Action:
          <select value={action} onChange={(e) => setAction(e.target.value)} style={{ marginLeft: "10px" }}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ marginLeft: "10px", width: "60px" }}
          />
        </label>
      </div>

      <button onClick={handleTrade} style={{ padding: "5px 15px" }}>
        Execute
      </button>

      {message && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>}
      <p>Current Stock Price: ${stockPrice.toFixed(2)}</p>
    </div>
  );
}
