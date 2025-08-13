import {Component, ElementRef, HostListener, signal, ViewChild} from '@angular/core';
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

  @ViewChild('tabsWrapper') tabsWrapper!: ElementRef;
  @ViewChild('inputWrapper') inputWrapper!: ElementRef;

  selectedDate: Date | null = null;
  relativeTime = { unit: '', value: 0 };
  combinedDateTime: Date | null = null;

  toggleTabs () {
    this.showTabs.set(true);
  }

  apply() {
    this.showTabs.set(false);
  }

  onRelativeChange(event: { unit: string, value: number }) {
    this.relativeTime = event;
    this.updateCombinedDateTime();
  }

  // При выборе даты в Calendar
  onDateChange(date: Date) {
    this.selectedDate = date;
    this.updateCombinedDateTime();
  }

  private updateCombinedDateTime() {
    if (!this.selectedDate || !this.relativeTime.value) return;

    const date = new Date(this.selectedDate);

    switch (this.relativeTime.unit) {
      case 'Minutes':
        date.setMinutes(date.getMinutes() + this.relativeTime.value);
        break;
      case 'Hours':
        date.setHours(date.getHours() + this.relativeTime.value);
        break;
      case 'Days':
        date.setDate(date.getDate() + this.relativeTime.value);
        break;
      case 'Weeks':
        date.setDate(date.getDate() + this.relativeTime.value * 7);
        break;
    }

    this.combinedDateTime = date;
  }
}
