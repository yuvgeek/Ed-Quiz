import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Accept: 'application/json',
        Authorization: this.basicAuth,
      },
    });

    return next.handle(request);
  }

  get basicAuth() {
    return (
      'Basic ' +
      btoa(
        `${environment.HARPER_DB_USERNAME}:${environment.HARPER_DB_PASSWORD}`
      )
    );
  }
}
