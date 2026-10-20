import { Injectable, computed, effect, signal } from '@angular/core';
import { TABLES } from './tables';

export type SeatingArea = 'salao' | 'varanda';

export const SEATING_AREA_LABELS: Record<SeatingArea, string> = {
  salao: 'Salão',
  varanda: 'Varanda',
};

export interface ReservationRequest {
  name: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  area: SeatingArea;
  table: number;
  notes: string;
}

export interface Reservation extends Omit<ReservationRequest, 'date' | 'table'> {
  code: string;
  date: string;
  table: number | null;
}

const STORAGE_KEY = 'padaria:reservations';

export const SLOT_MINUTES = 30;
export const MAX_ADVANCE_DAYS = 30;
const MIN_NOTICE_MINUTES = 30;
const LAST_SEATING_MINUTES = 60;
const STAY_MINUTES = 90;
const DEMO_BOOKING_RATE = 0.06;
const OPENING_HOURS: readonly [number, number][] = [
  [8 * 60, 13 * 60],
  [7 * 60, 20 * 60],
  [7 * 60, 20 * 60],
  [7 * 60, 20 * 60],
  [7 * 60, 20 * 60],
  [7 * 60, 20 * 60],
  [7 * 60, 20 * 60],
];

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function hash(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h = Math.imul(h ^ text.charCodeAt(i), 0x01000193);
  }
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 2 ** 32;
}

export function overlaps(a: string, b: string): boolean {
  return Math.abs(toMinutes(a) - toMinutes(b)) < STAY_MINUTES;
}

export function demoBookedTables(isoDate: string, time: string, tables: number[]): number[] {
  const start = toMinutes(time);
  return tables.filter((table) => {
    for (
      let slot = start - STAY_MINUTES + SLOT_MINUTES;
      slot < start + STAY_MINUTES;
      slot += SLOT_MINUTES
    ) {
      if (hash(`${isoDate}|${slot}|${table}`) < DEMO_BOOKING_RATE) return true;
    }
    return false;
  });
}

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fromIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const match = /^(\d{2})(\d{4,5})(\d{4})$/.exec(digits);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone.trim();
}

export function maxReservationDate(now = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + MAX_ADVANCE_DAYS);
}

export function availableTimes(date: Date, now = new Date()): string[] {
  const day = toIsoDate(date);
  const today = toIsoDate(now);
  if (day < today || date > maxReservationDate(now)) return [];

  const [opens, closes] = OPENING_HOURS[date.getDay()];
  const earliest =
    day === today ? now.getHours() * 60 + now.getMinutes() + MIN_NOTICE_MINUTES : opens;

  const times: string[] = [];
  for (let minutes = opens; minutes <= closes - LAST_SEATING_MINUTES; minutes += SLOT_MINUTES) {
    if (minutes >= earliest) times.push(`${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`);
  }
  return times;
}

function isReservation(value: unknown): value is Reservation {
  if (typeof value !== 'object' || value === null) return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r['code'] === 'string' &&
    typeof r['name'] === 'string' &&
    typeof r['phone'] === 'string' &&
    typeof r['date'] === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(r['date']) &&
    typeof r['time'] === 'string' &&
    /^\d{2}:\d{2}$/.test(r['time']) &&
    typeof r['guests'] === 'number' &&
    typeof r['area'] === 'string' &&
    r['area'] in SEATING_AREA_LABELS
  );
}

function loadReservations(): Reservation[] {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(stored)
      ? stored
          .filter(isReservation)
          .map((r) => ({ ...r, notes: r.notes ?? '', table: r.table ?? null }))
      : [];
  } catch {
    return [];
  }
}

function sortKey(reservation: Reservation): string {
  return `${reservation.date}T${reservation.time}`;
}

@Injectable({ providedIn: 'root' })
export class Reservations {
  private readonly all = signal<Reservation[]>(loadReservations());

  constructor() {
    effect(() => {
      const reservations = this.all();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
      } catch {}
    });
  }

  readonly upcoming = computed(() => {
    const now = new Date();
    const nowKey = `${toIsoDate(now)}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    return this.all()
      .filter((reservation) => sortKey(reservation) >= nowKey)
      .sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
  });

  takenTables(date: Date, time: string): Set<number> {
    const isoDate = toIsoDate(date);
    const taken = demoBookedTables(
      isoDate,
      time,
      TABLES.map((table) => table.number),
    );
    for (const reservation of this.all()) {
      if (
        reservation.table !== null &&
        reservation.date === isoDate &&
        overlaps(reservation.time, time)
      ) {
        taken.push(reservation.table);
      }
    }
    return new Set(taken);
  }

  book(request: ReservationRequest): Reservation {
    const reservation: Reservation = {
      ...request,
      name: request.name.trim(),
      phone: formatPhone(request.phone),
      notes: request.notes.trim(),
      date: toIsoDate(request.date),
      code: Math.floor(1000 + Math.random() * 9000).toString(),
    };
    this.all.update((reservations) => [...reservations, reservation]);
    return reservation;
  }

  cancel(reservation: Reservation): void {
    this.all.update((reservations) => reservations.filter((r) => r !== reservation));
  }

  restore(reservation: Reservation): void {
    this.all.update((reservations) =>
      reservations.includes(reservation) ? reservations : [...reservations, reservation],
    );
  }
}
