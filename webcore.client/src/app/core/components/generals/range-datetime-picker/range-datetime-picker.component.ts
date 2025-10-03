import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
@Component({
  selector: 'app-range-datetime-picker',
  templateUrl: './range-datetime-picker.component.html',
  styleUrl: './range-datetime-picker.component.scss',
  imports: [FormsModule, NzDatePickerModule]
})
export class RangeDatetimePickerComponent {
  showTime = input<boolean>(true);
  isDisabled = input<boolean>(false);
  initialData = input<Date[] | null>(null);
  placeHolder = input<string[]>(['Start Date', 'End Date']);
  onChangeValue = output<Date[]>();

  onChange(result: Date[]): void {
    this.onChangeValue.emit(result);
  }
}
