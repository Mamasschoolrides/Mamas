import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const StatusLookup = () => {
  const [ref, setRef] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const check = async (e) => {
    e.preventDefault();
    if (!ref.trim()) return;
    setChecking(true);
    setError("");
    setResult(null);
    try {
      const { data } = await axios.get(`${API}/status/${encodeURIComponent(ref.trim())}`);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Couldn't check right now — please try again.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div data-testid="status-lookup-card" className="mt-10 rounded-3xl border border-line bg-surface p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-terra">Already sent a request?</p>
      <p className="mt-1.5 text-sm text-ink/60">Enter your reference code (looks like MSR-XXXXXX) to see where things stand.</p>
      <form onSubmit={check} className="mt-4 flex gap-2">
        <input
          type="text"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="MSR-XXXXXX"
          data-testid="status-lookup-input"
          className="w-full rounded-full border border-line bg-cream px-4 py-2.5 font-mono text-sm uppercase text-ink placeholder:normal-case placeholder:text-ink/40 focus:border-terra focus:outline-none"
        />
        <button
          type="submit"
          disabled={checking}
          data-testid="status-lookup-btn"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-cream transition-colors hover:bg-ink/90 disabled:opacity-60"
        >
          <Search size={14} strokeWidth={2.5} /> {checking ? "..." : "Check"}
        </button>
      </form>
      {error && <p data-testid="status-lookup-error" className="mt-3 text-xs font-medium text-red-600">{error}</p>}
      {result && (
        <div data-testid="status-lookup-result" className="mt-4 rounded-2xl bg-blush/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink/45">
            {result.type === "registration" ? "Registration" : "Route inquiry"} • {result.reference}
          </p>
          <p className="mt-1 text-sm font-medium leading-relaxed text-ink">{result.message}</p>
        </div>
      )}
    </div>
  );
};
