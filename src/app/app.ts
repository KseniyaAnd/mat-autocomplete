import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Autocomplete} from './components/mat-autocomplete/mat-autocomplete';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Autocomplete],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private translateService = inject(TranslateService)
  protected title = 'mat-autocomplete';

  constructor() {
    this.translateService.setDefaultLang('en');
  }
}
