import { Injectable } from '@angular/core';
import { Observable, of, delay, catchError, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatMessageDto, ChatModel } from '@models/chatbot-models/message.model';
import { EConversationUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ConversationModel } from '@models/chatbot-models/conversation.model';
import { OptionModel } from '@models/option.model';
import { ConversationFilterModel } from '@models/chatbot-models/conversation-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
    
  constructor(private http: HttpClient) { }

  getAll(filter: ConversationFilterModel): Observable<APIResponse<Pagination<ConversationModel>>> {
    const url = EConversationUrl.getByFilterUrl ;
    return this.http.post<APIResponse<Pagination<ConversationModel>>>(url, filter);
  }
}