import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MallModel } from '../../models/bom-models/mall.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EMallBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class MallService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<MallModel>>> {
    const url = `${EMallBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<MallModel>>>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<MallModel>>> {
    const url = `${EMallBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<MallModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<MallModel>> {
    return this.http.get<APIResponse<MallModel>>(`${EMallBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: MallModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EMallBOMUrl.createUrl, model);
  }

  update(model: MallModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EMallBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EMallBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EMallBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EMallBOMUrl.deleteUrl}/${id}`);
  }
}
