
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, TemplateIdDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX, cilSearch } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { ExpenseService } from '@services/personal-finance-services/expense.service';
import { ExpenseModel } from '@models/personal-finance-models';
import { CategoryService } from '@services/personal-finance-services';
import { OptionModel } from '@models/option.model';
import { TreeSelectV1Component } from "@components/selects/tree-select-v1/tree-select-v1.component";
import { InputCurrencyComponent } from "@components/inputs/input-currency/input-currency.component";
import { AuthService } from '@services/system-services';
import { CommonModule } from '@angular/common';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, IconDirective, AccordionButtonDirective, AccordionComponent,
    AccordionItemComponent, ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, ModalFooterComponent, CommonModule,
    ModalHeaderComponent, DataTableComponent, TemplateIdDirective, RangeDatetimePickerComponent, TreeSelectV1Component, InputCurrencyComponent, SelectSearchComponent]
})
export class ExpensesComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  data: Pagination<ExpenseModel> = new Pagination<ExpenseModel>();
  categoryTreeOptions: OptionModel[] = [];
  paymentMethodTreeOptions: OptionModel[] = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Credit Card' },
    { id: 3, name: 'Debit Card' },
    { id: 4, name: 'Bank Transfer' }
  ];
  initAmountCreateForm = signal<number>(0);
  initSelectedCategoryUpdateForm = signal<any>(null);
  initExpenseUpdateForm = signal<ExpenseModel | null>(null);
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX, cilSearch };

  createForm: FormGroup = new FormGroup({
    userId: new FormControl(-1),
    paymentMethodId: new FormControl(1, Validators.required),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl(''),
    hasRefund: new FormControl(false),
    refundAmount: new FormControl(null),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500))
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    paymentMethodId: new FormControl(-1, Validators.required),
    userId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl(''),
    hasRefund: new FormControl(false),
    refundAmount: new FormControl(null),
    amount: new FormControl('', Validators.required),
    date: new FormControl(null, Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    createdAt: new FormControl(''),
    updatedAt: new FormControl('')
  });

  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(-1),
    pageSize: new FormControl(-1),
    userId: new FormControl(-1),
    fromDate: new FormControl(null),
    toDate: new FormControl(null),
    categoryId: new FormControl(null),
    subCategoryId: new FormControl(null),
    paymentMethodId: new FormControl(null),
    searchText: new FormControl(null)
  });
  //#endregion
  //#region Lifecycle Hooks
  constructor(private expenseService: ExpenseService, private categoryService: CategoryService, private authService: AuthService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.categoryService.getTreeOptionList().subscribe((res) => {
      this.categoryTreeOptions = res.data;
    });
    // Set default date to today for create form
    const today = new Date().toISOString().split('T')[0];
    // Set userId in create and filter forms
    this.authService.getCurrentUserInfor().subscribe((currentUser) => {
      if (currentUser && currentUser.userId){
        this.createForm.patchValue({ date: today, userId: currentUser.userId });
        this.filterForm.patchValue({ userId: currentUser.userId });
        this.getData();
      }
    });
  }
  filter() {
    this.getData();
  }

  onChangeCategoryId(event: any, formType: string) {
    if (formType === 'filter') {
        this.filterForm.patchValue({ 
          categoryId: event[0]
         , subCategoryId: event.length > 1 ? event[1] : null });
    }
    else if (formType === 'create') {
        this.createForm.patchValue({ 
          categoryId: event[0]
         , subCategoryId: event.length > 1 ? event[1] : null });
    }
    else if (formType === 'update') {
        this.updateForm.patchValue({ 
          categoryId: event[0]
         , subCategoryId: event.length > 1 ? event[1] : null });
    }
  }
   onChangePaymentMethodId(event: any, formType: string) {
    if (formType === 'filter') {
        this.filterForm.patchValue({ 
          paymentMethodId: event});
    }
    else if (formType === 'create') {
        this.createForm.patchValue({ 
          paymentMethodId: event});
    }
    else if (formType === 'update') {
        this.updateForm.patchValue({ 
          paymentMethodId: event});
    }
  }
  getPaymentMethodNameById(id: number): string {
    const method = this.paymentMethodTreeOptions.find(method => method.id === id);
    return method ? method.name : '###';
  }

  getData() {
    this.filterForm.patchValue({ pageIndex: this.pageInformation.pageIndex, pageSize: this.pageInformation.pageSize });
    // console.log(this.filterForm.value);
    this.expenseService.getByFilter(this.filterForm.value).subscribe((res) => {
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

  getCategoryNameById(id: number): string {
    const category = this.categoryTreeOptions.find(cat => cat.id === id);
    return category ? category.name : '###';
  }
  getSubCategoryNameById(categoryId: number, subCategoryId: number | undefined): string {
    const category = this.categoryTreeOptions.find(cat => cat.id === categoryId);
    if (category && category.children) {
      const subCategory = category.children.find(subCat => subCat.id === subCategoryId);
      return subCategory ? subCategory.name : '###';
    }
    return '###';
  }
  //#endregion
  
  //#region Create Form
  onSubmitCreateForm() {
    // console.log(this.createForm.value);
    if (this.createForm.valid) {
      this.expenseService.create(this.createForm.value).subscribe({
        next: (res) => {
          this.toggleLiveCreateModel();
          this.getData();
          this.initAmountCreateForm.set(-1);
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
    this.initAmountCreateForm.set(0);
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }

  get categoryIdCreateForm() { return this.createForm.get('categoryId'); }
  get subCategoryIdCreateForm() { return this.createForm.get('subCategoryId'); }
  get amountCreateForm() { return this.createForm.get('amount'); }
  get dateCreateForm() { return this.createForm.get('date'); }
  get noteCreateForm() { return this.createForm.get('note'); }

  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.expenseService.getById(id).subscribe((res) => {
      const data = res.data;
      if(data.subCategoryId){
        let temp = data.categoryId + '_' + data.subCategoryId;
        this.initSelectedCategoryUpdateForm.set(temp);
      }else{
        this.initSelectedCategoryUpdateForm.set(data.categoryId);
      }
      this.initExpenseUpdateForm.set(data);
      this.updateForm.patchValue(data);
      this.updateForm.patchValue({ date: data.date.toString().split('T')[0] });
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.expenseService.update(this.updateForm.value).subscribe((res) => {
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

  get categoryIdUpdateForm() { return this.updateForm.get('categoryId'); }
  get subCategoryIdUpdateForm() { return this.updateForm.get('subCategoryId'); }
  get amountUpdateForm() { return this.updateForm.get('amount'); }
  get dateUpdateForm() { return this.updateForm.get('date'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  //#endregion

  //#region Delete
  deleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.expenseService.delete(this.deleteById).subscribe((res) => {
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
