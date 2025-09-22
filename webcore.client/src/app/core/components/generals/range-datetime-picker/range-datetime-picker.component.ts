import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { getISOWeek } from 'date-fns';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-range-datetime-picker',
  templateUrl: './range-datetime-picker.component.html',
  styleUrl: './range-datetime-picker.component.scss',
  imports: [FormsModule, NzDatePickerModule]
})
export class RangeDatetimePickerComponent {
  date = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
}
