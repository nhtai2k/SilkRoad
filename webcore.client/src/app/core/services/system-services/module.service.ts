import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleModel } from '@models/system-management-models/module.model';
import { EModuleSystemUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient ) { }

  getAll(): Observable<APIResponse<ModuleModel[]>> {
    return this.http.get<APIResponse<ModuleModel[]>>(EModuleSystemUrl.getAllUrl);
  }

  // Alias for backward compatibility
  getModules(): Observable<ModuleModel[]> {
    return this.http.get<ModuleModel[]>(EModuleSystemUrl.getAllUrl);
  }

  getById(id: number): Observable<APIResponse<ModuleModel>> {
    return this.http.get<APIResponse<ModuleModel>>(`${EModuleSystemUrl.getByIdUrl}/${id}`);
  }

  create(module: ModuleModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EModuleSystemUrl.createUrl, module);
  }

  update(module: ModuleModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EModuleSystemUrl.updateUrl, module);
  }
}
