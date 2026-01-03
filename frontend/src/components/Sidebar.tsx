import { Link, useLocation } from "react-router-dom";
import { CalendarIcon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Generate Plan", path: "/", icon: CalendarIcon },
    { name: "All Meals", path: "/meals", icon: ListBulletIcon },
  ];

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-6 flex flex-col gap-10">
      
      {/* App title + icon */}
      <div className="flex items-center gap-3 mb-10">
        <CalendarIcon className="w-12 h-12 text-blue-400" />
        <span className="text-white text-2xl font-bold">Meal Planner</span>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded transition-colors
                ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
