import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MaskLine } from "@/components/Reveal";

const FAQS = [
  {
    q: "Where do you operate?",
    a: "Mama's School Rides serves families in McConachie and surrounding north Edmonton communities. Routes are kept small and local on purpose — it keeps ride times short and service personal. Not sure if you're in range? Submit a route inquiry and I'll let you know honestly.",
  },
  {
    q: "Which schools do you serve?",
    a: "Routes are built around the schools our families actually attend, including the public and Catholic schools in and around McConachie and nearby neighbourhoods. Because routes are shaped by demand each term, the best way to find out about your child's school is to check route availability — it takes two minutes.",
  },
  {
    q: "Is transportation really door-to-door?",
    a: "Yes — truly. Morning pickup happens at your front door or driveway, and drop-off is at the school's main entrance or designated area. In the afternoon it's the reverse: pickup at the school, drop-off at your home, released to you or an authorized adult. Never a street corner, never a block away.",
  },
  {
    q: "How much does it cost?",
    a: "Round trip (morning and afternoon, Monday to Friday) is $550/month. One-way service — your choice of mornings or afternoons — is $425/month. Occasional one-way trips are $35–$40 each, subject to availability. Siblings from the same household on the same route ride at a reduced rate.",
  },
  {
    q: "Do you transport siblings?",
    a: "Happily! Siblings from the same household riding the same route and schedule get a reduced sibling rate for each additional child. Just mention it on your route inquiry and I'll put together exact pricing for your family.",
  },
  {
    q: "What happens if my child is sick?",
    a: "Just call or text me at (780) 880-8566 at least one hour before pickup — no explanation needed beyond 'we're staying home today.' Please note that monthly fees reserve your child's seat, so sick days aren't automatically refunded or credited. Full details are in the Cancellation & Refund Policy.",
  },
  {
    q: "What happens if nobody is home at drop-off?",
    a: "Your child is never left unattended — ever. I stay with them in the vehicle and call you first, then your emergency contacts, following the Safety & Handoff Policy we agree on during registration. We'll set a clear plan for your family before the first ride.",
  },
  {
    q: "What happens if the school dismisses my child late?",
    a: "I wait. Whether it's a late dismissal, a teacher running behind, or a school event, your child will not be left standing alone at pickup. If a delay affects other families on the route, I keep everyone informed by text.",
  },
  {
    q: "What happens during severe weather?",
    a: "This is Edmonton — winter is part of the deal, and I drive in it. Service runs unless conditions are genuinely unsafe or schools close. If I ever need to cancel or delay a route because of weather, you'll hear from me directly as early as possible. The full approach is in the Weather & Service Interruption Policy.",
  },
  {
    q: "Can I change my pickup address?",
    a: "Yes — moves happen! Give me as much notice as you can. If your new address fits the existing route, we simply update it. If it's outside the current route, I'll let you know honestly whether I can accommodate it or add you to the waitlist for a closer route.",
  },
  {
    q: "Can I book occasional rides?",
    a: "Yes — occasional one-way trips are $35–$40 each, subject to availability on the route. Monthly riders get first priority on seats, so booking occasional trips in advance is always a good idea. Submit a route inquiry to get started.",
  },
  {
    q: "How far in advance should I register?",
    a: "The earlier, the better — especially for September and January starts, when routes fill fastest. A good rule of thumb is to check availability at least 2–4 weeks before you need service. That said, mid-year spots do open up, so it's always worth asking.",
  },
  {
    q: "What happens if you're delayed?",
    a: "If I'm ever running behind — weather, a train, an earlier stop — I'll text you with an updated time. You'll never be left wondering where the vehicle is or whether it's coming. Communication is part of the service.",
  },
  {
    q: "How does cancellation work?",
    a: "Monthly service can be cancelled with notice as outlined in the Cancellation & Refund Policy — I ask for advance notice so the seat can be offered to a waitlisted family. Because monthly fees reserve a seat rather than pay per ride, partial months and missed rides aren't automatically refunded.",
  },
  {
    q: "How do I contact you?",
    a: "Call or text (780) 880-8566, or email mamasschoolrides@gmail.com. I'm easiest to reach outside of route driving hours — but I always get back to parents the same day. For anything urgent during a route, text is fastest.",
  },
];

export default function FAQ() {
  return (
    <div data-testid="faq-page" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">FAQ</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
        <MaskLine delay={0.1}>Honest answers,</MaskLine>
        <MaskLine delay={0.22}>
          <em className="text-terra">parent to parent.</em>
        </MaskLine>
      </h1>
      <p className="mt-5 leading-relaxed text-ink/70">
        The questions I'd ask before letting anyone drive my kids — answered the way I'd want them answered.
      </p>

      <Accordion type="single" collapsible className="mt-10 space-y-3" data-testid="faq-accordion">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            data-testid={`faq-item-${i}`}
            className="rounded-3xl border border-line bg-surface px-6 transition-colors data-[state=open]:border-terra/30"
          >
            <AccordionTrigger data-testid={`faq-trigger-${i}`} className="py-5 text-left font-serif text-lg font-semibold text-ink hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent data-testid={`faq-content-${i}`} className="pb-5 leading-relaxed text-ink/70">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 rounded-[2rem] bg-terra p-8 text-center sm:p-10">
        <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Still wondering something?</h2>
        <p className="mx-auto mt-3 max-w-md text-white/85">
          The fastest way to get an answer about your specific route is to ask.
        </p>
        <Link
          to="/check-availability"
          data-testid="faq-check-availability-btn"
          className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-terra-dark shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          Check Route Availability <ArrowRight size={16} strokeWidth={2.6} />
        </Link>
      </div>
    </div>
  );
}
