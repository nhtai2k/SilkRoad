import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ECompanyStockMarketUrl } from '@common/url-api';
import { CompanyModel } from '@models/stock-models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CompanyModel>>> {
    return this.http.get<APIResponse<Pagination<CompanyModel>>>(`${ECompanyStockMarketUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllActive(): Observable<APIResponse<CompanyModel[]>> {
    return this.http.get<APIResponse<CompanyModel[]>>(ECompanyStockMarketUrl.getAllActiveUrl);
  }

  getAllSymbols(): Observable<APIResponse<string[]>> {
    return this.http.get<APIResponse<string[]>>(ECompanyStockMarketUrl.getAllSymbolsUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CompanyModel>>> {
    return this.http.get<APIResponse<Pagination<CompanyModel>>>(`${ECompanyStockMarketUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: number): Observable<APIResponse<CompanyModel>> {
    return this.http.get<APIResponse<CompanyModel>>(`${ECompanyStockMarketUrl.getByIdUrl}/${id}`);
  }

  create(model: CompanyModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ECompanyStockMarketUrl.createUrl, model);
  }

  update(model: CompanyModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ECompanyStockMarketUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ECompanyStockMarketUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ECompanyStockMarketUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ECompanyStockMarketUrl.deleteUrl}/${id}`);
  }
}
