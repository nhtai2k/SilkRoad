import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { cilExitToApp, cilPen, cilPlus, cilSave, cilTrash, cilX } from '@coreui/icons';
import { CommonModule } from '@angular/common';
import { OptionModel } from '@models/option.model';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { ParticipantInfoConfigModel } from '@models/survey-models/participant-info-config.model';
import { EFieldTypes, numberEnumToArray, stringEnumToArray } from '@common/global';
import { ParticipantInfoConfigService } from '@services/survey-services/participant-info-config.service';

@Component({
  selector: 'app-config-helper',
  imports: [ReactiveFormsModule, ButtonDirective, CommonModule, TableDirective, IconDirective, ModalComponent, ModalHeaderComponent,
    ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, FormSelectDirective, FormControlDirective, FormCheckInputDirective, FormCheckComponent, FormCheckLabelDirective],
  templateUrl: './config-helper.component.html',
})

export class ConfigHelperComponent implements OnInit {
  //#region Variables
  icons: any = { cilPlus, cilTrash, cilPen, cilX, cilSave, cilExitToApp };
  @Input() surveyFormId: number = -1;
  @Input() disableForm: boolean = false;
  fieldTypeOptions: any[] = numberEnumToArray(EFieldTypes);
  initData: ParticipantInfoConfigModel[] = [];

  //visible Question Group Modal
  visibleCreateModal = signal(false);
  visibleUpdateModal = signal(false);
  visibleDeleteModal = signal(false);

  deleteId: string | undefined = '';

  // Create  Form
  createForm = new FormGroup({
    surveyFormId: new FormControl(-1),
    fieldNameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    fieldNameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    placeholderEN: new FormControl('', [Validators.maxLength(255)]),
    placeholderVN: new FormControl('', [Validators.maxLength(255)]),
    typeId: new FormControl(-1, [Validators.required]),
    priority: new FormControl(1),
    minLength: new FormControl(0, [Validators.min(0)]),
    maxLength: new FormControl(255, [Validators.min(1)]),
    isRequired: new FormControl(false)
  });
  // Update Form
  updateForm = new FormGroup({
    id: new FormControl(''),
    surveyFormId: new FormControl(-1),
    fieldNameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    fieldNameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    placeholderEN: new FormControl('', [Validators.maxLength(255)]),
    placeholderVN: new FormControl('', [Validators.maxLength(255)]),
    typeId: new FormControl(-1, [Validators.required]),
    priority: new FormControl(1),
    minLength: new FormControl(0, [Validators.min(0)]),
    maxLength: new FormControl(255, [Validators.min(1)]),
    isRequired: new FormControl(false)
  });

  //#endregion

  //#region Constructor and OnInit
  constructor(private participantInfoConfigService: ParticipantInfoConfigService) { }
  ngOnInit(): void {
    this.getAllConfigs();
  }
  getAllConfigs(): void {
    if (this.surveyFormId <= 0) {
      return;
    }
    this.participantInfoConfigService.getBySurveyFormId(this.surveyFormId).subscribe({
      next: (res) => {
        this.initData = res.data;
      },
      error: (err) => {
        console.error('Error fetching participant info configs', err);
      }
    });
  }
  //#endregion

  //#region Create Modal
  toggleCreateModal(): void {
    this.visibleCreateModal.set(!this.visibleCreateModal());
  }
  handleCreateModalChange(event: any) {
    this.visibleCreateModal.set(event);
  }

  onCreateFormSubmit(): void {
    if (this.createForm.valid) {
      this.createForm.patchValue({ surveyFormId: this.surveyFormId });

      const formData: ParticipantInfoConfigModel = {
        surveyFormId: this.surveyFormId,
        fieldNameEN: this.createForm.value.fieldNameEN || '',
        fieldNameVN: this.createForm.value.fieldNameVN || '',
        placeholderEN: this.createForm.value.placeholderEN || undefined,
        placeholderVN: this.createForm.value.placeholderVN || undefined,
        typeId: this.createForm.value.typeId || 0,
        priority: this.createForm.value.priority || 0,
        minLength: this.createForm.value.minLength ?? 0,
        maxLength: this.createForm.value.maxLength ?? 255,
        isRequired: this.createForm.value.isRequired ?? false
      };

      this.participantInfoConfigService.create(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.getAllConfigs();
            this.toggleCreateModal();
            this.createForm.reset();
          }
        },
        error: (err) => {
          console.error('Error creating participant info config', err);
        }
      });
    }
  }

  get fieldNameENCreateForm() {
    return this.createForm.get('fieldNameEN');
  }
  get fieldNameVNCreateForm() {
    return this.createForm.get('fieldNameVN');
  }
  get placeholderENCreateForm() {
    return this.createForm.get('placeholderEN');
  }
  get placeholderVNCreateForm() {
    return this.createForm.get('placeholderVN');
  }
  get typeIdCreateForm() {
    return this.createForm.get('typeId');
  }
  get minLengthCreateForm() {
    return this.createForm.get('minLength');
  }
  get maxLengthCreateForm() {
    return this.createForm.get('maxLength');
  }
  get isRequiredCreateForm() {
    return this.createForm.get('isRequired');
  }
  get priorityCreateForm() {
    return this.createForm.get('priority');
  }

  //#endregion

  //#region Update Modal
  // Update Question Group Modal
  update(id: string | undefined) {
    console.log('Update ID:', id);
    this.toggleUpdateModal();
    this.participantInfoConfigService.getById(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.updateForm.patchValue(res.data);
        }
      }
    });
  }
  toggleUpdateModal(): void {
    this.visibleUpdateModal.set(!this.visibleUpdateModal());
  }
  handleUpdateModalChange(event: any) {
    this.visibleUpdateModal.set(event);
  }

  onUpdateFormSubmit(): void {
    if (this.updateForm.valid) {
      const formData: ParticipantInfoConfigModel = {
        id: this.updateForm.value.id || undefined,
        surveyFormId: this.surveyFormId,
        fieldNameEN: this.updateForm.value.fieldNameEN || '',
        fieldNameVN: this.updateForm.value.fieldNameVN || '',
        placeholderEN: this.updateForm.value.placeholderEN || undefined,
        placeholderVN: this.updateForm.value.placeholderVN || undefined,
        typeId: this.updateForm.value.typeId || 0,
        priority: this.updateForm.value.priority || 0,
        minLength: this.updateForm.value.minLength ?? 0,
        maxLength: this.updateForm.value.maxLength ?? 255,
        isRequired: this.updateForm.value.isRequired ?? false
      };
      this.participantInfoConfigService.update(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.getAllConfigs();
            this.toggleUpdateModal();
          }
        }
      });
    }
  }
  get fieldNameENUpdateForm() {
    return this.updateForm.get('fieldNameEN');
  }
  get fieldNameVNUpdateForm() {
    return this.updateForm.get('fieldNameVN');
  }
  get placeholderENUpdateForm() {
    return this.updateForm.get('placeholderEN');
  }
  get placeholderVNUpdateForm() {
    return this.updateForm.get('placeholderVN');
  }
  get typeIdUpdateForm() {
    return this.updateForm.get('typeId');
  }
  get minLengthUpdateForm() {
    return this.updateForm.get('minLength');
  }
  get maxLengthUpdateForm() {
    return this.updateForm.get('maxLength');
  }
  get isRequiredUpdateForm() {
    return this.updateForm.get('isRequired');
  }
  get priorityUpdateForm() {
    return this.updateForm.get('priority');
  }
  //#endregion

  //#region Delete Modal
  delete(id: string | undefined): void {
    this.deleteId = id;
    this.toggleDeleteModal();
  }
  toggleDeleteModal(): void {
    this.visibleDeleteModal.set(!this.visibleDeleteModal());
  }
  handleDeleteModalChange(event: any) {
    this.visibleDeleteModal.set(event);
  }
  onConfirmDelete(): void {
    this.participantInfoConfigService.delete(this.deleteId).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllConfigs();
          this.toggleDeleteModal();
        }
      },
      error: (err) => {
        console.error('Error deleting participant info config', err);
      }
    });
  }
  //#endregion
}
