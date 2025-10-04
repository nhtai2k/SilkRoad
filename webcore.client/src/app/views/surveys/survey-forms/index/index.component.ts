import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Params, RouterLink } from '@angular/router';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { PageInformation, Pagination } from '@models/pagination.model';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { cilPlus, cilTrash, cilPen, cilSave } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective } from '@coreui/angular';

@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, DataTableComponent, RouterLink, IconDirective,
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  //#region Variables
  data: Pagination<SurveyFormModel> = new Pagination<SurveyFormModel>();
  pageInformation: PageInformation = new PageInformation();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave };
  filterForm: FormGroup = new FormGroup({
    questionGroupId: new FormControl(-1),
    questionTypeId: new FormControl(-1),
    searchText: new FormControl('')
  });
  //#endregion
  //#region Constructor and hooks
  constructor(private surveyFormService: SurveyFormService) { }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.surveyFormService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((response) => {
      this.data = response.data;
      this.pageInformation.totalItems = response.data.totalItems;
      this.pageInformation.totalPages = response.data.totalPages;
      this.pageInformation.currentPage = response.data.currentPage;
    });
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
  //#endregion
  filter() {
    this.pageInformation.pageIndex = 1;
    this.getData();
  }
}
