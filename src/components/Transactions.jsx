const Transactions = () => {
    const history = [
      { stock: "AAPL", type: "Buy", qty: 10, price: 175, date: "2025-09-18" },
      { stock: "TSLA", type: "Sell", qty: 5, price: 245, date: "2025-09-19" },
    ];
  
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h3 className="font-semibold mb-2">Recent Transactions</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Stock</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((t, idx) => (
              <tr key={idx} className="border-b">
                <td>{t.stock}</td>
                <td>{t.type}</td>
                <td>{t.qty}</td>
                <td>${t.price}</td>
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Transactions;
  