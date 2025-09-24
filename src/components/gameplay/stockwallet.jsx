import React, { useState, forwardRef, useImperativeHandle } from "react";

/**
 * MoneyWallet
 * 
 * Props: none
 * 
 * Methods exposed via ref:
 *  - updateMoney(change): updates wallet amount by `change` (can be positive or negative)
 *  - getCurrentStock(): returns current wallet amount
 * 
 * Usage:
 *  const walletRef = useRef();
 *  walletRef.current.updateMoney(50); // add $50
 *  const current = walletRef.current.getCurrentStock();
 */
const StockWallet = forwardRef((props, ref) => {
  const [stock1, setAmount1] = useState(0); // initial state of $1000
  const [stock2, setAmount2] = useState(0);
  const [stock3, setAmount3] = useState(0); // initial state of $1000
  const [stock4, setAmount4] = useState(0);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    updatestock1: (change) => {
      setAmount1((prev) => prev + change);
    },
    getCurrentStock1: () => stock1,

    updatestock2: (change) => {
      setAmount2((prev) => prev + change);
    },
    getCurrentStock2: () => stock2,

    updatestock3: (change) => {
      setAmount3((prev) => prev + change);
    },
    getCurrentStock3: () => stock3,

    updatestock4: (change) => {
      setAmount4((prev) => prev + change);
    },
    getCurrentStock4: () => stock4,
  }));

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", width: "250px" }}>
      <h3>Money Wallet</h3>
      <p>Current Amount: ${stock1.toFixed(2)}</p>
      <p>Current Amount: ${stock2.toFixed(2)}</p>
      <p>Current Amount: ${stock3.toFixed(2)}</p>
      <p>Current Amount: ${stock4.toFixed(2)}</p>
    </div>
  );
});

export default StockWallet;
