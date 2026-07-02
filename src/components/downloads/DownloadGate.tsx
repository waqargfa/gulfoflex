"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Lock, Mail, ShieldCheck, X, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Email + OTP gate for downloading certificates / documents.

   Wrap a page (or section) in <DownloadGateProvider> and call
   `ensureVerified()` from `useDownloadGate()` before revealing a
   file. Once a visitor verifies their email in a session, they
   are not asked again (persisted in sessionStorage).
───────────────────────────────────────────────────────── */

const STORAGE_KEY = "gof-download-verified-email";

type GateContext = {
  verified: boolean;
  email: string | null;
  /** Resolves true once the visitor is verified, false if they cancel. */
  ensureVerified: () => Promise<boolean>;
};

const Ctx = createContext<GateContext | null>(null);

export function useDownloadGate(): GateContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDownloadGate must be used within a DownloadGateProvider");
  return ctx;
}

/** Open a file in a new tab. Works for local paths and cross-origin URLs. */
export function openFile(href: string): void {
  if (typeof window === "undefined" || !href) return;
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function DownloadGateProvider({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const resolverRef = useRef<((v: boolean) => void) | null>(null);

  // Restore verification for the current browser session.
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        setEmail(stored);
        setVerified(true);
      }
    } catch {
      /* sessionStorage unavailable — ignore */
    }
  }, []);

  const ensureVerified = useCallback(() => {
    if (verified) return Promise.resolve(true);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, [verified]);

  const settle = useCallback((ok: boolean, verifiedEmail?: string) => {
    if (ok && verifiedEmail) {
      setVerified(true);
      setEmail(verifiedEmail);
      try {
        sessionStorage.setItem(STORAGE_KEY, verifiedEmail);
      } catch {
        /* ignore */
      }
    }
    setOpen(false);
    resolverRef.current?.(ok);
    resolverRef.current = null;
  }, []);

  return (
    <Ctx.Provider value={{ verified, email, ensureVerified }}>
      {children}
      {open && (
        <OtpModal
          onCancel={() => settle(false)}
          onVerified={(e) => settle(true, e)}
        />
      )}
    </Ctx.Provider>
  );
}

/* ───────── Modal ───────── */

function OtpModal({
  onCancel,
  onVerified,
}: {
  onCancel: () => void;
  onVerified: (email: string) => void;
}) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onCancel]);

  // Resend cooldown countdown.
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const requestCode = useCallback(
    async (targetEmail: string) => {
      setBusy(true);
      setError(null);
      setNotice(null);
      try {
        const res = await fetch("/api/download-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "request", email: targetEmail }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (typeof data.retryAfter === "number") setCooldown(data.retryAfter);
          setError(data.error || "Something went wrong. Please try again.");
          return false;
        }
        setStep("code");
        setNotice(`We sent a 6-digit code to ${targetEmail}.`);
        setCooldown(45);
        return true;
      } catch {
        setError("Network error. Please check your connection and try again.");
        return false;
      } finally {
        setBusy(false);
      }
    },
    []
  );

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    await requestCode(value);
  };

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = code.trim();
    if (!/^\d{6}$/.test(value)) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/download-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", email: email.trim(), code: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "That code is incorrect.");
        if (data.expired) {
          setStep("email");
          setCode("");
        }
        return;
      }
      onVerified(email.trim());
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Verify your email to download"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onCancel}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
      />

      <div
        className="relative w-full max-w-md rounded-3xl border bg-white shadow-[0_50px_120px_-30px_rgba(0,0,0,0.45)] overflow-hidden animate-[modalIn_.28s_cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />

        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full border bg-white/90 backdrop-blur flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
          style={{ borderColor: "rgba(0,0,0,0.10)" }}
        >
          <X size={16} />
        </button>

        <div className="px-7 sm:px-8 pt-8 pb-7">
          {/* Icon + heading */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
              {step === "email" ? (
                <Lock size={22} className="text-orange-600" strokeWidth={2.2} />
              ) : (
                <ShieldCheck size={22} className="text-orange-600" strokeWidth={2.2} />
              )}
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.20em] uppercase text-orange-600 mb-0.5">
                Secure Download
              </div>
              <h3
                className="text-neutral-900 leading-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {step === "email" ? "Verify your email" : "Enter your code"}
              </h3>
            </div>
          </div>

          {step === "email" ? (
            <>
              <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                Enter your email to receive a one-time passcode. It unlocks all certificate
                and document downloads for this session.
              </p>
              <form onSubmit={submitEmail} className="space-y-3">
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 transition"
                  />
                </div>
                {error && <p className="text-xs font-semibold text-red-600 px-1">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-2xl bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold tracking-wide transition-colors"
                >
                  {busy ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending code…
                    </>
                  ) : (
                    <>
                      Send code <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {notice && (
                <div className="flex items-start gap-2 mb-5 rounded-xl bg-orange-50 border border-orange-200 px-4 py-3">
                  <CheckCircle2 size={15} className="text-orange-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-neutral-700 leading-relaxed">{notice}</p>
                </div>
              )}
              <form onSubmit={submitCode} className="space-y-3">
                <input
                  inputMode="numeric"
                  autoFocus
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError(null);
                  }}
                  placeholder="••••••"
                  autoComplete="one-time-code"
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-center text-2xl font-bold tracking-[0.5em] text-neutral-800 placeholder:text-neutral-300 placeholder:tracking-[0.5em] focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 transition"
                />
                {error && <p className="text-xs font-semibold text-red-600 px-1">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-2xl bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold tracking-wide transition-colors"
                >
                  {busy ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Verifying…
                    </>
                  ) : (
                    <>
                      Unlock download <ShieldCheck size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center justify-between mt-4 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setCode("");
                    setError(null);
                    setNotice(null);
                  }}
                  className="font-semibold text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                  ← Change email
                </button>
                <button
                  type="button"
                  disabled={busy || cooldown > 0}
                  onClick={() => requestCode(email.trim())}
                  className="font-semibold text-orange-600 hover:text-orange-700 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                </button>
              </div>
            </>
          )}

          <p className="mt-5 text-[11px] text-neutral-400 leading-relaxed text-center">
            We only use your email to send this code. No spam.
          </p>
        </div>
      </div>
    </div>
  );
}
