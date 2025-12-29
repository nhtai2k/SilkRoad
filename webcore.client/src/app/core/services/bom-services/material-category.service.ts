import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialCategoryModel } from '../../models/bom-models/material-category.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { EMaterialCategoryBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class MaterialCategoryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<MaterialCategoryModel>>> {
    const url = `${EMaterialCategoryBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<MaterialCategoryModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EMaterialCategoryBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<MaterialCategoryModel>>> {
    const url = `${EMaterialCategoryBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<MaterialCategoryModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<MaterialCategoryModel>> {
    return this.http.get<APIResponse<MaterialCategoryModel>>(`${EMaterialCategoryBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: MaterialCategoryModel | FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EMaterialCategoryBOMUrl.createUrl, model);
  }

  update(model: MaterialCategoryModel | FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EMaterialCategoryBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EMaterialCategoryBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EMaterialCategoryBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EMaterialCategoryBOMUrl.deleteUrl}/${id}`);
  }
}
