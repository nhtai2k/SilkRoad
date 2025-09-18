import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {EUrl} from '@common/url-api';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { StockPriceModel } from '@models/stock-models/stock-history.model';
import { BaseAPIResponse } from '@models/api-response.model';


@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  
  getAll(symbol : any): Observable<StockPriceModel[]> {
    return this.http.get<StockPriceModel[]>(EUrl.getAllUrlStockPrice + `/${symbol}`, { headers: this.authenticationService.GetHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.ReNewToken().pipe(
            switchMap(() => this.http.get<StockPriceModel[]>(EUrl.getAllUrlStockPrice + `/${symbol}`, { headers: this.authenticationService.GetHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  getNewData(symbol:string): Observable<BaseAPIResponse> {
      return this.http.post<BaseAPIResponse>(EUrl.getNewDataUrlStockPrice + `/${symbol}`,{ headers: this.authenticationService.GetHeaders() }).pipe(
        catchError(error => {
          if (error.status === 401) {
            return this.authenticationService.ReNewToken().pipe(
              switchMap(() => this.http.post<BaseAPIResponse>(EUrl.getNewDataUrlStockPrice + `/${symbol}`,  { headers: this.authenticationService.GetHeaders() }))
            );
          } else {
            return throwError(() => error);
          }
        })
      );
    }
}
