import { Injectable } from '@angular/core';
import { SettingModel } from '@models/system-management-models/setting.model';
import { ESettingSystemUrl } from '../../common/url-api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }

  getAllSettings(): Observable<SettingModel[]> {
    return this.http.get<SettingModel[]>(ESettingSystemUrl.getAllUrl);
  }

  getSettingByKey(key: any): Observable<SettingModel> {
    return this.http.get<SettingModel>(`${ESettingSystemUrl.getByKeyUrl}/${key}`);
  }

  updateSetting(setting: SettingModel): Observable<SettingModel> {
    return this.http.put<SettingModel>(ESettingSystemUrl.updateUrl, setting);
  }
}
