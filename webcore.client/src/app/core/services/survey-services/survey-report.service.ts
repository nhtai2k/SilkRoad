import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ESurveyReportSurveyUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

// Note: Add proper model imports when SurveyReportModel and related models are available
// import { SurveyReportModel } from '@models/survey-models/survey-report.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyReportService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<any>>> {
    return this.http.get<APIResponse<Pagination<any>>>(`${ESurveyReportSurveyUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${ESurveyReportSurveyUrl.getByIdUrl}/${id}`);
  }

  getBySurveyFormId(surveyFormId: any): Observable<APIResponse<any[]>> {
    return this.http.get<APIResponse<any[]>>(`${ESurveyReportSurveyUrl.getBySurveyFormIdUrl}/${surveyFormId}`);
  }

  generateReport(surveyFormId: any, reportType?: string): Observable<APIResponse<any>> {
    const payload = { surveyFormId, reportType };
    return this.http.post<APIResponse<any>>(ESurveyReportSurveyUrl.generateReportUrl, payload);
  }

  exportExcel(surveyFormId: any): Observable<Blob> {
    return this.http.post(`${ESurveyReportSurveyUrl.exportExcelUrl}/${surveyFormId}`, {}, { 
      responseType: 'blob' 
    });
  }

  exportPdf(surveyFormId: any): Observable<Blob> {
    return this.http.post(`${ESurveyReportSurveyUrl.exportPdfUrl}/${surveyFormId}`, {}, { 
      responseType: 'blob' 
    });
  }

  getStatistics(surveyFormId: any): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${ESurveyReportSurveyUrl.getStatisticsUrl}/${surveyFormId}`);
  }
}
