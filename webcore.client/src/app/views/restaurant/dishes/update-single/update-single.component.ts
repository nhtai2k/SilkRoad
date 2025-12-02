
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonDirective, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent,
  CardBodyComponent, CardComponent, FormSelectDirective
} from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ToastService } from '@services/helper-services/toast.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DishService } from '@services/restaurant-services/dish.service';
import { CategoryService } from '@services/restaurant-services/category.service';
import { baseUrl, EColors } from '@common/global';
import { OptionModel } from '@models/option.model';
import { TreeSelectComponent } from "@components/selects/tree-select/tree-select.component";
import { InputCurrencyComponent } from "@components/inputs/input-currency/input-currency.component";
import { UnitService } from '@services/restaurant-services/unit.service';
@Component({
  selector: 'app-update-single',
  imports: [FormControlDirective, FormLabelDirective, ButtonDirective, FormDirective, ReactiveFormsModule, FormCheckComponent, FormSelectDirective, CardBodyComponent, CardComponent, RouterLink, IconDirective, TreeSelectComponent, InputCurrencyComponent],
  templateUrl: './update-single.component.html',
  styleUrl: './update-single.component.scss'
})
export class UpdateSingleComponent implements OnInit {
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload };
  reviewUpdateUploadImage: string = '';
  categoryOptions: OptionModel[] = [];
  unitOptions: OptionModel[] = [];
  baseUrl: string = baseUrl;
  setDefaultCategoryId = signal('');
  setDefaultMoney = signal(0);

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    categoryId: new FormControl(-1),
    typeId: new FormControl(1), // 1: Group Dish
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
    private route: ActivatedRoute,
    private toastService: ToastService) { }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.getCategories();
    this.dishService.getById(id).subscribe({
      next: (res) => {
        this.updateForm.patchValue(res.data);
        this.setDefaultMoney.set(res.data.price);

        if (res.data.imageUrl) {
          this.reviewUpdateUploadImage = `<img src="${this.baseUrl + res.data.imageUrl}" alt="Image Preview" class="mw-100 mh-100"/>`;
        } else {
          this.reviewUpdateUploadImage = '';
        }
        this.categoryService.getById(res.data.categoryId).subscribe({
          next: (category) => {
            const temp = category.data.parentId + '_' + category.data.id
            this.setDefaultCategoryId.set(temp);
          }
        });
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
    this.unitService.getOptionList().subscribe({
      next: (res) => {
        this.unitOptions = res.data;
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
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
        if (type === 'update') {
          this.reviewUpdateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.updateForm.patchValue({
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
  //#region Update Form
  updateData(id: number) {
    this.dishService.getById(id).subscribe({
      next: (res) => {
        this.updateForm.patchValue(res.data);
        if (res.data.imageUrl) {
          this.reviewUpdateUploadImage = `<img src="${this.baseUrl + res.data.imageUrl}" alt="Image Preview" class="mw-100 mh-100"/>`;
        } else {
          this.reviewUpdateUploadImage = '';
        }
      }
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      const fields = ['id', 'categoryId', 'typeId', 'unitId', 'nameEN', 'nameVN', 'nameCN',
        'descriptionEN', 'descriptionVN', 'descriptionCN', 'price', 'quantity', 'priority',
        'note', 'isActive'];
      const formData = this.appendFormData(this.updateForm, fields);
      console.log(formData);
      this.dishService.update(formData).subscribe({
        next: (res) => {
          this.toastService.showToast(EColors.success, res.message);
          this.reviewUpdateUploadImage = '';
        },
        error: (failure) => {
          this.toastService.showToast(EColors.danger, failure.error.message);
        }
      });
    }
  }

  get nameENUpdateForm() { return this.updateForm.get('nameEN'); }
  get nameVNUpdateForm() { return this.updateForm.get('nameVN'); }
  get nameCNUpdateForm() { return this.updateForm.get('nameCN'); }
  get descriptionENUpdateForm() { return this.updateForm.get('descriptionEN'); }
  get descriptionVNUpdateForm() { return this.updateForm.get('descriptionVN'); }
  get descriptionCNUpdateForm() { return this.updateForm.get('descriptionCN'); }
  get unitIdUpdateForm() { return this.updateForm.get('unitId'); }
  get quantityUpdateForm() { return this.updateForm.get('quantity'); }
  get categoryIdUpdateForm() { return this.updateForm.get('categoryId'); }
  get priceUpdateForm() { return this.updateForm.get('price'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  get priorityUpdateForm() { return this.updateForm.get('priority'); }
  //#endregion
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
}
