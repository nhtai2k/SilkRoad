import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent,
  ModalHeaderComponent, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent,
  TableDirective, CardBodyComponent, CardComponent, ModalTitleDirective, TableColorDirective
} from '@coreui/angular';
import { cilCloudUpload, cilExitToApp, cilSave, cilPlus } from '@coreui/icons';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaterialUnitModel } from '@models/bom-models/material-unit.model';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrl: './update-material.component.scss',
  imports: [
    CommonModule, FormControlDirective, FormLabelDirective, ButtonDirective, FormDirective, ReactiveFormsModule, FormCheckComponent,
    CardBodyComponent, CardComponent, RouterLink, TableDirective, TableColorDirective, ModalComponent, ModalHeaderComponent,
    ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, IconDirective, SelectSearchComponent,
    TreeSelectComponent, InputCurrencyComponent, InputNumberComponent
  ]
})
export class UpdateMaterialComponent {
  // #region Properties
  materialGroupList: OptionModel[] = [];
  materialCategoryList: OptionModel[] = [];
  unitTreeList: OptionModel[] = [];
  unitList: OptionModel[] = [];
  visible: boolean = false;
  icons: any = { cilCloudUpload, cilExitToApp, cilSave, cilPlus };
  baseUrl: string = baseUrl;
  unitConversion: MaterialUnitModel | null = null;
  unitConversionIndex = signal<number>(-1);
  unitConversionLevel = signal<number>(-1);
  reviewUpdateUploadImage: string = '';
  materialGroupId = signal<number>(-1);
  materialCategoryId = signal<number>(-1);
  expandKeys = signal<any[]>([]);
  baseUnitId = signal<string>('');
  price = signal<number>(0);


  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
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
    private route: ActivatedRoute,
    private toastService: ToastService) { }
  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.updateData(id);
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
    this.unitService.getOptionList().subscribe((res) => {
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
    this.updateForm.patchValue({ unitId: event });
    this.unitConversion = {
      unitId: Number(event),
      factor: 1,
      level: 1,
      expanded: true,
      children: []
    };
  }
  //#endregion

  // constructor(private materialService: MaterialService,
  //   private toastService: ToastService) { }
  //     openFileInput(type: string) {
  //   if (type === 'create') document.getElementById('createUploadImage')?.click();
  //   else if (type === 'update') document.getElementById('updateUploadImage')?.click();
  // }
  // onChangeUploadImage(event: any, type: string) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       if (type === 'create') {
  //         //this.reviewCreateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
  //         //this.createForm.patchValue({ imageFile: file });
  //       } else if (type === 'update') {
  //          this.reviewUpdateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
  //          this.updateForm.patchValue({ imageFile: file });
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  //#region Update
  updateData(id: number) {
    this.materialService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.materialGroupId.set(res.data.materialGroupId);
      this.materialCategoryId.set(res.data.materialCategoryId);
      this.price.set(res.data.price);
      this.unitService.getById(res.data.baseUnitId).subscribe((unit) => {
        this.expandKeys.set([unit.data.unitGroupId]);
        this.baseUnitId.set(unit.data.unitGroupId + '_' + unit.data.id);
      });
      if (res.data.imagePath) {
        this.reviewUpdateUploadImage = `<img src="${this.baseUrl + res.data.imagePath}" alt="Image Preview" class="mw-100 mh-100"/>`;
      } else {
        this.reviewUpdateUploadImage = '';
      }
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      const fields = [
        'id', 'materialGroupId', 'unitId', 'code', 'name', 'note', 'isActive'
      ];
      // const formData = this.appendFormData(this.updateForm, fields);
      // this.materialService.update(formData).subscribe((res) => {
      //   this.toggleLiveUpdateModel();
      //   //this.getData();
      //   this.toastService.showToast(EColors.success, res.message);
      //   this.reviewUpdateUploadImage = '';
      // }, (failure) => {
      //   this.toastService.showToast(EColors.danger, failure.error.message);
      // });
    }
  }
  get nameUpdateForm() { return this.updateForm.get('name'); }
  get codeUpdateForm() { return this.updateForm.get('code'); }
  get pricUpdateFForm() { return this.updateForm.get('price'); }

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
          // this.reviewCreateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          // this.createForm.patchValue({ imageFile: file });
        } else if (type === 'update') {
          this.reviewUpdateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.updateForm.patchValue({ imageFile: file });
        }
      };
      reader.readAsDataURL(file);
    }
  }
  //#endregion
  //#region Unit Conversion Modal
  toggleLiveDemo(index: number = -1, level: number = -1) {
    console.log('Toggle Live Demo', index);
    this.visible = !this.visible;
    if (index >= 0 && level > 0) {
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
      } else if (level > 0) {
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

      this.toggleLiveDemo();
    }
  }

  private getUnitConversionByLevel(index: number, level: number, arr: MaterialUnitModel[]): MaterialUnitModel | null {
    if (!arr || arr.length === 0) return null;
    const firstItem = arr[index];
    if (firstItem && firstItem.level === level) {
      return arr[index];
    }
    if (firstItem.children && firstItem.children.length > 0) {
      return this.getUnitConversionByLevel(index, level, firstItem.children);
    }
    return null;
  }
  //#endregion
}
