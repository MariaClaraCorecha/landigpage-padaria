import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

export type ColorScheme = 'light' | 'dark';

const STORAGE_KEY = 'padaria:theme';

function readStoredScheme(): ColorScheme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

function prefersDark(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
}

@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly document = inject(DOCUMENT);

  readonly scheme = signal<ColorScheme>(readStoredScheme() ?? (prefersDark() ? 'dark' : 'light'));

  constructor() {
    effect(() => {
      const scheme = this.scheme();
      this.document.documentElement.dataset['theme'] = scheme;
      try {
        localStorage.setItem(STORAGE_KEY, scheme);
      } catch {
      }
    });
  }

  toggle(): void {
    this.scheme.update((scheme) => (scheme === 'dark' ? 'light' : 'dark'));
  }
}
