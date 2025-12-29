import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../../models/bom-models/department.model';
import { EDepartmentBOMUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<DepartmentModel>>> {
    const url = `${EDepartmentBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<DepartmentModel>>>(url);
  }
  
  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EDepartmentBOMUrl.getOptionListUrl;
    return this.http.get<APIResponse<OptionModel[]>>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<DepartmentModel>>> {
    const url = `${EDepartmentBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<DepartmentModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<DepartmentModel>> {
    return this.http.get<APIResponse<DepartmentModel>>(`${EDepartmentBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: DepartmentModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EDepartmentBOMUrl.createUrl, model);
  }

  update(model: DepartmentModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EDepartmentBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EDepartmentBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EDepartmentBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EDepartmentBOMUrl.deleteUrl}/${id}`);
  }
}
