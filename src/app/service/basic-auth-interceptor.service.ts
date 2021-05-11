import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('token')) {
      const cloned = req.clone({
        headers: req.headers.set(
          'Authorization',
          sessionStorage.getItem('token')
        )
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
