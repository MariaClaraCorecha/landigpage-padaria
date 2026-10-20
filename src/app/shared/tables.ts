import type { SeatingArea } from './reservations';

export type TableShape = 'round' | 'square' | 'rect' | 'booth';

export interface DiningTable {
  number: number;
  area: SeatingArea;
  seats: number;
  shape: TableShape;
  description: string;
  x: number;
  y: number;
  width: number;
  ratio: number;
}

export const TABLES: readonly DiningTable[] = [
  {
    number: 1,
    area: 'salao',
    seats: 4,
    shape: 'booth',
    description: 'Sofá junto à parede',
    x: 13,
    y: 34,
    width: 14,
    ratio: 1.6,
  },
  {
    number: 2,
    area: 'salao',
    seats: 4,
    shape: 'booth',
    description: 'Sofá junto à parede',
    x: 13,
    y: 58,
    width: 14,
    ratio: 1.6,
  },
  {
    number: 3,
    area: 'salao',
    seats: 4,
    shape: 'booth',
    description: 'Sofá junto à parede',
    x: 13,
    y: 82,
    width: 14,
    ratio: 1.6,
  },
  {
    number: 4,
    area: 'salao',
    seats: 2,
    shape: 'round',
    description: 'Perto do balcão',
    x: 37,
    y: 38,
    width: 10,
    ratio: 1,
  },
  {
    number: 5,
    area: 'salao',
    seats: 2,
    shape: 'round',
    description: 'Centro do salão',
    x: 37,
    y: 66,
    width: 10,
    ratio: 1,
  },
  {
    number: 6,
    area: 'salao',
    seats: 4,
    shape: 'square',
    description: 'Centro do salão',
    x: 57,
    y: 38,
    width: 11,
    ratio: 1,
  },
  {
    number: 7,
    area: 'salao',
    seats: 4,
    shape: 'square',
    description: 'Perto da entrada',
    x: 57,
    y: 66,
    width: 11,
    ratio: 1,
  },
  {
    number: 8,
    area: 'salao',
    seats: 6,
    shape: 'rect',
    description: 'Junto à janela',
    x: 84,
    y: 27,
    width: 11,
    ratio: 0.55,
  },
  {
    number: 9,
    area: 'salao',
    seats: 10,
    shape: 'rect',
    description: 'Mesa comunitária junto à janela',
    x: 84,
    y: 68,
    width: 12,
    ratio: 0.4,
  },
  {
    number: 10,
    area: 'varanda',
    seats: 2,
    shape: 'round',
    description: 'Bistrô ao lado das plantas',
    x: 15,
    y: 34,
    width: 10,
    ratio: 1,
  },
  {
    number: 11,
    area: 'varanda',
    seats: 2,
    shape: 'round',
    description: 'Bistrô ao lado das plantas',
    x: 15,
    y: 66,
    width: 10,
    ratio: 1,
  },
  {
    number: 12,
    area: 'varanda',
    seats: 4,
    shape: 'round',
    description: 'Sob o ombrelone',
    x: 37,
    y: 34,
    width: 13,
    ratio: 1,
  },
  {
    number: 13,
    area: 'varanda',
    seats: 4,
    shape: 'round',
    description: 'Sob o ombrelone',
    x: 37,
    y: 66,
    width: 13,
    ratio: 1,
  },
  {
    number: 14,
    area: 'varanda',
    seats: 4,
    shape: 'square',
    description: 'Vista para o jardim',
    x: 59,
    y: 34,
    width: 11,
    ratio: 1,
  },
  {
    number: 15,
    area: 'varanda',
    seats: 4,
    shape: 'square',
    description: 'Vista para o jardim',
    x: 59,
    y: 66,
    width: 11,
    ratio: 1,
  },
  {
    number: 16,
    area: 'varanda',
    seats: 10,
    shape: 'rect',
    description: 'Mesão para grupos',
    x: 84,
    y: 50,
    width: 12,
    ratio: 0.4,
  },
];

export function tablesIn(area: SeatingArea): DiningTable[] {
  return TABLES.filter((table) => table.area === area);
}

export function findTable(number: number | null | undefined): DiningTable | undefined {
  return TABLES.find((table) => table.number === number);
}

export type TableFit = 'ok' | 'small' | 'large';

export function tableFit(table: DiningTable, guests: number): TableFit {
  if (table.seats < guests) return 'small';
  return table.seats > Math.max(guests * 2, 4) ? 'large' : 'ok';
}
