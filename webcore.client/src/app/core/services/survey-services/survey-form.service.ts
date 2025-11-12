import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyFormService {  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SurveyFormModel>>> {
    const url = EUrl.getAllUrlSurveyForm +'/' + pageIndex + '/' + pageSize;
    return this.http.get<APIResponse<Pagination<SurveyFormModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<SurveyFormModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getAllActive(): Observable<APIResponse<SurveyFormModel[]>> {
    return this.http.get<APIResponse<SurveyFormModel[]>>(EUrl.getAllActiveUrlSurveyForm, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<SurveyFormModel[]>>(EUrl.getAllActiveUrlSurveyForm, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: any): Observable<APIResponse<SurveyFormModel>> {
    return this.http.get<APIResponse<SurveyFormModel>>(EUrl.getByIdUrlSurveyForm + `/${id}`, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<SurveyFormModel>>(EUrl.getByIdUrlSurveyForm + `/${id}`, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getEagerById(id: any): Observable<APIResponse<SurveyFormModel>> {
    const url = EUrl.getEagerByIdUrlSurveyForm + `/${id}`;
    return this.http.get<APIResponse<SurveyFormModel>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<SurveyFormModel>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getEagerUIById(id: any): Observable<APIResponse<SurveyFormModel>> {
    return this.http.get<APIResponse<SurveyFormModel>>(EUrl.getEagerUIByIdUrlSurveyForm + `/${id}`, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<SurveyFormModel>>(EUrl.getEagerUIByIdUrlSurveyForm + `/${id}`, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(model: SurveyFormModel): Observable<APIResponse<SurveyFormModel>> {
    return this.http.post<APIResponse<SurveyFormModel>>(EUrl.createUrlSurveyForm, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<APIResponse<SurveyFormModel>>(EUrl.createUrlSurveyForm, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: SurveyFormModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlSurveyForm, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlSurveyForm, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  softDelete(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlSurveyForm + `/${id}`;
    return this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SurveyFormModel>>> {
    const url = EUrl.getAllDeletedUrlSurveyForm + `/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<SurveyFormModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<SurveyFormModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  restore(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlSurveyForm + `/${id}`;
    return this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  delete(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlSurveyForm + `/${id}`;
    return this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  public(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.publicUrlSurveyForm + `/${id}`;
    return this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  checkValidForm(id: any): Observable<APIResponse<boolean>> {
    const url = EUrl.checkValidFormUrlSurveyForm + `/${id}`;
    return this.http.get<APIResponse<boolean>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<boolean>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
