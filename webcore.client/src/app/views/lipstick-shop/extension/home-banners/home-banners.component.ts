import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { baseUrl, EColors } from '@common/global';
import { ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective,
   ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { HomeBannerViewModel } from '@models/lipstick-shop-models/home-banner.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { HomeBannerService } from '@services/lipstick-shop-services/home-banner.service';
import { ToastService } from '@services/helper-services/toast.service';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload } from '@coreui/icons';

import { DataTableComponent } from '@components/generals/data-table/data-table.component';


@Component({
  selector: 'app-home-banners',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, IconDirective, FormSelectDirective, DataTableComponent],
  templateUrl: './home-banners.component.html',
  styleUrl: './home-banners.component.scss'
})
export class HomeBannersComponent implements OnInit {
  //#region Variables
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  bannerTypeId: number = -1;
  deleteById: number = 0;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  bannerTypeList: string[] = ['Main Banner', 'Sub Banner'];
  animationList: string[] = ['Snow', 'Fade'];
  data: Pagination<HomeBannerViewModel> = new Pagination<HomeBannerViewModel>();
  trashData: Pagination<HomeBannerViewModel> = new Pagination<HomeBannerViewModel>();
  reviewCreateUploadImage: string = '';
  reviewUpdateUploadImage: string = '';
  tagENList: string[] = [];
  tagVNList: string[] = [];
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload };

  createForm: FormGroup = new FormGroup({
    bannerTypeId: new FormControl(-1, [Validators.min(0)]),
    animation: new FormControl(''),
    subjectEN: new FormControl(''),
    subjectVN: new FormControl(''),
    descriptionEN: new FormControl(''),
    descriptionVN: new FormControl(''),
    redirectUrl: new FormControl(''),
    priority: new FormControl(1, [Validators.min(1), Validators.max(9999)]),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null, Validators.required),
    tagEN: new FormControl(''),
    tagVN: new FormControl(''),
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    bannerTypeId: new FormControl(-1, [Validators.min(0)]),
    animation: new FormControl(),
    subjectEN: new FormControl(''),
    subjectVN: new FormControl(''),
    descriptionEN: new FormControl(''),
    descriptionVN: new FormControl(''),
    redirectUrl: new FormControl(''),
    priority: new FormControl(1, [Validators.min(1), Validators.max(9999)]),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null),
    tagEN: new FormControl(''),
    tagVN: new FormControl(''),
  });
  //#endregion
  
  //#region Constructor and OnInit
  constructor(private homeBannerService: HomeBannerService, private toastService: ToastService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.homeBannerService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize, this.bannerTypeId).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.totalItems = res.data.totalItems;
      this.pageInformation.totalPages = res.data.totalPages;
      this.pageInformation.currentPage = res.data.currentPage;
    });
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
  filter(event: any) {
    const value = event.target.value;
    this.bannerTypeId = value;
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
  //#endregion
  
  //#region  Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      const formData = new FormData();
      formData.append('animation', this.createForm.value.animation ?? '');
      formData.append('bannerTypeId', this.createForm.value.bannerTypeId);
      formData.append('subjectEN', this.createForm.value.subjectEN ?? '');
      formData.append('subjectVN', this.createForm.value.subjectVN ?? '');
      formData.append('descriptionEN', this.createForm.value.descriptionEN ?? '');
      formData.append('descriptionVN', this.createForm.value.descriptionVN ?? '');
      formData.append('redirectUrl', this.createForm.value.redirectUrl ?? '');
      formData.append('isActive', this.createForm.value.isActive);
      formData.append('priority', this.createForm.value.priority);
      formData.append('imageFile', this.createForm.value.imageFile);
      formData.append('tagENs', this.tagENList.join(";"));
      if (this.tagENList.length > 0) {
        formData.append('tagENs', this.tagENList.join(";"));
      }
      if (this.tagVNList.length > 0) {
        formData.append('tagVNs', this.tagVNList.join(";"));
      }
      this.homeBannerService.create(formData).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.toastService.showToast(EColors.success, res.message);
        this.reviewCreateUploadImage = '';
        this.getData();
        this.createForm.reset();
        this.createForm.patchValue({ priority: 1, bannerTypeId: -1, animation: -1, isActive: true });
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
    this.tagENList = [];
    this.tagVNList = [];
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }

  get priorityCreateForm() { return this.createForm.get('priority'); }
  get bannerTypeIdCreateForm() { return this.createForm.get('bannerTypeId'); }

  //#endregion
  
  //#region  Update Form
  updateData(id: number) {
    this.homeBannerService.getById(id).subscribe((res) => {
      this.toggleLiveUpdateModel(); // toggle modal before patch tag to list
      this.updateForm.patchValue(res.data);
      if (res.data.tagENs) {
        this.tagENList = res.data.tagENs.split(";");
      } else {
        this.tagENList = [];
      }
      if (res.data.tagVNs) {
        this.tagVNList = res.data.tagVNs.split(";");
      } else {
        this.tagVNList = [];
      }
      if (res.data.imageName) {
        this.reviewUpdateUploadImage = `<img src="${baseUrl + res.data.imageName}" alt="Image Preview" class="mw-100 mh-100"/>`;
      } else {
        this.reviewUpdateUploadImage = '';
      }
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('id', this.updateForm.value.id);
      formData.append('bannerTypeId', this.updateForm.value.bannerTypeId);
      formData.append('subjectEN', this.updateForm.value.subjectEN ?? '');
      formData.append('subjectVN', this.updateForm.value.subjectVN ?? '');
      formData.append('descriptionEN', this.updateForm.value.descriptionEN ?? '');
      formData.append('descriptionVN', this.updateForm.value.descriptionVN ?? '');
      formData.append('redirectUrl', this.updateForm.value.redirectUrl ?? '');
      formData.append('isActive', this.updateForm.value.isActive);
      formData.append('priority', this.updateForm.value.priority);
      formData.append('imageFile', this.updateForm.value.imageFile);
      formData.append('animation', this.updateForm.value.animation);
      if (this.tagENList.length > 0) {
        formData.append('tagENs', this.tagENList.join(";"));
      }
      if (this.tagVNList.length > 0) {
        formData.append('tagVNs', this.tagVNList.join(";"));
      }

      this.homeBannerService.update(formData).subscribe((res) => {
        this.toastService.showToast(EColors.success, res.message);
        this.toggleLiveUpdateModel();
        this.tagENList = [];
        this.tagVNList = [];
        this.getData();
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  toggleLiveUpdateModel() {
    this.visibleUpdateModal = !this.visibleUpdateModal;
    this.tagENList = [];
    this.tagVNList = [];
  }

  handleLiveUpdateModelChange(event: any) {
    this.visibleUpdateModal = event;
  }

  get priorityUpdateForm() { return this.updateForm.get('priority'); }

  //#endregion
  
  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  deleteDataConfirm() {
    this.homeBannerService.softDelete(this.deleteById).subscribe((res) => {
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
  
  //#region tagEN
  handleLeaveTagENInput(event: any) {
    if (event.target.value && event.target.value.trim() !== '') {
      this.addTagENToList(event.target.value);
    }
  }

  handleEnterTagENInput(event: any) {
    if (event.key === 'Enter') {
      if (event.target.value && event.target.value.trim() !== '') {
        this.addTagENToList(event.target.value);
      }
      event.preventDefault();
    }
  }

  addTagENToList(tag: string) {
    let tagENInputCreate = document.getElementById('tagENCreate');
    let tagENInputUpdate = document.getElementById('tagENUpdate');
    if (tagENInputCreate) {
      (tagENInputCreate as HTMLInputElement).value = '';
    }
    if (tagENInputUpdate) {
      (tagENInputUpdate as HTMLInputElement).value = '';
    }
    this.tagENList.push(tag);
  }

  handleDeleteTagEN(index: number) {
    this.tagENList.splice(index, 1);
  }
  //#endregion

  //#region tagVN
  handleLeaveTagVNInput(event: any) {
    if (event.target.value && event.target.value.trim() !== '') {
      this.addTagVNToList(event.target.value);
    }
  }

  handleEnterTagVNInput(event: any) {
    if (event.key === 'Enter') {
      if (event.target.value && event.target.value.trim() !== '') {
        this.addTagVNToList(event.target.value);
      }
      event.preventDefault();
    }
  }

  addTagVNToList(tag: string) {
    let tagVNInputCreate = document.getElementById('tagVNCreate');
    let tagVNInputUpdate = document.getElementById('tagVNUpdate');
    if (tagVNInputCreate) {
      (tagVNInputCreate as HTMLInputElement).value = '';
    }
    if (tagVNInputUpdate) {
      (tagVNInputUpdate as HTMLInputElement).value = '';
    }
    this.tagVNList.push(tag);
  }

  handleDeleteTagVN(index: number) {
    this.tagVNList.splice(index, 1);
  }
  //#endregion
  
  //#region Trash
  getTrashData() {
    this.homeBannerService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.homeBannerService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteDataTrash(id: number) {
    this.homeBannerService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion

}