import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EStoreSurveyUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { OptionModel } from '@models/option.model';
import { Pagination } from '@models/pagination.model';
import { StoreModel } from '@models/survey-models/store.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {  
  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<StoreModel>>> {
    const url = `${EStoreSurveyUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<StoreModel>>>(url);
  }
//   getAllActive(): Observable<APIResponse<StoreModel[]>> {
//     return this.http.get<APIResponse<StoreModel[]>>(EUrl.getAllActiveUrlStore, { headers: this.authenticationService.getHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.reNewToken().pipe(
//             switchMap(() => this.http.get<APIResponse<StoreModel[]>>(EUrl.getAllActiveUrlStore, { headers: this.authenticationService.getHeaders() }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }
  getById(id: any): Observable<APIResponse<StoreModel>> {
    return this.http.get<APIResponse<StoreModel>>(`${EStoreSurveyUrl.getByIdUrl}/${id}`);
  }
 
  getOptionList(): Observable<APIResponse<OptionModel[]>> {
      return this.http.get<APIResponse<OptionModel[]>>(EStoreSurveyUrl.getOptionListUrl);
    }

  create(model: StoreModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EStoreSurveyUrl.createUrl, model);
  }

  update(model: StoreModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EStoreSurveyUrl.updateUrl, model);
  }

  softDelete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EStoreSurveyUrl.softDeleteUrl}/${id}`);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<StoreModel>>> {
    return this.http.get<APIResponse<Pagination<StoreModel>>>(`${EStoreSurveyUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  restore(id: any): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EStoreSurveyUrl.restoreUrl}/${id}`, {});
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EStoreSurveyUrl.deleteUrl}/${id}`);
  }
}
