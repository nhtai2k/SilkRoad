import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent,
  ModalHeaderComponent, FormDirective, AccordionButtonDirective, AccordionComponent, AccordionItemComponent,
  TemplateIdDirective
} from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudDownload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { MaterialService } from '@services/bom-services/material.service';
import { MaterialModel } from '@models/bom-models/material.model';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { MaterialGroupService } from '@services/bom-services/material-group.service';
import { UnitService } from '@services/bom-services/unit.service';
import { OptionModel } from '@models/option.model';
import { MaterialCategoryService } from '@services/bom-services/material-category.service';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-material',
  imports: [ModalBodyComponent, CommonModule,
    ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective,
    AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective, SelectSearchComponent, RouterLink],
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss'
})
export class MaterialComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  materialGroupList: OptionModel[] = [];
  materialCategoryList: OptionModel[] = [];
  unitList: OptionModel[] = [];
  //unitTreeList: OptionModel[] = [];
  data: Pagination<MaterialModel> = new Pagination<MaterialModel>();
  trashData: Pagination<MaterialModel> = new Pagination<MaterialModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudDownload };
  baseUrl: string = baseUrl;
  
  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(1),
    pageSize: new FormControl(5),
    materialGroupId: new FormControl(-1),
    materialCategoryId: new FormControl(-1),
    unitId: new FormControl(-1),
    searchText: new FormControl(''),
  });

  //#endregion
  //#region Constructors and Lifecycle Hooks
  constructor(private materialService: MaterialService,
    private materialGroupService: MaterialGroupService,
    private materialCategoryService: MaterialCategoryService,
    private unitService: UnitService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getData();
    this.getMaterialGroupList();
    this.getUnitList();
    this.getMaterialCategoryList();
  }

  onSubmitFilterForm() {
    this.getData();
  }

  getMaterialCategoryList() {
    this.materialCategoryService.getOptionList().subscribe((res) => {
      this.materialCategoryList = res.data;
    });
  }

  getMaterialGroupList() {
    this.materialGroupService.getOptionList().subscribe((res) => {
      this.materialGroupList = res.data;
    });
  }

  getUnitList() {
    this.unitService.getOptionList().subscribe((res) => {
      this.unitList = [{ id: -1, name: 'Tất cả đơn vị tính' }, ...res.data];
    });
    // this.unitService.getTreeOptionList().subscribe((res) => {
    //   this.unitTreeList = res.data;
    // });
  }

  getData() {
    this.filterForm.patchValue({
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize
    });
    this.materialService.getAllByFilter(this.filterForm.value).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
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

  onChangeMaterialGroup(event: any) {
    this.filterForm.patchValue({ materialGroupId: event });
  }

  onChangeMaterialCategory(event: any) {
    this.filterForm.patchValue({ materialCategoryId: event });
  }

  onChangeUnit(event: any) {
    this.filterForm.patchValue({ unitId: event });
  }
  //#endregion
 
  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }

  onConfirmDelete() {
    this.materialService.softDelete(this.deleteById).subscribe((res) => {
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
    this.materialService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.materialService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }

  deleteData(id: number) {
    this.materialService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion
}
