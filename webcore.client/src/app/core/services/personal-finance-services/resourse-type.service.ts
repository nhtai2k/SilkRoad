import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EResourceTypePersonalFinanceUrl } from '@common/url-api';
import { ResourceTypeModel } from '@models/personal-finance-models';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class ResourceTypeService {
  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<ResourceTypeModel>>> {
    return this.http.get<APIResponse<Pagination<ResourceTypeModel>>>(`${EResourceTypePersonalFinanceUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EResourceTypePersonalFinanceUrl.getOptionListUrl;
    return this.http.get<APIResponse<OptionModel[]>>(url);
  }

  getById(id: number): Observable<APIResponse<ResourceTypeModel>> {
    return this.http.get<APIResponse<ResourceTypeModel>>(`${EResourceTypePersonalFinanceUrl.getByIdUrl}/${id}`);
  }

  create(model: ResourceTypeModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EResourceTypePersonalFinanceUrl.createUrl, model);
  }

  update(model: ResourceTypeModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EResourceTypePersonalFinanceUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EResourceTypePersonalFinanceUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EResourceTypePersonalFinanceUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EResourceTypePersonalFinanceUrl.deleteUrl}/${id}`);
  }
}
