import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EActionLoggingSystemUrl } from '@common/url-api';
import { Observable } from 'rxjs';
import { APIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ActionLoggingModel } from '@models/system-management-models/action-logging.model';


@Injectable({
  providedIn: 'root'
})
export class ActionLoggingService {

  constructor(private http: HttpClient) { }

  getAll(query: any): Observable<APIResponse<Pagination<ActionLoggingModel>>> {
    return this.http.get<APIResponse<Pagination<ActionLoggingModel>>>(EActionLoggingSystemUrl.getAllUrl, { params: query });
  }

  getById(id: any): Observable<APIResponse<ActionLoggingModel>> {
    return this.http.get<APIResponse<ActionLoggingModel>>(`${EActionLoggingSystemUrl.getByIdUrl}/${id}`);
  }
}
