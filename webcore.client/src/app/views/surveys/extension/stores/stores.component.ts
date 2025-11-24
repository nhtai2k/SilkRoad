import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, FormSelectDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { StoreService } from '@services/survey-services/store.service';
import { StoreModel } from '@models/survey-models/store.model';

@Component({
  selector: 'app-stores',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, IconDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ModalHeaderComponent, DataTableComponent, FormSelectDirective],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})

export class StoresComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  data: Pagination<StoreModel> = new Pagination<StoreModel>();
  trashData: Pagination<StoreModel> = new Pagination<StoreModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX };
  
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    cityId: new FormControl(-1),
    districtId: new FormControl(-1),
    address: new FormControl(null, Validators.maxLength(255)),
    phoneNumber: new FormControl(null, Validators.maxLength(10)),
    email: new FormControl(null, Validators.maxLength(255)),
    representative: new FormControl(null, Validators.maxLength(255)),
    isActive: new FormControl(true),
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    cityId: new FormControl(-1),
    districtId: new FormControl(-1),
    address: new FormControl(null, Validators.maxLength(255)),
    phoneNumber: new FormControl(null, Validators.maxLength(10)),
    email: new FormControl(null, Validators.maxLength(255)),
    representative: new FormControl(null, Validators.maxLength(255)),
    isActive: new FormControl(true),
  });
  //#endregion

  constructor(private storeService: StoreService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getData();
    this.trashPageInformation.pageSize = 5;
  }

  //#region Main Table
  getData() {
    this.storeService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
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
    this.storeService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.storeService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteDataTrash(id: number) {
    this.storeService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion

  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.storeService.create(this.createForm.value).subscribe({
        next: (res) => {
          this.toggleLiveCreateModel();
          this.getData();
          this.toastService.showToast(EColors.success, res.message);
          this.createForm.reset();
          this.createForm.patchValue({ isActive: true, cityId: -1, districtId: -1 });
        },
        error: (failure) => {
          this.toastService.showToast(EColors.danger, failure.error.message);
        }
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
get addressCreateForm() { return this.createForm.get('address'); }
get phoneNumberCreateForm() { return this.createForm.get('phoneNumber'); }
get emailCreateForm() { return this.createForm.get('email'); }
get representativeCreateForm() { return this.createForm.get('representative'); }
  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.storeService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.storeService.update(this.updateForm.value).subscribe({
        next:(res) => {
        this.toggleLiveUpdateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
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
  get addressUpdateForm() { return this.updateForm.get('address'); }
  get phoneNumberUpdateForm() { return this.updateForm.get('phoneNumber'); }
  get emailUpdateForm() { return this.updateForm.get('email'); }
  get representativeUpdateForm() { return this.updateForm.get('representative'); }
  //#endregion

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.storeService.softDelete(this.deleteById).subscribe((res) => {
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