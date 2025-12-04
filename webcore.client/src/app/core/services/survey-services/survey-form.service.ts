import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ESurveyFormSurveyUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyFormService {
  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SurveyFormModel>>> {
    return this.http.get<APIResponse<Pagination<SurveyFormModel>>>(`${ESurveyFormSurveyUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  filter(filter: any): Observable<APIResponse<Pagination<SurveyFormModel>>> {
    return this.http.post<APIResponse<Pagination<SurveyFormModel>>>(ESurveyFormSurveyUrl.filterUrl, filter);
  }

  getAllActive(): Observable<APIResponse<SurveyFormModel[]>> {
    return this.http.get<APIResponse<SurveyFormModel[]>>(ESurveyFormSurveyUrl.getAllActiveUrl);
  }

  getById(id: any): Observable<APIResponse<SurveyFormModel>> {
    return this.http.get<APIResponse<SurveyFormModel>>(`${ESurveyFormSurveyUrl.getByIdUrl}/${id}`);
  }

  getEagerById(id: any): Observable<APIResponse<SurveyFormModel>> {
    return this.http.get<APIResponse<SurveyFormModel>>(`${ESurveyFormSurveyUrl.getEagerByIdUrl}/${id}`);
  }

  getPublicFormById(id: any): Observable<APIResponse<SurveyFormModel>> {
    return this.http.get<APIResponse<SurveyFormModel>>(`${ESurveyFormSurveyUrl.getPublicFormByIdUrl}/${id}`);
  }

  getReviewFormById(id: any): Observable<APIResponse<SurveyFormModel>> {
    return this.http.get<APIResponse<SurveyFormModel>>(`${ESurveyFormSurveyUrl.getReviewFormByIdUrl}/${id}`);
  }

  create(model: SurveyFormModel): Observable<APIResponse<SurveyFormModel>> {
    return this.http.post<APIResponse<SurveyFormModel>>(ESurveyFormSurveyUrl.createUrl, model);
  }

  update(model: SurveyFormModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ESurveyFormSurveyUrl.updateUrl, model);
  }

  softDelete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ESurveyFormSurveyUrl.softDeleteUrl}/${id}`);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SurveyFormModel>>> {
    return this.http.get<APIResponse<Pagination<SurveyFormModel>>>(`${ESurveyFormSurveyUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  restore(id: any): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ESurveyFormSurveyUrl.restoreUrl}/${id}`, {});
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ESurveyFormSurveyUrl.deleteUrl}/${id}`);
  }

  public(id: any): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ESurveyFormSurveyUrl.publicUrl}/${id}`, {});
  }

  unpublic(id: any): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ESurveyFormSurveyUrl.unPublicUrl}/${id}`, {});
  }

  deactivate(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ESurveyFormSurveyUrl.deactivateUrl}/${id}`, null);
  }

  activate(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ESurveyFormSurveyUrl.activateUrl}/${id}`, null);
  }

  checkValidForm(id: any): Observable<APIResponse<boolean>> {
    return this.http.get<APIResponse<boolean>>(`${ESurveyFormSurveyUrl.checkValidFormUrl}/${id}`);
  }
}
