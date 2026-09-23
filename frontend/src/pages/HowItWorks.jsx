import { Link } from "react-router-dom";
import { ArrowRight, Home as HomeIcon, School, UserCheck, PhoneCall } from "lucide-react";
import { Reveal, MaskLine } from "@/components/Reveal";
import { TrustStrip } from "@/components/TrustStrip";

const STEPS = [
  {
    n: "01",
    title: "Check Availability",
    text: "Fill out the short route inquiry form — where you live, which school your child attends, and which days and times you need. It takes about two minutes, and it doesn't commit you to anything.",
  },
  {
    n: "02",
    title: "We Review Your Route",
    text: "I personally review every request. I look at your address, your child's school, bell times, and how many seats are left on nearby routes. If it's a fit, you'll hear from me directly — usually within a day or two.",
  },
  {
    n: "03",
    title: "Complete Registration",
    text: "Approved families receive a private registration link. This is where you set up your child's full transportation profile: emergency contacts, authorized pickup adults, safety notes, and schedule details.",
  },
  {
    n: "04",
    title: "Reserve Your Seat",
    text: "You'll review and sign the Parent Transportation Agreement and set up your monthly payment. Once that's done, your child's seat on the route is officially reserved.",
  },
  {
    n: "05",
    title: "Ride With Confidence",
    text: "From your start date forward, I arrive at your door each school morning and bring your child safely back each afternoon. Same driver, same route, same friendly face. You just wave from the door.",
  },
];

const DOOR_TO_DOOR = [
  {
    icon: HomeIcon,
    title: "Morning pickup",
    text: "I arrive at your home address at a confirmed time. Your child is picked up right at your front door or driveway — you can hand them off yourself or watch from the window.",
  },
  {
    icon: School,
    title: "School drop-off",
    text: "Your child is dropped off at the school's main entrance or its designated drop-off area — never across the street, never around the corner, never early.",
  },
  {
    icon: School,
    title: "Afternoon pickup",
    text: "I meet your child at the school's designated pickup point at dismissal time. If dismissal runs late, I wait. Your child is never left standing alone.",
  },
  {
    icon: UserCheck,
    title: "Home drop-off",
    text: "Your child is brought to your home address and released to you or an authorized adult from your registration list — never just dropped at the curb.",
  },
];

export default function HowItWorks() {
  return (
    <div data-testid="how-it-works-page">
      <section className="mx-auto max-w-7xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">How it works</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
          <MaskLine delay={0.1}>School transportation</MaskLine>
          <MaskLine delay={0.22}>
            without the <em className="text-terra">daily scramble.</em>
          </MaskLine>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
          No apps to wrangle, no driver roulette, no mystery. Here's exactly how a family goes from
          "we need help" to "we never think about the school run anymore."
        </p>
      </section>

      <TrustStrip compact />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div
                data-testid={`how-step-${i}`}
                className="flex gap-6 rounded-3xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-terra/10 sm:p-8"
              >
                <p className="font-serif text-5xl font-light italic leading-none text-terra/70 sm:text-6xl">{s.n}</p>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-ink sm:text-2xl">{s.title}</h2>
                  <p className="mt-2 leading-relaxed text-ink/65">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">No fine print here</p>
            <h2 data-testid="door-to-door-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              What "door-to-door" actually means
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
              A lot of services say "door-to-door" and mean "the end of your street." Here's precisely
              where your child is picked up and dropped off, every single trip:
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {DOOR_TO_DOOR.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06}>
                <div data-testid={`door-card-${i}`} className="h-full rounded-3xl border border-line bg-cream p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blush text-terra">
                    <d.icon size={21} strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8" delay={0.1}>
            <div className="flex items-start gap-4 rounded-3xl border border-sun/40 bg-[#FDF3E7] p-6">
              <PhoneCall className="mt-0.5 shrink-0 text-sun" size={24} />
              <p className="text-sm leading-relaxed text-ink/75 sm:text-base">
                <strong className="text-ink">And if nobody's home at drop-off?</strong> Your child is never
                left unattended — full stop. I stay with them and contact you, then your emergency contacts,
                following the Safety &amp; Handoff Policy. We'll agree on exactly how this works for your
                family during registration.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="mx-auto max-w-xl font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Sound like what your family needs?
          </h2>
          <Link
            to="/check-availability"
            data-testid="how-check-availability-btn"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-terra px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-terra/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark"
          >
            Check Route Availability <ArrowRight size={17} strokeWidth={2.6} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
