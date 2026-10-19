import { Component } from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { Panificacao } from '../../sections/panificacao/panificacao';
import { Doces } from '../../sections/doces/doces';
import { Salgados } from '../../sections/salgados/salgados';
import { Folheados } from '../../sections/folheados/folheados';
import { Cafes } from '../../sections/cafes/cafes';
import { Bebidas } from '../../sections/bebidas/bebidas';

@Component({
  selector: 'app-home',
  imports: [Hero, Panificacao, Doces, Salgados, Folheados, Cafes, Bebidas],
  templateUrl: './home.html',
})
export class Home {}
