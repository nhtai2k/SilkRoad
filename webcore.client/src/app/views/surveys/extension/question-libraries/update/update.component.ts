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
import { cilPlus, cilTrash, cilPen, cilX, cilSave, cilExitToApp } from '@coreui/icons';
import { PredefinedAnswerLibraryService } from '@services/survey-services/predefined-answer-library.service';
@Component({
  selector: 'app-update',
  imports: [FormControlDirective, FormLabelDirective, ButtonDirective, FormDirective, ReactiveFormsModule, CardComponent,
    CardBodyComponent, TableDirective, RouterLink, SelectSearchComponent, IconDirective, FormCheckComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  //#region Variables
  questionGroupList: OptionModel[] = [];
  questionTypeList: OptionModel[] = [];
  predefinedAnswerList: PredefinedAnswerLibraryModel[] = [];
  eQuestionTypes = EQuestionTypes;
  icons: any = { cilPlus, cilTrash, cilPen, cilX, cilSave, cilExitToApp };

  //visible Predefined Answer Form
  visibleCreatePredefinedAnswerForm = signal(false);
  updatePredefinedAnswerIndex = signal<number>(-1);

  updateByIndex = signal<number>(0);
  deleteByIndex = signal<number>(0);
  selectedQuestionType = signal<number>(-1);
  selectedQuestionGroup = signal<number>(-1);

  questionLibraryId = signal<any>(0);

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
    questionLibraryId: new FormControl(''),
    nameEN: new FormControl('', Validators.required),
    nameVN: new FormControl('', Validators.required),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])

  });

  updatePredefinedAnswerForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    questionLibraryId: new FormControl(0),
    nameEN: new FormControl('', Validators.required),
    nameVN: new FormControl('', Validators.required),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)])

  });
  //#endregion

  //#region Lifecycle Hooks
  constructor(
    private questionGroupLibraryService: QuestionGroupLibraryService,
    private questionTypeService: QuestionTypeService,
    private questionLibraryService: QuestionLibraryService,
    private predefinedAnswerLibraryService: PredefinedAnswerLibraryService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.questionLibraryId.set(id);
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
  getPredefinedAnswerList() {
    this.predefinedAnswerLibraryService.getByQuestionLibraryId(this.questionLibraryId()).subscribe(res => {
      this.predefinedAnswerList = res.data;
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
    this.questionForm.patchValue({ predefinedAnswerLibraries: this.predefinedAnswerList });
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
  showCreatePredefinedAnswerForm(): void {
    this.visibleCreatePredefinedAnswerForm.set(true);
    this.updatePredefinedAnswerIndex.set(-1);
  }
  hideCreatePredefinedAnswerForm(): void {
    this.visibleCreatePredefinedAnswerForm.set(false);
  }
  onSubmitCreatePredefinedAnswer(): void {
    if(this.createPredefinedAnswerForm.valid){
      this.createPredefinedAnswerForm.patchValue({ questionLibraryId: this.questionLibraryId() });
      this.predefinedAnswerLibraryService.create(this.createPredefinedAnswerForm.value).subscribe(res => {
        if(res.success){
          this.toastService.showToast(EColors.success, res.message);
          this.getPredefinedAnswerList();
          this.createPredefinedAnswerForm.reset();
          this.createPredefinedAnswerForm.patchValue({ priority: 1 });
        }
      });
    }
  }

  get nameENCreatePredefinedAnswerForm() { return this.createPredefinedAnswerForm.get('nameEN'); }
  get nameVNCreatePredefinedAnswerForm() { return this.createPredefinedAnswerForm.get('nameVN'); }
  get priorityCreatePredefinedAnswerForm() { return this.createPredefinedAnswerForm.get('priority'); }
  //#endregion

  //#region  Update Predefined Answer Form
  updatePredefinedAnswer(index: number): void {
    this.updatePredefinedAnswerIndex.set(index);
    this.visibleCreatePredefinedAnswerForm.set(false);
    const selectedPredefinedAnswer = this.predefinedAnswerList[index];
    this.updatePredefinedAnswerForm.patchValue({
      id: selectedPredefinedAnswer.id,
      questionLibraryId: selectedPredefinedAnswer.questionLibraryId,
      nameEN: selectedPredefinedAnswer.nameEN,
      nameVN: selectedPredefinedAnswer.nameVN,
      priority: selectedPredefinedAnswer.priority
    });
  }
  onSubmitUpdatePredefinedAnswer(): void {
    if(this.updatePredefinedAnswerForm.valid){
      this.predefinedAnswerLibraryService.update(this.updatePredefinedAnswerForm.value).subscribe(res => {
        if(res.success){
          this.toastService.showToast(EColors.success, res.message);
          this.getPredefinedAnswerList();
          this.updatePredefinedAnswerForm.reset({ nameEN: '', nameVN: '', priority: 1 });
                    this.updatePredefinedAnswerIndex.set(-1);
        }
      });
    }
  }

  get nameENUpdatePredefinedAnswerForm() { return this.updatePredefinedAnswerForm.get('nameEN'); }
  get nameVNUpdatePredefinedAnswerForm() { return this.updatePredefinedAnswerForm.get('nameVN'); }
  get priorityUpdatePredefinedAnswerForm() { return this.updatePredefinedAnswerForm.get('priority'); }
  //#endregion

  //#region Delete
  deletePredefinedAnswer(id: string): void {
    this.predefinedAnswerLibraryService.delete(id).subscribe(res => {
      if(res.success){
        this.toastService.showToast(EColors.success, res.message);
        this.getPredefinedAnswerList();
      }
    });
  }

  //#endregion

  onchangeQuestionType(event: any) {
    this.questionForm.patchValue({ questionTypeId: event });
    if (event == EQuestionTypes.ClosedEndedQuestion ||
      event == EQuestionTypes.HybridQuestion ||
      event == EQuestionTypes.MultipleChoiceQuestion) {
      this.showPredefinedAnswerTable.set(true);
    } else {
      this.showPredefinedAnswerTable.set(false);
    }
  }
}
