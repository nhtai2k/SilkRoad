import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/system-services/auth.service';
import { EyeIconComponent } from '@components/icons/eye-icon.component';
import { EyeCloseIconComponent } from '@components/icons/eye-close-icon.component';
import { RoleService } from '@services/system-services/role.service'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleModel } from '@models/system-models/role.model';
import { MyAccountService } from '@services/system-services/my-account.service';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent } from '@coreui/angular';
import { Router } from '@angular/router';
import { AccountErrorModel, AccountModel } from '@models/system-models/account.model';
import { AccountService } from '@services/system-services/account.service'
@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [ToasterComponent, ToastHeaderComponent, ToastComponent,ButtonCloseDirective,
     EyeCloseIconComponent, EyeIconComponent, ReactiveFormsModule,FormControlDirective,
    ModalComponent, ModalFooterComponent, CardBodyComponent,FormSelectDirective,
     CardHeaderComponent, CardComponent, FormDirective, FormLabelDirective,
    ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ToastBodyComponent, ButtonDirective],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent implements OnInit {
  roles : RoleModel[] = [];
  formData : FormGroup = new FormGroup({
    id : new FormControl(-1),
    mallId : new FormControl(-1),
    officeId : new FormControl(-1),
    roleId : new FormControl(-1,Validators.min(1)),
    userName : new FormControl(''),
    email : new FormControl(''),
    phoneNumber : new FormControl(''),
    password : new FormControl(''),
    isActive: new FormControl(true),
  });
  changePasswordForm: FormGroup = new FormGroup({
    userId: new FormControl(-1),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    error: new FormControl('')
  });
  visibleToast: boolean = false;
  changePasswordFormError: string = '';
  visibleChangePassword: boolean = false;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(private authentication: AuthService,private roleService : RoleService,private accountService : AccountService,
     private myAccountService: MyAccountService, private router: Router) {
  }
  ngOnInit(): void {
    // Get current user information and load account data
    this.authentication.getCurrentUserInfor().subscribe({
      next: (currentUser) => {
        if (currentUser && currentUser.userId) {
          this.accountService.getById(currentUser.userId).subscribe({
            next: (res) => {
              this.formData.patchValue(res.data);
            },
            error: (error) => {
              console.error('Failed to load account data:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Failed to get current user:', error);
      }
    });
    
    // Uncomment if roles are needed
    // this.roleService.getRoles().subscribe((res: RoleModel[]) => {
    //   this.roles = res;
    // });
  }
  toggleToast() {
    this.visibleToast = !this.visibleToast;
  }
  onVisibleChange($event: boolean) {
    this.visibleToast = $event;
  }
  toggleChangePassword() {
    this.visibleChangePassword = !this.visibleChangePassword;
  }

  handleChangePasswordChange(event: any) {
    this.visibleChangePassword = event;
  }
  onSubmitChangePassword() {
    // Clear any previous errors
    this.changePasswordFormError = '';
    
    // Validate form before proceeding
    if (this.changePasswordForm.invalid) {
      this.changePasswordFormError = 'Please fill in all required fields';
      return;
    }
    
    // Check if passwords match
    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
      this.changePasswordFormError = 'New password and confirm password do not match';
      return;
    }
    
    // Get current user information
    this.authentication.getCurrentUserInfor().subscribe({
      next: (currentUser) => {
        if (!currentUser || !currentUser.userId) {
          this.changePasswordFormError = 'User not found. Please log in again.';
          return;
        }
        
        // Set userId in form data
        const changePasswordData = {
          ...this.changePasswordForm.value,
          userId: currentUser.userId
        };
        
        // Submit password change request
        this.myAccountService.changePassword(changePasswordData).subscribe({
          next: () => {
            this.changePasswordForm.reset();
            this.changePasswordFormError = '';
            this.toggleChangePassword();
            this.toggleToast();
          },
          error: (error: any) => {
            console.error('Password change error:', error);
            this.changePasswordFormError = error?.error?.message || 'Failed to change password. Please check your old password.';
          }
        });
      },
      error: (error) => {
        console.error('Failed to get current user:', error);
        this.changePasswordFormError = 'Failed to get user information. Please log in again.';
      }
    });
  }

  ShowPassword(id: string) {
    const passwordInput = document.getElementById(id);
    if (passwordInput && id == 'newPassword') {
      passwordInput.setAttribute('type', this.showNewPassword ? 'password' : 'text');
      this.showNewPassword = !this.showNewPassword
    }
    else if (passwordInput && id == 'oldPassword') {
      passwordInput.setAttribute('type', this.showOldPassword ? 'password' : 'text');
      this.showOldPassword = !this.showOldPassword
    }
    else if (passwordInput && id == 'confirmPassword') {
      passwordInput.setAttribute('type', this.showConfirmPassword ? 'password' : 'text');
      this.showConfirmPassword = !this.showConfirmPassword
    }
  }
  get oldPassword() { return this.changePasswordForm.get('oldPassword'); }
  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword'); }

}
