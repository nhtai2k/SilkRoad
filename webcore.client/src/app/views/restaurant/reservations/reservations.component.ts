import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent,
  ModalHeaderComponent, FormControlDirective, FormLabelDirective, FormDirective, AccordionItemComponent,
  AccordionComponent, AccordionButtonDirective, TemplateIdDirective
} from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudDownload, cilUserPlus } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { bookingSignalrUrl, EColors } from '@common/global';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { ReservationModel } from '@models/restaurant-models/reservation.model';
import { ReservationService } from '@services/restaurant-services/reservation.service';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { OptionModel } from '@models/option.model';
import { TableService } from '@services/restaurant-services/table.service';
import * as signalR from '@microsoft/signalr';
import { EyeIconComponent } from "@components/icons/eye-icon.component";

@Component({
  selector: 'app-reservations',
  imports: [ModalBodyComponent, CommonModule, FormControlDirective, FormLabelDirective, AccordionItemComponent, AccordionButtonDirective,
    ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, AccordionComponent, TemplateIdDirective,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent, DataTableComponent, IconDirective, SelectSearchComponent, EyeIconComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit, OnDestroy {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  trashPageInformation: PageInformation = new PageInformation();
  tableList: OptionModel[] = [];
  visibleCreateModal: boolean = false;
  visibleViewModal: boolean = false;
  visibleCheckInModal: boolean = false;
  visibleCheckOutModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  data: Pagination<ReservationModel> = new Pagination<ReservationModel>();
  trashData: Pagination<ReservationModel> = new Pagination<ReservationModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilCloudDownload, cilUserPlus };
  checkInTableId = signal<number>(-1);
  checkOutId = signal<number>(-1);
  private hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(bookingSignalrUrl)
    .build();

  createForm: FormGroup = new FormGroup({
    tableId: new FormControl(null, Validators.required),
    fullName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    numberOfGuests: new FormControl(1, [Validators.required, Validators.min(1)]),
    note: new FormControl(null),
    checkInTime: new FormControl(null, Validators.required)
  });

    viewForm: FormGroup = new FormGroup({
    tableId: new FormControl({value: -1, disabled: true}, Validators.required),
    fullName: new FormControl({value: null, disabled: true}, Validators.required),
    phoneNumber: new FormControl({value: null, disabled: true}, Validators.required),
    numberOfGuests: new FormControl({value: 1, disabled: true}, [Validators.required, Validators.min(1)]),
    note: new FormControl({value: null, disabled: true}),
    checkInTime: new FormControl({value: null, disabled: true}, Validators.required)
  });

  checkInForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    tableId: new FormControl(null, Validators.required)
  });
  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(1),
    pageSize: new FormControl(5),
    tableId: new FormControl(-1),
    statusId: new FormControl(-1),
    searchText: new FormControl('')
  });
  //#endregion

  //#region Constructor and Hooks
  constructor(private reservationService: ReservationService,
    private tableService: TableService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getData();
    this.getTableList();
      this.startConnection();
      this.addListener('GuestArrived', () => {
        this.toastService.showToast(EColors.success, 'Khách đã đến');
        this.getData();
      });
  }
    ngOnDestroy(): void {
    this.stopConnection();
  }

  onSubmitFilterForm() {
    this.getData();
  }

  getTableList() {
    this.tableService.getOptionList().subscribe((res) => {
      this.tableList = res.data;
      console.log(this.tableList);
    });
  }

  getData() {
    this.filterForm.patchValue({
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize
    });
    this.reservationService.getByFilter(this.filterForm.value).subscribe((res) => {
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

  //#region Create
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.reservationService.create(this.createForm.value).subscribe((res: any) => {
        this.toggleLiveCreateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.createForm.reset();
        this.createForm.patchValue({
          isFree: true,
          isActive: true
        })
      }, (failure: any) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
        console.log(failure);
      });
    }
  }
  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }
  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  get fullNameCreateForm() { return this.createForm.get('fullName'); }
  get phoneNumberCreateForm() { return this.createForm.get('phoneNumber'); }
  get numberOfGuestsCreateForm() { return this.createForm.get('numberOfGuests'); }
  get priorityCreateForm() { return this.createForm.get('priority'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  get checkInTimeCreateForm() { return this.createForm.get('checkInTime'); }
  //#endregion

  //#region View
  view(id: number) {
    this.reservationService.getById(id).subscribe((res) => {
      this.viewForm.patchValue(res.data);
      this.toggleLiveViewModel();
    });
  }
  handleLiveViewModelChange(event: any) {
    this.visibleViewModal = event;
  }
  toggleLiveViewModel() {
    this.visibleViewModal = !this.visibleViewModal;
  }
  //#endregion

  //#region Check-In
  checkIn(id: number) {
    this.reservationService.getById(id).subscribe((res) => {
      this.checkInForm.patchValue(res.data);
      if (res.data.tableId) {
        this.checkInTableId.set(res.data.tableId);
      }
      this.toggleLiveCheckInModel();
    });
  }
  handleLiveCheckInModelChange(event: any) {
    this.visibleCheckInModal = event;
  }
  toggleLiveCheckInModel() {
    this.visibleCheckInModal = !this.visibleCheckInModal;
  }
  onSubmitCheckInForm() {
    if (this.checkInForm.valid) {
      console.log(this.checkInForm.value);
      this.reservationService.checkIn(this.checkInForm.value).subscribe((res: any) => {
        this.toggleLiveCheckInModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
        this.checkInForm.reset();
      }, (failure: any) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  //#endregion

  //#region Check-Out
  checkOut(id: number) {
    this.checkOutId.set(id);
    this.toggleLiveCheckOutModel();
  }
  handleLiveCheckOutModelChange(event: any) {
    this.visibleCheckOutModal = event;
  }
  toggleLiveCheckOutModel() {
    this.visibleCheckOutModal = !this.visibleCheckOutModal;
  }
  confirmCheckOut() {
    this.reservationService.checkOut(this.checkOutId()).subscribe((res: any) => {
      this.toggleLiveCheckOutModel();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    }, (failure: any) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  //#endregion

  //#region SignalR
  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch((err: any) => console.log('Error while starting SignalR connection: ' + err));
  }

  private addListener(eventName: string, callback: (...args: any[]) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on(eventName, callback);
    }
  }

  private stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log('SignalR connection stopped'))
        .catch((err: any) => console.log('Error while stopping SignalR connection: ' + err));
    }
  }
  //#endregion

}
