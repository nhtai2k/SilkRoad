import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { AnswerModel } from '@models/survey-models/answer.model';
import { ParticipantModel } from '@models/survey-models/participant.model';
// import { SurveyUIModel } from '@models/survey-models/survey-ui.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  getAll(query: any): Observable<APIResponse<Pagination<ParticipantModel>>> {
    return this.http.get<APIResponse<Pagination<ParticipantModel>>>(EUrl.getAllUrlParticipant, { headers: this.authenticationService.getHeaders(), params: query }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<ParticipantModel>>>(EUrl.getAllUrlParticipant, { headers: this.authenticationService.getHeaders(), params: query }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  filter(query: any): Observable<APIResponse<Pagination<ParticipantModel>>> {
    return this.http.post<APIResponse<Pagination<ParticipantModel>>>(EUrl.filterUrlParticipant, query, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<Pagination<ParticipantModel>>>(EUrl.filterUrlParticipant, query, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  
  // getEagerById(id: any): Observable<APIResponse<SurveyUIModel>> {
  //   return this.http.get<APIResponse<SurveyUIModel>>(EUrl.getEagerByIdUrlParticipant + `/${id}`, { headers: this.authenticationService.getHeaders() }).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.reNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<SurveyUIModel>>(EUrl.getEagerByIdUrlParticipant + `/${id}`, { headers: this.authenticationService.getHeaders() }))
  //         );
  //       } else {
  //         return throwError(() => error);
  //       }
  //     })
  //   );
  // }

  initParticipant(model: ParticipantModel): Observable<APIResponse<ParticipantModel>> {
    return this.http.post<APIResponse<ParticipantModel>>(EUrl.initParticipantUrlParticipant, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<ParticipantModel>>(EUrl.initParticipantUrlParticipant, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  addAnswers(answers: AnswerModel[]): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EUrl.addAnswersUrlParticipant, JSON.stringify(answers), { headers: this.authenticationService.getHeaders().set('Content-Type', 'application/json') }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<boolean>>(EUrl.addAnswersUrlParticipant, JSON.stringify(answers), { headers: this.authenticationService.getHeaders().set('Content-Type', 'application/json') }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  highlight(id: number): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EUrl.highlightUrlParticipant + `/${id}`, null, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<boolean>>(EUrl.highlightUrlParticipant + `/${id}`, null, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  removeHighlight(id: number): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EUrl.removeHighlightUrlParticipant + `/${id}`, null, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<boolean>>(EUrl.removeHighlightUrlParticipant + `/${id}`, null, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  reject(participantId: any, reason: any): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EUrl.rejectUrlParticipant + `/${participantId}`, JSON.stringify(reason), { headers: this.authenticationService.getHeaders().set('Content-Type', 'application/json') }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<boolean>>(EUrl.rejectUrlParticipant + `/${participantId}`, JSON.stringify(reason), { headers: this.authenticationService.getHeaders().set('Content-Type', 'application/json') }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
