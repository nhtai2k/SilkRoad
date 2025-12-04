import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { JwtModel } from '@models/system-management-models/jwt.model';
import { EMyAccountSystemUrl } from '@common/url-api';
import { ChangePasswordModel } from '@models/system-management-models/change-password.model';

import { LoginModel } from '@models/system-management-models/login.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(private http: HttpClient) { }


  changePassword(changePasswordModel: ChangePasswordModel): Observable<any> {
    return this.http.post<ChangePasswordModel>(EMyAccountSystemUrl.changePasswordUrl, changePasswordModel);
  }

  recoverPassword(email: string): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EMyAccountSystemUrl.recoverPasswordUrl, {email});
  }

  resetPassword(token: string, email: string, password: any, confirmPassword:any): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EMyAccountSystemUrl.resetPasswordUrl, { token, email, password, confirmPassword });
  }
}
