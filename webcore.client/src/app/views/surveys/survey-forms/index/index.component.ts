import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Params, RouterLink } from '@angular/router';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { PageInformation, Pagination } from '@models/pagination.model';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { cilPlus, cilTrash, cilPen, cilSave } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, TemplateIdDirective } from '@coreui/angular';
import { EColors } from '@common/global';
import { ToastService } from '@services/helper-services/toast.service';

@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, DataTableComponent, RouterLink, IconDirective,
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent, ModalComponent, ModalBodyComponent,
    TemplateIdDirective, ModalFooterComponent, ModalHeaderComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  //#region Variables
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  trashData: Pagination<SurveyFormModel> = new Pagination<SurveyFormModel>();

  data: Pagination<SurveyFormModel> = new Pagination<SurveyFormModel>();
  trashPageInformation: PageInformation = new PageInformation();
  pageInformation: PageInformation = new PageInformation();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave };
  filterForm: FormGroup = new FormGroup({
    questionGroupId: new FormControl(-1),
    questionTypeId: new FormControl(-1),
    searchText: new FormControl('')
  });
  //#endregion
  //#region Constructor and hooks
  constructor(private surveyFormService: SurveyFormService, private toastService: ToastService) { }
  ngOnInit() {
    this.getData();
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
  onConfirmDelete() {
    this.surveyFormService.softDelete(this.deleteById).subscribe((res) => {
      this.toggleLiveDelete();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  //#endregion

  filter() {
    this.pageInformation.pageIndex = 1;
    this.getData();
  }

  toggleLiveDelete() {
    this.visibleDelete = !this.visibleDelete;
  }

  handleLiveDeleteChange(event: any) {
    this.visibleDelete = event;
  }
}
