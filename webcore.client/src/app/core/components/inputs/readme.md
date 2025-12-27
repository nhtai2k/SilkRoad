# Input Components

This directory contains reusable input components for form handling and user input management.

## Input Currency Component

A comprehensive currency input component that provides formatted numeric input with thousand separators, currency symbols, and full form integration.

### Features

- ✅ **Automatic thousand separator formatting** (e.g., `1,234,567.89`)
- ✅ **Negative number support** (minus sign only at position 0)
- ✅ **Configurable currency symbol and code** (`$`, `€`, `đ`, etc.)
- ✅ **Min/max value validation** with automatic constraint enforcement
- ✅ **Decimal support** with configurable precision
- ✅ **Angular Forms integration** (ControlValueAccessor implementation)
- ✅ **Real-time value change emission** for reactive programming
- ✅ **Accessibility support** with proper ARIA labels
- ✅ **Disabled state management**

### Usage

#### Basic Usage
```html
<app-input-currency 
  [(ngModel)]="amount" 
  currency="USD" 
  currencySymbol="$">
</app-input-currency>
```

#### Advanced Usage with Constraints
```html
<app-input-currency 
  [(ngModel)]="price" 
  currency="EUR" 
  currencySymbol="€"
  [min]="-10000"
  [max]="50000"
  [allowDecimal]="true"
  [maxDecimals]="2"
  placeholder="Enter price"
  (valueChange)="onPriceChange($event)">
</app-input-currency>
```

#### Reactive Forms Integration
```typescript
// In component
priceForm = new FormGroup({
  amount: new FormControl(1500.75)
});

// In template
<form [formGroup]="priceForm">
  <app-input-currency 
    formControlName="amount"
    currency="VND"
    currencySymbol="đ">
  </app-input-currency>
</form>
```

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | `'Amount'` | Placeholder text when input is empty |
| `currency` | `string` | `'VND'` | Currency code displayed after input |
| `currencySymbol` | `string` | `'đ'` | Currency symbol displayed before input |
| `disabled` | `boolean` | `false` | Whether input is disabled and read-only |
| `min` | `number` | `Number.MIN_SAFE_INTEGER` | Minimum allowed value (with constraint enforcement) |
| `max` | `number` | `Number.MAX_SAFE_INTEGER` | Maximum allowed value (with constraint enforcement) |
| `allowDecimal` | `boolean` | `true` | Whether decimal numbers are allowed |
| `maxDecimals` | `number` | `3` | Maximum number of decimal places |
| `initialValue` | `number` | `0` | Initial value to display on component load |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<number>` | Emits current numeric value whenever it changes |

### Public Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `currentValue` | `number` | Getter to access current numeric value programmatically |

## Thousand Separator Directive

The underlying directive that handles number formatting, input validation, and cursor position management.

### Features

- ✅ **Real-time thousand separator formatting**
- ✅ **Negative number support** (minus only at position 0, single minus allowed)
- ✅ **Configurable separator character** (default: comma)
- ✅ **Decimal number support** with precision control
- ✅ **Intelligent cursor positioning** (maintains cursor position during formatting)
- ✅ **Input validation** (restricts to valid numeric characters only)
- ✅ **Keyboard navigation support** (allows arrow keys, backspace, etc.)
- ✅ **Copy/paste support** with proper formatting

### Usage

```html
<input 
  appThousandSeparator
  [separator]="','"
  [allowDecimal]="true"
  [maxDecimals]="2"
  (numericValueChange)="onValueChange($event)">
```

### Directive Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `separator` | `string` | `','` | Character used for thousand separation |
| `allowDecimal` | `boolean` | `true` | Whether decimal numbers are allowed |
| `maxDecimals` | `number` | `2` | Maximum decimal places allowed |

### Directive Outputs

| Event | Type | Description |
|-------|------|-------------|
| `numericValueChange` | `OutputEmitterRef<number \| null>` | Emits raw numeric value on input changes |

## Implementation Notes

### Negative Number Handling

Both components now fully support negative numbers with the following rules:

1. **Minus sign position**: Only allowed at position 0 (beginning of input)
2. **Single minus rule**: Only one minus sign allowed per input
3. **Formatting preservation**: Minus sign is preserved during thousand separator formatting
4. **Value emission**: Proper negative numeric values are emitted (e.g., `-1234.56`)

### Form Integration

The currency component implements Angular's `ControlValueAccessor` interface, providing:

- **Two-way data binding** with `[(ngModel)]`
- **Reactive forms support** with `formControlName`
- **Validation integration** with Angular's validation system
- **Disabled state management** via form control
- **Touch/dirty state tracking** for validation timing

### Accessibility

Components include:

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML structure

### Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️  Requires ES2015+ support for signal-based inputs

## Examples

### Different Currency Formats

```html
<!-- US Dollar -->
<app-input-currency currency="USD" currencySymbol="$" [maxDecimals]="2">
<!-- Output: $ 1,234.56 USD -->

<!-- Euro -->
<app-input-currency currency="EUR" currencySymbol="€" [maxDecimals]="2">
<!-- Output: € 1,234.56 EUR -->

<!-- Vietnamese Dong -->
<app-input-currency currency="VND" currencySymbol="đ" [maxDecimals]="0">
<!-- Output: đ 1,234,567 VND -->
```

### Validation Scenarios

```html
<!-- Price range validation -->
<app-input-currency 
  [min]="0" 
  [max]="999999"
  currency="USD" 
  currencySymbol="$">
<!-- Automatically constrains input between 0 and 999,999 -->

<!-- Allow negative values (debt/credit scenarios) -->
<app-input-currency 
  [min]="-50000" 
  [max]="50000"
  currency="USD" 
  currencySymbol="$">
<!-- Allows range from -50,000 to +50,000 -->
```

## Troubleshooting

### Common Issues

1. **Cursor jumping**: Ensure directive is properly handling cursor position calculations
2. **Form validation**: Check that min/max constraints align with form validators
3. **Decimal precision**: Verify `maxDecimals` setting matches your precision requirements
4. **Negative numbers**: Ensure `min` value allows negative range if needed

### Performance Considerations

- Components use `OnPush` change detection strategy
- Formatting operations are optimized for real-time input
- Cursor position calculations are cached where possible
