import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EIndustryStockMarketUrl } from '@common/url-api';
import { IndustryModel } from '@models/stock-models/industry.model';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class IndustryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<IndustryModel>>> {
    return this.http.get<APIResponse<Pagination<IndustryModel>>>(`${EIndustryStockMarketUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllActive(pageIndex: number, pageSize: number, search?: string): Observable<APIResponse<Pagination<IndustryModel>>> {
    let url = `${EIndustryStockMarketUrl.getAllActiveUrl}/${pageIndex}/${pageSize}`;
    if (search) url = `${url}/${encodeURIComponent(search)}`;
    return this.http.get<APIResponse<Pagination<IndustryModel>>>(url);
  }

    getOptionList(): Observable<APIResponse<OptionModel[]>> {
      const url = EIndustryStockMarketUrl.getOptionListUrl;
      return this.http.get<APIResponse<OptionModel[]>>(url);
    }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<IndustryModel>>> {
    return this.http.get<APIResponse<Pagination<IndustryModel>>>(`${EIndustryStockMarketUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: number): Observable<APIResponse<IndustryModel>> {
    return this.http.get<APIResponse<IndustryModel>>(`${EIndustryStockMarketUrl.getByIdUrl}/${id}`);
  }

  create(model: IndustryModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EIndustryStockMarketUrl.createUrl, model);
  }

  update(model: IndustryModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EIndustryStockMarketUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EIndustryStockMarketUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EIndustryStockMarketUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EIndustryStockMarketUrl.deleteUrl}/${id}`);
  }
}
