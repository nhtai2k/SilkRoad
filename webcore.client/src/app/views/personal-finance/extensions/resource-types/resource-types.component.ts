import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import {  ResourceTypeService } from '@services/personal-finance-services';
import { ResourceTypeModel } from '@models/personal-finance-models';
import { ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX } from '@coreui/icons';

@Component({
  selector: 'app-resource-types',
  templateUrl: './resource-types.component.html',
  styleUrl: './resource-types.component.scss',
  imports: [ModalBodyComponent, CommonModule, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective]
})
export class ResourceTypesComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleTrashModal: boolean = false;
  trashData: Pagination<ResourceTypeModel> = new Pagination<ResourceTypeModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX };
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  data: Pagination<ResourceTypeModel> = new Pagination<ResourceTypeModel>();

  createForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)])
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)])
  });

  //#endregion

  //#region Constructor & ngOnInit
  constructor(private resourceTypeService: ResourceTypeService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.resourceTypeService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
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

  onChangeMultipleOptions(event: string[], type: string) {
    if (type === 'create') {
      this.createForm.patchValue({ tags: JSON.stringify(event) });
    } else if (type === 'update') {
      this.updateForm.patchValue({ tags: JSON.stringify(event) });
    }
  }

  //#endregion

  //#region Trash
  getTrashData() {
    this.resourceTypeService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.resourceTypeService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteData(id: number) {
    this.resourceTypeService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  // showSubItems(id: number) {
  //   const current = this.visibleSubItems();
  //   this.visibleSubItems.set({ ...current, [id]: !current[id] });
  //   this.visibleSubItemId = id;
  // }
  //#endregion

  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.resourceTypeService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({ isActive: true, priority: 1 });
      }, (failure) => {
        // console.error(failure);
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
  get priorityCreateForm() { return this.createForm.get('priority'); }
  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.resourceTypeService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      //this.defaultTags = res.data.tags ? JSON.parse(res.data.tags) : [];
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.resourceTypeService.update(this.updateForm.value).subscribe((res) => {
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
  get priorityUpdateForm() { return this.updateForm.get('priority'); }
  //#endregion

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.resourceTypeService.softDelete(this.deleteById).subscribe(() => {
      this.toggleLiveDelete();
      this.getData();
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