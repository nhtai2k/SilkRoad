
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormCheckComponent, FormCheckInputDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PageTypeViewModel } from '@models/lipstick-shop-models/page-type.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { PageTypeService } from '@services/lipstick-shop-services/page-type.service';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular } from '@coreui/icons';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';

@Component({
  selector: 'app-page-types',
  templateUrl: './page-types.component.html',
  styleUrl: './page-types.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, FormSelectDirective, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, IconDirective, DataTableComponent],
})
export class PageTypesComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  enumList: string[] = [];
  data: Pagination<PageTypeViewModel> = new Pagination<PageTypeViewModel>();
  trashData: Pagination<PageTypeViewModel> = new Pagination<PageTypeViewModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular };
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    label: new FormControl('', Validators.required),
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    label: new FormControl('', Validators.required)
  });

  constructor( private pageTypeService : PageTypeService,private toastService : ToastService) {}

  ngOnInit(): void {
    this.getData();
    this.getEPageType();
  }
  getData(){
    this.pageTypeService.getAll(this.pageInformation.pageIndex,this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = res.data.currentPage;
      this.pageInformation.totalPages = res.data.totalPages;
      this.pageInformation.totalItems = res.data.totalItems;

    });
  }
  getEPageType() {
    this.pageTypeService.getEPageType().subscribe((res) => {
      this.enumList = res.data;
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
      this.pageTypeService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.toastService.showToast(EColors.success,res.message);
        this.getData();
        this.getEPageType();
        this.createForm.reset();
        this.createForm.patchValue({priority: 1,pageTypeId: -1, isActive: true, label: ''});
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
  get labelCreateForm() { return this.createForm.get('label'); }
//#endregion
//#region  Update Form
updateData(id: number) {
  this.pageTypeService.getById(id).subscribe((res) => {
    this.updateForm.patchValue(res.data);
    this.toggleLiveUpdateModel();
  });
}

onSubmitUpdateForm() {
  if (this.updateForm.valid) {
    this.pageTypeService.update(this.updateForm.value).subscribe((res) => {
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

get nameUpdateForm() { return this.updateForm.get('name'); }
get labelUpdateForm() { return this.updateForm.get('label'); }
//#endregion

//#region Delete
softDeleteData(id: number) {
  this.deleteById = id;
  this.toggleLiveDelete();
}
deleteDataConfirm() {
  this.pageTypeService.softDelete(this.deleteById).subscribe((res) => {
    this.toggleLiveDelete();
    this.toastService.showToast(EColors.success, res.message);
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
  this.pageTypeService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
  this.pageTypeService.restore(id).subscribe((res) => {
    this.getTrashData();
    this.getData();
    this.toastService.showToast(EColors.success, res.message);
  });
}
deleteDataTrash(id: number) {
  this.pageTypeService.delete(id).subscribe((res: any) => {
    this.getTrashData();
    this.toastService.showToast(EColors.success, res.message);
  });
}
//#endregion
}