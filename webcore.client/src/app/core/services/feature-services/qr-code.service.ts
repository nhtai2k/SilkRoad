import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EQRCodeFeatureUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

    constructor(private http: HttpClient) { }

    getAllFonts(): Observable<APIResponse<string[]>> {
      return this.http.get<APIResponse<string[]>>(EQRCodeFeatureUrl.getAllFontsUrl);
    }

    generateAQRCode(form: FormData): Observable<Blob> {
      return this.http.post(EQRCodeFeatureUrl.generateAQRCodeUrl, form, {
        responseType: 'blob', // Ensure the response type is Blob
      });
    }
    
    generateListQRCode(form: FormData): Observable<Blob> {
      return this.http.post(EQRCodeFeatureUrl.generateListQRCodeUrl, form, {
        responseType: 'blob', // Ensure the response type is Blob
      });
    }
  
}
