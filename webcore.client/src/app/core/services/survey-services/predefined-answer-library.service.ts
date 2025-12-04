import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EPredefinedAnswerLibrarySurveyUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PredefinedAnswerLibraryModel } from '@models/survey-models/predefined-answer-library.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredefinedAnswerLibraryService {
  constructor(private http: HttpClient) { }

  getByQuestionLibraryId(questionLibraryId: any): Observable<APIResponse<PredefinedAnswerLibraryModel[]>> {
    return this.http.get<APIResponse<PredefinedAnswerLibraryModel[]>>(`${EPredefinedAnswerLibrarySurveyUrl.getByQuestionLibraryIdUrl}/${questionLibraryId}`);
  }

  getById(id: any): Observable<APIResponse<PredefinedAnswerLibraryModel>> {
    return this.http.get<APIResponse<PredefinedAnswerLibraryModel>>(`${EPredefinedAnswerLibrarySurveyUrl.getByIdUrl}/${id}`);
  }

  create(model: PredefinedAnswerLibraryModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EPredefinedAnswerLibrarySurveyUrl.createUrl, model);
  }

  update(model: PredefinedAnswerLibraryModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EPredefinedAnswerLibrarySurveyUrl.updateUrl, model);
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPredefinedAnswerLibrarySurveyUrl.deleteUrl}/${id}`);
  }
}
