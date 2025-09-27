const PortfolioCard = ({ title, value, change }) => {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <span
            className={`text-sm font-medium ${
              change > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {change > 0 ? `+${change}%` : `${change}%`}
          </span>
        )}
      </div>
    );
  };
  
  export default PortfolioCard;
  