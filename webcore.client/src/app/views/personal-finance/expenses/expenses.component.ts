
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
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { ExpenseService } from '@services/personal-finance-services/expense.service';
import { CategoryModel, ExpenseModel } from '@models/personal-finance-models';
import { CategoryService } from '@services/personal-finance-services';
import { OptionModel } from '@models/option.model';
import { TreeSelectComponent } from "@components/selects/tree-select/tree-select.component";
import { TreeSelectV1Component } from "@components/selects/tree-select-v1/tree-select-v1.component";
import { InputCurrencyComponent } from "@components/inputs/input-currency/input-currency.component";
import { AuthService } from '@services/system-services';
import { cos } from '@amcharts/amcharts5/.internal/core/util/Math';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, IconDirective, AccordionButtonDirective, AccordionComponent,
    AccordionItemComponent, ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, ModalFooterComponent,
    ModalHeaderComponent, DataTableComponent, TemplateIdDirective, RangeDatetimePickerComponent, TreeSelectV1Component, InputCurrencyComponent]
})
export class ExpensesComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  data: Pagination<ExpenseModel> = new Pagination<ExpenseModel>();
  // categoryOptions: OptionModel[] = [];
  categoryTreeOptions: OptionModel[] = [];
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX, cilSearch };

  createForm: FormGroup = new FormGroup({
    userId: new FormControl(-1),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl(''),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500))
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    userId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl(''),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
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
    searchText: new FormControl(null)
  });
  //#endregion

  constructor(private expenseService: ExpenseService, private categoryService: CategoryService, private authService: AuthService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getData();
    this.categoryService.getTreeOptionList().subscribe((res) => {
      this.categoryTreeOptions = res.data;
    });
    // Set default date to today for create form
    const today = new Date().toISOString().split('T')[0];
    // Set userId in create and filter forms
    const currentUserId = this.authService.getUserId();
    this.createForm.patchValue({ date: today, userId: currentUserId });
    this.filterForm.patchValue({ userId: currentUserId });
  }
  filter() {
    this.filterForm.patchValue({ pageIndex: this.pageInformation.pageIndex, pageSize: this.pageInformation.pageSize });
    this.getData();
  }

  onChangeSelectOption(event: any, formType: string) {
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
  //#region Main Table
  getData() {
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
  //#endregion


  //#region Create Form
  onSubmitCreateForm() {
    console.log(this.createForm.value);
    // if (this.createForm.valid) {
    //   this.expenseService.create(this.createForm.value).subscribe({
    //     next: (res) => {
    //       this.toggleLiveCreateModel();
    //       this.getData();
    //       this.toastService.showToast(EColors.success, res.message);
    //       this.createForm.reset();
    //       this.createForm.patchValue({ isActive: true, priority: 1 });
    //     },
    //     error: (failure) => {
    //       this.toastService.showToast(EColors.danger, failure.error.message);
    //     }
    //   });
    // }

  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
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
      this.updateForm.patchValue(res.data);
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
