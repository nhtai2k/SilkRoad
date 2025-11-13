import { Component, Input } from '@angular/core';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';

@Component({
  selector: 'app-silver-survey-form',
  imports: [],
  templateUrl: './silver-survey-form.component.html',
  styleUrl: './silver-survey-form.component.scss'
})
export class SilverSurveyFormComponent {
  @Input() surveyForm!: SurveyFormModel;
  @Input() isReviewMode: boolean = false;

}
