import { Injectable } from '@angular/core';
import { Observable, of, delay, catchError, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatMessageDto, ChatModel } from '@models/chatbot-models/message.model';
import { EPromptChatbotUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { PromptModel } from '@models/chatbot-models/prompt.model';
import { OptionModel } from '@models/option.model';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
    
  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PromptModel>>> {
    const url = EPromptChatbotUrl.getAllUrl + `/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<PromptModel>>>(url);
    }
  
  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EPromptChatbotUrl.getOptionListUrl;
    return this.http.get<APIResponse<OptionModel[]>>(url);
    }


  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PromptModel>>> {
    const url = EPromptChatbotUrl.getAllDeletedUrl.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<PromptModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<PromptModel>> {
    const url = EPromptChatbotUrl.getByIdUrl.concat('/',id.toString());
    return this.http.get<APIResponse<PromptModel>>(url);
  }

  create(model: PromptModel): Observable<BaseAPIResponse> {
    const url = EPromptChatbotUrl.createUrl;
    return this.http.post<APIResponse<PromptModel>>(url, model);
    
  }

  update(model: PromptModel): Observable<BaseAPIResponse> {
    const url = EPromptChatbotUrl.updateUrl;
    return this.http.put<APIResponse<PromptModel>>(url, model);
  }
           

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EPromptChatbotUrl.softDeleteUrl.concat('/',id.toString());
    return this.http.put<APIResponse<void>>(url, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EPromptChatbotUrl.restoreUrl.concat('/',id.toString());
    return this.http.put<APIResponse<void>>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EPromptChatbotUrl.deleteUrl.concat('/',id.toString());
    return this.http.delete<APIResponse<void>>(url);
  }
}