import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EOrderLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { OrderModel } from '@models/lipstick-shop-models/order.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(query: any): Observable<APIResponse<Pagination<OrderModel>>> {
    return this.http.get<APIResponse<Pagination<OrderModel>>>(EOrderLipstickShopUrl.getAllUrl, { params: query });
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<OrderModel>>> {
    return this.http.get<APIResponse<Pagination<OrderModel>>>(`${EOrderLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<OrderModel>> {
    return this.http.get<APIResponse<OrderModel>>(`${EOrderLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: OrderModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EOrderLipstickShopUrl.createUrl, model);
  }

  update(model: OrderModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EOrderLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EOrderLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EOrderLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EOrderLipstickShopUrl.deleteUrl}/${id}`);
  }
}
