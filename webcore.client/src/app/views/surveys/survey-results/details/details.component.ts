import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EQuestionType } from '@common/global';
import { RatingComponent } from '@components/generals/rating/rating.component';
import { FormLabelDirective, ButtonDirective, FormDirective, CardComponent, CardBodyComponent, FormControlDirective } from '@coreui/angular';
import { QuestionGroupUIModel, SurveyUIModel } from '@models/survey-models/survey-ui.model';
import { ParticipantService } from '@services/survey-services/participant.service';

@Component({
  selector: 'app-details',
  imports: [FormControlDirective, FormLabelDirective,
    ButtonDirective, FormDirective, ReactiveFormsModule,
    CardComponent, CardBodyComponent, RouterLink, RatingComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  questionGroupUIs: QuestionGroupUIModel[] = [];
  EQuestionType = EQuestionType;
  formGroup: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(private participantService: ParticipantService, private route: ActivatedRoute) {}
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.participantService.getEagerById(id).subscribe((res) => {
      this.formGroup.patchValue(res.data);
      this.questionGroupUIs = res.data.questionGroupUIs;
    });
  }
}
