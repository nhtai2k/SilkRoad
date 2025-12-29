import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RankModel } from '../../models/bom-models/rank.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { ERankBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class RankService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<RankModel>>> {
    const url = `${ERankBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<RankModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(ERankBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<RankModel>>> {
    const url = `${ERankBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<RankModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<RankModel>> {
    return this.http.get<APIResponse<RankModel>>(`${ERankBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: RankModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ERankBOMUrl.createUrl, model);
  }

  update(model: RankModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ERankBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ERankBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ERankBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ERankBOMUrl.deleteUrl}/${id}`);
  }
}