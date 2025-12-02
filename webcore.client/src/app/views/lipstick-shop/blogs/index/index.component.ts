
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { baseUrl } from '@common/global';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective } from '@coreui/angular';
import { BlogViewModel } from '@models/lipstick-shop-models/blog.model';
import { TopicViewModel } from '@models/lipstick-shop-models/topic.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { BlogService } from '@services/lipstick-shop-services/blog.service';
import { TopicService } from '@services/lipstick-shop-services/topic.service';
import { cilPlus, cilTrash, cilPen } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';

@Component({
  selector: 'app-index',
  imports: [ModalBodyComponent, RouterLink, IconDirective, ModalComponent, ButtonDirective, ReactiveFormsModule, FormSelectDirective, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})

export class IndexComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  visibleDelete: boolean = false;
  deleteById: number = -1;
  topicId: number = -1;
  topicList: TopicViewModel[] = [];
  data: Pagination<BlogViewModel> = new Pagination<BlogViewModel>();
  baseUrl:string = baseUrl;
  icons: any = { cilPlus, cilTrash, cilPen };



  constructor(private topicService : TopicService, private blogService : BlogService) {}

  ngOnInit(): void {
    this.getData();
    this.topicService.getAllActive().subscribe((res) => {
      this.topicList = res.data;
    });
  }
  getData(){
    this.blogService.getAll(this.pageInformation.pageIndex,this.pageInformation.pageSize,this.topicId).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
    });
  }
  filter(topic: any) {
    this.topicId = topic.target.value;
    this.getData();
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

//#region Delete
deleteData(id: number) {
  this.deleteById = id;
  this.toggleLiveDelete();
}
deleteDataConfirm() {
  this.blogService.softDelete(this.deleteById).subscribe(() => {
    this.toggleLiveDelete();
    this.getData();
  });
}
toggleLiveDelete() {
  this.visibleDelete = !this.visibleDelete;
}

handleLiveDeleteChange(event: any) {
  this.visibleDelete = event;
}
//#endregion
}
