import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, FormControlDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableDirective} from '@coreui/angular';
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


@Component({
  selector: 'app-create-helper',
  imports: [ReactiveFormsModule, ButtonDirective, CommonModule, TableDirective, IconDirective, BookIconComponent, ModalComponent, ModalHeaderComponent,
    ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, SelectSearchComponent, FormControlDirective, TreeSelectComponent],
  templateUrl: './create-helper.component.html',
  styleUrl: './create.component.scss'
})

export class CreateHelperComponent implements OnInit {
  //#region Variables
  icons: any = { cilPlus, cilTrash, cilPen, cilX, cilSave, cilExitToApp };

  questionGroups: QuestionGroupModel[] = [];
  questions: QuestionModel[] = [];
  predefinedAnswerList: PredefinedAnswerModel[] = [];

  questionTypeList: OptionModel[] = [];
  optionList: OptionModel[] = [];
  treeOptionList: OptionModel[] = [];

  eQuestionTypes = EQuestionTypes;

  showQuestionChildrenByParentId = signal<string | null>(null);
  showPredefinedAnswerChildrenByParentId = signal<string | null>(null);
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

  initQuestionTypeId = signal<number>(-1);
  updateQuestionGroupIndex = signal<number>(-1);
  deleteQuestionGroupIndex = signal<number>(-1);
  updateQuestionIndex = signal<number>(-1);
  deleteQuestionIndex = signal<number>(-1);

  // Create Question Group Form
  createQuestionGroupForm = new FormGroup({
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)])
  });
  // Update Question Group Form
  updateQuestionGroupForm = new FormGroup({
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)])
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
    questionTypeId: new FormControl(1, [Validators.required]),
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)])
  });
  // Create Predefined Answer Form
  createPredefinedAnswerForm: FormGroup = new FormGroup({
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])
  });
  // Update Predefined Answer Form
  updatePredefinedAnswerForm: FormGroup = new FormGroup({
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])
  });
  //#endregion

  //#region Handle show table tree
  constructor(private questionGroupLibraryService: QuestionGroupLibraryService,
    private questionLibraryService: QuestionLibraryService,
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

  toggleQuestionNode(node: QuestionGroupModel): void {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.showQuestionChildrenByParentId.set(node.id);
    } else {
      this.showQuestionChildrenByParentId.set(null);
    }
  }

  togglePredefinedAnswerNode(node: QuestionModel): void {
    node.expanded = !node.expanded;
    if (node.expanded && node.id) {
      this.showPredefinedAnswerChildrenByParentId.set(node.id);
    } else {
      this.showPredefinedAnswerChildrenByParentId.set(null);
    }
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
  toggleCreateQuestionModal(): void {
    this.visibleCreateQuestionModal.set(!this.visibleCreateQuestionModal());
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
        id: (this.questionGroups.length + 1).toString(),
        nameEN: this.createQuestionGroupForm.value.nameEN ?? '',
        nameVN: this.createQuestionGroupForm.value.nameVN ?? '',
        priority: this.createQuestionGroupForm.value.priority ?? 1,
        questions: []
      };
      this.questionGroups.push(newQuestionGroup);
      this.createQuestionGroupForm.reset({ nameEN: '', nameVN: '', priority: 1 });
      this.toggleCreateQuestionGroupModal();
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
    this.updateQuestionGroupIndex.set(index);
    this.updateQuestionGroupForm.patchValue({
      nameEN: selectedQuestionGroup.nameEN,
      nameVN: selectedQuestionGroup.nameVN,
      priority: selectedQuestionGroup.priority
    });
    this.toggleUpdateQuestionGroupModal();
  }

  onSubmitUpdateQuestionGroup(): void {
    if (this.updateQuestionGroupForm.valid && this.updateQuestionGroupIndex() !== -1) {
      const index = this.updateQuestionGroupIndex();
      const selectedQuestionGroup = this.questionGroups[index];

      const updatedQuestionGroup: QuestionGroupModel = {
        ...selectedQuestionGroup,
        nameEN: this.updateQuestionGroupForm.value.nameEN ?? '',
        nameVN: this.updateQuestionGroupForm.value.nameVN ?? '',
        priority: this.updateQuestionGroupForm.value.priority ?? 1
      };

      this.questionGroups[index] = updatedQuestionGroup;
      this.updateQuestionGroupForm.reset({ nameEN: '', nameVN: '', priority: 1 });
      this.updateQuestionGroupIndex.set(-1);
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
  deleteQuestionGroup(index: number): void {
    this.deleteQuestionGroupIndex.set(index);
    this.toggleDeleteQuestionGroupModal();
  }
  confirmDeleteQuestionGroup(): void {
    const index = this.deleteQuestionGroupIndex();
    if (index !== -1) {
      this.questionGroups.splice(index, 1);
      this.deleteQuestionGroupIndex.set(-1);
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
      this.questions.push(newQuestion);
      this.createQuestionForm.reset({ questionTypeId: 1, nameEN: '', nameVN: '', priority: 1 });
      this.predefinedAnswerList = [];
      this.initQuestionTypeId.set(-1);
      this.onchangeQuestionType(this.initQuestionTypeId());
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

  updateQuestion(index: number): void {
    const selectedQuestion = this.questions[index];
    this.updateQuestionIndex.set(index);
    this.initQuestionTypeId.set(selectedQuestion.questionTypeId);
    this.updateQuestionForm.patchValue({
      questionTypeId: selectedQuestion.questionTypeId,
      nameEN: selectedQuestion.nameEN,
      nameVN: selectedQuestion.nameVN,
      priority: selectedQuestion.priority
    });

    // Set predefined answers if they exist
    if (selectedQuestion.predefinedAnswers && selectedQuestion.predefinedAnswers.length > 0) {
      this.predefinedAnswerList = [...selectedQuestion.predefinedAnswers.map((pa) => ({
        nameEN: pa.nameEN,
        nameVN: pa.nameVN,
        priority: pa.priority,
        isActive: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }))];
    } else {
      this.predefinedAnswerList = [];
    }

    this.onchangeQuestionType(selectedQuestion.questionTypeId);
    this.toggleUpdateQuestionModal();
  }

  onSubmitUpdateQuestion(): void {
    if (this.updateQuestionForm.valid && this.updateQuestionIndex() !== -1) {
      const index = this.updateQuestionIndex();
      const selectedQuestion = this.questions[index];

      const predefinedAnswers = this.predefinedAnswerList.map((pa) => ({
        nameEN: pa.nameEN,
        nameVN: pa.nameVN,
        priority: pa.priority
      }));

      const updatedQuestion: QuestionModel = {
        ...selectedQuestion,
        questionTypeId: this.updateQuestionForm.value.questionTypeId ?? 1,
        nameEN: this.updateQuestionForm.value.nameEN ?? '',
        nameVN: this.updateQuestionForm.value.nameVN ?? '',
        priority: this.updateQuestionForm.value.priority ?? 1,
        predefinedAnswers: predefinedAnswers
      };

      this.questions[index] = updatedQuestion;
      this.updateQuestionForm.reset({ questionTypeId: 1, nameEN: '', nameVN: '', priority: 1 });
      this.predefinedAnswerList = [];
      this.updateQuestionIndex.set(-1);
      this.initQuestionTypeId.set(-1);
      this.onchangeQuestionType(this.initQuestionTypeId());
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

  deleteQuestion(index: number): void {
    this.deleteQuestionIndex.set(index);
    this.toggleDeleteQuestionModal();
  }

  confirmDeleteQuestion(): void {
    const index = this.deleteQuestionIndex();
    if (index !== -1) {
      this.questions.splice(index, 1);
      this.deleteQuestionIndex.set(-1);
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
