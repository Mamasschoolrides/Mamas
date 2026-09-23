import { Heart, BadgeCheck, FileCheck2, ShieldCheck, Star } from "lucide-react";

const BADGES = [
  { icon: Heart, label: "Mom-Operated" },
  { icon: BadgeCheck, label: "Commercial Driver's Licence" },
  { icon: FileCheck2, label: "Clean Driver's Abstract" },
  { icon: ShieldCheck, label: "Background Clearance" },
  { icon: Star, label: "Safety-Focused" },
];

export const TrustStrip = ({ compact = false }) => (
  <div
    data-testid="trust-strip"
    className={`border-y border-line bg-surface ${compact ? "py-4" : "py-6"}`}
  >
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-3 px-4 sm:px-6 lg:justify-between lg:px-8">
      {BADGES.map((b, i) => (
        <span
          key={b.label}
          data-testid={`trust-badge-${i}`}
          className="inline-flex items-center gap-2 rounded-full border border-terra/20 bg-blush px-4 py-2 text-xs font-bold uppercase tracking-wider text-terra-dark sm:text-[13px]"
        >
          <b.icon size={16} className="text-terra" strokeWidth={2.4} />
          {b.label}
        </span>
      ))}
    </div>
  </div>
);
