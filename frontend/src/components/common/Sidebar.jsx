import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "🏠",
  },
  {
    name: "Weather",
    path: "/weather",
    icon: "🌦️",
  },
  {
    name: "Crop",
    path: "/crop",
    icon: "🌾",
  },
  {
    name: "Disease Detection",
    path: "/disease",
    icon: "🦠",
  },
  {
    name: "Irrigation",
    path: "/irrigation",
    icon: "💧",
  },
  {
    name: "Mandi Prices",
    path: "/mandi",
    icon: "🏪",
  },
  {
    name: "Government Schemes",
    path: "/schemes",
    icon: "🏛️",
  },
  {
    name: "Crop Activity",
    path: "/crop-activity",
    icon: "📋",
  },
  {
    name: "AI Chatbot",
    path: "/chatbot",
    icon: "🤖",
  },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white border-r border-green-100 p-4">
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Menu
        </p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;