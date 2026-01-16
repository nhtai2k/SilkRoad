import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EResourcePersonalFinanceUrl } from '@common/url-api';
import { ResourceModel } from '@models/personal-finance-models';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number, userId: number): Observable<APIResponse<Pagination<ResourceModel>>> {
    const url = `${EResourcePersonalFinanceUrl.getAllUrl}/${pageIndex}/${pageSize}/${userId}`;
    return this.http.get<APIResponse<Pagination<ResourceModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<ResourceModel>> {
    return this.http.get<APIResponse<ResourceModel>>(`${EResourcePersonalFinanceUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EResourcePersonalFinanceUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EResourcePersonalFinanceUrl.updateUrl, model);
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EResourcePersonalFinanceUrl.deleteUrl}/${id}`);
  }
}
