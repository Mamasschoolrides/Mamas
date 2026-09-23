export const LogoMark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="20" cy="20" r="18" fill="#F5EBE6" stroke="#E87A5D" strokeWidth="2" />
    <path d="M12 24C12 20.6863 14.6863 18 18 18H22C25.3137 18 28 20.6863 28 24V25C28 26.1046 27.1046 27 26 27H14C12.8954 27 12 26.1046 12 25V24Z" fill="#E87A5D" />
    <circle cx="16" cy="27" r="2.5" fill="#2B2523" />
    <circle cx="24" cy="27" r="2.5" fill="#2B2523" />
    <path d="M20 12V15M14.5 14L16.5 16.5M25.5 14L23.5 16.5" stroke="#F4A261" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Logo = ({ size = 40 }) => (
  <span className="inline-flex items-center gap-2.5">
    <LogoMark size={size} />
    <span className="font-serif font-semibold text-ink leading-none">
      <span className="block text-lg tracking-tight">Mama's</span>
      <span className="block text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-terra">School Rides</span>
    </span>
  </span>
);
