import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NomicsService {
  normicsKey = 'f0039a71f691563f67e401d26fcc3ee6';

  constructor(private http: HttpClient) {}

  getMarketCap({ start, end, currency }) {
    return this.http.get('https://api.nomics.com/v1/market-cap/history', {
      params: {
        key: this.normicsKey,
        start: start,
        end: end || '2020-10-02T10:00:00-05:00',
        currency: currency,
      },
    });
  }
}
