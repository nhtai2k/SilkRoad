import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantInfoConfigModel } from '@models/survey-models/participant-info-config.model';
import { ParticipantTextComponent } from '@components/participant-fields/text.component';
import { ParticipantEmailComponent } from '@components/participant-fields/email.component';
import { ParticipantPhoneComponent } from '@components/participant-fields/phone-number.component';
import { ParticipantTextAreaComponent } from '@components/participant-fields/text-erea.component';
import { ParticipantDateTimeComponent } from '@components/participant-fields/date-time.component';
import { ParticipantNumberComponent } from '@components/participant-fields/number.component';
import { EFieldTypes } from '@common/global';

@Component({
  selector: 'app-participant-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ParticipantTextComponent,
    ParticipantEmailComponent,
    ParticipantPhoneComponent,
    ParticipantTextAreaComponent,
    ParticipantDateTimeComponent,
    ParticipantNumberComponent
  ],
  templateUrl: './participant-info.component.html',
  styleUrl: './participant-info.component.scss'
})
export class ParticipantInfoComponent implements OnInit {
  @Input() selectedLanguage: string = 'EN';
  @Input() participantFields: ParticipantInfoConfigModel[] = [];
  participantForm!: FormGroup;
  fieldTypes = EFieldTypes;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }


  private buildForm() {
    const formControls: { [key: string]: any } = {};

    this.participantFields.forEach(field => {
      const validators = [];

      if (field.isRequired) {
        validators.push(Validators.required);
      }

      // Add field-specific validators based on type and constraints
      if (field.typeId === this.fieldTypes.Text || field.typeId === this.fieldTypes.TextArea) {
        if (field.minLength > 0) {
          validators.push(Validators.minLength(field.minLength));
        }
        if (field.maxLength > 0) {
          validators.push(Validators.maxLength(field.maxLength));
        }
      }

      formControls[field.id || `field_${field.priority}`] = ['', validators];
    });

    this.participantForm = this.fb.group(formControls);
  }

  getFieldLabel(field: ParticipantInfoConfigModel): string {
    return this.selectedLanguage === 'VN' ? field.fieldNameVN : field.fieldNameEN;
  }

  getFieldPlaceholder(field: ParticipantInfoConfigModel): string {
    if (this.selectedLanguage === 'VN' && field.placeholderVN) {
      return field.placeholderVN;
    }
    return field.placeholderEN || '';
  }

  getFieldId(field: ParticipantInfoConfigModel): string {
    return field.id || `field_${field.priority}`;
  }

  getFieldControl(field: ParticipantInfoConfigModel) {
    const fieldId = this.getFieldId(field);
    return this.participantForm.get(fieldId);
  }

  supportMarkAsTouched(): void {
    console.log('Mark all fields as touched to show validation errors');
    // Mark all fields as touched to show validation errors
    Object.keys(this.participantForm.controls).forEach(key => {
      this.participantForm.get(key)?.markAsTouched();
    });
  }

  // onSubmit() {
  //   if (this.participantForm.valid) {
  //     const formData = this.participantForm.value;
  //     console.log('Participant form data:', formData);
  //     // Handle form submission here
  //   } else {
  //     console.log('Mark all fields as touched to show validation errors');

  //     // Mark all fields as touched to show validation errors
  //     Object.keys(this.participantForm.controls).forEach(key => {
  //       this.participantForm.get(key)?.markAsTouched();
  //     });
  //   }
  // }

  resetForm() {
    this.participantForm.reset();
  }

  trackByField(index: number, field: ParticipantInfoConfigModel): any {
    return field.id || field.priority;
  }
}
