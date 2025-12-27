import { Component, Input, Output, EventEmitter, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { ThousandSeparatorDirective } from '@common/directives/thousand-separator.directive';

/**
 * A reusable currency input component that formats numbers with thousand separators
 * and displays currency symbols. Implements ControlValueAccessor for seamless 
 * integration with Angular reactive forms and template-driven forms.
 * 
 * Features:
 * - Automatic thousand separator formatting
 * - Configurable currency symbol and code
 * - Min/max value validation with constraints
 * - Decimal support with configurable precision
 * - Negative number support (minus sign at position 0 only)
 * - Form control integration
 * - Value change emission for reactive programming
 * 
 * Usage: 
 * <app-input-currency 
 *   [(ngModel)]="amount" 
 *   currency="USD" 
 *   currencySymbol="$" 
 *   [min]="-1000000"
 *   [max]="1000000">
 * </app-input-currency>
 */
@Component({
  selector: 'app-input-currency',
  imports: [ReactiveFormsModule, ThousandSeparatorDirective],
  templateUrl: './input-currency.component.html',
  styleUrl: './input-currency.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCurrencyComponent),
      multi: true
    }
  ]
})
export class InputCurrencyComponent implements ControlValueAccessor, OnChanges {
  /** Placeholder text displayed when input is empty */
  @Input() placeholder: string = 'Amount';
  
  /** Currency code displayed after the input (e.g., 'USD', 'EUR', 'VND') */
  @Input() currency: string = 'VND';
  
  /** Currency symbol displayed before the input (e.g., '$', '€', 'đ') */
  @Input() currencySymbol: string = 'đ';
  
  /** Whether the input is disabled and read-only */
  @Input() disabled: boolean = false;
  
  /** Minimum allowed value (values below this will be constrained) */
  @Input() min: number = Number.MIN_SAFE_INTEGER;
  
  /** Maximum allowed value (values above this will be constrained) */
  @Input() max: number = Number.MAX_SAFE_INTEGER;
  
  /** Whether decimal numbers are allowed */
  @Input() allowDecimal: boolean = true;
  
  /** Maximum number of decimal places allowed */
  @Input() maxDecimals: number = 3;
  
  /** Initial value to display when component loads */
  @Input() initialValue: number = 0;

  /** Emits the current numeric value whenever it changes */
  @Output() valueChange = new EventEmitter<number>();

  /** Internal FormControl for managing the formatted display value */
  amountCtrl = new FormControl<string | null>(null);
  
  /** Stores the current numeric value for internal tracking */
  private numericValue: number = 0;

  /** ControlValueAccessor callback - called when value changes */
  private onChange = (value: number) => {};
  
  /** ControlValueAccessor callback - called when input is touched/blurred */
  private onTouched = () => {};

  constructor() {}

  /**
   * Responds to input property changes, particularly initialValue
   * Formats and displays the initial value when it changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue'] && this.initialValue !== undefined) {
      this.numericValue = this.initialValue;
      if (this.initialValue !== 0) {
        // Format the initial value with thousand separators for display (handles negative numbers)
        const formattedValue = this.formatNumberWithSeparators(this.initialValue);
        this.amountCtrl.setValue(formattedValue, { emitEvent: false });
      } else {
        // Display empty string for zero values
        this.amountCtrl.setValue('', { emitEvent: false });
      }
    }
  }

  // ===== ControlValueAccessor Implementation =====
  // These methods enable integration with Angular forms (both reactive and template-driven)
  
  /**
   * Writes a value from the form model to the component
   * Called by Angular forms when the form control value changes programmatically
   */
  writeValue(value: number): void {
    if (value !== null && value !== undefined) {
      this.numericValue = value;
      if (value !== 0) {
        // Format non-zero values with thousand separators (handles both positive and negative)
        const formattedValue = this.formatNumberWithSeparators(value);
        this.amountCtrl.setValue(formattedValue, { emitEvent: false });
      } else {
        // Show empty field for zero values
        this.amountCtrl.setValue('', { emitEvent: false });
      }
    }
  }

  /**
   * Registers a callback to be called when the component's value changes
   * This is how the component notifies the form that its value has changed
   */
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback to be called when the component is touched
   * Used for validation timing and dirty state management
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the component
   * Called by Angular forms when the form control is enabled/disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.amountCtrl.disable();
    } else {
      this.amountCtrl.enable();
    }
  }

  // ===== Event Handlers =====
  
  /**
   * Handles numeric value changes from the thousand-separator directive
   * Applies min/max constraints and notifies form and parent components
   * Properly handles negative numbers
   */
  onNumericValueChange(value: number | null): void {
    const numericValue = value ?? 0;
    
    // Apply min/max constraints to ensure value stays within valid range
    const constrainedValue = Math.max(this.min, Math.min(this.max, numericValue));
    
    if (constrainedValue !== numericValue) {
      // Value was constrained - update display to show the corrected value
      const formattedValue = this.formatNumberWithSeparators(constrainedValue);
      this.amountCtrl.setValue(formattedValue, { emitEvent: false });
    }
    
    // Update internal state and notify all listeners
    this.numericValue = constrainedValue;
    this.onChange(constrainedValue); // Notify Angular forms
    this.valueChange.emit(constrainedValue); // Notify parent component
    
  }

  /**
   * Handles input blur event to mark the component as touched
   * This is important for form validation timing
   */
  onInputBlur(): void {
    this.onTouched();
  }

  // ===== Public API =====
  
  /**
   * Getter to access the current numeric value
   * Useful for parent components that need to read the value programmatically
   */
  get currentValue(): number {
    return this.numericValue;
  }

  // ===== Private Helper Methods =====
  
  /**
   * Formats a number with thousand separators, properly handling negative numbers
   * @param value The numeric value to format
   * @returns Formatted string with thousand separators
   */
  private formatNumberWithSeparators(value: number): string {
    if (value === 0) return '';
    
    const isNegative = value < 0;
    const absoluteValue = Math.abs(value);
    
    // Apply thousand separators to the absolute value
    const formattedValue = absoluteValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Add negative sign back if needed
    return isNegative ? '-' + formattedValue : formattedValue;
  }
}
