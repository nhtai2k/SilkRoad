import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EPageContentLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PageContentViewModel } from '@models/lipstick-shop-models/page-content.model';
import { Pagination } from '@models/pagination.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageContentService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pagePageContent: number, pageTypeId: number): Observable<APIResponse<Pagination<PageContentViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageContentViewModel>>>(`${EPageContentLipstickShopUrl.getAllUrl}/${pageIndex}/${pagePageContent}/${pageTypeId}`);
  }

  getAllActive(): Observable<APIResponse<PageContentViewModel[]>> {
    return this.http.get<APIResponse<PageContentViewModel[]>>(EPageContentLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageContentViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageContentViewModel>>>(`${EPageContentLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<PageContentViewModel>> {
    return this.http.get<APIResponse<PageContentViewModel>>(`${EPageContentLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: PageContentViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EPageContentLipstickShopUrl.createUrl, model);
  }

  update(model: PageContentViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EPageContentLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPageContentLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EPageContentLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPageContentLipstickShopUrl.deleteUrl}/${id}`);
  }
}
