import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/services-pricing", label: "Services & Pricing" },
  { to: "/safety", label: "Safety" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header data-testid="site-navbar" className="sticky top-0 z-50 border-b border-line/70 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" data-testid="nav-logo-link" aria-label="Mama's School Rides home" onClick={() => setOpen(false)}>
          <Logo size={40} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200 ${
                  isActive ? "bg-blush text-terra-dark" : "text-ink/70 hover:bg-blush/60 hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/check-availability"
            data-testid="nav-check-availability-btn"
            className="hidden rounded-full bg-terra px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white shadow-lg shadow-terra/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark hover:shadow-xl hover:shadow-terra/30 sm:inline-flex"
          >
            Check Route Availability
          </Link>
          <button
            type="button"
            data-testid="nav-mobile-menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="nav-mobile-menu" className="border-t border-line bg-cream px-4 pb-6 pt-3 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-wide ${
                    isActive || (l.to === "/" && location.pathname === "/") ? "bg-blush text-terra-dark" : "text-ink/75"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/check-availability"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-check-availability-btn"
              className="mt-2 rounded-full bg-terra px-5 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-terra/25"
            >
              Check Route Availability
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
