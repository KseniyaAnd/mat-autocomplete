import {Component, ElementRef, HostListener, signal, ViewChild} from '@angular/core';
import {Calendar} from '../calendar/calendar';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {Relative} from '../relative/relative';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-date-range-input',
  imports: [
    Calendar,
    MatTab,
    MatTabGroup,
    Relative,
    MatButton
  ],
  templateUrl: './date-range-input.html',
  styleUrl: './date-range-input.css'
})
export class DateRangeInput {
  showTabs = signal(false);

  @ViewChild('tabsWrapper') tabsWrapper!: ElementRef;
  @ViewChild('inputWrapper') inputWrapper!: ElementRef;

  toggleTabs () {
    this.showTabs.set(true);
  }

  apply() {
    this.showTabs.set(false);
  }
  //
  // @HostListener('document:click', ['$event'])
  // clickOutside(event: MouseEvent) {
  //   const clickedInsideTabs =
  //     this.tabsWrapper?.nativeElement &&
  //     this.tabsWrapper.nativeElement.contains(event.target);
  //
  //   const clickedInsideInput =
  //     this.inputWrapper?.nativeElement &&
  //     this.inputWrapper.nativeElement.contains(event.target);
  //
  //   if (!clickedInsideTabs && !clickedInsideInput) {
  //     this.showTabs.set(false);
  //   }
  // }

}
