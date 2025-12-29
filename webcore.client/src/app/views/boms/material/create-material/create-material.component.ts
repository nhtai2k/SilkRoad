import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent,
  ModalHeaderComponent, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent,
  TableDirective, CardBodyComponent, CardComponent, ModalTitleDirective, TableColorDirective
} from '@coreui/angular';
import { cilCloudUpload, cilExitToApp, cilSave, cilPlus, cilTrash } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ToastService } from '@services/helper-services/toast.service';
import { MaterialService } from '@services/bom-services/material.service';
import { baseUrl, EColors } from '@common/global';
import { MaterialGroupService } from '@services/bom-services/material-group.service';
import { UnitService } from '@services/bom-services/unit.service';
import { OptionModel } from '@models/option.model';
import { MaterialCategoryService } from '@services/bom-services/material-category.service';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { TreeSelectComponent } from "@components/selects/tree-select/tree-select.component";
import { InputCurrencyComponent } from "@components/inputs/input-currency/input-currency.component";
import { InputNumberComponent } from "@components/inputs/input-number/input-number.component";
import { RouterLink } from '@angular/router';
import { MaterialUnitModel } from '@models/bom-models/material-unit.model';


@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrl: './create-material.component.scss',
  imports: [CommonModule, FormControlDirective, FormLabelDirective,
    ButtonDirective, FormDirective, ReactiveFormsModule, FormCheckComponent,
    CardBodyComponent, CardComponent, RouterLink,
    TableDirective, TableColorDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent,
    IconDirective, SelectSearchComponent, TreeSelectComponent, InputCurrencyComponent, InputNumberComponent]
})
export class CreateMaterialComponent implements OnInit {
  //#region properties
  @ViewChild('inputNumber') inputNumber!: InputNumberComponent;
  @ViewChild('treeSelect') treeSelect!: TreeSelectComponent;

  materialGroupList: OptionModel[] = [];
  materialCategoryList: OptionModel[] = [];
  unitTreeList: OptionModel[] = [];
  unitList: OptionModel[] = [];
  visible: boolean = false;
  icons: any = { cilCloudUpload, cilExitToApp, cilSave, cilPlus, cilTrash };
  baseUrl: string = baseUrl;
  reviewCreateUploadImage: string = '';
  unitConversion: MaterialUnitModel | null = null;
  unitConversionIndex = signal<number>(-1);
  unitConversionLevel = signal<number>(-1);

  createForm: FormGroup = new FormGroup({
    materialGroupId: new FormControl(-1),
    materialCategoryId: new FormControl(-1),
    unitId: new FormControl(-1),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.min(0)),
    note: new FormControl(''),
    isActive: new FormControl(true),
    imageFile: new FormControl(null),
    materialUnits: new FormControl([]),
  });

  unitConversionForm: FormGroup = new FormGroup({
    unitId: new FormControl(-1, Validators.required),
    factor: new FormControl(0, [Validators.required, Validators.min(0.0001)]),
  });
  // #endregion
  
  //#region constructor and lifecycle hooks
  constructor(private materialService: MaterialService,
    private materialGroupService: MaterialGroupService,
    private materialCategoryService: MaterialCategoryService,
    private unitService: UnitService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getMaterialGroupList();
    this.getUnitList();
    this.getMaterialCategoryList();
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
    this.unitService.getOptionList().subscribe((res) =>{
      this.unitList = res.data;
    })
    this.unitService.getTreeOptionList().subscribe((res) => {
      this.unitTreeList = res.data;
    });
  }
  getUnitName(id: number): string {
    return this.unitList.find(unit => unit.id === id)?.name || '###';
  }
  onChangeUnit(event: any) {
    this.createForm.patchValue({unitId: event});
      this.unitConversion = {
        unitId: Number(event),
        factor: 1,
        level: 1,
        expanded: true,
        children: []
      };
  }
  //#endregion
  
  //#region Create Material
  get nameCreateForm() { return this.createForm.get('name'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get priceCreateForm() { return this.createForm.get('price'); }

  private appendFormData(form: FormGroup, fields: string[]): FormData {
    const formData = new FormData();
    fields.forEach(field => {
      let value = form.value[field];
      if (value !== undefined && value !== null) {
        if (field === 'materialUnits' && Array.isArray(value)) {
          // Handle materialUnits array specially for form data binding
          value.forEach((unit: MaterialUnitModel, index: number) => {
            if (unit) {
              formData.append(`materialUnits[${index}].unitId`, unit.unitId?.toString() || '');
              formData.append(`materialUnits[${index}].factor`, unit.factor?.toString() || '');
              formData.append(`materialUnits[${index}].level`, unit.level?.toString() || '');
              formData.append(`materialUnits[${index}].expanded`, unit.expanded?.toString() || '');
              
              // Handle nested children if they exist
              if (unit.children && unit.children.length > 0) {
                unit.children.forEach((child: MaterialUnitModel, childIndex: number) => {
                  formData.append(`materialUnits[${index}].children[${childIndex}].unitId`, child.unitId?.toString() || '');
                  formData.append(`materialUnits[${index}].children[${childIndex}].factor`, child.factor?.toString() || '');
                  formData.append(`materialUnits[${index}].children[${childIndex}].level`, child.level?.toString() || '');
                  formData.append(`materialUnits[${index}].children[${childIndex}].expanded`, child.expanded?.toString() || '');
                });
              }
            }
          });
        } else if (typeof value === 'boolean' || typeof value === 'number') {
          value = value.toString();
          formData.append(field, value);
        } else if (typeof value === 'string') {
          formData.append(field, value);
        }
      }
    });
    if (form.value.imageFile) {
      formData.append('imageFile', form.value.imageFile);
    }
    return formData;
  }
  
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.createForm.value.materialUnits = [this.unitConversion];
      const fields = ['materialGroupId', 'materialCategoryId', 'unitId', 'code', 'name', 'price', 'note', 'isActive', 'materialUnits'];
      const formData = this.appendFormData(this.createForm, fields);
      this.materialService.create(formData).subscribe((res) => {
        this.toastService.showToast(EColors.success, res.message);
        // this.createForm.reset();
        // this.createForm.patchValue({ isActive: true, materialGroupId: -1, unitId: -1 });
        // this.reviewCreateUploadImage = '';
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }
  
  openFileInput(type: string) {
    if (type === 'create') document.getElementById('createUploadImage')?.click();
    else if (type === 'update') document.getElementById('updateUploadImage')?.click();
  }

  onChangeUploadImage(event: any, type: string) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'create') {
          this.reviewCreateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.createForm.patchValue({ imageFile: file });
        } else if (type === 'update') {
          //   this.reviewUpdateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          //   this.updateForm.patchValue({ imageFile: file });
        }
      };
      reader.readAsDataURL(file);
    }
  }
  //#endregion
  
  //#region Unit Conversion Modal
  deleteUnitConversion(index: number, level: number) {
    this.deleteUnitConversionByLevel(index, level, this.unitConversion?.children || []);
  }

  private deleteUnitConversionByLevel(index: number, level: number, arr : MaterialUnitModel[]): MaterialUnitModel | null {
    if(!arr || arr.length === 0) return null;
    const firstItem = arr[index];
    if(firstItem && firstItem.level === level) {
      arr.splice(index, 1);
      return null;
    }
    if(firstItem.children && firstItem.children.length > 0) {
      return this.getUnitConversionByLevel(index, level, firstItem.children);
    }
    return null;
  }

  toggleLiveDemo(index: number = -1, level: number = -1) {
    console.log('Toggle Live Demo', index);
    this.visible = !this.visible;
    if(index >= 0 && level > 0) {
      this.unitConversionIndex.set(index);
      this.unitConversionLevel.set(level);
    }
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  onSubmitUnitConversionForm() {
    if (this.unitConversionForm.valid) {
      const factor = this.unitConversionForm.value.factor;  
      const unitId = this.unitConversionForm.value.unitId;
      const index = this.unitConversionIndex();
      const level = this.unitConversionLevel();

      if (level == 1 && this.unitConversion) {
        this.unitConversion.children?.push({
          unitId: Number(unitId), 
          factor: Number(factor),
          level: level + 1,
          expanded: true,
          children: []
        });
      }else if (level > 0) {
        const unitConversion = this.getUnitConversionByLevel(index, level, this.unitConversion?.children || []);
        if (unitConversion) {
          unitConversion.children?.push({
            unitId: Number(unitId), 
            factor: Number(factor),
            level: level + 1,
            expanded: true,
            children: []
          });
        } else {
          this.toastService.showToast(EColors.danger, 'Không tìm thấy đơn vị quy đổi phù hợp.');
          return;
        }
      }
      
      // Reset the form and components
      this.unitConversionForm.reset();
      this.unitConversionForm.patchValue({ factor: 1, unitId: -1 });
      
      // Reset the custom components explicitly
      if (this.inputNumber) {
        this.inputNumber.writeValue(0);
        //this.inputNumber.currentValue = 0;
      }
      if (this.treeSelect) {
        // this.treeSelect.selectedValue = null;
      }
      
      this.toggleLiveDemo();
    }
  }

  private getUnitConversionByLevel(index: number, level: number, arr : MaterialUnitModel[]): MaterialUnitModel | null {
    if(!arr || arr.length === 0) return null;
    const firstItem = arr[index];
    if(firstItem && firstItem.level === level) {
      return arr[index];
    }
    if(firstItem.children && firstItem.children.length > 0) {
      return this.getUnitConversionByLevel(index, level, firstItem.children);
    }
    return null;
  }
  //#endregion
}
