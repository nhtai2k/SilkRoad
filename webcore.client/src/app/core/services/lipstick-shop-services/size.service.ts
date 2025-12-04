import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ESizeLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { SizeViewModel } from '@models/lipstick-shop-models/size.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SizeViewModel>>> {
    return this.http.get<APIResponse<Pagination<SizeViewModel>>>(`${ESizeLipstickShopUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllActive(): Observable<APIResponse<SizeViewModel[]>> {
    return this.http.get<APIResponse<SizeViewModel[]>>(ESizeLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SizeViewModel>>> {
    return this.http.get<APIResponse<Pagination<SizeViewModel>>>(`${ESizeLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<SizeViewModel>> {
    return this.http.get<APIResponse<SizeViewModel>>(`${ESizeLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: SizeViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ESizeLipstickShopUrl.createUrl, model);
  }

  update(model: SizeViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ESizeLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ESizeLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ESizeLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ESizeLipstickShopUrl.deleteUrl}/${id}`);
  }
}
