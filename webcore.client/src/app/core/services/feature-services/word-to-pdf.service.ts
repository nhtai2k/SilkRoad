import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EConvertWordToPdfFeatureUrl } from '@common/url-api';

export interface ConversionProgress {
  progress: number;
  status: string;
}

export interface ConversionResult {
  success: boolean;
  fileName: string;
  fileData: Blob;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WordToPdfService {

  constructor(private http: HttpClient) {}

  convertWordToPdf(file: File): Observable<ConversionProgress | ConversionResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('outputFormat', 'pdf');

    return this.http.post(EConvertWordToPdfFeatureUrl.convertWordToPdfUrl, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    }).pipe(
      map((event: HttpEvent<Blob>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              const progress = Math.round(100 * event.loaded / event.total);
              return {
                progress,
                status: progress < 100 ? 'Uploading file...' : 'Processing conversion...'
              } as ConversionProgress;
            }
            return {
              progress: 0,
              status: 'Preparing upload...'
            } as ConversionProgress;

          case HttpEventType.Response:
            const fileName = file.name.replace(/\.(doc|docx)$/i, '.pdf');
            return {
              success: true,
              fileName,
              fileData: event.body!
            } as ConversionResult;

          default:
            return {
              progress: 0,
              status: 'Initializing...'
            } as ConversionProgress;
        }
      })
    );
  }

  // Validate file type and size
  validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const allowedExtensions = ['.doc', '.docx'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds ${this.formatFileSize(maxSize)} limit`
      };
    }

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return {
        valid: false,
        error: 'Please select a valid Word document (.doc or .docx)'
      };
    }

    return { valid: true };
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
