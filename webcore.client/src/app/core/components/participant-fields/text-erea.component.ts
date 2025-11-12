import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-group">
      <label [for]="fieldId" class="form-label">
        {{ label }}
        @if (required) {
          <span class="text-danger">*</span>
        }
      </label>
      <textarea
        [id]="fieldId"
        class="form-control"
        [placeholder]="placeholder"
        [formControl]="control"
        [minlength]="minLength"
        [maxlength]="maxLength"
        [rows]="rows"
        [class.is-invalid]="control.invalid && control.touched"
      ></textarea>
      @if (maxLength > 0) {
        <div class="form-text">
          {{ control.value?.length || 0 }} / {{ maxLength }} characters
        </div>
      }
      @if (control.invalid && control.touched) {
        <div class="invalid-feedback">
          @if (control.errors?.['required']) {
            <div>{{ label }} is required</div>
          }
          @if (control.errors?.['minlength']) {
            <div>Minimum length is {{ minLength }} characters</div>
          }
          @if (control.errors?.['maxlength']) {
            <div>Maximum length is {{ maxLength }} characters</div>
          }
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParticipantTextAreaComponent),
      multi: true
    }
  ]
})
export class ParticipantTextAreaComponent implements ControlValueAccessor {
  @Input() fieldId: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 500;
  @Input() rows: number = 4;

  control = new FormControl('');
  
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor() {
    this.control.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.control.valueChanges.subscribe(() => {
      this.onTouched();
    });
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}