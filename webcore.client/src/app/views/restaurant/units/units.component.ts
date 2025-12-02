
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { UnitService } from '@services/restaurant-services/unit.service';
import { UnitModel } from '@models/restaurant-models/unit.model';

@Component({
  selector: 'app-units',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, FormCheckComponent, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  data: Pagination<UnitModel> = new Pagination<UnitModel>();
  trashData: Pagination<UnitModel> = new Pagination<UnitModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular };

  createForm: FormGroup = new FormGroup({
    nameVN: new FormControl(null, Validators.required),
    nameEN: new FormControl(null, Validators.required),
    nameCN: new FormControl(null, Validators.required),
    priority: new FormControl(1, [Validators.required, Validators.min(1)]),
    isFree: new FormControl(true),
    isActive: new FormControl(true),
    note: new FormControl(null)
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    nameVN: new FormControl(null, Validators.required),
    nameEN: new FormControl(null, Validators.required),
    nameCN: new FormControl(null, Validators.required),
    priority: new FormControl(1, [Validators.required, Validators.min(0)]),
    isFree: new FormControl(true),
    isActive: new FormControl(true),
    note: new FormControl(null)
  });

  constructor(private unitService: UnitService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.unitService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe({
      next: (res) => {
        this.data = res.data;
        this.pageInformation.currentPage = this.data.currentPage;
        this.pageInformation.totalItems = this.data.totalItems;
        this.pageInformation.totalPages = this.data.totalPages;
      }
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

  //#region Create
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.unitService.create(this.createForm.value).subscribe({
        next: (res: any) => {
          this.toggleLiveCreateModel();
          this.getData();
          this.toastService.showToast(EColors.success, res.message);
          this.createForm.reset();
          this.createForm.patchValue({
            priority: 1,
            capacity: 1,
            isFree: true,
            isActive: true})
        },
        error: (failure : any) => {
          this.toastService.showToast(EColors.danger, failure.error.message);
          console.log(failure);
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
  get nameVNCreateForm() { return this.createForm.get('nameVN'); }
  get nameENCreateForm() { return this.createForm.get('nameEN'); }
  get nameCNCreateForm() { return this.createForm.get('nameCN'); }
  get priorityCreateForm() { return this.createForm.get('priority'); }
  get isFreeCreateForm() { return this.createForm.get('isFree'); }
  get isActiveCreateForm() { return this.createForm.get('isActive'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

  //#region Update
  updateData(id: number) {
    this.unitService.getById(id).subscribe({
      next: (res) => {
        this.updateForm.patchValue(res.data);
        this.toggleLiveUpdateModel();
      }
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.unitService.update(this.updateForm.value).subscribe({
        next: (res: any) => {
          this.toggleLiveUpdateModel();
          this.getData();
          this.toastService.showToast(EColors.success, res.message);
        },
        error: (failure: any) => {
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
  get nameVNUpdateForm() { return this.updateForm.get('nameVN'); }
  get nameENUpdateForm() { return this.updateForm.get('nameEN'); }
  get nameCNUpdateForm() { return this.updateForm.get('nameCN'); }
  get priorityUpdateForm() { return this.updateForm.get('priority'); }
  get isFreeUpdateForm() { return this.updateForm.get('isFree'); }
  get isActiveUpdateForm() { return this.updateForm.get('isActive'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  //#endregion

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.unitService.softDelete(this.deleteById).subscribe({
      next: (res: any) => {
        this.toggleLiveDelete();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      },
      error: (failure: any) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
  }
  toggleLiveDelete() {
    this.visibleDelete = !this.visibleDelete;
  }
  handleLiveDeleteChange(event: any) {
    this.visibleDelete = event;
  }
  //#endregion

  //#region Trash
  getTrashData() {
    this.unitService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe({
      next: (res) => {
        this.trashData = res.data;
        this.trashPageInformation.currentPage = this.trashData.currentPage;
        this.trashPageInformation.totalItems = this.trashData.totalItems;
        this.trashPageInformation.totalPages = this.trashData.totalPages;
      }
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
    this.unitService.restore(id).subscribe({
      next: (res: any) => {
        this.getTrashData();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      }
    });
  }
  deleteData(id: number) {
    this.unitService.delete(id).subscribe({
      next: (res: any) => {
        this.getTrashData();
        this.toastService.showToast(EColors.success, res.message);
      }
    });
  }
  //#endregion
}