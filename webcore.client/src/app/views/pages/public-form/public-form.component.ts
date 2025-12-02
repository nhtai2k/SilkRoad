import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { EFormStyles, EQuestionTypes } from '@common/global';
import { DefaultSurveyFormComponent } from "../../form-styles/default-survey-form/default-survey-form.component";
import { SplitSurveyFormComponent } from "../../form-styles/split-survey-form/split-survey-form.component";


@Component({
  selector: 'app-public-form',
  templateUrl: './public-form.component.html',
  styleUrl: './public-form.component.scss',
  imports: [ReactiveFormsModule, DefaultSurveyFormComponent, SplitSurveyFormComponent]
})
export class PublicFormComponent implements OnInit {
  initSurvey: SurveyFormModel | null = null;
  eFormStyles = EFormStyles;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyFormService: SurveyFormService
  ) { }

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');
    if (surveyId)
    {
      this.surveyFormService.getPublicFormById(surveyId).subscribe({
        next: (res) => {
          this.initSurvey = res.data;
        },
        error: (err) => {
          console.error('Error fetching survey form:', err);
          this.router.navigate(['/404']);
        }
      });
    }else{
      this.router.navigate(['/404']);
    }
  }
}
