import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, FormCheckComponent } from '@coreui/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EyeIconComponent } from '@components/icons/eye-icon.component';
import { EyeCloseIconComponent } from '@components/icons/eye-close-icon.component';
import { LoadingService } from '@services/helper-services/loading.service';
import { ParticleCanvasComponent } from '@components/generals/particle-canvas/particle-canvas.component';
import { AuthService } from '@services/system-services/auth.service';
import { SocialAuthService, GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [InputGroupComponent, InputGroupTextDirective, IconDirective, FormCheckComponent, FormControlDirective, ButtonDirective,
    ParticleCanvasComponent, ReactiveFormsModule, RouterLink, EyeIconComponent, EyeCloseIconComponent, GoogleSigninButtonDirective]
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
  
  // private authSubscription: Subscription = new Subscription();
  //#endregion

  //#region Lifecycle Hooks
  constructor(private authenticationService: AuthService,
    private router: Router, 
    private loadingService: LoadingService,
    // private socialAuthService: SocialAuthService
  ) {
  }
  ngOnInit(): void {
    const isAuthenticated = this.authenticationService.checkLogin();
    if (isAuthenticated) {
      this.router.navigate(['/introduction']);
    }

    // this.socialAuthService.authState.subscribe((user) => {
    //   if (user) {
    //     console.log('Google user authenticated:', user);
    //     // this.handleGoogleLogin(user);
    //   }
    // });
    // // Listen for Google authentication state changes
    // this.authSubscription = this.socialAuthService.authState.subscribe((user: SocialUser) => {
    //   if (user) {
    //     console.log('Google user authenticated:', user);
    //     this.handleGoogleLogin(user);
    //   }
    // });
  }

  // ngOnDestroy(): void {
  //   this.authSubscription.unsubscribe();
  // }

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

  // signInWithGoogle(): void {
  //   // this.loadingService.showLoadingComponent(true);
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then((user: SocialUser) => {
  //       console.log('Google sign-in successful:', user);
  //       this.loadingService.showLoadingComponent(false);
  //     })
  //     .catch((error) => {
  //       console.error('Google sign-in error:', error);
  //       this.loadingService.showLoadingComponent(false);
  //       this.errorMessage = 'Google sign-in failed. Please try again.';
  //     });
  // }

  // private handleGoogleLogin(user: SocialUser): void {
  //   // Process Google user data
  //   const googleUserData = {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     photoUrl: user.photoUrl,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     idToken: user.idToken, // Use this for backend verification
  //     authToken: user.authToken
  //   };

  //   console.log('Processing Google user:', googleUserData);
    
  //   // You can send this to your backend for authentication
  //   // Example: this.authenticationService.googleLogin(googleUserData.idToken)
    
  //   // Clear any existing error messages
  //   this.errorMessage = '';
    
  //   // For now, navigate to introduction page
  //   this.router.navigate(['/introduction']);
  // }

  // // Optional: Sign out method
  // signOut(): void {
  //   this.socialAuthService.signOut();
  // }
  //#endregion
}
