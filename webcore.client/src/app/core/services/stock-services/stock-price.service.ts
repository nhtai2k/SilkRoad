import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EChartStockMarketUrl } from '@common/url-api';
import { StockPriceModel } from '@models/stock-models/stock-history.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
  constructor(private http: HttpClient) { }
  
  getAll(symbol: any): Observable<APIResponse<StockPriceModel[]>> {
    const url = `${EChartStockMarketUrl.getAllUrl}/${symbol}`;
    return this.http.get<APIResponse<StockPriceModel[]>>(url);
  }

  getNewData(symbol: string): Observable<BaseAPIResponse> {
    const url = `${EChartStockMarketUrl.getNewDataUrl}/${symbol}`;
    return this.http.get<BaseAPIResponse>(url);
  }
}
