import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem("access_token");
    console.log(request);

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Handle unauthorized error (e.g., log out, redirect to login)
            this.authService.logout();
            return throwError(() => error); // Re-throw the error to propagate it
          } else {
            return throwError(() => error); // Re-throw other errors
          }
        })
      );
    } else {
      // Token not found, handle it appropriately (e.g., redirect to login)
      if (request.url.includes("auth") && request.method.includes("POST")) {
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              // Handle unauthorized error (e.g., log out, redirect to login)
              return throwError(() => error); // Re-throw the error to propagate it
            } else {
              return throwError(() => error); // Re-throw other errors
            }
          })
        );
      }
      console.log("token not found");
      return throwError(() => "Access token not found");
    }
  }
  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   const accessToken = localStorage.getItem("access_token");
  //   console.log(request);

  //   if (accessToken) {
  //     request = request.clone({
  //       setHeaders: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     return next.handle(request).pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         if (error.status === 401) {
  //           // Handle unauthorized error (e.g., log out, redirect to login)
  //           this.authService.logout();
  //           return throwError(() => error); // Re-throw the error to propagate it
  //         } else {
  //           return throwError(() => error); // Re-throw other errors
  //         }
  //       })
  //     );
  //   } else {
  //     // Token not found, handle it appropriately (e.g., redirect to login)
  //     if (request.url.includes("auth") && request.method.includes("POST")) {
  //       console.log(request);
  //       console.log(request.params);
  //       console.log(Object.keys(request.body));
  //       var username = request.body["username"];
  //       var password = request.body["password"];
  //       console.log("username and password", username, password);
  //       // this.authService.login(username, password);
  //       return next.handle(request).pipe(
  //         catchError((error: HttpErrorResponse) => {
  //           if (error.status === 401) {
  //             // Handle unauthorized error (e.g., log out, redirect to login)
  //             this.authService.logout();
  //             return throwError(() => error); // Re-throw the error to propagate it
  //           } else {
  //             return throwError(() => error); // Re-throw other errors
  //           }
  //         })
  //       );
  //     }
  //     // this.authService.handleMissingToken();
  //     console.log("token not found");
  //     return throwError(() => "Access token not found");
  //   }
  // }
}
