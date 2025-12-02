import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router, RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent } from '@coreui/angular';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { IconDirective } from '@coreui/icons-angular';
import { cilExitToApp, cilPen, cilPlus, cilSave, cilTrash, cilX, cilQrCode, cilFile, cilCheckCircle, cilBan } from '@coreui/icons';

import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { QuestionModel } from '@models/survey-models/question.model';
import { UpdateHelperComponent } from './update-helper.component';
import { TextEditorComponent } from '@components/text-editor/text-editor.component';
import { ToolbarItem } from 'ngx-editor';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { StoreService } from '@services/survey-services/store.service';
import { OptionModel } from '@models/option.model';
import { InternetIconComponent } from "@components/icons/internet-icon.component";
import { ConfigHelperComponent } from "./config-helper.component";
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NoInternetIconComponent } from "@components/icons/no-internet-icon.component";
@Component({
  selector: 'app-update',
  imports: [FormControlDirective, FormLabelDirective, CardComponent, CardBodyComponent, ReactiveFormsModule, FormDirective, ButtonDirective, RouterLink, IconDirective, RangeDatetimePickerComponent, FormSelectDirective, TextEditorComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, UpdateHelperComponent, InternetIconComponent, ModalComponent, ModalBodyComponent, ModalFooterComponent, NzQRCodeModule, ModalHeaderComponent, ConfigHelperComponent, NoInternetIconComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  //#region Variables
  initData: SurveyFormModel | null = null;
  initialTimeRange: Date[] = [];
  initDescriptionEN: string = '';
  initDescriptionVN: string = '';
  visiblePublicModal: boolean = false;
  visibleQrCodeModal: boolean = false;
  storeList: OptionModel[] = [];
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilX, cilQrCode, cilFile, cilCheckCircle, cilBan };
  customToolbar: ToolbarItem[][] = [
    ['bold', 'italic', 'underline'],
    ['ordered_list', 'bullet_list'],
    ['link']
  ];

  disableForm: boolean = true;
  baseUrl: string = baseUrl;
    qrCodeUrl: string = '';

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    storeId: new FormControl(-1),
    formStyleId: new FormControl(1, Validators.required),
    name: new FormControl('', Validators.required),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    descriptionEN: new FormControl(''),
    descriptionVN: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isActive: new FormControl(false),
    isLimited: new FormControl(false),
    isPublished: new FormControl(false),
    maxParticipants: new FormControl(0),
    questionGroups: new FormControl([]),
    questions: new FormControl([])
  });
  //#endregion
  //#region Constructor and Hooks
  constructor(
    private surveyFormService: SurveyFormService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.surveyFormService.getById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.initialTimeRange = [new Date(response.data.startDate), new Date(response.data.endDate)];
          this.initDescriptionEN = response.data.descriptionEN;
          this.initDescriptionVN = response.data.descriptionVN;
          this.updateForm.patchValue(response.data);
          this.updateForm.disable();
          this.initData = response.data;
        }
      }
    });
    this.storeService.getOptionList().subscribe({
      next: (res) => {
        if (res.success) {
          this.storeList = res.data;
        }
      }
    });
    this.qrCodeUrl = baseUrl + `public-form/${id}`;
  }

  onDateRangeChange(event: any) {
    if (event && event.length === 2) {
      this.updateForm.patchValue({
        startDate: event[0],
        endDate: event[1]
      });
    }
  }

  onSubmit() {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      this.surveyFormService.update(this.updateForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastService.showToast(EColors.success, 'Survey form updated successfully');
            this.initData = this.updateForm.value;
            this.disableUpdateForm();
          } else {
            this.toastService.showToast(EColors.danger, res.message);
          }
        }
      });
    }
  }

  get formStyleId() { return this.updateForm.get('formStyleId'); }
  get name() { return this.updateForm.get('name'); }
  get titleEN() { return this.updateForm.get('titleEN'); }
  get titleVN() { return this.updateForm.get('titleVN'); }
  get startDate() { return this.updateForm.get('startDate'); }
  get endDate() { return this.updateForm.get('endDate'); }
  get isLimited() { return this.updateForm.get('isLimited'); }
  get maxParticipants() { return this.updateForm.get('maxParticipants'); }

  enableUpdateForm() {
    this.disableForm = false;
    this.updateForm.enable();
  }

  disableUpdateForm() {
    this.disableForm = true;
    this.updateForm.disable();
    // Revert form to initial data
    if (this.initData) {
      this.updateForm.patchValue(this.initData);
      this.initialTimeRange = [new Date(this.initData.startDate), new Date(this.initData.endDate)];
      this.initDescriptionEN = this.initData.descriptionEN;
      this.initDescriptionVN = this.initData.descriptionVN;
    }
  }

  //#endregion
  //#region Public Survey Form Modal
  toggleLivePublicModal() {
    this.visiblePublicModal = !this.visiblePublicModal;
  }
  handleLivePublicModalChange(event: any) {
    this.visiblePublicModal = event;
  }
  onConfirmPublicSurveyForm() {
    this.surveyFormService.public(this.updateForm.value.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.showToast(EColors.success, res.message);
          this.updateForm.patchValue({ isPublished: true });
          this.initData!.isPublished = true;
          this.disableUpdateForm();
          this.toggleLivePublicModal();
        } else {
          this.toastService.showToast(EColors.danger, res.message);
        }
      }
    });
  }
  unPublicSurveyForm() {
    this.surveyFormService.unpublic(this.updateForm.value.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.showToast(EColors.success, res.message);
          this.updateForm.patchValue({ isPublished: false });
          this.initData!.isPublished = false;
        }
        else {
          this.toastService.showToast(EColors.danger, res.message);
        }
      }
    });
  }
  //#endregion
  //#region QR Code Modal
  toggleLiveQrCodeModal() {
    this.visibleQrCodeModal = !this.visibleQrCodeModal;
  }
  handleLiveQrCodeModalChange(event: any) {
    this.visibleQrCodeModal = event;
  }
  //#endregion
  deactivateData(id: number | undefined) {
    if (!id) return;
    this.surveyFormService.deactivate(id).subscribe({
      next: (res) => {
        this.initData!.isActive = false;
        this.updateForm.patchValue({ isActive: false });
        this.toastService.showToast(EColors.success, res.message);
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
  }
  activateData(id: number | undefined) {
    if (!id) return;
    this.surveyFormService.activate(id).subscribe({
      next: (res) => {
        this.initData!.isActive = true;
        this.updateForm.patchValue({ isActive: true });
        this.toastService.showToast(EColors.success, res.message);
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
  }
}
