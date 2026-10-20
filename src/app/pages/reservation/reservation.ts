import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Reservation,
  Reservations,
  SEATING_AREA_LABELS,
  SeatingArea,
  availableTimes,
  fromIsoDate,
  maxReservationDate,
} from '../../shared/reservations';

const MAX_GUESTS = 10;
const NOTES_MAX_LENGTH = 200;

function phoneValidator(control: AbstractControl<string>): ValidationErrors | null {
  const digits = control.value.replace(/\D/g, '').length;
  return digits === 0 || digits === 10 || digits === 11 ? null : { phone: true };
}

@Component({
  selector: 'app-reservation',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss',
})
export class ReservationPage {
  private readonly fb = inject(FormBuilder);

  protected readonly guestOptions = Array.from({ length: MAX_GUESTS }, (_, i) => i + 1);
  protected readonly areas = Object.entries(SEATING_AREA_LABELS) as [SeatingArea, string][];
  protected readonly notesMaxLength = NOTES_MAX_LENGTH;
  protected readonly minDate = new Date();
  protected readonly maxDate = maxReservationDate();
  protected readonly confirmed = signal<Reservation | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, phoneValidator]],
    date: this.fb.control<Date | null>(null, Validators.required),
    time: ['', Validators.required],
    guests: [2, Validators.required],
    area: ['salao' as SeatingArea, Validators.required],
    notes: ['', Validators.maxLength(NOTES_MAX_LENGTH)],
  });

  private readonly selectedDate = toSignal(this.form.controls.date.valueChanges, {
    initialValue: null,
  });
  protected readonly times = computed(() => {
    const date = this.selectedDate();
    return date ? availableTimes(date) : [];
  });

  protected readonly dateFilter = (date: Date | null): boolean =>
    !!date && availableTimes(date).length > 0;

  constructor(
    protected readonly reservations: Reservations,
    private readonly snackBar: MatSnackBar,
  ) {
    this.form.controls.date.valueChanges.subscribe(() => {
      const time = this.form.controls.time;
      if (time.value && !this.times().includes(time.value)) time.reset();
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { date, ...request } = this.form.getRawValue();
    this.confirmed.set(this.reservations.book({ ...request, date: date! }));
    this.form.reset();
  }

  newReservation(): void {
    this.confirmed.set(null);
  }

  cancel(reservation: Reservation): void {
    this.reservations.cancel(reservation);
    if (this.confirmed() === reservation) this.confirmed.set(null);
    const ref = this.snackBar.open(`Reserva nº ${reservation.code} cancelada`, 'Desfazer', {
      duration: 5000,
      panelClass: ['app-snackbar'],
    });
    ref.onAction().subscribe(() => this.reservations.restore(reservation));
  }

  areaLabel(area: SeatingArea): string {
    return SEATING_AREA_LABELS[area];
  }

  guestsLabel(guests: number): string {
    return guests === 1 ? '1 pessoa' : `${guests} pessoas`;
  }

  formatDay(iso: string): string {
    return fromIsoDate(iso).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    });
  }

  dayNumber(iso: string): string {
    return iso.slice(8, 10);
  }

  monthShort(iso: string): string {
    return fromIsoDate(iso).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  }
}
