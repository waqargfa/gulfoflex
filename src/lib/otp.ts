/* ─────────────────────────────────────────────────────────
   One-time password store for gated document downloads.

   In-memory (single Node process on the VM). OTPs expire after
   10 minutes, are single-use, rate-limited per email, and allow
   a limited number of verification attempts.
───────────────────────────────────────────────────────── */

type OtpEntry = {
  code: string;
  expires: number; // epoch ms
  attempts: number; // verification attempts used
  lastSent: number; // epoch ms of last send (for resend cooldown)
};

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_MS = 45 * 1000; // 45 seconds between sends
const MAX_ATTEMPTS = 5;

const store = new Map<string, OtpEntry>();

/** Remove expired entries so the map does not grow unbounded. */
function sweep(): void {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.expires) store.delete(key);
  }
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export type RequestResult =
  | { ok: true; code: string }
  | { ok: false; retryAfter: number };

/**
 * Generate (or refuse, if within cooldown) a 6-digit OTP for an email.
 * Returns the code so the caller can email it.
 */
export function requestOtp(email: string): RequestResult {
  sweep();
  const key = normalizeEmail(email);
  const now = Date.now();
  const existing = store.get(key);

  if (existing && now - existing.lastSent < RESEND_COOLDOWN_MS) {
    return {
      ok: false,
      retryAfter: Math.ceil((RESEND_COOLDOWN_MS - (now - existing.lastSent)) / 1000),
    };
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  store.set(key, {
    code,
    expires: now + OTP_TTL_MS,
    attempts: 0,
    lastSent: now,
  });

  return { ok: true, code };
}

export type VerifyResult = "ok" | "expired" | "invalid" | "too_many";

/** Verify a submitted code. On success the entry is consumed (single-use). */
export function verifyOtp(email: string, code: string): VerifyResult {
  sweep();
  const key = normalizeEmail(email);
  const entry = store.get(key);

  if (!entry || Date.now() > entry.expires) {
    store.delete(key);
    return "expired";
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    store.delete(key);
    return "too_many";
  }

  entry.attempts += 1;

  if (entry.code !== code.trim()) {
    if (entry.attempts >= MAX_ATTEMPTS) {
      store.delete(key);
      return "too_many";
    }
    return "invalid";
  }

  store.delete(key); // single use
  return "ok";
}
