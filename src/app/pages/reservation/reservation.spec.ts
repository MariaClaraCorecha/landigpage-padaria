import { TestBed } from '@angular/core/testing';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BrDateAdapter } from '../../shared/br-date-adapter';
import { Reservations, availableTimes } from '../../shared/reservations';
import { ReservationPage } from './reservation';

function tomorrow(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

describe('ReservationPage', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [ReservationPage],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        provideNativeDateAdapter(),
        { provide: DateAdapter, useClass: BrDateAdapter },
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
      ],
    });
  });

  async function fillAndSubmit(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(ReservationPage);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const type = (name: string, value: string) => {
      const input = element.querySelector<HTMLInputElement>(`[formcontrolname="${name}"]`)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
    };

    const date = tomorrow();
    type('name', 'Ana Souza');
    type('phone', '(11) 98765-4321');
    type('date', date.toLocaleDateString('pt-BR'));
    // mat-select has no native input; set the time on the control directly.
    fixture.componentInstance['form'].controls.time.setValue(availableTimes(date)[0]);
    await fixture.whenStable();

    element.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();
    return element;
  }

  it('registra a reserva ao enviar o formulário', async () => {
    const element = await fillAndSubmit();

    expect(element.querySelector('.confirmation')).not.toBeNull();
    expect(TestBed.inject(Reservations).upcoming()).toHaveLength(1);
  });

  it('registra mesmo com reservas antigas inválidas no localStorage', async () => {
    localStorage.setItem('padaria:reservations', JSON.stringify([null, { name: 'x' }]));

    const element = await fillAndSubmit();

    expect(element.querySelector('.confirmation')).not.toBeNull();
    expect(element.querySelectorAll('.booking')).toHaveLength(1);
  });
});
