import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapitalItem } from '../models/capitalItem';

@Injectable({
  providedIn: 'root',
})
export class CapitalService {
  constructor(private http: HttpClient) {}

  createCapital(params: CapitalItem) {
    return this.http.post(`${environment.apiUrl}capital/create`, {
      ...params,
    });
  }

  updateCapital(id: number, params: CapitalItem) {
    return this.http.put(`${environment.apiUrl}capital/create${id}`, {
      ...params,
    });
  }


  getCapitals(params?: { byCoin?: string }) {
    return this.http.get(`${environment.apiUrl}capital/list`, {
      params,
    });
  }
}
