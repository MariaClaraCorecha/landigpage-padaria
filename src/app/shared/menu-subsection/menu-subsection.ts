import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductCard } from '../product-card/product-card';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'app-menu-subsection',
  imports: [MatIconModule, ProductCard],
  templateUrl: './menu-subsection.html',
  styleUrl: './menu-subsection.scss',
})
export class MenuSubsection {
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly items = input.required<MenuItem[]>();
}
