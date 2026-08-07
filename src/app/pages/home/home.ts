import { Component } from '@angular/core';
import { Doces } from '../../sections/doces/doces';
import { Salgados } from '../../sections/salgados/salgados';
import { Folheados } from '../../sections/folheados/folheados';
import { Cafes } from '../../sections/cafes/cafes';

@Component({
  selector: 'app-home',
  imports: [Doces, Salgados, Folheados, Cafes],
  templateUrl: './home.html',
})
export class Home {}
