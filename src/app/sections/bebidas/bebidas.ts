import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuSubsection } from '../../shared/menu-subsection/menu-subsection';
import { geladas } from './geladas';
import { drinks } from './drinks';

@Component({
  selector: 'app-bebidas',
  imports: [MatIconModule, MenuSubsection],
  templateUrl: './bebidas.html',
  styleUrl: './bebidas.scss',
})
export class Bebidas {
  protected readonly geladas = geladas;
  protected readonly drinks = drinks;
}
