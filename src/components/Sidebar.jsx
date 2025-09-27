import { Home, PieChart, TrendingUp, List, Settings } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menu = [
    { name: "Dashboard", icon: <Home size={18} /> },
    { name: "Portfolio", icon: <PieChart size={18} /> },
    { name: "Transactions", icon: <List size={18} /> },
    { name: "Market Trends", icon: <TrendingUp size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-white shadow-lg transition-all duration-300`}
    >
      <h1 className="text-xl font-bold text-center py-4">VSS</h1>
      <ul className="space-y-2 px-2">
        {menu.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            {item.icon}
            {sidebarOpen && <span>{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
