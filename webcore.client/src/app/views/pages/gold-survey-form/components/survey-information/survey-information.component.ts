import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';

@Component({
  selector: 'app-survey-information',
  imports: [FormControlDirective, FormLabelDirective, FormDirective, ReactiveFormsModule],
  templateUrl: './survey-information.component.html',
  styleUrl: './survey-information.component.scss'
})
export class SurveyInformationComponent implements OnInit {
  language = input<string>();
  initSurveyForm = input<SurveyFormModel | null>();
  onUpdateCurrentParticipantId = output<string>();
  surveyForm: SurveyFormModel | null = null;

  participantForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')])
  });

  ngOnInit(): void {
    this.surveyForm = this.initSurveyForm() || null;
    console.log('Initialized survey form:', this.surveyForm);

  }

  onSubmit(): void {
    if (this.participantForm.valid) {
      console.log('Participant Info:', this.participantForm.value);
      // Here you can handle the submission logic, e.g., send data to the server
      
          this.onUpdateCurrentParticipantId.emit('some-generated-participant-id');
    }
  }

  get fullName() { return this.participantForm.get('fullName'); }
  get email() { return this.participantForm.get('email'); }
  get phoneNumber() { return this.participantForm.get('phoneNumber'); }

}
