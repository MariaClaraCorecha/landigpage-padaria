import { SEATING_AREA_LABELS, SeatingArea } from './reservations';
import { TABLES, findTable, tableFit, tablesIn } from './tables';

describe('TABLES', () => {
  it('numera as mesas sem repetir', () => {
    const numbers = TABLES.map((table) => table.number);

    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it('tem layouts diferentes para salão e varanda', () => {
    const shapes = (area: SeatingArea) => tablesIn(area).map((table) => table.shape);

    expect(shapes('salao')).toContain('booth');
    expect(shapes('varanda')).not.toContain('booth');
  });

  it('acomoda grupos de 1 a 10 pessoas em qualquer área', () => {
    for (const area of Object.keys(SEATING_AREA_LABELS) as SeatingArea[]) {
      for (let guests = 1; guests <= 10; guests++) {
        expect(tablesIn(area).some((table) => tableFit(table, guests) === 'ok')).toBe(true);
      }
    }
  });
});

describe('tableFit', () => {
  const twoSeats = findTable(4)!;
  const communal = findTable(9)!;

  it('recusa mesas pequenas demais', () => {
    expect(tableFit(twoSeats, 3)).toBe('small');
  });

  it('guarda as mesas grandes para grupos', () => {
    expect(tableFit(communal, 2)).toBe('large');
    expect(tableFit(communal, 8)).toBe('ok');
  });
});
