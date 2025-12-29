import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyTypeModel } from '../../models/bom-models/property-type.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { EPropertyTypeBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class PropertyTypeService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PropertyTypeModel>>> {
    const url = `${EPropertyTypeBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<PropertyTypeModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EPropertyTypeBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PropertyTypeModel>>> {
    const url = `${EPropertyTypeBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<PropertyTypeModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<PropertyTypeModel>> {
    return this.http.get<APIResponse<PropertyTypeModel>>(`${EPropertyTypeBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: PropertyTypeModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EPropertyTypeBOMUrl.createUrl, model);
  }

  update(model: PropertyTypeModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EPropertyTypeBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EPropertyTypeBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EPropertyTypeBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPropertyTypeBOMUrl.deleteUrl}/${id}`);
  }
}
    