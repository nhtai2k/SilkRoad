import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { KitchenService } from '@services/bom-services/kitchen.service';
import { KitchenModel } from '@models/bom-models/kitchen.model';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular,cilCloudUpload } from '@coreui/icons';

@Component({
  selector: 'app-kitchen',
  imports: [ModalBodyComponent, NgFor, NgIf, FormControlDirective, FormLabelDirective, IconDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss'
})
export class KitchenComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleTrashModal: boolean = false;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  reviewCreateUploadImage: string = '';
  reviewUpdateUploadImage: string = '';
  data: Pagination<KitchenModel> = new Pagination<KitchenModel>();
  trashData: Pagination<KitchenModel> = new Pagination<KitchenModel>();
  icons : any = {cilPlus, cilTrash, cilPen, cilSave, cilExitToApp,cilLoopCircular,cilCloudUpload };
  createForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('',Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('',Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });

  constructor(private kitchenService : KitchenService,
    private toastService : ToastService) {}
  ngOnInit(): void {
    this.getData();
    this.trashPageInformation.pageSize = 5;
  }

  getData(){
    this.kitchenService.getAll(this.pageInformation.pageIndex,this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
    });
  }
    openFileInput(type: string) {
    if (type === 'create') document.getElementById('createUploadImage')?.click();
    else if(type === 'update') document.getElementById('updateUploadImage')?.click();
  }

  onChangeUploadImage(event: any, type: string) {
    const file:File = event.target.files[0];
    if (file) {
      //show image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if(type === 'create'){
          this.reviewCreateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.createForm.patchValue({
            imageFile: file
          });
        }else if(type === 'update'){
          this.reviewUpdateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.updateForm.patchValue({
            imageFile: file
          });
        }
          
      };
      reader.readAsDataURL(file);
    }
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
//#region  Trash
 getTrashData() {
  this.kitchenService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.kitchenService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success,res.message);
    });
  }
  deleteData(id: number) {
    this.kitchenService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success,res.message);
    });
  }


//#endregion
//#region  Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      const formData = this.appendFormData(this.createForm, ['code', 'name', 'note', 'isActive']);
      this.kitchenService.create(formData).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success,res.message);
        this.createForm.reset();
        this.createForm.patchValue({priority: 1, isActive: true});
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

  get nameCreateForm() { return this.createForm.get('name'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get noteCreateForm() { return this.createForm.get('note'); }

//#endregion
//#region  Update Form
updateData(id: number) {
  this.kitchenService.getById(id).subscribe((res) => {
    this.updateForm.patchValue(res.data);
    this.toggleLiveUpdateModel();
        if(res.data.imagePath){
      this.reviewUpdateUploadImage = `<img src="${ this.baseUrl +res.data.imagePath}" alt="Image Preview" class="mw-100 mh-100"/>`;
    }else{
      this.reviewUpdateUploadImage = '';
    }
    
  });
}
onSubmitUpdateForm() {
  if (this.updateForm.valid) {
    const formData = this.appendFormData(this.updateForm, ['id', 'code', 'name', 'note', 'isActive']);
      this.kitchenService.update(formData).subscribe((res) => {
        this.toggleLiveUpdateModel();
        this.getData();
        this.toastService.showToast(EColors.success,res.message);
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
get codeUpdateForm() { return this.updateForm.get('code'); }
get noteUpdateForm() { return this.updateForm.get('note'); }

//#endregion
//#region Delete
softDeleteData(id: number) {
  this.deleteById = id;
  this.toggleLiveDelete();
}
onConfirmDelete() {
  this.kitchenService.softDelete(this.deleteById).subscribe((res) => {
    this.toggleLiveDelete();
    this.getData();
      this.toastService.showToast(EColors.success,res.message);
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