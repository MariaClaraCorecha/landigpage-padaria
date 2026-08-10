import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuSubsection } from '../../shared/menu-subsection/menu-subsection';
import { bebidas } from './bebidas';

@Component({
  selector: 'app-cafes',
  imports: [MatIconModule, MenuSubsection],
  templateUrl: './cafes.html',
  styleUrl: './cafes.scss',
})
export class Cafes {
  protected readonly bebidas = bebidas;
}
