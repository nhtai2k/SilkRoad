import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ESubCategoryLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { SubCategoryViewModel } from '@models/lipstick-shop-models/sub-category.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number, categoryId: number): Observable<APIResponse<Pagination<SubCategoryViewModel>>> {
    return this.http.get<APIResponse<Pagination<SubCategoryViewModel>>>(`${ESubCategoryLipstickShopUrl.getAllUrl}/${pageIndex}/${pageSize}/${categoryId}`);
  }

  getAllActive(): Observable<APIResponse<SubCategoryViewModel[]>> {
    return this.http.get<APIResponse<SubCategoryViewModel[]>>(ESubCategoryLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SubCategoryViewModel>>> {
    return this.http.get<APIResponse<Pagination<SubCategoryViewModel>>>(`${ESubCategoryLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getByCategoryId(categoryId: number): Observable<APIResponse<SubCategoryViewModel[]>> {
    return this.http.get<APIResponse<SubCategoryViewModel[]>>(`${ESubCategoryLipstickShopUrl.getByCategoryIdUrl}/${categoryId}`);
  }

  getById(id: any): Observable<APIResponse<SubCategoryViewModel>> {
    return this.http.get<APIResponse<SubCategoryViewModel>>(`${ESubCategoryLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: SubCategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ESubCategoryLipstickShopUrl.createUrl, model);
  }

  update(model: SubCategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ESubCategoryLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ESubCategoryLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ESubCategoryLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ESubCategoryLipstickShopUrl.deleteUrl}/${id}`);
  }
}
