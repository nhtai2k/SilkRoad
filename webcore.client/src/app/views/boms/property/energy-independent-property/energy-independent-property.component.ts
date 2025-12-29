import { CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent,
   ModalFooterComponent, ModalHeaderComponent,  FormControlDirective, FormLabelDirective,
    FormDirective, FormCheckComponent, FormSelectDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudUpload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PropertyService } from '@services/bom-services/property.service';
import { baseUrl, EColors, timeUnitList } from '@common/global';
import { OptionModel } from '@models/option.model';
import { InputSeparatorComponent } from "@components/inputs/input-separator/input-separator.component";
import { ToastService } from '@services/helper-services/toast.service';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";

@Component({
  selector: 'app-energy-independent-property',
  templateUrl: './energy-independent-property.component.html',
  styleUrl: './energy-independent-property.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, FormCheckComponent,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent,
    IconDirective, FormSelectDirective, CommonModule, InputSeparatorComponent, SelectSearchComponent]
})
export class EnergyIndependentPropertyComponent {
  @Input() departmentList: OptionModel[] = [];
  @Input() unitList: OptionModel[] = [];
  @Input() propertyTypeList: OptionModel[] = [];
  depreciationTypes: OptionModel[] = timeUnitList;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudUpload };
  baseUrl: string = baseUrl;
  reviewCreateUploadImage: string = '';
  reviewUpdateUploadImage: string = '';

  createForm: FormGroup = new FormGroup({
   propertyGroupId: new FormControl(2),
    unitId: new FormControl(-1),
    departmentId: new FormControl(-1),
    depreciationTypeId: new FormControl(1),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    depreciation: new FormControl(0, [Validators.required, Validators.min(0)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    startDepreciation: new FormControl(0, [Validators.required, Validators.min(0)]),
    endDepreciation: new FormControl(0, [Validators.required, Validators.min(0)]),
    note: new FormControl(''),
    isActive: new FormControl(true),
    imageFile: new FormControl(null)
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    propertyGroupId: new FormControl(2),
    unitId: new FormControl(-1),
    departmentId: new FormControl(-1),
    depreciationTypeId: new FormControl(1),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    depreciation: new FormControl(0, [Validators.required, Validators.min(0)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    startDepreciation: new FormControl(0, [Validators.required, Validators.min(0)]),
    endDepreciation: new FormControl(0, [Validators.required, Validators.min(0)]),
    note: new FormControl(''),
    isActive: new FormControl(true),
    imageFile: new FormControl(null)
  });
 constructor(private propertyService: PropertyService, private toastService: ToastService) { }
onChangePrice(event: any, type: string) {
    const value = event;
    if (type === 'create') {
      this.createForm.patchValue({ price: value });
    } else if (type === 'update') {
      this.updateForm.patchValue({ price: value });
    }
  }
  onChangeDepreciation(event: any, type: string) {
    const value = event;
    if (type === 'create') {
      this.createForm.patchValue({ depreciation: value });
    } else if (type === 'update') {
      this.updateForm.patchValue({ depreciation: value });
    }
  }

  onChangeStartDepreciation(event: any, type: string) {
    const value = event;
    if (type === 'create') {
      this.createForm.patchValue({ startDepreciation: value });
    } else if (type === 'update') {
      this.updateForm.patchValue({ startDepreciation: value });
    }
  }
  onChangeEndDepreciation(event: any, type: string) {
    const value = event;
    if (type === 'create') {
      this.createForm.patchValue({ endDepreciation: value });
    } else if (type === 'update') {
      this.updateForm.patchValue({ endDepreciation: value });
    }
  }
    onChangeUnit(event: any, type: string) {
    const value = event;
    if (type === 'create') {
      this.createForm.patchValue({ unitId: value });
    } else if (type === 'update') {
      this.updateForm.patchValue({ unitId: value });
    }
  }
  //#region Create
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
          this.reviewUpdateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.updateForm.patchValue({ imageFile: file });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmitCreateForm() {
    if (this.createForm.valid) {
         const formData = this.appendFormData(this.createForm, [
           'propertyGroupId', 'unitId', 
           'departmentId', 'depreciationTypeId', 'code', 'name', 'depreciation', 'price', 
           'startDepreciation', 'endDepreciation', 'note', 'isActive'
         ]);
         this.propertyService.create(formData).subscribe((res) => {
           this.toggleLiveCreateModel();
           this.toastService.showToast(EColors.success, res.message);
           this.createForm.reset();
           this.createForm.patchValue({ isActive: true, departmentId: -1, unitId: -1, propertyTypeId: -1 });
           this.reviewCreateUploadImage = '';
         }, (failure) => {
           this.toastService.showToast(EColors.danger, failure.error.message);
         });
       }
  }
  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }
  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  get nameCreateForm() { return this.createForm.get('name'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get priceCreateForm() { return this.createForm.get('price'); }
  get quantityCreateForm() { return this.createForm.get('quantity'); }
  //#endregion

  //#region Update
  updateData(id: number) {
    this.propertyService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
      if (res.data.imagePath) {
        this.reviewUpdateUploadImage = `<img src="${this.baseUrl + res.data.imagePath}" alt="Image Preview" class="mw-100 mh-100"/>`;
      } else {
        this.reviewUpdateUploadImage = '';
      }
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      const formData = this.appendFormData(this.updateForm, [
        'id', 'propertyTypeId', 'unitId', 'departmentId', 'depreciationTypeId', 'code', 'name', 'quantity', 'depreciationPeriod', 'price', 'note', 'isActive'
      ]);
      // this.propertyService.update(formData).subscribe((res) => {
      //   this.toggleLiveUpdateModel();
      //   this.getData();
      //   this.toastService.showToast(EColors.success, res.message);
      //   this.reviewUpdateUploadImage = '';
      // }, (failure) => {
      //   this.toastService.showToast(EColors.danger, failure.error.message);
      // });
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
  get quantityUpdateForm() { return this.updateForm.get('quantity'); }
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
