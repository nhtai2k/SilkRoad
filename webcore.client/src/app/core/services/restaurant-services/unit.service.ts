// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { EUrl } from '@common/url-api';

// import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
// import { Pagination } from '@models/pagination.model';
// import { OptionModel } from '@models/option.model';
// import { UnitModel } from '@models/restaurant-models/unit.model';

// @Injectable({ providedIn: 'root' })
// export class UnitService {
//   constructor(private http: HttpClient) {}

//   getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<UnitModel>>> {
//     const url = EUrl.getAllUrlUnit.concat(`/${pageIndex}/${pageSize}`);
//     return this.http.get<APIResponse<Pagination<UnitModel>>>(url);
//   }
//   getOptionList(): Observable<APIResponse<OptionModel[]>> {
//     const url = EUrl.getOptionListUrlUnit;
//     return this.http.get<APIResponse<OptionModel[]>>(url);
//   }

//   getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<UnitModel>>> {
//     const url = EUrl.getAllDeletedUrlUnit.concat(`/${pageIndex}/${pageSize}`);
//     return this.http.get<APIResponse<Pagination<UnitModel>>>(url);
//   }

//   getById(id: number): Observable<APIResponse<UnitModel>> {
//     const url = EUrl.getByIdUrlUnit.concat('/',id.toString());
//     return this.http.get<APIResponse<UnitModel>>(url);
//   }

//   create(model: UnitModel): Observable<BaseAPIResponse> {
//     return this.http.post<BaseAPIResponse>(EUrl.createUrlUnit, model);
//   }

//   update(model: UnitModel): Observable<BaseAPIResponse> {
//     return this.http.put<BaseAPIResponse>(EUrl.updateUrlUnit, model);
//   }

//   softDelete(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.softDeleteUrlUnit.concat('/',id.toString());
//     return this.http.put<BaseAPIResponse>(url, {});
//   }

//   restore(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.restoreUrlUnit.concat('/',id.toString());
//     return this.http.put<BaseAPIResponse>(url, {});
//   }

//   delete(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.deleteUrlUnit.concat('/',id.toString());
//     return this.http.delete<BaseAPIResponse>(url);
//   }
// }
