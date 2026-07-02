import { NextResponse } from "next/server";
import { isValidEmail, requestOtp, verifyOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* POST /api/download-otp
   Body: { action: "request", email }        → generate + email a 6-digit code
          { action: "verify",  email, code } → verify the code                */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const action = String(body.action ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (action === "request") {
    const result = requestOtp(email);
    if (!result.ok) {
      return NextResponse.json(
        { error: `Please wait ${result.retryAfter}s before requesting another code.`, retryAfter: result.retryAfter },
        { status: 429 }
      );
    }

    try {
      await sendOtpEmail(email, result.code);
    } catch (err) {
      console.error("OTP email failed:", err);
      return NextResponse.json(
        { error: "We couldn't send the code right now. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (action === "verify") {
    const code = String(body.code ?? "").trim();
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: "Enter the 6-digit code from your email." }, { status: 400 });
    }

    const result = verifyOtp(email, code);
    switch (result) {
      case "ok":
        return NextResponse.json({ ok: true }, { status: 200 });
      case "invalid":
        return NextResponse.json({ error: "That code is incorrect. Please try again." }, { status: 400 });
      case "expired":
        return NextResponse.json(
          { error: "This code has expired. Please request a new one.", expired: true },
          { status: 400 }
        );
      case "too_many":
        return NextResponse.json(
          { error: "Too many attempts. Please request a new code.", expired: true },
          { status: 429 }
        );
    }
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
