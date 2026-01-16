import { Injectable } from '@angular/core';
import { Observable, of, delay, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatMessageDto, ChatModel } from '@models/chatbot-models/message.model';
import { EChatGPTChatbotUrl } from '@common/url-api';
import { ResponseModel } from '@models/chatbot-models/response.model';
import { APIResponse } from '@models/api-response.model';
import { RequestModel } from '@models/chatbot-models/request.model';

@Injectable({
  providedIn: 'root'
})
export class ChatGPTService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }
  completeChat(model : RequestModel): Observable<APIResponse<ResponseModel>> {
    const url = EChatGPTChatbotUrl.completeChatUrl;
    return this.http.post<APIResponse<ResponseModel>>(url, model, { headers: this.headers })
      .pipe(
        catchError(error => {
          console.error('Chatbot service error:', error);
          // Fallback response when server is unavailable
          return of({
            data: {
              response: "I'm sorry, I'm having trouble connecting to the server right now. Please try again later."
            } as ResponseModel,
            success: false,
            message: "Server unavailable"
          } as APIResponse<ResponseModel>).pipe(delay(1000));
        })
      );
  }

  getModels(): Observable<APIResponse<string[]>> {
    const url = EChatGPTChatbotUrl.getModelsUrl;
    return this.http.get<APIResponse<string[]>>(url, { headers: this.headers })
      .pipe(
        catchError(error => {
          console.error('Chatbot service error:', error);
          // Fallback response when server is unavailable
          return of({
            data: [],
            success: false,
            message: "I'm sorry, I'm having trouble connecting to the server right now. Please try again later."
          } as APIResponse<string[]>).pipe(delay(1000));
        })
      );
  }
}