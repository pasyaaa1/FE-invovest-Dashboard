import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "../components/ui/Button";

export default function DashboardLayouts() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

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
    { name: "Biodata", path: "/dashboard/biodata" },
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/dashboard" && location.pathname.startsWith(path));

  const sidebarContent = (
    <>
      <div>
        <div className="p-6 lg:p-8 mb-2 lg:mb-4">
          <h2 className="text-xl lg:text-2xl font-bold border-b border-white/10 pb-4">
            MAIN DASHBOARD
          </h2>
        </div>

        <nav className="flex flex-col px-4 gap-3 lg:gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                isActive(item.path)
                  ? "bg-white text-[#7B1D3F] shadow-md"
                  : "hover:bg-[#8B1D3F] text-white/80 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 lg:p-6">
        <Button
          label="Logout"
          variant="outline"
          className="w-full bg-[#8B1D2E] hover:bg-red-800 text-white py-2 rounded-xl font-bold transition-colors shadow-md border border-white/10"
          onClick={handleLogout}
        />
      </div>
    </>
  );

  return (
    <div className="flex w-full min-h-screen bg-[#F3F4F6]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR — drawer on mobile, fixed on desktop */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 max-w-[85vw] bg-[#7B1D3F] text-white flex flex-col justify-between shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Tutup menu"
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={22} />
        </button>
        {sidebarContent}
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 bg-[#7B1D3F] text-white px-4 py-3 shadow-md">
          <button
            type="button"
            aria-label="Buka menu"
            className="p-2 rounded-lg hover:bg-white/10"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-sm truncate">MAIN DASHBOARD</span>
        </header>

        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
