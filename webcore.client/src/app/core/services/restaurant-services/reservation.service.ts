import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EUrl } from '@common/url-api';
import { catchError, switchMap } from 'rxjs';
import { AuthenticationService } from '../system-services/authentication.service';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ReservationModel } from '@models/restaurant-models/reservation.model';
// import { ReservationFilterModel } from '@models/qms-models/reservation-filter.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  // getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<ReservationModel>>> {
  //   const url = EUrl.getAllUrlReservation.concat(`/${pageIndex}/${pageSize}`);
  //   return this.http.get<APIResponse<Pagination<ReservationModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.ReNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<Pagination<ReservationModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
  //         );
  //       } else {
  //         return throwError(() => error);
  //       }
  //     })
  //   );
  // }

  getByFilter(filter: any): Observable<APIResponse<Pagination<ReservationModel>>> {
    const url = EUrl.getByFilterUrlReservation;
    return this.http.post<APIResponse<Pagination<ReservationModel>>>(url, filter, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<Pagination<ReservationModel>>>(url, filter, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: number): Observable<APIResponse<ReservationModel>> {
    const url = EUrl.getByIdUrlReservation.concat('/',id.toString());
    return this.http.get<APIResponse<ReservationModel>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<ReservationModel>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  booking(model: ReservationModel): Observable<BaseAPIResponse> {
    return this.http.post<APIResponse<ReservationModel>>(EUrl.bookingUrlReservation, model, { headers: this.authenticationService.GetHeaders() });
  }


  create(model: ReservationModel): Observable<BaseAPIResponse> {
    return this.http.post<APIResponse<ReservationModel>>(EUrl.createUrlReservation, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<ReservationModel>>(EUrl.createUrlReservation, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: ReservationModel): Observable<BaseAPIResponse> {
    return this.http.put<APIResponse<ReservationModel>>(EUrl.updateUrlReservation, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<APIResponse<ReservationModel>>(EUrl.updateUrlReservation, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  checkIn(model: ReservationModel): Observable<BaseAPIResponse> {
    return this.http.put<APIResponse<ReservationModel>>(EUrl.checkInUrlReservation, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<APIResponse<ReservationModel>>(EUrl.checkInUrlReservation, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  checkOut(Id: number): Observable<BaseAPIResponse> {
    const url = EUrl.checkOutUrlReservation.concat('/', Id.toString());
    return this.http.get<APIResponse<ReservationModel>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<ReservationModel>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

}
