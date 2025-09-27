import PortfolioCard from "../components/PortfolioCard";
import StockChart from "../components/StockChart";
import Watchlist from "../components/Watchlist";
import Transactions from "../components/Transactions";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Top Cards */}
      <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <PortfolioCard title="Balance" value="$10,000" change={+1.5} />
        <PortfolioCard title="Portfolio Value" value="$15,230" change={-0.8} />
        <PortfolioCard title="Today’s Gain/Loss" value="+$120" change={+0.6} />
      </div>

      {/* Charts & Tables */}
      <div className="col-span-2">
        <StockChart />
      </div>
      <div>
        <Watchlist />
      </div>
      <div className="col-span-3">
        <Transactions />
      </div>
    </div>
  );
};

export default Dashboard;
