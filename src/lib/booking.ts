import fs from "fs";
import path from "path";
import crypto from "crypto";

/* ─────────────────────────────────────────────────────────
   Experience Centre — slot booking (file-based storage)
   Working days: Monday–Saturday
   Hours: 09:00–18:00 GST · nine 1-hour slots
───────────────────────────────────────────────────────── */

export const SLOT_TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

export type SlotTime = (typeof SLOT_TIMES)[number];

export type Booking = {
  id: string;
  date: string; // YYYY-MM-DD
  slot: string; // HH:mm (start time)
  name: string;
  email: string;
  phone: string;
  company: string;
  visitors: number;
  purpose: string;
  createdAt: string; // ISO
};

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

function ensureStore(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(BOOKINGS_FILE)) fs.writeFileSync(BOOKINGS_FILE, "[]", "utf8");
}

export function readBookings(): Booking[] {
  ensureStore();
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch {
    return [];
  }
}

function writeBookings(bookings: Booking[]): void {
  ensureStore();
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf8");
}

/** Slot start-times already booked for a given YYYY-MM-DD date. */
export function getBookedSlots(date: string): string[] {
  return readBookings()
    .filter((b) => b.date === date)
    .map((b) => b.slot);
}

export function isValidDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return false;
  // Closed on Sundays (day 0)
  return d.getDay() !== 0;
}

export function isValidSlot(slot: string): slot is SlotTime {
  return (SLOT_TIMES as readonly string[]).includes(slot);
}

/**
 * Atomically (for a single-process server) reserve a slot.
 * Returns the created booking, or null if the slot was already taken.
 */
export function reserveSlot(
  input: Omit<Booking, "id" | "createdAt">
): Booking | null {
  const bookings = readBookings();
  const clash = bookings.some(
    (b) => b.date === input.date && b.slot === input.slot
  );
  if (clash) return null;

  const booking: Booking = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  writeBookings(bookings);
  return booking;
}

/** Human-friendly slot label, e.g. "09:00 – 10:00". */
export function slotLabel(slot: string): string {
  const idx = (SLOT_TIMES as readonly string[]).indexOf(slot);
  const startH = parseInt(slot.slice(0, 2), 10);
  const end = `${String(startH + 1).padStart(2, "0")}:00`;
  return idx === -1 ? slot : `${slot} – ${end}`;
}
