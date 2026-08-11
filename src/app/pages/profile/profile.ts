import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cart, CartLine, OrderReceipt } from '../../shared/cart';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly receipt = signal<OrderReceipt | null>(null);

  constructor(protected readonly cart: Cart) {}

  subtotal(line: CartLine): number {
    return this.cart.unitPrice(line) * line.quantity;
  }

  variantLabel(line: CartLine): string {
    return line.priceType === 'whole'
      ? line.item.priceWholeLabel ?? 'Inteiro'
      : line.item.priceSliceLabel ?? 'Fatia';
  }

  increment(line: CartLine): void {
    this.cart.updateQuantity(line, line.quantity + 1);
  }

  decrement(line: CartLine): void {
    this.cart.updateQuantity(line, line.quantity - 1);
  }

  checkout(): void {
    this.receipt.set(this.cart.checkout());
  }

  newOrder(): void {
    this.receipt.set(null);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatDate(date: Date): string {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
