import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { IconDirective } from '@coreui/icons-angular';
import { cilExitToApp, cilPen, cilPlus, cilSave, cilTrash } from '@coreui/icons';
import { CommonModule } from '@angular/common';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';

@Component({
  selector: 'app-update',
  imports: [FormControlDirective, FormLabelDirective, CardComponent, CardBodyComponent, ReactiveFormsModule, FormDirective, ButtonDirective, CommonModule,
    IconDirective, RouterLink, RangeDatetimePickerComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  //#region Variables
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp };

  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    descriptionEN: new FormControl(''),
    descriptionVN: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isActive: new FormControl(true),
    questionGroups: new FormControl([]),
    questions: new FormControl([])
  });
  //#endregion
  constructor(
    private surveyFormService: SurveyFormService, 
    private toastService: ToastService,
     private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.surveyFormService.getById(id).subscribe((response) => {
      this.updateForm.patchValue({
        name: response.data.name,
        titleEN: response.data.titleEN,
        titleVN: response.data.titleVN,
        descriptionEN: response.data.descriptionEN,
        descriptionVN: response.data.descriptionVN,
        startDate: response.data.startDate,
        endDate: response.data.endDate,
        isActive: response.data.isActive,

      });
    })
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

  }

  get name() { return this.updateForm.get('name'); }
  get titleEN() { return this.updateForm.get('titleEN'); }
  get titleVN() { return this.updateForm.get('titleVN'); }
  get descriptionEN() { return this.updateForm.get('descriptionEN'); }
  get descriptionVN() { return this.updateForm.get('descriptionVN'); }
}
