// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { EUrl } from '@common/url-api';
// import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
// import { Pagination } from '@models/pagination.model';
// import { QuestionGroupModel } from '@models/survey-models/question-group.model';
// import { AuthenticationService } from '@services/system-services/authentication.service';
// import { catchError, Observable, switchMap, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class QuestionGroupService {
//   constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
//   getAll(query: any): Observable<APIResponse<Pagination<QuestionGroupModel>>> {
//     return this.http.get<APIResponse<Pagination<QuestionGroupModel>>>(EUrl.getAllUrlQuestionGroup, { headers: this.authenticationService.GetHeaders(), params: query }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.get<APIResponse<Pagination<QuestionGroupModel>>>(EUrl.getAllUrlQuestionGroup, { headers: this.authenticationService.GetHeaders(), params: query }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }

//   getAllActive(): Observable<APIResponse<QuestionGroupModel[]>> {
//     return this.http.get<APIResponse<QuestionGroupModel[]>>(EUrl.getAllActiveUrlQuestionGroup, { headers: this.authenticationService.GetHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.get<APIResponse<QuestionGroupModel[]>>(EUrl.getAllActiveUrlQuestionGroup, { headers: this.authenticationService.GetHeaders() }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }

//   getById(id: any): Observable<APIResponse<QuestionGroupModel>> {
//     return this.http.get<APIResponse<QuestionGroupModel>>(EUrl.getByIdUrlQuestionGroup + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.get<APIResponse<QuestionGroupModel>>(EUrl.getByIdUrlQuestionGroup + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }

//   getEagerById(id: any): Observable<APIResponse<QuestionGroupModel>> {
//     return this.http.get<APIResponse<QuestionGroupModel>>(EUrl.getEagerByIdUrlQuestionGroup + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.get<APIResponse<QuestionGroupModel>>(EUrl.getEagerByIdUrlQuestionGroup + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }

//   getEagerAllElements(): Observable<APIResponse<QuestionGroupModel[]>> {
//     return this.http.get<APIResponse<QuestionGroupModel[]>>(EUrl.getEagerAllElementsUrlQuestionGroup, { headers: this.authenticationService.GetHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.get<APIResponse<QuestionGroupModel[]>>(EUrl.getEagerAllElementsUrlQuestionGroup, { headers: this.authenticationService.GetHeaders() }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }
  
//   create(questiongroup: QuestionGroupModel): Observable<BaseAPIResponse> {
//     return this.http.post<BaseAPIResponse>(EUrl.createUrlQuestionGroup, questiongroup, { headers: this.authenticationService.GetHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlQuestionGroup, questiongroup, { headers: this.authenticationService.GetHeaders() }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }
  
//   update(questiongroup: QuestionGroupModel): Observable<BaseAPIResponse> {
//     return this.http.put<BaseAPIResponse>(EUrl.updateUrlQuestionGroup, questiongroup, { headers: this.authenticationService.GetHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlQuestionGroup, questiongroup, { headers: this.authenticationService.GetHeaders() }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }
  
//   softDelete(id: any): Observable<BaseAPIResponse> {
//     return this.http.put<BaseAPIResponse>(EUrl.softDeleteUrlQuestionGroup + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.put<BaseAPIResponse>(EUrl.softDeleteUrlQuestionGroup + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }
// }
