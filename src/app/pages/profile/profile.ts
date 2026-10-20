import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cart, CartLine, FULFILLMENT_LABELS, Fulfillment, OrderReceipt } from '../../shared/cart';

const NOTES_MAX_LENGTH = 200;

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly receipt = signal<OrderReceipt | null>(null);
  protected readonly fulfillmentLabels = FULFILLMENT_LABELS;
  protected readonly notesMaxLength = NOTES_MAX_LENGTH;

  constructor(protected readonly cart: Cart) {}

  subtotal(line: CartLine): number {
    return this.cart.unitPrice(line) * line.quantity;
  }

  variantLabel(line: CartLine): string {
    return line.priceType === 'whole'
      ? (line.item.priceWholeLabel ?? 'Inteiro')
      : (line.item.priceSliceLabel ?? 'Fatia');
  }

  increment(line: CartLine): void {
    this.cart.updateQuantity(line, line.quantity + 1);
  }

  decrement(line: CartLine): void {
    this.cart.updateQuantity(line, line.quantity - 1);
  }

  setFulfillment(fulfillment: Fulfillment): void {
    this.cart.fulfillment.set(fulfillment);
  }

  setNotes(event: Event): void {
    this.cart.notes.set((event.target as HTMLTextAreaElement).value);
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
