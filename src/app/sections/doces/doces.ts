import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuSubsection } from '../../shared/menu-subsection/menu-subsection';
import { bolos } from './bolos';
import { docinhos } from './docinhos';
import { tortas } from './tortas';
import { biscoitos } from './biscoitos';
import { donuts } from './donuts';
import { sonhos } from './sonhos';

@Component({
  selector: 'app-doces',
  imports: [MatIconModule, MenuSubsection],
  templateUrl: './doces.html',
  styleUrl: './doces.scss',
})
export class Doces {
  protected readonly bolos = bolos;
  protected readonly docinhos = docinhos;
  protected readonly tortas = tortas;
  protected readonly biscoitos = biscoitos;
  protected readonly donuts = donuts;
  protected readonly sonhos = sonhos;
}
