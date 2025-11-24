import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { baseUrl, EColors, EPaymentStatus, EPaymentTypes, numberEnumToArray } from '@common/global';
import {
  FormDirective, FormLabelDirective, FormSelectDirective, FormControlDirective,
  ButtonDirective, CardComponent, CardBodyComponent, AccordionComponent, AccordionItemComponent,
  ButtonCloseDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent,
  TableDirective, TemplateIdDirective, AccordionButtonDirective
} from '@coreui/angular';
import { OrderDetailModel } from '@models/lipstick-shop-models/order.model';
import { DistrictModel, ProvinceModel } from '@models/province.model';
import { ToastService } from '@services/helper-services/toast.service';
import { OrderService } from '@services/lipstick-shop-services/order.service';

import { ProvinceService } from '@services/system-services/province.service';

@Component({
  selector: 'app-update',
  imports: [
    FormDirective, FormLabelDirective, FormSelectDirective,
    FormControlDirective, ButtonDirective, RouterLink, CardComponent, CardBodyComponent,
    ReactiveFormsModule, AccordionButtonDirective, AccordionComponent,
    AccordionItemComponent, TemplateIdDirective,
    TableDirective, DecimalPipe
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  orderDetails: OrderDetailModel[] = [];
  baseUrl = baseUrl;
  paymentMethods: any[] = [];
  ePaymentStatus: any = EPaymentStatus;
  provinceList: ProvinceModel[] = [];
  districtList: DistrictModel[] = [];
  amount: number = 0;
  totalQuantity: number = 0;
  orderForm: FormGroup = new FormGroup({
    id: new FormControl(-1),
    fullName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    shippingAddress: new FormControl(''),
    provinceId: new FormControl(-1),
    districtId: new FormControl(-1),
    paymentStatusId: new FormControl(-1,),
    paymentMethodId: new FormControl(-1),
    amount: new FormControl(0),
    totalQuantity: new FormControl(0),
    orderDetails: new FormControl([]),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private toastService: ToastService,
    private provinceService: ProvinceService
  ) { }
  ngOnInit(): void {

    this.paymentMethods = numberEnumToArray(EPaymentTypes);
    // Load order details by ID
    const id = this.route.snapshot.paramMap.get('id');
    this.orderService.getById(id).subscribe(res => {
      this.orderForm.patchValue(res.data);
      // this.orderForm.patchValue({
      //   orderDate: new Date(res.data.orderDate).toISOString().substring(0, 16),
      //   shippingDate: res.data.shippingDate ? new Date(res.data.shippingDate).toISOString().substring(0, 16) : null,
      //   receiveDate: res.data.receiveDate ? new Date(res.data.receiveDate).toISOString().substring(0, 16) : null
      // });
      this.orderDetails = res.data.orderDetails;
      this.amount = res.data.amount;
      this.totalQuantity = res.data.totalQuantity;
      // Load provinces
      this.provinceService.getAll().subscribe((result: any) => {
        this.provinceList = result.data;
        let data = this.provinceList.find(x => x.id === res.data.provinceId);
        if (data) {
          this.districtList = data?.districts || [];
        }
      });
    });

  }
  onSubmit() {
    if (this.orderForm.valid) {
      this.orderService.update(this.orderForm.value).subscribe(res => {
        this.toastService.showToast(EColors.success, res.message);
        this.router.navigate(['/lipstick-shop/orders']);
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  //patch value for province
  onProvinceChange(id: any) {
    let data = this.provinceList.find(x => x.id === id);
    if (data) {
      this.districtList = data?.districts || [];
      this.orderForm.patchValue({ provinceId: id });
    }
  }
  //patch value for district
  onDistrictChange(id: any) {
    if (id !== -1) {
      this.orderForm.patchValue({ districtId: id });
    }
  }

}
