import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { ELanguages, EQuestionTypes } from '@common/global';
import { SurveyInformationComponent } from './components/survey-information/survey-information.component';
import { SurveyContentComponent } from './components/survey-content/survey-content.component';
import { AlignDirective } from "@coreui/angular";
import { AnswerModel } from '@models/survey-models/answer.model';

@Component({
  selector: 'app-gold-survey-form',
  imports: [CommonModule, ReactiveFormsModule, SurveyInformationComponent, SurveyContentComponent, AlignDirective],
  templateUrl: './gold-survey-form.component.html',
  styleUrl: './gold-survey-form.component.scss'
})
export class GoldSurveyFormComponent implements OnInit {
  eLanguages = ELanguages;
  selectedLanguage: string = ELanguages.Vietnamese;
  surveyForm: SurveyFormModel | null = null;
  questionTypes : any = EQuestionTypes;
  currentPaticipantId = signal<string>('');
  answerList: AnswerModel[] = [];

  participantForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')])
  });

  constructor(
    private route: ActivatedRoute,
    private surveyFormService: SurveyFormService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');    
    var validForm = true;
    // var validForm = this.surveyFormService.checkValidForm(surveyId);
    if (!validForm) {
      this.router.navigate(['gold-finish', surveyId]);
      return;
    }
    this.surveyFormService.getEagerById(surveyId).subscribe({
      next: (res) => {
        this.surveyForm = res.data;
      },
      error: (err) => {
        console.error('Error fetching survey form:', err);
      }
    });
  }
  onSubmit() { 
    if (this.participantForm.valid) {
      console.log('Participant Info:', this.participantForm.value);
      // Here you can handle the submission logic, e.g., send data to the server
    }
  }

  handleChangeLanguage() {
    this.selectedLanguage = this.selectedLanguage === ELanguages.Vietnamese ? ELanguages.English : ELanguages.Vietnamese;
  }
  
  onUpdateCurrentParticipantId(id: string): void {
    this.currentPaticipantId.set(id);
    console.log('Updated Participant ID:', id);
  }

  onSubmitParticipantForm(answers: AnswerModel[]): void {
    console.log('Final Submitted Answers:', answers);
    // Here you can handle the final submission logic, e.g., send data to the server
    this.router.navigate(['gold-thank-you']);
  }

  get fullName() { return this.participantForm.get('fullName'); }
  get email() { return this.participantForm.get('email'); }
  get phoneNumber() { return this.participantForm.get('phoneNumber'); }
}
