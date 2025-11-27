import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective,
   FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent } from '@coreui/angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { BookIconComponent } from "@components/icons/book-icon.component";
import { CategoryService } from '@services/personal-finance-services';
import { CategoryModel } from '@models/personal-finance-models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  imports: [ModalBodyComponent, CommonModule, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective, FormSelectDirective, BookIconComponent],

})
export class CategoriesComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleTrashModal: boolean = false;
  trashData: Pagination<CategoryModel> = new Pagination<CategoryModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX };
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  defaultTags: string[] = [];
  data: Pagination<CategoryModel> = new Pagination<CategoryModel>();
  showChildrenByParentId  = signal<number | null>(null);

  createForm: FormGroup = new FormGroup({
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)])
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)])
  });

  constructor(private categoryService: CategoryService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.categoryService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
      // Reset visibleSubItems for fresh data
      this.data.items.forEach(item => {
          item.expanded = false; // Reset expanded state for each item
          if (this.showChildrenByParentId() === item.id) {
            item.expanded = true; // Set expanded state if it matches the current showChildrenBy
            // parentId
          }
        });
    });
  }
  // Wrapper functions for child component context binding
  public toggleLiveCreateModelWrapper = (id: number | null) => this.toggleLiveCreateModel(id);
  public updateDataWrapper = (id: number) => this.updateData(id);
  public softDeleteDataWrapper = (id: number) => this.softDeleteData(id);
  
  onPageIndexChange(index: any) {
    this.pageInformation.pageIndex = index;
    this.getData();
  }
  onPageSizeChange(size: any) {
    this.pageInformation.pageSize = size;
    this.pageInformation.pageIndex = 1;
    this.getData();
  }
    onChangeMultipleOptions(event:string[], type: string) {
      if (type === 'create') {
        this.createForm.patchValue({ tags: JSON.stringify(event) });
      }else if (type === 'update') {
        this.updateForm.patchValue({ tags: JSON.stringify(event) });
      }
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

  //#region Trash
  getTrashData() {
    this.categoryService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.categoryService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteData(id: number) {
    this.categoryService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  // showSubItems(id: number) {
  //   const current = this.visibleSubItems();
  //   this.visibleSubItems.set({ ...current, [id]: !current[id] });
  //   this.visibleSubItemId = id;
  // }
  //#endregion
  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.categoryService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({ isActive: true, parentId: null });
      }, (failure) => {
        console.error(failure);
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  toggleLiveCreateModel(parentId: number | null = null) {
    this.visibleCreateModal = !this.visibleCreateModal;
    if (parentId != null) {
      this.createForm.patchValue({ parentId });
    }else{
      this.createForm.patchValue({ parentId: null });
    }
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  get nameVNCreateForm() { return this.createForm.get('nameVN'); }
  get nameENCreateForm() { return this.createForm.get('nameEN'); }
  get priorityCreateForm() { return this.createForm.get('priority'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.categoryService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      //this.defaultTags = res.data.tags ? JSON.parse(res.data.tags) : [];
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.categoryService.update(this.updateForm.value).subscribe((res) => {
        this.toggleLiveUpdateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
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

  get nameVNUpdateForm() { return this.updateForm.get('nameVN'); }
  get nameENUpdateForm() { return this.updateForm.get('nameEN'); }
  get priorityUpdateForm() { return this.updateForm.get('priority'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  //#endregion

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.categoryService.softDelete(this.deleteById).subscribe(() => {
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
