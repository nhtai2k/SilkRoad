import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { QuestionModel } from '@models/survey-models/question.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getById(id: any): Observable<APIResponse<QuestionModel>> {
    return this.http.get<APIResponse<QuestionModel>>(EUrl.getByIdUrlQuestion + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<QuestionModel>>(EUrl.getByIdUrlQuestion + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getEagerLoadingById(id: any): Observable<APIResponse<QuestionModel>> {
    return this.http.get<APIResponse<QuestionModel>>(EUrl.getEagerLoadingByIdUrlQuestion + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
            return this.authenticationService.ReNewToken().pipe(
                switchMap(() => this.http.get<APIResponse<QuestionModel>>(EUrl.getEagerLoadingByIdUrlQuestion + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
            );
        }
        else {
            return throwError(() => error);
        }
      })
    );
  }


  create(model: QuestionModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlQuestion, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlQuestion, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  update(model: QuestionModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlQuestion, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlQuestion, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getBySurveyFormId(surveyFormId: any): Observable<APIResponse<QuestionModel[]>> {
    return this.http.get<APIResponse<QuestionModel[]>>(EUrl.getBySurveyFormIdUrlQuestion + `/${surveyFormId}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<QuestionModel[]>>(EUrl.getBySurveyFormIdUrlQuestion + `/${surveyFormId}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getByQuestionGroupId(questionGroupId: any): Observable<APIResponse<QuestionModel[]>> {
    return this.http.get<APIResponse<QuestionModel[]>>(EUrl.getByQuestionGroupIdUrlQuestion + `/${questionGroupId}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<QuestionModel[]>>(EUrl.getByQuestionGroupIdUrlQuestion + `/${questionGroupId}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.deleteUrlQuestion + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(EUrl.deleteUrlQuestion + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
