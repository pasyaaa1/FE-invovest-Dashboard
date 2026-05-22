import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayouts() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
    alert("Logout berhasil!");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Category Event", path: "/dashboard/category" },
    { name: "Event", path: "/dashboard/event" },
    { name: "Pembicara", path: "/dashboard/seminar" },
  ];

  return (
    <div className="flex w-full min-h-screen bg-[#F3F4F6]">
      {/* SIDEBAR */}
      <div className="w-64 bg-[#7B1D3F] text-white flex flex-col justify-between sticky top-0 h-screen shadow-xl">
        <div>
          <div className="p-8 mb-4">
            <h2 className="text-2xl font-bold tracking-tighter italic border-b border-maroon-400 pb-4">
              INVOFEST
            </h2>
          </div>

          <nav className="flex flex-col px-4 gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  location.pathname === item.path
                    ? "bg-white text-[#7B1D3F] shadow-md"
                    : "hover:bg-[#8B1D3F] text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-[#8B1D2E] hover:bg-red-800 text-white py-3 rounded-xl font-bold transition-all shadow-md border border-white/10"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}