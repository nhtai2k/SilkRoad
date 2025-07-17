import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormCheckComponent, FormCheckInputDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective } from '@coreui/angular';
import { Params } from '@angular/router';
import { PageInformation, Pagination } from '@models/pagination.model';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { QuestionGroupService } from '@services/survey-services/question-group.service';
import { DataTableComponent } from "@components/data-table/data-table.component";
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';

@Component({
  selector: 'app-question-groups',
  imports: [ModalBodyComponent, NgFor, NgIf, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent],
  templateUrl: './question-groups.component.html',
  styleUrl: './question-groups.component.scss'
})
export class QuestionGroupsComponent {
  pageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  data: Pagination<QuestionGroupModel> = new Pagination<QuestionGroupModel>();
  createForm: FormGroup = new FormGroup({
    nameEN: new FormControl('', Validators.required),
    nameVN: new FormControl('', Validators.required),
    priority: new FormControl(1, [Validators.min(1), Validators.max(9999)]),
    isActive: new FormControl(true, Validators.required),
    description: new FormControl('')
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    nameEN: new FormControl('', Validators.required),
    nameVN: new FormControl('', Validators.required),
    priority: new FormControl(1, [Validators.min(1), Validators.max(9999)]),
    isActive: new FormControl(true, Validators.required),
    description: new FormControl('')
  });

  constructor(private questionGroupService: QuestionGroupService, private toastService: ToastService) {}
  ngOnInit() {
    this.getData();
  }
  getData() {
    const query : Params = {
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize
    }
    this.questionGroupService.getAll(query).subscribe((response) => {
      this.data = response.data;
      this.pageInformation.totalItems = response.data.totalItems;
      this.pageInformation.totalPages = response.data.totalPages;
      this.pageInformation.currentPage = response.data.currentPage;
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
  //#region  Create Form
    onSubmitCreateForm() {
      if (this.createForm.valid) {
        this.questionGroupService.create(this.createForm.value).subscribe((res) => {
          this.toggleLiveCreateModel();
          this.getData();
          this.toastService.showToast(EColors.success,res.message);
          this.createForm.reset();
          this.createForm.patchValue({priority: 1, isActive: true});
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
  
    get nameENCreateForm() { return this.createForm.get('nameEN'); }
    get nameVNCreateForm() { return this.createForm.get('nameVN'); }
    get priorityCreateForm() { return this.createForm.get('priority'); }
  
  //#endregion
  //#region  Update Form
  updateData(id: number) {
    this.questionGroupService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.questionGroupService.update(this.updateForm.value).subscribe((res) => {
        this.toggleLiveUpdateModel();
        this.toastService.showToast(EColors.success,res.message);
        this.getData();
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
  
  get nameENUpdateForm() { return this.updateForm.get('nameEN'); }
  get nameVNUpdateForm() { return this.updateForm.get('nameVN'); }
  get priorityUpdateForm() { return this.updateForm.get('priority'); }
  
  //#endregion
  //#region Delete
  deleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  deleteDataConfirm() {
    this.questionGroupService.softDelete(this.deleteById).subscribe((res) => {
      this.toggleLiveDelete();
      this.toastService.showToast(EColors.success,res.message);
      this.getData();
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
