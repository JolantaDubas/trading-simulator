import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { SnackBarService } from '../services/snackBar.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private snackBar: SnackBarService) {
    const token = localStorage.getItem('Token') || ''; // Check whether the token is expired and return
    if (this.jwtHelper.isTokenExpired(token) && token) {
      localStorage.removeItem('Token');
      this.snackBar.showInfo('Your token has expired');
    }
  }
  apiUrl = environment.apiUrl;

  public jwtHelper: JwtHelperService = new JwtHelperService();

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
    return this.http.post(`${this.apiUrl}user/register`, {
      username: params.name,
      email: params.email,
      password: params.password,
    });
  }

  login(data) {
    return this.http.post(`${this.apiUrl}user/login`, data);
  }

  loggedIn() {
    // true or false
    return !!localStorage.getItem('Token');
  }

  public getToken(): string {
    return localStorage.getItem('Token');
  }
}
