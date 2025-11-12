# Participant Info Module

A dynamic form rendering module for participant information based on configurable field definitions.

## Overview

The Participant Info module provides a flexible way to render form fields dynamically based on configuration data. It supports multiple field types, validation, and internationalization (English/Vietnamese).

## Components

### ParticipantInfoComponent

The main component that renders participant information forms dynamically.

#### Usage

```typescript
import { ParticipantInfoComponent } from './participant-info.component';

@Component({
  template: `
    <app-participant-info 
      [language]="selectedLanguage"
      [participantFiles]="participantFields">
    </app-participant-info>
  `
})
export class MyComponent {
  selectedLanguage = 'EN'; // or 'VN'
  participantFields: ParticipantInfoConfigModel[] = [
    // your field configurations
  ];
}
```

#### Inputs

- `language: string` - Language code ('EN' or 'VN')
- `participantFiles: ParticipantInfoConfigModel[]` - Array of field configurations

### Field Components

Individual field components for different input types:

- `ParticipantTextComponent` - Text input fields
- `ParticipantEmailComponent` - Email input with validation
- `ParticipantPhoneComponent` - Phone number input
- `ParticipantTextAreaComponent` - Multi-line text area
- `ParticipantDateTimeComponent` - Date/time picker
- `ParticipantNumberComponent` - Number input

## Field Types

```typescript
export enum ParticipantFieldType {
  TEXT = 1,
  EMAIL = 2,
  PHONE_NUMBER = 3,
  TEXT_AREA = 4,
  DATE_TIME = 5,
  NUMBER = 6
}
```

## Data Model

### ParticipantInfoConfigModel

```typescript
interface ParticipantInfoConfigModel {
  id?: string;                // Unique field identifier
  surveyFormId: number;       // Associated survey form ID
  fieldNameEN: string;        // Field label in English
  fieldNameVN: string;        // Field label in Vietnamese
  placeholderEN?: string;     // Placeholder text in English
  placeholderVN?: string;     // Placeholder text in Vietnamese
  typeId: number;             // Field type ID (ParticipantFieldType enum)
  priority: number;           // Display order (ascending)
  minLength: number;          // Minimum input length
  maxLength: number;          // Maximum input length
  isRequired: boolean;        // Required field flag
}
```

## Features

### 1. Dynamic Field Rendering
Fields are rendered based on their `typeId` and sorted by `priority`.

### 2. Internationalization
Supports English (`EN`) and Vietnamese (`VN`) languages for:
- Field labels (`fieldNameEN`/`fieldNameVN`)
- Placeholder text (`placeholderEN`/`placeholderVN`)
- Validation messages
- Form buttons

### 3. Form Validation
- Required field validation
- Field-specific validation (email format, phone pattern, etc.)
- Length validation (min/max length for text fields)
- Real-time validation feedback

### 4. Responsive Design
- Bootstrap-compatible styling
- Mobile-responsive layout
- Accessible form controls

### 5. Form Controls
- Submit functionality with validation
- Reset form capability
- Form state management

## Example Configuration

```typescript
const sampleFields: ParticipantInfoConfigModel[] = [
  {
    id: 'full_name',
    surveyFormId: 1,
    fieldNameEN: 'Full Name',
    fieldNameVN: 'Họ và tên',
    placeholderEN: 'Enter your full name',
    placeholderVN: 'Nhập họ và tên của bạn',
    typeId: ParticipantFieldType.TEXT,
    priority: 1,
    minLength: 2,
    maxLength: 100,
    isRequired: true
  },
  {
    id: 'email',
    surveyFormId: 1,
    fieldNameEN: 'Email Address',
    fieldNameVN: 'Địa chỉ email',
    placeholderEN: 'Enter your email',
    placeholderVN: 'Nhập email của bạn',
    typeId: ParticipantFieldType.EMAIL,
    priority: 2,
    minLength: 0,
    maxLength: 255,
    isRequired: true
  }
  // ... more fields
];
```

## Styling

The module includes comprehensive SCSS styling with:
- Form field styling
- Validation state indicators
- Responsive design
- Accessibility features
- Bootstrap compatibility

### Custom Styling

You can override styles by targeting the CSS classes:

```scss
.participant-info-container {
  // Custom container styles
}

.form-group {
  // Custom form group styles
}

.form-control {
  // Custom input styles
}
```

## Events

The component handles form submission and provides access to form data:

```typescript
onSubmit() {
  if (this.participantForm.valid) {
    const formData = this.participantForm.value;
    // Handle form data
  }
}
```

## Validation

Each field type includes appropriate validation:

- **Text/TextArea**: Required, min/max length
- **Email**: Required, email format
- **Phone**: Pattern validation
- **Number**: Min/max value validation
- **DateTime**: Date format validation

## Accessibility

- Proper ARIA labels and attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## File Structure

```
src/app/
├── core/
│   ├── components/
│   │   └── participant-fields/
│   │       ├── text.component.ts
│   │       ├── email.component.ts
│   │       ├── phone-number.component.ts
│   │       ├── text-erea.component.ts
│   │       ├── date-time.component.ts
│   │       ├── number.component.ts
│   │       └── index.ts
│   └── models/
│       └── survey-models/
│           ├── participant-info-config.model.ts
│           └── participant-field-type.enum.ts
└── views/
    └── pages/
        └── form-styles/
            └── participant-info/
                ├── participant-info.component.ts
                ├── participant-info.component.html
                ├── participant-info.component.scss
                └── participant-info-demo.component.ts
```

## Dependencies

- Angular 18+ (standalone components)
- Angular Forms (ReactiveFormsModule)
- Angular Common
- Bootstrap CSS (optional, for styling)

## Usage Tips

1. **Field Ordering**: Use the `priority` property to control field display order
2. **Required Fields**: Mark required fields with `isRequired: true`
3. **Validation**: Set appropriate `minLength` and `maxLength` values
4. **Internationalization**: Always provide both English and Vietnamese labels
5. **Accessibility**: Use descriptive field names for screen readers