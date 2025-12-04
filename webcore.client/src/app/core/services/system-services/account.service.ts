import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountModel } from '@models/system-management-models/account.model';
import { EAccountSystemUrl } from '@common/url-api';

import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  // getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<AccountModel>>> {
  //   return this.http.get<APIResponse<Pagination<AccountModel>>>(EUrl.getAllUrlAccount + `/${pageIndex}/${pageSize}`).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.reNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<Pagination<AccountModel>>>(EUrl.getAllUrlAccount + `/${pageIndex}/${pageSize}`))
  //         );
  //       } else {
  //          return throwError(() => error);
  //       }
  //     })
  //   );
  // }
  getAll(pageIndex: number, pageSize: number, roleId: number, textSearch: string): Observable<APIResponse<Pagination<AccountModel>>> {
    const url = `${EAccountSystemUrl.getAllUrl}/${pageIndex}/${pageSize}?roleId=${roleId}&textSearch=${encodeURIComponent(textSearch)}`;
    return this.http.get<APIResponse<Pagination<AccountModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<AccountModel>> {
    return this.http.get<APIResponse<AccountModel>>(`${EAccountSystemUrl.getByIdUrl}${id}`);
  }

  create(account: AccountModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EAccountSystemUrl.createUrl, account);
  }

  update(account: AccountModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EAccountSystemUrl.updateUrl, account);
  }

  deactivateUser(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EAccountSystemUrl.deactivateUserUrl}${id}`, null);
  }

  activateUser(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EAccountSystemUrl.activateUserUrl}${id}`, null);
  }
  // deleteAccount(id: number): Observable<any> {
  //   return this.http.delete<any>(EUrl.deleteUrlAccount + id);
  // }

}
