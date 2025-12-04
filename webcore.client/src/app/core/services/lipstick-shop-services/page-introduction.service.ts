import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EPageIntroductionLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PageIntroductionViewModel } from '@models/lipstick-shop-models/page-introduction.model';
import { Pagination } from '@models/pagination.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageIntroductionService {

  constructor(private http: HttpClient) { }

  getAll(pageTypeId: number, pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageIntroductionViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageIntroductionViewModel>>>(`${EPageIntroductionLipstickShopUrl.getAllUrl}/${pageTypeId}/${pageIndex}/${pageSize}`);
  }

  getAllActive(): Observable<APIResponse<PageIntroductionViewModel[]>> {
    return this.http.get<APIResponse<PageIntroductionViewModel[]>>(EPageIntroductionLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageIntroductionViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageIntroductionViewModel>>>(`${EPageIntroductionLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<PageIntroductionViewModel>> {
    return this.http.get<APIResponse<PageIntroductionViewModel>>(`${EPageIntroductionLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(formData: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EPageIntroductionLipstickShopUrl.createUrl, formData);
  }

  update(formData: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EPageIntroductionLipstickShopUrl.updateUrl, formData);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPageIntroductionLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EPageIntroductionLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EPageIntroductionLipstickShopUrl.deleteUrl}/${id}`);
  }
}
