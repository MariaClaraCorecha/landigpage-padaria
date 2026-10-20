import { TestBed } from '@angular/core/testing';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrDateAdapter } from './br-date-adapter';

describe('BrDateAdapter', () => {
  let adapter: BrDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrDateAdapter, { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
    });
    adapter = TestBed.inject(BrDateAdapter);
  });

  it('lê datas digitadas como dia/mês/ano', () => {
    const date = adapter.parse('05/11/2026');

    expect(date).toEqual(new Date(2026, 10, 5));
  });

  it('rejeita datas que não existem', () => {
    const date = adapter.parse('31/02/2026');

    expect(date && adapter.isValid(date)).toBe(false);
  });

  it('mantém o comportamento padrão para outros valores', () => {
    expect(adapter.parse('')).toBeNull();
  });
});
