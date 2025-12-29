import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnergyModel } from '../../models/bom-models/energy.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';
import { EEnergyBOMUrl } from '@common/url-api';

@Injectable({ providedIn: 'root' })
export class EnergyService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<EnergyModel>>> {
    const url = `${EEnergyBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<EnergyModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    return this.http.get<APIResponse<OptionModel[]>>(EEnergyBOMUrl.getOptionListUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<EnergyModel>>> {
    const url = `${EEnergyBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<EnergyModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<EnergyModel>> {
    return this.http.get<APIResponse<EnergyModel>>(`${EEnergyBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: EnergyModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EEnergyBOMUrl.createUrl, model);
  }

  update(model: EnergyModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EEnergyBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EEnergyBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EEnergyBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EEnergyBOMUrl.deleteUrl}/${id}`);
  }

  exportExcel(): Observable<Blob> {
    return this.http.get(EEnergyBOMUrl.exportExcelUrl, { responseType: 'blob' });
  }
}
