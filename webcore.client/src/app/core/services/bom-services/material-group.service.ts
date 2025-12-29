import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialGroupModel } from '../../models/bom-models/material-group.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { EMaterialGroupBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class MaterialGroupService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<MaterialGroupModel>>> {
    const url = `${EMaterialGroupBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<MaterialGroupModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EMaterialGroupBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<MaterialGroupModel>>> {
    const url = `${EMaterialGroupBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<MaterialGroupModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<MaterialGroupModel>> {
    return this.http.get<APIResponse<MaterialGroupModel>>(`${EMaterialGroupBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: MaterialGroupModel | FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EMaterialGroupBOMUrl.createUrl, model);
  }

  update(model: MaterialGroupModel | FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EMaterialGroupBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EMaterialGroupBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EMaterialGroupBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EMaterialGroupBOMUrl.deleteUrl}/${id}`);
  }
}
