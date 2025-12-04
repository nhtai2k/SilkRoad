import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { Observable, catchError, switchMap, throwError, from, EMPTY } from 'rxjs';
import { AuthService } from './auth.service';


const isRefreshing = signal(false);
const refreshQueue: Array<(token: string | null) => void> = [];

// Interceptor tự động:
// 1. Chèn Authorization Bearer <token>
// 2. Nếu API trả về 401 → gọi refresh token
// 3. Nếu refresh thành công → retry request gốc
// 4. Nếu thất bại → logout

export const authInterceptorService: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);

  let modified = req;
//  debugger;
  /** Thêm Bearer token nếu có */
  if (auth.accessToken()) {
    modified = req.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.accessToken()}`,
      },
    });
  }
  console.log('Request with auth:', auth.accessToken());

  return next(modified).pipe(
    catchError((error: HttpErrorResponse) => {
      /** Nếu không phải 401 → ném lỗi */
      if (error.status !== 401) {
        return throwError(() => error);
      }

      /** Nếu đang refresh → đưa request vào hàng đợi */
      if (isRefreshing()) {
        return from(
          new Promise<Observable<HttpEvent<unknown>>>((resolve, reject) => {
            refreshQueue.push((token) => {
              if (token) {
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${token}` },
                });
                resolve(next(retryReq));
              } else {
                reject(new Error('Token refresh failed'));
              }
            });
          })
        ).pipe(switchMap(obs => obs));
      }

      /** Bắt đầu refresh */
      isRefreshing.set(true);

      return auth.refreshToken().pipe(
        switchMap((res) => {
          isRefreshing.set(false);
          
          if (res) {
            const newToken = auth.accessToken();
            // Chạy lại tất cả request đang chờ với token mới
            refreshQueue.forEach((resume) => resume(newToken));
            refreshQueue.length = 0;
  
            // Retry request hiện tại với token mới
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });
            return next(retryReq);
          } else {
            // Refresh thất bại - logout và clear queue
            auth.logOut();
            refreshQueue.forEach((resume) => resume(null));
            refreshQueue.length = 0;
            return throwError(() => new Error('Token refresh failed'));
          }
        }),

        catchError((refreshErr) => {
          isRefreshing.set(false);
          auth.logOut();
          refreshQueue.forEach((resume) => resume(null));
          refreshQueue.length = 0;
          return throwError(() => refreshErr);
        })
      );
    })
  );
};
