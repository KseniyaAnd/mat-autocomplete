import {Component, ElementRef, HostListener, Input, signal, ViewChild} from '@angular/core';
import {Calendar} from '../calendar/calendar';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {Relative} from '../relative/relative';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-date-range-input',
  imports: [
    Calendar,
    MatTab,
    MatTabGroup,
    Relative,
    MatButton,
    DatePipe
  ],
  templateUrl: './date-range-input.html',
  styleUrl: './date-range-input.css'
})
export class DateRangeInput {
  showTabs = signal(false);

  private _minDate: Date | null = null;
  private _maxDate: Date | null = null;

  @Input()
  set minDate(value: Date | string | null) {
    this._minDate = this.coerceDate(value);
  }
  get minDate(): Date | null { return this._minDate; }

  @Input()
  set maxDate(value: Date | string | null) {
    this._maxDate = this.coerceDate(value);
  }
  get maxDate(): Date | null { return this._maxDate; }

  private coerceDate(v: Date | string | null): Date | null {
    if (!v) return null;
    if (v instanceof Date) return v;
    // Поддержка "YYYY-MM-DD"
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    if (iso.test(v)) {
      const [y, m, d] = v.split('-').map(Number);
      return new Date(y, m - 1, d, 0, 0, 0, 0);
    }
    const parsed = new Date(v);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  displayText = '';

  private pendingRelative: { unit: string; value: number } | null = null;
  private pendingRange: { from: Date | null; to: Date | null } | null = null;

  selectedDate: Date | null = null;
  relativeTime = { unit: '', value: 0 };
  combinedDateTime: Date | null = null;

  toggleTabs() { this.showTabs.set(true); }

  apply(confirm: boolean) {
    if (confirm) {
      if (this.pendingRelative && this.pendingRelative.value > 0 && this.pendingRelative.unit) {
        const u = this.pendingRelative.unit.toLowerCase();
        const v = this.pendingRelative.value;
        this.displayText = `last ${v} ${v === 1 ? u.slice(0, -1) : u}`;
        this.relativeTime = { ...this.pendingRelative };
        this.selectedDate = new Date();
      } else if (this.pendingRange && (this.pendingRange.from || this.pendingRange.to)) {
        // На всякий случай проверим границы перед выводом
        const from = this.clampToBounds(this.pendingRange.from);
        const to   = this.clampToBounds(this.pendingRange.to);

        const tzAbbr = this.getTimeZoneAbbr(to ?? from ?? new Date());
        const fromStr = from ? this.formatYmdHm(from) : '—';
        const toStr   = to   ? this.formatYmdHm(to)   : '—';
        this.displayText = `From: ${fromStr} - To: ${toStr} ${tzAbbr}`.trim();

        this.selectedDate = to ?? from ?? null;
      }
    }
    this.showTabs.set(false);
  }

  onRelativeChange(event: { unit: string, value: number }) {
    this.pendingRelative = event;
    this.pendingRange = null;
  }

  onDateChange(range: { from: Date | null; to: Date | null }) {
    this.pendingRange = range;
    this.pendingRelative = null;
  }

  // --- утилиты ---
  private clampToBounds(d: Date | null): Date | null {
    if (!d) return d;
    if (this.minDate && d < this.minDate) return new Date(this.minDate);
    if (this.maxDate && d > this.maxDate) return new Date(this.maxDate);
    return d;
  }

  private formatYmdHm(d: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  private getTimeZoneAbbr(d: Date, timeZone?: string): string {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneName: 'short'
    }).formatToParts(d);
    return fmt.find(p => p.type === 'timeZoneName')?.value ?? '';
  }
}

