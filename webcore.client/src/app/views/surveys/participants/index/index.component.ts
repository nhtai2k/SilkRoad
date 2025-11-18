import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EColors } from '@common/global';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { AccordionButtonDirective, AccordionComponent, ButtonDirective, AccordionItemComponent, ModalComponent, ModalBodyComponent, TemplateIdDirective, ModalFooterComponent, ModalHeaderComponent, FormSelectDirective, FormControlDirective } from '@coreui/angular';
import { cilExitToApp, cilPen, cilSave, cilSearch, cilStar, cilX } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { OptionModel } from '@models/option.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ParticipantModel } from '@models/survey-models/participant.model';
import { ToastService } from '@services/helper-services/toast.service';
import { ParticipantService } from '@services/survey-services/participant.service';
import { StoreService } from '@services/survey-services/store.service';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";

@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, DataTableComponent, RouterLink, IconDirective, AccordionButtonDirective, AccordionComponent,
    ButtonDirective, AccordionItemComponent, ModalComponent, ModalBodyComponent, TemplateIdDirective, ModalFooterComponent,
    ModalHeaderComponent, FormSelectDirective, DatePipe, FormControlDirective, RangeDatetimePickerComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  //#region Variables
  visibleReject: boolean = false;
  rejectById: number = 0;
  storeList: OptionModel[] = [];
  surveyFormList: OptionModel[] = [];
  data: Pagination<ParticipantModel> = new Pagination<ParticipantModel>();
  pageInformation: PageInformation = new PageInformation();
  icons: any = { cilX, cilStar, cilPen, cilSave, cilSearch, cilExitToApp };
  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(-1),
    pageSize: new FormControl(-1),
    surveyFormId: new FormControl(-1),
    isComplete: new FormControl(null),
    isRejected: new FormControl(null),
    isHighlighted: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  });
  rejectForm: FormGroup = new FormGroup({
    participantId: new FormControl(null),
    reason: new FormControl(null, [Validators.required, Validators.maxLength(255)])
  });
  //#endregion

  //#region Constructor and hooks
  constructor(private participantService: ParticipantService, private storeService: StoreService, private toastService: ToastService) { }
  ngOnInit(): void {
    this.filterForm.patchValue({ pageIndex: this.pageInformation.pageIndex, pageSize: this.pageInformation.pageSize });
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
    this.participantService.filter(this.filterForm.value).subscribe((response) => {
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
  filter() {
    console.log(this.filterForm.value);
    this.filterForm.patchValue({ pageIndex: this.pageInformation.pageIndex, pageSize: this.pageInformation.pageSize });
    this.getData();
  }

  //#region Highlight Participant
  highlight(participantId: any) {
    this.participantService.highlight(participantId).subscribe((res) => {
      // this.getData();
      this.toastService.showToast(EColors.success, res.message);
      this.data.items.find(x => x.id == participantId)!.isHighlighted = true;
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }

  removeHighlight(participantId: any) {
    this.participantService.removeHighlight(participantId).subscribe((res) => {
      // this.getData();
      this.toastService.showToast(EColors.success, res.message);
      this.data.items.find(x => x.id == participantId)!.isHighlighted = false;
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }

  //#endregion

  //#region Reject Participant
  reject(participantId: any) {
    this.rejectForm.reset();
    this.rejectById = participantId;
    this.rejectForm.patchValue({ participantId: participantId });
    this.toggleLiveReject();
  }
  onConfirmReject() {
    this.participantService.reject(this.rejectForm.value.participantId, this.rejectForm.value.reason).subscribe((res) => {
      this.toggleLiveReject();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  toggleLiveReject() {
    this.visibleReject = !this.visibleReject;
  }

  handleLiveRejectChange(event: any) {
    this.visibleReject = event;
  }

  get reasonRejectForm() { return this.rejectForm.get('reason'); }
  //#endregion
}
