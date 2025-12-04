import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EParticipantInfoConfigSurveyUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { ParticipantInfoConfigModel } from '@models/survey-models/participant-info-config.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantInfoConfigService {
  constructor(private http: HttpClient) { }

  getBySurveyFormId(surveyFormId: any): Observable<APIResponse<ParticipantInfoConfigModel[]>> {
    return this.http.get<APIResponse<ParticipantInfoConfigModel[]>>(`${EParticipantInfoConfigSurveyUrl.getBySurveyFormIdUrl}/${surveyFormId}`);
  }

  getById(id: any): Observable<APIResponse<ParticipantInfoConfigModel>> {
    return this.http.get<APIResponse<ParticipantInfoConfigModel>>(`${EParticipantInfoConfigSurveyUrl.getByIdUrl}/${id}`);
  }

  create(ParticipantInfoConfig: ParticipantInfoConfigModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EParticipantInfoConfigSurveyUrl.createUrl, ParticipantInfoConfig);
  }
  
  update(ParticipantInfoConfig: ParticipantInfoConfigModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EParticipantInfoConfigSurveyUrl.updateUrl, ParticipantInfoConfig);
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EParticipantInfoConfigSurveyUrl.deleteUrl}/${id}`);
  }
}
