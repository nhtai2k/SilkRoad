import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Params, RouterLink } from '@angular/router';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { PageInformation, Pagination } from '@models/pagination.model';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';

@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, DataTableComponent, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  data: Pagination<SurveyFormModel> = new Pagination<SurveyFormModel>();
  pageInformation: PageInformation = new PageInformation();
  constructor(private surveyFormService: SurveyFormService){}
  ngOnInit() {
    this.getData();
  }
  getData() {
    const query: Params = {
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize
    }
    this.surveyFormService.getAll(query).subscribe((response) => {
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
}
