import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, MaskLine } from "@/components/Reveal";
import { TrustStrip } from "@/components/TrustStrip";

const FOUNDER_IMG = "https://images.unsplash.com/photo-1617285962341-73ee07b22ea2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwyfHxzbWlsaW5nJTIwbW9tJTIwcG9ydHJhaXQlMjBmYW1pbHklMjBjYXIlMjB2YW4lMjBkcml2ZXJ8ZW58MHx8fHwxNzkwMTk5MTAyfDA&ixlib=rb-4.1.0&q=85";
const KIDS_IMG = "https://images.pexels.com/photos/8457621/pexels-photo-8457621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export default function About() {
  return (
    <div data-testid="about-page">
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">About</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
          <MaskLine delay={0.1}>The mom behind</MaskLine>
          <MaskLine delay={0.22}>
            <em className="text-terra">Mama's School Rides.</em>
          </MaskLine>
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto max-w-md lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[3rem] rounded-br-[6rem] shadow-2xl shadow-terra/15 ring-1 ring-line">
                <img
                  src={FOUNDER_IMG}
                  alt="Manila, founder of Mama's School Rides"
                  data-testid="about-founder-photo"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-5 left-6 rounded-2xl border border-line bg-cream px-5 py-3 shadow-lg">
                <p className="font-serif text-base font-semibold text-ink">Manila</p>
                <p className="text-xs text-ink/55">Founder • Driver • Mom of 3</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-5 text-base leading-relaxed text-ink/75 sm:text-lg">
            <Reveal>
              <p className="font-serif text-xl italic text-ink sm:text-2xl">
                "I know exactly what 8:04 AM feels like when the bell rings at 8:15 and nothing has gone
                to plan."
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                Hi — I'm Manila, and I'm a mom of three living right here in McConachie. For years,
                my mornings looked like a relay race: lunches half-packed, one kid hunting for a missing
                shoe, and me watching the clock, knowing a meeting was starting across the city whether
                I was there or not.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                At school pickup, I'd stand with the other parents and hear the same story again and
                again — shift work, commutes downtown, younger siblings napping at exactly the wrong time,
                winter mornings where a twenty-minute walk to a bus stop just isn't something you want
                for a six-year-old.
              </p>
            </Reveal>
            <Reveal delay={0.11}>
              <p>
                So I started Mama's School Rides. Not as a big company with dispatchers and rotating
                drivers — as me. One careful driver, one well-maintained vehicle, and a small number of
                families I actually know by name.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p>
                When your child rides with me, I learn that Thursday is library day and their bag is
                heavier, that they like the window seat, that they're nervous about a spelling test.
                That kind of care isn't a feature on a pricing page. It's just what happens when a mom
                is the one behind the wheel.
              </p>
            </Reveal>
            <Reveal delay={0.17}>
              <p>
                I'm commercially licensed, background cleared, and I carry a clean driver's abstract —
                but honestly, the thing I'm proudest of is simpler: the parents who wave from their
                doorways every morning, trusting me with the most important cargo there is. I don't take
                that lightly. Not for one trip.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-xl text-ink">— Manila</p>
            </Reveal>
            <Reveal delay={0.22}>
              <Link
                to="/check-availability"
                data-testid="about-check-availability-btn"
                className="mt-2 inline-flex items-center gap-2.5 rounded-full bg-terra px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-terra/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark"
              >
                Check Route Availability <ArrowRight size={17} strokeWidth={2.6} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <TrustStrip compact />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] shadow-xl ring-1 ring-line">
              <img
                src={KIDS_IMG}
                alt="Happy children heading to school in the neighbourhood"
                data-testid="about-community-photo"
                className="aspect-[16/11] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Rooted in McConachie
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              This isn't a franchise or a side hustle run from another part of the city. My kids go to
              school here. I shop at the same stores you do. The routes I drive are streets I drive every
              day, in every kind of Edmonton weather.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Keeping the service small and local is a deliberate choice. It means I can say yes to the
              things big services can't — and it means when you call, you're calling the person who will
              actually be at your door in the morning.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
