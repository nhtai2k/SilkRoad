import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  ButtonCloseDirective, 
  ButtonDirective, 
  ModalBodyComponent, 
  ModalComponent, 
  ModalFooterComponent, 
  ModalHeaderComponent,
  FormDirective, 
  FormSelectDirective, 
  AccordionButtonDirective, 
  AccordionComponent, 
  AccordionItemComponent, 
  TemplateIdDirective 
} from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudUpload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
// Models
import { PageInformation, Pagination } from '@models/pagination.model';
import { PropertyModel } from '@models/bom-models/property.model';
import { OptionModel } from '@models/option.model';

// Services
import { ToastService } from '@services/helper-services/toast.service';
import { PropertyService } from '@services/bom-services/property.service';
import { DepartmentService } from '@services/bom-services/department.service';
import { UnitService } from '@services/bom-services/unit.service';
import { PropertyTypeService } from '@services/bom-services/property-type.service';

// Common
import { baseUrl, EColors, propertyGroups } from '@common/global';

// Components
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { ConsumablePropertyComponent } from "./consumable-property/consumable-property.component";
import { DurablePropertyComponent } from "./durable-property/durable-property.component";
import { EnergyConsumablePropertyComponent } from "./energy-consumable-property/energy-consumable-property.component";
import { EnergyIndependentPropertyComponent } from "./energy-independent-property/energy-independent-property.component";
import { EnergyService } from '@services/bom-services/energy.service';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";

@Component({
  selector: 'app-property',
  imports: [
    // Angular Material/CoreUI Components
    ModalBodyComponent,
    ModalComponent,
    ButtonDirective,
    FormDirective,
    ReactiveFormsModule,
    ModalFooterComponent,
    ButtonCloseDirective,
    ModalHeaderComponent,
    FormSelectDirective,
    CommonModule,
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective,
    IconDirective,
    // Custom Components
    DataTableComponent,
    ConsumablePropertyComponent,
    DurablePropertyComponent,
    EnergyConsumablePropertyComponent,
    EnergyIndependentPropertyComponent,
    SelectSearchComponent
],
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss'
})
export class PropertyComponent implements OnInit {
  @ViewChild('consumablePropertyComponent') consumablePropertyComponent!: ConsumablePropertyComponent;
  @ViewChild('durablePropertyComponent') durablePropertyComponent!: DurablePropertyComponent;
  @ViewChild('energyConsumablePropertyComponent') energyConsumablePropertyComponent!: EnergyConsumablePropertyComponent;
  @ViewChild('energyIndependentPropertyComponent') energyIndependentPropertyComponent!: EnergyIndependentPropertyComponent;
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  departmentList: OptionModel[] = [];
  unitList: OptionModel[] = [];
  energyList: OptionModel[] = [];
  data: Pagination<PropertyModel> = new Pagination<PropertyModel>();
  trashData: Pagination<PropertyModel> = new Pagination<PropertyModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudUpload };
  baseUrl: string = baseUrl;
  propertyGroups: OptionModel[] = propertyGroups;
  reviewCreateUploadImage: string = '';
  reviewUpdateUploadImage: string = '';
  propertyGroup = new FormControl(-1,Validators.min(0));
  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(1),
    pageSize: new FormControl(5),
    propertyTypeId: new FormControl(-1),
    departmentId: new FormControl(-1),
    unitId: new FormControl(-1),
    searchText: new FormControl(''),
  });

  constructor(private propertyService: PropertyService,
    private departmentService: DepartmentService,
    private unitService: UnitService,
    private energyService: EnergyService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getData();
    this.getDepartmentList();
    this.getUnitList();
    this.getEnergyList();
  }
  getEnergyList() {
    this.energyService.getOptionList().subscribe((res) => {
      this.energyList = res.data;
    });
  }
  getDepartmentList() {
    this.departmentService.getOptionList().subscribe((res) => {
      this.departmentList = res.data;
    });
  }
  getUnitList() {
    this.unitService.getOptionList().subscribe((res) => {
      this.unitList = res.data;
    });
  }
  onSubmitFilterForm() {
    this.getData();
  }

  getData() {
    this.filterForm.patchValue({
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize
    });
    this.propertyService.getAllByFilter(this.filterForm.value).subscribe((res) => {
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
  onChangeUnit(event: any) {
    this.filterForm.patchValue({ unitId: event });
  }

  //#region Create
  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
     //this.energyIndependentPropertyComponent.toggleLiveCreateModel();
  }
  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  onClickCreateProperty() {
    if (this.propertyGroup.valid) {
      // Call the service to create the property
      this.toggleLiveCreateModel();
      const propertyGroupValue = this.propertyGroup.value;
      if (propertyGroupValue == 1) {
        this.consumablePropertyComponent.toggleLiveCreateModel();
      } else if (propertyGroupValue == 2) {
        this.energyConsumablePropertyComponent.toggleLiveCreateModel();
      } else if (propertyGroupValue == 3) {
        this.energyIndependentPropertyComponent.toggleLiveCreateModel();
      }
    }
  }
  get propertyGroupAttr() { return this.propertyGroup; }
  //#endregion
updateData(id: number, propertyGroupId: number) {

    if (propertyGroupId == 1) {
        this.consumablePropertyComponent.updateData(id);
      } else if (propertyGroupId == 2) {
        this.energyConsumablePropertyComponent.updateData(id);
      } else if (propertyGroupId == 3) {
        this.energyIndependentPropertyComponent.updateData(id);
      }
}

  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.propertyService.softDelete(this.deleteById).subscribe((res) => {
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
    this.propertyService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.propertyService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteData(id: number) {
    this.propertyService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion
}
