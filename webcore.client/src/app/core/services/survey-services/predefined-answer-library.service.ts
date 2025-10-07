import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PredefinedAnswerLibraryModel } from '@models/survey-models/predefined-answer-library.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredefinedAnswerLibraryService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getByQuestionLibraryId(questionLibraryId: any): Observable<APIResponse<PredefinedAnswerLibraryModel[]>> {
    return this.http.get<APIResponse<PredefinedAnswerLibraryModel[]>>(EUrl.getByQuestionLibraryIdUrlPredefinedAnswerLibrary + `/${questionLibraryId}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<PredefinedAnswerLibraryModel[]>>(EUrl.getByQuestionLibraryIdUrlPredefinedAnswerLibrary + `/${questionLibraryId}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: any): Observable<APIResponse<PredefinedAnswerLibraryModel>> {
    return this.http.get<APIResponse<PredefinedAnswerLibraryModel>>(EUrl.getByIdUrlPredefinedAnswerLibrary + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<PredefinedAnswerLibraryModel>>(EUrl.getByIdUrlPredefinedAnswerLibrary + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(model: PredefinedAnswerLibraryModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlPredefinedAnswerLibrary, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlPredefinedAnswerLibrary, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: PredefinedAnswerLibraryModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlPredefinedAnswerLibrary, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlPredefinedAnswerLibrary, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.deleteUrlPredefinedAnswerLibrary + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(EUrl.deleteUrlPredefinedAnswerLibrary + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
