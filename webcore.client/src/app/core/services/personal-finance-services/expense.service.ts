import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EExpensePersonalFinanceUrl } from '@common/url-api';

import { ExpenseModel } from '@models/personal-finance-models';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getByFilter(model: FormData): Observable<APIResponse<Pagination<ExpenseModel>>> {
    return this.http.post<APIResponse<Pagination<ExpenseModel>>>(EExpensePersonalFinanceUrl.getByFilterUrl, model);
  }

  getById(id: number): Observable<APIResponse<ExpenseModel>> {
    return this.http.get<APIResponse<ExpenseModel>>(`${EExpensePersonalFinanceUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EExpensePersonalFinanceUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EExpensePersonalFinanceUrl.updateUrl, model);
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EExpensePersonalFinanceUrl.deleteUrl}/${id}`);
  }
}
