import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardComponent, CollapseDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableColorDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilCloudUpload, cilLoopCircular, cilBook } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { MallService } from '@services/bom-services/mall.service';
import { MallModel } from '@models/bom-models/mall.model';
import { LocationComponent } from "./location/location.component";
import { LocationService } from '@services/bom-services/location.service';
import { AreaService } from '@services/bom-services/area.service';
import { LocationModel } from '@models/bom-models/location.model';
import { AreaModel } from '@models/bom-models/area.model';

@Component({
  selector: 'app-mall',
  imports: [ModalBodyComponent, NgFor, NgIf, FormControlDirective, FormLabelDirective, IconDirective,
    ModalComponent, ButtonDirective, FormCheckComponent, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, LocationComponent,
    CollapseDirective, CardComponent],
  templateUrl: './mall.component.html',
  styleUrl: './mall.component.scss'
})
export class MallComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  trashLocationPageInformation: PageInformation = new PageInformation();
  trashAreaPageInformation: PageInformation = new PageInformation();
  data: Pagination<MallModel> = new Pagination<MallModel>();
  trashData: Pagination<MallModel> = new Pagination<MallModel>();
  trashLocationData: Pagination<LocationModel> = new Pagination<LocationModel>();
  trashAreaData: Pagination<AreaModel> = new Pagination<AreaModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilBook, cilCloudUpload };
  visibleSubItemId: number = 0;
  visibleSubItems = signal<{ [id: number]: boolean }>({});
  baseUrl: string = baseUrl;

  //visible mall modals
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  reviewCreateUploadImage: string = '';
  reviewUpdateUploadImage: string = '';
  //visible location modals
  visibleCreateLocationModal: boolean = false;
  visibleUpdateLocationModal: boolean = false;
  visibleDeleteLocation: boolean = false;
  reviewCreateLocationUploadImage: string = '';
  reviewUpdateLocationUploadImage: string = '';
  //visible area modals
  visibleCreateAreaModal: boolean = false;
  visibleUpdateAreaModal: boolean = false;
  visibleDeleteArea: boolean = false;
  reviewCreateAreaUploadImage: string = '';
  reviewUpdateAreaUploadImage: string = '';
  //delete mall id
  deleteById: number = 0;
  //delete location id
  deleteLocationById: number = 0;
  //delete area id
  deleteAreaById: number = 0;
  //create a new mall
  createForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)

  });
  //update a mall
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)

  });
  //create a new location
  createLocationForm: FormGroup = new FormGroup({
    mallId: new FormControl(0),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)

  });
  //update a location
  updateLocationForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    mallId: new FormControl(0),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    imageFile: new FormControl(null)

  });
  //create a new area
  createAreaForm: FormGroup = new FormGroup({
    locationId: new FormControl(0),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    areaSize: new FormControl(0, Validators.required),
    imageFile: new FormControl(null)

  });
  //update an area
  updateAreaForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    locationId: new FormControl(0),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    isActive: new FormControl(true, Validators.required),
    areaSize: new FormControl(0, Validators.required),
    imageFile: new FormControl(null)

  });
  //#endregion

  //#region Constructor
  constructor(private mallService: MallService,
    private toastService: ToastService, private locationService: LocationService, private areaService: AreaService) { }
  ngOnInit(): void {
    this.getData();
    this.trashPageInformation.pageSize = 5;
  }
  openFileInput(type: string) {
    if (type === 'create') document.getElementById('createUploadImage')?.click();
    else if (type === 'update') document.getElementById('updateUploadImage')?.click();
    else if (type === 'createLocation') document.getElementById('createLocationUploadImage')?.click();
    else if (type === 'updateLocation') document.getElementById('updateLocationUploadImage')?.click();
    else if (type === 'createArea') document.getElementById('createAreaUploadImage')?.click();
    else if (type === 'updateArea') document.getElementById('updateAreaUploadImage')?.click();
  }

  onChangeUploadImage(event: any, type: string) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'create') {
          this.reviewCreateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.createForm.patchValue({ imageFile: file });
        } else if (type === 'update') {
          this.reviewUpdateUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.updateForm.patchValue({ imageFile: file });
        } else if (type === 'createLocation') {
          this.reviewCreateLocationUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.createLocationForm.patchValue({ imageFile: file });
        } else if (type === 'updateLocation') {
          this.reviewUpdateLocationUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.updateLocationForm.patchValue({ imageFile: file });
        } else if (type === 'createArea') {
          this.reviewCreateAreaUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.createAreaForm.patchValue({ imageFile: file });
        } else if (type === 'updateArea') {
          this.reviewUpdateAreaUploadImage = `<img src="${e.target.result}" alt="Image Preview" class="mw-100 mh-100"/>`;
          this.updateAreaForm.patchValue({ imageFile: file });
        }
      };
      reader.readAsDataURL(file);
    }
  }
  //#endregion

  //#region Main Table
  getData() {
    this.mallService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
      this.pageInformation.pageIndex = this.data.pageIndex;
      // Reset visibleSubItems for fresh data
      const subItems: { [id: number]: boolean } = {};
      res.data.items.forEach((item: MallModel) => {
        if (item.locations && item.locations.length > 0) {
          if (item.id === this.visibleSubItemId) {
            subItems[item.id] = true; // Keep the current visible state
          }
          else {
            subItems[item.id] = false;
          }
        }
      });
      this.visibleSubItems.set(subItems);
    });
  }
  showSubItems(id: number) {
    const current = this.visibleSubItems();
    this.visibleSubItems.set({ ...current, [id]: !current[id] });
    this.visibleSubItemId = id;
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
  // Wrapper functions for child component context binding
  public toggleLiveCreateModelWrapper = (id: number | null) => this.toggleLiveCreateAreaModel(id);
  public updateDataWrapper = (id: number, type: string) => {
    if (type === 'location') {
      this.updateLocation(id);
    } else if (type === 'area') {
      this.updateArea(id);
    }
  }
  public softDeleteDataWrapper = (id: number, type: string) => {
    if (type === 'location') {
      this.softDeleteLocation(id);
    } else if (type === 'area') {
      this.softDeleteArea(id);
    }
  }
  //#endregion

  //#region Trash
  getTrashData() {
    this.mallService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
      this.trashData = res.data;
      this.trashPageInformation.currentPage = this.trashData.currentPage;
      this.trashPageInformation.totalItems = this.trashData.totalItems;
      this.trashPageInformation.totalPages = this.trashData.totalPages;
    });
  }
  getTrashLocationData() {
    this.locationService.getAllDeleted(this.trashLocationPageInformation.pageIndex, this.trashLocationPageInformation.pageSize).subscribe((res) => {
      this.trashLocationData = res.data;
      this.trashLocationPageInformation.currentPage = this.trashLocationData.currentPage;
      this.trashLocationPageInformation.totalItems = this.trashLocationData.totalItems;
      this.trashLocationPageInformation.totalPages = this.trashLocationData.totalPages;
    });
  }
  getTrashAreaData() {
    this.areaService.getAllDeleted(this.trashAreaPageInformation.pageIndex, this.trashAreaPageInformation.pageSize).subscribe((res) => {
      this.trashAreaData = res.data;
      this.trashAreaPageInformation.currentPage = this.trashAreaData.currentPage;
      this.trashAreaPageInformation.totalItems = this.trashAreaData.totalItems;
      this.trashAreaPageInformation.totalPages = this.trashAreaData.totalPages;
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
  onTrashLocationPageIndexChange(index: any) {
    this.trashLocationPageInformation.pageIndex = index;
    this.getTrashLocationData();
  }
  onTrashLocationPageSizeChange(size: any) {
    this.trashLocationPageInformation.pageSize = size;
    this.trashLocationPageInformation.pageIndex = 1;
    this.getTrashLocationData();
  }
  onTrashAreaPageIndexChange(index: any) {
    this.trashAreaPageInformation.pageIndex = index;
    this.getTrashAreaData();
  }
  onTrashAreaPageSizeChange(size: any) {
    this.trashAreaPageInformation.pageSize = size;
    this.trashAreaPageInformation.pageIndex = 1;
    this.getTrashAreaData();
  }
  toggleLiveTrashModal() {
    this.getTrashData();
    this.getTrashLocationData();
    this.getTrashAreaData();
    this.visibleTrashModal = !this.visibleTrashModal;
  }
  handleLiveTrashModalChange(event: any) {
    this.visibleTrashModal = event;
  }
  // Restore and delete from trash
  restoreData(id: number) {
    this.mallService.restore(id).subscribe((res) => {
      this.getTrashData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteDataTrash(id: number) {
    this.mallService.delete(id).subscribe((res) => {
      this.getTrashData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  // Restore and delete location from trash
  restoreLocationData(id: number) {
    this.locationService.restore(id).subscribe((res) => {
      this.getTrashLocationData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteLocationDataTrash(id: number) {
    this.locationService.delete(id).subscribe((res) => {
      this.getTrashLocationData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  // Restore and delete area from trash
  restoreAreaData(id: number) {
    this.areaService.restore(id).subscribe((res) => {
      this.getTrashAreaData();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }
  deleteAreaDataTrash(id: number) {
    this.areaService.delete(id).subscribe((res) => {
      this.getTrashAreaData();
      this.toastService.showToast(EColors.success, res.message);
    });
  }


  //#endregion

  //#region Create Mall Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      const formData = this.appendFormData(this.createForm, ['code', 'name', 'note', 'isActive']);
      this.mallService.create(formData).subscribe((res) => {
        this.toggleModal('visibleCreateModal');
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({ isActive: true });
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
  get codeCreateForm() { return this.createForm.get('code'); }
  get nameCreateForm() { return this.createForm.get('name'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

  //#region Update Mall Form
  updateData(id: number) {
    this.mallService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
      if (res.data.imagePath) {
        this.reviewUpdateUploadImage = `<img src="${this.baseUrl + res.data.imagePath}" alt="Image Preview" class="mw-100 mh-100"/>`;
      } else {
        this.reviewUpdateUploadImage = '';
      }
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      const formData = this.appendFormData(this.updateForm, ['id', 'code', 'name', 'note', 'isActive']);
      this.mallService.update(formData).subscribe((res) => {
        this.toggleModal('visibleUpdateModal');
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
  get codeUpdateForm() { return this.updateForm.get('code'); }
  get nameUpdateForm() { return this.updateForm.get('name'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  //#endregion

  //#region Delete Mall
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.mallService.softDelete(this.deleteById).subscribe((res) => {
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

  //#region Create Location Form
  onSubmitCreateLocationForm() {
    if (this.createLocationForm.valid) {
      const formData = this.appendFormData(this.createLocationForm, ['mallId', 'code', 'name', 'note', 'isActive']);
      this.locationService.create(formData).subscribe((res) => {
        this.toggleLiveCreateLocationModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createLocationForm.reset();
        this.createLocationForm.patchValue({ isActive: true });
        this.reviewCreateLocationUploadImage = '';
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }
  toggleLiveCreateLocationModel(mallId: number | null = null) {
    this.visibleCreateLocationModal = !this.visibleCreateLocationModal;
    if (mallId !== null) {
      this.createLocationForm.patchValue({ mallId });
    }
  }
  handleLiveCreateLocationModelChange(event: any) {
    this.visibleCreateLocationModal = event;
  }
  //#endregion
  //#region Update Location Form
  updateLocation(id: number) {
    this.locationService.getById(id).subscribe((res) => {
      this.updateLocationForm.patchValue(res.data);
      this.toggleLiveUpdateLocationModel();
      if (res.data.imagePath) {
        this.reviewUpdateLocationUploadImage = `<img src="${this.baseUrl + res.data.imagePath}" alt="Image Preview" class="mw-100 mh-100"/>`;
      } else {
        this.reviewUpdateLocationUploadImage = '';
      }
    });
  }
  onSubmitUpdateLocationForm() {
    if (this.updateLocationForm.valid) {
      const formData = this.appendFormData(this.updateLocationForm, ['id', 'mallId', 'code', 'name', 'note', 'isActive']);
      this.locationService.update(formData).subscribe((res) => {
        this.toggleLiveUpdateLocationModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.reviewUpdateLocationUploadImage = '';
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }
  toggleLiveUpdateLocationModel() {
    this.visibleUpdateLocationModal = !this.visibleUpdateLocationModal;
  }
  handleLiveUpdateLocationModelChange(event: any) {
    this.visibleUpdateLocationModal = event;
  }
  //#endregion
  //#region Delete Location
  softDeleteLocation(id: number) {
    this.deleteLocationById = id;
    this.toggleLiveDeleteLocation();
  }
  onConfirmDeleteLocation() {
    this.locationService.softDelete(this.deleteLocationById).subscribe((res) => {
      this.toggleLiveDeleteLocation();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  toggleLiveDeleteLocation() {
    this.visibleDeleteLocation = !this.visibleDeleteLocation;
  }
  handleLiveDeleteLocationChange(event: any) {
    this.visibleDeleteLocation = event;
  }
  //#endregion

  //#region Create Area Form
  onSubmitCreateAreaForm() {
    if (this.createAreaForm.valid) {
      const formData = this.appendFormData(this.createAreaForm, ['locationId', 'code', 'name', 'note', 'isActive', 'areaSize']);
      this.areaService.create(formData).subscribe((res) => {
        this.toggleLiveCreateAreaModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createAreaForm.reset();
        this.createAreaForm.patchValue({ isActive: true });
        this.reviewCreateAreaUploadImage = '';
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }
  toggleLiveCreateAreaModel(locationId: number | null = null) {
    this.visibleCreateAreaModal = !this.visibleCreateAreaModal;
    if (locationId !== null) {
      this.createAreaForm.patchValue({ locationId });
    }
  }
  handleLiveCreateAreaModelChange(event: any) {
    this.visibleCreateAreaModal = event;
  }
  //#endregion
  //#region Update Area Form
  updateArea(id: number) {
    this.areaService.getById(id).subscribe((res) => {
      this.updateAreaForm.patchValue(res.data);
      this.toggleLiveUpdateAreaModel();
      if (res.data.imagePath) {
        this.reviewUpdateAreaUploadImage = `<img src="${this.baseUrl + res.data.imagePath}" alt="Image Preview" class="mw-100 mh-100"/>`;
      } else {
        this.reviewUpdateAreaUploadImage = '';
      }
    });
  }
  onSubmitUpdateAreaForm() {
    if (this.updateAreaForm.valid) {
      const formData = this.appendFormData(this.updateAreaForm, ['id', 'locationId', 'code', 'name', 'note', 'isActive', 'areaSize']);
      this.areaService.update(formData).subscribe((res) => {
        this.toggleLiveUpdateAreaModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.reviewUpdateAreaUploadImage = '';
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }
  toggleLiveUpdateAreaModel() {
    this.visibleUpdateAreaModal = !this.visibleUpdateAreaModal;
  }
  handleLiveUpdateAreaModelChange(event: any) {
    this.visibleUpdateAreaModal = event;
  }
  //#endregion
  //#region Delete Area
  softDeleteArea(id: number) {
    this.deleteAreaById = id;
    this.toggleLiveDeleteArea();
  }
  onConfirmDeleteArea() {
    this.areaService.softDelete(this.deleteAreaById).subscribe((res) => {
      this.toggleLiveDeleteArea();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  toggleLiveDeleteArea() {
    this.visibleDeleteArea = !this.visibleDeleteArea;
  }
  handleLiveDeleteAreaChange(event: any) {
    this.visibleDeleteArea = event;
  }
  //#endregion

  // Helper to append form values to FormData
  public appendFormData(form: FormGroup, fields: string[]): FormData {
    const formData = new FormData();
    fields.forEach(field => {
      let value = form.value[field];
      if (value !== undefined && value !== null) {
        if (typeof value === 'boolean' || typeof value === 'number') {
          value = value.toString();
        }
        formData.append(field, value);
      }
    });
    if (form.value.imageFile) {
      formData.append('imageFile', form.value.imageFile);
    }
    return formData;
  }

  public toggleModal(modal: keyof MallComponent) {
    (this[modal] as boolean) = !(this[modal] as boolean);
  }
  public handleModalChange(modal: keyof MallComponent, event: boolean) {
    (this[modal] as boolean) = event;
  }
}
