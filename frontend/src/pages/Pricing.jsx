import { Link } from "react-router-dom";
import { ArrowRight, Check, FileText } from "lucide-react";
import { Reveal, MaskLine } from "@/components/Reveal";

const TIERS = [
  {
    name: "Round Trip",
    price: "$550",
    unit: "/month",
    tag: "Most popular",
    blurb: "The full school run, handled — morning and afternoon, Monday to Friday.",
    features: [
      "Morning pickup at your front door",
      "Afternoon drop-off back at home",
      "Monday to Friday, all school days",
      "Reserved seat on the route",
      "Simple absence notification by text",
      "Same driver every single day",
    ],
    featured: true,
  },
  {
    name: "One-Way",
    price: "$425",
    unit: "/month",
    tag: null,
    blurb: "Choose mornings or afternoons — whichever half of the day you need covered.",
    features: [
      "Morning home → school, or",
      "Afternoon school → home",
      "Monday to Friday, all school days",
      "Reserved seat on the route",
      "Same driver every single day",
    ],
    featured: false,
  },
  {
    name: "Sibling Rates",
    price: "$900",
    unit: "/month for two",
    tag: null,
    blurb: "Kids from the same household on the same route and schedule ride for less.",
    features: [
      "First child — $550/month",
      "Second sibling — +$350/month",
      "Third sibling — +$250/month",
      "Two children total: $900/month",
      "Three children total: $1,150/month",
      "One pickup, one drop-off, one bill",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <div data-testid="pricing-page">
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">Services &amp; Pricing</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
          <MaskLine delay={0.1}>Simple pricing.</MaskLine>
          <MaskLine delay={0.22}>
            No surprises, <em className="text-terra">ever.</em>
          </MaskLine>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
          One monthly fee reserves your child's seat on the route. That's it — no fuel surcharges,
          no booking fees, no fine-print math.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div
                data-testid={`pricing-tier-${i}`}
                className={`relative flex h-full flex-col rounded-[2rem] border p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                  t.featured
                    ? "border-terra bg-terra text-white shadow-2xl shadow-terra/25"
                    : "border-line bg-surface hover:shadow-xl hover:shadow-terra/10"
                }`}
              >
                {t.tag && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gold px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
                    {t.tag}
                  </span>
                )}
                <h2 className={`font-serif text-2xl font-semibold ${t.featured ? "text-white" : "text-ink"}`}>{t.name}</h2>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className={`font-serif text-5xl font-semibold tracking-tight ${t.featured ? "text-white" : "text-ink"}`}>
                    {t.price}
                  </span>
                  <span className={`text-sm font-medium ${t.featured ? "text-white/80" : "text-ink/55"}`}>{t.unit}</span>
                </div>
                <p className={`mt-3 text-sm leading-relaxed ${t.featured ? "text-white/85" : "text-ink/60"}`}>{t.blurb}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={17} strokeWidth={3} className={`mt-0.5 shrink-0 ${t.featured ? "text-gold" : "text-sage"}`} />
                      <span className={t.featured ? "text-white/90" : "text-ink/75"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/check-availability"
                  data-testid={`pricing-check-availability-btn-${i}`}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                    t.featured
                      ? "bg-white text-terra-dark shadow-lg"
                      : "bg-terra text-white shadow-lg shadow-terra/25 hover:bg-terra-dark"
                  }`}
                >
                  Check Availability <ArrowRight size={16} strokeWidth={2.6} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 mx-auto max-w-2xl text-center text-sm leading-relaxed text-ink/55">
          New families pay a one-time <strong className="text-ink">$75 family registration fee</strong> with
          their first payment — it covers administrative onboarding, route planning, account setup and
          required documentation. Additional children added to an existing family account later may be
          subject to a <strong className="text-ink">$25 onboarding fee</strong> per child. Plans bill
          automatically each month by card.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div data-testid="pricing-disclaimer" className="mt-6 flex items-start gap-4 rounded-3xl border border-line bg-blush/50 p-6 sm:p-7">
            <FileText className="mt-0.5 shrink-0 text-terra" size={22} />
            <p className="text-sm leading-relaxed text-ink/70">
              <strong className="text-ink">A quick, honest note on pricing:</strong> monthly fees reserve
              your child's seat on the route for the full month. Missed rides — sick days, family
              vacations, or schedule changes — are not automatically refunded or credited, since the seat
              is held for your child either way. Please refer to the{" "}
              <Link to="/policies/transportation-agreement" className="font-semibold text-terra-dark underline underline-offset-2">
                Parent Transportation Agreement
              </Link>{" "}
              and{" "}
              <Link to="/policies/cancellation-refund-policy" className="font-semibold text-terra-dark underline underline-offset-2">
                Cancellation &amp; Refund Policy
              </Link>{" "}
              for full details.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
