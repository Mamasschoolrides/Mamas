import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, Clock, MapPin } from "lucide-react";
import { Reveal, MaskLine } from "@/components/Reveal";

const CARDS = [
  {
    icon: Phone,
    label: "Call or text",
    value: "(780) 555-1234",
    href: "tel:+17805551234",
    note: "Fastest during the day — text anytime",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@mamasschoolrides.ca",
    href: "mailto:hello@mamasschoolrides.ca",
    note: "I reply within one business day",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri, 7:00 AM – 6:00 PM",
    href: null,
    note: "Driving routes 7:30–9:00 AM & 2:30–4:30 PM",
  },
  {
    icon: MapPin,
    label: "Service area",
    value: "McConachie & surrounding communities",
    href: null,
    note: "North Edmonton, Alberta",
  },
];

export default function Contact() {
  return (
    <div data-testid="contact-page" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">Contact</p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
        <MaskLine delay={0.1}>Let's talk —</MaskLine>
        <MaskLine delay={0.22}>
          parent to <em className="text-terra">parent.</em>
        </MaskLine>
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-ink/70">
        No call centres, no ticket numbers. When you reach out, you're talking to the person who'll be at
        your door in the morning.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {CARDS.map((c, i) => {
          const inner = (
            <>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blush text-terra">
                <c.icon size={22} strokeWidth={2.2} />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-ink/50">{c.label}</p>
              <p className="mt-1 font-serif text-xl font-semibold text-ink">{c.value}</p>
              <p className="mt-1 text-sm text-ink/55">{c.note}</p>
            </>
          );
          return (
            <Reveal key={c.label} delay={i * 0.06}>
              {c.href ? (
                <a
                  href={c.href}
                  data-testid={`contact-card-${i}`}
                  className="block h-full rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-terra/30 hover:shadow-xl hover:shadow-terra/10"
                >
                  {inner}
                </a>
              ) : (
                <div data-testid={`contact-card-${i}`} className="h-full rounded-3xl border border-line bg-surface p-7">
                  {inner}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-14">
        <div data-testid="contact-cta-banner" className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-terra/20" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-sun/15" />
          <h2 className="relative mx-auto max-w-xl font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
            Looking for transportation?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-cream/70">
            Skip the back-and-forth — the route inquiry form tells me everything I need to give you a real answer.
          </p>
          <Link
            to="/check-availability"
            data-testid="contact-check-availability-btn"
            className="relative mt-7 inline-flex items-center gap-2.5 rounded-full bg-terra px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-terra/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark"
          >
            Check Route Availability <ArrowRight size={17} strokeWidth={2.6} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
