import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { OptionModel } from '@models/option.model';
import { Pagination } from '@models/pagination.model';
import { StoreModel } from '@models/survey-models/store.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<StoreModel>>> {
    const url = EUrl.getAllUrlStore +'/' + pageIndex + '/' + pageSize;
    return this.http.get<APIResponse<Pagination<StoreModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<StoreModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
//   getAllActive(): Observable<APIResponse<StoreModel[]>> {
//     return this.http.get<APIResponse<StoreModel[]>>(EUrl.getAllActiveUrlStore, { headers: this.authenticationService.getHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.reNewToken().pipe(
//             switchMap(() => this.http.get<APIResponse<StoreModel[]>>(EUrl.getAllActiveUrlStore, { headers: this.authenticationService.getHeaders() }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }
  getById(id: any): Observable<APIResponse<StoreModel>> {
    return this.http.get<APIResponse<StoreModel>>(EUrl.getByIdUrlStore + `/${id}`, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<StoreModel>>(EUrl.getByIdUrlStore + `/${id}`, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
 getOptionList(): Observable<APIResponse<OptionModel[]>> {
      const url = EUrl.getOptionListUrlStore;
      return this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
        catchError(error => {
          if (error.status === 401) {
            return this.authenticationService.reNewToken().pipe(
              switchMap(() => this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }))
            );
          } else {
            return throwError(() =>error);
          }
        })
      );
    }
  create(model: StoreModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlStore, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlStore, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  update(model: StoreModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlStore, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlStore, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  softDelete(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlStore + `/${id}`;
    return this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<StoreModel>>> {
    const url = EUrl.getAllDeletedUrlStore + `/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<StoreModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<StoreModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  restore(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlStore + `/${id}`;
    return this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  delete(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlStore + `/${id}`;
    return this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
