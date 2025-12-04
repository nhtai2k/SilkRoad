// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { EUrl } from '@common/url-api';
// import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
// import { Pagination } from '@models/pagination.model';
// import { OptionModel } from '@models/option.model';
// import { DishModel } from '@models/restaurant-models/dish.model';

// @Injectable({ providedIn: 'root' })
// export class DishService {
//   constructor(private http: HttpClient) {}

//   getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<DishModel>>> {
//     const url = EUrl.getAllUrlDish.concat(`/${pageIndex}/${pageSize}`);
//     return this.http.get<APIResponse<Pagination<DishModel>>>(url);
//   }

//   getByFilter(filter: any): Observable<APIResponse<Pagination<DishModel>>> {
//     const url = EUrl.getByFilterUrlDish;
//     return this.http.post<APIResponse<Pagination<DishModel>>>(url, filter);
//   }


//   getOptionList(): Observable<APIResponse<OptionModel[]>> {
//     const url = EUrl.getOptionListUrlDish;
//     return this.http.get<APIResponse<OptionModel[]>>(url);
//   }

//   getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<DishModel>>> {
//     const url = EUrl.getAllDeletedUrlDish.concat(`/${pageIndex}/${pageSize}`);
//     return this.http.get<APIResponse<Pagination<DishModel>>>(url);
//   }
//   getById(id: number): Observable<APIResponse<DishModel>> {
//     const url = EUrl.getByIdUrlDish.concat('/', id.toString());
//     return this.http.get<APIResponse<DishModel>>(url);
//   }

//   create(model: FormData): Observable<BaseAPIResponse> {
//     return this.http.post<BaseAPIResponse>(EUrl.createUrlDish, model);
//   }

//   update(model: FormData): Observable<BaseAPIResponse> {
//     return this.http.put<BaseAPIResponse>(EUrl.updateUrlDish, model);
//   }

//   softDelete(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.softDeleteUrlDish.concat('/',id.toString());
//     return this.http.put<BaseAPIResponse>(url, {});
//   }

//   restore(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.restoreUrlDish.concat('/',id.toString());
//     return this.http.put<BaseAPIResponse>(url, {});
//   }

//   delete(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.deleteUrlDish.concat('/',id.toString());
//     return this.http.delete<BaseAPIResponse>(url);
//   }

//     exportExcel(): Observable<Blob> {
//     return this.http.get(EUrl.exportExcelUrlDish, {
//       responseType: 'blob'
//     });
//   }
// }
