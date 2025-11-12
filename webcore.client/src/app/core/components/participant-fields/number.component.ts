import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-number',
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
        type="number"
        class="form-control"
        [placeholder]="placeholder"
        [formControl]="control"
        [min]="minValue"
        [max]="maxValue"
        [class.is-invalid]="control.invalid && control.touched"
      />
      @if (control.invalid && control.touched) {
        <div class="invalid-feedback">
          @if (control.errors?.['required']) {
            <div>{{ label }} is required</div>
          }
          @if (control.errors?.['min']) {
            <div>Minimum value is {{ minValue }}</div>
          }
          @if (control.errors?.['max']) {
            <div>Maximum value is {{ maxValue }}</div>
          }
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParticipantNumberComponent),
      multi: true
    }
  ]
})
export class ParticipantNumberComponent implements ControlValueAccessor, OnInit {
  @Input() fieldId: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() minValue: number | null = null;
  @Input() maxValue: number | null = null;

  control = new FormControl<number | null>(null);
  
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor() {
    this.control.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  ngOnInit() {
    const validators = [];
    if (this.minValue !== null) {
      validators.push(Validators.min(this.minValue));
    }
    if (this.maxValue !== null) {
      validators.push(Validators.max(this.maxValue));
    }
    this.control.setValidators(validators);
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