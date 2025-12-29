import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ELocationBOMUrl } from '@common/url-api';
import { LocationModel } from '@models/bom-models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<LocationModel>>> {
    const url = `${ELocationBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<LocationModel>>>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<LocationModel>>> {
    const url = `${ELocationBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<LocationModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<LocationModel>> {
    return this.http.get<APIResponse<LocationModel>>(`${ELocationBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: LocationModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ELocationBOMUrl.createUrl, model);
  }

  update(model: LocationModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ELocationBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ELocationBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ELocationBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ELocationBOMUrl.deleteUrl}/${id}`);
  }
}
