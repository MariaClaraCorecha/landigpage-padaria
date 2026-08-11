import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface NavLink {
  href: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-nav',
  imports: [MatIconModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  protected readonly links: NavLink[] = [
    { href: '#doces', label: 'Doces', icon: 'icecream' },
    { href: '#salgados', label: 'Salgados', icon: 'lunch_dining' },
    { href: '#folheados', label: 'Folheados', icon: 'bakery_dining' },
    { href: '#cafes', label: 'Cafés', icon: 'coffee' },
    { href: '#bebidas', label: 'Bebidas', icon: 'local_drink' },
  ];
}
