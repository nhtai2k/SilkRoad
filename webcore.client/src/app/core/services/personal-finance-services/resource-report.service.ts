import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '@models/api-response.model';
import { EResourceReportPersonalFinanceUrl } from '@common/url-api';
import { ResourceMonthReportModel } from '@models/personal-finance-models';

@Injectable({ providedIn: 'root' })
export class ResourceReportService {
  constructor(private http: HttpClient) {}

  getClusteredColumnChart(userId: number, year: number): Observable<APIResponse<ResourceMonthReportModel[]>> {
    const url = `${EResourceReportPersonalFinanceUrl.GetClusteredColumnChartUrl}/${userId}/${year}`;
    return this.http.get<APIResponse<ResourceMonthReportModel[]>>(url);
  }
}
