import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { APIResponse } from '@models/api-response.model';
import { ProvinceModel } from '@models/province.model';
import { EProvinceSystemUrl } from '@common/url-api';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

constructor(private http: HttpClient) { }

  getAll(): Observable<APIResponse<ProvinceModel[]>> {
    return this.http.get<APIResponse<ProvinceModel[]>>(EProvinceSystemUrl.getAllUrl);
  }
  
}

