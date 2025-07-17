import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { FormControlDirective } from '@coreui/angular';
interface SelectObject {
  id: number;
  name: string;
}

@Component({
  selector: 'app-select-search',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    FormControlDirective
  ],
  templateUrl: './select-search.component.html',
  styleUrl: './select-search.component.scss'
})
export class SelectSearchComponent {
  @Input() placeholder: string = 'Select an option';
  @Input() options: SelectObject[] = [];
  @Output() onChangeValue = new EventEmitter<any>(); 
  // Form control for the autocomplete input
  myControl = new FormControl<string | SelectObject>('');
  // Observable for filtered autocomplete options
  filteredOptions: Observable<SelectObject[]> = new Observable<SelectObject[]>();

  /**
   * Initialize the component and set up filtered options for the autocomplete.
   */
  ngOnInit() {
    // Set up filteredOptions to update as the input value changes
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        // If value is a string, use it directly; otherwise, use the name property
        const name = typeof value === 'string' ? value : value?.name;
        // Filter the province list based on the input
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

  }

  /**
   * Display function for showing the selected province name in the input.
   * @param data The province object
   * @returns The province name or an empty string
   */
  displayFn(data: SelectObject): string {
    return data && data.name ? data.name : '';
  }

  /**
   * Handler for when an option is selected from the autocomplete.
   */
  onOptionSelected(event: any) {
    this.onChangeValue.emit(event.option.value.id);
  }

  /**
   * Private method to filter the province list by name.
   * @param name The name to filter by
   * @returns The filtered list of provinces
   */
  private _filter(name: string): SelectObject[] {
    const filterValue = name.toLowerCase();
    // Return provinces whose names include the filter value
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }



}
