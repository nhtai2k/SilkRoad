import { DecimalPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Params, RouterLink } from '@angular/router';
import { EOrderStatus, EPaymentStatus, EPaymentTypes } from '@common/global';
import { DataTableComponent } from '@components/data-table/data-table.component';
import { OrderModel } from '@models/lipstick-shop-models/order.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { OrderService } from '@services/lipstick-shop-services/order.service';
@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, RouterLink, NgFor, DataTableComponent,DecimalPipe],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  pageInformation: PageInformation = new PageInformation();
  orderList: OrderModel[] = [];
  data: Pagination<OrderModel> = new Pagination<OrderModel>();
  filterForm: FormGroup = new FormGroup({
    statusId: new FormControl(-1),
    phoneNumber: new FormControl('')
  });
  constructor(private orderService: OrderService) { }
  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    const query: Params = {
      statusId: this.filterForm.value.statusId,
      phoneNumber: this.filterForm.value.phoneNumber,
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize,
    }
    this.orderService.getAll(query).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.totalItems = res.data.totalItems;
      this.pageInformation.totalPages = res.data.totalPages;
      this.pageInformation.currentPage = res.data.currentPage;
    });
  }
  filter() {
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
  getStatusName(statusId: number): string {
    return EOrderStatus[statusId] || 'Unknown';
  }
  getPaymentStatusName(statusId: number): string {
    return EPaymentStatus[statusId] || 'Unknown';
  }
  getPaymentMethodName(paymentMethodId: number): string {
    return EPaymentTypes[paymentMethodId] || 'Unknown';
  }
}
