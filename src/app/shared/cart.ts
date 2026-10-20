import { Injectable, computed, effect, signal } from '@angular/core';
import { MenuItem } from './menu-item';

export type PriceType = 'whole' | 'slice';

export type Fulfillment = 'dine-in' | 'takeaway';

export const FULFILLMENT_LABELS: Record<Fulfillment, string> = {
  'dine-in': 'Comer no local',
  takeaway: 'Levar para casa',
};

export interface CartLine {
  item: MenuItem;
  priceType: PriceType;
  flavor?: string;
  quantity: number;
}

export interface OrderReceipt {
  orderNumber: string;
  date: Date;
  lines: CartLine[];
  total: number;
  fulfillment: Fulfillment;
  notes: string;
}

const STORAGE_KEY = 'padaria:cart';
const FULFILLMENT_KEY = 'padaria:fulfillment';

export function parseBrlPrice(price: string): number {
  const numeric = price.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(numeric) || 0;
}

function loadLines(): CartLine[] {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function loadFulfillment(): Fulfillment {
  try {
    return localStorage.getItem(FULFILLMENT_KEY) === 'dine-in' ? 'dine-in' : 'takeaway';
  } catch {
    return 'takeaway';
  }
}

@Injectable({ providedIn: 'root' })
export class Cart {
  private readonly lines = signal<CartLine[]>(loadLines());

  readonly fulfillment = signal<Fulfillment>(loadFulfillment());

  readonly notes = signal('');

  constructor() {
    effect(() => {
      const lines = this.lines();
      const fulfillment = this.fulfillment();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
        localStorage.setItem(FULFILLMENT_KEY, fulfillment);
      } catch {}
    });
  }

  readonly items = this.lines.asReadonly();

  readonly itemCount = computed(() => this.lines().reduce((sum, line) => sum + line.quantity, 0));

  readonly total = computed(() =>
    this.lines().reduce((sum, line) => sum + this.unitPrice(line) * line.quantity, 0),
  );

  unitPrice(line: CartLine): number {
    const price = line.priceType === 'whole' ? line.item.priceWhole : line.item.priceSlice;
    return parseBrlPrice(price ?? line.item.priceWhole);
  }

  add(item: MenuItem, priceType: PriceType, flavor?: string): void {
    this.lines.update((lines) => {
      const existing = lines.find(
        (line) =>
          line.item.name === item.name && line.priceType === priceType && line.flavor === flavor,
      );
      if (existing) {
        return lines.map((line) =>
          line === existing ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...lines, { item, priceType, flavor, quantity: 1 }];
    });
  }

  updateQuantity(line: CartLine, quantity: number): void {
    if (quantity <= 0) {
      this.remove(line);
      return;
    }
    this.lines.update((lines) => lines.map((l) => (l === line ? { ...l, quantity } : l)));
  }

  remove(line: CartLine): void {
    this.lines.update((lines) => lines.filter((l) => l !== line));
  }

  clear(): void {
    this.lines.set([]);
  }

  checkout(): OrderReceipt {
    const receipt: OrderReceipt = {
      orderNumber: Math.floor(1000 + Math.random() * 9000).toString(),
      date: new Date(),
      lines: this.lines(),
      total: this.total(),
      fulfillment: this.fulfillment(),
      notes: this.notes().trim(),
    };
    this.clear();
    this.notes.set('');
    return receipt;
  }
}
