import { Component, ViewChild } from '@angular/core';
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
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    DatePipe
  ],
  providers: [DefaultMatCalendarRangeStrategy, MatRangeDateSelectionModel],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar {
  selectedDateRange: DateRange<Date> | null = null;
  @ViewChild('first_calendar') calendar!: MatCalendar<Date>;

  constructor(
    private selectionModel: MatRangeDateSelectionModel<Date>,
    private selectionStrategy: DefaultMatCalendarRangeStrategy<Date>
  ) {}

  previousMonthDate = new Date(new Date().setMonth(new Date().getMonth() - 1));

  ngAfterViewInit() {
    this.calendar.activeDate = this.previousMonthDate;
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
  }
}
