import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AccountModel } from '@models/system-management-models/account.model';
import { EUrl } from '@common/url-api';
import { AuthenticationService } from './authentication.service';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  // getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<AccountModel>>> {
  //   return this.http.get<APIResponse<Pagination<AccountModel>>>(EUrl.getAllUrlAccount + `/${pageIndex}/${pageSize}`, { headers: this.authenticationService.getHeaders() }).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.reNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<Pagination<AccountModel>>>(EUrl.getAllUrlAccount + `/${pageIndex}/${pageSize}`, { headers: this.authenticationService.getHeaders() }))
  //         );
  //       } else {
  //          return throwError(() => error);
  //       }
  //     })
  //   );
  // }
  getAll(pageIndex: number, pageSize: number, roleId: number, textSearch: string): Observable<APIResponse<Pagination<AccountModel>>> {
    const url = EUrl.getAllUrlAccount + `/${pageIndex}/${pageSize}` + `?roleId=${roleId}&textSearch=${encodeURIComponent(textSearch)}`;
    return this.http.get<APIResponse<Pagination<AccountModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<AccountModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getById(id: number): Observable<APIResponse<AccountModel>> {
    return this.http.get<APIResponse<AccountModel>>(`${EUrl.getByIdUrlAccount}${id}`, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<AccountModel>>(`${EUrl.getByIdUrlAccount}${id}`, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
           return throwError(() => error);
        }
      })
    );
  }

  create(account: AccountModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlAccount, account, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlAccount, account, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
           return throwError(() => error);
        }
      })
    );
  }

  update(account: AccountModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlAccount, account, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlAccount, account, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
           return throwError(() => error);
        }
      })
    );
  }
  deactivateUser(id: number): Observable<BaseAPIResponse> {
    const url = `${EUrl.deactivateUserUrlAccount}${id}`;
    return this.http.put<BaseAPIResponse>(url, null, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, null, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  activateUser(id: number): Observable<BaseAPIResponse> {
    const url = `${EUrl.activateUserUrlAccount}${id}`;
    return this.http.put<BaseAPIResponse>(url, null, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, null, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  // deleteAccount(id: number): Observable<any> {
  //   return this.http.delete<any>(EUrl.deleteUrlAccount + id);
  // }

}
