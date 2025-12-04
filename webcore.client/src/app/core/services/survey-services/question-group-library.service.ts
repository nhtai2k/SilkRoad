import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EQuestionGroupLibrarySurveyUrl } from '@common/url-api';
import { OptionModel } from '@models/option.model';
import { QuestionGroupLibraryModel } from '@models/survey-models/question-group-library.model';

@Injectable({ providedIn: 'root' })
export class QuestionGroupLibraryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<QuestionGroupLibraryModel>>> {
    return this.http.get<APIResponse<Pagination<QuestionGroupLibraryModel>>>(`${EQuestionGroupLibrarySurveyUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllActive(): Observable<APIResponse<QuestionGroupLibraryModel[]>> {
    return this.http.get<APIResponse<QuestionGroupLibraryModel[]>>(EQuestionGroupLibrarySurveyUrl.getAllActiveUrl);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EQuestionGroupLibrarySurveyUrl.getOptionListUrl);
  }

  getTreeOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EQuestionGroupLibrarySurveyUrl.getTreeOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<QuestionGroupLibraryModel>>> {
    return this.http.get<APIResponse<Pagination<QuestionGroupLibraryModel>>>(`${EQuestionGroupLibrarySurveyUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: number): Observable<APIResponse<QuestionGroupLibraryModel>> {
    return this.http.get<APIResponse<QuestionGroupLibraryModel>>(`${EQuestionGroupLibrarySurveyUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EQuestionGroupLibrarySurveyUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EQuestionGroupLibrarySurveyUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EQuestionGroupLibrarySurveyUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EQuestionGroupLibrarySurveyUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EQuestionGroupLibrarySurveyUrl.deleteUrl}/${id}`);
  }
}
