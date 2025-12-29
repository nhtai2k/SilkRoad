import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FormDirective, FormLabelDirective, FormSelectDirective, FormControlDirective,
  ButtonDirective, ButtonCloseDirective, ModalBodyComponent, ModalComponent,
  ModalHeaderComponent, TableDirective,
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  TemplateIdDirective
} from '@coreui/angular';
import { OptionModel } from '@models/option.model';
import { PropertyService } from '@services/bom-services/property.service';
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PropertyModel } from '@models/bom-models/property.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { baseUrl } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";

@Component({
  selector: 'app-add-bom-property',
  templateUrl: './add-bom-property.component.html',
  styleUrl: './add-bom-property.component.scss',
  imports: [FormDirective, FormLabelDirective,
    ButtonDirective, IconDirective,
    ButtonCloseDirective, ModalBodyComponent, ModalComponent, ModalHeaderComponent,
    CommonModule,
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective,
    ReactiveFormsModule, DataTableComponent, SelectSearchComponent]
})
export class AddBomPropertyComponent implements OnInit {
  @Input() unitOptionList: OptionModel[] = [];
  @Input() propertyTypeOptionList: OptionModel[] = [];
  @Input() departmentOptionList: OptionModel[] = [];
  data: Pagination<PropertyModel> = new Pagination<PropertyModel>();
  pageInformation: PageInformation = new PageInformation();
  categoryId = signal('');
  bomId = signal(-1);
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook };
  baseUrl: string = baseUrl;
  visibleAddPropertyModal: boolean = false;
  visiblePropertyModal: boolean = false;
  //FILTER for BOM Property
  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(1),
    pageSize: new FormControl(5),
    propertyTypeId: new FormControl(-1),
    departmentId: new FormControl(-1),
    unitId: new FormControl(-1),
    searchText: new FormControl(''),
  });
  //Add BOM Property form
  addBomPropertyForm: FormGroup = new FormGroup({
    propertyTypeId: new FormControl(-1),
    propertyId: new FormControl(-1, Validators.min(1)),
    quantity: new FormControl(1, [Validators.required])
  });
  //#endregion

  //#region constructor
  constructor(private propertyService: PropertyService) { }
  ngOnInit(): void {
    this.pageInformation.pageSize = 5;
    this.onSubmitFilter();
  }
  onPropertyChange(event: any) {
    this.filterForm.patchValue({
      propertyTypeId: event.id
    });
  }
  onUnitChange(event: any) {
    this.filterForm.patchValue({
      unitId: event.id
    });
  }
  onDepartmentChange(event: any) {
    this.filterForm.patchValue({
      departmentId: event.id
    });
  }
  onPageIndexChange(index: any) {
    this.pageInformation.pageIndex = index;
    this.onSubmitFilter();
  }
  onPageSizeChange(size: any) {
    this.pageInformation.pageSize = size;
    this.pageInformation.pageIndex = 1;
    this.onSubmitFilter();
  }
  getUnitNameById(id: number): string {
    const unit = this.unitOptionList.find(item => item.id === id);
    return unit ? unit.name : '';
  }
  getPropertyTypeNameById(id: number): string {
    const propertyType = this.propertyTypeOptionList.find(item => item.id === id);
    return propertyType ? propertyType.name : '';
  }
  getDepartmentNameById(id: number): string {
    const department = this.departmentOptionList.find(item => item.id === id);
    return department ? department.name : '';
  }
  //#endregion
  //#region Filter Property
  toggleLivePropertyModel(bomCategoryId?: string, bomId?: number) {
    this.visiblePropertyModal = !this.visiblePropertyModal;
    if (bomCategoryId && bomId) {
      this.categoryId.set(bomCategoryId);
      this.bomId.set(bomId);
    }
  }

  handleLivePropertyModelChange(event: any) {
    this.visiblePropertyModal = event;
  }

  onSubmitFilter() {
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

  //#endregion
  //#region Add BOM Property Form
  addBONProperty(item: PropertyModel) {
    this.addBomPropertyForm.patchValue({
      propertyTypeId: item.propertyGroupId,
      propertyId: item.id,
      quantity: 1
    });
    this.toggleLiveAddPropertyModel();
  }
  toggleLiveAddPropertyModel() {
    this.visibleAddPropertyModal = !this.visibleAddPropertyModal;
  }
  handleLiveAddPropertyModelChange(event: any) {
    this.visibleAddPropertyModal = event;
  }

  onSubmitAddBomPropertyForm() {
    if (this.addBomPropertyForm.invalid) {
      return;
    }
    // this.onSubmitAddBomPropertyFormWrapper(this.addBomPropertyForm.value);
    this.addBomPropertyForm.reset();
    this.addBomPropertyForm.patchValue({
      propertyTypeId: -1,
      propertyId: -1,
      quantity: 1
    });
  }
  get propertyTypeIdAddBomPropertyForm() { return this.addBomPropertyForm.get('propertyTypeId'); }
  get propertyIdAddBomPropertyForm() { return this.addBomPropertyForm.get('propertyId'); }
  get quantityAddBomPropertyForm() { return this.addBomPropertyForm.get('quantity'); }
  //#endregion
}
