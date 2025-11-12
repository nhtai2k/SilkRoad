import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-phone',
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
      <input
        [id]="fieldId"
        type="tel"
        class="form-control"
        [placeholder]="placeholder"
        [formControl]="control"
        [class.is-invalid]="control.invalid && control.touched"
      />
      @if (control.invalid && control.touched) {
        <div class="invalid-feedback">
          @if (control.errors?.['required']) {
            <div>{{ label }} is required</div>
          }
          @if (control.errors?.['pattern']) {
            <div>Please enter a valid phone number</div>
          }
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParticipantPhoneComponent),
      multi: true
    }
  ]
})
export class ParticipantPhoneComponent implements ControlValueAccessor {
  @Input() fieldId: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  // Basic phone number pattern - can be adjusted based on requirements
  private phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
  
  control = new FormControl('', [Validators.pattern(this.phonePattern)]);
  
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