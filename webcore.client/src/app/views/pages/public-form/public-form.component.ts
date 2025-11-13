import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { EFormStyles, EQuestionTypes } from '@common/global';
import { DefaultSurveyFormComponent } from "../../form-styles/default-survey-form/default-survey-form.component";
import { GoldSurveyFormComponent } from "../../form-styles/gold-survey-form/gold-survey-form.component";
import { SilverSurveyFormComponent } from "../../form-styles/silver-survey-form/silver-survey-form.component";

@Component({
  selector: 'app-public-form',
  templateUrl: './public-form.component.html',
  styleUrl: './public-form.component.scss',
  imports: [CommonModule, ReactiveFormsModule, DefaultSurveyFormComponent, GoldSurveyFormComponent, SilverSurveyFormComponent]
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
      this.surveyFormService.getReviewFormById(surveyId).subscribe({
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
