import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EPageTypeLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PageTypeViewModel } from '@models/lipstick-shop-models/page-type.model';
import { Pagination } from '@models/pagination.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTypeService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pagePageType: number): Observable<APIResponse<Pagination<PageTypeViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageTypeViewModel>>>(`${EPageTypeLipstickShopUrl.getAllUrl}/${pageIndex}/${pagePageType}`);
  }

  getAllActive(): Observable<APIResponse<PageTypeViewModel[]>> {
    return this.http.get<APIResponse<PageTypeViewModel[]>>(EPageTypeLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageTypeViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageTypeViewModel>>>(`${EPageTypeLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getEPageType(): Observable<APIResponse<string[]>> {
    return this.http.get<APIResponse<string[]>>(EPageTypeLipstickShopUrl.getEPageTypeUrl);
  }

  getById(id: any): Observable<APIResponse<PageTypeViewModel>> {
    return this.http.get<APIResponse<PageTypeViewModel>>(`${EPageTypeLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: PageTypeViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EPageTypeLipstickShopUrl.createUrl, model);
  }

  update(model: PageTypeViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EPageTypeLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPageTypeLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EPageTypeLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPageTypeLipstickShopUrl.deleteUrl}/${id}`);
  }
}
