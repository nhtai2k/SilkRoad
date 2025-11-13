import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-date',
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
        type="date"
        class="form-control"
        [formControl]="control"
        [class.is-invalid]="control.invalid && control.touched"
      />
      @if (control.invalid && control.touched) {
        <div class="invalid-feedback">
          @if (control.errors?.['required']) {
            <div>{{ label }} is required</div>
          }
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParticipantDateComponent),
      multi: true
    }
  ]
})
export class ParticipantDateComponent implements ControlValueAccessor, OnInit {
  @Input() fieldId: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;

  control = new FormControl('');
  
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor() {
    this.control.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  ngOnInit() {
    this.updateValidators();
  }

  private updateValidators() {
    const validators = [];
    
    if (this.required) {
      validators.push(Validators.required);
    }

    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
  }

  writeValue(value: any): void {
    if (value) {
      // Convert to datetime-local format if needed
      const date = new Date(value);
      const formattedDate = date.toISOString().slice(0, 16);
      this.control.setValue(formattedDate, { emitEvent: false });
    } else {
      this.control.setValue('', { emitEvent: false });
    }
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