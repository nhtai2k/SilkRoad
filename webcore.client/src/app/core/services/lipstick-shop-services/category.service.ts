import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ECategoryLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { CategoryViewModel } from '@models/lipstick-shop-models/category.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryViewModel>>> {
    return this.http.get<APIResponse<Pagination<CategoryViewModel>>>(`${ECategoryLipstickShopUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllActive(): Observable<APIResponse<CategoryViewModel[]>> {
    return this.http.get<APIResponse<CategoryViewModel[]>>(ECategoryLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryViewModel>>> {
    return this.http.get<APIResponse<Pagination<CategoryViewModel>>>(`${ECategoryLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<CategoryViewModel>> {
    return this.http.get<APIResponse<CategoryViewModel>>(`${ECategoryLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: CategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ECategoryLipstickShopUrl.createUrl, model);
  }

  update(model: CategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ECategoryLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ECategoryLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ECategoryLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ECategoryLipstickShopUrl.deleteUrl}/${id}`);
  }
}
