import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '@models/api-response.model';
import { EAssetReportPersonalFinanceUrl, EExpenseReportPersonalFinanceUrl } from '@common/url-api';
import { ColoumnModel, PieModel } from '@models/am-chart.model';

@Injectable({ providedIn: 'root' })
export class AssetReportService {
  constructor(private http: HttpClient) {}

  getColoumnChart(userId: number): Observable<APIResponse<ColoumnModel[]>> {
    const url = `${EAssetReportPersonalFinanceUrl.getColoumnChartUrl}/${userId}`;
    return this.http.get<APIResponse<ColoumnModel[]>>(url);
  }
    getPieChart(userId: number): Observable<APIResponse<PieModel[]>> {
    const url = `${EAssetReportPersonalFinanceUrl.getPieChartUrl}/${userId}`;
    return this.http.get<APIResponse<PieModel[]>>(url);
  }
}
