import { NextResponse } from "next/server";
import {
  getBookedSlots,
  isValidDate,
  isValidSlot,
  reserveSlot,
  SLOT_TIMES,
} from "@/lib/booking";
import { sendBookingEmails } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* GET /api/experience-booking?date=YYYY-MM-DD → availability for a date */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !isValidDate(date)) {
    return NextResponse.json(
      { error: "A valid working-day date (Mon–Sat) is required." },
      { status: 400 }
    );
  }

  const booked = getBookedSlots(date);
  const slots = SLOT_TIMES.map((slot) => ({
    slot,
    available: !booked.includes(slot),
  }));

  return NextResponse.json({ date, slots });
}

/* POST /api/experience-booking → reserve a slot + send emails */
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
  const purpose = String(body.purpose ?? "").trim();
  const date = String(body.date ?? "").trim();
  const slot = String(body.slot ?? "").trim();
  const visitors = Math.max(1, Math.min(50, Number(body.visitors) || 1));

  // Validation
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
  }
  if (!emailOk) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!phone || phone.length < 5) {
    return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
  }
  if (!isValidDate(date)) {
    return NextResponse.json(
      { error: "Please choose a valid working day (Mon–Sat)." },
      { status: 400 }
    );
  }
  if (!isValidSlot(slot)) {
    return NextResponse.json({ error: "Please choose a valid time slot." }, { status: 400 });
  }

  // Reject dates in the past
  const chosen = new Date(`${date}T${slot}:00`);
  if (chosen.getTime() < Date.now()) {
    return NextResponse.json(
      { error: "That slot is in the past. Please choose an upcoming time." },
      { status: 400 }
    );
  }

  // Reserve (file-based, blocks double-booking)
  const booking = reserveSlot({ name, email, phone, company, purpose, date, slot, visitors });
  if (!booking) {
    return NextResponse.json(
      { error: "Sorry, that slot has just been taken. Please pick another time." },
      { status: 409 }
    );
  }

  // Send notification + confirmation emails
  try {
    await sendBookingEmails(booking);
  } catch (err) {
    console.error("Booking email failed:", err);
    // Slot is reserved; inform the user their request is logged even if email lagged.
    return NextResponse.json(
      {
        ok: true,
        warning:
          "Your slot is reserved, but the confirmation email could not be sent. Our team will contact you shortly.",
        id: booking.id,
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true, id: booking.id }, { status: 200 });
}
