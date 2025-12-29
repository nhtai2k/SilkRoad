import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DishModel } from '../../models/bom-models/dish.model';
import { EDishBOMUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class DishService {
  constructor(private http: HttpClient) { }

  exportExcel(): Observable<Blob> {
    const url = EDishBOMUrl.exportExcelUrl;
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<DishModel>>> {
    const url = `${EDishBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<DishModel>>>(url);
  }

    getOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EDishBOMUrl.getOptionListUrl;
    return this.http.get<APIResponse<OptionModel[]>>(url);
  }


  getByFilter(filter: any): Observable<APIResponse<Pagination<DishModel>>> {
    return this.http.post<APIResponse<Pagination<DishModel>>>(EDishBOMUrl.getByFilterUrl, filter);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<DishModel>>> {
    const url = `${EDishBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<DishModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<DishModel>> {
    return this.http.get<APIResponse<DishModel>>(`${EDishBOMUrl.getByIdUrl}/${id}`);
  }

  create(model: DishModel | FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EDishBOMUrl.createUrl, model);
  }

  update(model: DishModel | FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EDishBOMUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EDishBOMUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EDishBOMUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EDishBOMUrl.deleteUrl}/${id}`);
  }
}
