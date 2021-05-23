import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CgChartService {
  constructor(private http: HttpClient) {}
  getFullData({ id, vs_currency, days }) {
    return this.http.get(
      'https://api.coingecko.com/api/v3/coins/' + id + '/market_chart',
      {
        params: {
          vs_currency: vs_currency,
          days: days,
        },
      }
    );
  }

  getRangeData({ id = 'bitcoin', vs_currency = 'usd', from, to }) {
    return this.http.get(
      'https://api.coingecko.com/api/v3/coins/' + id + '/market_chart/range',
      {
        params: {
          vs_currency: vs_currency,
          from: from,
          to: to,
        },
      }
    );
  }
}
