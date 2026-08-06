import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly item = input.required<MenuItem>();
}
