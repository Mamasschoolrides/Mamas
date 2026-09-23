import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, FileCheck2, ShieldCheck, ClipboardList, Car, UserCheck, DoorOpen, Siren } from "lucide-react";
import { Reveal, MaskLine } from "@/components/Reveal";

const CREDENTIALS = [
  {
    icon: BadgeCheck,
    title: "Commercial Driver's Licence",
    text: "I hold the proper commercial-class licence for passenger transportation — not just a regular Class 5.",
  },
  {
    icon: FileCheck2,
    title: "Clean Driver's Abstract",
    text: "My driving record is clean, and I'm happy to show it to any parent who asks. Just ask — seriously.",
  },
  {
    icon: ShieldCheck,
    title: "Background Clearance",
    text: "A current police information check / vulnerable sector clearance is in place and kept up to date.",
  },
];

const PRACTICES = [
  {
    icon: ClipboardList,
    title: "Before every route",
    items: [
      "Daily vehicle walk-around: tires, lights, brakes, and seatbelts checked",
      "Vehicle kept clean, warm in winter, and child-ready",
      "Route and timing reviewed so no child is ever rushed",
    ],
  },
  {
    icon: Car,
    title: "During transportation",
    items: [
      "Every child buckled, every trip — no exceptions",
      "Age- and size-appropriate booster seating where required",
      "Calm, defensive driving — no phone use while driving, ever",
    ],
  },
  {
    icon: DoorOpen,
    title: "At pickup",
    items: [
      "Arrival at your door at a consistent, confirmed time",
      "Your child is greeted by name and helped into the vehicle if needed",
      "Quick check that your child is well enough for the school day",
    ],
  },
  {
    icon: UserCheck,
    title: "At drop-off",
    items: [
      "Children released only to you or an authorized adult on your list",
      "School drop-offs happen at the main entrance or designated area",
      "No child is ever left alone at a door or curb",
    ],
  },
  {
    icon: Siren,
    title: "In an emergency",
    items: [
      "911 first, then parents — immediately",
      "Emergency contacts and any medical notes travel with every route",
      "You'll always hear about any incident from me directly, same day",
    ],
  },
];

export default function Safety() {
  return (
    <div data-testid="safety-page">
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">Safety &amp; Trust</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
          <MaskLine delay={0.1}>Your child is our passenger.</MaskLine>
          <MaskLine delay={0.22}>
            Their safety comes <em className="text-terra">first.</em>
          </MaskLine>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
          I drive children the way I drive my own three kids — because that's the only way I know how.
          Here's exactly what that looks like in practice.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">About your driver</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {CREDENTIALS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div data-testid={`credential-card-${i}`} className="h-full rounded-3xl border border-line bg-surface p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blush text-terra">
                  <c.icon size={23} strokeWidth={2.2} />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-6 rounded-2xl border border-line bg-blush/50 p-5 text-sm leading-relaxed text-ink/65">
            <strong className="text-ink">A note on honesty:</strong> City vehicle-for-hire requirements,
            required training, commercial vehicle inspection, and commercial insurance will be listed here
            once they are formally in place. I will never advertise a credential I haven't actually earned —
            you deserve to trust every word on this page.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Safety, step by step
            </h2>
            <p className="mt-4 text-ink/70">
              Not a vague promise — the actual practices behind every school run.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRACTICES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div data-testid={`practice-card-${i}`} className="h-full rounded-3xl border border-line bg-cream p-7">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blush text-terra">
                      <p.icon size={20} strokeWidth={2.2} />
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-ink">{p.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/70">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="mx-auto max-w-xl font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Have a safety question I haven't answered?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-ink/70">
            Call me. I'd rather spend twenty minutes on the phone with a careful parent than have anyone
            wonder about anything.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/check-availability"
              data-testid="safety-check-availability-btn"
              className="inline-flex items-center gap-2.5 rounded-full bg-terra px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-terra/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark"
            >
              Check Route Availability <ArrowRight size={17} strokeWidth={2.6} />
            </Link>
            <a
              href="tel:+17808808566"
              data-testid="safety-call-link"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-7 py-[14px] text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:border-terra hover:text-terra-dark"
            >
              Call (780) 880-8566
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
