// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
// import { Pagination } from '@models/pagination.model';
// import { ERentalBOMUrl } from '@common/url-api';

// @Injectable({ providedIn: 'root' })
// export class RentalService {
//   constructor(private http: HttpClient) {}

//   getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<RentalModel>>> {
//     const url = `${ERentalBOMUrl.getAllUrl}/${pageIndex}/${pageSize}`;
//     return this.http.get<APIResponse<Pagination<RentalModel>>>(url);
//   }

//   getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<RentalModel>>> {
//     const url = `${ERentalBOMUrl.getAllDeletedUrl}/${pageIndex}/${pageSize}`;
//     return this.http.get<APIResponse<Pagination<RentalModel>>>(url);
//   }

//   getById(id: number): Observable<APIResponse<RentalModel>> {
//     return this.http.get<APIResponse<RentalModel>>(`${ERentalBOMUrl.getByIdUrl}/${id}`);
//   }

//   create(model: RentalModel): Observable<BaseAPIResponse> {
//     return this.http.post<BaseAPIResponse>(ERentalBOMUrl.createUrl, model);
//   }

//   update(model: RentalModel): Observable<BaseAPIResponse> {
//     return this.http.put<BaseAPIResponse>(ERentalBOMUrl.updateUrl, model);
//   }

//   softDelete(id: number): Observable<BaseAPIResponse> {
//     return this.http.put<BaseAPIResponse>(`${ERentalBOMUrl.softDeleteUrl}/${id}`, {});
//   }

//   restore(id: number): Observable<BaseAPIResponse> {
//     return this.http.put<BaseAPIResponse>(`${ERentalBOMUrl.restoreUrl}/${id}`, {});
//   }

//   delete(id: number): Observable<BaseAPIResponse> {
//     return this.http.delete<BaseAPIResponse>(`${ERentalBOMUrl.deleteUrl}/${id}`);
//   }
// }