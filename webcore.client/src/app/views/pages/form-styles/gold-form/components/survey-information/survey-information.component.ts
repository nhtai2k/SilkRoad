import { Component, input, OnInit, output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EFieldTypes, ELanguages } from '@common/global';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { ParticipantInfoComponent, ParticipantInfoConfigModel } from '../../../participant-info';
import { initializeParticipantModel, ParticipantModel } from '@models/survey-models/participant.model';
import { ParticipantInfoModel } from '@models/survey-models/participant-info.model';
import { ParticipantService } from '@services/survey-services/participant.service';

@Component({
  selector: 'app-survey-information',
  imports: [FormControlDirective, FormLabelDirective, FormDirective, ReactiveFormsModule, ParticipantInfoComponent],
  templateUrl: './survey-information.component.html',
  styleUrl: './survey-information.component.scss'
})
export class SurveyInformationComponent implements OnInit {
  @ViewChild('participantInfoComponent') participantInfoComponent!: ParticipantInfoComponent;
  eLanguages = ELanguages;
  selectedLanguage = input<string>();
  initSurveyForm = input<SurveyFormModel | null>();
  onUpdateCurrentParticipantId = output<string>();

  surveyForm: SurveyFormModel | null = null;
  participantForm: ParticipantModel = initializeParticipantModel();
  participantInfos: ParticipantInfoModel[] = [];

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.surveyForm = this.initSurveyForm() || null;
    this.participantForm.surveyFormId = this.surveyForm?.id || 0;
  }

  startTheSurvey(): void {
    if(this.surveyForm?.participantInfoConfigs && this.surveyForm.participantInfoConfigs.length > 0) {
      if(this.participantInfoComponent.participantForm.valid) {
        const participantData = this.participantInfoComponent.participantForm.value;
        this.participantForm.participantInfos = this.mapParticipantDataToInfoModels(
          participantData,
          this.surveyForm.participantInfoConfigs
        );
        this.participantService.initParticipant(this.participantForm).subscribe({
          next: (res) => {
            const participant = res.data;
            this.onUpdateCurrentParticipantId.emit(participant.id || '');
          },
          error: (err) => {
            console.error('Error initializing participant:', err);
          }
        });
      }else{
        this.participantInfoComponent.supportMarkAsTouched();
      }
      
    }else{
      console.log('No participant info required, starting survey directly.');
    }
    // this.onUpdateCurrentParticipantId.emit('some-generated-participant-id');
  }

  mapParticipantDataToInfoModels(
    participantData: Record<string, any>,
    participantInfoConfigs: ParticipantInfoConfigModel[],
  ): ParticipantInfoModel[] {
    const result: ParticipantInfoModel[] = [];

    for (const config of participantInfoConfigs) {
      if (!config.id) continue; // bỏ qua nếu thiếu id
      const rawValue = participantData[config.id];

      // if (rawValue === undefined || rawValue === null || rawValue === "") continue;

      const info: ParticipantInfoModel = {
        participantInfoConfigId: config.id,
      };

      if (config.typeId === EFieldTypes.TextArea || config.typeId === EFieldTypes.Text || config.typeId === EFieldTypes.PhoneNumber || config.typeId === EFieldTypes.Email) {
          info.textValue = String(rawValue);
      } else if (config.typeId === EFieldTypes.Number) {
          const num = Number(rawValue);
          if (!isNaN(num)) info.numberValue = num;
      } else if (config.typeId === EFieldTypes.Date) {
          const date = new Date(rawValue);
          if (!isNaN(date.getTime())) info.dateValue = date;
      }

      result.push(info);
    }

    console.log('Mapped Participant Info Models:', result);

    return result;
  }
  
}
