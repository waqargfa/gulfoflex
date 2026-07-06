"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      product: String(data.get("product") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="text-neutral-900 text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
          Thank you — message sent!
        </h3>
        <p className="text-neutral-600 text-sm max-w-md mx-auto mb-6">
          Your enquiry has reached our team at <strong>info@gulfoflex.com</strong>. We&rsquo;ll get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="name">
            Full Name <span className="text-orange-600">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your full name"
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="company">Company</label>
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Company name"
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="email">
            Email Address <span className="text-orange-600">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com"
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+971 xx xxx xxxx"
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition" />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="product">Product of Interest</label>
        <select id="product" name="product"
          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-700 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition">
          <option value="">Select a product…</option>
          <option value="nbr">Gulf-O-Flex® NBR</option>
          <option value="xlpe">Gulf-O-Flex® XLPE</option>
          <option value="sound">Gulf-O-Flex® Sound</option>
          <option value="aluglass">Gulf-O-Flex® Aluglass</option>
          <option value="aluclad">Gulf-O-Flex® Aluclad</option>
          <option value="accessories">Accessories & Adhesives</option>
          <option value="other">Other / Not Sure</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="message">
          Message <span className="text-orange-600">*</span>
        </label>
        <textarea id="message" name="message" required rows={5} placeholder="Describe your project, application, or question…"
          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition resize-none" />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {status === "submitting" ? (
          <>Sending… <Loader2 size={16} className="animate-spin" /></>
        ) : (
          <>Send Message <Send size={16} /></>
        )}
      </button>
      <p className="text-[11px] text-neutral-400 text-center">By sending you agree to our privacy policy. We never share your data.</p>
    </form>
  );
}
