import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TemplateIdDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilPlaylistAdd } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { OptionModel } from '@models/option.model';
import { DishService } from '@services/restaurant-services/dish.service';
import { CategoryService } from '@services/restaurant-services/category.service';
import { DishModel } from '@models/restaurant-models/dish.model';
import { RouterLink } from '@angular/router';
import { TreeSelectComponent } from "@components/selects/tree-select/tree-select.component";

@Component({
  selector: 'app-dishes',
  imports: [ModalBodyComponent, CommonModule, IconDirective, ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, AccordionButtonDirective, FormSelectDirective,
    AccordionComponent, RouterLink, AccordionItemComponent, TemplateIdDirective, TreeSelectComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss'
})
export class DishesComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  categoryOptions: OptionModel[] = [];
  data: Pagination<DishModel> = new Pagination<DishModel>();
  trashData: Pagination<DishModel> = new Pagination<DishModel>();

  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilPlaylistAdd };

  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(1),
    pageSize: new FormControl(5),
    typeId: new FormControl(-1), // -1: All, 0: Single Dish, 1: Group Dish
    categoryId: new FormControl(-1),
    name: new FormControl('')
  });
  //#endregion

  constructor(private dishService: DishService,
    private categoryService: CategoryService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getData();
    this.trashPageInformation.pageSize = 5;
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getTreeOptionList().subscribe({
      next: (res) => {
        this.categoryOptions = res.data;
        console.log(this.categoryOptions);
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
  }
  onSubmitFilterForm() {
    this.getData();
  }
  exportExcel() {
    this.dishService.exportExcel().subscribe({
      next: (res) => {
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'DishData.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        this.toastService.showToast(EColors.success, 'Export data successfully.');
      },
      error: (error) => {
        this.toastService.showToast(EColors.danger, 'Failed to export data.');
      }
    });
  }
  //#region Main Table
  getData() {
    this.filterForm.patchValue({
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize
    });
    this.dishService.getByFilter(this.filterForm.value).subscribe({
      next: (res) => {
        this.data = res.data;
        this.pageInformation.currentPage = this.data.currentPage;
        this.pageInformation.totalItems = this.data.totalItems;
        this.pageInformation.totalPages = this.data.totalPages;
        this.pageInformation.pageIndex = this.data.pageIndex;
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
  //#endregion

  //#region Trash
  getTrashData() {
    this.dishService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe({
      next: (res) => {
        this.trashData = res.data;
        this.trashPageInformation.currentPage = this.trashData.currentPage;
        this.trashPageInformation.totalItems = this.trashData.totalItems;
        this.trashPageInformation.totalPages = this.trashData.totalPages;
      }
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
    this.dishService.restore(id).subscribe({
      next: (res) => {
        this.getTrashData();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      }
    });
  }
  deleteDataTrash(id: number) {
    this.dishService.delete(id).subscribe({
      next: (res) => {
        this.getTrashData();
        this.toastService.showToast(EColors.success, res.message);
      }
    });
  }
  //#endregion

 
  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.dishService.softDelete(this.deleteById).subscribe({
      next: (res) => {
        this.toggleLiveDelete();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
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
