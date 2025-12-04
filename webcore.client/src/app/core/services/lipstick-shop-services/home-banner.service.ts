import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EHomeBannerLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { HomeBannerViewModel } from '@models/lipstick-shop-models/home-banner.model';
import { Pagination } from '@models/pagination.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeBannerService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number, bannerTypeId: number): Observable<APIResponse<Pagination<HomeBannerViewModel>>> {
    return this.http.get<APIResponse<Pagination<HomeBannerViewModel>>>(`${EHomeBannerLipstickShopUrl.getAllUrl}/${pageIndex}/${pageSize}/${bannerTypeId}`);
  }

  getAllActive(): Observable<APIResponse<HomeBannerViewModel[]>> {
    return this.http.get<APIResponse<HomeBannerViewModel[]>>(EHomeBannerLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<HomeBannerViewModel>>> {
    return this.http.get<APIResponse<Pagination<HomeBannerViewModel>>>(`${EHomeBannerLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getByBannerTypeId(bannerTypeId: number): Observable<APIResponse<HomeBannerViewModel[]>> {
    return this.http.get<APIResponse<HomeBannerViewModel[]>>(`${EHomeBannerLipstickShopUrl.getByBannerTypeIdUrl}/${bannerTypeId}`);
  }

  getById(id: any): Observable<APIResponse<HomeBannerViewModel>> {
    return this.http.get<APIResponse<HomeBannerViewModel>>(`${EHomeBannerLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EHomeBannerLipstickShopUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EHomeBannerLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EHomeBannerLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EHomeBannerLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EHomeBannerLipstickShopUrl.deleteUrl}/${id}`);
  }

}
