
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormCheckComponent, FormCheckInputDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PageTypeViewModel } from '@models/lipstick-shop-models/page-type.model';
import { CkeditorComponent } from '@components/ckeditor/ckeditor.component';
import { PageInformation, Pagination } from '@models/pagination.model';
import { PageContentService } from '@services/lipstick-shop-services/page-content.service';
import { PageContentViewModel } from '@models/lipstick-shop-models/page-content.model';
import { PageTypeService } from '@services/lipstick-shop-services/page-type.service';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular } from '@coreui/icons';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';

@Component({
  selector: 'app-page-contents',
  templateUrl: './page-contents.component.html',
  styleUrl: './page-contents.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule, FormSelectDirective, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, IconDirective, CkeditorComponent, DataTableComponent],
})
export class PageContentsComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  pageTypeId: number = -1;
  deleteById: number = 0;
  pageTypeList: PageTypeViewModel[] = [];
  data: Pagination<PageContentViewModel> = new Pagination<PageContentViewModel>();
  trashData: Pagination<PageContentViewModel> = new Pagination<PageContentViewModel>();
  updateContentVN: string = '';
  updateContentEN: string = '';
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular };

  createForm: FormGroup = new FormGroup({
    pageTypeId: new FormControl(-1, Validators.min(0)),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    contentEN: new FormControl('', Validators.required),
    contentVN: new FormControl('', Validators.required),
    isActive: new FormControl(true, Validators.required),
    priority: new FormControl(1, [Validators.min(1), Validators.max(100)])
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    pageTypeId: new FormControl(-1, Validators.min(0)),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    contentEN: new FormControl('', Validators.required),
    contentVN: new FormControl('', Validators.required),
    isActive: new FormControl(true, Validators.required),
    priority: new FormControl(1, [Validators.min(1), Validators.max(100)])
  });

  constructor( private pageContentService : PageContentService, private pageTypeService : PageTypeService, private toastService : ToastService) {}

  ngOnInit(): void {
    this.getData();
    this.pageTypeService.getAllActive().subscribe((res) => {
      this.pageTypeList = res.data;
    });
  }
  getData(){
    this.pageContentService.getAll(this.pageInformation.pageIndex,this.pageInformation.pageSize,this.pageTypeId).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.totalItems = res.data.totalItems;
      this.pageInformation.totalPages = res.data.totalPages;
      this.pageInformation.currentPage = res.data.currentPage;
    });
  }
  filter(event: any) {
    this.pageTypeId = event.target.value;
    this.pageInformation.pageIndex = 1;
    this.getData();
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
  changeContentEN(data:string, type:string){
    console.log(data);
    if(type == 'create'){ 
      this.createForm.patchValue({contentEN: data})
    }
    else if(type == 'update'){
      this.updateForm.patchValue({contentEN: data});
    }
  }
  changeContentVN(data:string, type:string){
    console.log(data);
    if(type == 'create'){ 
      this.createForm.patchValue({contentVN: data})
    }
    else if(type == 'update'){
      this.updateForm.patchValue({contentVN: data});
    }
  }
//#region  Create Form
  onSubmitCreateForm() {
    console.log(this.createForm.value);
    if (this.createForm.valid) {
      this.pageContentService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.toastService.showToast(EColors.success,res.message);
        this.getData();
        this.createForm.reset();
        this.createForm.patchValue({priority: 1,pageTypeId: -1, isActive: true});
      });
    }
  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  get pageTypeIdCreateForm() { return this.createForm.get('pageTypeId'); }
  get titleENCreateForm() { return this.createForm.get('titleEN'); }
  get titleVNCreateForm() { return this.createForm.get('titleVN'); }
  get contentENCreateForm() { return this.createForm.get('contentEN'); }
  get contentVNCreateForm() { return this.createForm.get('contentVN'); }
  get priorityCreateForm() { return this.createForm.get('priority'); }
//#endregion
//#region  Update Form
updateData(id: number) {
  this.pageContentService.getById(id).subscribe((res) => {
    this.updateForm.patchValue(res.data);
    this.updateContentEN = res.data.contentEN;
    this.updateContentVN = res.data.contentVN;
    console.log(res.data);
    this.toggleLiveUpdateModel();
  });
}

onSubmitUpdateForm() {
  if (this.updateForm.valid) {
    this.pageContentService.update(this.updateForm.value).subscribe((res) => {
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

get pageTypeIdUpdateForm() { return this.updateForm.get('pageTypeId'); }
get titleENUpdateForm() { return this.updateForm.get('titleEN'); }
get titleVNUpdateForm() { return this.updateForm.get('titleVN'); }
get contentENUpdateForm() { return this.updateForm.get('contentEN'); }
get contentVNUpdateForm() { return this.updateForm.get('contentVN'); }
get priorityUpdateForm() { return this.updateForm.get('priority'); }
//#endregion
//#region Delete
softDeleteData(id: number) {
  this.deleteById = id;
  this.toggleLiveDelete();
}
deleteDataConfirm() {
  this.pageContentService.softDelete(this.deleteById).subscribe((res) => {
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
  this.pageContentService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
  this.pageContentService.restore(id).subscribe((res) => {
    this.getTrashData();
    this.getData();
    this.toastService.showToast(EColors.success, res.message);
  });
}
deleteDataTrash(id: number) {
  this.pageContentService.delete(id).subscribe((res: any) => {
    this.getTrashData();
    this.toastService.showToast(EColors.success, res.message);
  });
}
//#endregion
}