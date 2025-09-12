import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonDirective, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent,
  CardBodyComponent, CardComponent, FormSelectDirective
} from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload } from '@coreui/icons';

import { IconDirective } from '@coreui/icons-angular';
import { ToastService } from '@services/helper-services/toast.service';
import { RouterLink } from '@angular/router';
import { DishService } from '@services/restaurant-services/dish.service';
import { CategoryService } from '@services/restaurant-services/category.service';
import { EColors } from '@common/global';
import { OptionModel } from '@models/option.model';
import { InputCurrencyComponent } from "@components/inputs/input-currency/input-currency.component";
import { TreeSelectComponent } from "@components/selects/tree-select/tree-select.component";
import { UnitService } from '@services/restaurant-services/unit.service';

@Component({
  selector: 'app-create-single',
  imports: [CommonModule, FormControlDirective, FormLabelDirective,
    ButtonDirective, FormDirective, ReactiveFormsModule, FormCheckComponent, FormSelectDirective,
    CardBodyComponent, CardComponent, RouterLink, IconDirective, InputCurrencyComponent, TreeSelectComponent],
  templateUrl: './create-single.component.html',
  styleUrl: './create-single.component.scss'
})
export class CreateSingleComponent {
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload };
  reviewCreateUploadImage: string = '';
  categoryOptions: OptionModel[] = [];
  unitOptions: OptionModel[] = [];
  setDefaultCategoryId = signal(-1);
  setDefaultMoney = signal(0);

  createForm: FormGroup = new FormGroup({
    categoryId: new FormControl(-1),
    typeId: new FormControl(0), // 1: Single Dish
    unitId: new FormControl(-1, Validators.required),
    nameEN: new FormControl(null, Validators.required),
    nameVN: new FormControl(null, Validators.required),
    nameCN: new FormControl(null, Validators.required),
    descriptionEN: new FormControl(null, Validators.maxLength(500)),
    descriptionVN: new FormControl(null, Validators.maxLength(500)),
    descriptionCN: new FormControl(null, Validators.maxLength(500)),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    priority: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(255)]),
    quantity: new FormControl(null, Validators.required),
    note: new FormControl(null, Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)
  });

  constructor(private dishService: DishService,
    private categoryService: CategoryService,
    private unitService: UnitService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getCategories();
    this.getUnits();
  }

  openFileInput(type: string) {
    if (type === 'create') document.getElementById('createUploadImage')?.click();
    else if (type === 'update') document.getElementById('updateUploadImage')?.click();
  }

  onChangeUploadImage(event: any, type: string) {
    const file: File = event.target.files[0];
    if (file) {
      //show image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'create') {
          this.reviewCreateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.createForm.patchValue({
            imageFile: file
          });
        }

      };
      reader.readAsDataURL(file);
    }
  }

  getCategories() {
    this.categoryService.getTreeOptionList().subscribe({
      next: (res) => {
        this.categoryOptions = res.data;
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
  }

  getUnits() {
    this.unitService.getOptionList().subscribe({
      next: (res) => {
        this.unitOptions = res.data;
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
  }

  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      const fields = ['categoryId', 'typeId', 'unitId', 'nameEN', 'nameVN', 'nameCN',
        'descriptionEN', 'descriptionVN', 'descriptionCN', 'price', 'quantity', 'priority',
        'note', 'isActive'];
      const formData = this.appendFormData(this.createForm, fields);
      this.dishService.create(formData).subscribe({
        next: (res) => {
          this.toastService.showToast(EColors.success, res.message);
          this.createForm.reset();
          this.createForm.patchValue({ isActive: true, dishGroupId: -1 });
          this.reviewCreateUploadImage = '';
          this.setDefaultCategoryId.set(-1);
          this.setDefaultMoney.set(0);
        },
        error: (failure) => {
          this.toastService.showToast(EColors.danger, failure.error.message);
        }
      });
    }
  }

  get unitIdCreateForm() { return this.createForm.get('unitId'); }
  get nameENCreateForm() { return this.createForm.get('nameEN'); }
  get nameVNCreateForm() { return this.createForm.get('nameVN'); }
  get nameCNCreateForm() { return this.createForm.get('nameCN'); }
  get categoryIdCreateForm() { return this.createForm.get('categoryId'); }
  get descriptionENCreateForm() { return this.createForm.get('descriptionEN'); }
  get descriptionVNCreateForm() { return this.createForm.get('descriptionVN'); }
  get descriptionCNCreateForm() { return this.createForm.get('descriptionCN'); }
  get priceCreateForm() { return this.createForm.get('price'); }
  get priorityCreateForm() { return this.createForm.get('priority'); }
  // Helper to append form values to FormData
  private appendFormData(form: FormGroup, fields: string[]): FormData {
    const formData = new FormData();
    fields.forEach(field => {
      let value = form.value[field];
      if (value !== undefined && value !== null) {
        if (typeof value === 'boolean' || typeof value === 'number') {
          value = value.toString();
        }
        formData.append(field, value);
      }
    });
    if (form.value.imageFile) {
      formData.append('imageFile', form.value.imageFile);
    }
    return formData;
  }
  //#endregion
}