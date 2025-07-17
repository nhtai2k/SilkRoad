import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent, FormSelectDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { DataTableComponent } from '@components/data-table/data-table.component';
import { CompanyModel } from '@models/stock-models/company.model';
import { CompanyService } from '@services/stock-services/company.service';
import { IndustryService } from '@services/stock-services/industry.service';
import { IndustryModel } from '@models/stock-models/industry.model';
import { StockPriceService } from '@services/stock-services/stock-price.service';

@Component({
  selector: 'app-company',
  imports: [ModalBodyComponent, NgFor, NgIf, FormControlDirective, FormLabelDirective,
    FormSelectDirective, DatePipe,
    ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule,FormCheckComponent,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent  implements OnInit  {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  industryList: IndustryModel[] = [];
  data: Pagination<CompanyModel> = new Pagination<CompanyModel>();
  trashData: Pagination<CompanyModel> = new Pagination<CompanyModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular };
  fetchNewDataAllowed: boolean = true;
  createForm: FormGroup = new FormGroup({
    industryId: new FormControl(-1, Validators.required),
    name: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    ipoDate: new FormControl(new Date()),
    isActive: new FormControl(true),
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    industryId: new FormControl(-1, Validators.required),
    name: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    ipoDate: new FormControl(new Date()),
    isActive: new FormControl(false),
    isDeleted: new FormControl(false),
    createdBy: new FormControl(''),
    modifiedBy: new FormControl(''),
    createdOn: new FormControl(null),
    modifiedOn: new FormControl(null),
  });

  constructor(private companyService: CompanyService,
    private stockPriceService: StockPriceService,
    private industryService: IndustryService,
     private toastService: ToastService) {}

  ngOnInit(): void {
    this.getData();
    this.getIndustryList();
  }

  getIndustryList() {
    this.industryService.getAllActive(1, 100).subscribe((res) => {
      this.industryList = res.data.items;
    }, (failure) => {
      console.error(failure);
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  getData() {
    this.companyService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
      console.log(this.data);
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
  fetchNewData(symbol: string) {
    this.fetchNewDataAllowed = false;
    this.stockPriceService.getNewData(symbol).subscribe((res) => {
      this.toastService.showToast(EColors.success, res.message);
      this.fetchNewDataAllowed = true;
    }, (failure) => {
        this.fetchNewDataAllowed = true;
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
  } 

  //#region Create
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.companyService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({
          isActive: true})
      }, (failure) => {
        console.error(failure);
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }
  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }
  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  get nameCreateForm() { return this.createForm.get('name'); }
  get symbolCreateForm() { return this.createForm.get('symbol'); }
  //#endregion

  //#region Update
  updateData(id: number) {
    this.companyService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      console.log(this.updateForm.value);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.companyService.update(this.updateForm.value).subscribe((res) => {
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
  get nameUpdateForm() { return this.updateForm.get('name'); }
  get symbolUpdateForm() { return this.updateForm.get('symbol'); }
  //#endregion

  //#region Delete
  // Remove duplicate deleteData, rename old deleteData to softDeleteData for soft delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.companyService.softDelete(this.deleteById).subscribe((res) => {
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

  //#region Trash
  getTrashData() {
    this.companyService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
      this.trashData = res.data;
      this.trashPageInformation.currentPage = this.trashData.currentPage;
      this.trashPageInformation.totalItems = this.trashData.totalItems;
      this.trashPageInformation.totalPages = this.trashData.totalPages;
    });
  }
  onTrashPageIndexChange(index: any) {
    this.trashPageInformation.pageIndex = index;
    this.getTrashData();
  }
  onTrashPageSizeChange(size: any) {
    this.trashPageInformation.pageSize = size;
    this.trashPageInformation.pageIndex = 1;
    this.getTrashData();
  }
  toggleLiveTrashModal() {
    this.getTrashData();
    this.visibleTrashModal = !this.visibleTrashModal;
  }
  handleLiveTrashModalChange(event: any) {
    this.visibleTrashModal = event;
  }
  restoreData(id: number) {
    this.companyService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteData(id: number) {
    this.companyService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  //#endregion
}
