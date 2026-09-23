import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Lock, LogOut, RefreshCw } from "lucide-react";
import { LogoMark } from "@/components/Logo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TABS = ["inquiries", "registrations", "waitlist"];

const fmt = (iso) => (iso ? new Date(iso).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" }) : "");

function Rows({ items, fields }) {
  if (!items.length)
    return <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink/55">Nothing here yet.</p>;
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border border-line bg-surface p-5" data-testid={`admin-row-${item.id}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs font-semibold text-terra-dark">{item.reference || "WL"}</p>
            <p className="text-xs text-ink/45">{fmt(item.created_at)}</p>
          </div>
          <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {fields.map(([label, key]) =>
              item[key] ? (
                <div key={key}>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/45">{label}</dt>
                  <dd className="text-sm text-ink/80">
                    {Array.isArray(item[key]) ? item[key].join(", ") : String(item[key])}
                  </dd>
                </div>
              ) : null
            )}
          </dl>
        </div>
      ))}
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("msr_admin") || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("inquiries");
  const [data, setData] = useState({ inquiries: [], registrations: [], waitlist: [] });
  const [routesFull, setRoutesFull] = useState(false);

  const load = useCallback(async (t) => {
    try {
      const headers = { Authorization: `Bearer ${t}` };
      const [inq, reg, wl, status] = await Promise.all([
        axios.get(`${API}/admin/inquiries`, { headers }),
        axios.get(`${API}/admin/registrations`, { headers }),
        axios.get(`${API}/admin/waitlist`, { headers }),
        axios.get(`${API}/route-status`),
      ]);
      setData({ inquiries: inq.data, registrations: reg.data, waitlist: wl.data });
      setRoutesFull(!!status.data.routes_full);
    } catch {
      sessionStorage.removeItem("msr_admin");
      setToken("");
    }
  }, []);

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  const login = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const { data } = await axios.post(`${API}/admin/login`, { password });
      sessionStorage.setItem("msr_admin", data.token);
      setToken(data.token);
    } catch (err) {
      setLoginError(err.response?.data?.detail || "Login failed.");
    }
  };

  const toggleFull = async () => {
    const next = !routesFull;
    await axios.post(
      `${API}/admin/route-status`,
      { routes_full: next },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRoutesFull(next);
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <form onSubmit={login} data-testid="admin-login-form" className="w-full max-w-sm rounded-3xl border border-line bg-surface p-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blush text-terra">
            <Lock size={20} />
          </span>
          <h1 className="mt-4 text-center font-serif text-2xl font-semibold text-ink">Owner sign in</h1>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="admin-password-input"
            className="mt-6 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-ink focus:border-terra focus:outline-none"
          />
          {loginError && <p data-testid="admin-login-error" className="mt-2 text-xs font-medium text-red-600">{loginError}</p>}
          <button
            type="submit"
            data-testid="admin-login-btn"
            className="mt-4 w-full rounded-full bg-terra py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-terra-dark"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  const fields = {
    inquiries: [
      ["Parent", "parent_name"], ["Phone", "phone"], ["Email", "email"], ["Child", "child_name"],
      ["Grade", "grade"], ["School", "school"], ["Address", "home_address"], ["Start", "start_date"],
      ["Days", "days"], ["Notes", "additional_info"],
    ],
    registrations: [
      ["Parent", "parent_name"], ["Phone", "parent_phone"], ["Email", "parent_email"],
      ["Child", "child_legal_name"], ["School", "child_school"], ["Grade", "child_grade"],
      ["Address", "home_address"], ["Days", "days"], ["Safety Notes", "safety_info"],
    ],
    waitlist: [["Name", "name"], ["Email", "email"], ["Phone", "phone"], ["Note", "note"]],
  };

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-cream">
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <LogoMark size={34} />
            <h1 className="font-serif text-lg font-semibold text-ink">Submissions</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => load(token)}
              data-testid="admin-refresh-btn"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink/70 hover:border-terra"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              onClick={() => { sessionStorage.removeItem("msr_admin"); setToken(""); }}
              data-testid="admin-logout-btn"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink/70 hover:border-terra"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between rounded-2xl border border-line bg-surface p-5">
          <div>
            <p className="font-semibold text-ink">Routes full?</p>
            <p className="text-sm text-ink/55">Shows the waitlist card on the availability page.</p>
          </div>
          <button
            onClick={toggleFull}
            data-testid="admin-routes-full-toggle"
            className={`relative h-8 w-14 rounded-full transition-colors ${routesFull ? "bg-terra" : "bg-line"}`}
            aria-pressed={routesFull}
          >
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${routesFull ? "left-7" : "left-1"}`} />
          </button>
        </div>

        <div className="mt-6 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              data-testid={`admin-tab-${t}`}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold capitalize transition-colors ${
                tab === t ? "bg-terra text-white" : "border border-line bg-surface text-ink/70"
              }`}
            >
              {t} ({data[t].length})
            </button>
          ))}
        </div>

        <div className="mt-6">
          <Rows items={data[tab]} fields={fields[tab]} />
        </div>
      </div>
    </div>
  );
}
