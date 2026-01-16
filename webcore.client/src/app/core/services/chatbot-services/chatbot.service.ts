import { Injectable } from '@angular/core';
import { Observable, of, delay, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatMessageDto, ChatModel } from '@models/chatbot-models/message.model';
import { EBeeBotChatbotUrl } from '@common/url-api';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  sendMessage(message: string, contextMessages: ChatMessageDto[], chatbotMode: number = 1 ): Observable<ChatModel> {
    const payload = {
      request: message,
      mod: chatbotMode,
      contextMessages: contextMessages
    };
    const apiChatbotUrl = EBeeBotChatbotUrl.sendMessageUrl;

    return this.http.post<ChatModel>(apiChatbotUrl, payload, { headers: this.headers })
      .pipe(
        catchError(error => {
          console.error('Chatbot service error:', error);
          // Fallback response when server is unavailable
          return of({
            response: "I'm sorry, I'm having trouble connecting to the server right now. Please try again later.",
            error: true
          }).pipe(delay(1000));
        })
      );
  }

  getVoid(message: string): Observable<Blob> {
    const apiVoidUrl = EBeeBotChatbotUrl.getVoidUrl;
    return this.http.post(apiVoidUrl, JSON.stringify(message), { 
      headers: this.headers,
      responseType: 'blob' 
    })
      .pipe(
        catchError(error => {
          console.error('Chatbot service error:', error);
          // Fallback response when server is unavailable
          return of(new Blob()).pipe(delay(1000));
        })
      );
  }

  getMusic(): Observable<Blob> {
    const apiMusicUrl = EBeeBotChatbotUrl.getMusicUrl;
    return this.http.get(apiMusicUrl, { responseType: 'blob' });
  }

}
