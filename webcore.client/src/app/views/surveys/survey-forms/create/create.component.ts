import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, FormControlDirective, FormDirective, FormLabelDirective, AlignDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective } from '@coreui/angular';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { IconDirective } from '@coreui/icons-angular';
import { cilExitToApp, cilPen, cilPlus, cilSave, cilTrash } from '@coreui/icons';
import { CommonModule } from '@angular/common';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { TextEditorComponent } from "@components/text-editor/text-editor.component";
import { ToolbarItem } from 'ngx-editor';
import { OptionModel } from '@models/option.model';
import { StoreService } from '@services/survey-services/store.service';

@Component({
  selector: 'app-create',
  imports: [FormControlDirective, FormLabelDirective, CardComponent, CardBodyComponent, ReactiveFormsModule, FormDirective, ButtonDirective, CommonModule,
    IconDirective, RouterLink, RangeDatetimePickerComponent, FormSelectDirective, TextEditorComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent implements OnInit {
  //#region Variables
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp };
  storeList: OptionModel[] = [];

  customToolbar: ToolbarItem[][] = [
    ['bold', 'italic', 'underline'],
    ['ordered_list', 'bullet_list'],
    ['link']
  ];
  createForm: FormGroup = new FormGroup({
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
    maxParticipants: new FormControl(0),
    questionGroups: new FormControl([]),
    questions: new FormControl([])
  });
  //#endregion

  //#region Constructor and Hooks
  constructor(private surveyFormService: SurveyFormService,private storeService: StoreService, private toastService: ToastService, private router: Router) { }
  ngOnInit(): void {
    this.storeService.getOptionList().subscribe({
      next: (res) => {
        if (res.success) {
          this.storeList = res.data;
        }
      }
    });
  }
  onDateRangeChange(event: Date[]) {
    this.startDate?.setValue(event[0]);
    this.endDate?.setValue(event[1]);
  }
  //#endregion

  //#endregion submit
  onSubmit() {
    if (this.createForm.valid) {
      console.log(this.createForm.value);
      this.surveyFormService.create(this.createForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            const data = res.data;
            this.toastService.showToast(EColors.success, res.message);
            this.router.navigate(['surveys/survey-forms/update/', data.id]);
          } else {
            this.toastService.showToast(EColors.danger, res.message);
          }
        }
      });
    }
  }
  get formStyleId() { return this.createForm.get('formStyleId'); }
  get name() { return this.createForm.get('name'); }
  get titleEN() { return this.createForm.get('titleEN'); }
  get titleVN() { return this.createForm.get('titleVN'); }
  get startDate() { return this.createForm.get('startDate'); }
  get endDate() { return this.createForm.get('endDate'); }
  get isLimited() { return this.createForm.get('isLimited'); }
  get maxParticipants() { return this.createForm.get('maxParticipants'); }

  //#endregion
}
