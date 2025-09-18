import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EUrl } from '@common/url-api';
import { catchError, switchMap } from 'rxjs';
import { AuthenticationService } from '../../services/system-services/authentication.service';
import { IndustryModel } from '@models/stock-models/industry.model';

@Injectable({ providedIn: 'root' })
export class IndustryService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<IndustryModel>>> {
    const url = EUrl.getAllUrlIndustry.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<IndustryModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<IndustryModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getAllActive(pageIndex: number, pageSize: number, search?: string): Observable<APIResponse<Pagination<IndustryModel>>> {
    let url = EUrl.getAllActiveUrlIndustry.concat(`/${pageIndex}/${pageSize}`);
    if (search) url = url.concat(`/${encodeURIComponent(search)}`);
    return this.http.get<APIResponse<Pagination<IndustryModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<IndustryModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<IndustryModel>>> {
    const url = EUrl.getAllDeletedUrlIndustry.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<IndustryModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<IndustryModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: number): Observable<APIResponse<IndustryModel>> {
    const url = EUrl.getByIdUrlIndustry.concat('/', id.toString());
    return this.http.get<APIResponse<IndustryModel>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<IndustryModel>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(model: IndustryModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlIndustry, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlIndustry, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: IndustryModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlIndustry, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlIndustry, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlIndustry.concat('/', id.toString());
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

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlIndustry.concat('/', id.toString());
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
    const url = EUrl.deleteUrlIndustry.concat('/', id.toString());
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
