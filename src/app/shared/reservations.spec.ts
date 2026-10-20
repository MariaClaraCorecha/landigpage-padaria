import { TestBed } from '@angular/core/testing';
import {
  ReservationRequest,
  Reservations,
  availableTimes,
  formatPhone,
  toIsoDate,
} from './reservations';

// Segunda-feira, 19/10/2026, 10:10.
const monday = new Date(2026, 9, 19, 10, 10);

function request(overrides: Partial<ReservationRequest> = {}): ReservationRequest {
  return {
    name: '  Ana Souza ',
    phone: '11987654321',
    date: new Date(2099, 0, 5),
    time: '09:00',
    guests: 4,
    area: 'varanda',
    notes: ' Aniversário ',
    ...overrides,
  };
}

describe('availableTimes', () => {
  it('oferece horários de 30 em 30 minutos até 1h antes de fechar', () => {
    const times = availableTimes(new Date(2026, 9, 20), monday);

    expect(times[0]).toBe('07:00');
    expect(times[1]).toBe('07:30');
    expect(times.at(-1)).toBe('19:00');
  });

  it('fecha mais cedo aos domingos', () => {
    const sunday = new Date(2026, 9, 25);

    expect(availableTimes(sunday, monday).at(-1)).toBe('12:00');
  });

  it('no dia de hoje só oferece horários com 30 minutos de antecedência', () => {
    expect(availableTimes(monday, monday)[0]).toBe('11:00');
  });

  it('não oferece horários no passado nem além de 30 dias', () => {
    expect(availableTimes(new Date(2026, 9, 18), monday)).toEqual([]);
    expect(availableTimes(new Date(2026, 10, 19), monday)).toEqual([]);
  });

  it('não oferece horários quando o dia já encerrou', () => {
    const lateNight = new Date(2026, 9, 19, 19, 0);

    expect(availableTimes(lateNight, lateNight)).toEqual([]);
  });
});

describe('formatPhone', () => {
  it('formata celulares e fixos com DDD', () => {
    expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
    expect(formatPhone('(11) 3456 7890')).toBe('(11) 3456-7890');
  });
});

describe('toIsoDate', () => {
  it('usa o dia local, sem deslocamento de fuso', () => {
    expect(toIsoDate(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
  });
});

describe('Reservations', () => {
  let reservations: Reservations;

  beforeEach(() => {
    localStorage.clear();
    reservations = TestBed.inject(Reservations);
  });

  it('cria a reserva com código e dados normalizados', () => {
    const reservation = reservations.book(request());

    expect(reservation.code).toMatch(/^\d{4}$/);
    expect(reservation.name).toBe('Ana Souza');
    expect(reservation.phone).toBe('(11) 98765-4321');
    expect(reservation.notes).toBe('Aniversário');
    expect(reservation.date).toBe('2099-01-05');
    expect(reservations.upcoming()).toEqual([reservation]);
  });

  it('lista as próximas reservas em ordem cronológica', () => {
    const later = reservations.book(request({ date: new Date(2099, 0, 6) }));
    const sooner = reservations.book(request({ time: '08:00' }));

    expect(reservations.upcoming()).toEqual([sooner, later]);
  });

  it('esconde reservas que já passaram', () => {
    reservations.book(request({ date: new Date(2020, 0, 1) }));

    expect(reservations.upcoming()).toEqual([]);
  });

  it('cancela e desfaz o cancelamento', () => {
    const reservation = reservations.book(request());

    reservations.cancel(reservation);
    expect(reservations.upcoming()).toEqual([]);

    reservations.restore(reservation);
    reservations.restore(reservation);
    expect(reservations.upcoming()).toEqual([reservation]);
  });

  it('salva as reservas no localStorage e restaura ao recarregar', () => {
    reservations.book(request());
    TestBed.tick();

    TestBed.resetTestingModule();
    const reloaded = TestBed.inject(Reservations);

    expect(reloaded.upcoming()).toHaveLength(1);
    expect(reloaded.upcoming()[0].name).toBe('Ana Souza');
  });

  it('ignora reservas salvas com formato inválido', () => {
    const valid = { ...request(), date: '2099-01-05', code: '1234' };
    localStorage.setItem(
      'padaria:reservations',
      JSON.stringify([null, { name: 'x' }, { ...valid, date: 5 }, valid]),
    );

    TestBed.resetTestingModule();
    const reloaded = TestBed.inject(Reservations);

    expect(reloaded.upcoming()).toEqual([valid]);
  });
});
