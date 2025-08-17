import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
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

    /** Основные инпуты для ограничения выбора */
    @Input() minDate: Date | null = null;
    @Input() maxDate: Date | null = null;

    /** Алиасы в стиле MatDatepicker: [min] / [max] */
    @Input('min') set min(val: Date | string | null) { this.minDate = this.coerceDate(val); }
    @Input('max') set max(val: Date | string | null) { this.maxDate = this.coerceDate(val); }

    @Output() dateChange = new EventEmitter<{ from: Date | null; to: Date | null }>();

    selectedDateRange: DateRange<Date> | null = null;

    @ViewChild('first_calendar') firstCalendar!: MatCalendar<Date>;
    @ViewChild('second_calendar') secondCalendar!: MatCalendar<Date>;

    fromDate: Date | null = null;
    toDate: Date | null = null;

    fromTime: string = '';
    toTime: string = '';

    fromDateTime: Date | null = null;
    toDateTime: Date | null = null;

    headerRangeText: string = 'Date range';

    constructor(
        private selectionModel: MatRangeDateSelectionModel<Date>,
        private selectionStrategy: DefaultMatCalendarRangeStrategy<Date>,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        const now = new Date();
        const hhmm = this.datePipe.transform(now, 'HH:mm') ?? '00:00';
        this.fromTime = hhmm;
        this.toTime = hhmm;
    }

    ngAfterViewInit() {
        const today = new Date();
        this.firstCalendar.activeDate = today;
        this.secondCalendar.activeDate = today;
    }

    rangeChanged(selectedDate: Date) {
        const selection = this.selectionModel.selection;
        const newSelection = this.selectionStrategy.selectionFinished(selectedDate, selection);
        this.selectionModel.updateSelection(newSelection, this);
        this.selectedDateRange = new DateRange<Date>(newSelection.start, newSelection.end);

        this.fromDate = this.selectedDateRange.start ?? null;
        this.toDate = this.selectedDateRange.end ?? null;

        this.rebuildFromDateTime();
        this.rebuildToDateTime();

        // Заголовок
        if (this.fromDate && this.toDate) {
            const startStr = this.datePipe.transform(this.fromDate, 'EEE, MMM dd');
            const endStr = this.datePipe.transform(this.toDate, 'EEE, MMM dd, y');
            this.headerRangeText = `${startStr} - ${endStr}`;
        } else {
            this.headerRangeText = 'Date range';
        }

        this.dateChange.emit({ from: this.fromDateTime, to: this.toDateTime });
    }

    rebuildFromDateTime() { this.fromDateTime = this.combineDateAndTime(this.fromDate, this.fromTime); }
    rebuildToDateTime()   { this.toDateTime   = this.combineDateAndTime(this.toDate, this.toTime); }

    private combineDateAndTime(date: Date | null, hhmm: string): Date | null {
        if (!date || !hhmm) return date ?? null;
        const [h, m] = hhmm.split(':').map(v => parseInt(v, 10));
        const res = new Date(date);
        if (!Number.isNaN(h)) res.setHours(h);
        if (!Number.isNaN(m)) res.setMinutes(m);
        res.setSeconds(0, 0);
        return res;
    }

    private coerceDate(val: Date | string | null): Date | null {
        if (!val) return null;
        if (val instanceof Date) return val;
        const d = new Date(val);
        return isNaN(d.getTime()) ? null : d;
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
