import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Autocomplete} from './components/mat-autocomplete/mat-autocomplete';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Autocomplete],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'mat-autocomplete';
}
