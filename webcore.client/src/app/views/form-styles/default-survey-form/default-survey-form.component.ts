import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { EQuestionTypes } from '@common/global';

@Component({
  selector: 'app-default-survey-form',
  templateUrl: './default-survey-form.component.html',
  styleUrl: './default-survey-form.component.scss',
  imports: [CommonModule, FormControlDirective, FormLabelDirective, FormDirective, ReactiveFormsModule]
})
export class DefaultSurveyFormComponent {
  @Input() surveyForm!: SurveyFormModel;
  @Input() isReviewMode: boolean = false;
  language: string = 'EN';
  questionTypes : any = EQuestionTypes;

  participantForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')])
  });

  constructor(
    private route: ActivatedRoute,
    private surveyFormService: SurveyFormService
  ) { }

  onSubmit() { }

  get fullName() { return this.participantForm.get('fullname'); }
  get email() { return this.participantForm.get('email'); }
  get phoneNumber() { return this.participantForm.get('phoneNumber'); }
}
