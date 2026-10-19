import { ChangeDetectionStrategy, Component, DOCUMENT, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface NavLink {
  href: string;
  label: string;
  icon: string;
}

// Distance from the viewport top at which a section counts as "current" (sticky header height + slack).
const ACTIVE_OFFSET = 140;

@Component({
  selector: 'app-nav',
  imports: [MatIconModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
})
export class Nav {
  private readonly document = inject(DOCUMENT);
  private frame = 0;

  protected readonly links: NavLink[] = [
    { href: '#panificacao', label: 'Panificação', icon: 'bakery_dining' },
    { href: '#doces', label: 'Doces', icon: 'icecream' },
    { href: '#salgados', label: 'Salgados', icon: 'lunch_dining' },
    { href: '#folheados', label: 'Folheados', icon: 'bakery_dining' },
    { href: '#cafes', label: 'Cafés', icon: 'coffee' },
    { href: '#bebidas', label: 'Bebidas', icon: 'local_drink' },
  ];

  protected readonly active = signal<string | null>(null);

  protected onScroll(): void {
    // Measure at most once per frame so scrolling stays smooth.
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.active.set(this.findActive());
    });
  }

  private findActive(): string | null {
    let current: string | null = null;
    for (const link of this.links) {
      const section = this.document.getElementById(link.href.slice(1));
      if (section && section.getBoundingClientRect().top <= ACTIVE_OFFSET) {
        current = link.href;
      }
    }
    return current;
  }
}
