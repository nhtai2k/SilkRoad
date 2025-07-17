import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { DataTableComponent } from '@components/data-table/data-table.component';
import { MemberModel } from '@models/lipstick-shop-models/member.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { MemberService } from '@services/lipstick-shop-services/member.service';

@Component({
  selector: 'app-members',
  imports: [
    NgFor, 
    ReactiveFormsModule,
    DataTableComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {
  pageInformation: PageInformation = new PageInformation();
  data: Pagination<MemberModel> = new Pagination<MemberModel>();
  filterForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const query: Params = {
      phoneNumber: this.filterForm.get('phoneNumber')?.value,
      email: this.filterForm.get('email')?.value,
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize
    };
    this.memberService.getAll(query).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = res.data.currentPage;
      this.pageInformation.totalItems = res.data.totalItems;
      this.pageInformation.totalPages = res.data.totalPages;
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
  filter() {
    this.pageInformation.pageIndex = 1;
    this.getData();
  }
}
