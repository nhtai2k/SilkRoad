import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { IconDirective } from '@coreui/icons-angular';
import { cilExitToApp, cilPen, cilPlus, cilSave, cilTrash } from '@coreui/icons';
import { CommonModule } from '@angular/common';
import { CreateHelperComponent } from "./create-helper.component";
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
@Component({
  selector: 'app-create',
  imports: [FormControlDirective, FormLabelDirective, CardComponent, CardBodyComponent, ReactiveFormsModule, FormDirective, ButtonDirective, CommonModule,
    IconDirective, RouterLink, CreateHelperComponent, RangeDatetimePickerComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent {
  //#region Variables
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp };

  // questionGroups: QuestionGroupModel[] = [...questionGroupList];
  // questions: QuestionModel[] = [...questionList];

  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    descriptionEN: new FormControl(''),
    descriptionVN: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isActive: new FormControl(true)
  });
  //#endregion

  //#region Constructor and Hooks
  constructor(private surveyFormService: SurveyFormService, private router: Router) { }
  onDateRangeChange(event: Date[]) {
    this.startDate?.setValue(event[0]);
    this.endDate?.setValue(event[1]);
    console.log(event);
  }
  //#endregion

  //#endregion submit
  onSubmit() {
    if (this.createForm.valid) {
      this.surveyFormService.create(this.createForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/surveys/survey-forms']);
          } else {
            alert('Error: ' + res.message);
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
