import { Directive, ElementRef, HostListener, input, output } from '@angular/core';

/**
 * A directive that automatically formats numeric input with thousand separators
 * and restricts input to valid numeric characters. Supports decimal numbers
 * and emits the raw numeric value while maintaining formatted display.
 * 
 * Usage: <input appThousandSeparator [allowDecimal]="true" [maxDecimals]="2" />
 */
@Directive({
  selector: '[appThousandSeparator]',
  standalone: true
})
export class ThousandSeparatorDirective {
  /** The character used to separate thousands (default: ',') */
  separator = input<string>(',');
  
  /** Whether decimal numbers are allowed (default: true) */
  allowDecimal = input<boolean>(true);
  
  /** Maximum number of decimal places allowed (default: 2) */
  maxDecimals = input<number>(2);
  
  /** Emits the raw numeric value whenever the input changes */
  numericValueChange = output<number | null>();

  constructor(private el: ElementRef) {}

  /**
   * Handles input events to format the display value with thousand separators
   * while preserving cursor position and emitting the raw numeric value
   * Supports negative numbers with minus sign only at position 0
   */
  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    const cursorPosition = input.selectionStart;
    let value = input.value;

    // Check if number should be negative (minus at start)
    const isNegative = value.startsWith('-');
    
    // Remove all non-numeric characters except decimal point and leading minus
    // Allow minus only at position 0, remove any other minus signs
    const cleanValue = value.replace(/[^\d.-]/g, '').replace(/(?<!^)-/g, '');
    
    // Handle decimal formatting based on allowDecimal setting
    let formattedValue: string;
    if (this.allowDecimal() && cleanValue.includes('.')) {
      const parts = cleanValue.split('.');
      // Ensure only one decimal point exists by removing extra ones
      if (parts.length > 2) {
        parts.splice(2);
      }
      // Truncate decimal places to maxDecimals limit
      if (parts[1] && parts[1].length > this.maxDecimals()) {
        parts[1] = parts[1].substring(0, this.maxDecimals());
      }
      // Format the integer part with thousand separators, preserving negative sign
      parts[0] = this.addThousandSeparator(parts[0], isNegative);
      formattedValue = parts.join('.');
    } else {
      // No decimal allowed or no decimal present - format as integer
      const numberPart = cleanValue.replace('.', '').replace('-', '');
      formattedValue = this.addThousandSeparator(numberPart, isNegative);
    }

    // Update the input field with the formatted value
    input.value = formattedValue;

    // Emit the raw numeric value for use by parent components
    this.emitNumericValue(cleanValue);

    // Restore cursor position, accounting for added/removed separators
    const newCursorPosition = this.calculateCursorPosition(value, formattedValue, cursorPosition);
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  }

  /**
   * Restricts keyboard input to only allow valid numeric characters,
   * navigation keys, and common editing shortcuts
   * Allows minus sign only at position 0 for negative numbers
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;
    
    // Define keys that should always be allowed for navigation and editing
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End',
      'ArrowLeft', 'ArrowRight', 'Clear', 'Copy', 'Paste'
    ];

    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
    if (event.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(event.key.toLowerCase())) {
      return;
    }

    // Allow number keys
    if ((event.key >= '0' && event.key <= '9') || allowedKeys.includes(event.key)) {
      return;
    }

    // Allow decimal point if enabled and not already present
    if (this.allowDecimal() && event.key === '.' && !input.value.includes('.')) {
      return;
    }

    // Allow minus sign only at position 0 and if not already present
    if (event.key === '-' && cursorPosition === 0 && !input.value.startsWith('-')) {
      return;
    }

    // Prevent all other keys
    event.preventDefault();
  }

  /**
   * Adds thousand separators to a numeric string using regex
   * Pattern explanation: \B(?=(\d{3})+(?!\d)) finds positions between digits
   * where there are groups of 3 digits followed by end of string or non-digit
   * Handles negative numbers by preserving the minus sign at the beginning
   */
  private addThousandSeparator(value: string, isNegative: boolean = false): string {
    if (!value) return isNegative ? '-' : '';
    
    // Remove any existing minus sign from the value for processing
    const cleanValue = value.replace('-', '');
    if (!cleanValue) return isNegative ? '-' : '';
    
    // Apply thousand separators to the clean numeric value
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, this.separator());
    
    // Add minus sign back if number is negative
    return isNegative ? '-' + formattedValue : formattedValue;
  }

  /**
   * Calculates the correct cursor position after formatting changes
   * This ensures the cursor stays in the logical position relative to digits
   * even when separators are added or removed. Accounts for negative sign.
   */
  private calculateCursorPosition(oldValue: string, newValue: string, oldPosition: number): number {
    // Count how many separators were before the cursor in the old value
    const separatorsBefore = (oldValue.substring(0, oldPosition).match(new RegExp(`\\${this.separator()}`, 'g')) || []).length;
    
    // Calculate the cursor position in terms of actual digits (excluding separators and minus)
    const cleanOldValue = oldValue.replace(new RegExp(`\\${this.separator()}`, 'g'), '').replace('-', '');
    const oldHasMinus = oldValue.startsWith('-');
    const newHasMinus = newValue.startsWith('-');
    
    // Adjust position for minus sign
    let adjustedOldPosition = oldPosition;
    if (oldHasMinus && oldPosition > 0) {
      adjustedOldPosition = oldPosition - 1;
    }
    
    const cleanPosition = adjustedOldPosition - separatorsBefore;
    
    // Calculate new cursor position by accounting for separators in formatted value
    const cleanNewValue = newValue.replace(new RegExp(`\\${this.separator()}`, 'g'), '').replace('-', '');
    let newPosition = cleanPosition;
    
    // Format the portion up to the cursor position to count new separators
    const newValueUpToPosition = cleanNewValue.substring(0, cleanPosition);
    const formattedUpToPosition = this.addThousandSeparator(newValueUpToPosition, false);
    newPosition = formattedUpToPosition.length;
    
    // Handle cursor position when decimal point is present
    if (newValue.includes('.') && cleanPosition >= cleanNewValue.indexOf('.')) {
      const decimalIndex = newValue.indexOf('.');
      if (cleanPosition > cleanNewValue.indexOf('.')) {
        // Cursor is after decimal point - position it correctly in decimal part
        newPosition = decimalIndex + (cleanPosition - cleanNewValue.indexOf('.'));
      } else {
        // Cursor is at decimal point
        newPosition = decimalIndex;
      }
    }

    // Adjust final position for negative sign
    if (newHasMinus) {
      newPosition += 1;
    }

    return Math.min(newPosition, newValue.length);
  }

  /**
   * Converts the clean string value to a number and emits it
   * Emits null for empty strings, lone decimal points, or invalid numbers
   * Properly handles negative numbers
   */
  private emitNumericValue(cleanValue: string): void {
    // Handle empty or invalid input cases
    if (cleanValue === '' || cleanValue === '.' || cleanValue === '-') {
      this.numericValueChange.emit(null);
      return;
    }
    
    // Parse to number and emit, or null if parsing fails
    const numericValue = parseFloat(cleanValue);
    if (isNaN(numericValue)) {
      this.numericValueChange.emit(null);
    } else {
      this.numericValueChange.emit(numericValue);
    }
  }
}
