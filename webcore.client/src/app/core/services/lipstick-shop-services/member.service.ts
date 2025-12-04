import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMemberLipstickShopUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { MemberModel } from '@models/lipstick-shop-models/member.model';
import { Pagination } from '@models/pagination.model';

import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAll(query: any): Observable<APIResponse<Pagination<MemberModel>>> {
    return this.http.get<APIResponse<Pagination<MemberModel>>>(EMemberLipstickShopUrl.getAllUrl);
  }
}
