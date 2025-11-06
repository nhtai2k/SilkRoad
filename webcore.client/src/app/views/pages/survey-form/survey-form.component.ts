import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { EQuestionTypes } from '@common/global';

@Component({
  selector: 'app-survey-form',
  imports: [CommonModule, FormControlDirective, FormLabelDirective, FormDirective, ReactiveFormsModule],
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  language: string = 'en';
  surveyForm: SurveyFormModel | null = null;
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

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');
    this.surveyFormService.getEagerById(surveyId).subscribe({
      next: (res) => {
        this.surveyForm = res.data;
      },
      error: (err) => {
        console.error('Error fetching survey form:', err);
      }
    });
  }
  onSubmit() { }

  get fullName() { return this.participantForm.get('fullname'); }
  get email() { return this.participantForm.get('email'); }
  get phoneNumber() { return this.participantForm.get('phoneNumber'); }
}
