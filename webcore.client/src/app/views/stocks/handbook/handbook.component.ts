import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent, FormSelectDirective, AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { HandbookModel } from '@models/stock-models/handbook.model';
import { HandbookService } from '@services/stock-services';
import { TextEditorComponent } from "@components/text-editor/text-editor.component";

@Component({
  selector: 'app-handbook',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, ModalComponent, ButtonDirective, FormDirective,
    ReactiveFormsModule, ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent,
    DataTableComponent, IconDirective, TextEditorComponent],
  templateUrl: './handbook.component.html',
  styleUrl: './handbook.component.scss',
})
export class HandbookComponent implements OnInit {

  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  data: Pagination<HandbookModel> = new Pagination<HandbookModel>();
  trashData: Pagination<HandbookModel> = new Pagination<HandbookModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular };
  fetchNewDataAllowed: boolean = true;
  initHTML: string = '';
  createForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required)
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required)
  });

    constructor(private handbookService: HandbookService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getData();
  }


  onChangeIndustry($event: Event) {
    console.log($event);
    if ($event) {
      this.getData($event);
    }
  }
  getData(industryId: any = -1) {
    this.handbookService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
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


  //#region Create
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.handbookService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
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
  get titleCreateForm() { return this.createForm.get('title'); }
  get contentCreateForm() { return this.createForm.get('content'); }
  //#endregion

  //#region Update
  updateData(id: number) {
    this.handbookService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.initHTML = res.data.content;
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.handbookService.update(this.updateForm.value).subscribe((res) => {
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
  get titleUpdateForm() { return this.updateForm.get('title'); }
  get contentUpdateForm() { return this.updateForm.get('content'); }
  //#endregion

  //#region Delete
  // Remove duplicate deleteData, rename old deleteData to softDeleteData for soft delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.handbookService.softDelete(this.deleteById).subscribe((res) => {
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
  // getTrashData() {
  //   this.handbookService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
  //     this.trashData = res.data;
  //     this.trashPageInformation.currentPage = this.trashData.currentPage;
  //     this.trashPageInformation.totalItems = this.trashData.totalItems;
  //     this.trashPageInformation.totalPages = this.trashData.totalPages;
  //   });
  // }
  // onTrashPageIndexChange(index: any) {
  //   this.trashPageInformation.pageIndex = index;
  //   this.getTrashData();
  // }
  // onTrashPageSizeChange(size: any) {
  //   this.trashPageInformation.pageSize = size;
  //   this.trashPageInformation.pageIndex = 1;
  //   this.getTrashData();
  // }
  // toggleLiveTrashModal() {
  //   this.getTrashData();
  //   this.visibleTrashModal = !this.visibleTrashModal;
  // }
  // handleLiveTrashModalChange(event: any) {
  //   this.visibleTrashModal = event;
  // }
  // restoreData(id: number) {
  //   this.handbookService.restore(id).subscribe((res) => {
  //     this.getTrashData();
  //     this.getData();
  //     this.toastService.showToast(EColors.success, res.message);
  //   });
  // }
  // deleteData(id: number) {
  //   this.handbookService.delete(id).subscribe((res) => {
  //     this.getTrashData();
  //     this.toastService.showToast(EColors.success, res.message);
  //   });
  // }
  //#endregion
}