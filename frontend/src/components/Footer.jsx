import { Link } from "react-router-dom";
import { LogoMark } from "./Logo";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/services-pricing", label: "Services & Pricing" },
  { to: "/safety", label: "Safety" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const POLICIES = [
  { to: "/policies/transportation-agreement", label: "Transportation Agreement" },
  { to: "/policies/privacy-policy", label: "Privacy Policy" },
  { to: "/policies/cancellation-refund-policy", label: "Cancellation Policy" },
  { to: "/policies/terms-of-service", label: "Terms" },
];

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-line bg-surface pb-24 md:pb-0">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark size={44} />
            <p className="font-serif text-xl font-semibold tracking-tight text-ink">Mama's School Rides</p>
          </div>
          <p className="mt-4 max-w-sm font-serif text-lg italic leading-relaxed text-ink/70">
            Private. Door-to-door. Mom-driven.
          </p>
          <p className="mt-2 text-sm text-ink/50">McConachie • Edmonton, Alberta</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-terra">Quick Links</p>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="text-sm text-ink/70 transition-colors hover:text-terra-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-terra">Policies</p>
          <ul className="mt-4 space-y-2.5">
            {POLICIES.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-policy-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="text-sm text-ink/70 transition-colors hover:text-terra-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-line pt-6 text-center text-xs text-ink/45">
        © 2026 Mama's School Rides. All rights reserved.
      </div>
    </div>
  </footer>
);
