import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuSubsection } from '../../shared/menu-subsection/menu-subsection';
import { doces } from './doces';
import { salgados } from './salgados';

@Component({
  selector: 'app-folheados',
  imports: [MatIconModule, MenuSubsection],
  templateUrl: './folheados.html',
  styleUrl: './folheados.scss',
})
export class Folheados {
  protected readonly doces = doces;
  protected readonly salgados = salgados;
}
