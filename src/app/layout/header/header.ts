import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { Nav } from '../nav/nav';
import { Cart } from '../../shared/cart';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,
     MatIconModule, MatBadgeModule,
     MatButtonModule, RouterLink, Nav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly title = 'Padaria';

  constructor(protected readonly cart: Cart) {}
}
