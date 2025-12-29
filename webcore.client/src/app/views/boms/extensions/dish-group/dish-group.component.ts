import { IconDirective } from '@coreui/icons-angular';
import { CommonModule} from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective,
  FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent,
  ModalHeaderComponent, TableColorDirective
} from '@coreui/angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { DishGroupService } from '@services/bom-services/dish-group.service';
import { DishGroupModel } from '@models/bom-models/dish-group.model';
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook, cilCloudUpload } from '@coreui/icons';
import { BookIconComponent } from "@components/icons/book-icon.component";

@Component({
  selector: 'app-dish-group',
  imports: [ModalBodyComponent, CommonModule, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective,
    TableColorDirective, TableColorDirective, BookIconComponent],
  templateUrl: './dish-group.component.html',
  styleUrl: './dish-group.component.scss'
})
export class DishGroupComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  baseUrl: string = baseUrl;
  data: Pagination<DishGroupModel> = new Pagination<DishGroupModel>();
  trashData: Pagination<DishGroupModel> = new Pagination<DishGroupModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook, cilCloudUpload };
  showChildrenByParentId = signal<number | null>(null);
  // visibleSubItems = signal<{ [id: number]: boolean }>({});
  reviewCreateUploadImage: string = '';
  reviewUpdateUploadImage: string = '';

  createForm: FormGroup = new FormGroup({
    parentId: new FormControl(null),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null),
    children: new FormControl([])
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    parentId: new FormControl(null),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });

  constructor(private dishGroupService: DishGroupService,
    private toastService: ToastService) { }
  //#endregion

  //#region Lifecycle Hooks
  ngOnInit(): void {
    this.getData();
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
  getData() {
    this.dishGroupService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
      this.data.items.forEach(item => {
        item.expanded = false; // Reset expanded state for each item
        if (this.showChildrenByParentId() === item.id) {
          item.expanded = true; // Set expanded state if it matches the current showChildrenByParentId
        }
      });
    });
  }
  //table tree
    toggleNode(node: DishGroupModel): void {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.showChildrenByParentId.set(node.id);
    } else {
      this.showChildrenByParentId.set(null);
    }
  }
  getTrashData() {
    this.dishGroupService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
      this.trashData = res.data;
      this.trashPageInformation.currentPage = this.trashData.currentPage;
      this.trashPageInformation.totalItems = this.trashData.totalItems;
      this.trashPageInformation.totalPages = this.trashData.totalPages;
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
  onTrashPageIndexChange(index: any) {
    this.trashPageInformation.pageIndex = index;
    this.getTrashData();
  }
  onTrashPageSizeChange(size: any) {
    this.trashPageInformation.pageSize = size;
    this.trashPageInformation.pageIndex = 1;
    this.getTrashData();
  }

  // showSubItems(id: number) {
  //   const current = this.visibleSubItems();
  //   this.visibleSubItems.set({ ...current, [id]: !current[id] });
  //   this.visibleSubItemId = id;
  // }

  // Wrapper functions for child component context binding
  public toggleLiveCreateModelWrapper = (id: number | null) => this.toggleLiveCreateModel(id);
  public updateDataWrapper = (id: number) => this.updateData(id);
  public softDeleteDataWrapper = (id: number) => this.softDeleteData(id);
  //#endregion

  //#region Trash
  toggleLiveTrashModal() {
    this.getTrashData();
    this.visibleTrashModal = !this.visibleTrashModal;
  }
  handleLiveTrashModalChange(event: any) {
    this.visibleTrashModal = event;
  }
  restoreData(id: number) {
    this.dishGroupService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteData(id: number) {
    this.dishGroupService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion

  //#region Create Form
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

  onSubmitCreateForm() {
    if (this.createForm.valid) {
      const fields = ['parentId', 'code', 'name', 'note', 'isActive'];
      const formData = this.appendFormData(this.createForm, fields);
      this.dishGroupService.create(formData).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({ isActive: true });
        this.reviewCreateUploadImage = '';
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  toggleLiveCreateModel(parentId: number | null = null) {
    this.visibleCreateModal = !this.visibleCreateModal;
    if (parentId != null) {
      this.createForm.patchValue({ parentId });
    }
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }

  get nameCreateForm() { return this.createForm.get('name'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.dishGroupService.getById(id).subscribe((res) => {
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
      const fields = ['id', 'code', 'name', 'note', 'isActive'];
      const formData = this.appendFormData(this.updateForm, fields);
      this.dishGroupService.update(formData).subscribe((res) => {
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
  get codeUpdateForm() { return this.updateForm.get('code'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  //#endregion

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.dishGroupService.softDelete(this.deleteById).subscribe(() => {
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
