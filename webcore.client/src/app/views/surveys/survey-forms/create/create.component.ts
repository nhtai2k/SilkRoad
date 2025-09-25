import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, CardBodyComponent, CardComponent,
   FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, TableDirective, TemplateIdDirective } from '@coreui/angular';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { SelectedQuestionModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { IconDirective } from '@coreui/icons-angular';
import { cilPlus } from '@coreui/icons';
import { QuestionModel } from '@models/survey-models/question.model';
import { PredefinedAnswerModel } from '@models/survey-models/predefined-answer.model';


const predefinedAnswerList: PredefinedAnswerModel[] = [
  { id: "1", questionId: "1", nameEN: 'Answer 1', nameVN: 'Câu trả lời 1', priority: 1 },
  { id: "2", questionId: "1", nameEN: 'Answer 2', nameVN: 'Câu trả lời 2', priority: 2 },
  { id: "3", questionId: "2", nameEN: 'Answer 3', nameVN: 'Câu trả lời 3', priority: 3 },
  { id: "4", questionId: "2", nameEN: 'Answer 4', nameVN: 'Câu trả lời 4', priority: 4 },
];

const questionList: QuestionModel[] = [
  { id: "1", questionTypeId: 1, priority: 1, nameEN: 'Question 1', nameVN: 'Câu hỏi 1', predefinedAnswers: [...predefinedAnswerList] },
  { id: "2", questionTypeId: 1, priority: 2, nameEN: 'Question 2', nameVN: 'Câu hỏi 2', predefinedAnswers: [...predefinedAnswerList] },
  { id: "3", questionTypeId: 1, priority: 3, nameEN: 'Question 3', nameVN: 'Câu hỏi 3', predefinedAnswers: [...predefinedAnswerList] },
];

const questionGroupList: QuestionGroupModel[] = [
  { id: "1", nameEN: 'Group 1', nameVN: 'Nhóm 1', priority: 1, questions: [questionList[0], questionList[1]] },
  { id: "2", nameEN: 'Group 2', nameVN: 'Nhóm 2', priority: 2, questions: [questionList[2]] },
];

@Component({
  selector: 'app-create',
  imports: [FormControlDirective, FormLabelDirective, CardComponent, CardBodyComponent, ReactiveFormsModule,
    FormDirective, ButtonDirective,
    // AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective,FormCheckComponent, 
    RouterLink, RangeDatetimePickerComponent, TableDirective, IconDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent {
  //#region Variables
  icons: any = { cilPlus };
  questionGroups: QuestionGroupModel[] = [...questionGroupList];
  questions: QuestionModel[] = [...questionList];
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    descriptionEN: new FormControl(''),
    descriptionVN: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isActive: new FormControl(true)
  });
  //#endregion

  //#region Constructor and Hooks
  constructor(
    // private questionGroupService: QuestionGroupService,
    private surveyFormService: SurveyFormService,
    private router: Router
  ) { }
  ngOnInit() {
    // this.questionGroupService.getEagerAllElements().subscribe((response) => {
    //   this.intitQuestionGroupData(response.data);
    // });
  }
  //#endregion
  onSubmit() {
  }

  get name() { return this.createForm.get('name'); }
  get titleEN() { return this.createForm.get('titleEN'); }
  get titleVN() { return this.createForm.get('titleVN'); }
  get startDate() { return this.createForm.get('startDate'); }
  get endDate() { return this.createForm.get('endDate'); }
}
