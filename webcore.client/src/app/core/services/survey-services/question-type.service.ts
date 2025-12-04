import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EQuestionTypeSurveyUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { OptionModel } from '@models/option.model';
import { QuestionTypeModel } from '@models/survey-models/question-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<APIResponse<QuestionTypeModel[]>> {
    return this.http.get<APIResponse<QuestionTypeModel[]>>(EQuestionTypeSurveyUrl.getAllUrl);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EQuestionTypeSurveyUrl.getOptionListUrl);
  }
}
