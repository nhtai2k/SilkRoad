// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { CategoryModel } from '@models/restaurant-models/category.model';
// import { EUrl } from '@common/url-api';
// import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
// import { Pagination } from '@models/pagination.model';
// import { OptionModel } from '@models/option.model';


// @Injectable({
//   providedIn: 'root'
// })

// export class CategoryService {
//   constructor(private http: HttpClient) {}

//   getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryModel>>> {
//     const url = EUrl.getAllUrlCategory.concat(`/${pageIndex}/${pageSize}`);
//     return this.http.get<APIResponse<Pagination<CategoryModel>>>(url);
//   }
//   getOptionList(): Observable<APIResponse<OptionModel[]>> {
//     const url = EUrl.getOptionListUrlCategory;
//     return this.http.get<APIResponse<OptionModel[]>>(url);
//   }
//   getTreeOptionList(): Observable<APIResponse<OptionModel[]>> {
//     const url = EUrl.getTreeOptionListUrlCategory;
//     return this.http.get<APIResponse<OptionModel[]>>(url);
//   }

//   getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryModel>>> {
//     const url = EUrl.getAllDeletedUrlCategory.concat(`/${pageIndex}/${pageSize}`);
//     return this.http.get<APIResponse<Pagination<CategoryModel>>>(url);
//   }

//   getById(id: number): Observable<APIResponse<CategoryModel>> {
//     const url = EUrl.getByIdUrlCategory.concat('/', id.toString());
//     return this.http.get<APIResponse<CategoryModel>>(url);
//   }

//   create(model: FormData): Observable<BaseAPIResponse> {
//     return this.http.post<BaseAPIResponse>(EUrl.createUrlCategory, model);
//   }

//   update(model: FormData): Observable<BaseAPIResponse> {
//     return this.http.put<BaseAPIResponse>(EUrl.updateUrlCategory, model);
//   }

//   softDelete(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.softDeleteUrlCategory.concat('/',id.toString());
//     return this.http.put<BaseAPIResponse>(url, {});
//   }

//   restore(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.restoreUrlCategory.concat('/',id.toString());
//     return this.http.put<BaseAPIResponse>(url, {});
//   }

//   delete(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.deleteUrlCategory.concat('/',id.toString());
//     return this.http.delete<BaseAPIResponse>(url);
//   }
// }