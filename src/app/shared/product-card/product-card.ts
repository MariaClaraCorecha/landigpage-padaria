import { Component, computed, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MenuItem } from '../menu-item';
import { Cart, PriceType } from '../cart';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly item = input.required<MenuItem>();

  readonly wholeLabel = computed(() => this.item().priceWholeLabel ?? 'Inteiro');
  readonly sliceLabel = computed(() => this.item().priceSliceLabel ?? 'Fatia');

  private readonly chosenFlavor = signal<string | undefined>(undefined);
  readonly selectedFlavor = computed(() => this.chosenFlavor() ?? this.item().flavors?.[0]);

  constructor(private readonly cart: Cart) {}

  selectFlavor(flavor: string): void {
    this.chosenFlavor.set(flavor);
  }

  addToCart(priceType: PriceType): void {
    this.cart.add(this.item(), priceType, this.selectedFlavor());
  }
}
