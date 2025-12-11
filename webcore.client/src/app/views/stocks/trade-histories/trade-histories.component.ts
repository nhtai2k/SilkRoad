import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, TemplateIdDirective, AlignDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX, cilSearch } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { OptionModel } from '@models/option.model';
import { InputCurrencyComponent } from "@components/inputs/input-currency/input-currency.component";
import { CommonModule } from '@angular/common';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { AuthService } from '@services/system-services';
import { TradeHistoryService } from '@services/stock-services/trade-history.service';
import { TradeHistoryModel } from '@models/stock-models/trade-history.model';
import { CompanyService } from '@services/stock-services';
import { InputNumberComponent } from "@components/inputs/input-number/input-number.component";


@Component({
  selector: 'app-trade-histories',
  templateUrl: './trade-histories.component.html',
  styleUrl: './trade-histories.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, IconDirective, ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, ModalFooterComponent, CommonModule,
    ModalHeaderComponent, DataTableComponent, InputCurrencyComponent, SelectSearchComponent, InputNumberComponent,
      FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,]
})
export class TradeHistoriesComponent implements OnInit {
  //#region Properties
  data: Pagination<TradeHistoryModel> = new Pagination<TradeHistoryModel>();
  pageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: any = null;
  companiesOptionList: OptionModel[] = [];
  initAmountCreateForm = signal<number>(0);
  initFeesCreateForm = signal<number>(0);
  initTotalAmountCreateForm = signal<number>(0);
  // initAmountUpdateForm = signal<number>(0);
  // initSourceIdUpdateForm = signal<number>(1);
  userId: number = -1;
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX, cilSearch };

  createForm: FormGroup = new FormGroup({
    userId: new FormControl(-1),
    companyId: new FormControl(-1, Validators.required),
    tradeDate: new FormControl('', Validators.required),
    isBuy: new FormControl(true),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    totalAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
    fees: new FormControl(0, [Validators.required, Validators.min(0)]),
    profitLoss: new FormControl(null),
    profitLossPercent: new FormControl(null),
    note: new FormControl('', Validators.maxLength(500))
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    userId: new FormControl(-1),
    companyId: new FormControl(-1, Validators.required),
    tradeDate: new FormControl('', Validators.required),
    isBuy: new FormControl(true),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    totalAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
    fees: new FormControl(0, [Validators.required, Validators.min(0)]),
    profitLoss: new FormControl(null),
    profitLossPercent: new FormControl(null),
    note: new FormControl('', Validators.maxLength(500))
  });
  //#endregion

  //#region Lifecycle Hooks
  constructor(private tradeHistoryService: TradeHistoryService, private companyService: CompanyService,
    private toastService: ToastService, private authService: AuthService) { }
  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.authService.getCurrentUserInfor().subscribe((currentUser) => {
      if (currentUser && currentUser.userId) {
        this.userId = currentUser.userId;
        this.createForm.patchValue({ userId: currentUser.userId, tradeDate: today });
        this.getData();
      }
    });
    this.companyService.getOptionList().subscribe((res) => {
      this.companiesOptionList = res.data;
    });
  }
  // onChangeSourceId(event: any, formType: string) {
  //   if (formType === 'create') {
  //     this.createForm.patchValue({
  //       sourceId: event
  //     });
  //   }
  //   else if (formType === 'update') {
  //     this.updateForm.patchValue({
  //       sourceId: event
  //     });
  //   }
  // }

  getData() {
    this.tradeHistoryService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize, this.userId).subscribe((res) => {
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
  //#endregion

  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.tradeHistoryService.create(this.createForm.value).subscribe({
        next: (res) => {
          this.toggleLiveCreateModel();
          this.getData();
          // this.initAmountCreateForm.set(-1);
          this.toastService.showToast(EColors.success, res.message);
          this.createForm.patchValue({ amount: 0, note: '' });
        },
        error: (failure) => {
          this.toastService.showToast(EColors.danger, failure.error.message);
        }
      });
    }

  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
    // this.initAmountCreateForm.set(0);
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }

  get companyIdCreateForm() { return this.createForm.get('companyId'); }
  get tradeDateCreateForm() { return this.createForm.get('tradeDate'); }
  get quantityCreateForm() { return this.createForm.get('quantity'); }
  get isSellCreateForm() { return this.createForm.get('isSell'); }
  get priceCreateForm() { return this.createForm.get('price'); }
  get totalAmountCreateForm() { return this.createForm.get('totalAmount'); }
  get feesCreateForm() { return this.createForm.get('fees'); }
  get profitLossCreateForm() { return this.createForm.get('profitLoss'); }
  get profitLossPercentCreateForm() { return this.createForm.get('profitLossPercent'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.tradeHistoryService.getById(id).subscribe((res) => {
      const data = res.data;
      this.updateForm.patchValue(data);
      // this.updateForm.patchValue({ date: data.date.toString().split('T')[0] });
      // this.initAmountUpdateForm.set(data.amount);
      // this.initSourceIdUpdateForm.set(data.sourceId);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.tradeHistoryService.update(this.updateForm.value).subscribe((res) => {
        this.toggleLiveUpdateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  toggleLiveUpdateModel() {
    this.visibleUpdateModal = !this.visibleUpdateModal;
  }

  handleLiveUpdateModelChange(event: any) {
    this.visibleUpdateModal = event;
  }

  // get sourceIdUpdateForm() { return this.updateForm.get('sourceId'); }
  // get amountUpdateForm() { return this.updateForm.get('amount'); }
  // get dateUpdateForm() { return this.updateForm.get('date'); }
  // get noteUpdateForm() { return this.updateForm.get('note'); }

  //#endregion

  //#region Delete
  deleteData(id: any) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.tradeHistoryService.delete(this.deleteById).subscribe((res) => {
      this.toggleLiveDelete();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
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
