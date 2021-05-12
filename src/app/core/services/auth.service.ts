import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(params) {
    return this.http.post('http://localhost:3000/auth/signup', {
      name: params.name,
      email: params.email,
      password: params.password,
    });
  }
}
