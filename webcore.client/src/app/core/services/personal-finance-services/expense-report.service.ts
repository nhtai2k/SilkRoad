import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '@models/api-response.model';
import { EExpenseReportPersonalFinanceUrl } from '@common/url-api';
import { ColoumnModel } from '@models/am-chart.model';

@Injectable({ providedIn: 'root' })
export class ExpenseReportService {
  constructor(private http: HttpClient) {}

  getColoumnChartByMonth(userId: number, month: string): Observable<APIResponse<ColoumnModel[]>> {
    const url = `${EExpenseReportPersonalFinanceUrl.getColoumnChartByMonthUrl}/${userId}/${month}`;
    return this.http.get<APIResponse<ColoumnModel[]>>(url);
  }
    getColoumnChartByYear(userId: number, year: number): Observable<APIResponse<ColoumnModel[]>> {
    const url = `${EExpenseReportPersonalFinanceUrl.getColoumnChartByYearUrl}/${userId}/${year}`;
    return this.http.get<APIResponse<ColoumnModel[]>>(url);
  }
}
