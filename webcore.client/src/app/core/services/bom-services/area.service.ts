import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaModel } from '../../models/bom-models/area.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EAreaBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class AreaService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<AreaModel>>> {
    const url = `${EAreaBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<AreaModel>>>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<AreaModel>>> {
    const url = `${EAreaBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<AreaModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<AreaModel>> {
    return this.http.get<APIResponse<AreaModel>>(`${EAreaBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: AreaModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EAreaBOMUrl.createUrl, model);
  }

  update(model: AreaModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EAreaBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EAreaBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EAreaBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EAreaBOMUrl.deleteUrl}/${id}`);
  }
}
