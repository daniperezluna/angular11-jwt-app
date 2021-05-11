import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import usersData from '../../assets/users.json';
import employeesData from '../../assets/employees.json';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  private _users = usersData;
  private _employees = employeesData;

  constructor(private http: HttpClient) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }
  /**
   * Handle request's and support with mock data.
   * @param req
   * @param next
   */
  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;
    if (url.endsWith('/login') && method === 'POST') {
      let user = this.checkUserRole({
        email: req.body.email,
        password: req.body.password
      });
      return user
        ? of(new HttpResponse({ status: 200, body: user }))
        : throwError(
            new HttpResponse({
              status: 404,
              statusText: 'Email/Password not valid'
            })
          );
    }
    if (url.endsWith('/employees') && method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this._employees }));
    }
    if (url.endsWith('/employees') && method === 'POST') {
      const { body } = req.clone();
      return of(new HttpResponse({ status: 200, body }));
    }
    if (url.match(/\/employees\/.*/) && method === 'DELETE') {
      const empId = this.getEmployeeId(url);
      return of(new HttpResponse({ status: 200, body: empId }));
    }
    // if there is not any matches return default request.
    return next.handle(req);
  }
  /**
   * Get Employee unique uuid from url.
   * @param url
   */
  getEmployeeId(url: any) {
    const urlValues = url.split('/');
    return urlValues[urlValues.length - 1];
  }

  checkUserRole({ email, password }) {
    if (email === 'admin@company.com' && password === 'admin') {
      return this._users[0];
    } else if (email === 'user@company.com' && password === 'user') {
      return this._users[1];
    } else if (
      email === 'superadmin@company.com' &&
      password === 'superadmin'
    ) {
      return this._users[2];
    }
    return null;
  }
}
