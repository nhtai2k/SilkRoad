
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormCheckComponent, FormCheckInputDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ColorViewModel } from '@models/lipstick-shop-models/color.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { ColorService } from '@services/lipstick-shop-services/color.service';
import { EColors } from '@common/global';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular } from '@coreui/icons';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, IconDirective, DataTableComponent]
})
export class ColorsComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  data: Pagination<ColorViewModel> = new Pagination<ColorViewModel>();
  trashData: Pagination<ColorViewModel> = new Pagination<ColorViewModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular };
  createForm: FormGroup = new FormGroup({
    nameEN: new FormControl('', Validators.required),
    nameVN: new FormControl('', Validators.required),
    priority: new FormControl(1, [Validators.min(1), Validators.max(9999)]),
    isActive: new FormControl(true, Validators.required)
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    nameEN: new FormControl('', Validators.required),
    nameVN: new FormControl('', Validators.required),
    priority: new FormControl(1, [Validators.min(1), Validators.max(9999)]),
    isActive: new FormControl(true, Validators.required)
  });

  constructor(private ColorService : ColorService, private toastService: ToastService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.ColorService.getAll(this.pageInformation.pageIndex,this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.totalItems = res.data.totalItems;
      this.pageInformation.totalPages = res.data.totalPages;
      this.pageInformation.currentPage = res.data.currentPage;
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
      this.ColorService.create(this.createForm.value).subscribe((res) => {
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
  this.ColorService.getById(id).subscribe((res) => {
    this.updateForm.patchValue(res.data);
    this.toggleLiveUpdateModel();
  });
}
onSubmitUpdateForm() {
  if (this.updateForm.valid) {
    this.ColorService.update(this.updateForm.value).subscribe((res) => {
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
softDeleteData(id: number) {
  this.deleteById = id;
  this.toggleLiveDelete();
}
deleteDataConfirm() {
  this.ColorService.softDelete(this.deleteById).subscribe((res) => {
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

//#region Trash
getTrashData() {
  this.ColorService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
  this.ColorService.restore(id).subscribe((res) => {
    this.getTrashData();
    this.getData();
    this.toastService.showToast(EColors.success, res.message);
  });
}
deleteDataTrash(id: number) {
  this.ColorService.delete(id).subscribe((res: any) => {
    this.getTrashData();
    this.toastService.showToast(EColors.success, res.message);
  });
}
//#endregion
}
