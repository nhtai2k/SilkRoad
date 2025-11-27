import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EUrl } from '@common/url-api';
import { catchError, switchMap } from 'rxjs';
import { AuthenticationService } from '../system-services/authentication.service';
import { CategoryModel } from '@models/personal-finance-models';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryModel>>> {
    const url = EUrl.getAllUrlCategoryPF.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<CategoryModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<CategoryModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  // getOptionList(): Observable<APIResponse<OptionModel[]>> {
  //   const url = EUrl.getOptionListUrlCategoryPF;
  //   return this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.reNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }))
  //         );
  //       } else {
  //         return throwError(() =>error);
  //       }
  //     })
  //   );
  // }
  //   getTreeOptionList(): Observable<APIResponse<OptionModel[]>> {
  //   const url = EUrl.getTreeOptionListUrlCategoryPF;
  //   return this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.reNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }))
  //         );
  //       } else {
  //         return throwError(() =>error);
  //       }
  //     })
  //   );
  // }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryModel>>> {
    const url = EUrl.getAllDeletedUrlCategoryPF.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<CategoryModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<CategoryModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  getById(id: number): Observable<APIResponse<CategoryModel>> {
    const url = EUrl.getByIdUrlCategoryPF.concat('/',id.toString());
    return this.http.get<APIResponse<CategoryModel>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<CategoryModel>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    const url = EUrl.createUrlCategoryPF;
    return this.http.post<BaseAPIResponse>(url, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(url, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlCategoryPF, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlCategoryPF, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlCategoryPF.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlCategoryPF.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlCategoryPF.concat('/',id.toString());
    return this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }
}
