import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KitchenModel } from '../../models/bom-models/kitchen.model';
import { EKitchenBOMUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class KitchenService {
  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<KitchenModel>>> {
    const url = `${EKitchenBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<KitchenModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EKitchenBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<KitchenModel>>> {
    const url = `${EKitchenBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<KitchenModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<KitchenModel>> {
    return this.http.get<APIResponse<KitchenModel>>(`${EKitchenBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: KitchenModel | FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EKitchenBOMUrl.createUrl, model);
  }

  update(model: KitchenModel | FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EKitchenBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EKitchenBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EKitchenBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EKitchenBOMUrl.deleteUrl}/${id}`);
  }
}
