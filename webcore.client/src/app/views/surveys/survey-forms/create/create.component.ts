import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, CardBodyComponent, CardComponent, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, TemplateIdDirective } from '@coreui/angular';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { SelectedQuestionModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";

@Component({
  selector: 'app-create',
  imports: [FormControlDirective, FormLabelDirective, CardComponent,
    FormCheckComponent, CardBodyComponent, ReactiveFormsModule, FormDirective,
    ButtonDirective, AccordionButtonDirective,
    AccordionComponent, AccordionItemComponent, TemplateIdDirective, RouterLink, RangeDatetimePickerComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  //#region Variables
  questionGroupList: QuestionGroupModel[] = [];
  selectedQuestions: SelectedQuestionModel[] = [];
  createForm: FormGroup = new FormGroup({
    isPeriodic: new FormControl(false),
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
  initQuestionGroupData(questionGroupList: QuestionGroupModel[]) {
    questionGroupList.forEach((questionGroup) => {
      questionGroup.questions.forEach((question) => {
        question.checked = false;
        question.priority = 1;
      });
    });
    this.questionGroupList = questionGroupList;
  }
  //#endregion
  //#region Methods
  getSelectedQuestionData() {
    this.selectedQuestions = [];
    this.questionGroupList.forEach((questionGroup) => {
      questionGroup.questions.forEach((question) => {
        if (question.checked) {
          this.selectedQuestions.push({
            ID: 0,
            questionGroupID: questionGroup.id,
            questionID: question.id,
            priority: question.priority,
            checked: question.checked
          });
        }
      });
    });
  }
  onChangePriority(event: any, questionGroupIndex: number, questionIndex: number) {
    this.questionGroupList[questionGroupIndex].questions[questionIndex].priority = event.target.value;
  }
  onCheckQuestion(questionGroupIndex: number, questionIndex: number) {
    this.questionGroupList[questionGroupIndex].questions[questionIndex].checked = !this.questionGroupList[questionGroupIndex].questions[questionIndex].checked;
  }
  onSubmit() {
    var surveyForm = this.createForm.value;
    this.getSelectedQuestionData();
    surveyForm.surveyQuestions = this.selectedQuestions;
    this.surveyFormService.create(surveyForm).subscribe((response) => {
      this.router.navigate(['/surveys/extend-survey/survey-forms']);
    });
  }

  get name() { return this.createForm.get('name'); }
  get titleEN() { return this.createForm.get('titleEN'); }
  get titleVN() { return this.createForm.get('titleVN'); }
  get startDate() { return this.createForm.get('startDate'); }
  get endDate() { return this.createForm.get('endDate'); }
  //#endregion
}
