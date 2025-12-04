// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { EUrl } from '@common/url-api';

// import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
// import { Pagination } from '@models/pagination.model';
// import { OptionModel } from '@models/option.model';
// import { TableModel } from '@models/restaurant-models/table.model';

// @Injectable({ providedIn: 'root' })
// export class TableService {
//   constructor(private http: HttpClient) {}

//   getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<TableModel>>> {
//     const url = EUrl.getAllUrlTable.concat(`/${pageIndex}/${pageSize}`);
//     return this.http.get<APIResponse<Pagination<TableModel>>>(url);
//   }
//   getOptionList(): Observable<APIResponse<OptionModel[]>> {
//     const url = EUrl.getOptionListUrlTable;
//     return this.http.get<APIResponse<OptionModel[]>>(url);
//   }

//   getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<TableModel>>> {
//     const url = EUrl.getAllDeletedUrlTable.concat(`/${pageIndex}/${pageSize}`);
//     return this.http.get<APIResponse<Pagination<TableModel>>>(url);
//   }

//   getById(id: number): Observable<APIResponse<TableModel>> {
//     const url = EUrl.getByIdUrlTable.concat('/',id.toString());
//     return this.http.get<APIResponse<TableModel>>(url);
//   }

//   create(model: TableModel): Observable<BaseAPIResponse> {
//     return this.http.post<BaseAPIResponse>(EUrl.createUrlTable, model);
//   }

//   update(model: TableModel): Observable<BaseAPIResponse> {
//     return this.http.put<BaseAPIResponse>(EUrl.updateUrlTable, model);
//   }

//   softDelete(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.softDeleteUrlTable.concat('/',id.toString());
//     return this.http.put<BaseAPIResponse>(url, {});
//   }

//   restore(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.restoreUrlTable.concat('/',id.toString());
//     return this.http.put<BaseAPIResponse>(url, {});
//   }

//   delete(id: number): Observable<BaseAPIResponse> {
//     const url = EUrl.deleteUrlTable.concat('/',id.toString());
//     return this.http.delete<BaseAPIResponse>(url);
//   }
// }
