import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableDirective } from '@coreui/angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors, timeUnitList } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { RankService } from '@services/bom-services/rank.service';
import { RankModel } from '@models/bom-models/rank.model';
import { IconDirective } from '@coreui/icons-angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular } from '@coreui/icons';
import { InputSeparatorComponent } from "../../../../core/components/inputs/input-separator/input-separator.component";
import { OptionModel } from '@models/option.model';

@Component({
  selector: 'app-rank',
  imports: [ModalBodyComponent, NgFor, NgIf, FormControlDirective, FormLabelDirective, IconDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, InputSeparatorComponent],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.scss'
})
export class RankComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleTrashModal: boolean = false;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  timeUnitList: OptionModel[] = timeUnitList;
  data: Pagination<RankModel> = new Pagination<RankModel>();
  trashData: Pagination<RankModel> = new Pagination<RankModel>();
  currentSalary: number = 0;
  icons : any = {cilPlus, cilTrash, cilPen, cilSave, cilExitToApp,cilLoopCircular };
  createForm: FormGroup = new FormGroup({
    timeUnitId: new FormControl(6, Validators.required),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    salary: new FormControl(0, [Validators.required, Validators.min(0)]),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required)
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    timeUnitId: new FormControl(6, Validators.required),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    salary: new FormControl(0, [Validators.required, Validators.min(0)]),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required)
  });

  constructor(private rankService: RankService,
    private toastService: ToastService) {}
  ngOnInit(): void {
    this.getData();
    this.trashPageInformation.pageSize = 5;

  }

  getData() {
    this.rankService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
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
  onChangeSalary(event: any, type: string) {
    if (type === 'create') {
      this.createForm.patchValue({ salary: event });
    } else if (type === 'update') {
      this.updateForm.patchValue({ salary: event });
    }
  }
//#region  Trash
 getTrashData() {
  this.rankService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
      this.trashData = res.data;
      this.trashPageInformation.currentPage = this.trashData.currentPage;
      this.trashPageInformation.totalItems = this.trashData.totalItems;
      this.trashPageInformation.totalPages = this.trashData.totalPages;
      this.pageInformation.pageIndex = this.data.pageIndex;
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
    this.rankService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success,res.message);
    });
  }
  deleteData(id: number) {
    this.rankService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success,res.message);
    });
  }


//#endregion
  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.rankService.create(this.createForm.value).subscribe((res) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({ priority: 1, isActive: true });
      }, (failure) => {
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
  get codeCreateForm() { return this.createForm.get('code'); }
  get noteCreateForm() { return this.createForm.get('note'); }

  //#endregion
  //#region Update Form
  updateData(id: number) {
    this.rankService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.rankService.update(this.updateForm.value).subscribe((res) => {
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
  get codeUpdateForm() { return this.updateForm.get('code'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }

  //#endregion
  //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  deleteDataConfirm() {
    this.rankService.softDelete(this.deleteById).subscribe(() => {
      this.toggleLiveDelete();
      this.getData();
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
