import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TopicViewModel } from '@models/lipstick-shop-models/topic.model';
import { Observable } from 'rxjs';
import { ETopicLipstickShopUrl } from '@common/url-api';
import { Pagination } from '@models/pagination.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<TopicViewModel>>> {
    return this.http.get<APIResponse<Pagination<TopicViewModel>>>(`${ETopicLipstickShopUrl.getAllUrl}/${pageIndex}/${pageSize}`);
  }

  getAllActive(): Observable<APIResponse<TopicViewModel[]>> {
    return this.http.get<APIResponse<TopicViewModel[]>>(ETopicLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<TopicViewModel>>> {
    return this.http.get<APIResponse<Pagination<TopicViewModel>>>(`${ETopicLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<TopicViewModel>> {
    return this.http.get<APIResponse<TopicViewModel>>(`${ETopicLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(unit: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(ETopicLipstickShopUrl.createUrl, unit);
  }

  update(unit: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(ETopicLipstickShopUrl.updateUrl, unit);
  }

  softDelete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ETopicLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${ETopicLipstickShopUrl.restoreUrl}/${id}`, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${ETopicLipstickShopUrl.deleteUrl}/${id}`);
  }
}
