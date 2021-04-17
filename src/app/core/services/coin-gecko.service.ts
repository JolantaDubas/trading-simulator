import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoService {
  constructor(private http: HttpClient) {}

  getCurrentPrice(ids: string[], vs_currencies: string[]) {
    return this.http
      .get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: ids,
          vs_currencies: vs_currencies,
        },
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
  }

  getTrending() {
    return this.http.get('https://api.coingecko.com/api/v3/search/trending');
  }

  getCoinData(id: string) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/' + id);
  }
  getMarketData(curr: string) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets/', {
      params: {
        vs_currency: curr,
        order: 'market_cap_desc',
        per_page: '10',
        page: '1',
        sparkline: 'false',
        price_change_percentage: '1h,24h,7d,30d,1y',
      },
    });
  }

  getGlobal() {
    return this.http.get('https://api.coingecko.com/api/v3/global');
  }
}
