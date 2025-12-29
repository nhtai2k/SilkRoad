import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitModel } from '../../models/bom-models/unit.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { EUnitBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class UnitService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<UnitModel>>> {
    const url = `${EUnitBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<UnitModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EUnitBOMUrl.getOptionListUrl);
  }

  getTreeOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EUnitBOMUrl.getTreeOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<UnitModel>>> {
    const url = `${EUnitBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<UnitModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<UnitModel>> {
    return this.http.get<APIResponse<UnitModel>>(`${EUnitBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: UnitModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUnitBOMUrl.createUrl, model);
  }

  update(model: UnitModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUnitBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EUnitBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EUnitBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EUnitBOMUrl.deleteUrl}/${id}`);
  }
}
