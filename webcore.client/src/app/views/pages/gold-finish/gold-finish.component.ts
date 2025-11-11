import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';

@Component({
  selector: 'app-gold-finish',
  imports: [],
  templateUrl: './gold-finish.component.html',
  styleUrl: './gold-finish.component.scss'
})
export class GoldFinishComponent implements OnInit {
  language: string = 'EN';
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
    if (this.language === 'EN') {
      this.language = 'VN';
    } else {
      this.language = 'EN';
    }
  }
}
