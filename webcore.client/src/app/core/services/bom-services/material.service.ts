import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialModel } from '../../models/bom-models/material.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EMaterialBOMUrl } from '@common/url-api';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class MaterialService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<MaterialModel>>> {
    const url = `${EMaterialBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<MaterialModel>>>(url);
  }

  getAllByFilter(filter: any): Observable<APIResponse<Pagination<MaterialModel>>> {
    return this.http.post<APIResponse<Pagination<MaterialModel>>>(EMaterialBOMUrl.getAllByFilterUrl, filter);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EMaterialBOMUrl.getOptionListUrl);
  }

  getByMaterialGroupId(materialGroupId: number): Observable<APIResponse<OptionModel[]>> {
    const url = `${EMaterialBOMUrl.getAllByMaterialGroupIdUrl}/${materialGroupId}`;
    return this.http.get<APIResponse<OptionModel[]>>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<MaterialModel>>> {
    const url = `${EMaterialBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<MaterialModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<MaterialModel>> {
    return this.http.get<APIResponse<MaterialModel>>(`${EMaterialBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: MaterialModel | FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EMaterialBOMUrl.createUrl, model);
  }

  update(model: MaterialModel | FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EMaterialBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EMaterialBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EMaterialBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EMaterialBOMUrl.deleteUrl}/${id}`);
  }
}
