import { Link, useParams, Navigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const POLICIES = {
  "transportation-agreement": {
    title: "Parent Transportation Agreement",
    sections: [
      {
        h: "The service",
        p: "Mama's School Rides provides private, door-to-door transportation for registered children between their home address and their school, Monday through Friday on scheduled school days, according to the schedule confirmed during registration.",
      },
      {
        h: "Reserved seats & monthly fees",
        p: "Monthly fees reserve your child's seat on the route for the full month. The seat is held for your child whether or not they ride on a given day. Fees are payable in advance of each month of service.",
      },
      {
        h: "Pickup & drop-off",
        p: "Morning pickup occurs at the child's home address at a confirmed time. School drop-off occurs at the school's main entrance or designated drop-off area. Afternoon pickup occurs at the school's designated pickup point, and home drop-off releases the child to a parent/guardian or an adult listed as authorized on the registration form.",
      },
      {
        h: "Absences",
        p: "Parents/guardians agree to notify Mama's School Rides by call or text at least one hour before a scheduled pickup if a child will not be riding.",
      },
      {
        h: "Conduct & care",
        p: "Children are expected to remain seated and buckled for the full trip. Safety information, medical notes, and authorized-adult lists must be kept current by the parent/guardian.",
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
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    sections: [
      {
        h: "What we collect",
        p: "Information you provide through inquiry and registration forms: parent/guardian contact details, home address, child information (name, date of birth, school, grade), emergency contacts, authorized adults, schedule details, and safety notes.",
      },
      {
        h: "How it's used",
        p: "Your information is used solely to operate the transportation service: planning routes, transporting your child safely, contacting you, and managing emergencies. It is never sold or shared with third parties for marketing.",
      },
      {
        h: "How it's stored",
        p: "Records are stored securely and access is limited to the operator of Mama's School Rides. Information is retained while your child is an active client and removed upon request after service ends, subject to any legal retention requirements.",
      },
      {
        h: "Your rights",
        p: "You may request a copy of, correction to, or deletion of your family's information at any time by emailing hello@mamasschoolrides.ca.",
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
        p: "Questions about these terms: hello@mamasschoolrides.ca or (780) 555-1234.",
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

      <div className="mt-10 space-y-8">
        {policy.sections.map((s, i) => (
          <section key={s.h} data-testid={`policy-section-${i}`}>
            <h2 className="font-serif text-xl font-semibold text-ink">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-ink/70">{s.p}</p>
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
