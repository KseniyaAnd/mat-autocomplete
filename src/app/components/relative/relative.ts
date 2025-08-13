import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatMiniFabButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-relative',
  imports: [
    MatCard,
    MatMiniFabButton,
    MatInput,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatFormField,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './relative.html',
  styleUrl: './relative.css'
})
export class Relative {
  inputValue = new FormControl();
  rangeControl = new FormControl('');

  rangeNumbersMinutesList: number[] = [5, 10, 15, 20, 30, 45];
  rangeNumbersHoursList: number[] = [1, 2, 3, 6, 8, 12];
  rangeNumbersDaysList: number[] = [1, 2, 3, 4, 5, 6];
  rangeNumbersWeeksList: number[] = [1, 2, 3, 4];
  rangeNumbersNamesList: string[] = ['Minutes', 'Hours', 'Days', 'Weeks'];

  setValue(value: number, unit: string) {
    this.inputValue.setValue(value);
    this.rangeControl.setValue(unit);
  }
}
