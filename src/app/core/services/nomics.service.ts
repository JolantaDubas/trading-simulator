import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NomicsService {
  normicsKey = 'f0039a71f691563f67e401d26fcc3ee6';

  constructor(private http: HttpClient) {}

  getCurrenciesTicker() {
    return this.http.get('https://api.nomics.com/v1/currencies/ticker', {
      params: {
        key: this.normicsKey,
        ids: 'BroadcastChannel,ETH',
        interval: '1d,30d',
        convert: 'EUR',
        'per-page': '100',
        page: '1',
      },
    });
  }
}
