import { Component, OnInit } from '@angular/core';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, FormCheckComponent, FormControlDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, TemplateIdDirective } from '@coreui/angular';
import { AccountService } from '@services/system-services/account.service';
import { AccountModel } from '@models/system-models/account.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import {
  cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCheckCircle, cilBan,
  cilCloudDownload, cilX, cilSearch
} from '@coreui/icons';
import { phoneNumberValidator } from '@common/validations/phonenumber.validator';
import { userNameValidator } from '@common/validations/username.validator';
import { RoleService } from '@services/system-services/role.service';
import { OptionModel } from '@models/option.model';
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DataTableComponent, ReactiveFormsModule, FormsModule, IconDirective, AccordionButtonDirective, FormCheckComponent, AccordionComponent,
    ButtonDirective, AccordionItemComponent, ModalComponent, ModalBodyComponent, TemplateIdDirective, ModalFooterComponent, ModalHeaderComponent,
    FormControlDirective, FormLabelDirective, FormSelectDirective],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  icons: any = {
    cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular,
    cilCloudUpload, cilCloudDownload, cilX, cilSearch, cilCheckCircle, cilBan
  };
  pageInformation: PageInformation = new PageInformation();
  data: Pagination<AccountModel> = new Pagination<AccountModel>();

  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;

  roles: OptionModel[] = [];
  textSearchFilter: string = '';
  roleIdFilter: number = -1;


  createForm: FormGroup = new FormGroup({
    roleId: new FormControl(-1, Validators.min(1)),
    userName: new FormControl('', [Validators.required, userNameValidator()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', phoneNumberValidator()),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    isActive: new FormControl(true),
  });

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    roleId: new FormControl(-1, Validators.min(1)),
    phoneNumber: new FormControl('', phoneNumberValidator()),
    userName: new FormControl({ value: '', readOnly: true }),
    email: new FormControl({ value: '', readOnly: true }),
    password: new FormControl(''),
    isActive: new FormControl(true),
  });
  constructor(private accountService: AccountService, private roleService: RoleService, private toastService: ToastService) { }

  ngOnInit() {
    this.onSubmitFilter();
    this.getRoles();
  }
  getRoles() {
    this.roleService.getOptionList().subscribe((res) => {
      this.roles = res.data;
    });
  }
  onSubmitFilter() {
    this.accountService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize, this.roleIdFilter, this.textSearchFilter).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
    });
  }
  onPageIndexChange(index: any) {
    this.pageInformation.pageIndex = index;
    this.onSubmitFilter();
  }
  onPageSizeChange(size: any) {
    this.pageInformation.pageSize = size;
    this.pageInformation.pageIndex = 1;
    this.onSubmitFilter();
  }
  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.accountService.create(this.createForm.value).subscribe({
        next: (res) => {
          this.toggleLiveCreateModel();
          this.onSubmitFilter();
          this.toastService.showToast(EColors.success, res.message);
          this.createForm.reset();
          this.createForm.patchValue({ isActive: true, priority: 1, roleId: -1 });
        },
        error: (failure) => {
          this.toastService.showToast(EColors.danger, failure.error.message);
        }
      });
    }
  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }
  get roleIdCreateForm() { return this.createForm.get('roleId'); }
  get userNameCreateForm() { return this.createForm.get('userName'); }
  get emailCreateForm() { return this.createForm.get('email'); }
  get phoneNumberCreateForm() { return this.createForm.get('phoneNumber'); }
  get passwordCreateForm() { return this.createForm.get('password'); }

  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.accountService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      // console.log(this.updateForm.value);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.accountService.update(this.updateForm.value).subscribe(
        {
          next: (res) => {
            this.toggleLiveUpdateModel();
            this.onSubmitFilter();
            this.toastService.showToast(EColors.success, res.message);
          },
          error: (failure) => {
            // console.log(failure);
            this.toastService.showToast(EColors.danger, failure.error.message);
          }
        }
      );
    }
  }

  toggleLiveUpdateModel() {
    this.visibleUpdateModal = !this.visibleUpdateModal;
  }

  handleLiveUpdateModelChange(event: any) {
    this.visibleUpdateModal = event;
  }

  get roleIdUpdateForm() { return this.updateForm.get('roleId'); }
  get phoneNumberUpdateForm() { return this.updateForm.get('phoneNumber'); }
  get isActiveUpdateForm() { return this.updateForm.get('isActive'); }
  //#endregion
  deactivateData(id: number) {
    this.accountService.deactivateUser(id).subscribe({
      next: (res) => {
        this.onSubmitFilter();
        this.toastService.showToast(EColors.success, res.message);
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
  }
  activateData(id: number) {
    this.accountService.activateUser(id).subscribe({
      next: (res) => {
        this.onSubmitFilter();
        this.toastService.showToast(EColors.success, res.message);
      },
      error: (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      }
    });
  }
}
