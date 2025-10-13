import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

    constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
    getAllFonts(): Observable<APIResponse<string[]>> {
      return this.http.get<APIResponse<string[]>>(EUrl.getAllFonts, { headers: this.authenticationService.GetHeaders() }).pipe(
        catchError(error => {
          if (error.status === 401) {
            return this.authenticationService.ReNewToken().pipe(
              switchMap(() => this.http.get<APIResponse<string[]>>(EUrl.getAllFonts, { headers: this.authenticationService.GetHeaders() }))
            );
          } else {
            return throwError(() => error);
          }
        })
      );
    }

    generateAQRCode(form: FormData): Observable<Blob> {
      return this.http.post(EUrl.generateAQRCode, form, {
        headers: this.authenticationService.GetHeaders(),
        responseType: 'blob', // Ensure the response type is Blob
      }).pipe(
        catchError(error => {
          if (error.status === 401) {
            return this.authenticationService.ReNewToken().pipe(
              switchMap(() => this.http.post(EUrl.generateAQRCode, form, {
                headers: this.authenticationService.GetHeaders(),
                responseType: 'blob',
              }))
            );
          } else {
            return throwError(() => error);
          }
        })
      );
    }
    
    generateListQRCode(form: FormData): Observable<Blob> {
      return this.http.post(EUrl.generateListQRCode, form, {
        headers: this.authenticationService.GetHeaders(),
        responseType: 'blob', // Ensure the response type is Blob
      }).pipe(
        catchError(error => {
          if (error.status === 401) {
            return this.authenticationService.ReNewToken().pipe(
              switchMap(() => this.http.post(EUrl.generateListQRCode, form, {
                headers: this.authenticationService.GetHeaders(),
                responseType: 'blob',
              }))
            );
          } else {
            return throwError(() => error);
          }
        })
      );
    }
  
}
