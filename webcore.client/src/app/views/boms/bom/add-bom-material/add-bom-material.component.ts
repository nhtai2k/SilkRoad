import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FormDirective, FormLabelDirective, FormSelectDirective, FormControlDirective,
  ButtonDirective, ButtonCloseDirective, ModalBodyComponent, ModalComponent,
  ModalHeaderComponent,
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  TemplateIdDirective
} from '@coreui/angular';
import { OptionModel } from '@models/option.model';
import { MaterialService } from '@services/bom-services/material.service';
import { MaterialGroupService } from '@services/bom-services/material-group.service';
import { MaterialCategoryService } from '@services/bom-services/material-category.service';
import { PageInformation, Pagination } from '@models/pagination.model';
import { MaterialModel } from '@models/bom-models/material.model';
import { baseUrl } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";

@Component({
  selector: 'app-add-bom-material',
  templateUrl: './add-bom-material.component.html',
  styleUrl: './add-bom-material.component.scss',
  imports: [FormDirective, FormLabelDirective, IconDirective,
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective,
    FormControlDirective, ButtonDirective, ButtonCloseDirective, ModalBodyComponent, ModalComponent,
    ModalHeaderComponent, CommonModule, ReactiveFormsModule, FormsModule, DataTableComponent, SelectSearchComponent]
})
export class AddBomMaterialComponent implements OnInit {
  //#region Properties
  @Input() unitOptionList: OptionModel[] = [];
  @Input() materialGroupOptionList: OptionModel[] = [];
  @Input() materialCatagoryOptionList: OptionModel[] = [];
  pageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  data: Pagination<MaterialModel> = new Pagination<MaterialModel>();
  categoryId = signal('');
  bomId = signal(-1);
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook };
  visibleMaterialModal: boolean = false;
  visibleAddMaterialModal: boolean = false;
  //Filter for BOM Material
  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(1),
    pageSize: new FormControl(5),
    materialGroupId: new FormControl(-1),
    materialCategoryId: new FormControl(-1),
    unitId: new FormControl(-1),
    searchText: new FormControl(''),
  });

  //Add BOM Material form
  addBomMaterialForm: FormGroup = new FormGroup({
    materialId: new FormControl(-1, Validators.min(1)),
    materialName: new FormControl(''),
    materialGroupName: new FormControl(''),
    materialCategoryName: new FormControl(''),
    unitName: new FormControl(''),
    quantity: new FormControl(1, [Validators.required]),
    price: new FormControl(0),
    amount: new FormControl(0),
    note: new FormControl(''),
  });
  //#endregion

  //#region constructor
  constructor(private materialService: MaterialService) { }
  ngOnInit(): void {
    this.pageInformation.pageSize = 5;
    this.onSubmitFilter();
  }
  onMaterialGroupChange(value: any) {
    this.filterForm.patchValue({
      materialGroupId: value
    });
  }
  onMaterialCategoryChange(value: any) {
    this.filterForm.patchValue({
      materialCategoryId: value
    });
  }
  onUnitChange(value: any) {
    this.filterForm.patchValue({
      unitId: value
    });
  }
  getUnitNameById(unitId: number): string {
    const unit = this.unitOptionList.find(u => u.id === unitId);
    return unit ? unit.name : '';
  }
  getMaterialGroupNameById(materialGroupId: number): string {
    const materialGroup = this.materialGroupOptionList.find(mg => mg.id === materialGroupId);
    return materialGroup ? materialGroup.name : '';
  }
  getMaterialCategoryNameById(materialCategoryId: number): string {
    const materialCategory = this.materialCatagoryOptionList.find(mc => mc.id === materialCategoryId);
    return materialCategory ? materialCategory.name : '';
  }
  //#endregion

  //#region Filter BOM Material
  onPageIndexChange(index: any) {
    this.pageInformation.pageIndex = index;
    this.onSubmitFilter();
  }
  onPageSizeChange(size: any) {
    this.pageInformation.pageSize = size;
    this.pageInformation.pageIndex = 1;
    this.onSubmitFilter();
  }
  onSubmitFilter() {
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
  //#endregion
  // #region Material 
  toggleLiveMaterialModel(bomCategoryId?: string, bomId?: number) {
    this.visibleMaterialModal = !this.visibleMaterialModal;
    if (bomCategoryId && bomId) {
      this.categoryId.set(bomCategoryId);
      this.bomId.set(bomId);
    }
  }
  handleLiveMaterialModelChange(event: any) {
    this.visibleMaterialModal = event;
  }
  //#endregion
  //#region  Add Material
  addBONMaterial(item: MaterialModel) {
    this.addBomMaterialForm.patchValue({
      materialId: item.id,
      materialName: item.name,
      materialGroupName: this.getMaterialGroupNameById(item.materialGroupId),
      materialCategoryName: this.getMaterialCategoryNameById(item.materialCategoryId),
      unitName: this.getUnitNameById(item.baseUnitId),
      quantity: 1,
      price: item.price
    }); 
    console.log(this.addBomMaterialForm.value);
    this.toggleLiveAddMaterialModel();
  }
  toggleLiveAddMaterialModel() {
    this.visibleAddMaterialModal = !this.visibleAddMaterialModal;
  }
  handleLiveAddMaterialModelChange(event: any) {
    this.visibleAddMaterialModal = event;
  }

  onSubmitAddBomMaterialForm() {
    if (this.addBomMaterialForm.invalid) {
      return;
    }
    const formValue = this.addBomMaterialForm.value;
    console.log(formValue);
    this.addBomMaterialForm.reset();
    this.addBomMaterialForm.patchValue({
      materialGroupId: -1,
      materialId: -1,
      unitId: 0,
      price: 0,
      quantity: 1,
      amount: 0
    });
  }

  get materialGroupIdAddBomMaterialForm() { return this.addBomMaterialForm.get('materialGroupId'); }
  get quantityAddBomMaterialForm() { return this.addBomMaterialForm.get('quantity'); }

  //#endregion
}
