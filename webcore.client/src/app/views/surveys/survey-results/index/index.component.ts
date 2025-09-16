import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Params, RouterLink } from '@angular/router';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { FormSelectDirective } from '@coreui/angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ParticipantModel } from '@models/survey-models/participant.model';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { ParticipantService } from '@services/survey-services/participant.service';
import { SurveyFormService } from '@services/survey-services/survey-form.service';

@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, DataTableComponent, RouterLink, FormSelectDirective, DatePipe],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  data: Pagination<ParticipantModel> = new Pagination<ParticipantModel>();
  pageInformation: PageInformation = new PageInformation();
  surveyFormList: SurveyFormModel[] = [];
  surveyFormId: number = -1;
  constructor(
    private surveyFormService: SurveyFormService,
    private participantService: ParticipantService
  ){}
  ngOnInit(): void {
    this.getSurveyFormList();
    this.getData();
  }
  getSurveyFormList() {
    this.surveyFormService.getAllActive().subscribe((res) => {
      this.surveyFormList = res.data;
    });
  }
  getData() {
    const query: Params = {
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize,
      surveyFormId: this.surveyFormId
    }
    this.participantService.getAll(query).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.totalItems = res.data.totalItems;
      this.pageInformation.totalPages = res.data.totalPages;
      this.pageInformation.currentPage = res.data.currentPage;
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
  onChangeSurveyForm(event: any) {
    this.surveyFormId = event.target.value;
    this.getData();
  }
}
