import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PageIntroductionViewModel } from '@models/lipstick-shop-models/page-introduction.model';
import { Pagination } from '@models/pagination.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageIntroductionService {

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  getAll(pageTypeId: number, pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageIntroductionViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageIntroductionViewModel>>>(EUrl.getAllUrlPageIntroduction + `/${pageTypeId}/${pageIndex}/${pageSize}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<PageIntroductionViewModel>>>(EUrl.getAllUrlPageIntroduction + `/${pageTypeId}/${pageIndex}/${pageSize}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getAllActive(): Observable<APIResponse<PageIntroductionViewModel[]>> {
    return this.http.get<APIResponse<PageIntroductionViewModel[]>>(EUrl.getAllActiveUrlPageIntroduction, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<PageIntroductionViewModel[]>>(EUrl.getAllActiveUrlPageIntroduction, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: any): Observable<APIResponse<PageIntroductionViewModel>> {
    return this.http.get<APIResponse<PageIntroductionViewModel>>(EUrl.getByIdUrlPageIntroduction + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<PageIntroductionViewModel>>(EUrl.getByIdUrlPageIntroduction + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(formData: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlPageIntroduction, formData, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlPageIntroduction, formData, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(formData: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlPageIntroduction, formData, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlPageIntroduction, formData, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageIntroductionViewModel>>> {
    const url = EUrl.getAllDeletedUrlPageIntroduction.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<PageIntroductionViewModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<PageIntroductionViewModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  softDelete(id:number):Observable<BaseAPIResponse>{
  return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlPageIntroduction+`/${id}`,{headers:this.authenticationService.GetHeaders()}).pipe(
    catchError(error=>{
      if(error.status===401){
        return this.authenticationService.ReNewToken().pipe(
          switchMap(()=>this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlPageIntroduction+`/${id}`,{headers:this.authenticationService.GetHeaders()}))
        );
      }else{
        return throwError(() => error);
      }
    })
  );
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlPageIntroduction.concat('/', id.toString());
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

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlPageIntroduction.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
