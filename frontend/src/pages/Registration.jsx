import { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle2, Lock } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const inputCls =
  "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:border-terra focus:outline-none focus:ring-2 focus:ring-terra/20";

const initial = {
  parent_name: "", parent_phone: "", parent_email: "", home_address: "",
  child_legal_name: "", child_preferred_name: "", child_dob: "", child_school: "", child_grade: "",
  ec1_name: "", ec1_relationship: "", ec1_phone: "",
  ec2_name: "", ec2_relationship: "", ec2_phone: "",
  authorized_adults: "", days: [], morning: false, afternoon: false, start_date: "",
  safety_info: "", absence_acknowledged: false,
  agree_transportation: false, agree_payment: false, agree_accuracy: false,
};

const Section = ({ n, title, children }) => (
  <section className="rounded-[2rem] border border-line bg-surface p-6 sm:p-8">
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terra font-serif text-sm font-bold italic text-white">{n}</span>
      <h2 className="font-serif text-xl font-semibold text-ink">{title}</h2>
    </div>
    {children}
  </section>
);

const Field = ({ label, error, children }) => (
  <div>
    <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
    {children}
    {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
  </div>
);

const Check = ({ name, checked, onChange, testid, children }) => (
  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-cream p-4 transition-colors hover:border-terra/40">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} data-testid={testid} className="mt-1 h-4 w-4 shrink-0 accent-terra" />
    <span className="text-sm leading-relaxed text-ink/75">{children}</span>
  </label>
);

export default function Registration() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState(null);

  useEffect(() => {
    document.title = "Registration — Mama's School Rides";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.title = "Mama's School Rides";
      document.head.removeChild(meta);
    };
  }, []);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [k]: v });
  };

  const toggleDay = (d) =>
    setForm({ ...form, days: form.days.includes(d) ? form.days.filter((x) => x !== d) : [...form.days, d] });

  const validate = () => {
    const e = {};
    if (!form.parent_name.trim()) e.parent_name = "Required.";
    if (!form.parent_phone.trim()) e.parent_phone = "Required.";
    if (!/^\S+@\S+\.\S+$/.test(form.parent_email)) e.parent_email = "Valid email required.";
    if (!form.home_address.trim()) e.home_address = "Required.";
    if (!form.child_legal_name.trim()) e.child_legal_name = "Required.";
    if (!form.child_dob) e.child_dob = "Required.";
    if (!form.child_school.trim()) e.child_school = "Required.";
    if (!form.child_grade.trim()) e.child_grade = "Required.";
    if (!form.ec1_name.trim() || !form.ec1_phone.trim()) e.ec1 = "Please complete emergency contact 1.";
    if (!form.ec2_name.trim() || !form.ec2_phone.trim()) e.ec2 = "Please complete emergency contact 2.";
    if (!form.days.length) e.days = "Select at least one day.";
    if (!form.morning && !form.afternoon) e.times = "Select morning, afternoon, or both.";
    if (!form.absence_acknowledged) e.absence = "Please acknowledge the absence process.";
    if (!form.agree_transportation) e.agree_transportation = "Please accept to continue.";
    if (!form.agree_payment) e.agree_payment = "Please accept to continue.";
    if (!form.agree_accuracy) e.agree_accuracy = "Please confirm to continue.";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      window.__lenis?.scrollTo(0, { immediate: false });
      return;
    }
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/registrations`, form);
      setReference(data.reference);
      window.__lenis?.scrollTo(0, { immediate: false });
    } catch {
      setErrors({ submit: "Something went wrong — please try again, or call (780) 880-8566." });
    } finally {
      setSending(false);
    }
  };

  if (reference) {
    return (
      <div data-testid="registration-confirmation" className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-sage">
          <CheckCircle2 size={34} />
        </span>
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Registration complete — welcome aboard!
        </h1>
        <p className="mt-4 leading-relaxed text-ink/70">
          Your child's transportation profile has been received. The next step is the Parent Transportation
          Agreement and payment setup — I'll be in touch shortly with everything you need to reserve the seat.
        </p>
        <p className="mt-6 inline-block rounded-2xl border border-line bg-surface px-5 py-3 text-sm text-ink/70">
          Your reference: <strong data-testid="registration-reference" className="font-mono text-ink">{reference}</strong>
        </p>
      </div>
    );
  }

  return (
    <div data-testid="registration-page" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <span className="inline-flex items-center gap-2 rounded-full border border-terra/25 bg-blush px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-terra-dark">
        <Lock size={13} /> Private — approved families only
      </span>
      <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Welcome to Mama's School Rides.
      </h1>
      <p className="mt-4 leading-relaxed text-ink/70">
        We're excited to welcome your family. Please complete the following information so we can prepare
        your child's transportation profile.
      </p>

      <form onSubmit={submit} noValidate data-testid="registration-form" className="mt-10 space-y-6">
        <Section n="1" title="Parent / Guardian">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *" error={errors.parent_name}>
              <input type="text" data-testid="reg-parent-name" className={inputCls} value={form.parent_name} onChange={set("parent_name")} />
            </Field>
            <Field label="Phone *" error={errors.parent_phone}>
              <input type="tel" data-testid="reg-parent-phone" className={inputCls} value={form.parent_phone} onChange={set("parent_phone")} />
            </Field>
            <Field label="Email *" error={errors.parent_email}>
              <input type="email" data-testid="reg-parent-email" className={inputCls} value={form.parent_email} onChange={set("parent_email")} />
            </Field>
            <Field label="Home Address *" error={errors.home_address}>
              <input type="text" data-testid="reg-home-address" className={inputCls} value={form.home_address} onChange={set("home_address")} />
            </Field>
          </div>
        </Section>

        <Section n="2" title="Child Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Legal Name *" error={errors.child_legal_name}>
              <input type="text" data-testid="reg-child-legal-name" className={inputCls} value={form.child_legal_name} onChange={set("child_legal_name")} />
            </Field>
            <Field label="Preferred Name">
              <input type="text" data-testid="reg-child-preferred-name" className={inputCls} value={form.child_preferred_name} onChange={set("child_preferred_name")} />
            </Field>
            <Field label="Date of Birth *" error={errors.child_dob}>
              <input type="date" data-testid="reg-child-dob" className={inputCls} value={form.child_dob} onChange={set("child_dob")} />
            </Field>
            <Field label="Grade *" error={errors.child_grade}>
              <input type="text" data-testid="reg-child-grade" className={inputCls} value={form.child_grade} onChange={set("child_grade")} placeholder="e.g. Grade 2" />
            </Field>
            <Field label="School *" error={errors.child_school}>
              <input type="text" data-testid="reg-child-school" className={inputCls} value={form.child_school} onChange={set("child_school")} />
            </Field>
          </div>
        </Section>

        <Section n="3" title="Emergency Contacts">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Contact 1 — Name *">
                <input type="text" data-testid="reg-ec1-name" className={inputCls} value={form.ec1_name} onChange={set("ec1_name")} />
              </Field>
              <Field label="Relationship">
                <input type="text" data-testid="reg-ec1-relationship" className={inputCls} value={form.ec1_relationship} onChange={set("ec1_relationship")} placeholder="e.g. Grandma" />
              </Field>
              <Field label="Phone *">
                <input type="tel" data-testid="reg-ec1-phone" className={inputCls} value={form.ec1_phone} onChange={set("ec1_phone")} />
              </Field>
            </div>
            {errors.ec1 && <p data-testid="reg-ec1-error" className="text-xs font-medium text-red-600">{errors.ec1}</p>}
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Contact 2 — Name *">
                <input type="text" data-testid="reg-ec2-name" className={inputCls} value={form.ec2_name} onChange={set("ec2_name")} />
              </Field>
              <Field label="Relationship">
                <input type="text" data-testid="reg-ec2-relationship" className={inputCls} value={form.ec2_relationship} onChange={set("ec2_relationship")} />
              </Field>
              <Field label="Phone *">
                <input type="tel" data-testid="reg-ec2-phone" className={inputCls} value={form.ec2_phone} onChange={set("ec2_phone")} />
              </Field>
            </div>
            {errors.ec2 && <p data-testid="reg-ec2-error" className="text-xs font-medium text-red-600">{errors.ec2}</p>}
          </div>
        </Section>

        <Section n="4" title="Authorized Adults">
          <Field label="Who may receive your child at drop-off?">
            <textarea
              data-testid="reg-authorized-adults"
              rows={3}
              className={inputCls}
              value={form.authorized_adults}
              onChange={set("authorized_adults")}
              placeholder="List names and phone numbers of adults (besides you) authorized to receive your child — e.g. grandparents, neighbours."
            />
          </Field>
          <p className="mt-2 text-xs text-ink/50">Your child will only ever be released to you or the adults listed here.</p>
        </Section>

        <Section n="5" title="Transportation Schedule">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-ink">Days per week *</p>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((d) => (
                  <button
                    key={d} type="button" onClick={() => toggleDay(d)} data-testid={`reg-day-${d.toLowerCase()}`}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      form.days.includes(d) ? "border-terra bg-terra text-white" : "border-line bg-cream text-ink/70"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              {errors.days && <p data-testid="reg-days-error" className="mt-1 text-xs font-medium text-red-600">{errors.days}</p>}
            </div>
            <div className="flex flex-wrap gap-3">
              <label className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold ${form.morning ? "border-terra bg-blush text-terra-dark" : "border-line bg-cream text-ink/70"}`}>
                <input type="checkbox" data-testid="reg-morning" checked={form.morning} onChange={set("morning")} className="h-4 w-4 accent-terra" />
                Morning (home → school)
              </label>
              <label className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold ${form.afternoon ? "border-terra bg-blush text-terra-dark" : "border-line bg-cream text-ink/70"}`}>
                <input type="checkbox" data-testid="reg-afternoon" checked={form.afternoon} onChange={set("afternoon")} className="h-4 w-4 accent-terra" />
                Afternoon (school → home)
              </label>
            </div>
            {errors.times && <p data-testid="reg-times-error" className="text-xs font-medium text-red-600">{errors.times}</p>}
            <Field label="Start Date">
              <input type="date" data-testid="reg-start-date" className={inputCls} value={form.start_date} onChange={set("start_date")} />
            </Field>
          </div>
        </Section>

        <Section n="6" title="Safety Information">
          <Field label="Anything I should know to keep your child safe and comfortable?">
            <textarea
              data-testid="reg-safety-info"
              rows={4}
              className={inputCls}
              value={form.safety_info}
              onChange={set("safety_info")}
              placeholder="Allergies, medical conditions, anxiety triggers, booster seat needs, anything at all."
            />
          </Field>
        </Section>

        <Section n="7" title="Absence Notification">
          <p className="text-sm leading-relaxed text-ink/70">
            If your child won't be riding on a given day, please let me know by call or text at{" "}
            <strong className="text-ink">(780) 880-8566</strong> at least one hour before the scheduled
            pickup. This keeps the route on time for everyone and makes sure I never arrive at an empty
            door wondering where a child is.
          </p>
          <div className="mt-4">
            <Check name="absence" checked={form.absence_acknowledged} onChange={set("absence_acknowledged")} testid="reg-absence-ack">
              I understand and agree to the absence notification process. *
            </Check>
            {errors.absence && <p data-testid="reg-absence-error" className="mt-1 text-xs font-medium text-red-600">{errors.absence}</p>}
          </div>
        </Section>

        <Section n="8" title="Agreements">
          <div className="space-y-3">
            <Check name="agree_transportation" checked={form.agree_transportation} onChange={set("agree_transportation")} testid="reg-agree-transportation">
              I have read and agree to the <a href="/policies/transportation-agreement" target="_blank" className="font-semibold text-terra-dark underline underline-offset-2">Parent Transportation Agreement</a>. *
            </Check>
            <Check name="agree_payment" checked={form.agree_payment} onChange={set("agree_payment")} testid="reg-agree-payment">
              I understand the payment and cancellation policies, including that monthly fees reserve my
              child's seat and missed rides are not automatically refunded. *
            </Check>
            <Check name="agree_accuracy" checked={form.agree_accuracy} onChange={set("agree_accuracy")} testid="reg-agree-accuracy">
              I confirm the information provided is accurate and complete, and I'll update Mama's School
              Rides if anything changes. *
            </Check>
            {(errors.agree_transportation || errors.agree_payment || errors.agree_accuracy) && (
              <p data-testid="reg-agreements-error" className="text-xs font-medium text-red-600">All three agreements are required to complete registration.</p>
            )}
          </div>
        </Section>

        {errors.submit && <p data-testid="reg-submit-error" className="text-sm font-medium text-red-600">{errors.submit}</p>}

        <button
          type="submit"
          disabled={sending}
          data-testid="reg-submit-btn"
          className="w-full rounded-full bg-terra py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-terra/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark disabled:opacity-60"
        >
          {sending ? "Submitting..." : "Complete Registration"}
        </button>
      </form>
    </div>
  );
}
