import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EPredefinedAnswerSurveyUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PredefinedAnswerModel } from '@models/survey-models/predefined-answer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredefinedAnswerService {
  constructor(private http: HttpClient) { }

  getByQuestionId(questionId: any): Observable<APIResponse<PredefinedAnswerModel[]>> {
    return this.http.get<APIResponse<PredefinedAnswerModel[]>>(`${EPredefinedAnswerSurveyUrl.getByQuestionIdUrl}/${questionId}`);
  }

  getById(id: any): Observable<APIResponse<PredefinedAnswerModel>> {
    return this.http.get<APIResponse<PredefinedAnswerModel>>(`${EPredefinedAnswerSurveyUrl.getByIdUrl}/${id}`);
  }

  create(model: PredefinedAnswerModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EPredefinedAnswerSurveyUrl.createUrl, model);
  }

  update(model: PredefinedAnswerModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EPredefinedAnswerSurveyUrl.updateUrl, model);
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPredefinedAnswerSurveyUrl.deleteUrl}/${id}`);
  }
}
