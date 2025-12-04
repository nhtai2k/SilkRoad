import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EBlogLipstickShopUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { BlogViewModel } from '@models/lipstick-shop-models/blog.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  
  getAll(pageIndex: number, pageSize: number, topicId: number): Observable<APIResponse<Pagination<BlogViewModel>>> {
    return this.http.get<APIResponse<Pagination<BlogViewModel>>>(`${EBlogLipstickShopUrl.getAllUrl}/${pageIndex}/${pageSize}/${topicId}`);
  }

  getAllActive(): Observable<APIResponse<BlogViewModel[]>> {
    return this.http.get<APIResponse<BlogViewModel[]>>(EBlogLipstickShopUrl.getAllActiveUrl);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<BlogViewModel>>> {
    return this.http.get<APIResponse<Pagination<BlogViewModel>>>(`${EBlogLipstickShopUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`);
  }

  getById(id: any): Observable<APIResponse<BlogViewModel>> {
    return this.http.get<APIResponse<BlogViewModel>>(`${EBlogLipstickShopUrl.getByIdUrl}/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EBlogLipstickShopUrl.createUrl, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EBlogLipstickShopUrl.updateUrl, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(`${EBlogLipstickShopUrl.softDeleteUrl}/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(`${EBlogLipstickShopUrl.restoreUrl}/${id}`, {});
  }
}

