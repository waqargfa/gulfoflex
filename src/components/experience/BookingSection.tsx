"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Loader2,
  Users,
  Building2,
  Mail,
  Phone,
  User,
  MessageSquare,
  PartyPopper,
  AlertCircle,
} from "lucide-react";

type SlotState = { slot: string; available: boolean };

const SLOT_LABEL = (slot: string) => {
  const h = parseInt(slot.slice(0, 2), 10);
  const end = `${String(h + 1).padStart(2, "0")}:00`;
  return `${slot} – ${end}`;
};

/** Build the next `count` bookable days (Mon–Sat, skipping Sundays), starting tomorrow. */
function upcomingDays(count: number) {
  const days: { value: string; weekday: string; day: string; month: string }[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1); // start tomorrow
  while (days.length < count) {
    if (d.getDay() !== 0) {
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      days.push({
        value,
        weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
        day: String(d.getDate()),
        month: d.toLocaleDateString("en-GB", { month: "short" }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export default function BookingSection() {
  const days = useMemo(() => upcomingDays(14), []);
  const [date, setDate] = useState<string>(days[0]?.value ?? "");
  const [slots, setSlots] = useState<SlotState[]>([]);
  const [slot, setSlot] = useState<string>("");
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    visitors: 1,
    purpose: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load availability whenever the chosen date changes
  useEffect(() => {
    if (!date) return;
    let active = true;
    setLoadingSlots(true);
    setSlot("");
    fetch(`/api/experience-booking?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setSlots(Array.isArray(data.slots) ? data.slots : []);
      })
      .catch(() => active && setSlots([]))
      .finally(() => active && setLoadingSlots(false));
    return () => {
      active = false;
    };
  }, [date]);

  const update = (k: keyof typeof form, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setWarning(null);
    setSuccess(null);

    if (!slot) {
      setError("Please select an available time slot.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/experience-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date, slot }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        // Refresh slots in case of a clash
        if (res.status === 409) {
          const r = await fetch(`/api/experience-booking?date=${date}`);
          const d = await r.json();
          setSlots(Array.isArray(d.slots) ? d.slots : []);
          setSlot("");
        }
        return;
      }

      if (data.warning) setWarning(data.warning);
      setSuccess(
        `Your visit on ${new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })} at ${SLOT_LABEL(slot)} is confirmed. A confirmation email is on its way to ${form.email}.`
      );
      setForm({ name: "", email: "", phone: "", company: "", visitors: 1, purpose: "" });
      setSlot("");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section id="book-visit" className="py-16 md:py-28 bg-neutral-50">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl md:rounded-3xl border border-neutral-100 shadow-sm p-6 sm:p-10 md:p-14">
            <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
              <PartyPopper size={30} className="text-green-600" />
            </div>
            <h2
              className="text-neutral-900 mb-3"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Visit Confirmed!
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed mb-2">{success}</p>
            {warning && (
              <p className="text-orange-600 text-sm mt-4 inline-flex items-center gap-2">
                <AlertCircle size={15} /> {warning}
              </p>
            )}
            <button
              onClick={() => setSuccess(null)}
              className="btn-ghost mt-8 inline-flex items-center gap-2"
            >
              Book another visit
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book-visit" className="py-16 md:py-28 bg-neutral-50">
      <div className="container-wide">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-orange-600 mb-4">
            <CalendarDays size={13} /> Book Your Slot
          </span>
          <h2
            className="text-neutral-900 mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            Reserve a Private Visit
          </h2>
          <p className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto">
            Choose a one-hour slot that suits you. We&apos;ll confirm your booking by email instantly and prepare a tailored, hands-on experience for you and your team.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto bg-white rounded-2xl md:rounded-3xl border border-neutral-100 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.12)]"
        >
          <div className="grid lg:grid-cols-2">
            {/* LEFT: date + slot picker */}
            <div className="p-5 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-neutral-100">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays size={18} className="text-orange-500" />
                <h3 className="text-neutral-900 font-bold text-sm uppercase tracking-[0.14em]">Select a date</h3>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 mb-8">
                {days.map((d) => {
                  const active = d.value === date;
                  return (
                    <button
                      type="button"
                      key={d.value}
                      onClick={() => setDate(d.value)}
                      className={`flex-shrink-0 w-16 rounded-2xl border px-2 py-3 text-center transition-all ${
                        active
                          ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/25"
                          : "bg-white border-neutral-200 text-neutral-700 hover:border-orange-300"
                      }`}
                    >
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${active ? "text-white/80" : "text-neutral-400"}`}>
                        {d.weekday}
                      </div>
                      <div className="text-xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                        {d.day}
                      </div>
                      <div className={`text-[10px] font-medium ${active ? "text-white/80" : "text-neutral-400"}`}>
                        {d.month}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-orange-500" />
                <h3 className="text-neutral-900 font-bold text-sm uppercase tracking-[0.14em]">Select a time slot</h3>
              </div>

              {loadingSlots ? (
                <div className="flex items-center gap-2 text-neutral-400 text-sm py-8 justify-center">
                  <Loader2 size={16} className="animate-spin" /> Loading availability…
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {slots.map((s) => {
                    const selected = s.slot === slot;
                    return (
                      <button
                        type="button"
                        key={s.slot}
                        disabled={!s.available}
                        onClick={() => setSlot(s.slot)}
                        className={`rounded-xl border px-2 py-3 text-xs font-bold transition-all ${
                          !s.available
                            ? "bg-neutral-50 border-neutral-100 text-neutral-300 line-through cursor-not-allowed"
                            : selected
                            ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/25"
                            : "bg-white border-neutral-200 text-neutral-700 hover:border-orange-300"
                        }`}
                      >
                        {s.slot}
                      </button>
                    );
                  })}
                </div>
              )}
              <p className="text-neutral-400 text-xs mt-4">
                Working hours: Mon–Sat · 09:00–18:00 GST. Each visit is one hour.
              </p>
            </div>

            {/* RIGHT: contact details */}
            <div className="p-5 sm:p-8 md:p-10 text-neutral-900">
              <div className="flex items-center gap-2 mb-6">
                <User size={18} className="text-orange-500" />
                <h3 className="text-neutral-900 font-bold text-sm uppercase tracking-[0.14em]">Your details</h3>
              </div>

              <div className="space-y-4">
                <Field icon={<User size={15} />} label="Full name" required>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jane Doe"
                    className="booking-input"
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field icon={<Mail size={15} />} label="Email" required>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="jane@company.com"
                      className="booking-input"
                    />
                  </Field>
                  <Field icon={<Phone size={15} />} label="Phone" required>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+971 …"
                      className="booking-input"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field icon={<Building2 size={15} />} label="Company">
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Optional"
                      className="booking-input"
                    />
                  </Field>
                  <Field icon={<Users size={15} />} label="Visitors">
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={form.visitors}
                      onChange={(e) => update("visitors", Number(e.target.value))}
                      className="booking-input"
                    />
                  </Field>
                </div>

                <Field icon={<MessageSquare size={15} />} label="Purpose of visit">
                  <textarea
                    rows={2}
                    value={form.purpose}
                    onChange={(e) => update("purpose", e.target.value)}
                    placeholder="Tell us what you'd like to focus on (optional)"
                    className="booking-input resize-none"
                  />
                </Field>
              </div>

              {error && (
                <div className="mt-5 flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" /> {error}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-xs text-neutral-500">
                  {slot ? (
                    <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold">
                      <CheckCircle2 size={14} /> {SLOT_LABEL(slot)} selected
                    </span>
                  ) : (
                    "Select a slot to continue"
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting || !slot}
                  className="btn-primary w-full sm:w-auto justify-center inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Booking…
                    </>
                  ) : (
                    <>Confirm Booking</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  required,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.16em] mb-2">
        <span className="text-orange-500">{icon}</span>
        {label} {required && <span className="text-orange-600">*</span>}
      </label>
      {children}
    </div>
  );
}
