import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatInput} from '@angular/material/input';
import {AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn} from '@angular/forms';
import {BehaviorSubject, map, Observable, of, startWith, switchMap} from 'rxjs';
import {AsyncPipe, NgClass} from '@angular/common';
import {AutocompleteService} from '../../services/autocomplete-service';
import {TranslatePipe} from '@ngx-translate/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  destroyRef = inject(DestroyRef)

  Countries: Country[] = [];

  constructor(private autocompleteService: AutocompleteService) {
    this.Countries = autocompleteService.Countries;
    this.filterString.set(this.Countries);
  }

  myControl: FormControl = new FormControl('');
  filterString = signal<Country[]>(this.Countries);

  ngOnInit() {
    this.myControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        const filtered = this.Countries.filter(country =>
          country.name.toLowerCase().includes(value?.toLowerCase() ?? '')
        );
        this.filterString.set(filtered);
        this.myControl.updateValueAndValidity({ emitEvent: false });
      });

    this.myControl.setValidators(this.validateCountry(this.Countries));
  }


  validateCountry(countries: Country[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputValue = control.value;
      const match = countries.some(country => country.name.toLowerCase() === inputValue?.toLowerCase());
      return match ? null : { invalidCountry: true };
    };
  }

  optionSelected() {
    this.filterString.set(this.Countries);
  }
}
