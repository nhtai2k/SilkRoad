import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageInformation, Pagination } from '@models/pagination.model';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { QuestionModel } from '@models/survey-models/question.model';
import { QuestionGroupService } from '@services/survey-services/question-group.service';
import { QuestionService } from '@services/survey-services/question.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormSelectDirective } from '@coreui/angular';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';

@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, DataTableComponent, RouterLink, FormSelectDirective],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  data: Pagination<QuestionModel> = new Pagination<QuestionModel>();
  questionGroupList: QuestionGroupModel[] = [];
  pageInformation: PageInformation = new PageInformation();
  filterForm: FormGroup = new FormGroup({
    questionGroupId: new FormControl(-1)
  });
  constructor(private questionService: QuestionService, private questionGroupService: QuestionGroupService){}
  ngOnInit() {
  this.questionGroupService.getAllActive().subscribe((response) => {
    this.questionGroupList = response.data;
  });
  this.getData();
  }
  getData() {
    this.questionService.getAllByQuestionGroupId(this.filterForm.value.questionGroupId).subscribe((response) => {
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

  onChangeQuestionGroup(event: any) {
    this.filterForm.patchValue({
      questionGroupId: event.target.value
    });
    this.getData();
  }
}
