import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonCloseDirective,
  ButtonDirective,
  FormControlDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  //ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EyeIconComponent } from '@components/icons/eye-icon.component';
import { EyeCloseIconComponent } from '@components/icons/eye-close-icon.component';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { ToastService } from '@services/helper-services/toast.service';
import { MyAccountService } from '@services/system-services/my-account.service';
import { EColors } from '@common/global';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
   // ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective,
     ButtonCloseDirective, ModalComponent, ModalFooterComponent, ModalBodyComponent,
    ModalHeaderComponent, FormControlDirective, ReactiveFormsModule, ButtonDirective, EyeIconComponent, EyeCloseIconComponent
  ]
})
export class DefaultLayoutComponent {
    //#region Change Password
  changePasswordFormError: string = '';
  visibleChangePassword: boolean = false;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  changePasswordForm: FormGroup = new FormGroup({
    userId: new FormControl(-1),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    error: new FormControl('')
  });
  //#endregion
  public navItems = [...navItems];
    constructor(private authentication: AuthenticationService, private toastService: ToastService,
    private myAccountService: MyAccountService) {

  }
  //#region Change Password
  toggleChangePassword() {
    this.visibleChangePassword = !this.visibleChangePassword;
  }

  handleChangePasswordChange(event: any) {
    this.visibleChangePassword = event;
  }

  onSubmitChangePassword() {
    let userId = this.authentication.getUserId();
    this.changePasswordForm.patchValue({ userId: userId });

    if (this.changePasswordForm.value.newPassword != this.changePasswordForm.value.confirmPassword) {
      this.changePasswordFormError = `Password does not match`;
      return;
    }

    this.myAccountService.changePassword(this.changePasswordForm.value).subscribe(
      {
        next: (res) => {
          this.changePasswordForm.reset();
          this.toggleChangePassword();
          this.toastService.showToast(EColors.success, res.message);
        }, 
        error: (error: any) => {
          console.log(error);
          this.changePasswordFormError = error.message;
        }
      }
    );
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
  //#endregion
}
