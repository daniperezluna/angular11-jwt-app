import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}
  // Provide username and password for authentication, and once authentication is successful,
  //store JWT token in session
  login({ email, password }) {
    return this.httpClient
      .post('http://localhost:8080/login', { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem('username', userData.name);
          sessionStorage.setItem('email', userData.email);
          sessionStorage.setItem('role', userData.role);
          sessionStorage.setItem('permissions', userData.permissions);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('token');
    return !(user === null);
  }

  getUserName() {
    return sessionStorage.getItem('username');
  }

  userRole() {
    return sessionStorage.getItem('role');
  }

  userPermissions() {
    return sessionStorage.getItem('permissions').split(',');
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('token');
  }
}
