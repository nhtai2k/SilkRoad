import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
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
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook, cilCloudUpload } from '@coreui/icons';
import { BookIconComponent } from '@components/icons/book-icon.component';
import { CategoryModel } from '@models/restaurant-models/category.model';
import { CategoryService } from '@services/restaurant-services/category.service';

@Component({
  selector: 'app-categories',
  imports: [ModalBodyComponent, CommonModule, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective,
    TableColorDirective, TableColorDirective, BookIconComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  baseUrl: string = baseUrl;
  data: Pagination<CategoryModel> = new Pagination<CategoryModel>();
  trashData: Pagination<CategoryModel> = new Pagination<CategoryModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook, cilCloudUpload };
  showChildrenByParentId = signal<number | null>(null);

  createForm: FormGroup = new FormGroup({
    parentId: new FormControl(null),
    nameEN: new FormControl(null, Validators.required),
    nameVN: new FormControl(null, Validators.required),
    nameCN: new FormControl(null, Validators.required), // Optional, as not all categories may have a Chinese name
    priority: new FormControl(1, Validators.min(1)),
    note: new FormControl(null, Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    children: new FormControl([])
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    parentId: new FormControl(null),
    nameEN: new FormControl(null, Validators.required),
    nameVN: new FormControl(null, Validators.required),
    nameCN: new FormControl(null, Validators.required), // Optional, as not all categories may have a Chinese name
    priority: new FormControl(1, Validators.min(1)),
    note: new FormControl(null, Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    children: new FormControl([])
  });

  constructor(private categoryService: CategoryService,
    private toastService: ToastService) { }
  //#endregion

  //#region Lifecycle Hooks
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.categoryService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe({
      next: (res) => {
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
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  //table tree
  toggleNode(node: CategoryModel): void {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.showChildrenByParentId.set(node.id);
    } else {
      this.showChildrenByParentId.set(null);
    }
  }
  getTrashData() {
    this.categoryService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe({
      next: (res) => {
        this.trashData = res.data;
        this.trashPageInformation.currentPage = this.trashData.currentPage;
        this.trashPageInformation.totalItems = this.trashData.totalItems;
        this.trashPageInformation.totalPages = this.trashData.totalPages;
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
    this.categoryService.restore(id).subscribe({
      next: (res) => {
        this.getTrashData();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      }
    });
  }
  deleteData(id: number) {
    this.categoryService.delete(id).subscribe({
      next: (res) => {
        this.getTrashData();
        this.toastService.showToast(EColors.success, res.message);
      }
    });
  }
  //#endregion

  //#region Create Form
  // Helper to append form values to FormData
  onSubmitCreateForm() {
    if (this.createForm.valid) {

      this.categoryService.create(this.createForm.value).subscribe({
        next: (res) => {
          this.toggleLiveCreateModel();
          this.getData();
          this.toastService.showToast(EColors.success, res.message);
          this.createForm.reset();
          this.createForm.patchValue({ isActive: true, priority: 1 });
        },
        error: (failure) => {
          this.toastService.showToast(EColors.danger, failure.error.message);
        }
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

  get nameENCreateForm() { return this.createForm.get('nameEN'); }
  get nameVNCreateForm() { return this.createForm.get('nameVN'); }
  get nameCNCreateForm() { return this.createForm.get('nameCN'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  get isActiveCreateForm() { return this.createForm.get('isActive'); }
  get priorityCreateForm() { return this.createForm.get('priority'); }
  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.categoryService.getById(id).subscribe({
      next: (res) => {
        this.updateForm.patchValue(res.data);
        this.toggleLiveUpdateModel();
      }
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.categoryService.update(this.updateForm.value).subscribe({
        next: (res) => {
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

  get nameENUpdateForm() { return this.updateForm.get('nameEN'); }
  get nameVNUpdateForm() { return this.updateForm.get('nameVN'); }
  get nameCNUpdateForm() { return this.updateForm.get('nameCN'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  get isActiveUpdateForm() { return this.updateForm.get('isActive'); }
  get priorityUpdateForm() { return this.updateForm.get('priority'); }
  //#endregion

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.categoryService.softDelete(this.deleteById).subscribe({
      next: () => {
        this.toggleLiveDelete();
        this.getData();
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
}
