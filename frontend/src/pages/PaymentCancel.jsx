import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div data-testid="payment-cancel-page" className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush text-terra">
        <XCircle size={34} />
      </span>
      <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Payment cancelled — no charge was made.
      </h1>
      <p className="mt-4 leading-relaxed text-ink/70">
        No worries. Your registration is still on file. You can return to your confirmation page to try card
        payment again, or arrange payment directly with me by e-transfer — just text{" "}
        <a href="tel:+17808808566" className="font-semibold text-terra-dark">(780) 880-8566</a>.
      </p>
      <Link
        to="/"
        data-testid="payment-cancel-home-link"
        className="mt-8 inline-block rounded-full border-2 border-ink/15 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:border-terra hover:text-terra-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
