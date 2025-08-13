import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
export class Relative implements OnInit {
  @Output() valueChange = new EventEmitter<{unit: string, value: number}>();

  inputValue = new FormControl<number | null>(null);
  rangeControl = new FormControl<string>('Minutes');

  activeButton = { unit: '', value: null as number | null };

  rangeNumbersMinutesList: number[] = [5, 10, 15, 20, 30, 45];
  rangeNumbersHoursList: number[] = [1, 2, 3, 6, 8, 12];
  rangeNumbersDaysList: number[] = [1, 2, 3, 4, 5, 6];
  rangeNumbersWeeksList: number[] = [1, 2, 3, 4];
  rangeNumbersNamesList: string[] = ['Minutes', 'Hours', 'Days', 'Weeks'];

  ngOnInit() {
    this.inputValue.valueChanges.subscribe(() => this.updateActiveButton());
    this.rangeControl.valueChanges.subscribe(() => this.updateActiveButton());
  }

  setValue(value: number, unit: string) {
    this.inputValue.setValue(value);
    this.rangeControl.setValue(unit);
    this.activeButton = { unit, value };
  }

  private emitValue() {
    if (this.inputValue.value && this.rangeControl.value) {
      this.valueChange.emit({unit: this.rangeControl.value, value: this.inputValue.value});
    }
  }


  isActive(unit: string, value: number) {
    return this.activeButton.unit === unit && this.activeButton.value === value;
  }

  private updateActiveButton() {
    const numVal = Number(this.inputValue.value);
    const unit = this.rangeControl.value ?? '';

    const currentList = this.getListByUnit(unit);
    if (currentList?.includes(numVal)) {
      this.activeButton = { unit, value: numVal };
    } else {
      this.activeButton = { unit: '', value: null };
    }
  }

  private getListByUnit(unit: string) {
    switch (unit) {
      case 'Minutes': return this.rangeNumbersMinutesList;
      case 'Hours': return this.rangeNumbersHoursList;
      case 'Days': return this.rangeNumbersDaysList;
      case 'Weeks': return this.rangeNumbersWeeksList;
      default: return null;
    }
  }
}
