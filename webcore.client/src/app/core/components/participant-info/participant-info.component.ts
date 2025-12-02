import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantInfoConfigModel } from '@models/survey-models/participant-info-config.model';
import { ParticipantTextComponent } from '@components/participant-fields/text.component';
import { ParticipantEmailComponent } from '@components/participant-fields/email.component';
import { ParticipantPhoneComponent } from '@components/participant-fields/phone-number.component';
import { ParticipantTextAreaComponent } from '@components/participant-fields/text-erea.component';
import { ParticipantDateTimeComponent } from '@components/participant-fields/date-time.component';
import { ParticipantNumberComponent } from '@components/participant-fields/number.component';
import { EColors, EFieldTypes } from '@common/global';
import { ParticipantInfoModel } from '@models/survey-models/participant-info.model';
import { ParticipantDateComponent } from '@components/participant-fields';
import { ToastService } from '@services/helper-services/toast.service';

@Component({
  selector: 'app-participant-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ParticipantTextComponent,
    ParticipantEmailComponent,
    ParticipantPhoneComponent,
    ParticipantTextAreaComponent,
    ParticipantDateComponent,
    ParticipantDateTimeComponent,
    ParticipantNumberComponent
],
  templateUrl: './participant-info.component.html',
  styleUrl: './participant-info.component.scss'
})
export class ParticipantInfoComponent implements OnInit {
  //#region Attributes & Inputs
  @Input() selectedLanguage: string = 'EN';
  @Input() participantFields: ParticipantInfoConfigModel[] = [];
  @Output() onSubmitParticipantInfo = new EventEmitter<ParticipantInfoModel[]>();
  participantForm!: FormGroup;
  fieldTypes = EFieldTypes;
  //#endregion

  //#region Constructor & Configurations
  constructor(private fb: FormBuilder, private toastService: ToastService) { }

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

  //#endregion

  onSubmit(): void {
    if (this.participantForm.valid) {
      const participantData = this.participantForm.value;
      const participantInfos: ParticipantInfoModel[] = [];
      this.participantFields.forEach(field => {
        const rawValue = participantData[field.id];
        if (rawValue !== undefined && rawValue !== null && rawValue !== '') {
          const info: ParticipantInfoModel = {
            participantInfoConfigId: field.id,
            typeId: field.typeId
          };
          if (field.typeId === EFieldTypes.TextArea || field.typeId === EFieldTypes.Text || field.typeId === EFieldTypes.PhoneNumber || field.typeId === EFieldTypes.Email) {
            info.textValue = String(rawValue);
          } else if (field.typeId === EFieldTypes.Number) {
            const num = Number(rawValue);
            if (!isNaN(num)) info.numberValue = num;
          } else if (field.typeId === EFieldTypes.Date) {
            const date = new Date(rawValue);
            if (!isNaN(date.getTime())) info.dateValue = date;
          }
          participantInfos.push(info);
        }else{
           const info: ParticipantInfoModel = {
            participantInfoConfigId: field.id,
            typeId: field.typeId
          };
          participantInfos.push(info);

        }
      });

      this.onSubmitParticipantInfo.emit(participantInfos);
    } else {
      // Object.keys(this.participantForm.controls).forEach(key => {
      //   this.participantForm.get(key)?.markAsTouched();
      // });
      // console.log('Participant Info Form is invalid.');
      let message = 'Please fill out all required fields correctly.';
      if (this.selectedLanguage === 'VN') {
        message = 'Vui lòng điền đầy đủ tất cả các trường bắt buộc một cách chính xác.';
      }
      this.toastService.showToast(EColors.danger, message);
    }
  }
}
