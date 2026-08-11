import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuSubsection } from '../../shared/menu-subsection/menu-subsection';
import { paesdodia } from './paesdodia';
import { paesespeciais } from './paesespeciais';

@Component({
  selector: 'app-panificacao',
  imports: [MatIconModule, MenuSubsection],
  templateUrl: './panificacao.html',
  styleUrl: './panificacao.scss',
})
export class Panificacao {
  protected readonly paesdodia = paesdodia;
  protected readonly paesespeciais = paesespeciais;
}
