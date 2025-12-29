import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/bom-models/employee.model';
import { EEmployeeBOMUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<EmployeeModel>>> {
    const url = `${EEmployeeBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<EmployeeModel>>>(url);
  }
  
  getByFilter(filter: any): Observable<APIResponse<Pagination<EmployeeModel>>> {
    return this.http.post<APIResponse<Pagination<EmployeeModel>>>(EEmployeeBOMUrl.getByFilterUrl, filter);
  }

  getByDepartmentIdNRankId(departmentId: number, rankId: number): Observable<APIResponse<EmployeeModel[]>> {
    const url = `${EEmployeeBOMUrl.getByDepartmentIdNRankIdUrl}/${departmentId}/${rankId}`;
    return this.http.get<APIResponse<EmployeeModel[]>>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<EmployeeModel>>> {
    const url = `${EEmployeeBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<EmployeeModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<EmployeeModel>> {
    return this.http.get<APIResponse<EmployeeModel>>(`${EEmployeeBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: EmployeeModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EEmployeeBOMUrl.createUrl, model);
  }

  update(model: EmployeeModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EEmployeeBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EEmployeeBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EEmployeeBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EEmployeeBOMUrl.deleteUrl}/${id}`);
  }
}