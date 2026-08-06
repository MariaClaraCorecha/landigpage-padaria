import { Component } from '@angular/core';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Doces } from './sections/doces/doces';
import { Salgados } from './sections/salgados/salgados';
import { Folheados } from './sections/folheados/folheados';
import { Cafes } from './sections/cafes/cafes';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Doces, Salgados, Folheados, Cafes],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
