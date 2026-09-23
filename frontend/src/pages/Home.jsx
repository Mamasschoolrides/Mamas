import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Car, Heart, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Reveal, MaskLine } from "@/components/Reveal";
import { TrustStrip } from "@/components/TrustStrip";
import { Marquee } from "@/components/Marquee";

const HERO_IMG = "https://images.unsplash.com/photo-1689866499898-cf0842274e60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwbW9tJTIwcG9ydHJhaXQlMjBmYW1pbHklMjBjYXIlMjB2YW4lMjBkcml2ZXJ8ZW58MHx8fHwxNzkwMTk5MTAyfDA&ixlib=rb-4.1.0&q=85";
const DRIVER_IMG = "https://images.unsplash.com/photo-1617285962341-73ee07b22ea2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwyfHxzbWlsaW5nJTIwbW9tJTIwcG9ydHJhaXQlMjBmYW1pbHklMjBjYXIlMjB2YW4lMjBkcml2ZXJ8ZW58MHx8fHwxNzkwMTk5MTAyfDA&ixlib=rb-4.1.0&q=85";

const FEATURES = [
  {
    icon: Car,
    title: "Door-to-Door",
    text: "Picked up at your front door, dropped off right at the school entrance. No bus stops, no standing on cold corners in January.",
  },
  {
    icon: Heart,
    title: "Mom-Operated",
    text: "Every route is driven by me — a mom of three. Not an app, not a rotating cast of drivers. The same friendly face, every day.",
  },
  {
    icon: MapPin,
    title: "Community-Focused",
    text: "Routes built around McConachie and nearby neighbourhoods. Small, local, and personal — your kids ride with their neighbours.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    text: "Commercial driver's licence, clean abstract, and background clearance — plus a mom's instincts on every single trip.",
  },
];

const STEPS = [
  { n: "01", title: "Check Availability", text: "Tell me where you live, which school, and what days you need. It takes about two minutes." },
  { n: "02", title: "We Review Your Route", text: "I personally look at every request to see if your address and school fit a route with room." },
  { n: "03", title: "Complete Registration", text: "If there's a fit, you'll receive a private registration link to set up your child's profile." },
  { n: "04", title: "Reserve Your Seat", text: "Sign the transportation agreement and set up payment to hold your child's seat on the route." },
  { n: "05", title: "Ride With Confidence", text: "Same driver, same route, every school day. You get your mornings — and your peace of mind — back." },
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 700], [0, -70]);
  const sunY = useTransform(scrollY, [0, 700], [0, 50]);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blush" />
        <div className="pointer-events-none absolute -left-24 top-64 h-64 w-64 rounded-full bg-[#FDF3E7]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-20">
          <div>
            <motion.span
              data-testid="hero-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-terra/25 bg-blush px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-terra-dark"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-terra" />
              McConachie • Edmonton, AB
            </motion.span>

            <h1 data-testid="hero-headline" className="mt-6 font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              <MaskLine delay={0.15}>Because getting your</MaskLine>
              <MaskLine delay={0.28}>child to school shouldn't</MaskLine>
              <MaskLine delay={0.41}>
                be another thing you{" "}
                <em className="text-terra">worry about.</em>
              </MaskLine>
            </h1>

            <motion.p
              data-testid="hero-subheadline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg"
            >
              Private, door-to-door school transportation for families in McConachie and surrounding
              communities — driven personally by a mom of three.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/check-availability"
                data-testid="hero-check-availability-btn"
                className="group inline-flex items-center gap-2.5 rounded-full bg-terra px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-terra/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark"
              >
                Check Route Availability
                <ArrowRight size={17} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/how-it-works"
                data-testid="hero-how-it-works-btn"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-7 py-[14px] text-sm font-bold uppercase tracking-wide text-ink transition-all duration-300 hover:border-terra hover:text-terra-dark"
              >
                How It Works
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <motion.svg
              style={{ y: sunY }}
              className="absolute -right-8 -top-10 h-28 w-28 animate-spin-slow text-sun"
              viewBox="0 0 100 100" fill="none" aria-hidden="true"
            >
              <circle cx="50" cy="50" r="18" fill="currentColor" opacity="0.9" />
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1="50" y1="8" x2="50" y2="22"
                  stroke="currentColor" strokeWidth="5" strokeLinecap="round"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
            </motion.svg>
            <motion.div style={{ y: heroImgY }} className="relative">
              <div className="overflow-hidden rounded-[3rem] rounded-tr-[7rem] shadow-2xl shadow-terra/20 ring-1 ring-line">
                <img
                  src={HERO_IMG}
                  alt="Your driver — a local mom — smiling beside her vehicle"
                  data-testid="hero-image"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 animate-float-slow rounded-3xl border border-line bg-cream px-5 py-4 shadow-xl sm:-left-8">
                <p className="font-serif text-lg font-semibold text-ink">Mom of three.</p>
                <p className="text-sm text-ink/60">Your driver, every single day.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <TrustStrip />
      <Marquee />

      {/* PEACE OF MIND */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">More than a ride</p>
            <h2 data-testid="peace-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Peace of mind.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">
              As a mom of three, I understand how difficult it can be to balance work, school schedules,
              appointments and everything in between. Mama's School Rides was created to give local families
              a reliable transportation option they can feel comfortable trusting with their children.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div
                data-testid={`feature-card-${i}`}
                className="group h-full rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-terra/30 hover:shadow-xl hover:shadow-terra/10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blush text-terra transition-colors duration-300 group-hover:bg-terra group-hover:text-white">
                  <f.icon size={22} strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">How it works</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Five simple steps to easier school days
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <div data-testid={`step-card-${i}`} className="h-full rounded-3xl border border-line bg-cream p-6">
                  <p className="font-serif text-4xl font-light italic text-terra/70">{s.n}</p>
                  <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center" delay={0.2}>
            <Link
              to="/check-availability"
              data-testid="steps-check-availability-btn"
              className="inline-flex items-center gap-2 rounded-full bg-terra px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-terra/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark"
            >
              Start with Step 1 — It's Free <ArrowRight size={16} strokeWidth={2.6} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* MEET YOUR DRIVER */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden rounded-[3rem] rounded-bl-[6rem] shadow-2xl shadow-terra/15 ring-1 ring-line">
                <img
                  src={DRIVER_IMG}
                  alt="[Your Name], founder and driver of Mama's School Rides"
                  data-testid="driver-photo"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -right-4 top-6 rotate-3 rounded-2xl bg-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink shadow-lg sm:-right-8">
                Mom of 3
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">Meet your driver</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Hi, I'm [Your Name] — and I'll be the one at the wheel.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">
              I'm a mom of three, right here in the neighbourhood. I started Mama's School Rides because I
              know exactly what it's like to juggle work, school bells, and everything in between — and I
              know how much it matters <em>who</em> is driving your child.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
              When you ride with us, you get me. The same driver, the same vehicle, the same friendly
              face at your door every morning. That's the whole point.
            </p>
            <Link
              to="/about"
              data-testid="meet-driver-about-link"
              className="mt-7 inline-flex items-center gap-2 font-bold text-terra-dark transition-colors hover:text-terra"
            >
              Read my full story <ArrowUpRight size={18} strokeWidth={2.4} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div data-testid="final-cta-banner" className="relative overflow-hidden rounded-[2.5rem] bg-terra px-6 py-16 text-center shadow-2xl shadow-terra/30 sm:px-12">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/10" />
            <h2 className="relative mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to make school transportation one less thing to worry about?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/85">
              Check your route in two minutes. No commitment — just a friendly conversation about
              whether we can help.
            </p>
            <Link
              to="/check-availability"
              data-testid="final-check-availability-btn"
              className="relative mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-terra-dark shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Check Route Availability <ArrowRight size={17} strokeWidth={2.6} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
