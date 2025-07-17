import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, CardBodyComponent, CardComponent, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, TemplateIdDirective } from '@coreui/angular';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { SelectedQuestionModel } from '@models/survey-models/survey-form.model';
import { QuestionGroupService } from '@services/survey-services/question-group.service';
import { SurveyFormService } from '@services/survey-services/survey-form.service';

@Component({
  selector: 'app-update',
  imports: [NgFor, NgIf, FormControlDirective, FormLabelDirective, CardComponent, 
    FormCheckComponent, CardBodyComponent, ReactiveFormsModule, FormDirective,
    ButtonDirective, AccordionButtonDirective,
    AccordionComponent, AccordionItemComponent, TemplateIdDirective, RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  questionGroupList: QuestionGroupModel[] = [];
  selectedQuestions: SelectedQuestionModel[] = [];
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    isPeriodic: new FormControl(false),
    nameVN: new FormControl('', Validators.required),
    nameEN: new FormControl('', Validators.required),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    descriptionEN: new FormControl(''),
    descriptionVN: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isActive: new FormControl(true)
  });
  constructor(
    private questionGroupService: QuestionGroupService,
    private surveyFormService: SurveyFormService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.surveyFormService.geteagerByid(id).subscribe((response) => {
      this.updateForm.patchValue(response.data);
      this.updateForm.patchValue({
        "startDate": new Date(response.data.startDate).toISOString().substring(0, 16),
        "endDate": new Date(response.data.endDate).toISOString().substring(0, 16)
      })
      this.selectedQuestions = response.data.surveyQuestions;

      this.questionGroupService.getEagerAllElements().subscribe((res) => {
        this.intitQuestionGroupData(res.data, response.data.surveyQuestions);
      });
    });
  }
  intitQuestionGroupData(questionGroupList: QuestionGroupModel[], surveyQuestions: SelectedQuestionModel[]) {
    this.questionGroupList = questionGroupList.map((questionGroup) => {
      const questions = questionGroup.questions.map((question) => {
        const selectedQuestion = surveyQuestions.find((sq) => sq.questionID === question.id);
        if (selectedQuestion) {
          question.checked = true;
          question.priority = selectedQuestion.priority;
        } else {
          question.checked = false;
          question.priority = 1;
        }
        return question;
      });
      return { ...questionGroup, questions };
    });
  }
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
    var surveyForm = this.updateForm.value;
    this.getSelectedQuestionData();
    surveyForm.surveyQuestions = this.selectedQuestions;
    this.surveyFormService.update(surveyForm).subscribe((response) => {
      this.router.navigate(['/surveys/extend-survey/survey-forms']);
    });
  }

  get nameEN() { return this.updateForm.get('nameEN'); }
  get nameVN() { return this.updateForm.get('nameVN'); }
  get titleEN() { return this.updateForm.get('titleEN'); }
  get titleVN() { return this.updateForm.get('titleVN'); }
  get startDate() { return this.updateForm.get('startDate'); }
  get endDate() { return this.updateForm.get('endDate'); }
}
