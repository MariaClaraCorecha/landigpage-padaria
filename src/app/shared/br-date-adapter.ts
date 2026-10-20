import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class BrDateAdapter extends NativeDateAdapter {
  override parse(value: unknown, parseFormat?: unknown): Date | null {
    if (typeof value === 'string') {
      const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
      if (match) {
        const [day, month, year] = match.slice(1).map(Number);
        const date = new Date(year, month - 1, day);
        return date.getMonth() === month - 1 && date.getDate() === day ? date : this.invalid();
      }
    }
    return super.parse(value, parseFormat);
  }
}
