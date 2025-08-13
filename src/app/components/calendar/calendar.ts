import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {
  DateRange,
  DefaultMatCalendarRangeStrategy,
  MatCalendar,
  MatDatepickerModule,
  MatRangeDateSelectionModel
} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  providers: [DefaultMatCalendarRangeStrategy, DatePipe, MatRangeDateSelectionModel],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar {
  @Input() disablePeriod: 'month' | null = null;
  @Output() dateChange = new EventEmitter<Date>();

  selectedDateRange: DateRange<Date> | null = null;
  @ViewChild('first_calendar') firstCalendar!: MatCalendar<Date>;
  @ViewChild('second_calendar') secondCalendar!: MatCalendar<Date>;

  fromDateTime: string = '';
  toDateTime: string = '';
  headerRangeText: string = 'Date range';

  constructor(
    private selectionModel: MatRangeDateSelectionModel<Date>,
    private selectionStrategy: DefaultMatCalendarRangeStrategy<Date>,
    private datePipe: DatePipe
  ) {}

  ngAfterViewInit() {
    const today = new Date();
    this.firstCalendar.activeDate = today;
    this.secondCalendar.activeDate = today;

  }

  rangeChanged(selectedDate: Date) {
    const selection = this.selectionModel.selection;
    const newSelection = this.selectionStrategy.selectionFinished(
      selectedDate,
      selection
    );

    this.selectionModel.updateSelection(newSelection, this);
    this.selectedDateRange = new DateRange<Date>(
      newSelection.start,
      newSelection.end
    );

    const now = new Date();
    const currentTime = this.datePipe.transform(now, 'HH:mm') ?? '';

    // Первый инпут — только дата
    if (this.selectedDateRange.start) {
      this.fromDateTime = this.datePipe.transform(
        this.selectedDateRange.start,
        'yyyy-MM-dd'
      ) ?? '';
    }

    // Второй инпут — только текущее время
    this.toDateTime = currentTime;

    // Заголовок диапазона
    if (this.selectedDateRange.start && this.selectedDateRange.end) {
      const startStr = this.datePipe.transform(this.selectedDateRange.start, 'EEE, MMM dd');
      const endStr = this.datePipe.transform(this.selectedDateRange.end, 'EEE, MMM dd, y');
      this.headerRangeText = `${startStr} - ${endStr}`;
    } else {
      this.headerRangeText = 'Date range';
    }
  }


  prevMonth() {
    if (this.firstCalendar && this.secondCalendar) {
      const newDate = new Date(this.firstCalendar.activeDate);
      newDate.setMonth(newDate.getMonth() - 1);
      this.firstCalendar.activeDate = newDate;
      this.secondCalendar.activeDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    }
  }

  nextMonth() {
    if (this.firstCalendar && this.secondCalendar) {
      const newDate = new Date(this.firstCalendar.activeDate);
      newDate.setMonth(newDate.getMonth() + 1);
      this.firstCalendar.activeDate = newDate;
      this.secondCalendar.activeDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    }
  }
}

