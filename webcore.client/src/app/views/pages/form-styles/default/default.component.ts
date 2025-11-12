import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { ELanguages, EQuestionTypes } from '@common/global';
import { ParticipantInfoComponent } from "../participant-info";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
  imports: [CommonModule, ReactiveFormsModule, ParticipantInfoComponent]
})
export class DefaultComponent implements OnInit {
   @ViewChild('participantInfoComponent') participantInfoComponent!: ParticipantInfoComponent;
  eLanguages = ELanguages;
  selectedLanguage: string = ELanguages.Vietnamese;
  surveyForm!: SurveyFormModel;
  questionTypes: any = EQuestionTypes;

  participantForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private surveyFormService: SurveyFormService
  ) { }

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');
    this.surveyFormService.getReviewFormById(surveyId).subscribe({
      next: (res) => {
        this.surveyForm = res.data;
        console.log('Fetched survey form:', this.surveyForm);
      },
      error: (err) => {
        console.error('Error fetching survey form:', err);
      }
    });
  }

  onChangeLanguage(): void {
    this.selectedLanguage = this.selectedLanguage === ELanguages.Vietnamese ? ELanguages.English : ELanguages.Vietnamese;
    console.log('Language changed to:', this.selectedLanguage);
  }

  onStartSurvey(): void {
    if(this.surveyForm.participantInfoConfigs && this.surveyForm.participantInfoConfigs.length > 0) {
      if(this.participantInfoComponent.participantForm.valid) {
        const participantData = this.participantInfoComponent.participantForm.value;
        console.log('Participant Info Submitted:', participantData);
      }else{
        this.participantInfoComponent.supportMarkAsTouched();
      }
      
    }else{
      console.log('No participant info required, starting survey directly.');
    }
  }
}
