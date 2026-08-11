import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuSubsection } from '../../shared/menu-subsection/menu-subsection';
import { lanches } from './lanches';

@Component({
  selector: 'app-salgados',
  imports: [MatIconModule, MenuSubsection],
  templateUrl: './salgados.html',
  styleUrl: './salgados.scss',
})
export class Salgados {
  protected readonly lanches = lanches;
}
