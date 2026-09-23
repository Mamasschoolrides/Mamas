import { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle2, Info } from "lucide-react";
import { MaskLine } from "@/components/Reveal";
import { WaitlistCard } from "@/components/WaitlistCard";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const initial = {
  parent_name: "", phone: "", email: "", child_name: "", grade: "", school: "",
  home_address: "", morning: false, afternoon: false, start_date: "", days: [], additional_info: "",
};

const inputCls =
  "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:border-terra focus:outline-none focus:ring-2 focus:ring-terra/20";

const Field = ({ label, error, children, testid }) => (
  <div>
    <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
    {children}
    {error && <p data-testid={`${testid}-error`} className="mt-1 text-xs font-medium text-red-600">{error}</p>}
  </div>
);

export default function CheckAvailability() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState(null);
  const [routesFull, setRoutesFull] = useState(false);

  useEffect(() => {
    axios.get(`${API}/route-status`).then((r) => setRoutesFull(!!r.data.routes_full)).catch(() => {});
  }, []);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [k]: v });
  };

  const toggleDay = (d) =>
    setForm({ ...form, days: form.days.includes(d) ? form.days.filter((x) => x !== d) : [...form.days, d] });

  const validate = () => {
    const e = {};
    if (!form.parent_name.trim()) e.parent_name = "Please enter your name.";
    if (!form.phone.trim()) e.phone = "A phone number helps me reach you quickly.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.child_name.trim()) e.child_name = "Please enter your child's name.";
    if (!form.grade.trim()) e.grade = "Please enter your child's grade.";
    if (!form.school.trim()) e.school = "Which school does your child attend?";
    if (!form.home_address.trim()) e.home_address = "I need your home address to check the route.";
    if (!form.morning && !form.afternoon) e.times = "Please select morning, afternoon, or both.";
    if (!form.days.length) e.days = "Select at least one day.";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/inquiries`, form);
      setReference(data.reference);
      window.__lenis?.scrollTo(0, { immediate: false });
    } catch {
      setErrors({ submit: "Something went wrong sending your request — please try again, or call (780) 555-1234." });
    } finally {
      setSending(false);
    }
  };

  if (reference) {
    return (
      <div data-testid="inquiry-confirmation" className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-sage">
          <CheckCircle2 size={34} />
        </span>
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Thank you — your route request is in!
        </h1>
        <p className="mt-4 leading-relaxed text-ink/70">
          I personally review every inquiry, and I'll be in touch within 1–2 business days to let you know
          whether your address and school fit one of my routes. Keep an eye on your phone and inbox.
        </p>
        <p className="mt-6 inline-block rounded-2xl border border-line bg-surface px-5 py-3 text-sm text-ink/70">
          Your reference: <strong data-testid="inquiry-reference" className="font-mono text-ink">{reference}</strong>
        </p>
        <p className="mt-6 text-sm text-ink/50">
          Questions in the meantime? Call or text <a href="tel:+17805551234" className="font-semibold text-terra-dark">(780) 555-1234</a>.
        </p>
      </div>
    );
  }

  return (
    <div data-testid="check-availability-page" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra">Step 1 of your journey</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
        <MaskLine delay={0.1}>Let's see if your child</MaskLine>
        <MaskLine delay={0.22}>
          fits one of <em className="text-terra">our routes.</em>
        </MaskLine>
      </h1>
      <p className="mt-5 max-w-2xl leading-relaxed text-ink/70">
        Tell me a little about your family and your school run. This is an inquiry, not a booking —
        there's no commitment, and I'll personally get back to you.
      </p>

      {routesFull && (
        <div className="mt-10">
          <WaitlistCard />
        </div>
      )}

      <form onSubmit={submit} noValidate data-testid="inquiry-form" className="mt-10 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Parent/Guardian Name *" error={errors.parent_name} testid="inquiry-parent-name">
            <input type="text" data-testid="inquiry-parent-name" className={inputCls} value={form.parent_name} onChange={set("parent_name")} placeholder="Your full name" />
          </Field>
          <Field label="Phone *" error={errors.phone} testid="inquiry-phone">
            <input type="tel" data-testid="inquiry-phone" className={inputCls} value={form.phone} onChange={set("phone")} placeholder="(780) 555-0000" />
          </Field>
          <Field label="Email *" error={errors.email} testid="inquiry-email">
            <input type="email" data-testid="inquiry-email" className={inputCls} value={form.email} onChange={set("email")} placeholder="you@email.com" />
          </Field>
          <Field label="Child's Name *" error={errors.child_name} testid="inquiry-child-name">
            <input type="text" data-testid="inquiry-child-name" className={inputCls} value={form.child_name} onChange={set("child_name")} placeholder="First and last name" />
          </Field>
          <Field label="Grade *" error={errors.grade} testid="inquiry-grade">
            <input type="text" data-testid="inquiry-grade" className={inputCls} value={form.grade} onChange={set("grade")} placeholder="e.g. Grade 3" />
          </Field>
          <Field label="School *" error={errors.school} testid="inquiry-school">
            <input type="text" data-testid="inquiry-school" className={inputCls} value={form.school} onChange={set("school")} placeholder="School name" />
          </Field>
        </div>

        <Field label="Home Address *" error={errors.home_address} testid="inquiry-home-address">
          <input type="text" data-testid="inquiry-home-address" className={inputCls} value={form.home_address} onChange={set("home_address")} placeholder="Street address, neighbourhood" />
        </Field>

        <div>
          <p className="mb-2 text-sm font-semibold text-ink">When do you need transportation? *</p>
          <div className="flex flex-wrap gap-3">
            <label data-testid="inquiry-morning-label" className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${form.morning ? "border-terra bg-blush text-terra-dark" : "border-line bg-cream text-ink/70"}`}>
              <input type="checkbox" data-testid="inquiry-morning" checked={form.morning} onChange={set("morning")} className="h-4 w-4 accent-terra" />
              Mornings (home → school)
            </label>
            <label data-testid="inquiry-afternoon-label" className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${form.afternoon ? "border-terra bg-blush text-terra-dark" : "border-line bg-cream text-ink/70"}`}>
              <input type="checkbox" data-testid="inquiry-afternoon" checked={form.afternoon} onChange={set("afternoon")} className="h-4 w-4 accent-terra" />
              Afternoons (school → home)
            </label>
          </div>
          {errors.times && <p data-testid="inquiry-times-error" className="mt-1 text-xs font-medium text-red-600">{errors.times}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Requested Start Date" testid="inquiry-start-date">
            <input type="date" data-testid="inquiry-start-date" className={inputCls} value={form.start_date} onChange={set("start_date")} />
          </Field>
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Days Required *</p>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  data-testid={`inquiry-day-${d.toLowerCase()}`}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    form.days.includes(d) ? "border-terra bg-terra text-white" : "border-line bg-cream text-ink/70 hover:border-terra/50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            {errors.days && <p data-testid="inquiry-days-error" className="mt-1 text-xs font-medium text-red-600">{errors.days}</p>}
          </div>
        </div>

        <Field label="Additional Information" testid="inquiry-additional-info">
          <textarea
            data-testid="inquiry-additional-info"
            rows={4}
            className={inputCls}
            value={form.additional_info}
            onChange={set("additional_info")}
            placeholder="Anything I should know — safety or accommodation needs, siblings, bell times, questions..."
          />
        </Field>

        {errors.submit && <p data-testid="inquiry-submit-error" className="text-sm font-medium text-red-600">{errors.submit}</p>}

        <button
          type="submit"
          disabled={sending}
          data-testid="inquiry-submit-btn"
          className="w-full rounded-full bg-terra py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-terra/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark disabled:opacity-60"
        >
          {sending ? "Sending..." : "Submit Route Request"}
        </button>
      </form>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
        <Info className="mt-0.5 shrink-0 text-terra" size={19} />
        <p data-testid="inquiry-disclaimer" className="text-sm leading-relaxed text-ink/65">
          This form is an inquiry only — it does not guarantee a spot. Routes are confirmed based on your
          location, your child's school, schedule fit, route capacity, and operational availability. If a
          route is full, I'll offer you a place on the waitlist.
        </p>
      </div>
    </div>
  );
}
