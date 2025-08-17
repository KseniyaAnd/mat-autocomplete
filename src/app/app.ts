import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Autocomplete} from './components/mat-autocomplete/mat-autocomplete';
import {TranslateService} from '@ngx-translate/core';
import {Calendar} from './components/calendar/calendar';
import {Relative} from './components/relative/relative';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {DateRangeInput} from './components/date-range-input/date-range-input';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Autocomplete, Calendar, Relative, MatTabGroup, MatTab, DateRangeInput],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private translateService = inject(TranslateService)
  protected title = 'mat-autocomplete';

  constructor() {
    this.translateService.setDefaultLang('en');
  }

  protected readonly Date = Date;
}
