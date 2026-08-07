import { Injectable, computed, signal } from '@angular/core';
import { MenuItem } from './menu-item';

export type PriceType = 'whole' | 'slice';

export interface CartLine {
  item: MenuItem;
  priceType: PriceType;
  quantity: number;
}

function parseBrlPrice(price: string): number {
  const numeric = price.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(numeric) || 0;
}

@Injectable({ providedIn: 'root' })
export class Cart {
  private readonly lines = signal<CartLine[]>([]);

  readonly items = this.lines.asReadonly();

  readonly itemCount = computed(() =>
    this.lines().reduce((sum, line) => sum + line.quantity, 0),
  );

  readonly total = computed(() =>
    this.lines().reduce((sum, line) => sum + this.unitPrice(line) * line.quantity, 0),
  );

  unitPrice(line: CartLine): number {
    return parseBrlPrice(line.priceType === 'whole' ? line.item.priceWhole : line.item.priceSlice);
  }

  add(item: MenuItem, priceType: PriceType): void {
    this.lines.update((lines) => {
      const existing = lines.find((line) => line.item.name === item.name && line.priceType === priceType);
      if (existing) {
        return lines.map((line) =>
          line === existing ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...lines, { item, priceType, quantity: 1 }];
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
}
