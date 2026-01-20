import { BackgroundGalaxyComponent } from "@components/generals/background-galaxy/background-galaxy.component";
import { Component, OnInit, signal } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, FormCheckComponent, SpinnerComponent } from '@coreui/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EyeIconComponent, EyeClosedIconComponent } from '@components/icons';
import { AuthService } from '@services/system-services/auth.service';
import { SocialAuthService, GoogleSigninButtonDirective, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { ExternalAuthModel } from '@models/external-auth.model';
import { ParticleCanvasComponent } from "@components/generals/particle-canvas/particle-canvas.component";

@Component({
  selector: 'app-login-threejs',
  templateUrl: './login-threejs.component.html',
  styleUrl: './login-threejs.component.scss',
  imports: [InputGroupComponent, InputGroupTextDirective, IconDirective, FormCheckComponent, FormControlDirective, ButtonDirective,
    ReactiveFormsModule, RouterLink, EyeIconComponent, EyeClosedIconComponent, GoogleSigninButtonDirective,
    BackgroundGalaxyComponent, SpinnerComponent]
})
export class LoginThreejsComponent implements OnInit {
  //#region Variables
  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;
  showPassword: boolean = false;
  errorMessage: string = '';
  isLoading = signal(false);
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });

  // private authSubscription: Subscription = new Subscription();
  //#endregion

  //#region Lifecycle Hooks
  constructor(private authenticationService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}
  
  ngOnInit(): void {
    const isAuthenticated = this.authenticationService.checkLogin();
    if (isAuthenticated) {
      this.router.navigate(['/introduction']);
    }

    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.isLoading.set(true);
        const authModel: ExternalAuthModel = {
          provider: user.provider,
          idToken: user.idToken
        };
        this.authenticationService.externalLogin(authModel).subscribe({
          next: (response) => {
            if (response.success) {
              this.isLoading.set(false);
              this.router.navigate(['/introduction']);
            }
          },
          error: (exception: any) => {
            this.isLoading.set(false);
            this.errorMessage = exception.error.message;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.invalid)
      return;

    this.isLoading.set(true);
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.isLoading.set(false);
          this.router.navigate(['/introduction']);
        }
      },
      error: (exception: any) => {
        this.isLoading.set(false);
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
