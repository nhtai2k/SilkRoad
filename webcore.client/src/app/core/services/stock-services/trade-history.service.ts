import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ETradeHistoryStockMarketUrl } from '@common/url-api';
import { TradeHistoryModel } from '@models/stock-models';

@Injectable({ providedIn: 'root' })
export class TradeHistoryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number, userId: number): Observable<APIResponse<Pagination<TradeHistoryModel>>> {
    const url = `${ETradeHistoryStockMarketUrl.getAllUrl}/${pageIndex}/${pageSize}/${userId}`;
    return this.http.get<APIResponse<Pagination<TradeHistoryModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<TradeHistoryModel>> {
    const url = `${ETradeHistoryStockMarketUrl.getByIdUrl}/${id}`;
    return this.http.get<APIResponse<TradeHistoryModel>>(url);
  }

  create(model: TradeHistoryModel): Observable<BaseAPIResponse> {
    const url = ETradeHistoryStockMarketUrl.createUrl;
    return this.http.post<BaseAPIResponse>(url, model);
  }

  update(model: TradeHistoryModel): Observable<BaseAPIResponse> {
    const url = ETradeHistoryStockMarketUrl.updateUrl;
    return this.http.put<BaseAPIResponse>(url, model);
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = `${ETradeHistoryStockMarketUrl.deleteUrl}/${id}`;
    return this.http.delete<BaseAPIResponse>(url);
  }
}
