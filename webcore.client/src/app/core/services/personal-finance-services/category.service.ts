import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ECategoryPersonalFinanceUrl } from '@common/url-api';
import { catchError, switchMap } from 'rxjs';

import { CategoryModel } from '@models/personal-finance-models';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryModel>>> {
    return this.http.get<APIResponse<Pagination<CategoryModel>>>(`${ECategoryPersonalFinanceUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  // getOptionList(): Observable<APIResponse<OptionModel[]>> {
  //   const url = EUrl.getOptionListUrlCategoryPF;
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
  //   const url = EUrl.getTreeOptionListUrlCategoryPF;
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

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryModel>>> {
    return this.http.get<APIResponse<Pagination<CategoryModel>>>(`${ECategoryPersonalFinanceUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: number): Observable<APIResponse<CategoryModel>> {
    return this.http.get<APIResponse<CategoryModel>>(`${ECategoryPersonalFinanceUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ECategoryPersonalFinanceUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ECategoryPersonalFinanceUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ECategoryPersonalFinanceUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ECategoryPersonalFinanceUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ECategoryPersonalFinanceUrl.deleteUrl}/${id}`);
  }
}
