import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormDirective, FormLabelDirective, FormControlDirective,
  ButtonDirective, CardComponent, CardBodyComponent, CollapseDirective} from '@coreui/angular';
import { DishService } from '@services/bom-services/dish.service';
import { BomService } from '@services/bom-services/bom.service';
import { OptionModel } from '@models/option.model';
import { ToastService } from '@services/helper-services/toast.service';
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook } from '@coreui/icons';
import { EColors } from '@common/global';
import { BOMCategoryModel } from '@models/bom-models/bom.model';
import { IconDirective } from '@coreui/icons-angular';
import { AddBomMaterialComponent } from '../add-bom-material/add-bom-material.component';
import { AddBomPropertyComponent } from '../add-bom-property/add-bom-property.component';
import { UnitService } from '@services/bom-services/unit.service';
import { MaterialGroupService } from '@services/bom-services/material-group.service';
import { MaterialCategoryService } from '@services/bom-services/material-category.service';
import { PropertyTypeService } from '@services/bom-services/property-type.service';
import { DepartmentService } from '@services/bom-services/department.service';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  imports: [FormDirective, FormLabelDirective, IconDirective,
    FormControlDirective, ButtonDirective, RouterLink, CollapseDirective,
    CardComponent, CardBodyComponent, CommonModule,
    ReactiveFormsModule, AddBomMaterialComponent, AddBomPropertyComponent, SelectSearchComponent]
})
export class UpdateComponent implements OnInit {
  //#region Properties
  @ViewChild('addBomMaterialComponent') addBomMaterialComponent!: AddBomMaterialComponent;
  @ViewChild('addBomPropertyComponent') addBomPropertyComponent!: AddBomPropertyComponent;
  //Lists for select options
  dishList: OptionModel[] = [];
  unitOptionList: OptionModel[] = [];
  materialGroupOptionList: OptionModel[] = [];
  materialCatagoryOptionList: OptionModel[] = [];
  bomCategories: BOMCategoryModel[] = []
  propertyTypeOptionList: OptionModel[] = [];
  departmentOptionList: OptionModel[] = [];
  //Icons and Modals
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook };
  //Signal for visible BOM category links
  visibleBOMCategoryLinks = signal<{ [id: number]: boolean }>({});
  parentIndex: number = -1;
  childIndex: number = -1;
  bomProcedureIndex: number = -1;
  currentDishId: number = -1;
  //Create BOM form
  createForm: FormGroup = new FormGroup({
    dishId: new FormControl(-1),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('')
  });
  //#endregion

  //#region constructor
  constructor(
    private dishService: DishService,
    private bomService: BomService,
    private unitService: UnitService,
    private toastService: ToastService,
    private materialGroupService: MaterialGroupService,
    private materialCatagoryService: MaterialCategoryService,
    private propertyTypeService: PropertyTypeService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router) { }

  //Initialize component
  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');
    //Load Dish options
    this.dishService.getOptionList().subscribe(res => {
      this.dishList = res.data;
    });
    //Load Unit options
    this.unitService.getOptionList().subscribe(res => {
      this.unitOptionList = res.data;
    });
    //Get BOM by ID
    this.bomService.getById(id).subscribe(res => {
      if (res.data) {
        this.currentDishId = res.data.dishId;
        this.createForm.patchValue({
          dishId: res.data.dishId,
          code: res.data.code,
          name: res.data.name,
          note: res.data.note
        });
        if(res.data.bomCategories){
          this.bomCategories = res.data.bomCategories;
          const initialVisibility: { [id: number]: boolean } = {};
          res.data.bomCategories.forEach((item, index) => {
            initialVisibility[index] = true;
          });
          this.visibleBOMCategoryLinks.set(initialVisibility);
        }
      }
    }, failure => {
      console.error(failure);
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }

  showBOMCategoryItem(id: number) {
    const current = this.visibleBOMCategoryLinks();
    this.visibleBOMCategoryLinks.set({ ...current, [id]: !current[id] });
  }

  showMaterialBtn(tags?: string) {
    if (tags == 'Nguyên Vật Liệu') {
      return true;
    }
    return false;
  }

  showPropertyBtn(tags?: string) {
    if (tags == 'Công Cụ Dụng Cụ') {
      return true;
    }
    return false;
  }
  //#endregion

  //#region Create Form
  // onSubmit() {
  //   if (this.createForm.invalid) {
  //     return;
  //   }
  //   this.bomService.create(this.createForm.value).subscribe(res => {
  //     this.toastService.showToast(EColors.success, res.message);
  //     this.disableCreateForm.set(true);
  //     if (res.data && res.data.length > 0) {
  //       this.bomCategories = res.data;
  //       // Initialize visibleBOMCategoryLinks with all categories set to true
  //       const initialVisibility: { [id: number]: boolean } = {};
  //       res.data.forEach((item, index) => {
  //         initialVisibility[index] = true;
  //       });
  //       this.visibleBOMCategoryLinks.set(initialVisibility);
  //     }
  //   }, failure => {
  //     console.error(failure);
  //     this.toastService.showToast(EColors.danger, failure.error.message);
  //   });
  // }
  get nameCreateForm() { return this.createForm.get('name'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get dishGroupIdCreateForm() { return this.createForm.get('dishGroupId'); }
  get dishIdCreateForm() { return this.createForm.get('dishId'); }
  get kitchenIdCreateForm() { return this.createForm.get('kitchenId'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

  toggleMaterialModel(id: string, bomId: number) {
    // Load material group options if not already loaded
    if (this.materialGroupOptionList && this.materialGroupOptionList.length === 0) {
      this.materialGroupService.getOptionList().subscribe(res => {
        this.materialGroupOptionList = res.data;
      });
    }
    // Load material category options if not already loaded
    if (this.materialCatagoryOptionList && this.materialCatagoryOptionList.length === 0) {
      this.materialCatagoryService.getOptionList().subscribe(res => {
        this.materialCatagoryOptionList = res.data;
      });
    }
    this.addBomMaterialComponent.toggleLiveMaterialModel(id, bomId);
  }
  toggleLiveAddBomPropertyModel(id: string, bomId: number) {
  // Load property type options if not already loaded
  if (this.propertyTypeOptionList && this.propertyTypeOptionList.length === 0) {
    this.propertyTypeService.getOptionList().subscribe(res => {
      this.propertyTypeOptionList = res.data;
    });
  }
  // Load department options if not already loaded
  if (this.departmentOptionList && this.departmentOptionList.length === 0) {
    this.departmentService.getOptionList().subscribe(res => {
      this.departmentOptionList = res.data;
    });
  }
    this.addBomPropertyComponent.toggleLivePropertyModel(id, bomId);
  }
}
