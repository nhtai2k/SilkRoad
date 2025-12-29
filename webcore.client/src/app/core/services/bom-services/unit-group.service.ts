import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitGroupModel } from '../../models/bom-models/unit-group.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { EUnitGroupBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class UnitGroupService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<UnitGroupModel>>> {
    const url = `${EUnitGroupBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<UnitGroupModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EUnitGroupBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<UnitGroupModel>>> {
    const url = `${EUnitGroupBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<UnitGroupModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<UnitGroupModel>> {
    return this.http.get<APIResponse<UnitGroupModel>>(`${EUnitGroupBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: UnitGroupModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUnitGroupBOMUrl.createUrl, model);
  }

  update(model: UnitGroupModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUnitGroupBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EUnitGroupBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EUnitGroupBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EUnitGroupBOMUrl.deleteUrl}/${id}`);
  }
}
