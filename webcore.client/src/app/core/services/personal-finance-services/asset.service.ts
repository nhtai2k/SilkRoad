import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EAssetPersonalFinanceUrl } from '@common/url-api';
import { AssetModel } from '@models/personal-finance-models';

@Injectable({ providedIn: 'root' })
export class AssetService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number, userId: number): Observable<APIResponse<Pagination<AssetModel>>> {
    const url = `${EAssetPersonalFinanceUrl.getAllUrl}/${pageIndex}/${pageSize}/${userId}`;
    return this.http.get<APIResponse<Pagination<AssetModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<AssetModel>> {
    return this.http.get<APIResponse<AssetModel>>(`${EAssetPersonalFinanceUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EAssetPersonalFinanceUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EAssetPersonalFinanceUrl.updateUrl, model);
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EAssetPersonalFinanceUrl.deleteUrl}/${id}`);
  }
}
