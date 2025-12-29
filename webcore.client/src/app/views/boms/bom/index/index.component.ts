import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, ModalComponent,
  ButtonDirective, ButtonCloseDirective, ModalFooterComponent, ModalHeaderComponent, ModalBodyComponent, FormControlDirective,
  FormLabelDirective
} from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilLoopCircular, cilDataTransferDown } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { BOMModel } from '@models/bom-models/bom.model';
import { BomService } from '@services/bom-services/bom.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { OptionModel } from '@models/option.model';
import { DishService } from '@services/bom-services/dish.service';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
@Component({
  selector: 'app-index',
  imports: [NgFor, ReactiveFormsModule, RouterLink, AccordionButtonDirective, ModalComponent, NgIf, ModalBodyComponent, ModalFooterComponent,
    AccordionComponent, AccordionItemComponent, ButtonCloseDirective, ModalHeaderComponent, FormControlDirective, FormLabelDirective, ButtonDirective,
    TemplateIdDirective, DataTableComponent, IconDirective, SelectSearchComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  pageInformation: PageInformation = new PageInformation();
  data: Pagination<BOMModel> = new Pagination<BOMModel>();
  visibleCreateModal: boolean = false;
  visibleTrashModal: boolean = false;
  dishOptionList: OptionModel[] = [];
  icons: any = { cilPlus, cilTrash, cilPen, cilLoopCircular, cilDataTransferDown };
  filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(1),
    pageSize: new FormControl(5),
    dishId: new FormControl(-1),
    searchText: new FormControl('')
  });
  createForm: FormGroup = new FormGroup({
    dishGroupId: new FormControl(-1),
    dishId: new FormControl(-1),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    note: new FormControl('')
  });
  constructor(private bomService: BomService,
    private dishService: DishService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getData();
    this.dishService.getOptionList().subscribe(res => {
      this.dishOptionList = res.data;
    }, failure => {
      console.error(failure);
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  onSubmitFilterForm() {
    this.getData();
  }
  getData() {
    this.bomService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
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
  onChangeDishFilter(event: any) {
    this.filterForm.patchValue({
      dishId: event
    });
  }
  //#region Create
  // Helper to append form values to FormData
  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }
  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  onSubmitCreateForm() {
    if (this.createForm.invalid) {
      return;
    }
    this.bomService.create(this.createForm.value).subscribe(res => {
      this.toastService.showToast(EColors.success, res.message);
      this.router.navigate(['/boms/update/', res.data.id]);
    }, failure => {
      console.error(failure);
      //this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  onChangeCreateDish(event: any) {
    this.createForm.patchValue({
      dishId: event.id
    });
  }
  get nameCreateForm() { return this.createForm.get('name'); }
  get codeCreateForm() { return this.createForm.get('code'); }
  get dishIdCreateForm() { return this.createForm.get('dishId'); }
  get noteCreateForm() { return this.createForm.get('note'); }
  //#endregion

}
