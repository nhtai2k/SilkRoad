import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EIncomePersonalFinanceUrl } from '@common/url-api';
import { IncomeModel } from '@models/personal-finance-models';

@Injectable({ providedIn: 'root' })
export class IncomeService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number, userId: number): Observable<APIResponse<Pagination<IncomeModel>>> {
    const url = `${EIncomePersonalFinanceUrl.getAllUrl}/${pageIndex}/${pageSize}/${userId}`;
    return this.http.get<APIResponse<Pagination<IncomeModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<IncomeModel>> {
    return this.http.get<APIResponse<IncomeModel>>(`${EIncomePersonalFinanceUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EIncomePersonalFinanceUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EIncomePersonalFinanceUrl.updateUrl, model);
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EIncomePersonalFinanceUrl.deleteUrl}/${id}`);
  }
}
