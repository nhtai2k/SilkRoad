import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { QuestionTypeModel } from '@models/survey-models/question-type.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  getAll(): Observable<APIResponse<QuestionTypeModel[]>> {
    return this.http.get<APIResponse<QuestionTypeModel[]>>(EUrl.getAllUrlQuestionType, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<QuestionTypeModel[]>>(EUrl.getAllUrlQuestionType, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
