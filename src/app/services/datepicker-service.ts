import { Injectable } from '@angular/core';
import {DateRange} from '@angular/material/datepicker';

@Injectable({
  providedIn: 'root'
})
export class DatepickerService {
  ActiveButton = { unit: '', value: null as number | null };
  selectedDateRange = null as DateRange<Date> | null;

  constructor() { }
}
