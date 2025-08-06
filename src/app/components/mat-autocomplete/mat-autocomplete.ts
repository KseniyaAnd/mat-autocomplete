import {Component, OnInit} from '@angular/core';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatInput} from '@angular/material/input';
import {AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn} from '@angular/forms';
import {BehaviorSubject, map, Observable, of, startWith, switchMap} from 'rxjs';
import {AsyncPipe, NgClass} from '@angular/common';
import {AutocompleteService} from '../../services/autocomplete-service';
import {TranslatePipe} from '@ngx-translate/core';

export interface Country {
  code: string;
  name: string;
}

@Component({
  selector: 'app-mat-autocomplete',
  imports: [
    MatFormField,
    MatOption,
    MatAutocomplete,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    AsyncPipe,
    MatInput,
    TranslatePipe,
    NgClass
  ],
  templateUrl: './mat-autocomplete.html',
  styleUrl: './mat-autocomplete.css'
})
export class Autocomplete implements OnInit {
  Countries: Country[] = [];

  constructor(private autocompleteService: AutocompleteService) {
    this.Countries = autocompleteService.Countries
  }

  myControl: FormControl = new FormControl('');
  private showAll$ = new BehaviorSubject<boolean>(false);
  filteredOptions!: Observable<Country[]>;

  ngOnInit() {
    this.myControl.setValidators(this.validateCountry(this.Countries));

    this.filteredOptions = this.showAll$.pipe(
      switchMap(showAll => {
        if (showAll) {
          // Показываем все страны без фильтра
          return of(this.Countries.slice());
        } else {
          // Фильтруем по введенному значению
          return this.myControl.valueChanges.pipe(
            startWith(this.myControl.value || ''),
            map(value => (typeof value === 'string' ? value : value?.name)),
            map(name =>
              name?.trim()
                ? this.autocompleteService.filterCountry(name)
                : this.Countries.slice()
            )
          );
        }
      })
    );
  }

  onFocus() {
    // При фокусе включаем показ всех вариантов
    this.showAll$.next(true);
  }

  onBlur() {
    // При потере фокуса снова включаем фильтрацию по вводу
    this.showAll$.next(false);
  }


  validateCountry(countries: Country[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputValue = control.value;
      const match = countries.some(country => country.name.toLowerCase() === inputValue?.toLowerCase());
      return match ? null : { invalidCountry: true };
    };
  }
}
