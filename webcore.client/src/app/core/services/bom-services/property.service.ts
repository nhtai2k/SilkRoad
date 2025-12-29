import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyModel } from '../../models/bom-models/property.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EPropertyBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PropertyModel>>> {
    const url = `${EPropertyBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<PropertyModel>>>(url);
  }

  getAllByFilter(filter: any): Observable<APIResponse<Pagination<PropertyModel>>> {
    return this.http.post<APIResponse<Pagination<PropertyModel>>>(EPropertyBOMUrl.getAllByFilterUrl, filter);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PropertyModel>>> {
    const url = `${EPropertyBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<PropertyModel>>>(url);
  }

  getByPropertyTypeId(propertyTypeId: number): Observable<APIResponse<PropertyModel[]>> {
    const url = `${EPropertyBOMUrl.getByPropertyTypeIdUrl}/${propertyTypeId}`;
    return this.http.get<APIResponse<PropertyModel[]>>(url);
  }

  getById(id: number): Observable<APIResponse<PropertyModel>> {
    return this.http.get<APIResponse<PropertyModel>>(`${EPropertyBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: PropertyModel | FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EPropertyBOMUrl.createUrl, model);
  }

  update(model: PropertyModel | FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EPropertyBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EPropertyBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EPropertyBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPropertyBOMUrl.deleteUrl}/${id}`);
  }
}
