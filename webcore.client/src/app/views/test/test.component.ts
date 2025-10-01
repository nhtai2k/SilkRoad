import { Component } from '@angular/core';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { OptionModel } from '@models/option.model';

@Component({
  selector: 'app-test',
  imports: [RangeDatetimePickerComponent, SelectSearchComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  data: OptionModel[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];

}
