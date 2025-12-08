import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { EAuthSystemUrl } from '@common/url-api';
import { jwtDecode } from 'jwt-decode';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { LoginModel } from '@models/system-models/login.model';
import { Router } from '@angular/router';
import { UserLoginInfoModel } from '@models/user-login-info.model';
import { ExternalAuthModel } from '@models/external-auth.model';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenSignal = signal<string | null>(null);
  private currentUserSignal = signal<UserLoginInfoModel | null>(null);
  accessToken = computed(() => this.accessTokenSignal());
  // isLoggedIn = computed(() => !!this.accessTokenSignal());

  constructor(private http: HttpClient, private router: Router, private socialAuthService: SocialAuthService) { }

  externalLogin(externalAuth: ExternalAuthModel): Observable<BaseAPIResponse> {
    return this.http.post<APIResponse<string>>(EAuthSystemUrl.externalLoginUrl, externalAuth).pipe(
      switchMap((response: APIResponse<string>) => {
        if (response.success) {
          this.accessTokenSignal.set(response.data);
        }
        return new Observable<BaseAPIResponse>(observer => {
          observer.next({ success: response.success, message: response.message });
          observer.complete();
        });
      }),
      catchError((exception) => {
        return new Observable<BaseAPIResponse>(observer => {
          observer.next({ success: false, message: exception.message || 'External login failed' });
          observer.complete();
        });
      })
    );
  }

  login(account: LoginModel): Observable<BaseAPIResponse> {
    return this.http.post<APIResponse<string>>(EAuthSystemUrl.loginUrl, account).pipe(
      switchMap((response: APIResponse<string>) => {
        if (response.success) {
          this.accessTokenSignal.set(response.data);
        }
        return new Observable<BaseAPIResponse>(observer => {
          observer.next({ success: response.success, message: response.message });
          observer.complete();
        });
      }),
      catchError((exception) => {
        return new Observable<BaseAPIResponse>(observer => {
          observer.next({ success: false, message: exception.message || 'Login failed' });
          observer.complete();
        });
      })
    );
  }

  refreshToken(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.get<APIResponse<string>>(EAuthSystemUrl.refreshTokenUrl, { withCredentials: true }).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.accessTokenSignal.set(res.data);
          }
          observer.next(res.success);
          observer.complete();
        },
        error: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  checkLogin(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.get(EAuthSystemUrl.validateRefreshTokenUrl, { withCredentials: true }).subscribe({
        next: () => {
          observer.next(true);
          observer.complete();
        },
        error: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  // Async method to fetch and cache current user from server
  getCurrentUserInfor(): Observable<UserLoginInfoModel | null> {
    const currentUser = this.currentUserSignal();
    if (currentUser) {
      return new Observable<UserLoginInfoModel | null>(observer => {
        observer.next(currentUser);
        observer.complete();
      });
    }

    return this.http.get<APIResponse<UserLoginInfoModel>>(EAuthSystemUrl.getCurrentUserUrl, { withCredentials: true }).pipe(
      map((response) => {
        if (response.success && response.data) {
          this.currentUserSignal.set(response.data);
          return response.data;
        }
        return null;
      }),
      catchError((error) => {
        console.error('Failed to fetch current user:', error);
        return new Observable<UserLoginInfoModel | null>(observer => {
          observer.next(null);
          observer.complete();
        });
      })
    );
  }

  logOut(): void {
    this.socialAuthService.signOut(); // Ensure social auth state is cleared before login
    this.http.get(EAuthSystemUrl.logoutUrl, { withCredentials: true }).subscribe({
      next: () => {
        this.accessTokenSignal.set(null);
        this.router.navigateByUrl('/login');
      }
    });
  }
}
