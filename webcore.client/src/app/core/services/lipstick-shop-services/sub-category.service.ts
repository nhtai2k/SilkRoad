import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { SubCategoryViewModel } from '@models/lipstick-shop-models/sub-category.model';
import { Pagination } from '@models/pagination.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
 constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  getAll(pageIndex:number, pageSize : number, categoryId: number): Observable<APIResponse<Pagination<SubCategoryViewModel>>> {
    return this.http.get<APIResponse<Pagination<SubCategoryViewModel>>>(EUrl.getAllUrlSubCategory + `/${pageIndex}/${pageSize}/${categoryId}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<SubCategoryViewModel>>>(EUrl.getAllUrlSubCategory + `/${pageIndex}/${pageSize}/${categoryId}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getAllActive(): Observable<APIResponse<SubCategoryViewModel[]>> {
    return this.http.get<APIResponse<SubCategoryViewModel[]>>(EUrl.getAllActiveUrlSubCategory, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<SubCategoryViewModel[]>>(EUrl.getAllActiveUrlSubCategory, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getByCategoryId(categoryId:number): Observable<APIResponse<SubCategoryViewModel[]>> {
    return this.http.get<APIResponse<SubCategoryViewModel[]>>(EUrl.getByCategoryIdUrlSubCategory + `/${categoryId}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<SubCategoryViewModel[]>>(EUrl.getByCategoryIdUrlSubCategory + `/${categoryId}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: any): Observable<APIResponse<SubCategoryViewModel>> {
    return this.http.get<APIResponse<SubCategoryViewModel>>(EUrl.getByIdUrlSubCategory + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<SubCategoryViewModel>>(EUrl.getByIdUrlSubCategory + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(model: SubCategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlSubCategory, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlSubCategory, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: SubCategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlSubCategory, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlSubCategory, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SubCategoryViewModel>>> {
    const url = EUrl.getAllDeletedUrlSubCategory.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<SubCategoryViewModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<SubCategoryViewModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  softDelete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlSubCategory + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlSubCategory + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlSubCategory.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlSubCategory.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
