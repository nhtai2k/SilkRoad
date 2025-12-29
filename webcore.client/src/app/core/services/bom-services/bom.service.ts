import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BOMCategoryModel, BOMModel } from '../../models/bom-models/bom.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EBOMUrl } from '@common/url-api';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class BomService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<BOMModel>>> {
    const url = `${EBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<BOMModel>>>(url);
  }

  getAllByFilter(filter: any): Observable<APIResponse<Pagination<BOMModel>>> {
    return this.http.post<APIResponse<Pagination<BOMModel>>>(EBOMUrl.getAllByFilterUrl, filter);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<BOMModel>>> {
    const url = `${EBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<BOMModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<BOMModel>> {
    return this.http.get<APIResponse<BOMModel>>(`${EBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: BOMModel): Observable<APIResponse<BOMModel>> {
    return this.http.post<APIResponse<BOMModel>>(EBOMUrl.createUrl, model);
  }

  update(model: BOMModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EBOMUrl.deleteUrl}/${id}`);
  }
}
