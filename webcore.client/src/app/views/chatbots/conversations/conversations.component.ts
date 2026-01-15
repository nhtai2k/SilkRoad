import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent, AccordionButtonDirective, AccordionComponent, TemplateIdDirective, AccordionItemComponent } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { PromptModel } from '@models/chatbot-models/prompt.model';
import { PromptService } from '@services/chatbot-services/prompt.service';
import { ConversationService } from '@services/chatbot-services/conversation.service';
import { ConversationModel } from '@models/chatbot-models/conversation.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.scss',
  imports: [CommonModule, FormControlDirective, FormDirective, ReactiveFormsModule, DataTableComponent, IconDirective, RouterLink,
      AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective,]
})
export class ConversationsComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  data: Pagination<ConversationModel> = new Pagination<ConversationModel>();
  icons: any = {cilPen};
  filterForm: FormGroup = new FormGroup({
    pageSize: new FormControl(10),
    pageIndex: new FormControl(1),
    searchText: new FormControl(''),
    source: new FormControl(''),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  });


  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    //set default start and end date
    const currentDate = new Date();
    const priorDate = new Date().setDate(currentDate.getDate() - 30);
    this.filterForm.controls['startDate'].setValue(new Date(priorDate));
    this.filterForm.controls['endDate'].setValue(currentDate);

    this.getData();
  }

  getData() {
    this.conversationService.getAll(this.filterForm.value).subscribe({
      next: (res) => {
        this.data = res.data;
        this.pageInformation.currentPage = this.data.currentPage;
        this.pageInformation.totalItems = this.data.totalItems;
        this.pageInformation.totalPages = this.data.totalPages;
      }
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

  filter() {}
  
  //#endregion
}