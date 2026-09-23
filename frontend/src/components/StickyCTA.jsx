import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HIDDEN_ON = ["/register-private-portal", "/admin"];

export const StickyCTA = () => {
  const { pathname } = useLocation();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div
      data-testid="sticky-mobile-cta"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden"
    >
      <Link
        to="/check-availability"
        data-testid="sticky-check-availability-btn"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-terra py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-terra/30 active:scale-[0.98]"
      >
        Check Route Availability
        <ArrowRight size={17} strokeWidth={2.6} />
      </Link>
    </div>
  );
};
