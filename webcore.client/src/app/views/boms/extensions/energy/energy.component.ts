import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudDownload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { EnergyModel } from '@models/bom-models/energy.model';
import { EnergyService } from '@services/bom-services/energy.service';
import { UnitService } from '@services/bom-services/unit.service';
import { OptionModel } from '@models/option.model';
import { InputSeparatorComponent } from "@components/inputs/input-separator/input-separator.component";
import { TreeSelectComponent } from "@components/selects/tree-select/tree-select.component";

@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrl: './energy.component.scss',
  imports: [ModalBodyComponent, CommonModule, FormControlDirective, FormLabelDirective, ModalComponent, ButtonDirective, FormDirective,
    ReactiveFormsModule, FormCheckComponent, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent,
    IconDirective, InputSeparatorComponent, TreeSelectComponent]
})
export class EnergyComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  data: Pagination<EnergyModel> = new Pagination<EnergyModel>();
  unitList: OptionModel[] = [];
  trashData: Pagination<EnergyModel> = new Pagination<EnergyModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudDownload };
  currentPrice: number = 0;
  currentUnitId: number = -1;
  expandKeys = signal<any[]>([]);
  baseUnitId = signal<string>('');

  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    unitId: new FormControl(-1, Validators.required),
    code: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.min(0)),
    isActive: new FormControl(true),
    note: new FormControl('')
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    unitId: new FormControl(-1, Validators.required),
    code: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.min(0)),
    isActive: new FormControl(true),
    note: new FormControl('')
  });
  // #endregion
  // #region Constructor
  constructor(private energyService: EnergyService,
    private unitService: UnitService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getData();
    this.getUnitData();
  }

  getUnitData() {
    this.unitService.getTreeOptionList().subscribe((res) => {
      this.unitList = res.data;
    });
  }

  getData() {
    this.energyService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
      console.log(this.data);
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
  onChangeUnit(event: any, type: string) {
    if (type === 'create') {
      this.createForm.patchValue({
        unitId: event
      });
    } else if (type === 'update') {
      this.updateForm.patchValue({
        unitId: event
      });
    }
  }
  onChangePrice(event: any, type: string) {
    if (type === 'create') {
      this.createForm.patchValue({
        price: event
      });
    } else if (type === 'update') {
      this.updateForm.patchValue({
        price: event
      });
    }
  }
  exportExcel() {
    this.energyService.exportExcel().subscribe((res) => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EnergyData.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
      this.toastService.showToast(EColors.success, 'Export data successfully.');
    }, (error) => {
      this.toastService.showToast(EColors.danger, 'Failed to export data.');
    });
  }
  // #endregion
  //#region Create
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.energyService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({
          name: '',
          code: '',
          unitId: -1,
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
    this.currentPrice = 0;
    this.currentUnitId = -1;
  }
  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  get nameCreateForm() { return this.createForm.get('name'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get priceCreateForm() { return this.createForm.get('price'); }
  get unitIdCreateForm() { return this.createForm.get('unitId'); }
  //#endregion

  //#region Update
  updateData(id: number) {
    this.energyService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.currentPrice = res.data.price ?? 0;
      this.currentUnitId = res.data.unitId;
      this.unitService.getById(res.data.unitId).subscribe((unit) => {
        this.expandKeys.set([unit.data.unitGroupId]);
        this.baseUnitId.set(unit.data.unitGroupId + '_' + unit.data.id);
      });
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.energyService.update(this.updateForm.value).subscribe((res) => {
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
  get codeUpdateForm() { return this.updateForm.get('code'); }
  get priceUpdateForm() { return this.updateForm.get('price'); }
  get unitIdUpdateForm() { return this.updateForm.get('unitId'); }
  //#endregion

  //#region Delete
  // Remove duplicate deleteData, rename old deleteData to softDeleteData for soft delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.energyService.softDelete(this.deleteById).subscribe((res) => {
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
    this.energyService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.energyService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteData(id: number) {
    this.energyService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion
}
