import { Bell, User } from "lucide-react";

const Header = ({ setSidebarOpen }) => {
  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 shadow">
      <button
        className="md:hidden"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        ☰
      </button>
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="flex gap-4 items-center">
        <Bell className="cursor-pointer" />
        <User className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
