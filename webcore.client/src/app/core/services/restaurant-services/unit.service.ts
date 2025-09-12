import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EUrl } from '@common/url-api';
import { catchError, switchMap } from 'rxjs';
import { AuthenticationService } from '../system-services/authentication.service';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { UnitModel } from '@models/restaurant-models/unit.model';

@Injectable({ providedIn: 'root' })
export class UnitService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<UnitModel>>> {
    const url = EUrl.getAllUrlUnit.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<UnitModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<UnitModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EUrl.getOptionListUrlUnit;
    return this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<UnitModel>>> {
    const url = EUrl.getAllDeletedUrlUnit.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<UnitModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<UnitModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: number): Observable<APIResponse<UnitModel>> {
    const url = EUrl.getByIdUrlUnit.concat('/',id.toString());
    return this.http.get<APIResponse<UnitModel>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<UnitModel>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(model: UnitModel): Observable<BaseAPIResponse> {
    return this.http.post<APIResponse<UnitModel>>(EUrl.createUrlUnit, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<UnitModel>>(EUrl.createUrlUnit, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: UnitModel): Observable<BaseAPIResponse> {
    return this.http.put<APIResponse<UnitModel>>(EUrl.updateUrlUnit, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<APIResponse<UnitModel>>(EUrl.updateUrlUnit, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlUnit.concat('/',id.toString());
    return this.http.put<APIResponse<void>>(url, {}, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<APIResponse<void>>(url, {}, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlUnit.concat('/',id.toString());
    return this.http.put<APIResponse<void>>(url, {}, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<APIResponse<void>>(url, {}, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlUnit.concat('/',id.toString());
    return this.http.delete<APIResponse<void>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.delete<APIResponse<void>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
