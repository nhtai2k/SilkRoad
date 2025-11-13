import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ELanguages } from '@common/global';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';

@Component({
  selector: 'app-gold-finish',
  imports: [],
  templateUrl: './gold-finish.component.html',
  styleUrl: './gold-survey-form.component.scss'
})
export class GoldFinishComponent implements OnInit {
  eLanguages = ELanguages;
  selectedLanguage: string = ELanguages.Vietnamese;
  surveyForm: SurveyFormModel | null = null;

  constructor(private route: ActivatedRoute, private surveyFormService: SurveyFormService) { }

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');
    this.surveyFormService.getById(surveyId).subscribe({
      next: (res) => {
        this.surveyForm = res.data;
      },
      error: (err) => {
        console.error('Error fetching survey form:', err);
      }
    });
  }

  handleChangeLanguage() {
    this.selectedLanguage = this.selectedLanguage === ELanguages.Vietnamese ? ELanguages.English : ELanguages.Vietnamese;
  }
}
