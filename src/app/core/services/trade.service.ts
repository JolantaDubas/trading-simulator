import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TradeItem } from '../models/tradeItem';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(private http: HttpClient) {}

  createTrade(params: TradeItem) {
    return this.http.post(`${environment.apiUrl}trade/create`, {
      ...params,
    });
  }

  getTrades(params?: { byCoin?: string }) {
    return this.http.get(`${environment.apiUrl}trade/list`, {
      params,
    });
  }
}
