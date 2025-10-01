import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OptionModel } from '@models/option.model';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-select-search',
  imports: [FormsModule, CommonModule, NzSelectModule],
  templateUrl: './select-search.component.html',
  styleUrl: './select-search.component.scss'
})
export class SelectSearchComponent {
  placeholder = input<string>('Search...');
  selectedValue = input<any>(null);
  disabled = input<boolean>(false);
  options = input<OptionModel[]>([]);
  onChangeValue = output<any>();


  onChangeInput(event: any) {
    if (event) {
      this.onChangeValue.emit(event);
      //console.log('onChangeInput', event);

    } else {
      this.onChangeValue.emit(-1);
      //console.log('onChangeInput', -1);
    }
  }
}
