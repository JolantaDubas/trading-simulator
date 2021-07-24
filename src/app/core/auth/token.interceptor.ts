import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

interface DecodedToken {
  exp: number;
  jti: string;
  nbf: number;
  role: string;
  sub: string;
  unique_name: string;
}
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf(environment.apiUrl) === 0) {
      const tokenRequest = request.clone({
        setHeaders: {
          'Access-Control-Allow-Headers':
            'X-Requested-With,content-type,**Authorization**',
          Authorization: `Bearer ${this.auth.getToken()}`,
        },
      });
      return next.handle(tokenRequest);
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.auth.getToken();
    if (!token) {
      return request;
    }

    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  public getDecodedToken(): DecodedToken | null {
    const token = this.auth.getToken();
    if (!token) {
      return null;
    }
    return JwtHelperService.prototype.decodeToken(token) as DecodedToken;
  }
}
