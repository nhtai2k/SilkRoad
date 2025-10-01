import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  ButtonCloseDirective, ButtonDirective, FormControlDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableDirective,
  TemplateIdDirective
} from '@coreui/angular';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { IconDirective } from '@coreui/icons-angular';
import { cilPen, cilPlus, cilTrash } from '@coreui/icons';
import { QuestionModel } from '@models/survey-models/question.model';
import { PredefinedAnswerModel } from '@models/survey-models/predefined-answer.model';
import { BookIconComponent } from "@components/icons/book-icon.component";
import { CommonModule } from '@angular/common';
import { QuestionGroupLibraryService } from '@services/survey-services/question-group-library.service';
import { OptionModel } from '@models/option.model';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { QuestionTypeService } from '@services/survey-services/question-type.service';
import { TreeSelectComponent } from "@components/selects/tree-select/tree-select.component";
import { PredefinedAnswerLibraryModel } from '@models/survey-models/predefined-answer-library.model';
import { EQuestionTypes } from '@common/global';
import { QuestionLibraryService } from '@services/survey-services/question-library.service';


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
  selector: 'app-create-helper',
  imports: [ReactiveFormsModule, ButtonDirective, CommonModule, TableDirective, IconDirective, BookIconComponent, ModalComponent, ModalHeaderComponent,
    ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, SelectSearchComponent, FormControlDirective, TreeSelectComponent,
    AccordionButtonDirective, AccordionComponent,
    AccordionItemComponent, TemplateIdDirective],
  templateUrl: './create-helper.component.html',
  styleUrl: './create.component.scss'
})

export class CreateHelperComponent implements OnInit {
  //#region Variables
  icons: any = { cilPlus, cilTrash, cilPen };

  questionGroups: QuestionGroupModel[] = [...questionGroupList];
  questions: QuestionModel[] = [...questionList];
  predefinedAnswerList: PredefinedAnswerLibraryModel[] = [];

  questionTypeList: OptionModel[] = [];
  optionList: OptionModel[] = [];
  treeOptionList: OptionModel[] = [];

  eQuestionTypes = EQuestionTypes;

  showQuestionChildrenByParentId = signal<string | null>(null);
  showPredefinedAnswerChildrenByParentId = signal<string | null>(null);
  showPredefinedAnswerTable = signal<boolean>(false);

  visibleCreateQuestionModal = signal(false);
  visibleDeleteQuestionModal = signal(false);
  visibleCreateQuestionGroupModal = signal(false);
  visibleDeleteQuestionGroupModal = signal(false);
  visibleCreatePredefinedAnswerModal = signal(false);
  visibleUpdatePredefinedAnswerModal = signal(false);

  initQuestionTypeId = signal<number>(-1);

  createQuestionGroupForm = new FormGroup({
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  createQuestionForm = new FormGroup({
    questionTypeId: new FormControl(1, [Validators.required]),
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  createPredefinedAnswerForm: FormGroup = new FormGroup({
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])
  });
    updatePredefinedAnswerForm: FormGroup = new FormGroup({
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])
  });
  //#endregion

  //#region table tree
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
    if (node.expanded) {
      this.showPredefinedAnswerChildrenByParentId.set(node.id);
    } else {
      this.showPredefinedAnswerChildrenByParentId.set(null);
    }
  }
  //#endregion

  //#region form submit
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

  onSubmitCreateQuestion(): void {
    if (this.createQuestionForm.valid) {
      const newQuestion: QuestionModel = {
        id: (this.questions.length + 1).toString(),
        questionTypeId: this.createQuestionForm.value.questionTypeId ?? 1,
        nameEN: this.createQuestionForm.value.nameEN ?? '',
        nameVN: this.createQuestionForm.value.nameVN ?? '',
        priority: this.createQuestionForm.value.priority ?? 1,
        predefinedAnswers: []
      };
      this.questions.push(newQuestion);
      this.createQuestionForm.reset({ questionTypeId: 1, nameEN: '', nameVN: '', priority: 1 });
      this.toggleCreateQuestionModal();
    } else {
      this.createQuestionForm.markAllAsTouched();
    }
  }
  //#endregion

  //#region modal
  toggleCreateQuestionModal(): void {
    this.visibleCreateQuestionModal.set(!this.visibleCreateQuestionModal());
  }
  handleCreateQuestionModalChange(event: any) {
    this.visibleCreateQuestionModal.set(event);
  }

  toggleDeleteQuestionModal(): void {
    this.visibleDeleteQuestionModal.set(!this.visibleDeleteQuestionModal());
  }
  handleDeleteQuestionModalChange(event: any) {
    this.visibleDeleteQuestionModal.set(event);
  }

  toggleCreateQuestionGroupModal(): void {
    this.visibleCreateQuestionGroupModal.set(!this.visibleCreateQuestionGroupModal());
  }
  handleCreateQuestionGroupModalChange(event: any) {
    this.visibleCreateQuestionGroupModal.set(event);
  }

  toggleDeleteQuestionGroupModal(): void {
    this.visibleDeleteQuestionGroupModal.set(!this.visibleDeleteQuestionGroupModal());
  }
  handleDeleteQuestionGroupModalChange(event: any) {
    this.visibleDeleteQuestionGroupModal.set(event);
  }

  toggleCreatePredefinedAnswerModal(): void {
    this.visibleCreatePredefinedAnswerModal.set(!this.visibleCreatePredefinedAnswerModal());
  }
  handleCreatePredefinedAnswerModalChange(event: any) {
    this.visibleCreatePredefinedAnswerModal.set(event);
  }
  toggleUpdatePredefinedAnswerModal(): void {
    this.visibleUpdatePredefinedAnswerModal.set(!this.visibleUpdatePredefinedAnswerModal());
  }
  handleUpdatePredefinedAnswerModalChange(event: any) {
    this.visibleUpdatePredefinedAnswerModal.set(event);
  }
  //#endregion

  //#region form control
  handleQuestionGroupLibraryChange(event: any): void {
    if (event != -1) {
      this.questionGroupLibraryService.getById(event).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            console.log(res.data);
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
  //#endregion

  //#region predefined answer form
  onSubmitCreatePredefinedAnswer(): void {
this.predefinedAnswerList.push(this.createPredefinedAnswerForm.value);
    this.toggleCreatePredefinedAnswerModal();
    this.createPredefinedAnswerForm.reset();
    this.createPredefinedAnswerForm.patchValue({priority: 1});
  }
  updatePredefinedAnswer(index: number): void {
    const updatedAnswer = this.updatePredefinedAnswerForm.value;
    this.predefinedAnswerList[index] = updatedAnswer;
  }
  onSubmitUpdatePredefinedAnswer(): void {
    // if (this.updatePredefinedAnswerForm.valid) {
    //   const updatedAnswer = this.updatePredefinedAnswerForm.value;
    //   this.updatePredefinedAnswer(this.selectedPredefinedAnswerIndex, updatedAnswer);
    //   this.updatePredefinedAnswerForm.reset({ nameEN: '', nameVN: '', priority: 1 });
    //   this.toggleUpdatePredefinedAnswerModal();
    // } else {
    //   this.updatePredefinedAnswerForm.markAllAsTouched();
    // }
  }
  //#endregion
}
