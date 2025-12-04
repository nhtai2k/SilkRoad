import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EProductLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { ProductViewModel } from '@models/lipstick-shop-models/product.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<APIResponse<Pagination<ProductViewModel>>> {
    return this.http.get<APIResponse<Pagination<ProductViewModel>>>(EProductLipstickShopUrl.getAllUrl);
  }

  getAllActive(): Observable<APIResponse<ProductViewModel[]>> {
    return this.http.get<APIResponse<ProductViewModel[]>>(EProductLipstickShopUrl.getAllActiveUrl);
  }

  getById(id: any): Observable<APIResponse<ProductViewModel>> {
    return this.http.get<APIResponse<ProductViewModel>>(`${EProductLipstickShopUrl.getByIdUrl}/${id}`);
  }

  getAllByFilter(query: any): Observable<APIResponse<Pagination<ProductViewModel>>> {
    return this.http.get<APIResponse<Pagination<ProductViewModel>>>(EProductLipstickShopUrl.getAllUrl);
  }

  getBySearchText(searchText: any): Observable<APIResponse<ProductViewModel[]>> {
    return this.http.get<APIResponse<ProductViewModel[]>>(`${EProductLipstickShopUrl.getBySearchTextUrl}/${searchText}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EProductLipstickShopUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EProductLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EProductLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EProductLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EProductLipstickShopUrl.deleteUrl}/${id}`);
  }
}

