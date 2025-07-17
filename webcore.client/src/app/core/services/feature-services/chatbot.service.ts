// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { EUrl } from '@common/url-api';
// import { ChatViewModel } from '@models/feature-models/chat.model';
// import { AuthenticationService } from '@services/system-services/authentication.service';
// import { catchError, Observable, switchMap, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatbotService {

//   constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
//   getResponse(form: FormData): Observable<ChatViewModel> {
//     return this.http.post<ChatViewModel>(EUrl.getResponse, form, {
//       headers: this.authenticationService.GetHeaders()
      
//     }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.post<ChatViewModel>(EUrl.getResponse, form, {
//               headers: this.authenticationService.GetHeaders()
//             }))
//           );
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }
// }
