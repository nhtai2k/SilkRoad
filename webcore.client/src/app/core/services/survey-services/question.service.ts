import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EQuestionSurveyUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { QuestionModel } from '@models/survey-models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getById(id: any): Observable<APIResponse<QuestionModel>> {
    return this.http.get<APIResponse<QuestionModel>>(`${EQuestionSurveyUrl.getByIdUrl}/${id}`);
  }

  getEagerLoadingById(id: any): Observable<APIResponse<QuestionModel>> {
    return this.http.get<APIResponse<QuestionModel>>(`${EQuestionSurveyUrl.getEagerLoadingByIdUrl}/${id}`);
  }

  getBySurveyFormId(surveyFormId: any): Observable<APIResponse<QuestionModel[]>> {
    return this.http.get<APIResponse<QuestionModel[]>>(`${EQuestionSurveyUrl.getBySurveyFormIdUrl}/${surveyFormId}`);
  }

  getByQuestionGroupId(questionGroupId: any): Observable<APIResponse<QuestionModel[]>> {
    return this.http.get<APIResponse<QuestionModel[]>>(`${EQuestionSurveyUrl.getByQuestionGroupIdUrl}/${questionGroupId}`);
  }

  create(model: QuestionModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EQuestionSurveyUrl.createUrl, model);
  }

  update(model: QuestionModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EQuestionSurveyUrl.updateUrl, model);
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EQuestionSurveyUrl.deleteUrl}/${id}`);
  }
}
