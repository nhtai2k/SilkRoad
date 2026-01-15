import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '@models/api-response.model';
import { ColoumnModel } from '@models/personal-finance-models';
import { EReportPersonalFinanceUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  getColoumnChartByMonth(userId: number, month: string): Observable<APIResponse<ColoumnModel[]>> {
    const url = `${EReportPersonalFinanceUrl.getColoumnChartByMonthUrl}/${userId}/${month}`;
    return this.http.get<APIResponse<ColoumnModel[]>>(url);
  }
    getColoumnChartByYear(userId: number, year: number): Observable<APIResponse<ColoumnModel[]>> {
    const url = `${EReportPersonalFinanceUrl.getColoumnChartByYearUrl}/${userId}/${year}`;
    return this.http.get<APIResponse<ColoumnModel[]>>(url);
  }
}
