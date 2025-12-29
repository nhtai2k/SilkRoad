import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook, cilChevronCircleRightAlt,cilChevronCircleDownAlt } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective,
   FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent } from '@coreui/angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { BOMCategoryTags, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { BOMConfigurationService } from '@services/bom-services/bom-configuration.service';
import { BOMConfigurationModel } from '@models/bom-models/bom-configuration.model';
import { BookIconComponent } from "@components/icons/book-icon.component";

@Component({
  selector: 'app-bom-configuration',
  standalone: true,
  imports: [ModalBodyComponent, CommonModule, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective, FormSelectDirective, BookIconComponent],
  templateUrl: './bom-configuration.component.html',
  styleUrl: './bom-configuration.component.scss'
})
export class BomConfigurationComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleTrashModal: boolean = false;
  trashData: Pagination<BOMConfigurationModel> = new Pagination<BOMConfigurationModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular };
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  tags: string[] = BOMCategoryTags;
  defaultTags: string[] = [];
  data: Pagination<BOMConfigurationModel> = new Pagination<BOMConfigurationModel>();
  showChildrenByParentId  = signal<number | null>(null);

  createForm: FormGroup = new FormGroup({
    parentId: new FormControl<number | null>(null),
    code: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    tag: new FormControl(''),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)])
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    parentId: new FormControl<number | null>(null),
    code: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    tag: new FormControl(''),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)])
  });

  constructor(private bomCategoryService: BOMConfigurationService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.bomCategoryService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
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
    toggleNode(node: BOMConfigurationModel): void {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.showChildrenByParentId.set(node.id);
    } else {
      this.showChildrenByParentId.set(null);
    }
  }

  //#region Trash
  getTrashData() {
    this.bomCategoryService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.bomCategoryService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteData(id: number) {
    this.bomCategoryService.delete(id).subscribe((res) => {
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
      this.bomCategoryService.create(this.createForm.value).subscribe((res) => {
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
  get nameCreateForm() { return this.createForm.get('name'); }
  get priorityCreateForm() { return this.createForm.get('priority'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.bomCategoryService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      //this.defaultTags = res.data.tags ? JSON.parse(res.data.tags) : [];
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.bomCategoryService.update(this.updateForm.value).subscribe((res) => {
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

  get nameUpdateForm() { return this.updateForm.get('name'); }
  get priorityUpdateForm() { return this.updateForm.get('priority'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  //#endregion

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.bomCategoryService.softDelete(this.deleteById).subscribe(() => {
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
