import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EColors, EQuestionTypes } from '@common/global';
import { ToastService } from '@services/helper-services/toast.service';
import { QuestionTypeService } from '@services/survey-services/question-type.service';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormCheckComponent, FormCheckInputDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective, TemplateIdDirective } from '@coreui/angular';
import { QuestionGroupLibraryService } from '@services/survey-services/question-group-library.service';
import { QuestionLibraryService } from '@services/survey-services/question-library.service';
import { OptionModel } from '@models/option.model';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { PredefinedAnswerLibraryModel } from '@models/survey-models/predefined-answer-library.model';
import { IconDirective } from '@coreui/icons-angular';
import { cilPlus } from '@coreui/icons';
@Component({
  selector: 'app-update',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule,
     ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, CardComponent, CardBodyComponent, AccordionButtonDirective, AccordionComponent,
      AccordionItemComponent, TemplateIdDirective, TableDirective, RouterLink, SelectSearchComponent, IconDirective, FormCheckComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  //#region Variables
  questionGroupList: OptionModel[] = [];
  questionTypeList: OptionModel[] = [];
  predefinedAnswerList: PredefinedAnswerLibraryModel[] = [];
  eQuestionTypes = EQuestionTypes;
  icons: any = { cilPlus };

  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;

  updateByIndex = signal<number>(0);
  deleteByIndex = signal<number>(0);
  selectedQuestionType = signal<number>(-1);
  selectedQuestionGroup = signal<number>(-1);

  showPredefinedAnswerTable = signal<boolean>(false);

  questionForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    questionTypeId: new FormControl(-1, Validators.min(1)),
    questionGroupLibraryId: new FormControl(-1, Validators.min(1)),
    nameEN: new FormControl(null, Validators.required),
    nameVN: new FormControl(null, Validators.required),
    note: new FormControl(null, Validators.maxLength(500)),
    predefinedAnswerLibraries: new FormControl([]),
    isActive: new FormControl(true, Validators.required),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(999)])
  });

  createPredefinedAnswerForm: FormGroup = new FormGroup({
    // id: new FormControl(''),
    // questionLibraryId: new FormControl(0),
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])

  });

  updatePredefinedAnswerForm: FormGroup = new FormGroup({
    // id: new FormControl(''),
    // questionLibraryId: new FormControl(0),
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])

  });
  //#endregion

  //#region Lifecycle Hooks
  constructor(
    private questionGroupLibraryService: QuestionGroupLibraryService,
    private questionTypeService: QuestionTypeService,
    private questionLibraryService: QuestionLibraryService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.questionGroupLibraryService.getOptionList().subscribe((res) => {
      this.questionGroupList = res.data;
    });
    this.questionTypeService.getAll().subscribe((res) => {
      this.questionTypeList = res.data;
    });
    this.questionLibraryService.getEagerLoadingById(id).subscribe(res => {
      this.questionForm.patchValue(res.data);
      this.selectedQuestionType.set(res.data.questionTypeId);
      this.selectedQuestionGroup.set(res.data.questionGroupLibraryId);
      this.onchangeQuestionType(res.data.questionTypeId);
      if (res.data.predefinedAnswerLibraries) {
        this.predefinedAnswerList = res.data.predefinedAnswerLibraries;
      }
    });
  }
  //#endregion
  
  //#region Form Submit

  onSubmit() {
    if (!this.questionForm.valid) {
      this.questionForm.markAllAsTouched();
      this.toastService.showToast(EColors.warning, "Please fill in all required fields!");
      return;
    }  
    this.questionForm.patchValue({predefinedAnswerLibraries: this.predefinedAnswerList});
    console.log(this.questionForm.value);
    this.questionLibraryService.update(this.questionForm.value).subscribe({
      next: (res) => {
        this.toastService.showToast(EColors.success, res.message);
        this.router.navigate(['/surveys/extension/question-libraries']);
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
  }

  get nameEN() { return this.questionForm.get('nameEN'); }
  get nameVN() { return this.questionForm.get('nameVN'); }
  get note() { return this.questionForm.get('note'); }
  get priority() { return this.questionForm.get('priority'); }
  //#endregion

  //#region  Create Predefined Answer Form
  onSubmitCreateForm() {
    this.predefinedAnswerList.push(this.createPredefinedAnswerForm.value);
    this.toastService.showToast(EColors.success, "Create Predefined Answer Success!");
    this.toggleLiveCreateModel();
    this.createPredefinedAnswerForm.reset();
    this.createPredefinedAnswerForm.patchValue({priority: 1});

  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }

  get nameENCreateForm() { return this.createPredefinedAnswerForm.get('nameEN'); }
  get nameVNCreateForm() { return this.createPredefinedAnswerForm.get('nameVN'); }
  get priorityCreateForm() { return this.createPredefinedAnswerForm.get('priority'); }
  //#endregion

  //#region  Update Predefined Answer Form
  updateData(index: number) {
    this.updateByIndex.set(index);
    this.updatePredefinedAnswerForm.patchValue(this.predefinedAnswerList[index]);
    this.toggleLiveUpdateModel();
  }
  onSubmitUpdateForm() {
    this.predefinedAnswerList[this.updateByIndex()] = this.updatePredefinedAnswerForm.value;
    this.toastService.showToast(EColors.success, "Update Predefined Answer Success!");
    this.toggleLiveUpdateModel();
    this.updatePredefinedAnswerForm.reset();
  }

  toggleLiveUpdateModel() {
    this.visibleUpdateModal = !this.visibleUpdateModal;
  }

  handleLiveUpdateModelChange(event: any) {
    this.visibleUpdateModal = event;
  }

  get nameENUpdateForm() { return this.updatePredefinedAnswerForm.get('nameEN'); }
  get nameVNUpdateForm() { return this.updatePredefinedAnswerForm.get('nameVN'); }
  get priorityUpdateForm() { return this.updatePredefinedAnswerForm.get('priority'); }
  //#endregion
  
  //#region Delete
  deleteData(index: number) {
    this.deleteByIndex.set(index);
    this.toggleLiveDelete();
  }
  deleteDataConfirm() {
    this.predefinedAnswerList.splice(this.deleteByIndex(), 1);
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

  onchangeQuestionType(event: any) {
    this.questionForm.patchValue({questionTypeId: event});
    if (event == EQuestionTypes.ClosedEndedQuestion ||
       event == EQuestionTypes.HybridQuestion ||
       event == EQuestionTypes.MultipleChoiceQuestion) {
        this.showPredefinedAnswerTable.set(true);
    }else{
      this.showPredefinedAnswerTable.set(false);
    }
  }
}
