import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Highlight {
  value: string;
  label: string;
}

@Component({
  selector: 'app-hero',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly highlights: Highlight[] = [
    { value: '80+', label: 'produtos no cardápio' },
    { value: '6', label: 'categorias' },
    { value: '100%', label: 'artesanal' },
  ];
}
