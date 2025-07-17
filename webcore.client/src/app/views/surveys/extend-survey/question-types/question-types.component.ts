import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, TableDirective } from '@coreui/angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { QuestionTypeModel } from '@models/survey-models/question-type.model';
import { QuestionTypeService } from '@services/survey-services/question-type.service';

@Component({
  selector: 'app-question-types',
  imports: [CardComponent, CardBodyComponent, NgFor, TableDirective],
  templateUrl: './question-types.component.html',
  styleUrl: './question-types.component.scss'
})
export class QuestionTypesComponent {
  data: QuestionTypeModel[] = []
  constructor(private questionTypeService: QuestionTypeService) {}

  ngOnInit() {
    this.questionTypeService.getAll().subscribe((response) => {
      this.data = response.data;
    });
  }
}
