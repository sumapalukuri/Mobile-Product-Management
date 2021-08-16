import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      let errorMessage = "";
      if(error instanceof HttpErrorResponse) {
        switch(error.status) {
          case 401 || 400 || 404: {
            errorMessage = "Invalid Login Credentials"
            break;
          }
          case 500: {
            errorMessage = "Services are down. Please try again"
          }
        }
      } else {
        errorMessage = "Something went wrong. Please try again"
      }
      return throwError(errorMessage)
    }))
  }
}
