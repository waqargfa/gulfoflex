import nodemailer from "nodemailer";
import type { Booking } from "./booking";
import { slotLabel } from "./booking";

/* ─────────────────────────────────────────────────────────
   Transactional email (nodemailer over SMTP)
───────────────────────────────────────────────────────── */

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured (missing SMTP_HOST/USER/PASSWORD).");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true", // false for STARTTLS on 587
    auth: { user, pass },
    requireTLS: port === 587,
    connectionTimeout: 120_000,
  });
}

function fromHeader(): string {
  const name = process.env.MAIL_FROM_NAME || "Gulf-O-Flex";
  const address = process.env.MAIL_FROM_ADDRESS || process.env.SMTP_USER || "";
  return `"${name}" <${address}>`;
}

function prettyDate(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const BRAND = "#f97316";

function shell(inner: string, subtitle = "Experience Centre"): string {
  return `
  <div style="margin:0;padding:0;background:#f5f5f4;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:24px 16px;">
      <div style="background:#0a0a0a;border-radius:16px 16px 0 0;padding:28px 32px;">
        <div style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em;">
          Gulf-O-Flex<span style="color:${BRAND};">&reg;</span>
        </div>
        <div style="color:#a3a3a3;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;margin-top:4px;">
          ${subtitle}
        </div>
      </div>
      <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:32px;">
        ${inner}
      </div>
      <div style="text-align:center;color:#a3a3a3;font-size:11px;margin-top:20px;line-height:1.6;">
        Rubber World Industry LLC · Ajman Industrial Area 2, Ajman, UAE<br/>
        +971 6 743 4176 · info@gulfoflex.com
      </div>
    </div>
  </div>`;
}

function detailsTable(b: Booking): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;color:#737373;font-size:13px;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;color:#171717;font-size:14px;font-weight:600;">${value}</td>
    </tr>`;
  return `
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee;margin-top:8px;">
      ${row("Date", prettyDate(b.date))}
      ${row("Time slot", slotLabel(b.slot) + " GST")}
      ${row("Name", escapeHtml(b.name))}
      ${row("Email", escapeHtml(b.email))}
      ${row("Phone", escapeHtml(b.phone))}
      ${b.company ? row("Company", escapeHtml(b.company)) : ""}
      ${row("Visitors", String(b.visitors))}
      ${b.purpose ? row("Purpose", escapeHtml(b.purpose)) : ""}
    </table>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Notification email to the Gulf-O-Flex team. */
function teamEmail(b: Booking): { subject: string; html: string; text: string } {
  const subject = `New Experience Centre visit — ${prettyDate(b.date)} · ${slotLabel(b.slot)}`;
  const html = shell(`
    <h1 style="margin:0 0 6px;font-size:22px;color:#171717;font-weight:800;">New visit booking</h1>
    <p style="margin:0 0 20px;color:#737373;font-size:14px;line-height:1.6;">
      A new Experience Centre visit has been reserved through the website. The slot has been marked as booked.
    </p>
    ${detailsTable(b)}
    <div style="margin-top:24px;padding:14px 16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;color:#9a3412;font-size:13px;">
      Reference: ${b.id}
    </div>
  `);
  const text = `New Experience Centre visit booking
Date: ${prettyDate(b.date)}
Time: ${slotLabel(b.slot)} GST
Name: ${b.name}
Email: ${b.email}
Phone: ${b.phone}
Company: ${b.company || "-"}
Visitors: ${b.visitors}
Purpose: ${b.purpose || "-"}
Reference: ${b.id}`;
  return { subject, html, text };
}

/** Confirmation email to the customer. */
function customerEmail(b: Booking): { subject: string; html: string; text: string } {
  const subject = `Your Gulf-O-Flex® Experience Centre visit is confirmed`;
  const html = shell(`
    <h1 style="margin:0 0 6px;font-size:22px;color:#171717;font-weight:800;">You're confirmed, ${escapeHtml(b.name.split(" ")[0])} 🎉</h1>
    <p style="margin:0 0 20px;color:#737373;font-size:14px;line-height:1.6;">
      Thank you for booking a visit to the Gulf-O-Flex<sup>&reg;</sup> Experience Centre. Your one-hour slot is reserved — here are your details:
    </p>
    ${detailsTable(b)}
    <div style="margin-top:24px;">
      <p style="color:#171717;font-size:14px;font-weight:700;margin:0 0 8px;">What to expect</p>
      <ul style="margin:0;padding-left:18px;color:#525252;font-size:13px;line-height:1.8;">
        <li>A guided walkthrough of our full insulation product range</li>
        <li>Live thermal, fire and acoustic performance demonstrations</li>
        <li>One-on-one technical consultation with our specialists</li>
      </ul>
    </div>
    <div style="margin-top:24px;padding:14px 16px;background:#f5f5f4;border-radius:10px;color:#525252;font-size:13px;line-height:1.6;">
      Please arrive 10 minutes early. Need to reschedule or bring more guests?
      Just reply to this email or call <strong>+971 6 743 4176</strong>.
    </div>
    <p style="margin:22px 0 0;color:#a3a3a3;font-size:12px;">Booking reference: ${b.id}</p>
  `);
  const text = `Your Gulf-O-Flex Experience Centre visit is confirmed.

Date: ${prettyDate(b.date)}
Time: ${slotLabel(b.slot)} GST
Visitors: ${b.visitors}

What to expect:
- Guided walkthrough of our full insulation product range
- Live thermal, fire and acoustic performance demonstrations
- One-on-one technical consultation with our specialists

Please arrive 10 minutes early. To reschedule, reply to this email or call +971 6 743 4176.
Booking reference: ${b.id}`;
  return { subject, html, text };
}

export async function sendBookingEmails(b: Booking): Promise<void> {
  const transport = getTransport();
  const from = fromHeader();
  const notify = process.env.BOOKING_NOTIFY_EMAIL || "info@gulfoflex.com";

  const team = teamEmail(b);
  const customer = customerEmail(b);

  await Promise.all([
    transport.sendMail({
      from,
      to: notify,
      replyTo: b.email,
      subject: team.subject,
      html: team.html,
      text: team.text,
    }),
    transport.sendMail({
      from,
      to: b.email,
      replyTo: notify,
      subject: customer.subject,
      html: customer.html,
      text: customer.text,
    }),
  ]);
}

/* ─────────────────────────────────────────────────────────
   Contact form enquiry
───────────────────────────────────────────────────────── */

export interface ContactEnquiry {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product?: string;
  message: string;
}

const PRODUCT_LABELS: Record<string, string> = {
  nbr: "Gulf-O-Flex® NBR",
  xlpe: "Gulf-O-Flex® XLPE",
  sound: "Gulf-O-Flex® Sound",
  aluglass: "Gulf-O-Flex® Aluglass",
  aluclad: "Gulf-O-Flex® Aluclad",
  accessories: "Accessories & Adhesives",
  other: "Other / Not Sure",
};

export async function sendContactEmail(c: ContactEnquiry): Promise<void> {
  const transport = getTransport();
  const from = fromHeader();
  const notify = process.env.CONTACT_NOTIFY_EMAIL || "info@gulfoflex.com";

  const productLabel = c.product ? PRODUCT_LABELS[c.product] || c.product : "";

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;color:#737373;font-size:13px;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;color:#171717;font-size:14px;font-weight:600;">${value}</td>
    </tr>`;

  const html = shell(
    `
    <h1 style="margin:0 0 6px;font-size:22px;color:#171717;font-weight:800;">New contact enquiry</h1>
    <p style="margin:0 0 20px;color:#737373;font-size:14px;line-height:1.6;">
      A new enquiry has been submitted through the website contact form.
    </p>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee;margin-top:8px;">
      ${row("Name", escapeHtml(c.name))}
      ${row("Email", escapeHtml(c.email))}
      ${c.phone ? row("Phone", escapeHtml(c.phone)) : ""}
      ${c.company ? row("Company", escapeHtml(c.company)) : ""}
      ${productLabel ? row("Product", escapeHtml(productLabel)) : ""}
    </table>
    <div style="margin-top:24px;">
      <p style="color:#171717;font-size:14px;font-weight:700;margin:0 0 8px;">Message</p>
      <div style="padding:14px 16px;background:#f5f5f4;border-radius:10px;color:#525252;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(c.message)}</div>
    </div>
  `,
    "Contact Enquiry"
  );

  const text = `New contact enquiry
Name: ${c.name}
Email: ${c.email}
Phone: ${c.phone || "-"}
Company: ${c.company || "-"}
Product: ${productLabel || "-"}

Message:
${c.message}`;

  await transport.sendMail({
    from,
    to: notify,
    replyTo: c.email,
    subject: `New contact enquiry — ${c.name}${productLabel ? ` · ${productLabel}` : ""}`,
    html,
    text,
  });
}

/* ─────────────────────────────────────────────────────────
   One-time password email for gated document downloads
───────────────────────────────────────────────────────── */

export async function sendOtpEmail(email: string, code: string): Promise<void> {
  const transport = getTransport();
  const from = fromHeader();

  const spaced = code.split("").join("&nbsp;&nbsp;");
  const html = shell(
    `
    <h1 style="margin:0 0 6px;font-size:22px;color:#171717;font-weight:800;">Your verification code</h1>
    <p style="margin:0 0 22px;color:#737373;font-size:14px;line-height:1.6;">
      Use the one-time code below to unlock and download Gulf-O-Flex<sup>&reg;</sup> certificates and technical documents.
    </p>
    <div style="margin:0 0 22px;padding:22px;background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;text-align:center;">
      <div style="font-size:34px;font-weight:800;letter-spacing:6px;color:#9a3412;font-family:'Courier New',monospace;">
        ${spaced}
      </div>
    </div>
    <p style="margin:0 0 6px;color:#737373;font-size:13px;line-height:1.6;">
      This code expires in <strong>10 minutes</strong> and can be used once.
    </p>
    <p style="margin:0;color:#a3a3a3;font-size:12px;line-height:1.6;">
      If you did not request this, you can safely ignore this email.
    </p>
  `,
    "Secure Document Download"
  );

  const text = `Your Gulf-O-Flex verification code is: ${code}

Use this one-time code to unlock and download certificates and technical documents.
It expires in 10 minutes and can be used once.

If you did not request this, you can safely ignore this email.`;

  await transport.sendMail({
    from,
    to: email,
    subject: `${code} is your Gulf-O-Flex download code`,
    html,
    text,
  });
}
