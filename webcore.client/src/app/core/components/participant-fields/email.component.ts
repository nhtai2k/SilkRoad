import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-participant-email',
  standalone: true,
  imports: [ReactiveFormsModule],
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
        type="email"
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
          @if (control.errors?.['email']) {
            <div>Please enter a valid email address</div>
          }
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParticipantEmailComponent),
      multi: true
    }
  ]
})
export class ParticipantEmailComponent implements ControlValueAccessor, OnInit {
  @Input() fieldId: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
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
    const validators = [Validators.email];
    
    if (this.required) {
      validators.push(Validators.required);
    }

    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
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