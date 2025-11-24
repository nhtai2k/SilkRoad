import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { baseUrl, EColors, EPaymentStatus, EPaymentTypes, numberEnumToArray } from '@common/global';
import { FormDirective, FormLabelDirective, FormSelectDirective, FormControlDirective,
  ButtonDirective, CardComponent, CardBodyComponent, AccordionComponent, AccordionItemComponent,
  ButtonCloseDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent,
  TableDirective, TemplateIdDirective, AccordionButtonDirective
} from '@coreui/angular';
import { OrderDetailModel } from '@models/lipstick-shop-models/order.model';
import { ProductViewModel } from '@models/lipstick-shop-models/product.model';
import { DistrictModel, ProvinceModel } from '@models/province.model';
import { ToastService } from '@services/helper-services/toast.service';
import { OrderService } from '@services/lipstick-shop-services/order.service';
import { ProductService } from '@services/lipstick-shop-services/product.service';
import { ProvinceService } from '@services/system-services/province.service';

@Component({
  selector: 'app-create',
  imports: [
    FormDirective, FormLabelDirective, FormSelectDirective,
    FormControlDirective, ButtonDirective, RouterLink, CardComponent, CardBodyComponent,
    ReactiveFormsModule, ModalBodyComponent, ModalComponent, ModalFooterComponent,
    ButtonCloseDirective, ModalHeaderComponent, AccordionButtonDirective, AccordionComponent,
    AccordionItemComponent, TemplateIdDirective,
    TableDirective, NgIf, DecimalPipe
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  //#region Properties
  orderDetails: OrderDetailModel[] = [];
  searchResults: ProductViewModel[] = [];
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  updateByIndex: number = 0;
  deleteByIndex: number = 0;
  baseUrl = baseUrl;
  paymentMethods: any[] = [];
  ePaymentStatus: any = EPaymentStatus;
  provinceList: ProvinceModel[] = [];
  districtList: DistrictModel[] = [];
  amount: number = 0;
  totalQuantity: number = 0;
  // the order form
  orderForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl(''),
    shippingAddress: new FormControl('', Validators.required),
    provinceId: new FormControl(-1, Validators.min(1)),
    districtId: new FormControl(-1, Validators.min(1)),
    paymentStatusId: new FormControl(-1, Validators.min(1)),
    paymentMethodId: new FormControl(-1, Validators.min(1)),
    amount: new FormControl(0),
    totalQuantity: new FormControl(0),
    orderDetails: new FormControl([]),
  });
  // the add product form
  addProductForm: FormGroup = new FormGroup({
    productId: new FormControl(-1),
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
    avatar: new FormControl(''),
    quantity: new FormControl(1, Validators.min(1)),
    price: new FormControl(0, Validators.min(0)),
    saleOff: new FormControl(false),
    discountPercent: new FormControl(0,),
    salePrice: new FormControl(0),
  });
  //the update product form
  updateProductForm: FormGroup = new FormGroup({
    productId: new FormControl(-1),
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
    avatar: new FormControl(''),
    quantity: new FormControl(1, Validators.min(1)),
    price: new FormControl(0, Validators.min(0)),
    saleOff: new FormControl(false),
    discountPercent: new FormControl(0,),
    salePrice: new FormControl(0),
  });
  //constructor
  constructor(
    private router: Router,
    private orderService: OrderService,
    private toastService: ToastService,
    private productService: ProductService,
    private provinceService: ProvinceService
  ) { }
  //#endregion
  //#region method
  ngOnInit(): void {
    this.paymentMethods = numberEnumToArray(EPaymentTypes);
    this.provinceService.getAll().subscribe((res: any) => {
      this.provinceList = res.data;
    }, (error: any) => {
      console.log(error);
    });
  }

  //calculate the total amount and total quantity
  calculateAmount() {
    this.amount = 0;
    this.totalQuantity = 0;
    console.log(this.orderDetails);
    this.orderDetails.forEach((item) => {
      this.totalQuantity += item.quantity;
      console.log(item.quantity);
      if (item.saleOff) {
        this.amount += (item.salePrice ? item.salePrice : 0) * item.quantity;
      } else {
        this.amount += item.price * item.quantity;
      }
    });
  }

  //submit the order form
  onSubmit() {
    if( this.orderDetails.length === 0) {
      this.toastService.showToast(EColors.danger, "Please add at least one product to the order.");
      return;
    }
    this.orderForm.patchValue({"orderDetails": this.orderDetails});
    const order = this.orderForm.value;
    order.orderDetails = this.orderDetails;
    if (this.orderForm.valid) {
      this.orderService.create(this.orderForm.value).subscribe(res => {
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

  //#endregion
  //#region  Create Form
  onSubmitCreateForm() {
    //Add the product to the order details
    //Check if the product already exists in the order details, Just update the quantity
    const productId = this.addProductForm.value.productId;
    const existingProductIndex = this.orderDetails.findIndex(item => item.productId === productId);
    if (existingProductIndex !== -1) {
      // If the product already exists, update the quantity
      this.orderDetails[existingProductIndex].quantity += this.addProductForm.value.quantity;
    } else {
      // If the product does not exist, add it to the order details
      this.orderDetails.push(this.addProductForm.value);
    }


    //Notify the user
    this.toastService.showToast(EColors.success, "Create Predefined Answer Success!");
    //Close the modal and reset the form
    this.toggleLiveCreateModel();
    //Reset the form
    this.addProductForm.reset();
    this.addProductForm.patchValue({ "quantity": 1 });
    //Calculate the amount
    this.calculateAmount();
  }


  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  onSearchCreateForm(event: any) {
    const searchText = event.target.value;
    const searchResultElement = document.getElementById("searchResultCreateForm");
    if (searchText.length >= 3) {
      this.searchResults = [];
      this.productService.getBySearchText(searchText).subscribe(res => {
        this.searchResults = res.data;
        searchResultElement?.classList.remove("d-none");
      }, (error) => {
        this.toastService.showToast(EColors.danger, error.error.message);
        searchResultElement?.classList.add("d-none");
      });
    } else {
      this.searchResults = [];
      searchResultElement?.classList.add("d-none");
    }
  }
  onSelectProductCreateForm(product: ProductViewModel) {
    this.addProductForm.patchValue({
      productId: product.id,
      price: product.price,
      nameEN: product.nameEN,
      nameVN: product.nameVN,
      avatar: product.avatar,
      saleOff: product.saleOff,
      discountPercent: product.discountPercent,
      salePrice: product.salePrice
    });
    const searchResultElement = document.getElementById("searchResult");
    const searchProductInput = document.getElementById("searchProduct") as HTMLInputElement | null;
    if (searchProductInput) {
      searchProductInput.value = '';
    }
    searchResultElement?.classList.add("d-none");
    this.searchResults = [];
  }

  //#endregion
  //#region  Update Form
  updateData(index: number) {
    this.updateByIndex = index;
    this.updateProductForm.patchValue(this.orderDetails[index]);
    this.toggleLiveUpdateModel();
  }
  onSubmitUpdateForm() {
    this.orderDetails[this.updateByIndex] = this.updateProductForm.value;
    this.toastService.showToast(EColors.success, "Update Predefined Answer Success!");
    this.toggleLiveUpdateModel();
    this.updateProductForm.reset();
    this.calculateAmount();
  }

  toggleLiveUpdateModel() {
    this.visibleUpdateModal = !this.visibleUpdateModal;
  }

  handleLiveUpdateModelChange(event: any) {
    this.visibleUpdateModal = event;
  }


  //#endregion
  //#region Delete
  deleteData(index: number) {
    this.deleteByIndex = index;
    this.toggleLiveDelete();
  }
  deleteDataConfirm() {
    this.orderDetails.splice(this.deleteByIndex, 1);
    this.toastService.showToast(EColors.success, "Delete Predefined Answer Success!");
    this.toggleLiveDelete();
    this.calculateAmount();
  }
  toggleLiveDelete() {
    this.visibleDelete = !this.visibleDelete;
  }

  handleLiveDeleteChange(event: any) {
    this.visibleDelete = event;
  }
  onSearchUpdateForm(event: any) {
    const searchText = event.target.value;
    const searchResultElement = document.getElementById("searchResultUpdateForm");
    if (searchText.length >= 3) {
      this.searchResults = [];
      this.productService.getBySearchText(searchText).subscribe(res => {
        this.searchResults = res.data;
        searchResultElement?.classList.remove("d-none");
      }, (error) => {
        this.toastService.showToast(EColors.danger, error.error.message);
        searchResultElement?.classList.add("d-none");
      });
    } else {
      this.searchResults = [];
      searchResultElement?.classList.add("d-none");
    }
  }
  onSelectProductUpdateForm(product: ProductViewModel) {
    this.updateProductForm.patchValue({
      productId: product.id,
      price: product.price,
      productName: product.nameEN,
      productImage: product.avatar
    });
    const searchResultElement = document.getElementById("searchResultUpdateForm");
    searchResultElement?.classList.add("d-none");
    this.searchResults = [];
  }

  //#endregion
}
