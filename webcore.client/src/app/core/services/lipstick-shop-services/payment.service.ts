import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { PaymentViewModel } from '@models/lipstick-shop-models/payment.model';
import { Pagination } from '@models/pagination.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  getAll(query: any): Observable<APIResponse<Pagination<PaymentViewModel>>> {
    return this.http.get<APIResponse<Pagination<PaymentViewModel>>>(EUrl.getAllUrlPayment, { headers: this.authenticationService.GetHeaders(), params: query }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<PaymentViewModel>>>(EUrl.getAllUrlPayment, { headers: this.authenticationService.GetHeaders(), params: query }))
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

  getById(id: any): Observable<APIResponse<PaymentViewModel>> {
    return this.http.get<APIResponse<PaymentViewModel>>(EUrl.getByIdUrlPayment + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<PaymentViewModel>>(EUrl.getByIdUrlPayment + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
