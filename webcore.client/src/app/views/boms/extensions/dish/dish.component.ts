import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TemplateIdDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { DishService } from '@services/bom-services/dish.service';
import { DishModel } from '@models/bom-models/dish.model';
import { DishGroupService } from '@services/bom-services/dish-group.service';
import { DishGroupModel } from '@models/bom-models/dish-group.model';
import { OptionModel } from '@models/option.model';

@Component({
  selector: 'app-dish',
  imports: [ModalBodyComponent, NgFor, NgIf, FormControlDirective, FormLabelDirective, IconDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule, FormSelectDirective,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent,
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss'
})
export class DishComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  reviewCreateUploadImage: string = '';
  reviewUpdateUploadImage: string = '';
  dishGroupData: OptionModel[] = [];
  data: Pagination<DishModel> = new Pagination<DishModel>();
  trashData: Pagination<DishModel> = new Pagination<DishModel>();

  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload };

  createForm: FormGroup = new FormGroup({
    dishGroupId: new FormControl(-1),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    dishGroupId: new FormControl(-1),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });
  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(1),
    pageSize: new FormControl(5),
    dishGroupId: new FormControl(-1),
    code: new FormControl(''),
    name: new FormControl('')
  });
  //#endregion

  constructor(private dishService: DishService,
    private dishGroupService: DishGroupService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getData();
    this.trashPageInformation.pageSize = 5;
    this.getAllActiveDishGroups();
  }
  openFileInput(type: string) {
    if (type === 'create') document.getElementById('createUploadImage')?.click();
    else if (type === 'update') document.getElementById('updateUploadImage')?.click();
  }

  onChangeUploadImage(event: any, type: string) {
    const file: File = event.target.files[0];
    if (file) {
      //show image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'create') {
          this.reviewCreateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.createForm.patchValue({
            imageFile: file
          });
        } else if (type === 'update') {
          this.reviewUpdateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.updateForm.patchValue({
            imageFile: file
          });
        }

      };
      reader.readAsDataURL(file);
    }
  }

  getAllActiveDishGroups() {
    this.dishGroupService.getOptionList().subscribe((res) => {
      this.dishGroupData = res.data;

    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  onSubmitFilterForm() {
    this.getData();
  }
    exportExcel() {
    this.dishService.exportExcel().subscribe((res) => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'DishData.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
      this.toastService.showToast(EColors.success, 'Export data successfully.');
    }, (error) => {
      this.toastService.showToast(EColors.danger, 'Failed to export data.');
    });
  }
  //#region Main Table
  getData() {
    this.filterForm.patchValue({
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize
    });
    this.dishService.getByFilter(this.filterForm.value).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
      this.pageInformation.pageIndex = this.data.pageIndex;
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
    this.dishService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.dishService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteDataTrash(id: number) {
    this.dishService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion

  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      const fields = ['dishGroupId', 'code', 'name', 'note', 'isActive'];
      const formData = this.appendFormData(this.createForm, fields);
      this.dishService.create(formData).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({ isActive: true, dishGroupId: -1 });
        this.reviewCreateUploadImage = '';
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

  get dishGroupCreateForm() { return this.createForm.get('dishGroupId'); }
  get nameCreateForm() { return this.createForm.get('name'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.dishService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
      if (res.data.imagePath) {
        this.reviewUpdateUploadImage = `<img src="${this.baseUrl + res.data.imagePath}" alt="Image Preview" class="mw-100 mh-100"/>`;
      } else {
        this.reviewUpdateUploadImage = '';
      }
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      const fields = ['id', 'dishGroupId', 'code', 'name', 'note', 'isActive'];
      const formData = this.appendFormData(this.updateForm, fields);
      this.dishService.update(formData).subscribe((res) => {
        this.toggleLiveUpdateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.reviewUpdateUploadImage = '';
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
  get dishGroupUpdateForm() { return this.updateForm.get('dishGroupId'); }
  get codeUpdateForm() { return this.updateForm.get('code'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  //#endregion

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.dishService.softDelete(this.deleteById).subscribe((res) => {
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

  // Helper to append form values to FormData
  private appendFormData(form: FormGroup, fields: string[]): FormData {
    const formData = new FormData();
    fields.forEach(field => {
      let value = form.value[field];
      if (value !== undefined && value !== null) {
        if (typeof value === 'boolean' || typeof value === 'number') {
          value = value.toString();
        }
        formData.append(field, value);
      }
    });
    if (form.value.imageFile) {
      formData.append('imageFile', form.value.imageFile);
    }
    return formData;
  }
}
