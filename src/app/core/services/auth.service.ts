import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('Token') || ''; // Check whether the token is expired and return
  //   // true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }
  setLocalStorage(request) {
    return (
      request.hasOwnProperty('token') &&
      localStorage.setItem('Token', request.token)
    );
  }

  register(params) {
    return this.http.post('http://localhost:3000/api/user/register', {
      username: params.name,
      email: params.email,
      password: params.password,
    });
  }

  login(data) {
    return this.http.post('http://localhost:3000/api/user/login', data);
    // .pipe(
    //   tap((res) => {
    //     this.setLocalStorage(res);
    //     this.router.navigate(['user/my-account']);
    //   }),
    //   catchError((err) => {
    //     const { error } = err;

    //     return new Observable((res) => {
    //       let reqData = {};

    //       if (err.status === 401) {
    //         reqData = {
    //           message: error.message,
    //           status: error.status,
    //           token: error.token,
    //         };
    //       } else {
    //         reqData = {
    //           message: err.statusText,
    //           status: err.status,
    //           token: '',
    //         };
    //       }
    //       res.next(reqData);
    //     });
    //   })
    //  );
  }

  loggedIn() {
    return !!localStorage.getItem('Token');
  }
}
