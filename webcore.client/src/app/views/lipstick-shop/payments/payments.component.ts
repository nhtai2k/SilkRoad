import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective } from '@coreui/angular';
import { BrandViewModel } from '@models/lipstick-shop-models/brand.model';
import { BrandService } from '@services/lipstick-shop-services/brand.service';
import { cilCloudUpload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors, EPaymentStatus, EPaymentTypes } from '@common/global';
import { PaymentService } from '@services/lipstick-shop-services/payment.service';
import { Params } from '@angular/router';
import { PaymentViewModel } from '@models/lipstick-shop-models/payment.model';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
@Component({
  selector: 'app-payments',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, DecimalPipe,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  data: Pagination<PaymentViewModel> = new Pagination<PaymentViewModel>();
  reviewCreateUploadImage: string = '';
  reviewUpdateUploadImage: string = '';
  icons : any = {cilCloudUpload};
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    gateway: new FormControl(''),
    transactionDate: new FormControl(''),
    accountNumber: new FormControl(''),
    code: new FormControl(''),
    content: new FormControl(''),
    transferType: new FormControl(''),
    transferAmount: new FormControl(0),
    accumulated: new FormControl(0),
    subAccount: new FormControl(''),
    referenceCode: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private paymentService : PaymentService,
    private toastService : ToastService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const query: Params = {
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize
    }
    this.paymentService.getAll(query).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
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


//#region  Update Form
updateData(id: string) {
  this.paymentService.getById(id).subscribe((res) => {
    if (res.data.sepayModel) {
      this.updateForm.patchValue(res.data.sepayModel);
      this.toggleLiveUpdateModel();
    } else {
      this.toastService.showToast(EColors.danger, 'No Sepay data found for this payment.');
    }
  });
}

toggleLiveUpdateModel() {
  this.visibleUpdateModal = !this.visibleUpdateModal;
}

handleLiveUpdateModelChange(event: any) {
  this.visibleUpdateModal = event;
}

getPaymentStatusName(statusId: number): string {
  return EPaymentStatus[statusId] || 'Unknown';
}
getPaymentTypeName(paymentMethodId: number): string {
  return EPaymentTypes[paymentMethodId] || 'Unknown';
}

//#endregion

}
