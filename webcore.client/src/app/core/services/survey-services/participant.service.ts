import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ParticipantModel } from '@models/survey-models/participant.model';
import { SurveyUIModel } from '@models/survey-models/survey-ui.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  getAll(query: any): Observable<APIResponse<Pagination<ParticipantModel>>> {
    return this.http.get<APIResponse<Pagination<ParticipantModel>>>(EUrl.getAllUrlParticipant, { headers: this.authenticationService.GetHeaders(), params: query }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<ParticipantModel>>>(EUrl.getAllUrlParticipant, { headers: this.authenticationService.GetHeaders(), params: query }))
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
  
  getEagerById(id: any): Observable<APIResponse<SurveyUIModel>> {
    return this.http.get<APIResponse<SurveyUIModel>>(EUrl.getEagerByIdUrlParticipant + `/${id}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<SurveyUIModel>>(EUrl.getEagerByIdUrlParticipant + `/${id}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
