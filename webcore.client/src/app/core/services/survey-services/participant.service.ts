import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EParticipantSurveyUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { AnswerModel } from '@models/survey-models/answer.model';
import { ParticipantModel } from '@models/survey-models/participant.model';
// import { SurveyUIModel } from '@models/survey-models/survey-ui.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }
  getAll(query: any): Observable<APIResponse<Pagination<ParticipantModel>>> {
    return this.http.get<APIResponse<Pagination<ParticipantModel>>>(EParticipantSurveyUrl.getAllUrl, { params: query });
  }

  filter(query: any): Observable<APIResponse<Pagination<ParticipantModel>>> {
    return this.http.post<APIResponse<Pagination<ParticipantModel>>>(EParticipantSurveyUrl.filterUrl, query);
  }
  
  getById(id: any): Observable<APIResponse<ParticipantModel>> {
    const url = `${EParticipantSurveyUrl.getByIdUrl}/${id}`;
    return this.http.get<APIResponse<ParticipantModel>>(url);
  }

  initParticipant(model: ParticipantModel): Observable<APIResponse<ParticipantModel>> {
    return this.http.post<APIResponse<ParticipantModel>>(EParticipantSurveyUrl.initParticipantUrl, model);
  }

  addAnswers(answers: AnswerModel[]): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EParticipantSurveyUrl.addAnswersUrl, JSON.stringify(answers), { headers: { 'Content-Type': 'application/json' } });
  }

  highlight(id: number): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EParticipantSurveyUrl.highlightUrl + `/${id}`, null);
  }

  removeHighlight(id: number): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EParticipantSurveyUrl.removeHighlightUrl + `/${id}`, null);
  }

  reject(participantId: any, reason: any): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EParticipantSurveyUrl.rejectUrl + `/${participantId}`, JSON.stringify(reason), { headers: { 'Content-Type': 'application/json' } });
  }
}
