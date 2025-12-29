import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent, TableDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular } from '@coreui/icons';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { UnitGroupModel } from '@models/bom-models/unit-group.model';
import { EColors } from '@common/global';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { UnitGroupService } from '@services/bom-services/unit-group.service';
import { UnitComponent } from "./unit.component";
import { OptionModel } from '@models/option.model';
import { BookIconComponent } from "@components/icons/book-icon.component";
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-unit-group',
  templateUrl: './unit-group.component.html',
  styleUrl: './unit-group.component.scss',
  imports: [ModalBodyComponent, CommonModule, FormControlDirective, FormLabelDirective, TableDirective,
    ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, FormCheckComponent, IconDirective,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent,
     UnitComponent, BookIconComponent],
})
export class UnitGroupComponent implements OnInit {
  @ViewChild('unitComponent') unitComponent!: UnitComponent;
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  unitGroupList: OptionModel[] = [];
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  data: Pagination<UnitGroupModel> = new Pagination<UnitGroupModel>();
  trashData: Pagination<UnitGroupModel> = new Pagination<UnitGroupModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular };
  showChildrenByParentId = signal<number | null>(null);

  createForm: FormGroup = new FormGroup({
    priority: new FormControl(1, [Validators.max(255), Validators.min(1)]),
    name: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    note: new FormControl(''),
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    priority: new FormControl(1, [Validators.max(255), Validators.min(1)]),
    name: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    note: new FormControl(''),
  });

  constructor(private unitGroupService: UnitGroupService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.getData();
  }

  public reloadData = () => this.getData();

  getData() {
    this.unitGroupService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
      //this.unitGroupList = this.data.items.map(item => ({ id: item.id, name: item.name }));
      this.data.items.forEach(item => {
        item.expanded = false; // Reset expanded state for each item
        if (this.showChildrenByParentId() === item.id) {
          item.expanded = true; // Set expanded state if it matches the current showChildrenBy
          // parentId
        }
        this.unitGroupList.push({ id: item.id, name: item.name });
      });
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
  //table tree
  toggleNode(node: UnitGroupModel): void {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.showChildrenByParentId.set(node.id);
    } else {
      this.showChildrenByParentId.set(null);
    }
  }

  //#region Create
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.unitGroupService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({
          name: '',
          priority: 1,
          isActive: true
        })
      }, (failure) => {
        console.error(failure);
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
  get priorityCreateForm() { return this.createForm.get('priority'); }
  //#endregion

  //#region Update
  updateData(id: number) {
    this.unitGroupService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.unitGroupService.update(this.updateForm.value).subscribe((res) => {
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
  //#endregion

  //#region Delete
  // Remove duplicate deleteData, rename old deleteData to softDeleteData for soft delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.unitGroupService.softDelete(this.deleteById).subscribe((res) => {
      this.toggleLiveDelete();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
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
    this.unitGroupService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.unitGroupService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteData(id: number) {
    this.unitGroupService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion

    //#region Unit
  createUnitModel(parentId: number) {
    this.unitComponent.toggleLiveCreateModel(parentId);
  }
  updateUnitModel(id: number) {
    this.unitComponent.updateData(id);
  }
  deleteUnitModel(id: number) {
    this.unitComponent.softDeleteData(id);
  }
  //#endregion
}
