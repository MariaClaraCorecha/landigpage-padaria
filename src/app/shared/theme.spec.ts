import { TestBed } from '@angular/core/testing';
import { Theme } from './theme';

describe('Theme', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
  });

  it('usa o tema salvo anteriormente', () => {
    localStorage.setItem('padaria:theme', 'dark');

    const theme = TestBed.inject(Theme);
    TestBed.tick();

    expect(theme.scheme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('alterna entre claro e escuro e salva a escolha', () => {
    localStorage.setItem('padaria:theme', 'light');
    const theme = TestBed.inject(Theme);

    theme.toggle();
    TestBed.tick();

    expect(theme.scheme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('padaria:theme')).toBe('dark');
  });
});
