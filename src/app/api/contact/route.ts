import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* POST /api/contact → send a contact enquiry email to the team */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const company = String(body.company ?? "").trim();
  const product = String(body.product ?? "").trim();
  const message = String(body.message ?? "").trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
  }
  if (!emailOk) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!message || message.length < 5) {
    return NextResponse.json({ error: "Please write a short message." }, { status: 400 });
  }

  try {
    await sendContactEmail({ name, email, phone, company, product, message });
  } catch (err) {
    // Surface the real reason in the server logs (pm2 logs gfa) so SMTP/env
    // problems can be diagnosed on the live server.
    const detail =
      err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    console.error("[contact] email send failed:", detail, err);
    return NextResponse.json(
      { error: "Sorry, we couldn't send your message right now. Please try again or email info@gulfoflex.com directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
