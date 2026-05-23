import { useEffect, useState } from "react";
import {
  Home,
  Trophy,
  Laptop,
  Presentation,
  Mic,
  CircleUser,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const menuItems = [
    { label: "Beranda", href: "/", icon: <Home size={18} /> },
    { label: "Competition", href: "/competition", icon: <Trophy size={18} /> },
    { label: "Seminar", href: "/seminar", icon: <Presentation size={18} /> },
    { label: "Workshop", href: "/workshop", icon: <Laptop size={18} /> },
    { label: "Talkshow", href: "/talkshow", icon: <Mic size={18} /> },
    { label: "Login", href: "/login", icon: <CircleUser size={18} /> },
  ];

  const activeStyle = "text-red-900 bg-red-50";
  const defaultStyle = "text-slate-600 hover:text-red-900 hover:bg-red-50/50";

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 rounded-lg ${
      isActive ? activeStyle : defaultStyle
    }`;

  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="logo shrink-0">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png"
            alt="logo"
            className="h-12 sm:h-16"
          />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-1">
          {menuItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={navLinkClass}>
              <span className="w-5 h-5 shrink-0">{item.icon}</span>
              {item.label && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-gray-100"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 top-[60px] bg-black/30 lg:hidden z-40"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-lg z-50 px-4 py-3 flex flex-col gap-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                <span className="w-5 h-5 shrink-0">{item.icon}</span>
                {item.label && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
