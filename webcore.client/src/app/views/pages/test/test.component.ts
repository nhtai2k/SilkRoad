import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantDateTimeComponent, ParticipantEmailComponent, ParticipantNumberComponent, ParticipantPhoneComponent, ParticipantTextAreaComponent, ParticipantTextComponent } from '@components/participant-fields';
import { ParticipantInfoConfigModel } from '@models/survey-models/participant-info-config.model';
import { EFieldTypes } from '@common/global';


@Component({
  selector: 'app-test',
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
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  //#region Attributes & Inputs
  selectedLanguage: string = 'EN';
  participantFields: ParticipantInfoConfigModel[] = [
    {
      id: 'full_name',
      surveyFormId: 1,
      fieldNameEN: 'Full Name',
      fieldNameVN: 'Họ và tên',
      placeholderEN: 'Enter your full name',
      placeholderVN: 'Nhập họ và tên của bạn',
      typeId: EFieldTypes.Text,
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
      placeholderEN: 'Enter your email address',
      placeholderVN: 'Nhập địa chỉ email của bạn',
      typeId: EFieldTypes.Email,
      priority: 2,
      minLength: 0,
      maxLength: 255,
      isRequired: true
    }
  ];
  participantForm!: FormGroup;
  fieldTypes = EFieldTypes;
  //#endregion

  //#region Constructor & Configurations
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


      formControls[field.id] = ['', validators];
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

  trackByField(index: number, field: ParticipantInfoConfigModel): any {
    return field.id || field.priority;
  }
  //#endregion

  onSubmit() {
    if (this.participantForm.valid) {
      const formData = this.participantForm.value;
      console.log('Participant form data:', formData);
      // Handle form submission here
    } else {
      console.log('Mark all fields as touched to show validation errors');

      // Mark all fields as touched to show validation errors
      Object.keys(this.participantForm.controls).forEach(key => {
        this.participantForm.get(key)?.markAsTouched();
      });
    }
  }
    resetForm() {
    this.participantForm.reset();
  }
}
