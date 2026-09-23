import { Link, useParams, Navigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const POLICIES = {
  "transportation-agreement": {
    title: "Parent Transportation Agreement",
    intro: "This agreement is between Mama's School Rides and the parent/guardian completing registration. It exists so both of us know exactly what to expect — no surprises on either side. Plain-language summary below; final wording pending professional legal review.",
    sections: [
      {
        h: "Part A — Parties",
        p: "This agreement is between Mama's School Rides (the \"Service,\" operated by Manila, McConachie, Edmonton, Alberta) and the Parent/Guardian named on the registration form (\"you\"), on behalf of the child(ren) listed.",
      },
      {
        h: "Part B — Child",
        p: "The child covered by this agreement is identified by the legal name, school, grade, and transportation schedule provided in the registration form. Any change to these details must be provided in writing (text or email) before it takes effect.",
      },
      {
        h: "Part C — Services",
        p: "You are purchasing private, door-to-door school transportation as selected at registration: Round Trip (morning home→school and afternoon school→home, Monday–Friday on school days), One-Way (morning or afternoon, Monday–Friday), or Occasional trips as individually booked and confirmed. Morning pickup occurs at your front door or driveway; school drop-off occurs at the school's main entrance or designated area; afternoon service is the reverse, with your child released only to you or an authorized adult on your registration list.",
      },
      {
        h: "Part D — Fees",
        items: [
          "One-time family registration fee: $75 per family, charged once with your first payment. This covers administrative onboarding, route planning, account setup and required documentation.",
          "Additional children added to an existing family account after initial setup may be subject to a $25 onboarding fee per child.",
          "Monthly amount: as confirmed at registration (Round Trip $550/month, One-Way $425/month; siblings on the same route: +$350/month for the second child, +$250/month for the third).",
          "Payment date: monthly fees are billed automatically to your card, starting on your payment date and repeating each month of service.",
          "Late payment: if payment is more than 5 days late, service may be paused until the account is current. We'll always reach out before pausing — life happens, talk to us.",
          "Failed payment: declined or returned payments must be corrected within 5 days; after that, the reserved seat may be released to a waitlisted family.",
          "Missed rides (sick days, vacations, schedule changes) are not automatically refunded or credited, as the seat is reserved for your child for the full month.",
        ],
      },
      {
        h: "Part E — Route",
        p: "Your route is defined by: the pickup address, the drop-off address, the pickup window (arrival time range), and the school — all confirmed in writing when your seat is reserved. The pickup window may shift slightly with weather or traffic; you'll always be kept informed by text. Address changes require notice and route confirmation before taking effect.",
      },
      {
        h: "Part F — Parent obligations",
        items: [
          "Provide accurate information on all forms, and keep it current.",
          "Notify us of absences by call or text at least one hour before the scheduled pickup.",
          "Maintain current emergency contacts who can respond when needed.",
          "Be available when required — including at drop-off, or ensure an authorized adult is.",
          "Comply with pickup and handoff procedures, including the authorized-adult list.",
          "Notify us promptly of any changes: address, schedule, school, or your child's needs.",
        ],
      },
      {
        h: "Part G — Driver responsibilities",
        items: [
          "Safe transportation on every trip — defensive, unhurried, distraction-free driving.",
          "Professional conduct with children, parents, and school staff at all times.",
          "Clear, prompt communication about delays, schedule changes, or incidents.",
          "Following all applicable laws and operating requirements, including licensing, insurance, and vehicle standards.",
        ],
      },
      {
        h: "Part H — Child conduct",
        p: "To keep everyone safe, children must:",
        items: [
          "Remain seated for the full trip.",
          "Wear required restraints (seatbelt or booster) at all times.",
          "Keep hands and objects inside the vehicle.",
          "Follow the driver's instructions.",
          "Behave safely and respectfully toward others.",
        ],
        after: "Repeated unsafe behaviour can result in suspension or termination of service. We'll always talk with you first and work on a plan together before it comes to that.",
      },
      {
        h: "Part I — Termination",
        p: "Either party may end this agreement with written notice before the start of the next billing month. In addition, Mama's School Rides may suspend or end service — with as much notice as safety allows — for reasons including:",
        items: [
          "Repeated non-payment or failed payments.",
          "Repeated no-shows without absence notification.",
          "Repeated unsafe behaviour by a child that endangers others.",
          "Harassment or abusive conduct toward the driver.",
          "Repeated unauthorized schedule or address changes.",
          "Inaccurate or outdated information that affects safe transportation.",
          "Any conduct that creates an unacceptable safety risk.",
        ],
        after: "Wherever possible, concerns will be raised with you directly first — the goal is always to keep your child riding safely, not to end service.",
      },
    ],
  },
  "cancellation-refund-policy": {
    title: "Cancellation & Refund Policy",
    sections: [
      {
        h: "Cancelling monthly service",
        p: "Monthly service may be cancelled with written notice (email or text) before the start of the next billing month. Notice given mid-month takes effect at the end of that paid month so the seat can be offered to a waitlisted family.",
      },
      {
        h: "Missed rides",
        p: "Because monthly fees reserve a seat rather than pay per ride, missed rides — including sick days, vacations, and schedule changes — are not automatically refunded or credited.",
      },
      {
        h: "Service interruptions",
        p: "If Mama's School Rides must cancel service for an extended period (for example, due to severe weather events or driver illness), affected days will be addressed fairly and communicated directly. See the Weather & Service Interruption Policy.",
      },
      {
        h: "Occasional trips",
        p: "Occasional one-way trips that are cancelled with at least 24 hours notice will not be charged. Trips cancelled with less notice may be charged in full.",
      },
      {
        h: "Termination",
        p: "Service may also be suspended or ended under the conditions in Part I (Termination) of the Parent Transportation Agreement — including repeated non-payment, unsafe behaviour, or conduct that creates an unacceptable safety risk.",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro: "You're trusting us with information about your child. That's a big deal, and we treat it that way. This policy explains — in plain language — what we collect, why, and how it's protected.",
    sections: [
      {
        h: "What we collect",
        p: "Only what the service genuinely needs: parent/guardian contact details, home address, your child's name, date of birth, school and grade, emergency contacts, authorized pickup adults, schedule details, and safety or medical notes you choose to share. We deliberately do not collect information simply because a form could ask for it — if we don't need it to transport your child safely, we don't ask.",
      },
      {
        h: "Why we collect it",
        p: "Every piece of information has a job: planning your route, reaching you quickly, knowing who may receive your child, and keeping your child safe in an emergency. Nothing is collected for marketing, profiling, or resale.",
      },
      {
        h: "Children's information",
        p: "We knowingly collect children's personal information (names, schools, schedules, and potentially sensitive safety notes) solely from their parent/guardian, and solely to provide the transportation service. It is never shared with third parties except where required by law or in a genuine emergency involving your child.",
      },
      {
        h: "How it's protected",
        p: "Records are stored securely, access is limited to the operator of Mama's School Rides, and submission data travels over encrypted connections. Physical or written records (if any) are kept secured in the vehicle or home office.",
      },
      {
        h: "Retention & your rights",
        p: "Information is kept while your child is an active client. After service ends, you may request a copy, correction, or deletion of your family's information at any time by emailing mamasschoolrides@gmail.com, subject to any legal retention requirements.",
      },
    ],
  },
  "safety-handoff-policy": {
    title: "Safety & Handoff Policy",
    sections: [
      {
        h: "Authorized release",
        p: "Children are released only to a parent/guardian or an adult listed as authorized on the registration form. Photo ID may be requested from any adult the driver does not yet know by sight.",
      },
      {
        h: "If nobody is home",
        p: "If no authorized adult is available at drop-off, the child remains with the driver while the parent/guardian and emergency contacts are called. The child is never left unattended at a door or curb.",
      },
      {
        h: "School handoff",
        p: "School drop-off occurs at the main entrance or designated area during supervised times. Afternoon pickup occurs at the school's designated pickup point; if dismissal is late, the driver waits.",
      },
      {
        h: "Emergencies",
        p: "In an emergency, 911 is contacted first, followed immediately by the parent/guardian. Emergency contact and medical information travels with the driver on every route.",
      },
    ],
  },
  "weather-interruption-policy": {
    title: "Weather & Service Interruption Policy",
    sections: [
      {
        h: "Winter operations",
        p: "Service operates through normal Edmonton winter conditions with appropriate winter tires, extra travel time, and defensive driving. Pickup times may shift slightly on severe cold or heavy snow days; parents will be notified by text.",
      },
      {
        h: "Cancellations",
        p: "Service is cancelled only when conditions are genuinely unsafe or schools are closed. Decisions are made as early as possible and communicated to every affected family directly.",
      },
      {
        h: "Make-up & credits",
        p: "Extended service interruptions caused by the operator (for example, driver illness lasting multiple days) will be credited or refunded for the affected days.",
      },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    sections: [
      {
        h: "Using this website",
        p: "This website provides information about Mama's School Rides and allows families to submit route inquiries and registrations. Submitting a form does not create a service agreement; service begins only after route approval, completed registration, a signed Transportation Agreement, and payment setup.",
      },
      {
        h: "Accuracy",
        p: "We work hard to keep the information on this site accurate and current. Pricing, availability, and policies may be updated from time to time; the signed Parent Transportation Agreement governs the actual service relationship.",
      },
      {
        h: "Contact",
        p: "Questions about these terms: mamasschoolrides@gmail.com or (780) 880-8566.",
      },
    ],
  },
};

const OTHER_LINKS = Object.entries(POLICIES).map(([slug, p]) => ({ slug, title: p.title }));

export default function Policies() {
  const { slug } = useParams();
  const policy = POLICIES[slug];
  if (!policy) return <Navigate to="/policies/transportation-agreement" replace />;

  return (
    <div data-testid="policy-page" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="flex items-start gap-3 rounded-2xl border border-sun/40 bg-[#FDF3E7] p-5">
        <AlertTriangle className="mt-0.5 shrink-0 text-sun" size={20} />
        <p data-testid="policy-draft-notice" className="text-sm leading-relaxed text-ink/70">
          <strong className="text-ink">Draft placeholder:</strong> this document is sample text prepared for
          review. It will be replaced with professionally reviewed legal wording before launch.
        </p>
      </div>

      <h1 data-testid="policy-title" className="mt-8 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {policy.title}
      </h1>
      <p className="mt-2 text-sm text-ink/50">Mama's School Rides — McConachie, Edmonton, Alberta</p>
      {policy.intro && <p className="mt-5 leading-relaxed text-ink/70">{policy.intro}</p>}

      <div className="mt-10 space-y-8">
        {policy.sections.map((s, i) => (
          <section key={s.h} data-testid={`policy-section-${i}`} className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <h2 className="font-serif text-xl font-semibold text-ink">{s.h}</h2>
            {s.p && <p className="mt-2 leading-relaxed text-ink/70">{s.p}</p>}
            {s.items && (
              <ul className="mt-3 space-y-2.5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 leading-relaxed text-ink/70">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.after && <p className="mt-3 leading-relaxed text-ink/70">{s.after}</p>}
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-line pt-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-terra">Other policies</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {OTHER_LINKS.filter((l) => l.slug !== slug).map((l) => (
            <Link
              key={l.slug}
              to={`/policies/${l.slug}`}
              data-testid={`policy-nav-${l.slug}`}
              className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink/70 transition-colors hover:border-terra hover:text-terra-dark"
            >
              {l.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
