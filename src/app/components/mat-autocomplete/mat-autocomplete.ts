import {Component, OnInit} from '@angular/core';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';
import {AsyncPipe} from '@angular/common';
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
    TranslatePipe
  ],
  templateUrl: './mat-autocomplete.html',
  styleUrl: './mat-autocomplete.css'
})
export class Autocomplete implements OnInit {
  Countries: Country[] = [];

  constructor(private autocompleteService: AutocompleteService) {
    this.Countries = autocompleteService.Countries
  }

  myControl = new FormControl();
  filteredOptions!: Observable<Country[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this.autocompleteService.filterCountry(name) : this.Countries.slice()))
    );
  }


}
