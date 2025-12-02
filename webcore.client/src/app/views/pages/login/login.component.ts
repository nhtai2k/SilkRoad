import { Component, OnInit } from '@angular/core';

import { IconDirective } from '@coreui/icons-angular';
import { InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, FormCheckComponent } from '@coreui/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EyeIconComponent } from '@components/icons/eye-icon.component';
import { EyeCloseIconComponent } from '@components/icons/eye-close-icon.component';
import { LoadingService } from '@services/helper-services/loading.service';
import { ParticleCanvasComponent } from '@components/generals/particle-canvas/particle-canvas.component';
import { AuthenticationService } from '@services/system-services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormCheckComponent,
    FormControlDirective,
    ButtonDirective,
    ParticleCanvasComponent,
    ReactiveFormsModule,
    RouterLink,
    EyeIconComponent,
    EyeCloseIconComponent
]
})
export class LoginComponent implements OnInit {
  //#region Variables
  showPassword: boolean = false;
  errorMessage: string = '';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });
  //#endregion
  //#region Lifecycle Hooks
  constructor(private authenticationService: AuthenticationService,
     private router: Router, private loadingService: LoadingService) {
  }
  ngOnInit(): void {
        const isAuthenticated = this.authenticationService.checkLogin();
        if (isAuthenticated) {
          this.router.navigate(['/introduction']);
        }
  }

  onSubmit() {
    if (this.loginForm.invalid)
      return;

    this.loadingService.showLoadingComponent(true);
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadingService.showLoadingComponent(false);
          this.router.navigate(['/introduction']);
        }
      },
      error: (exception: any) => {
        this.loadingService.showLoadingComponent(false);
        if (exception.status == 423) {
          this.router.navigate(['/423']);
        }
        this.errorMessage = exception.error.message;
      }
    });
  }
  //#endregion

  //#region Methods
  ShowPassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.setAttribute('type', this.showPassword ? 'password' : 'text');
    }
    this.showPassword = !this.showPassword
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  //#endregion
}
