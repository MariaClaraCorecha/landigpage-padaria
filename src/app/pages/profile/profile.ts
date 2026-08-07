import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cart, CartLine } from '../../shared/cart';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
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

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
