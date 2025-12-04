import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ESubCategoryPersonalFinanceUrl } from '@common/url-api';

import { SubCategoryModel } from '@models/personal-finance-models';

@Injectable({ providedIn: 'root' })
export class SubCategoryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SubCategoryModel>>> {
    return this.http.get<APIResponse<Pagination<SubCategoryModel>>>(`${ESubCategoryPersonalFinanceUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  // getOptionList(): Observable<APIResponse<OptionModel[]>> {
  //   const url = EUrl.getOptionListUrlSubCategoryPF;
  //   return this.http.get<APIResponse<OptionModel[]>>(url).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.reNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<OptionModel[]>>(url))
  //         );
  //       } else {
  //         return throwError(() =>error);
  //       }
  //     })
  //   );
  // }
  //   getTreeOptionList(): Observable<APIResponse<OptionModel[]>> {
  //   const url = EUrl.getTreeOptionListUrlSubCategoryPF;
  //   return this.http.get<APIResponse<OptionModel[]>>(url).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.reNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<OptionModel[]>>(url))
  //         );
  //       } else {
  //         return throwError(() =>error);
  //       }
  //     })
  //   );
  // }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SubCategoryModel>>> {
    return this.http.get<APIResponse<Pagination<SubCategoryModel>>>(`${ESubCategoryPersonalFinanceUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: number): Observable<APIResponse<SubCategoryModel>> {
    return this.http.get<APIResponse<SubCategoryModel>>(`${ESubCategoryPersonalFinanceUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ESubCategoryPersonalFinanceUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ESubCategoryPersonalFinanceUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ESubCategoryPersonalFinanceUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ESubCategoryPersonalFinanceUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ESubCategoryPersonalFinanceUrl.deleteUrl}/${id}`);
  }
}
