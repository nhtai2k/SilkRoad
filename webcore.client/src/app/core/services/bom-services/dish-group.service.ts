import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DishGroupModel } from '../../models/bom-models/dish-group.model';
import { EDishGroupBOMUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class DishGroupService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<DishGroupModel>>> {
    const url = `${EDishGroupBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<DishGroupModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EDishGroupBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<DishGroupModel>>> {
    const url = `${EDishGroupBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<DishGroupModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<DishGroupModel>> {
    return this.http.get<APIResponse<DishGroupModel>>(`${EDishGroupBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: DishGroupModel | FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EDishGroupBOMUrl.createUrl, model);
  }

  update(model: DishGroupModel | FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EDishGroupBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EDishGroupBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EDishGroupBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EDishGroupBOMUrl.deleteUrl}/${id}`);
  }
}
