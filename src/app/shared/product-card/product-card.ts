import { Component, computed, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem } from '../menu-item';
import { Cart, PriceType } from '../cart';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly item = input.required<MenuItem>();

  readonly wholeLabel = computed(() => this.item().priceWholeLabel ?? 'Inteiro');
  readonly sliceLabel = computed(() => this.item().priceSliceLabel ?? 'Fatia');
  readonly isMultiFlavor = computed(() => (this.item().flavorLimit ?? 1) > 1);

  private readonly chosenFlavor = signal<string | undefined>(undefined);
  readonly selectedFlavor = computed(() => this.chosenFlavor() ?? this.item().flavors?.[0]);

  private readonly chosenFlavors = signal<string[]>([]);
  readonly selectedFlavors = this.chosenFlavors.asReadonly();
  readonly selectedFlavorsLabel = computed(() => this.chosenFlavors().join(', '));

  constructor(
    private readonly cart: Cart,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  selectFlavor(flavor: string): void {
    this.chosenFlavor.set(flavor);
  }

  toggleFlavor(flavor: string): void {
    const limit = this.item().flavorLimit ?? 1;
    this.chosenFlavors.update((flavors) => {
      if (flavors.includes(flavor)) {
        return flavors.filter((f) => f !== flavor);
      }
      if (flavors.length >= limit) {
        return flavors;
      }
      return [...flavors, flavor];
    });
  }

  addToCart(priceType: PriceType): void {
    const flavor = this.isMultiFlavor() ? this.selectedFlavorsLabel() || undefined : this.selectedFlavor();
    this.cart.add(this.item(), priceType, flavor);
    const ref = this.snackBar.open(`${this.item().name} adicionado à cestinha`, 'Ver cestinha', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['app-snackbar'],
    });
    ref.onAction().subscribe(() => this.router.navigate(['/perfil']));
  }
}
