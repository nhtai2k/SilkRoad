import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageInformation, Pagination } from '@models/pagination.model';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { QuestionModel } from '@models/survey-models/question.model';
import { cilPlus, cilTrash, cilPen, cilSave } from '@coreui/icons';
import { RouterLink } from '@angular/router';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, FormSelectDirective, TemplateIdDirective } from '@coreui/angular';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { IconDirective } from '@coreui/icons-angular';
import { QuestionGroupLibraryService } from '@services/survey-services/question-group-library.service';
import { QuestionLibraryService } from '@services/survey-services/question-library.service';
import { QuestionTypeService } from '@services/survey-services/question-type.service';
import { OptionModel } from '@models/option.model';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";

@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, DataTableComponent, RouterLink, 
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective, IconDirective, SelectSearchComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  //#region Variables
  data: Pagination<QuestionModel> = new Pagination<QuestionModel>();
  questionGroupLibraries: OptionModel[] = [];
  questionTypes: OptionModel[] = [];
  pageInformation: PageInformation = new PageInformation();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave };
  filterForm: FormGroup = new FormGroup({
    questionGroupId: new FormControl(-1),
    questionTypeId: new FormControl(-1),
    searchText: new FormControl('')
  });
  //#endregion
  //#region Constructor and hooks
  constructor(private questionLibraryService: QuestionLibraryService,
    private questionGroupLibraryService: QuestionGroupLibraryService,
    private questionTypeService: QuestionTypeService) { }
  ngOnInit() {
    this.questionGroupLibraryService.getOptionList().subscribe((res) => {
      this.questionGroupLibraries = res.data;
      console.log('questionGroups', res.data);
    });
    this.questionTypeService.getOptionList().subscribe((res) => {
      this.questionTypes = res.data;
    });
    this.getData();
  }
  getData() {

  }
  onPageIndexChange(index: any) {
    this.pageInformation.pageIndex = index;
    this.getData();
  }
  onPageSizeChange(size: any) {
    this.pageInformation.pageSize = size;
    this.pageInformation.pageIndex = 1;
    this.getData();
  }

  onChangeQuestionGroup(event: any) {
    this.filterForm.patchValue({
      questionGroupId: event.target.value
    });
    this.getData();
  }
  //#endregion
  filter() {
    this.pageInformation.pageIndex = 1;
    this.getData();
  }
}
