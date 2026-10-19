import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Nav } from '../nav/nav';
import { Cart } from '../../shared/cart';
import { Theme } from '../../shared/theme';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
    Nav,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly title = 'Padaria';
  protected readonly isDark = computed(() => this.theme.scheme() === 'dark');

  constructor(
    protected readonly cart: Cart,
    protected readonly theme: Theme,
  ) {}
}
