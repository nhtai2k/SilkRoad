import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EQuestionLibrarySurveyUrl } from '@common/url-api';
import { QuestionLibraryModel } from '@models/survey-models/question-library.model';

@Injectable({ providedIn: 'root' })
export class QuestionLibraryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<QuestionLibraryModel>>> {
    return this.http.get<APIResponse<Pagination<QuestionLibraryModel>>>(`${EQuestionLibrarySurveyUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getByFilter(filter: any): Observable<APIResponse<Pagination<QuestionLibraryModel>>> {
    return this.http.post<APIResponse<Pagination<QuestionLibraryModel>>>(EQuestionLibrarySurveyUrl.filterUrl, filter);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<QuestionLibraryModel>>> {
    return this.http.get<APIResponse<Pagination<QuestionLibraryModel>>>(`${EQuestionLibrarySurveyUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<QuestionLibraryModel>> {
    return this.http.get<APIResponse<QuestionLibraryModel>>(`${EQuestionLibrarySurveyUrl.getByIdUrl}/${id}`);
  }

  getEagerLoadingById(id: any): Observable<APIResponse<QuestionLibraryModel>> {
    return this.http.get<APIResponse<QuestionLibraryModel>>(`${EQuestionLibrarySurveyUrl.getEagerLoadingByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EQuestionLibrarySurveyUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EQuestionLibrarySurveyUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EQuestionLibrarySurveyUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EQuestionLibrarySurveyUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EQuestionLibrarySurveyUrl.deleteUrl}/${id}`);
  }
}
