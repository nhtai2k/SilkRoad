import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, FormControlDirective, FormDirective, FormLabelDirective} from '@coreui/angular';
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
  constructor(
    // private questionGroupService: QuestionGroupService,
    private surveyFormService: SurveyFormService,
    private router: Router
  ) { }
  ngOnInit() {
    // this.questionGroupService.getEagerAllElements().subscribe((response) => {
    //   this.intitQuestionGroupData(response.data);
    // });
  }
  //#endregion

  //#endregion submit
  onSubmit() {
  }

  get name() { return this.createForm.get('name'); }
  get titleEN() { return this.createForm.get('titleEN'); }
  get titleVN() { return this.createForm.get('titleVN'); }
  get startDate() { return this.createForm.get('startDate'); }
  get endDate() { return this.createForm.get('endDate'); }

  //#endregion
}
