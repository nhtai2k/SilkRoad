import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { EAuthSystemUrl } from '@common/url-api';
import { JwtModel } from '@models/system-management-models/jwt.model';
import { jwtDecode } from 'jwt-decode';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { LoginModel } from '@models/system-management-models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private accessTokenSignal = signal<string | null>(null);

  accessToken = computed(() => this.accessTokenSignal());
  isLoggedIn = computed(() => !!this.accessTokenSignal());

  constructor(private http: HttpClient) { }


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

  logOut(): void {
    this.http.get(EAuthSystemUrl.logoutUrl, { withCredentials: true }).subscribe({
      next: () => {
        this.accessTokenSignal.set(null);
      }
    });
  }

  getUserId(): any {
    const token = this.accessTokenSignal();
    if (token) {
      const claims = jwtDecode<any>(token);
      return claims?.Id;
    }
    return null;
  }
  // setToken(token: string): void {
  //   this.accessTokenSignal.set(token);
  // }

  // clear(): void {
  //   this.accessTokenSignal.set(null);
  // }
}
