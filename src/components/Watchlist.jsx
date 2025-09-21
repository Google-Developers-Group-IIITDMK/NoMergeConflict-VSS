const Watchlist = () => {
    const stocks = [
      { symbol: "AAPL", price: 180, change: +1.2 },
      { symbol: "TSLA", price: 250, change: -0.8 },
      { symbol: "AMZN", price: 130, change: +2.1 },
    ];
  
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h3 className="font-semibold mb-2">Watchlist</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Symbol</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s, idx) => (
              <tr key={idx} className="border-b">
                <td>{s.symbol}</td>
                <td>${s.price}</td>
                <td className={s.change > 0 ? "text-green-500" : "text-red-500"}>
                  {s.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Watchlist;
  