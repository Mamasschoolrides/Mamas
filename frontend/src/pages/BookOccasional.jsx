import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Info } from "lucide-react";
import { MaskLine } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:border-terra focus:outline-none focus:ring-2 focus:ring-terra/20";

const initial = {
  parent_name: "", phone: "", email: "", child_name: "", school: "",
  pickup_address: "", dropoff_address: "", trip_date: "", direction: "", notes: "",
};

const Field = ({ label, error, children, testid }) => (
  <div>
    <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
    {children}
    {error && <p data-testid={`${testid}-error`} className="mt-1 text-xs font-medium text-red-600">{error}</p>}
  </div>
);

export default function BookOccasional() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.parent_name.trim()) e.parent_name = "Please enter your name.";
    if (!form.phone.trim()) e.phone = "I need a number to confirm the trip.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.child_name.trim()) e.child_name = "Please enter your child's name.";
    if (!form.school.trim()) e.school = "Which school?";
    if (!form.pickup_address.trim()) e.pickup_address = "Where do I pick up?";
    if (!form.dropoff_address.trim()) e.dropoff_address = "Where do I drop off?";
    if (!form.trip_date) e.trip_date = "Which day?";
    if (!form.direction) e.direction = "Pick morning or afternoon.";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setPaying(true);
    try {
      const { data } = await axios.post(`${API}/occasional/checkout`, {
        ...form,
        origin_url: window.location.origin,
      });
      window.location.href = data.checkout_url;
    } catch {
      setErrors({ submit: "Couldn't start the secure payment — please try again, or text (780) 880-8566." });
      setPaying(false);
    }
  };

  return (
    <div data-testid="book-occasional-page" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:py-24">
      <Link to="/services-pricing" data-testid="back-to-pricing-link" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/50 transition-colors hover:text-terra-dark">
        <ArrowLeft size={16} /> Back to pricing
      </Link>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-terra">Occasional ride</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
        <MaskLine delay={0.1}>Book a single trip —</MaskLine>
        <MaskLine delay={0.22}>
          <em className="text-terra">$25, paid by card.</em>
        </MaskLine>
      </h1>
      <p className="mt-5 leading-relaxed text-ink/70">
        For the odd day life gets complicated. Tell me the trip details, pay $25 securely by card, and I'll
        confirm by text. Occasional trips are subject to route availability —{" "}
        <strong className="text-ink">if I can't make it work, you're refunded in full.</strong>
      </p>

      <form onSubmit={submit} noValidate data-testid="occasional-form" className="mt-10 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Parent/Guardian Name *" error={errors.parent_name} testid="occ-parent-name">
            <input type="text" data-testid="occ-parent-name" className={inputCls} value={form.parent_name} onChange={set("parent_name")} placeholder="Your full name" />
          </Field>
          <Field label="Phone *" error={errors.phone} testid="occ-phone">
            <input type="tel" data-testid="occ-phone" className={inputCls} value={form.phone} onChange={set("phone")} placeholder="(780) 555-0000" />
          </Field>
          <Field label="Email *" error={errors.email} testid="occ-email">
            <input type="email" data-testid="occ-email" className={inputCls} value={form.email} onChange={set("email")} placeholder="you@email.com" />
          </Field>
          <Field label="Child's Name *" error={errors.child_name} testid="occ-child-name">
            <input type="text" data-testid="occ-child-name" className={inputCls} value={form.child_name} onChange={set("child_name")} placeholder="First and last name" />
          </Field>
          <Field label="School *" error={errors.school} testid="occ-school">
            <input type="text" data-testid="occ-school" className={inputCls} value={form.school} onChange={set("school")} placeholder="School name" />
          </Field>
          <Field label="Trip Date *" error={errors.trip_date} testid="occ-trip-date">
            <input type="date" data-testid="occ-trip-date" className={inputCls} value={form.trip_date} onChange={set("trip_date")} />
          </Field>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-ink">Which direction? *</p>
          <div className="flex flex-wrap gap-3">
            {[
              { v: "morning", label: "Morning (home → school)" },
              { v: "afternoon", label: "Afternoon (school → home)" },
            ].map((d) => (
              <button
                key={d.v}
                type="button"
                onClick={() => setForm({ ...form, direction: d.v })}
                data-testid={`occ-direction-${d.v}`}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  form.direction === d.v ? "border-terra bg-terra text-white" : "border-line bg-cream text-ink/70 hover:border-terra/50"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          {errors.direction && <p data-testid="occ-direction-error" className="mt-1 text-xs font-medium text-red-600">{errors.direction}</p>}
        </div>

        <Field label="Pickup Address *" error={errors.pickup_address} testid="occ-pickup">
          <input type="text" data-testid="occ-pickup" className={inputCls} value={form.pickup_address} onChange={set("pickup_address")} placeholder="Exact pickup location" />
        </Field>
        <Field label="Drop-off Address *" error={errors.dropoff_address} testid="occ-dropoff">
          <input type="text" data-testid="occ-dropoff" className={inputCls} value={form.dropoff_address} onChange={set("dropoff_address")} placeholder="Exact drop-off location" />
        </Field>
        <Field label="Notes" testid="occ-notes">
          <textarea data-testid="occ-notes" rows={3} className={inputCls} value={form.notes} onChange={set("notes")} placeholder="Anything I should know — timing constraints, safety needs, who receives your child..." />
        </Field>

        {errors.submit && <p data-testid="occ-submit-error" className="text-sm font-medium text-red-600">{errors.submit}</p>}

        <button
          type="submit"
          disabled={paying}
          data-testid="occ-pay-btn"
          className="w-full rounded-full bg-terra py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-terra/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark disabled:opacity-60"
        >
          {paying ? "Redirecting to secure payment…" : "Book & Pay $25"}
        </button>
      </form>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
        <Info className="mt-0.5 shrink-0 text-terra" size={19} />
        <p data-testid="occ-disclaimer" className="text-sm leading-relaxed text-ink/65">
          Occasional trips are subject to route availability — monthly riders get first priority on seats.
          I'll confirm your trip by text as soon as I review it. If the trip isn't possible, your $25 is
          refunded in full, no fuss.
        </p>
      </div>
    </div>
  );
}
