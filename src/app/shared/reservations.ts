import { Injectable, computed, effect, signal } from '@angular/core';

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
  notes: string;
}

export interface Reservation extends Omit<ReservationRequest, 'date'> {
  code: string;
  date: string;
}

const STORAGE_KEY = 'padaria:reservations';

export const SLOT_MINUTES = 30;
export const MAX_ADVANCE_DAYS = 30;
const MIN_NOTICE_MINUTES = 30;
const LAST_SEATING_MINUTES = 60;
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

function loadReservations(): Reservation[] {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(stored) ? stored : [];
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
