import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, FormControlDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableDirective } from '@coreui/angular';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { IconDirective } from '@coreui/icons-angular';
import { cilExitToApp, cilPen, cilPlus, cilSave, cilTrash, cilX } from '@coreui/icons';
import { QuestionModel } from '@models/survey-models/question.model';
import { PredefinedAnswerModel } from '@models/survey-models/predefined-answer.model';
import { BookIconComponent } from "@components/icons/book-icon.component";
import { CommonModule } from '@angular/common';
import { QuestionGroupLibraryService } from '@services/survey-services/question-group-library.service';
import { OptionModel } from '@models/option.model';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { QuestionTypeService } from '@services/survey-services/question-type.service';
import { TreeSelectComponent } from "@components/selects/tree-select/tree-select.component";
import { EQuestionTypes } from '@common/global';
import { QuestionLibraryService } from '@services/survey-services/question-library.service';
import { PredefinedAnswerService } from '@services/survey-services/predefined-answer.service';
import { QuestionService } from '@services/survey-services/question.service';
import { QuestionGroupService } from '@services/survey-services/question-group.service';
import { n } from 'node_modules/@angular/cdk/overlay-module.d-C2CxnwqT';

@Component({
  selector: 'app-update-helper',
  imports: [ReactiveFormsModule, ButtonDirective, CommonModule, TableDirective, IconDirective, BookIconComponent, ModalComponent, ModalHeaderComponent,
    ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, SelectSearchComponent, FormControlDirective, TreeSelectComponent],
  templateUrl: './update-helper.component.html',
})

export class UpdateHelperComponent implements OnInit {
  //#region Variables
  icons: any = { cilPlus, cilTrash, cilPen, cilX, cilSave, cilExitToApp };

  @Input() surveyFormId: number = -1;
  @Input() questionGroups: QuestionGroupModel[] = [];
  @Input() questions: QuestionModel[] = [];
  predefinedAnswerList: PredefinedAnswerModel[] = [];

  questionTypeList: OptionModel[] = [];
  optionList: OptionModel[] = [];
  treeOptionList: OptionModel[] = [];

  eQuestionTypes = EQuestionTypes;

  showPredefinedAnswerTable = signal<boolean>(false);
  //visible Question Group Modal
  visibleCreateQuestionGroupModal = signal(false);
  visibleUpdateQuestionGroupModal = signal(false);
  visibleDeleteQuestionGroupModal = signal(false);
  //visible Question Modal
  visibleCreateQuestionModal = signal(false);
  visibleUpdateQuestionModal = signal(false);
  visibleDeleteQuestionModal = signal(false);
  //visible Predefined Answer Form
  visibleCreatePredefinedAnswerForm = signal(false);
  updatePredefinedAnswerIndex = signal<number>(-1);
  // Init selected value for select
  initQuestionTypeId = signal<number | null>(-1);
  initQuestionGroupLibraryId = signal<number | null>(-1);
  initQuestionLibraryId = signal<number | null>(-1);
  deleteQuestionGroupId = signal<string | undefined>(undefined);
  inQuestionGroup = signal<boolean>(false);
  // updateQuestionIndex = signal<number>(-1);
  deleteQuestionId = signal<string | undefined>(undefined);
  selectedQuestionGroupId = signal<string | undefined>(undefined);

  // Create Question Group Form
  createQuestionGroupForm = new FormGroup({
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)]),
  });
  // Update Question Group Form
  updateQuestionGroupForm = new FormGroup({
    id: new FormControl(''),
    surveyFormId: new FormControl(-1),
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)]),
    questions: new FormControl<QuestionModel[]>([]),
  });
  // Create Question Form
  createQuestionForm = new FormGroup({
    questionTypeId: new FormControl(1, [Validators.required]),
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)])
  });
  // Update Question Form
  updateQuestionForm = new FormGroup({
    id: new FormControl(''),
    questionGroupId: new FormControl(''),
    surveyFormId: new FormControl(-1),
    questionTypeId: new FormControl(1, [Validators.required]),
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)])
  });
  // Create Predefined Answer Form
  createPredefinedAnswerForm: FormGroup = new FormGroup({
    nameEN: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])
  });
  // Update Predefined Answer Form
  updatePredefinedAnswerForm: FormGroup = new FormGroup({
    nameEN: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])
  });
  //#endregion

  //#region Constructor and OnInit
  constructor(private questionGroupLibraryService: QuestionGroupLibraryService,
    private questionLibraryService: QuestionLibraryService,
    private questionGroupService: QuestionGroupService,
    private questionService: QuestionService,
    private predefinedAnswerService: PredefinedAnswerService,
    private questionTypeService: QuestionTypeService) { }
  ngOnInit(): void {
    this.questionGroupLibraryService.getOptionList().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.optionList = res.data;
        }
      }
    });
    this.questionGroupLibraryService.getTreeOptionList().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.treeOptionList = res.data;
        }
      }
    });
    this.questionTypeService.getOptionList().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.questionTypeList = res.data;
        }
      }
    });
  }

  getQuestionGroup() {
    if (this.surveyFormId !== -1) {
      this.questionGroupService.getBySurveyFormId(this.surveyFormId).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.questionGroups = res.data;
          }
        }
      });
    }
  }
  getQuestion() {
    if (this.surveyFormId !== -1) {
      this.questionService.getBySurveyFormId(this.surveyFormId).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.questions = res.data;
          }
        }
      });
    }
  }

  toggleQuestionNode(node: QuestionGroupModel): void {
    node.expanded = !node.expanded;
    // if (node.expanded && node.id) {
    //   this.showQuestionChildrenByParentId.set(node.id);
    // } else {
    //   this.showQuestionChildrenByParentId.set(null);
    // }
  }

  togglePredefinedAnswerNode(node: QuestionModel): void {
    node.expanded = !node.expanded;
    // if (node.expanded && node.id) {
    //   this.showPredefinedAnswerChildrenByParentId.set(node.id);
    // } else {
    //   this.showPredefinedAnswerChildrenByParentId.set(null);
    // }
  }
  //#endregion

  //#region Manage show and hide modal
  //#region Question Group Modal
  // Create Question Group Modal
  toggleCreateQuestionGroupModal(): void {
    this.visibleCreateQuestionGroupModal.set(!this.visibleCreateQuestionGroupModal());
  }
  handleCreateQuestionGroupModalChange(event: any) {
    this.visibleCreateQuestionGroupModal.set(event);
  }
  // Update Question Group Modal
  toggleUpdateQuestionGroupModal(): void {
    this.visibleUpdateQuestionGroupModal.set(!this.visibleUpdateQuestionGroupModal());
  }
  handleUpdateQuestionGroupModalChange(event: any) {
    this.visibleUpdateQuestionGroupModal.set(event);
  }
  // Delete Question Group Modal
  toggleDeleteQuestionGroupModal(): void {
    this.visibleDeleteQuestionGroupModal.set(!this.visibleDeleteQuestionGroupModal());
  }
  handleDeleteQuestionGroupModalChange(event: any) {
    this.visibleDeleteQuestionGroupModal.set(event);
  }
  //#endregion

  //#region Question Modal
  // Create Question Modal
  toggleCreateQuestionModal(questionGroupId: string | undefined = undefined): void {
    this.visibleCreateQuestionModal.set(!this.visibleCreateQuestionModal());
    this.selectedQuestionGroupId.set(questionGroupId);
  }
  handleCreateQuestionModalChange(event: any) {
    this.visibleCreateQuestionModal.set(event);
  }
  // Update Question Modal
  toggleUpdateQuestionModal(): void {
    this.visibleUpdateQuestionModal.set(!this.visibleUpdateQuestionModal());
  }
  handleUpdateQuestionModalChange(event: any) {
    this.visibleUpdateQuestionModal.set(event);
  }
  // Delete Question Modal
  toggleDeleteQuestionModal(): void {
    this.visibleDeleteQuestionModal.set(!this.visibleDeleteQuestionModal());
  }
  handleDeleteQuestionModalChange(event: any) {
    this.visibleDeleteQuestionModal.set(event);
  }
  //#endregion
  //#endregion

  //#region Handle question group form
  handleQuestionGroupLibraryChange(event: any): void {
    if (event != -1) {
      this.questionGroupLibraryService.getById(event).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            // console.log(res.data);
            const newQuestionGroup = res.data;
            this.createQuestionGroupForm.patchValue({
              nameEN: newQuestionGroup.nameEN,
              nameVN: newQuestionGroup.nameVN,
              priority: newQuestionGroup.priority
            });
          }
        }
      });
    }
  }

  onSubmitCreateQuestionGroup(): void {
    if (this.createQuestionGroupForm.valid) {
      const newQuestionGroup: QuestionGroupModel = {
        surveyFormId: this.surveyFormId,
        nameEN: this.createQuestionGroupForm.value.nameEN ?? '',
        nameVN: this.createQuestionGroupForm.value.nameVN ?? '',
        priority: this.createQuestionGroupForm.value.priority ?? 1,
        questions: []
      };
      this.questionGroupService.create(newQuestionGroup).subscribe({
        next: (res) => {
          if (res.success) {
            this.getQuestionGroup();
            this.createQuestionGroupForm.reset({ nameEN: '', nameVN: '', priority: 1 });
            this.toggleCreateQuestionGroupModal();
          }
        }
      });
      // Reset the select component
      this.initQuestionGroupLibraryId.set(null);
      setTimeout(() => this.initQuestionGroupLibraryId.set(-1), 0);
    } else {
      this.createQuestionGroupForm.markAllAsTouched();
    }
  }

  get nameENCreateQuestionGroupForm() {
    return this.createQuestionGroupForm.get('nameEN');
  }
  get nameVNCreateQuestionGroupForm() {
    return this.createQuestionGroupForm.get('nameVN');
  }
  get priorityCreateQuestionGroupForm() {
    return this.createQuestionGroupForm.get('priority');
  }

  updateQuestionGroup(index: number): void {
    const selectedQuestionGroup = this.questionGroups[index];
    // this.updateQuestionGroupIndex.set(index);
    this.updateQuestionGroupForm.patchValue(selectedQuestionGroup);
    this.toggleUpdateQuestionGroupModal();
  }

  onSubmitUpdateQuestionGroup(): void {
    if (this.updateQuestionGroupForm.valid) {
      const questionGroup: QuestionGroupModel = {
        id: this.updateQuestionGroupForm.value.id ?? '',
        surveyFormId: this.surveyFormId,
        nameEN: this.updateQuestionGroupForm.value.nameEN ?? '',
        nameVN: this.updateQuestionGroupForm.value.nameVN ?? '',
        priority: this.updateQuestionGroupForm.value.priority ?? 1,
        questions: []
      };
      this.questionGroupService.update(questionGroup).subscribe({
        next: (res) => {
          if (res.success) {
            this.getQuestionGroup();
          }
        }
      });
      this.toggleUpdateQuestionGroupModal();
    } else {
      this.updateQuestionGroupForm.markAllAsTouched();
    }
  }

  get nameENUpdateQuestionGroupForm() {
    return this.updateQuestionGroupForm.get('nameEN');
  }
  get nameVNUpdateQuestionGroupForm() {
    return this.updateQuestionGroupForm.get('nameVN');
  }
  get priorityUpdateQuestionGroupForm() {
    return this.updateQuestionGroupForm.get('priority');
  }

  deleteQuestionGroup(id: string | undefined): void {
    this.deleteQuestionGroupId.set(id);
    this.toggleDeleteQuestionGroupModal();
  }

  confirmDeleteQuestionGroup(): void {
    const id = this.deleteQuestionGroupId();
    if(id){
      this.questionGroupService.delete(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.getQuestionGroup();
          }
        }
      });
    }
    this.toggleDeleteQuestionGroupModal();
  }

  //#endregion

  //#region Handle question form
  handleQuestionLibraryChange(event: any): void {
    if (event != -1) {
      this.questionLibraryService.getEagerLoadingById(event).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            const newQuestion = res.data;
            this.initQuestionTypeId.set(newQuestion.questionTypeId);
            this.createQuestionForm.patchValue({
              questionTypeId: newQuestion.questionTypeId,
              nameEN: newQuestion.nameEN,
              nameVN: newQuestion.nameVN,
              priority: newQuestion.priority
            });
            if (newQuestion.predefinedAnswerLibraries && newQuestion.predefinedAnswerLibraries.length > 0) {
              this.predefinedAnswerList = [...newQuestion.predefinedAnswerLibraries];
            } else {
              this.predefinedAnswerList = [];
            }
            this.onchangeQuestionType(newQuestion.questionTypeId);
          }
        }
      });
    }
  }

  onchangeQuestionType(event: any) {
    // this.questionForm.patchValue({questionTypeId: event});
    if (event == EQuestionTypes.ClosedEndedQuestion ||
      event == EQuestionTypes.HybridQuestion ||
      event == EQuestionTypes.MultipleChoiceQuestion) {
      this.showPredefinedAnswerTable.set(true);
    } else {
      this.showPredefinedAnswerTable.set(false);
    }
  }

  onSubmitCreateQuestion(): void {
    if (this.createQuestionForm.valid) {
      const predefinedAnswers = this.predefinedAnswerList.map((pa) => ({
        nameEN: pa.nameEN,
        nameVN: pa.nameVN,
        priority: pa.priority
      }));
      const newQuestion: QuestionModel = {
        questionTypeId: this.createQuestionForm.value.questionTypeId ?? 1,
        nameEN: this.createQuestionForm.value.nameEN ?? '',
        nameVN: this.createQuestionForm.value.nameVN ?? '',
        priority: this.createQuestionForm.value.priority ?? 1,
        predefinedAnswers: predefinedAnswers
      };
      // If a question group is selected, add the question to that group
      if (this.selectedQuestionGroupId() !== undefined) {
        const groupId = this.selectedQuestionGroupId();
        newQuestion.questionGroupId = groupId;
        this.questionService.create(newQuestion).subscribe({
          next: (res) => {
            if (res.success) {
              this.getQuestionGroup();
            }
          }
        });
      } else {
        newQuestion.surveyFormId = this.surveyFormId;
        this.questionService.create(newQuestion).subscribe({
          next: (res) => {
            if (res.success) {
              this.getQuestion();
            }
          }
        });
      }
      this.createQuestionForm.reset({ questionTypeId: 1, nameEN: '', nameVN: '', priority: 1 });
      this.predefinedAnswerList = [];
      // Reset the question type select component
      this.initQuestionTypeId.set(null);
      setTimeout(() => this.initQuestionTypeId.set(-1), 0);
      // Reset the question library select component
      this.initQuestionLibraryId.set(null);
      setTimeout(() => this.initQuestionLibraryId.set(-1), 0);
      this.onchangeQuestionType(-1);
      this.toggleCreateQuestionModal();

    } else {
      this.createQuestionForm.markAllAsTouched();
    }
  }
  get nameENCreateQuestionForm() {
    return this.createQuestionForm.get('nameEN');
  }
  get nameVNCreateQuestionForm() {
    return this.createQuestionForm.get('nameVN');
  }
  get priorityCreateQuestionForm() {
    return this.createQuestionForm.get('priority');
  }

  updateQuestion(id: string, inQuestionGroup: boolean): void {
    this.inQuestionGroup.set(inQuestionGroup);
    this.questionService.getEagerLoadingById(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.updateQuestionForm.patchValue(res.data);
          // Set predefined answers if they exist
          if (res.data.predefinedAnswers && res.data.predefinedAnswers.length > 0) {
            this.predefinedAnswerList = [...res.data.predefinedAnswers];
          } else {
            this.predefinedAnswerList = [];
          }
          this.onchangeQuestionType(res.data.questionTypeId);
          this.toggleUpdateQuestionModal();
        }
      }
    });
  }

  onSubmitUpdateQuestion(): void {
    if (this.updateQuestionForm.valid) {
      const question: QuestionModel = {
        id: this.updateQuestionForm.value.id ?? '',
        surveyFormId: this.surveyFormId,
        questionGroupId: this.updateQuestionForm.value.questionGroupId ?? '',
        questionTypeId: this.updateQuestionForm.value.questionTypeId ?? 1,
        nameEN: this.updateQuestionForm.value.nameEN ?? '',
        nameVN: this.updateQuestionForm.value.nameVN ?? '',
        priority: this.updateQuestionForm.value.priority ?? 1
      };
      this.questionService.update(question).subscribe({
        next: (res) => {
          if (res.success) {
            if (this.inQuestionGroup()) {
              this.getQuestionGroup();
            } else {
              this.getQuestion();
            }
            this.updateQuestionForm.reset({ questionTypeId: 1, nameEN: '', nameVN: '', priority: 1 });
            this.predefinedAnswerList = [];
          }
        }
      });
      // Reset the question type select component
      this.initQuestionTypeId.set(null);
      setTimeout(() => this.initQuestionTypeId.set(-1), 0);
      this.onchangeQuestionType(-1);
      this.toggleUpdateQuestionModal();
    } else {
      this.updateQuestionForm.markAllAsTouched();
    }
  }

  get nameENUpdateQuestionForm() {
    return this.updateQuestionForm.get('nameEN');
  }
  get nameVNUpdateQuestionForm() {
    return this.updateQuestionForm.get('nameVN');
  }
  get priorityUpdateQuestionForm() {
    return this.updateQuestionForm.get('priority');
  }

  deleteQuestion(id: string, inQuestionGroup: boolean): void {
    this.deleteQuestionId.set(id);
    this.inQuestionGroup.set(inQuestionGroup);
    this.toggleDeleteQuestionModal();
  }

  confirmDeleteQuestion(): void {
    const id = this.deleteQuestionId();
    if(id){
      this.questionService.delete(id).subscribe({
        next: (res) => {
          if (res.success) {
            if (this.inQuestionGroup()) {
              this.getQuestionGroup();
            } else {
            this.getQuestion();
            }
          }
        }
      });
    }
    this.toggleDeleteQuestionModal();
  }
  //#endregion

  //#region predefined answer form
  showCreatePredefinedAnswerForm(): void {
    this.visibleCreatePredefinedAnswerForm.set(true);
    this.updatePredefinedAnswerIndex.set(-1);
  }
  hideCreatePredefinedAnswerForm(): void {
    this.visibleCreatePredefinedAnswerForm.set(false);
  }


  onSubmitCreatePredefinedAnswer(): void {
    this.predefinedAnswerList.push(this.createPredefinedAnswerForm.value);
    // this.toggleCreatePredefinedAnswerModal();
    this.createPredefinedAnswerForm.reset();
    this.createPredefinedAnswerForm.patchValue({ priority: 1 });
  }
  get nameENCreatePredefinedAnswerForm() {
    return this.createPredefinedAnswerForm.get('nameEN');
  }
  get nameVNCreatePredefinedAnswerForm() {
    return this.createPredefinedAnswerForm.get('nameVN');
  }
  get priorityCreatePredefinedAnswerForm() {
    return this.createPredefinedAnswerForm.get('priority');
  }

  updatePredefinedAnswer(index: number): void {
    this.updatePredefinedAnswerIndex.set(index);
    this.visibleCreatePredefinedAnswerForm.set(false);
    const selectedPredefinedAnswer = this.predefinedAnswerList[index];
    this.updatePredefinedAnswerForm.patchValue({
      nameEN: selectedPredefinedAnswer.nameEN,
      nameVN: selectedPredefinedAnswer.nameVN,
      priority: selectedPredefinedAnswer.priority
    });
    // this.toggleUpdatePredefinedAnswerModal();
  }
  onSubmitUpdatePredefinedAnswer(): void {
    if (this.updatePredefinedAnswerIndex() !== -1) {
      const index = this.updatePredefinedAnswerIndex();
      const selectedPredefinedAnswer = this.predefinedAnswerList[index];

      const updatedPredefinedAnswer: PredefinedAnswerModel = {
        ...selectedPredefinedAnswer,
        nameEN: this.updatePredefinedAnswerForm.value.nameEN ?? '',
        nameVN: this.updatePredefinedAnswerForm.value.nameVN ?? '',
        priority: this.updatePredefinedAnswerForm.value.priority ?? 1
      };

      this.predefinedAnswerList[index] = updatedPredefinedAnswer;
      this.updatePredefinedAnswerForm.reset({ nameEN: '', nameVN: '', priority: 1 });
      this.updatePredefinedAnswerIndex.set(-1);
    }
  }
  get nameENUpdatePredefinedAnswerForm() {
    return this.updatePredefinedAnswerForm.get('nameEN');
  }
  get nameVNUpdatePredefinedAnswerForm() {
    return this.updatePredefinedAnswerForm.get('nameVN');
  }
  get priorityUpdatePredefinedAnswerForm() {
    return this.updatePredefinedAnswerForm.get('priority');
  }

  deletePredefinedAnswer(index: number): void {
    this.predefinedAnswerList.splice(index, 1);
  }
  //#endregion
}
