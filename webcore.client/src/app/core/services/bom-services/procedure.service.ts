import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcedureModel } from '../../models/bom-models/procedure.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { EProcedureBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class ProcedureService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<ProcedureModel>>> {
    const url = `${EProcedureBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<ProcedureModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EProcedureBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<ProcedureModel>>> {
    const url = `${EProcedureBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<ProcedureModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<ProcedureModel>> {
    return this.http.get<APIResponse<ProcedureModel>>(`${EProcedureBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: ProcedureModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EProcedureBOMUrl.createUrl, model);
  }

  update(model: ProcedureModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EProcedureBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EProcedureBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EProcedureBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EProcedureBOMUrl.deleteUrl}/${id}`);
  }
}
