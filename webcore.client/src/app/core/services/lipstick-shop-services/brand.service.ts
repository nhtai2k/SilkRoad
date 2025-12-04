import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EBrandLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { BrandViewModel } from '@models/lipstick-shop-models/brand.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<BrandViewModel>>> {
    return this.http.get<APIResponse<Pagination<BrandViewModel>>>(`${EBrandLipstickShopUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllActive(): Observable<APIResponse<BrandViewModel[]>> {
    return this.http.get<APIResponse<BrandViewModel[]>>(EBrandLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<BrandViewModel>>> {
    return this.http.get<APIResponse<Pagination<BrandViewModel>>>(`${EBrandLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<BrandViewModel>> {
    return this.http.get<APIResponse<BrandViewModel>>(`${EBrandLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EBrandLipstickShopUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EBrandLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EBrandLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EBrandLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EBrandLipstickShopUrl.deleteUrl}/${id}`);
  }
}
