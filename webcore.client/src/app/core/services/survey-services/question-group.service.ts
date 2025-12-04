import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EQuestionGroupSurveyUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionGroupService {
  constructor(private http: HttpClient) { }

  getById(id: any): Observable<APIResponse<QuestionGroupModel>> {
    return this.http.get<APIResponse<QuestionGroupModel>>(`${EQuestionGroupSurveyUrl.getByIdUrl}/${id}`);
  }

  getBySurveyFormId(surveyFormId: any): Observable<APIResponse<QuestionGroupModel[]>> {
    return this.http.get<APIResponse<QuestionGroupModel[]>>(`${EQuestionGroupSurveyUrl.getBySurveyFormIdUrl}/${surveyFormId}`);
  }

  create(questiongroup: QuestionGroupModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EQuestionGroupSurveyUrl.createUrl, questiongroup);
  }
  
  update(questiongroup: QuestionGroupModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EQuestionGroupSurveyUrl.updateUrl, questiongroup);
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EQuestionGroupSurveyUrl.deleteUrl}/${id}`);
  }
}
