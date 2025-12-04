import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EStockPriceStockMarketUrl } from '@common/url-api';
import { StockPriceModel } from '@models/stock-models/stock-history.model';
import { BaseAPIResponse } from '@models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
  constructor(private http: HttpClient) { }
  
  getAll(symbol: any): Observable<StockPriceModel[]> {
    return this.http.get<StockPriceModel[]>(`${EStockPriceStockMarketUrl.getAllUrl}/${symbol}`);
  }

  getNewData(symbol: string): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(`${EStockPriceStockMarketUrl.getNewDataUrl}/${symbol}`, {});
  }
}
