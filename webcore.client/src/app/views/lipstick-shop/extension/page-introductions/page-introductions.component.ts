
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { baseUrl, EColors } from '@common/global';
import { CkeditorComponent } from '@components/ckeditor/ckeditor.component';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { ModalBodyComponent, FormControlDirective, FormLabelDirective, ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, FormSelectDirective, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent } from '@coreui/angular';
import { cilCloudUpload, cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageIntroductionViewModel } from '@models/lipstick-shop-models/page-introduction.model';
import { PageTypeViewModel } from '@models/lipstick-shop-models/page-type.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { PageIntroductionService } from '@services/lipstick-shop-services/page-introduction.service';
import { PageTypeService } from '@services/lipstick-shop-services/page-type.service';

@Component({
  selector: 'app-page-introductions',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, IconDirective, ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule, FormSelectDirective, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, CkeditorComponent, DataTableComponent],
  templateUrl: './page-introductions.component.html',
  styleUrl: './page-introductions.component.scss'
})
export class PageIntroductionsComponent {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  data: Pagination<PageIntroductionViewModel> = new Pagination<PageIntroductionViewModel>();
  trashData: Pagination<PageIntroductionViewModel> = new Pagination<PageIntroductionViewModel>();
  baseUrl: string = baseUrl;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  pageTypeId: number = -1;
  deleteById: number = 0;
  updateContentVN: string = '';
  updateContentEN: string = '';
  pageTypeList: PageTypeViewModel[] = [];
  reviewUploadImageCreateForm: string = '';
  reviewUploadImageUpdateForm: string = '';
  icons: any = { cilCloudUpload, cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular };
  createForm: FormGroup = new FormGroup({
    pageTypeId: new FormControl(-1, Validators.min(0)),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    contentEN: new FormControl('', Validators.required),
    contentVN: new FormControl('', Validators.required),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    pageTypeId: new FormControl(-1, Validators.min(0)),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    contentEN: new FormControl('', Validators.required),
    contentVN: new FormControl('', Validators.required),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });
  constructor(
    private pageIntroService: PageIntroductionService,
    private toastService: ToastService,
    private pageTypeService: PageTypeService) { }

  ngOnInit(): void {
    this.getData();
    this.pageTypeService.getAllActive().subscribe((res) => {
      this.pageTypeList = res.data;
    });
  }

  getData() {
    this.pageIntroService.getAll(this.pageTypeId, this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = res.data.currentPage;
      this.pageInformation.totalItems = res.data.totalItems;
      this.pageInformation.totalPages = res.data.totalPages;
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
  filter(event: any) {
    this.pageTypeId = event.target.value;
    this.pageInformation.pageIndex = 1;
    this.getData();
  }

  changeContentEN(data: string, type: string) {
    console.log(data);
    if (type == 'create') {
      this.createForm.patchValue({ contentEN: data })
    }
    else if (type == 'update') {
      this.updateForm.patchValue({ contentEN: data });
    }
  }
  changeContentVN(data: string, type: string) {
    console.log(data);
    if (type == 'create') {
      this.createForm.patchValue({ contentVN: data })
    }
    else if (type == 'update') {
      this.updateForm.patchValue({ contentVN: data });
    }
  }
  openFileInput(id: string): void {
    document.getElementById(id)?.click();
  }
  //#region  Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      const formData = new FormData();
      formData.append('pageTypeId', this.createForm.value.pageTypeId);
      formData.append('titleEN', this.createForm.value.titleEN);
      formData.append('titleVN', this.createForm.value.titleVN);
      formData.append('contentEN', this.createForm.value.contentEN);
      formData.append('contentVN', this.createForm.value.contentVN);
      formData.append('isActive', this.createForm.value.isActive);
      formData.append('imageFile', this.createForm.value.imageFile);   
      this.pageIntroService.create(formData).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.toastService.showToast(EColors.success, res.message);
        this.getData();
        this.createForm.reset();
        this.createForm.patchValue({ pageTypeId: -1, isActive: true });
        this.reviewUploadImageCreateForm = '';
      });
    }
  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  onChangeUploadImageFileCreateForm(event: any,type: string): void {
    const file: File = event.target.files[0];
    if (file) {
      //show image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.reviewUploadImageCreateForm = e.target.result;
        this.createForm.patchValue({ imageFile: file });
      };
      reader.readAsDataURL(file);
    }
  }
  get pageTypeIdCreateForm() { return this.createForm.get('pageTypeId'); }
  get titleENCreateForm() { return this.createForm.get('titleEN'); }
  get titleVNCreateForm() { return this.createForm.get('titleVN'); }
  get contentENCreateForm() { return this.createForm.get('contentEN'); }
  get contentVNCreateForm() { return this.createForm.get('contentVN'); }
  //#endregion
  //#region  Update Form
  updateData(id: number) {
    this.pageIntroService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.updateContentEN = res.data.contentEN;
      this.updateContentVN = res.data.contentVN;
      if (res.data.imageUrl) {
        this.reviewUploadImageUpdateForm = baseUrl +  res.data.imageUrl;
      }
      this.toggleLiveUpdateModel();
    });
  }

  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('id', this.updateForm.value.id);
      formData.append('pageTypeId', this.updateForm.value.pageTypeId);
      formData.append('titleEN', this.updateForm.value.titleEN);
      formData.append('titleVN', this.updateForm.value.titleVN);
      formData.append('contentEN', this.updateForm.value.contentEN);
      formData.append('contentVN', this.updateForm.value.contentVN);
      formData.append('isActive', this.updateForm.value.isActive);
      formData.append('imageFile', this.createForm.value.imageFile);    
      this.pageIntroService.update(formData).subscribe((res) => {
        this.toggleLiveUpdateModel();
        this.toastService.showToast(EColors.success, res.message);
        this.getData();
        this.reviewUploadImageUpdateForm = '';
        this.updateForm.reset();
        this.updateForm.patchValue({ pageTypeId: -1, isActive: true });
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
        this.reviewUploadImageUpdateForm = '';
      });
    }
  }

  toggleLiveUpdateModel() {
    this.visibleUpdateModal = !this.visibleUpdateModal;
  }

  handleLiveUpdateModelChange(event: any) {
    this.visibleUpdateModal = event;
  }
  onChangeUploadImageFileUpdateForm(event: any,type: string): void {
    const file: File = event.target.files[0];
    if (file) {
      //show image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.reviewUploadImageUpdateForm = e.target.result;
        this.createForm.patchValue({ imageFile: file });
      };
      reader.readAsDataURL(file);
    }
  }

  get pageTypeIdUpdateForm() { return this.updateForm.get('pageTypeId'); }
  get titleENUpdateForm() { return this.updateForm.get('titleEN'); }
  get titleVNUpdateForm() { return this.updateForm.get('titleVN'); }
  get contentENUpdateForm() { return this.updateForm.get('contentEN'); }
  get contentVNUpdateForm() { return this.updateForm.get('contentVN'); }
  //#endregion
  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  deleteDataConfirm() {
    this.pageIntroService.softDelete(this.deleteById).subscribe((res) => {
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
    this.pageIntroService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.pageIntroService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteDataTrash(id: number) {
    this.pageIntroService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion
}
