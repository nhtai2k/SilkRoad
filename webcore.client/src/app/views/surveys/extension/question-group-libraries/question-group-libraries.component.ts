import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { QuestionGroupLibraryModel } from '@models/survey-models/question-group-library.model';
import { QuestionGroupLibraryService } from '@services/survey-services/question-group-library.service';

@Component({
  selector: 'app-question-group-libraries',
  templateUrl: './question-group-libraries.component.html',
  styleUrl: './question-group-libraries.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, IconDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent]
})
export class QuestionGroupLibrariesComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  data: Pagination<QuestionGroupLibraryModel> = new Pagination<QuestionGroupLibraryModel>();
  trashData: Pagination<QuestionGroupLibraryModel> = new Pagination<QuestionGroupLibraryModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload };
  createForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });
  //#endregion

  constructor(private questionGroupLibraryService: QuestionGroupLibraryService,
    private toastService: ToastService) {}
  ngOnInit(): void {
    this.getData();
    this.trashPageInformation.pageSize = 5;
  }

  //#region Main Table
  getData() {
    this.questionGroupLibraryService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
    });
  }

  onPageIndexChange(index: any) {
    this.pageInformation.pageIndex = index;
    this.getData();
  }
  onPageSizeChange(size: any) {
    this.pageInformation.pageSize = size;
    this.pageInformation.pageIndex = 1;
    this.getData();
  }
  //#endregion

  //#region Trash
  getTrashData() {
    this.questionGroupLibraryService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
      this.trashData = res.data;
      this.trashPageInformation.currentPage = this.trashData.currentPage;
      this.trashPageInformation.totalItems = this.trashData.totalItems;
      this.trashPageInformation.totalPages = this.trashData.totalPages;
    });
  }
  onTrashPageIndexChange(index: any) {
    this.trashPageInformation.pageIndex = index;
    this.getTrashData();
  }
  onTrashPageSizeChange(size: any) {
    this.trashPageInformation.pageSize = size;
    this.trashPageInformation.pageIndex = 1;
    this.getTrashData();
  }
  toggleLiveTrashModal() {
    this.getTrashData();
    this.visibleTrashModal = !this.visibleTrashModal;
  }
  handleLiveTrashModalChange(event: any) {
    this.visibleTrashModal = event;
  }
  restoreData(id: number) {
    this.questionGroupLibraryService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteDataTrash(id: number) {
    this.questionGroupLibraryService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion

  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.questionGroupLibraryService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({ isActive: true });
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }

  get nameCreateForm() { return this.createForm.get('name'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.questionGroupLibraryService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.questionGroupLibraryService.update(this.updateForm.value).subscribe((res) => {
        this.toggleLiveUpdateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  toggleLiveUpdateModel() {
    this.visibleUpdateModal = !this.visibleUpdateModal;
  }

  handleLiveUpdateModelChange(event: any) {
    this.visibleUpdateModal = event;
  }

  get nameUpdateForm() { return this.updateForm.get('name'); }
  get codeUpdateForm() { return this.updateForm.get('code'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  //#endregion

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.questionGroupLibraryService.softDelete(this.deleteById).subscribe((res) => {
      this.toggleLiveDelete();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  toggleLiveDelete() {
    this.visibleDelete = !this.visibleDelete;
  }

  handleLiveDeleteChange(event: any) {
    this.visibleDelete = event;
  }
  //#endregion
}
