import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, TemplateIdDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX, cilSearch } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { ExpenseModel, ResourceModel } from '@models/personal-finance-models';
import { OptionModel } from '@models/option.model';
import { TreeSelectV1Component } from "@components/selects/tree-select-v1/tree-select-v1.component";
import { InputCurrencyComponent } from "@components/inputs/input-currency/input-currency.component";
import { CommonModule } from '@angular/common';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { ResourceService } from '@services/personal-finance-services/resource.service';
import { AuthService } from '@services/system-services';
import { EyeClosedIconComponent, EyeIconComponent } from "@components/icons";


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, IconDirective, ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, ModalFooterComponent, CommonModule,
    ModalHeaderComponent, DataTableComponent, InputCurrencyComponent, SelectSearchComponent, EyeClosedIconComponent, EyeIconComponent]
})
export class ResourcesComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  data: Pagination<ResourceModel> = new Pagination<ResourceModel>();
  initAmountCreateForm = signal<number>(0);
  initAmountUpdateForm = signal<number>(0);
  initSourceIdUpdateForm = signal<number>(1);
  categoryTreeOptions: OptionModel[] = [];
  userId: number = -1;
  showNumber: boolean = false;
  sourceOptions: OptionModel[] = [
    { id: 1, name: 'Salary' },
    { id: 2, name: 'Freelance' },
    { id: 3, name: 'Investment' },
    {id: 4, name: 'Refund' },
    { id: 5, name: 'Others' }
  ];
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX, cilSearch };

  createForm: FormGroup = new FormGroup({
    userId: new FormControl(-1),
    sourceId: new FormControl(1, Validators.required),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500))
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    userId: new FormControl(-1),
    sourceId: new FormControl(1, Validators.required),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    createdAt: new FormControl(''),
    updatedAt: new FormControl('')
  });
  //#endregion

  //#region Lifecycle Hooks
  constructor(private resourceService: ResourceService, private toastService: ToastService, private authService: AuthService) { }
  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.authService.getCurrentUserInfor().subscribe((currentUser) => {
      if (currentUser && currentUser.userId) {
        this.userId = currentUser.userId;
        this.createForm.patchValue({ userId: currentUser.userId, date: today });
        this.getData();
      }
    });
  }
  onChangeSourceId(event: any, formType: string) {
    if (formType === 'create') {
      this.createForm.patchValue({
        sourceId: event
      });
    }
    else if (formType === 'update') {
      this.updateForm.patchValue({
        sourceId: event
      });
    }
  }
  getSourceNameById(id: number): string {
      const source = this.sourceOptions.find(option => option.id === id);
      return source ? source.name : 'Unknown';
    }
  getData() {
    this.resourceService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize, this.userId).subscribe((res) => {
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
      this.resourceService.create(this.createForm.value).subscribe({
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

  get sourceIdCreateForm() { return this.createForm.get('sourceId'); }
  get amountCreateForm() { return this.createForm.get('amount'); }
  get dateCreateForm() { return this.createForm.get('date'); }
  get noteCreateForm() { return this.createForm.get('note'); }

  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.resourceService.getById(id).subscribe((res) => {
      const data = res.data;
      this.updateForm.patchValue(data);
      this.updateForm.patchValue({ date: data.date.toString().split('T')[0] });
      this.initAmountUpdateForm.set(data.amount);
      this.initSourceIdUpdateForm.set(data.typeId);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.resourceService.update(this.updateForm.value).subscribe((res) => {
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

  get sourceIdUpdateForm() { return this.updateForm.get('sourceId'); }
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
    this.resourceService.delete(this.deleteById).subscribe((res) => {
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
