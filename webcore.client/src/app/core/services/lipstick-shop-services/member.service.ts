import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { MemberModel } from '@models/lipstick-shop-models/member.model';
import { Pagination } from '@models/pagination.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  getAll(query: any): Observable<APIResponse<Pagination<MemberModel>>> {
    return this.http.get<APIResponse<Pagination<MemberModel>>>(EUrl.getAllUrlMember, { headers: this.authenticationService.GetHeaders(), params: query }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<MemberModel>>>(EUrl.getAllUrlMember, { headers: this.authenticationService.GetHeaders(), params: query }))
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
