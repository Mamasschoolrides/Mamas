import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState("checking");

  useEffect(() => {
    if (!sessionId) {
      setState("error");
      return;
    }
    let attempts = 0;
    const poll = async () => {
      try {
        const { data } = await axios.get(`${API}/payments/status/${sessionId}`);
        if (data.payment_status === "paid") {
          setState("paid");
          return;
        }
      } catch {
        /* keep polling briefly */
      }
      attempts += 1;
      if (attempts < 10) setTimeout(poll, 2000);
      else setState("pending");
    };
    poll();
  }, [sessionId]);

  return (
    <div data-testid="payment-success-page" className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      {state === "checking" && (
        <>
          <Loader2 className="mx-auto animate-spin text-terra" size={40} />
          <h1 className="mt-6 font-serif text-3xl font-semibold text-ink">Confirming your payment…</h1>
          <p className="mt-3 text-ink/60">One moment while we check with the card processor.</p>
        </>
      )}
      {state === "paid" && (
        <>
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-sage">
            <CheckCircle2 size={34} />
          </span>
          <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Your child's seat is reserved!
          </h1>
          <p className="mt-4 leading-relaxed text-ink/70">
            Payment received — thank you. Your registration is complete, and I'll be in touch personally to
            confirm your pickup window and first ride date. Welcome to Mama's School Rides.
          </p>
          <p className="mt-6 text-sm text-ink/50">
            Anything at all, call or text <a href="tel:+17808808566" className="font-semibold text-terra-dark">(780) 880-8566</a>.
          </p>
          <Link
            to="/"
            data-testid="payment-success-home-link"
            className="mt-8 inline-block rounded-full bg-terra px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-terra/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terra-dark"
          >
            Back to Home
          </Link>
        </>
      )}
      {state === "pending" && (
        <>
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sun/15 text-sun">
            <AlertCircle size={34} />
          </span>
          <h1 className="mt-6 font-serif text-3xl font-semibold text-ink">Payment is processing</h1>
          <p className="mt-3 leading-relaxed text-ink/70">
            Your payment was submitted but hasn't finished confirming yet. If you were charged, your seat is
            reserved — I'll confirm by text shortly. Questions? Call <a href="tel:+17808808566" className="font-semibold text-terra-dark">(780) 880-8566</a>.
          </p>
        </>
      )}
      {state === "error" && (
        <>
          <h1 className="font-serif text-3xl font-semibold text-ink">Something's missing</h1>
          <p className="mt-3 text-ink/70">
            We couldn't find that payment session. If you completed payment, don't worry — text
            <a href="tel:+17808808566" className="font-semibold text-terra-dark"> (780) 880-8566</a> and I'll confirm manually.
          </p>
        </>
      )}
    </div>
  );
}
