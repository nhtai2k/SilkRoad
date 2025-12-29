import {NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent,
   ModalHeaderComponent, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent, 
   FormSelectDirective} from '@coreui/angular';
import { ToastService } from '@services/helper-services/toast.service';
import { UnitService } from '@services/bom-services/unit.service';
import { EColors } from '@common/global';
import { OptionModel } from '@models/option.model';

@Component({
  selector: 'app-unit',
  imports: [ModalBodyComponent, NgIf, NgFor, FormControlDirective, FormLabelDirective, FormSelectDirective,
    ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule,FormCheckComponent,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent],
  templateUrl: './unit.component.html'
})
export class UnitComponent {
  @Input() unitGroupList: OptionModel[] = [];
  @Input() reloadData!: () => void;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  createForm: FormGroup = new FormGroup({
    unitGroupId: new FormControl(0, Validators.required),
    index: new FormControl(0, Validators.min(0)),
    coefficient: new FormControl(0, Validators.min(0)),
    name: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    note: new FormControl(''),
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    unitGroupId: new FormControl( 0, Validators.required),
    index: new FormControl(0, Validators.min(0)),
    coefficient: new FormControl(0, Validators.min(0)),
    name: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    note: new FormControl(''),
  });

  constructor(private unitService: UnitService, private toastService: ToastService) {}

  //#region Create
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.unitService.create(this.createForm.value).subscribe((res) => {
        this.reloadData();
        this.toggleLiveCreateModel();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({
          name: '',
          isActive: true})
      }, (failure) => {
        console.error(failure);
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  toggleLiveCreateModel(parentId: number| null = null) {
    if(parentId) {
      this.createForm.patchValue({ unitGroupId: parentId });
    }
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  get nameCreateForm() { return this.createForm.get('name'); }
  get symbolCreateForm() { return this.createForm.get('symbol'); }
  //#endregion

  //#region Update
  updateData(id: number) {
    this.unitService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.unitService.update(this.updateForm.value).subscribe((res) => {
        this.toggleLiveUpdateModel();
        this.reloadData();
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
  get symbolUpdateForm() { return this.updateForm.get('symbol'); }
  //#endregion

  //#region Delete
  // Remove duplicate deleteData, rename old deleteData to softDeleteData for soft delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.unitService.softDelete(this.deleteById).subscribe((res) => {
      this.toggleLiveDelete();
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
  deleteData(id: number) {
    this.unitService.delete(id).subscribe((res) => {
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion

}
