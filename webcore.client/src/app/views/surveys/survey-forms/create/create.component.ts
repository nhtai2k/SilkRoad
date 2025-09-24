import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, CardBodyComponent, CardComponent,
   FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, TableDirective, TemplateIdDirective } from '@coreui/angular';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { SelectedQuestionModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { IconDirective } from '@coreui/icons-angular';
import { cilPlus } from '@coreui/icons';
@Component({
  selector: 'app-create',
  imports: [FormControlDirective, FormLabelDirective, CardComponent, CardBodyComponent, ReactiveFormsModule,
    FormDirective, ButtonDirective,
    // AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective,FormCheckComponent, 
    RouterLink, RangeDatetimePickerComponent, TableDirective, IconDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  //#region Variables
  icons: any = { cilPlus };
  
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
  onSubmit() {
  }

  get name() { return this.createForm.get('name'); }
  get titleEN() { return this.createForm.get('titleEN'); }
  get titleVN() { return this.createForm.get('titleVN'); }
  get startDate() { return this.createForm.get('startDate'); }
  get endDate() { return this.createForm.get('endDate'); }
}
