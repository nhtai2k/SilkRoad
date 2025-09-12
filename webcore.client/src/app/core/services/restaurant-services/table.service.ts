import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EUrl } from '@common/url-api';
import { catchError, switchMap } from 'rxjs';
import { AuthenticationService } from '../system-services/authentication.service';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { TableModel } from '@models/restaurant-models/table.model';

@Injectable({ providedIn: 'root' })
export class TableService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<TableModel>>> {
    const url = EUrl.getAllUrlTable.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<TableModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<TableModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EUrl.getOptionListUrlTable;
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

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<TableModel>>> {
    const url = EUrl.getAllDeletedUrlTable.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<TableModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<TableModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: number): Observable<APIResponse<TableModel>> {
    const url = EUrl.getByIdUrlTable.concat('/',id.toString());
    return this.http.get<APIResponse<TableModel>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<TableModel>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(model: TableModel): Observable<BaseAPIResponse> {
    return this.http.post<APIResponse<TableModel>>(EUrl.createUrlTable, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<TableModel>>(EUrl.createUrlTable, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: TableModel): Observable<BaseAPIResponse> {
    return this.http.put<APIResponse<TableModel>>(EUrl.updateUrlTable, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<APIResponse<TableModel>>(EUrl.updateUrlTable, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlTable.concat('/',id.toString());
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
    const url = EUrl.restoreUrlTable.concat('/',id.toString());
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
    const url = EUrl.deleteUrlTable.concat('/',id.toString());
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
