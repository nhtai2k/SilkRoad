import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BOMConfigurationModel } from '../../models/bom-models/bom-configuration.model';
import { EBOMConfigurationBOMUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class BOMConfigurationService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<BOMConfigurationModel>>> {
    const url = `${EBOMConfigurationBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<BOMConfigurationModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EBOMConfigurationBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<BOMConfigurationModel>>> {
    const url = `${EBOMConfigurationBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<BOMConfigurationModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<BOMConfigurationModel>> {
    return this.http.get<APIResponse<BOMConfigurationModel>>(`${EBOMConfigurationBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: BOMConfigurationModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EBOMConfigurationBOMUrl.createUrl, model);
  }

  update(model: BOMConfigurationModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EBOMConfigurationBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EBOMConfigurationBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EBOMConfigurationBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EBOMConfigurationBOMUrl.deleteUrl}/${id}`);
  }
}
