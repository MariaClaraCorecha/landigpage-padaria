import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SeatingArea } from '../../../shared/reservations';
import { DiningTable, TABLES, tableFit, tablesIn } from '../../../shared/tables';

export type TableStatus = 'free' | 'selected' | 'taken' | 'small' | 'large' | 'locked';

interface Chair {
  left: string;
  top: string;
}

const CHAIR_GAP = '1.7cqi';

function chairsFor(table: DiningTable): Chair[] {
  if (table.shape === 'booth') return [];
  if (table.shape === 'rect') {
    const perSide = table.seats / 2;
    const along = (i: number) => `${((i % perSide) + 0.5) * (100 / perSide)}%`;
    const side = (i: number) =>
      i < perSide ? `calc(0% - ${CHAIR_GAP})` : `calc(100% + ${CHAIR_GAP})`;
    return Array.from({ length: table.seats }, (_, i) =>
      table.ratio < 1 ? { left: side(i), top: along(i) } : { left: along(i), top: side(i) },
    );
  }
  return Array.from({ length: table.seats }, (_, i) => {
    const angle = (i * 2 * Math.PI) / table.seats;
    const radius = `(50% + ${CHAIR_GAP})`;
    return {
      left: `calc(50% + ${radius} * ${Math.cos(angle).toFixed(3)})`,
      top: `calc(50% + ${radius} * ${Math.sin(angle).toFixed(3)})`,
    };
  });
}

interface Decor {
  kind: 'plant' | 'shade';
  icon: string;
  x: number;
  y: number;
}

const DECOR: Record<SeatingArea, Decor[]> = {
  salao: [
    { kind: 'plant', icon: 'potted_plant', x: 30, y: 91 },
    { kind: 'plant', icon: 'potted_plant', x: 70, y: 91 },
  ],
  varanda: [
    { kind: 'shade', icon: '', x: 37, y: 34 },
    { kind: 'shade', icon: '', x: 37, y: 66 },
    { kind: 'plant', icon: 'potted_plant', x: 5, y: 9 },
    { kind: 'plant', icon: 'local_florist', x: 5, y: 50 },
    { kind: 'plant', icon: 'potted_plant', x: 5, y: 91 },
    { kind: 'plant', icon: 'potted_plant', x: 95, y: 9 },
    { kind: 'plant', icon: 'potted_plant', x: 95, y: 91 },
  ],
};

const CHAIRS = new Map(TABLES.map((table) => [table.number, chairsFor(table)]));

@Component({
  selector: 'app-table-map',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './table-map.html',
  styleUrl: './table-map.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TableMap), multi: true }],
})
export class TableMap implements ControlValueAccessor {
  readonly area = input.required<SeatingArea>();
  readonly guests = input(2);
  readonly taken = input<ReadonlySet<number>>(new Set());
  readonly locked = input(false);

  protected readonly value = signal<number | null>(null);
  private readonly disabled = signal(false);
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly decor = computed(() => DECOR[this.area()]);

  protected readonly spots = computed(() =>
    tablesIn(this.area()).map((table) => ({
      table,
      chairs: CHAIRS.get(table.number)!,
      status: this.statusOf(table),
    })),
  );

  protected readonly selected = computed(() =>
    this.spots().find((spot) => spot.status === 'selected'),
  );

  writeValue(value: number | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  protected select(table: DiningTable, status: TableStatus): void {
    if (status !== 'free') return;
    this.value.set(table.number);
    this.onChange(table.number);
    this.onTouched();
  }

  protected describe(table: DiningTable, status: TableStatus): string {
    const name = `Mesa ${table.number}`;
    switch (status) {
      case 'taken':
        return `${name} · Ocupada neste horário`;
      case 'small':
        return `${name} · Só até ${table.seats} pessoas`;
      case 'large':
        return `${name} · Reservada para grupos maiores`;
      default:
        return `${name} · ${table.seats} lugares · ${table.description}`;
    }
  }

  private statusOf(table: DiningTable): TableStatus {
    if (this.locked() || this.disabled()) return 'locked';
    if (this.value() === table.number) return 'selected';
    if (this.taken().has(table.number)) return 'taken';
    const fit = tableFit(table, this.guests());
    return fit === 'ok' ? 'free' : fit;
  }
}
