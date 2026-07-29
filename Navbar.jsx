import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, CircleParking } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "Home", to: "/" },
  { label: "Find Parking", to: "/parking" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-6xl glass rounded-[24px] shadow-[0_8px_40px_-12px_rgba(37,99,235,0.25)] transition-all duration-500 ${
          scrolled ? "py-2 px-4 max-w-5xl" : "py-3 px-6"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl grad-primary flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform group-hover:rotate-6">
              <CircleParking className="w-5 h-5 text-white" />
            </span>
            <span className="font-heading font-bold text-lg">ParkWise</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary ${
                  pathname === l.to ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/login"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full grad-primary text-white text-sm font-semibold btn-lift hover:shadow-xl hover:shadow-emerald-500/30"
            >
              Login
            </Link>
            <button
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center glass"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-3 pt-3 border-t border-border/60 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary/10">
                {l.label}
              </Link>
            ))}
            <Link to="/login" className="mt-2 px-4 py-3 rounded-full grad-primary text-white text-sm font-semibold text-center">
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}