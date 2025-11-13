import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { PageInformation, Pagination } from '@models/pagination.model';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { cilPlus, cilTrash, cilPen, cilSave, cilX, cilExitToApp, cilLoopCircular, cilSearch, cilQrCode, cilFile } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, TemplateIdDirective, AlignDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective } from '@coreui/angular';
import { baseUrl, EColors } from '@common/global';
import { ToastService } from '@services/helper-services/toast.service';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { StoreService } from '@services/survey-services/store.service';
import { OptionModel } from '@models/option.model';


@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, DataTableComponent, RouterLink, IconDirective, AccordionButtonDirective, AccordionComponent,
    ButtonDirective, AccordionItemComponent, ModalComponent, ModalBodyComponent, TemplateIdDirective, ModalFooterComponent,
    ModalHeaderComponent, NzQRCodeModule, FormSelectDirective],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  //#region Variables
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  visibleQrCodeModal: boolean = false;
  deleteById: number = 0;
  storeList: OptionModel[] = [];
  trashData: Pagination<SurveyFormModel> = new Pagination<SurveyFormModel>();
  data: Pagination<SurveyFormModel> = new Pagination<SurveyFormModel>();
  trashPageInformation: PageInformation = new PageInformation();
  pageInformation: PageInformation = new PageInformation();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilX, cilExitToApp, cilLoopCircular, cilSearch, cilQrCode, cilFile };
  baseUrl: string = baseUrl;
  qrCodeUrl: string = '';
  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(-1),
    pageSize: new FormControl(-1),
    storeId: new FormControl(-1),
    formStyleId: new FormControl(-1),
    isActive: new FormControl(null),
    isPublished: new FormControl(null),
    isLimited: new FormControl(null),
    searchText: new FormControl(null)
  });
  //#endregion
  //#region Constructor and hooks
  constructor(private surveyFormService: SurveyFormService, private toastService: ToastService, private storeService: StoreService) { }
  ngOnInit() {
    this.getData();
    this.storeService.getOptionList().subscribe({
      next: (res) => {
        if (res.success) {
          this.storeList = res.data;
        }
      }
    });
  }
  getData() {
    this.surveyFormService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((response) => {
      this.data = response.data;
      this.pageInformation.totalItems = response.data.totalItems;
      this.pageInformation.totalPages = response.data.totalPages;
      this.pageInformation.currentPage = response.data.currentPage;
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
  //#region Trash
  getTrashData() {
    this.surveyFormService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
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
    this.surveyFormService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteDataTrash(id: number) {
    this.surveyFormService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }

  //#endregion
  //#region Filter
  filter() {
    this.filterForm.patchValue({ pageIndex: this.pageInformation.pageIndex, pageSize: this.pageInformation.pageSize });
    this.getData();
  }
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.surveyFormService.softDelete(this.deleteById).subscribe((res) => {
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
  //#region QR Code Modal
  toggleLiveQrCodeModal(id: number | null = null) {
    if (id !== null) {
      this.qrCodeUrl = baseUrl + `public-form/${id}`;
    } else {
      this.qrCodeUrl = '';
    }
    this.visibleQrCodeModal = !this.visibleQrCodeModal;
  }
  handleLiveQrCodeModalChange(event: any) {
    this.visibleQrCodeModal = event;
  }
  //#endregion
}
