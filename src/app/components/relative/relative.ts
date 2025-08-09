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
  inputValue = new FormControl('');
  toppings = new FormControl('');

  toppingList: string[] = ['Minutes', 'Hours'];

  setValue(value: string, unit: string) {
    this.inputValue.setValue(value);
    this.toppings.setValue(unit);
  }
}
