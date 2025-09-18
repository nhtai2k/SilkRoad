import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { OrderModel } from '@models/lipstick-shop-models/order.model';
import { Pagination } from '@models/pagination.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  getAll(query: any): Observable<APIResponse<Pagination<OrderModel>>> {
    return this.http.get<APIResponse<Pagination<OrderModel>>>(EUrl.getAllUrlOrder, { headers: this.authenticationService.GetHeaders(), params: query }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<OrderModel>>>(EUrl.getAllUrlOrder, { headers: this.authenticationService.GetHeaders(), params: query }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: any): Observable<APIResponse<OrderModel>> {
    return this.http.get<APIResponse<OrderModel>>(EUrl.getByIdUrlOrder + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<OrderModel>>(EUrl.getByIdUrlOrder + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(model: OrderModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlOrder, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlOrder, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<OrderModel>>> {
    const url = EUrl.getAllDeletedUrlOrder.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<OrderModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<OrderModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: OrderModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlOrder, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlOrder, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlOrder + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlOrder + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlOrder.concat('/', id.toString());
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
}
