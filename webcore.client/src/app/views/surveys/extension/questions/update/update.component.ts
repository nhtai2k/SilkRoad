import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EColors } from '@common/global';
import { PredefinedAnswerModel } from '@models/survey-models/predefined-answer.model';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { QuestionTypeModel } from '@models/survey-models/question-type.model';
import { ToastService } from '@services/helper-services/toast.service';
import { QuestionGroupService } from '@services/survey-services/question-group.service';
import { QuestionTypeService } from '@services/survey-services/question-type.service';
import { QuestionService } from '@services/survey-services/question.service';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormCheckComponent, FormCheckInputDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective, TemplateIdDirective } from '@coreui/angular';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-update',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, CardComponent, 
    FormSelectDirective, CardBodyComponent, AccordionButtonDirective,
      AccordionComponent, AccordionItemComponent, TemplateIdDirective,
      TableDirective, RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  questionGroupList: QuestionGroupModel[] = [];
  questionTypeList: QuestionTypeModel[] = [];
  predefinedAnswerList: PredefinedAnswerModel[] = [];
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  updateByIndex: number = 0;
  deleteByIndex: number = 0;
  questionForm: FormGroup = new FormGroup({
    id: new FormControl(-1),
    questionTypeId: new FormControl(-1, Validators.min(1)),
    questionGroupId: new FormControl(-1, Validators.min(1)),
    chartLabel: new FormControl('', Validators.required),
    nameEN: new FormControl('', Validators.required),
    nameVN: new FormControl('', Validators.required),
    description: new FormControl(''),
  });
  createForm: FormGroup = new FormGroup({
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
    point: new FormControl(1, Validators.min(1)),
    description: new FormControl(''),
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(-1),
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
    point: new FormControl(1, Validators.min(1)),
    description: new FormControl(''),
  });
  constructor(
      private route: ActivatedRoute,
    private questionGroupService: QuestionGroupService,
    private questionTypeService: QuestionTypeService,
    private questionService: QuestionService,
    private toastService: ToastService,
    private router: Router) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.questionService.getById(id).subscribe((res) => {
      this.questionForm.patchValue(res.data);
      this.predefinedAnswerList = res.data.predefinedAnswers;
    });

    this.questionGroupService.getAllActive().subscribe((res) => {
      this.questionGroupList = res.data;
    });
    this.questionTypeService.getAll().subscribe((res) => {
      this.questionTypeList = res.data;
    });
  }
  onSubmit() {
    const question = this.questionForm.value;
    question.predefinedAnswers = this.predefinedAnswerList;
    this.questionService.update(question).subscribe((res) => {
      this.toastService.showToast(EColors.success, res.message);
      this.router.navigate(['/surveys/extend-survey/questions']);
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }

  get questionTypeId() { return this.questionForm.get('questionTypeId'); }
  get questionGroupId() { return this.questionForm.get('questionGroupId'); }
  get chartLabel() { return this.questionForm.get('chartLabel'); }
  get nameEN() { return this.questionForm.get('nameEN'); }
  get nameVN() { return this.questionForm.get('nameVN'); }
  get description() { return this.questionForm.get('description'); }
  //#region  Create Form
  onSubmitCreateForm() {
    this.predefinedAnswerList.push(this.createForm.value);
    this.toastService.showToast(EColors.success, "Create Predefined Answer Success!");
    this.toggleLiveCreateModel();
    this.createForm.reset();
    this.createForm.patchValue({"point": 1});
  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }

  get nameENCreateForm() { return this.createForm.get('nameEN'); }
  get nameVNCreateForm() { return this.createForm.get('nameVN'); }
  get pointCreateForm() { return this.createForm.get('point'); }
  get descriptionCreateForm() { return this.createForm.get('description'); }

  //#endregion
  //#region  Update Form
  updateData(index: number) {
    this.updateByIndex = index;
    this.updateForm.patchValue(this.predefinedAnswerList[index]);
    this.toggleLiveUpdateModel();
  }
  onSubmitUpdateForm() {
    this.predefinedAnswerList[this.updateByIndex] = this.updateForm.value;
    this.toastService.showToast(EColors.success, "Update Predefined Answer Success!");
    this.toggleLiveUpdateModel();
    this.updateForm.reset();
    this.updateForm.patchValue({"point": 1});
  }

  toggleLiveUpdateModel() {
    this.visibleUpdateModal = !this.visibleUpdateModal;
  }

  handleLiveUpdateModelChange(event: any) {
    this.visibleUpdateModal = event;
  }

  get nameENUpdateForm() { return this.updateForm.get('nameEN'); }
  get nameVNUpdateForm() { return this.updateForm.get('nameVN'); }
  get pointUpdateForm() { return this.updateForm.get('point'); }
  get descriptionUpdateForm() { return this.updateForm.get('description'); }

  //#endregion
  //#region Delete
  deleteData(index: number) {
    this.deleteByIndex = index;
    this.toggleLiveDelete();
  }
  deleteDataConfirm() {
    this.predefinedAnswerList.splice(this.deleteByIndex, 1);
    this.toastService.showToast(EColors.success, "Delete Predefined Answer Success!");
    this.toggleLiveDelete();
  }
  toggleLiveDelete() {
    this.visibleDelete = !this.visibleDelete;
  }

  handleLiveDeleteChange(event: any) {
    this.visibleDelete = event;
  }
  //#endregion

}
