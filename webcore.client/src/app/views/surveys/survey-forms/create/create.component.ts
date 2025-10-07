import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { IconDirective } from '@coreui/icons-angular';
import { cilExitToApp, cilPen, cilPlus, cilSave, cilTrash } from '@coreui/icons';
import { CommonModule } from '@angular/common';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { CreateHelperComponent } from './create-helper.component';
@Component({
  selector: 'app-create',
  imports: [FormControlDirective, FormLabelDirective, CardComponent, CardBodyComponent, ReactiveFormsModule, FormDirective, ButtonDirective, CommonModule,
    IconDirective, RouterLink, CreateHelperComponent, RangeDatetimePickerComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent {
  //#region Variables
  @ViewChild('createHelperComponent') createHelperComponent!: CreateHelperComponent;
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp };

  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    descriptionEN: new FormControl(''),
    descriptionVN: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isActive: new FormControl(false),
    questionGroups: new FormControl([]),
    questions: new FormControl([])
  });
  //#endregion

  //#region Constructor and Hooks
  constructor(private surveyFormService: SurveyFormService, private toastService: ToastService, private router: Router) { }
  onDateRangeChange(event: Date[]) {
    this.startDate?.setValue(event[0]);
    this.endDate?.setValue(event[1]);
  }
  //#endregion

  //#endregion submit
  onSubmit() {    
    if (this.createForm.valid) {
      const questionGroups = this.createHelperComponent.questionGroups;
      const questions = this.createHelperComponent.questions;
      this.createForm.patchValue({ questionGroups, questions });
      console.log(this.createForm.value);
      this.surveyFormService.create(this.createForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastService.showToast(EColors.success, 'Survey form created successfully');
            this.router.navigate(['/surveys/survey-forms']);
          } else {
            this.toastService.showToast(EColors.danger, res.message);
          }
        }
      });
    }
  }

  get name() { return this.createForm.get('name'); }
  get titleEN() { return this.createForm.get('titleEN'); }
  get titleVN() { return this.createForm.get('titleVN'); }
  get startDate() { return this.createForm.get('startDate'); }
  get endDate() { return this.createForm.get('endDate'); }

  //#endregion
}
