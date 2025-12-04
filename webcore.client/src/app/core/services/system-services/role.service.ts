import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleModel } from '@models/system-management-models/role.model';
import { ERoleSystemUrl } from '@common/url-api';

import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http : HttpClient) { }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(ERoleSystemUrl.getOptionListUrl);
  }

  getAll(pageIndex : number, pageSize : Number): Observable<APIResponse<Pagination<RoleModel>>> {
    return this.http.get<APIResponse<Pagination<RoleModel>>>(`${ERoleSystemUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllActive(): Observable<APIResponse<RoleModel[]>> {
    return this.http.get<APIResponse<RoleModel[]>>(ERoleSystemUrl.getAllActiveUrl);
  }

  getById(id: number): Observable<APIResponse<RoleModel>> {
    return this.http.get<APIResponse<RoleModel>>(`${ERoleSystemUrl.getByIdUrl}/${id}`);
  }

  createRole(role: RoleModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ERoleSystemUrl.createUrl, role);
  }

  updateRole(role: RoleModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ERoleSystemUrl.updateUrl, role);
  }

}
