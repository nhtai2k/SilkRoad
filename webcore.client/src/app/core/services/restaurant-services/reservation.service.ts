// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { EUrl } from '@common/url-api';
// import { catchError, switchMap } from 'rxjs';
// import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
// import { Pagination } from '@models/pagination.model';
// import { ReservationModel, SearchReservationModel, CreateReservationModel, UpdateReservationModel, CheckInReservationModel } from '@models/restaurant-models/reservation.model';
// // import { ReservationFilterModel } from '@models/qms-models/reservation-filter.model';

// @Injectable({ providedIn: 'root' })
// export class ReservationService {
//   constructor(private http: HttpClient) {}

//   // getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<ReservationModel>>> {
//   //   const url = EUrl.getAllUrlReservation.concat(`/${pageIndex}/${pageSize}`);
//   //   return this.http.get<APIResponse<Pagination<ReservationModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
//   //     catchError(error => {
//   //       if (error.status === 401) {
//   //         return this.authenticationService.ReNewToken().pipe(
//   //           switchMap(() => this.http.get<APIResponse<Pagination<ReservationModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
//   //         );
//   //       } else {
//   //         return throwError(() => error);
//   //       }
//   //     })
//   //   );
//   // }

//   findMany(filter: SearchReservationModel): Observable<APIResponse<Pagination<ReservationModel>>> {
//     const url = EUrl.findManyUrlReservation;
//     return this.http.post<APIResponse<Pagination<ReservationModel>>>(url, filter);
//   }

//   findOne(id: number): Observable<APIResponse<ReservationModel>> {
//     const url = EUrl.findOneUrlReservation + '/' + id;
//     return this.http.get<APIResponse<ReservationModel>>(url);
//   }

//   booking(model: ReservationModel): Observable<BaseAPIResponse> {
//     return this.http.post<BaseAPIResponse>(EUrl.bookingUrlReservation, model);
//   }


//   create(model: CreateReservationModel): Observable<APIResponse<ReservationModel>> {
//     return this.http.post<APIResponse<ReservationModel>>(EUrl.createUrlReservation, model);
//   }

//   update(model: UpdateReservationModel): Observable<APIResponse<ReservationModel>> {
//     return this.http.put<APIResponse<ReservationModel>>(EUrl.updateUrlReservation, model);
//   }

//   checkIn(model: CheckInReservationModel): Observable<APIResponse<ReservationModel>> {
//     return this.http.put<APIResponse<ReservationModel>>(EUrl.checkInUrlReservation, model);
//   }

//   checkOut(Id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.checkOutUrlReservation.concat('/', Id.toString());
//     return this.http.get<BaseAPIResponse>(url);
//   }

// }
