import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PageTypeViewModel } from '@models/lipstick-shop-models/page-type.model';
import { Pagination } from '@models/pagination.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTypeService {

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  getAll(pageIndex: number, pagePageType: number): Observable<APIResponse<Pagination<PageTypeViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageTypeViewModel>>>(EUrl.getAllUrlPageType + `/${pageIndex}/${pagePageType}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<PageTypeViewModel>>>(EUrl.getAllUrlPageType + `/${pageIndex}/${pagePageType}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getAllActive(): Observable<APIResponse<PageTypeViewModel[]>> {
    return this.http.get<APIResponse<PageTypeViewModel[]>>(EUrl.getAllActiveUrlPageType, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<PageTypeViewModel[]>>(EUrl.getAllActiveUrlPageType, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getEPageType(): Observable<APIResponse<string[]>> {
    return this.http.get<APIResponse<string[]>>(EUrl.getEPageTypeUrlPageType, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<string[]>>(EUrl.getEPageTypeUrlPageType, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: any): Observable<APIResponse<PageTypeViewModel>> {
    return this.http.get<APIResponse<PageTypeViewModel>>(EUrl.getByIdUrlPageType + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<PageTypeViewModel>>(EUrl.getByIdUrlPageType + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(model: PageTypeViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlPageType, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlPageType, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: PageTypeViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlPageType, model, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlPageType, model, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageTypeViewModel>>> {
    const url = EUrl.getAllDeletedUrlPageType.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<PageTypeViewModel>>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<PageTypeViewModel>>>(url, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  softDelete(id:number):Observable<BaseAPIResponse>{
  return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlPageType+`/${id}`,{headers:this.authenticationService.GetHeaders()}).pipe(
    catchError(error=>{
      if(error.status===401){
        return this.authenticationService.ReNewToken().pipe(
          switchMap(()=>this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlPageType+`/${id}`,{headers:this.authenticationService.GetHeaders()}))
        );
      }else{
        return throwError(() => error);
      }
    })
  );
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlPageType.concat('/', id.toString());
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
    const url = EUrl.deleteUrlPageType.concat('/', id.toString());
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
