import { useState } from "react";
import axios from "axios";
import { Hourglass, CheckCircle2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const WaitlistCard = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please enter a valid email.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    try {
      await axios.post(`${API}/waitlist`, form);
      setDone(true);
    } catch {
      setErrors({ submit: "Something went wrong — please try again or call us." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="waitlist-card" className="rounded-3xl border border-sun/40 bg-[#FDF3E7] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sun/20 text-sun">
          <Hourglass size={22} strokeWidth={2.2} />
        </span>
        <h3 className="font-serif text-xl font-semibold text-ink sm:text-2xl">This route is currently full.</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
        Join our waitlist and we'll contact you as soon as a seat becomes available. Seats open up more
        often than you'd think — especially at the start of a new month or semester.
      </p>

      {done ? (
        <div data-testid="waitlist-success" className="mt-5 flex items-start gap-3 rounded-2xl bg-sage/15 p-4">
          <CheckCircle2 className="mt-0.5 shrink-0 text-sage" size={22} />
          <p className="text-sm font-medium text-ink">
            You're on the waitlist! I'll reach out personally the moment a seat opens up on your route.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2" noValidate>
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={set("name")}
              data-testid="waitlist-name-input"
              className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:border-terra focus:outline-none"
            />
            {errors.name && <p data-testid="waitlist-name-error" className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={set("email")}
              data-testid="waitlist-email-input"
              className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:border-terra focus:outline-none"
            />
            {errors.email && <p data-testid="waitlist-email-error" className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>}
          </div>
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={set("phone")}
            data-testid="waitlist-phone-input"
            className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:border-terra focus:outline-none sm:col-span-2"
          />
          {errors.submit && <p data-testid="waitlist-submit-error" className="text-xs font-medium text-red-600 sm:col-span-2">{errors.submit}</p>}
          <button
            type="submit"
            disabled={sending}
            data-testid="waitlist-submit-btn"
            className="rounded-full bg-ink px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 sm:col-span-2"
          >
            {sending ? "Joining..." : "Join the Waitlist"}
          </button>
        </form>
      )}
    </div>
  );
};
