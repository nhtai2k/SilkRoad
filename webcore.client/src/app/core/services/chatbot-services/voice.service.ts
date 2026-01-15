import { Injectable } from '@angular/core';
import { Observable, of, delay, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatMessageDto, ChatModel } from '@models/chatbot-models/message.model';
import { EVoiceUrl } from '@common/url-api';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }


  getVoiceFromChatGPT(message: string): Observable<Blob> {
    const url = EVoiceUrl.getVoiceFromChatGPTUrl;
    return this.http.post(url, JSON.stringify(message), { 
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

    getVoiceFromElevenlabs(message: string): Observable<Blob> {
        const url = EVoiceUrl.getVoiceFromElevenlabsUrl;
        return this.http.post(url, JSON.stringify(message), { 
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
}
