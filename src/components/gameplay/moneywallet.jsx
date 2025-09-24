import React, { useState, forwardRef, useImperativeHandle } from "react";

/**
 * MoneyWallet
 * 
 * Props: none
 * 
 * Methods exposed via ref:
 *  - updateMoney(change): updates wallet amount by `change` (can be positive or negative)
 *  - getCurrentMoney(): returns current wallet amount
 * 
 * Usage:
 *  const walletRef = useRef();
 *  walletRef.current.updateMoney(50); // add $50
 *  const current = walletRef.current.getCurrentMoney();
 */
const MoneyWallet = forwardRef((props, ref) => {
  const [amount, setAmount] = useState(1000); // initial state of $1000

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    updateMoney: (change) => {
      setAmount((prev) => prev + change);
    },
    getCurrentMoney: () => amount,
  }));

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", width: "250px" }}>
      <h3>Money Wallet</h3>
      <p>Current Amount: ${amount.toFixed(2)}</p>
    </div>
  );
});

export default MoneyWallet;
