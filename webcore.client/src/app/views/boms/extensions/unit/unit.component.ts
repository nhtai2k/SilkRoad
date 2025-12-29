// import { NgFor, NgIf } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, FormControlDirective, FormLabelDirective, FormDirective, FormCheckComponent } from '@coreui/angular';
// import { cilPlus, cilTrash, cilPen, cilLoopCircular } from '@coreui/icons';
// import { IconDirective } from '@coreui/icons-angular';
// import { PageInformation, Pagination } from '@models/pagination.model';
// import { ToastService } from '@services/helper-services/toast.service';
// import { UnitService } from '@services/bom-services/unit.service';
// import { UnitModel } from '@models/bom-models/unit.model';
// import { EColors } from '@common/global';
// import { DataTableComponent } from '@components/data-table/data-table.component';

// @Component({
//   selector: 'app-unit',
//   imports: [ModalBodyComponent, NgFor, NgIf, FormControlDirective, FormLabelDirective,
//     ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule,FormCheckComponent,
//     ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective],
//   templateUrl: './unit.component.html',
//   styleUrl: './unit.component.scss'
// })
// export class UnitComponent implements OnInit {
//   pageInformation: PageInformation = new PageInformation();
//   trashPageInformation: PageInformation = new PageInformation();
//   visibleCreateModal: boolean = false;
//   visibleUpdateModal: boolean = false;
//   visibleDelete: boolean = false;
//   visibleTrashModal: boolean = false;
//   deleteById: number = 0;
//   data: Pagination<UnitModel> = new Pagination<UnitModel>();
//   trashData: Pagination<UnitModel> = new Pagination<UnitModel>();
//   icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular };

//   createForm: FormGroup = new FormGroup({
//     name: new FormControl('', Validators.required),
//     isActive: new FormControl(true),
//     note: new FormControl(''),
//   });
//   updateForm: FormGroup = new FormGroup({
//     id: new FormControl(0, Validators.required),
//     name: new FormControl('', Validators.required),
//     isActive: new FormControl(true),
//     note: new FormControl(''),
//   });

//   constructor(private unitService: UnitService, private toastService: ToastService) {}

//   ngOnInit(): void {
//     this.getData();
//   }

//   getData() {
//     this.unitService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
//       this.data = res.data;
//       this.pageInformation.currentPage = this.data.currentPage;
//       this.pageInformation.totalItems = this.data.totalItems;
//       this.pageInformation.totalPages = this.data.totalPages;
//       console.log(this.data);
//     });
//   }

//   onPageIndexChange(index: any) {
//     this.pageInformation.pageIndex = index;
//     this.getData();
//   }
//   onPageSizeChange(size: any) {
//     this.pageInformation.pageSize = size;
//     this.pageInformation.pageIndex = 1;
//     this.getData();
//   }

//   //#region Create
//   onSubmitCreateForm() {
//     if (this.createForm.valid) {
//       this.unitService.create(this.createForm.value).subscribe((res) => {
//         this.toggleLiveCreateModel();
//         this.getData();
//         this.toastService.showToast(EColors.success, res.message);
//         this.createForm.reset();
//         this.createForm.patchValue({
//           name: '',
//           isActive: true})
//       }, (failure) => {
//         console.error(failure);
//         this.toastService.showToast(EColors.danger, failure.error.message);
//       });
//     }
//   }
//   toggleLiveCreateModel() {
//     this.visibleCreateModal = !this.visibleCreateModal;
//   }
//   handleLiveCreateModelChange(event: any) {
//     this.visibleCreateModal = event;
//   }
//   get nameCreateForm() { return this.createForm.get('name'); }
//   //#endregion

//   //#region Update
//   updateData(id: number) {
//     this.unitService.getById(id).subscribe((res) => {
//       this.updateForm.patchValue(res.data);
//       this.toggleLiveUpdateModel();
//     });
//   }
//   onSubmitUpdateForm() {
//     if (this.updateForm.valid) {
//       this.unitService.update(this.updateForm.value).subscribe((res) => {
//         this.toggleLiveUpdateModel();
//         this.getData();
//         this.toastService.showToast(EColors.success, res.message);
//       }, (failure) => {
//         this.toastService.showToast(EColors.danger, failure.error.message);
//       });
//     }
//   }
//   toggleLiveUpdateModel() {
//     this.visibleUpdateModal = !this.visibleUpdateModal;
//   }
//   handleLiveUpdateModelChange(event: any) {
//     this.visibleUpdateModal = event;
//   }
//   get nameUpdateForm() { return this.updateForm.get('name'); }
//   //#endregion

//   //#region Delete
//   // Remove duplicate deleteData, rename old deleteData to softDeleteData for soft delete
//   softDeleteData(id: number) {
//     this.deleteById = id;
//     this.toggleLiveDelete();
//   }
//   onConfirmDelete() {
//     this.unitService.softDelete(this.deleteById).subscribe((res) => {
//       this.toggleLiveDelete();
//       this.getData();
//       this.toastService.showToast(EColors.success, res.message);
//     }, (failure) => {
//       this.toastService.showToast(EColors.danger, failure.error.message);
//     });
//   }
//   toggleLiveDelete() {
//     this.visibleDelete = !this.visibleDelete;
//   }

//   handleLiveDeleteChange(event: any) {
//     this.visibleDelete = event;
//   }
//   //#endregion

//   //#region Trash
//   getTrashData() {
//     this.unitService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
//       this.trashData = res.data;
//       this.trashPageInformation.currentPage = this.trashData.currentPage;
//       this.trashPageInformation.totalItems = this.trashData.totalItems;
//       this.trashPageInformation.totalPages = this.trashData.totalPages;
//     });
//   }
//   onTrashPageIndexChange(index: any) {
//     this.trashPageInformation.pageIndex = index;
//     this.getTrashData();
//   }
//   onTrashPageSizeChange(size: any) {
//     this.trashPageInformation.pageSize = size;
//     this.trashPageInformation.pageIndex = 1;
//     this.getTrashData();
//   }
//   toggleLiveTrashModal() {
//     this.getTrashData();
//     this.visibleTrashModal = !this.visibleTrashModal;
//   }
//   handleLiveTrashModalChange(event: any) {
//     this.visibleTrashModal = event;
//   }
//   restoreData(id: number) {
//     this.unitService.restore(id).subscribe((res) => {
//       this.getTrashData();
//       this.getData();
//       this.toastService.showToast(EColors.success, res.message);
//     });
//   }
//   deleteData(id: number) {
//     this.unitService.delete(id).subscribe((res) => {
//       this.getTrashData();
//       this.toastService.showToast(EColors.success, res.message);
//     });
//   }
//   //#endregion
// }
