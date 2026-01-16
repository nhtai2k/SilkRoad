import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EAssetTypePersonalFinanceUrl } from '@common/url-api';
import { AssetTypeModel } from '@models/personal-finance-models';
import { OptionModel } from '@models/option.model';

@Injectable({ providedIn: 'root' })
export class AssetTypeService {
  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<AssetTypeModel>>> {
    return this.http.get<APIResponse<Pagination<AssetTypeModel>>>(`${EAssetTypePersonalFinanceUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<AssetTypeModel>>> {
    return this.http.get<APIResponse<Pagination<AssetTypeModel>>>(`${EAssetTypePersonalFinanceUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EAssetTypePersonalFinanceUrl.getOptionListUrl;
    return this.http.get<APIResponse<OptionModel[]>>(url);
  }

  getById(id: number): Observable<APIResponse<AssetTypeModel>> {
    return this.http.get<APIResponse<AssetTypeModel>>(`${EAssetTypePersonalFinanceUrl.getByIdUrl}/${id}`);
  }

  create(model: AssetTypeModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EAssetTypePersonalFinanceUrl.createUrl, model);
  }

  update(model: AssetTypeModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EAssetTypePersonalFinanceUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EAssetTypePersonalFinanceUrl.softDeleteUrl}/${id}`, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EAssetTypePersonalFinanceUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EAssetTypePersonalFinanceUrl.deleteUrl}/${id}`);
  }
}
