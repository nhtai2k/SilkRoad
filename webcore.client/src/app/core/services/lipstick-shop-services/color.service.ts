import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EColorLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { ColorViewModel } from '@models/lipstick-shop-models/color.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<ColorViewModel>>> {
    return this.http.get<APIResponse<Pagination<ColorViewModel>>>(`${EColorLipstickShopUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllActive(): Observable<APIResponse<ColorViewModel[]>> {
    return this.http.get<APIResponse<ColorViewModel[]>>(EColorLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<ColorViewModel>>> {
    return this.http.get<APIResponse<Pagination<ColorViewModel>>>(`${EColorLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<ColorViewModel>> {
    return this.http.get<APIResponse<ColorViewModel>>(`${EColorLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: ColorViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EColorLipstickShopUrl.createUrl, model);
  }

  update(model: ColorViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EColorLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EColorLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EColorLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EColorLipstickShopUrl.deleteUrl}/${id}`);
  }
}
