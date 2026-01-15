import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EHandbookStockMarketUrl } from '@common/url-api';
import { HandbookModel } from '@models/stock-models/handbook.model';

@Injectable({ providedIn: 'root' })
export class HandbookService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<HandbookModel>>> {
    const url = `${EHandbookStockMarketUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<HandbookModel>>>(url);
  }


//   getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<HandbookModel>>> {
//     return this.http.get<APIResponse<Pagination<HandbookModel>>>(`${EHandbookStockMarketUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
//   }

  getById(id: number): Observable<APIResponse<HandbookModel>> {
    return this.http.get<APIResponse<HandbookModel>>(`${EHandbookStockMarketUrl.getByIdUrl}/${id}`);
  }

  create(model: HandbookModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EHandbookStockMarketUrl.createUrl, model);
  }

  update(model: HandbookModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EHandbookStockMarketUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EHandbookStockMarketUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EHandbookStockMarketUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EHandbookStockMarketUrl.deleteUrl}/${id}`);
  }
}
